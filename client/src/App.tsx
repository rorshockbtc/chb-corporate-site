import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useParams } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { HomePage } from "@/pages/home";
import { PRODUCT_COLORS } from "@/lib/product-colors";

const StudioPage = lazy(() => import("@/pages/studio"));
const Products = lazy(() => import("@/pages/products"));
const ManifestoPage = lazy(() => import("@/pages/manifesto"));
const Contact = lazy(() => import("@/pages/contact"));
const DesignSystemPage = lazy(() => import("@/pages/design"));
const NotFound = lazy(() => import("@/pages/not-found"));

function ProductDeepLinkRoute() {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug?.toLowerCase() ?? "";
  const isValid = Object.prototype.hasOwnProperty.call(PRODUCT_COLORS, slug);

  useEffect(() => {
    if (isValid) {
      window.history.replaceState(null, "", `/products#${slug}`);
    }
  }, [isValid, slug]);

  if (!isValid) {
    return <NotFound />;
  }

  return <Products initialProductId={slug} />;
}

function AccountRedirect() {
  useEffect(() => {
    window.location.replace("https://pipes.pink");
  }, []);

  return (
    <div className="brand-canvas min-h-[60vh] flex items-center justify-center px-6 pt-28 pb-20">
      <p className="font-display text-lg text-[#111827]/75">
        Redirecting to{" "}
        <a href="https://pipes.pink" className="text-[#FE299E] underline underline-offset-4">
          pipes.pink
        </a>
        …
      </p>
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/studio" component={StudioPage} />
          <Route path="/products">{() => <Products />}</Route>
          <Route path="/products/:slug" component={ProductDeepLinkRoute} />
          <Route path="/manifesto" component={ManifestoPage} />
          <Route path="/contact" component={Contact} />
          <Route path="/account" component={AccountRedirect} />
          <Route path="/design" component={DesignSystemPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
