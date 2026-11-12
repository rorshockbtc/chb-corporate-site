import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    // Scroll to top on route change when no anchor hash is present
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}