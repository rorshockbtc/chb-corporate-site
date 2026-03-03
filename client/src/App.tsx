import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PerspectiveProvider } from "@/hooks/use-perspective";
import { NostrAuthProvider } from "@/hooks/use-nostr-auth";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { useAnalytics } from "@/hooks/use-analytics";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SemiChat } from "@/components/semi-chat";
import { HomePage } from "@/pages/home";
import Products from "@/pages/products";
import HashDeepDive from "@/pages/products/hash";
import SemiDeepDive from "@/pages/products/semi";
import PipesDeepDive from "@/pages/products/pipes";
import ImageDemo from "@/pages/image-demo";
import Roadmap from "@/pages/roadmap";
import Contact from "@/pages/contact";
import CHBCaseStudy from "@/pages/chb-case-study";
import MemoryCapturersDeepDive from "@/pages/memory-capturers-deep-dive";
import StartupFoundersDeepDive from "@/pages/startup-founders-deep-dive";
import ContentCreatorsDeepDive from "@/pages/content-creators-deep-dive";
import CreativeProcess from "@/pages/creative-process";
import ImageGallery from "@/pages/image-gallery";
import ImageAdmin from "@/pages/image-admin";
import Scout from "@/pages/scout";
import Signup from "@/pages/signup";
import ImageDetail from "@/pages/image-detail";
import AnalyticsPage from "@/pages/analytics";
import Account from "@/pages/account";
import NotFound from "@/pages/not-found";

// Simple admin protection wrapper
function ProtectedImageAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Check if already authenticated
    const sessionId = localStorage.getItem('chb_admin_session');
    if (sessionId) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('chb_admin_session', data.sessionId);
        setIsAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Authentication failed');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">🔒 Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">Enter admin password to access image management.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Access Admin
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return <ImageAdmin />;
}

function ProtectedImageDetail() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem('chb_admin_session');
    if (sessionId) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">🔒 Admin Access Required</h1>
          <p className="text-muted-foreground mb-4">This page is restricted to authorized administrators only.</p>
          <p className="text-sm text-muted-foreground">Please return to <a href="/image-admin" className="text-blue-600 underline">admin page</a> to authenticate.</p>
        </div>
      </div>
    );
  }

  return <ImageDetail />;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={Products} />
        <Route path="/products/hash" component={HashDeepDive} />
        <Route path="/products/semi" component={SemiDeepDive} />
        <Route path="/products/pipes" component={PipesDeepDive} />
        <Route path="/chb-case-study" component={CHBCaseStudy} />
        <Route path="/image-gallery" component={ImageGallery} />
        <Route path="/image-demo" component={ImageDemo} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/scout" component={Scout} />
        <Route path="/signup" component={Signup} />
        <Route path="/account" component={Account} />
        <Route path="/memory-capturers-deep-dive" component={MemoryCapturersDeepDive} />
        <Route path="/startup-founders-deep-dive" component={StartupFoundersDeepDive} />
        <Route path="/content-creators-deep-dive" component={ContentCreatorsDeepDive} />
        <Route path="/creative-process" component={CreativeProcess} />
        <Route path="/image-admin" component={ProtectedImageAdmin} />
        <Route path="/image-detail/:id" component={ProtectedImageDetail} />
        <Route path="/analytics" component={AnalyticsPage} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// Global theme management component
function ThemeManager() {
  // This hook applies perspective-driven CSS variables to document root
  usePerspectiveTheme();
  return null;
}

// Analytics tracking component
function AnalyticsTracker() {
  // Track page visits and navigation
  useAnalytics({ enabled: true });
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PerspectiveProvider>
          <NostrAuthProvider>
            <ThemeManager />
            <AnalyticsTracker />
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <Router />
              <Footer />
              <Toaster />
              {/* Semi Chat - positioned for both desktop and mobile */}
              <SemiChat className="bottom-4 right-4 sm:bottom-6 sm:right-6" />
            </div>
          </NostrAuthProvider>
        </PerspectiveProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
