import { randomBytes, scrypt, createHash } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

interface NostrChallenge {
  challenge: string;
  createdAt: number;
  expiresAt: number;
}

interface NostrUser {
  pubkey: string;
  npub: string;
  pinHash?: string;
  pinSalt?: string;
  createdAt: number;
  lastLogin: number;
}

interface NostrSession {
  sessionId: string;
  pubkey: string;
  createdAt: number;
  expiresAt: number;
  lastValidated: number;
  userAgent?: string;
}

interface PinAttempt {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const CHALLENGE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SESSION_REVALIDATE_MS = 60 * 60 * 1000; // Revalidate every hour
const MAX_PIN_ATTEMPTS = 5;
const PIN_LOCKOUT_MS = 15 * 60 * 1000; // 15 minute lockout

const challenges = new Map<string, NostrChallenge>();
const nostrUsers = new Map<string, NostrUser>();
const nostrSessions = new Map<string, NostrSession>();
const pinAttempts = new Map<string, PinAttempt>();

export function generateChallenge(): { challenge: string; sessionKey: string } {
  const sessionKey = randomBytes(16).toString('hex');
  const challenge = randomBytes(32).toString('hex');
  const now = Date.now();
  
  challenges.set(sessionKey, {
    challenge,
    createdAt: now,
    expiresAt: now + CHALLENGE_TTL_MS,
  });
  
  return { challenge, sessionKey };
}

export function getChallenge(sessionKey: string): string | null {
  const stored = challenges.get(sessionKey);
  if (!stored) return null;
  
  const now = Date.now();
  if (stored.expiresAt <= now) {
    challenges.delete(sessionKey);
    return null;
  }
  
  return stored.challenge;
}

export function consumeChallenge(sessionKey: string): string | null {
  const challenge = getChallenge(sessionKey);
  if (challenge) {
    challenges.delete(sessionKey);
  }
  return challenge;
}

export async function verifyNostrLogin(
  sessionKey: string,
  pubkey: string,
  signedEvent: any
): Promise<{ success: boolean; error?: string; sessionId?: string; user?: NostrUser }> {
  try {
    const { verifyEvent, getEventHash, nip19 } = await import('nostr-tools');
    
    const challenge = consumeChallenge(sessionKey);
    if (!challenge) {
      return { success: false, error: "Challenge expired or invalid" };
    }
    
    if (signedEvent.pubkey !== pubkey) {
      return { success: false, error: "Public key mismatch" };
    }
    
    const expectedHash = getEventHash(signedEvent);
    if (signedEvent.id !== expectedHash) {
      return { success: false, error: "Event hash mismatch" };
    }
    
    const isValidSignature = verifyEvent(signedEvent);
    if (!isValidSignature) {
      return { success: false, error: "Invalid signature" };
    }
    
    const contentMatch = signedEvent.content === challenge || 
                         signedEvent.tags?.some((tag: string[]) => 
                           tag[0] === 'challenge' && tag[1] === challenge
                         );
    if (!contentMatch) {
      return { success: false, error: "Challenge content mismatch" };
    }
    
    const npub = nip19.npubEncode(pubkey);
    const now = Date.now();
    
    let user = nostrUsers.get(pubkey);
    if (!user) {
      user = {
        pubkey,
        npub,
        createdAt: now,
        lastLogin: now,
      };
      nostrUsers.set(pubkey, user);
    } else {
      user.lastLogin = now;
    }
    
    const sessionId = randomBytes(32).toString('hex');
    nostrSessions.set(sessionId, {
      sessionId,
      pubkey,
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS,
    });
    
    return { success: true, sessionId, user };
  } catch (error) {
    console.error("NOSTR verification error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Verification failed" 
    };
  }
}

export function validateSession(sessionId: string, userAgent?: string): NostrSession | null {
  const session = nostrSessions.get(sessionId);
  if (!session) return null;
  
  const now = Date.now();
  
  if (session.expiresAt <= now) {
    nostrSessions.delete(sessionId);
    return null;
  }
  
  if (session.userAgent && userAgent && session.userAgent !== userAgent) {
    console.warn(`Session user-agent mismatch for ${sessionId}`);
  }
  
  session.lastValidated = now;
  nostrSessions.set(sessionId, session);
  
  return session;
}

export function getUser(pubkey: string): NostrUser | null {
  return nostrUsers.get(pubkey) || null;
}

export function logout(sessionId: string): boolean {
  return nostrSessions.delete(sessionId);
}

export async function hashPin(pin: string, userSalt: string): Promise<string> {
  if (!/^\d{4,6}$/.test(pin)) {
    throw new Error('PIN must be 4-6 digits');
  }
  
  const combinedSalt = `${userSalt}.${randomBytes(16).toString('hex')}`;
  const buf = await scryptAsync(pin, combinedSalt, 64) as Buffer;
  return `${buf.toString('hex')}.${combinedSalt}`;
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  if (!/^\d{4,6}$/.test(pin)) {
    return false;
  }
  
  const parts = hash.split('.');
  if (parts.length < 2) {
    return false;
  }
  
  const storedHash = parts[0];
  const combinedSalt = parts.slice(1).join('.');
  
  if (!storedHash || !combinedSalt) {
    return false;
  }
  
  const buf = await scryptAsync(pin, combinedSalt, 64) as Buffer;
  return buf.toString('hex') === storedHash;
}

function checkPinRateLimit(pubkey: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const attempt = pinAttempts.get(pubkey);
  
  if (!attempt) {
    return { allowed: true };
  }
  
  if (attempt.lockedUntil && attempt.lockedUntil > now) {
    return { 
      allowed: false, 
      retryAfter: Math.ceil((attempt.lockedUntil - now) / 1000) 
    };
  }
  
  if (attempt.lockedUntil && attempt.lockedUntil <= now) {
    pinAttempts.delete(pubkey);
    return { allowed: true };
  }
  
  return { allowed: true };
}

function recordPinAttempt(pubkey: string, success: boolean): void {
  const now = Date.now();
  
  if (success) {
    pinAttempts.delete(pubkey);
    return;
  }
  
  const attempt = pinAttempts.get(pubkey) || { count: 0, lastAttempt: now };
  attempt.count += 1;
  attempt.lastAttempt = now;
  
  if (attempt.count >= MAX_PIN_ATTEMPTS) {
    attempt.lockedUntil = now + PIN_LOCKOUT_MS;
    console.warn(`PIN lockout triggered for pubkey: ${pubkey.slice(0, 8)}...`);
  }
  
  pinAttempts.set(pubkey, attempt);
}

export async function setUserPin(pubkey: string, pin: string): Promise<boolean> {
  const user = nostrUsers.get(pubkey);
  if (!user) return false;
  
  const userSalt = user.pinSalt || randomBytes(16).toString('hex');
  user.pinSalt = userSalt;
  user.pinHash = await hashPin(pin, userSalt);
  nostrUsers.set(pubkey, user);
  
  pinAttempts.delete(pubkey);
  
  return true;
}

export async function verifyUserPin(pubkey: string, pin: string): Promise<{ success: boolean; verified: boolean; retryAfter?: number }> {
  const rateLimit = checkPinRateLimit(pubkey);
  if (!rateLimit.allowed) {
    return { success: false, verified: false, retryAfter: rateLimit.retryAfter };
  }
  
  const user = nostrUsers.get(pubkey);
  if (!user || !user.pinHash) {
    return { success: false, verified: false };
  }
  
  const isValid = await verifyPin(pin, user.pinHash);
  recordPinAttempt(pubkey, isValid);
  
  return { success: true, verified: isValid };
}

export function hasPin(pubkey: string): boolean {
  const user = nostrUsers.get(pubkey);
  return !!(user?.pinHash);
}

setInterval(() => {
  const now = Date.now();
  
  for (const [key, challenge] of Array.from(challenges.entries())) {
    if (challenge.expiresAt <= now) {
      challenges.delete(key);
    }
  }
  
  for (const [key, session] of Array.from(nostrSessions.entries())) {
    if (session.expiresAt <= now) {
      nostrSessions.delete(key);
    }
  }
}, 60 * 60 * 1000);
