import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// Simple session ID generator
function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('chb_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('chb_session_id', sessionId);
  }
  return sessionId;
}

interface AnalyticsConfig {
  enabled?: boolean;
}

export function useAnalytics(config: AnalyticsConfig = { enabled: true }) {
  const [location] = useLocation();
  const previousLocation = useRef<string>('');
  const startTime = useRef<number>(Date.now());
  const sessionId = useRef<string>(getSessionId());
  const currentVisitId = useRef<string | null>(null);

  // Track page visit
  const trackPageVisit = async (path: string, referrer?: string) => {
    if (!config.enabled) return null;
    
    try {
      const response = await fetch('/api/analytics/page-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId.current,
          path,
          referrer: referrer || document.referrer || null,
          userAgent: navigator.userAgent,
        }),
      });
      
      if (!response.ok) {
        console.warn('Failed to track page visit:', response.statusText);
        return null;
      }

      const result = await response.json();
      return result.id;
    } catch (error) {
      console.warn('Analytics tracking error:', error);
      return null;
    }
  };

  // Track navigation between pages
  const trackNavigation = async (fromPath: string, toPath: string) => {
    if (!config.enabled) return;
    
    try {
      const response = await fetch('/api/analytics/navigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId.current,
          fromPath,
          toPath,
        }),
      });
      
      if (!response.ok) {
        console.warn('Failed to track navigation:', response.statusText);
      }
    } catch (error) {
      console.warn('Analytics navigation tracking error:', error);
    }
  };

  // Update page visit with time spent
  const updateTimeSpent = async (visitId: string, timeSpent: number) => {
    if (!config.enabled || !visitId) return;
    
    try {
      await fetch(`/api/analytics/page-visit/${visitId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeSpent: timeSpent.toString(),
        }),
      });
    } catch (error) {
      console.warn('Analytics time tracking error:', error);
    }
  };

  useEffect(() => {
    const currentPath = location;
    const previousPath = previousLocation.current;
    const previousVisitId = currentVisitId.current;
    
    if (!config.enabled) return;
    
    // Track navigation if there was a previous page
    if (previousPath && previousPath !== currentPath) {
      trackNavigation(previousPath, currentPath);
      
      // Calculate time spent on previous page and update it
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent > 0 && previousVisitId) {
        updateTimeSpent(previousVisitId, timeSpent);
      }
    }
    
    // Track current page visit and store the visit ID
    const trackCurrentPage = async () => {
      const visitId = await trackPageVisit(currentPath);
      currentVisitId.current = visitId;
    };
    trackCurrentPage();
    
    // Update tracking state
    previousLocation.current = currentPath;
    startTime.current = Date.now();
  }, [location, config.enabled]);

  // Always register beforeunload handler
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!config.enabled) return;
      
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent > 0 && currentVisitId.current) {
        // Use sendBeacon with proper content-type for reliable tracking on page unload
        const data = JSON.stringify({
          timeSpent: timeSpent.toString(),
        });
        
        const blob = new Blob([data], { type: 'application/json' });
        navigator.sendBeacon(`/api/analytics/page-visit/${currentVisitId.current}/time`, blob);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [config.enabled]);

  return {
    trackPageVisit,
    trackNavigation,
    sessionId: sessionId.current,
  };
}