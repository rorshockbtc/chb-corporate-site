import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import {
  hasNostrExtension,
  loginWithNostr,
  logout as nostrLogout,
  validateStoredSession,
  getStoredSession,
  setPin as nostrSetPin,
  verifyPin as nostrVerifyPin,
  type NostrSession,
  type NostrUser
} from "@/lib/nostr";

interface NostrAuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  hasExtension: boolean;
  user: NostrUser | null;
  session: NostrSession | null;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  setPin: (pin: string) => Promise<boolean>;
  verifyPin: (pin: string) => Promise<{ verified: boolean; error?: string; retryAfter?: number }>;
  refresh: () => Promise<void>;
}

const NostrAuthContext = createContext<NostrAuthContextType | null>(null);

export function NostrAuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<NostrSession | null>(null);
  const [hasExtension, setHasExtension] = useState(false);

  useEffect(() => {
    const checkExtension = () => {
      setHasExtension(hasNostrExtension());
    };

    checkExtension();

    const timer = setTimeout(checkExtension, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const stored = getStoredSession();
        if (stored) {
          const validated = await validateStoredSession();
          setSession(validated);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (): Promise<boolean> => {
    if (!hasNostrExtension()) {
      return false;
    }

    setIsLoading(true);
    try {
      const newSession = await loginWithNostr();
      if (newSession) {
        setSession(newSession);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await nostrLogout();
      setSession(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setPin = useCallback(async (pin: string): Promise<boolean> => {
    const success = await nostrSetPin(pin);
    if (success && session) {
      setSession({
        ...session,
        user: { ...session.user, hasPin: true }
      });
    }
    return success;
  }, [session]);

  const verifyPin = useCallback(async (pin: string): Promise<{ verified: boolean; error?: string; retryAfter?: number }> => {
    return await nostrVerifyPin(pin);
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    const validated = await validateStoredSession();
    setSession(validated);
  }, []);

  const value: NostrAuthContextType = {
    isLoading,
    isAuthenticated: !!session,
    hasExtension,
    user: session?.user || null,
    session,
    login,
    logout,
    setPin,
    verifyPin,
    refresh
  };

  return (
    <NostrAuthContext.Provider value={value}>
      {children}
    </NostrAuthContext.Provider>
  );
}

export function useNostrAuth(): NostrAuthContextType {
  const context = useContext(NostrAuthContext);
  if (!context) {
    throw new Error("useNostrAuth must be used within a NostrAuthProvider");
  }
  return context;
}
