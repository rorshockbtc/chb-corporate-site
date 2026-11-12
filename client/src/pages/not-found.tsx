import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { FadeUp } from "@/components/brand/motion";
import { Seo } from "@/components/brand/seo";

const QUICK_ROUTES = [
  { href: "/studio", label: "How the studio works", mark: ": - ]" },
  { href: "/products", label: "Explore all 7 tools", mark: "|||" },
  { href: "/manifesto", label: "Read the manifesto", mark: "#" },
] as const;

export default function NotFound() {
  return (
    <div className="brand-canvas min-h-[80vh] flex items-center py-28 sm:py-36" data-testid="not-found-page">
      <Seo
        title="404 — Page Not Found | Colon Hyphen Bracket : - ]"
        description="Wrong turn, still smiling. Jump back to Colon Hyphen Bracket's home page, studio overview, products, or manifesto."
        path="/404"
      />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <FadeUp>
          <Smile className="text-[72px] sm:text-[96px]" color="#FE299E" winkEvery={3500} />
          <div className="mt-6 font-mono text-[13px] uppercase tracking-[0.16em] text-[#111827]/60">
            404 · Route Not Found
          </div>
          <h1 className="mt-3 font-display font-bold text-huge text-[#111827]">
            Wrong turn. <span className="text-[#FE299E]">Still smiling.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-2xl text-[#111827]/75 max-w-[44ch] leading-relaxed">
            That URL isn&apos;t here—maybe an old prototype link or a stray character. Everything live is one click below.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 min-h-[44px] px-8 py-3.5 rounded-full bg-[#FE299E] hover:bg-[#111827] text-white text-base sm:text-lg font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)] transition-all"
                data-testid="not-found-home"
              >
                Back home <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 min-h-[44px] px-7 py-3.5 rounded-full border-2 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-[#FAF8F5] text-base sm:text-lg font-semibold no-underline transition-colors"
              data-testid="not-found-contact"
            >
              Start a project
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-[#111827]/12 grid sm:grid-cols-3 gap-6">
            {QUICK_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group flex items-center justify-between min-h-[44px] py-2 border-b border-[#111827]/10 hover:border-[#FE299E] text-base sm:text-lg font-semibold text-[#111827] no-underline transition-colors"
              >
                <span>
                  <span className="font-mono text-[#FE299E] mr-2.5">{route.mark}</span>
                  {route.label}
                </span>
                <ArrowRight className="w-4 h-4 text-[#111827]/50 group-hover:text-[#FE299E] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
