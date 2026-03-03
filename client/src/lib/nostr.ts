declare global {
  interface Window {
    nostr?: {
      getPublicKey(): Promise<string>;
      signEvent(event: {
        kind: number;
        created_at: number;
        tags: string[][];
        content: string;
      }): Promise<{
        id: string;
        pubkey: string;
        created_at: number;
        kind: number;
        tags: string[][];
        content: string;
        sig: string;
      }>;
      getRelays?(): Promise<Record<string, { read: boolean; write: boolean }>>;
      nip04?: {
        encrypt(pubkey: string, plaintext: string): Promise<string>;
        decrypt(pubkey: string, ciphertext: string): Promise<string>;
      };
    };
  }
}

export interface NostrUser {
  pubkey: string;
  npub: string;
  hasPin: boolean;
}

export interface NostrSession {
  sessionId: string;
  user: NostrUser;
}

const STORAGE_KEY = 'chb_nostr_session';

export function hasNostrExtension(): boolean {
  return typeof window !== 'undefined' && !!window.nostr;
}

export async function getNostrPublicKey(): Promise<string | null> {
  if (!hasNostrExtension()) {
    return null;
  }
  
  try {
    return await window.nostr!.getPublicKey();
  } catch (error) {
    console.error('Failed to get NOSTR public key:', error);
    return null;
  }
}

export async function requestChallenge(): Promise<{ challenge: string; sessionKey: string } | null> {
  try {
    const response = await fetch('/api/nostr/challenge');
    const data = await response.json();
    
    if (!data.success) {
      console.error('Failed to get challenge:', data.error);
      return null;
    }
    
    return {
      challenge: data.challenge,
      sessionKey: data.sessionKey
    };
  } catch (error) {
    console.error('Failed to request challenge:', error);
    return null;
  }
}

export async function signChallenge(challenge: string): Promise<{
  pubkey: string;
  signedEvent: any;
} | null> {
  if (!hasNostrExtension()) {
    return null;
  }
  
  try {
    const pubkey = await window.nostr!.getPublicKey();
    
    const eventToSign = {
      kind: 22242,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['challenge', challenge]],
      content: challenge
    };
    
    const signedEvent = await window.nostr!.signEvent(eventToSign);
    
    return { pubkey, signedEvent };
  } catch (error) {
    console.error('Failed to sign challenge:', error);
    return null;
  }
}

export async function loginWithNostr(): Promise<NostrSession | null> {
  const challengeData = await requestChallenge();
  if (!challengeData) {
    return null;
  }
  
  const signedData = await signChallenge(challengeData.challenge);
  if (!signedData) {
    return null;
  }
  
  try {
    const response = await fetch('/api/nostr/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionKey: challengeData.sessionKey,
        pubkey: signedData.pubkey,
        signedEvent: signedData.signedEvent
      })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Login failed:', data.error);
      return null;
    }
    
    const session: NostrSession = {
      sessionId: data.sessionId,
      user: data.user
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    
    return session;
  } catch (error) {
    console.error('Login request failed:', error);
    return null;
  }
}

export function getStoredSession(): NostrSession | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export async function validateStoredSession(): Promise<NostrSession | null> {
  const stored = getStoredSession();
  if (!stored) return null;
  
  try {
    const response = await fetch('/api/nostr/session', {
      headers: {
        'Authorization': `Bearer ${stored.sessionId}`
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    const session: NostrSession = {
      sessionId: stored.sessionId,
      user: data.user
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    
    return session;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  const stored = getStoredSession();
  if (!stored) return;
  
  try {
    await fetch('/api/nostr/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stored.sessionId}`
      }
    });
  } catch (error) {
    console.error('Logout request failed:', error);
  } finally {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export async function setPin(pin: string): Promise<boolean> {
  const stored = getStoredSession();
  if (!stored) return false;
  
  try {
    const response = await fetch('/api/nostr/pin/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${stored.sessionId}`
      },
      body: JSON.stringify({ pin })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const session = { ...stored, user: { ...stored.user, hasPin: true } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    
    return data.success;
  } catch {
    return false;
  }
}

export async function verifyPin(pin: string): Promise<{ verified: boolean; error?: string; retryAfter?: number }> {
  const stored = getStoredSession();
  if (!stored) return { verified: false, error: 'Not authenticated' };
  
  try {
    const response = await fetch('/api/nostr/pin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${stored.sessionId}`
      },
      body: JSON.stringify({ pin })
    });
    
    const data = await response.json();
    
    if (response.status === 429) {
      return { 
        verified: false, 
        error: 'Too many attempts. Please try again later.',
        retryAfter: data.retryAfter 
      };
    }
    
    return { verified: data.success && data.verified };
  } catch {
    return { verified: false, error: 'Verification failed' };
  }
}

export function shortenNpub(npub: string): string {
  if (!npub || npub.length < 20) return npub;
  return `${npub.slice(0, 8)}...${npub.slice(-8)}`;
}
