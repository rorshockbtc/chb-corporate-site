import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NostrAuthProvider } from "@/hooks/use-nostr-auth";
import { useAnalytics } from "@/hooks/use-analytics";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { HomePage } from "@/pages/home";
import Products from "@/pages/products";
import HashDeepDive from "@/pages/products/hash";
import SemiDeepDive from "@/pages/products/semi";
import PipesDeepDive from "@/pages/products/pipes";
import Contact from "@/pages/contact";
import Account from "@/pages/account";
import DesignSystemPage from "@/pages/design";
import StudioPage from "@/pages/studio";
import ManifestoPage from "@/pages/manifesto";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/studio" component={StudioPage} />
        <Route path="/products" component={Products} />
        <Route path="/products/hash" component={HashDeepDive} />
        <Route path="/products/semi" component={SemiDeepDive} />
        <Route path="/products/pipes" component={PipesDeepDive} />
        <Route path="/manifesto" component={ManifestoPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/account" component={Account} />
        <Route path="/design" component={DesignSystemPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function AnalyticsTracker() {
  useAnalytics({ enabled: true });
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NostrAuthProvider>
          <AnalyticsTracker />
          <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-[#FAF8F5] text-[#111827] flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
              <Toaster />
            </div>
          </MotionConfig>
        </NostrAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
