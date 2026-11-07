import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";

const LINKS = [
  { href: "/studio", label: "Studio", mark: ": - ]", color: "#FE299E", external: false },
  { href: "/products", label: "Products", mark: "|||", color: "#0A9BE0", external: false },
  { href: "/manifesto", label: "Manifesto", mark: "#", color: "#3FA535", external: false },
  { href: "https://hire.colonhyphenbracket.pink", label: "About Kyle", mark: "; - ]", color: "#FE299E", external: true },
];

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          open
            ? "bg-[#FAF8F5] border-b border-[#111827]/10"
            : scrolled
            ? "chb-nav-scrolled"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-logo text-xl sm:text-[22px] text-[#111827] no-underline"
            data-testid="logo-link"
          >
            <span className="font-medium">colon</span>
            <span className="font-light">hyphen</span>
            <span className="font-medium">bracket</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-swipe text-[15px] font-medium text-[#111827] no-underline pb-0.5"
                >
                  {l.label} ↗
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`link-swipe text-[15px] font-medium no-underline pb-0.5 ${
                    location === l.href ? "text-[#FE299E]" : "text-[#111827]"
                  }`}
                  data-testid={`nav-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </Link>
              )
            )}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-[15px] font-semibold no-underline"
                data-testid="nav-start-project"
              >
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </nav>

          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF8F5]/90 border border-[#111827]/12 text-[#111827] shadow-sm cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            data-testid="mobile-menu-toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5 text-[#FE299E]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* Rendered outside <header> so header's backdrop-blur never traps fixed positioning */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[#FAF8F5] flex flex-col justify-between px-6 pt-8 pb-10 overflow-y-auto border-t border-[#111827]/10"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu-drawer"
          >
            <nav className="flex flex-col divide-y divide-[#111827]/10" aria-label="Mobile Navigation">
              {LINKS.map((l, i) => {
                const isActive = !l.external && location === l.href;
                return (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-5 no-underline group"
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            className="font-display font-bold text-2xl w-12 shrink-0 whitespace-nowrap"
                            style={{ color: l.color }}
                          >
                            {l.mark}
                          </span>
                          <span className="font-display text-4xl font-bold text-[#111827] group-active:text-[#FE299E] transition-colors">
                            {l.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-[#111827]/40" />
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-5 no-underline"
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            className="font-display font-bold text-2xl w-12 shrink-0 whitespace-nowrap"
                            style={{ color: l.color }}
                          >
                            {l.mark}
                          </span>
                          <span
                            className={`font-display text-4xl font-bold transition-colors ${
                              isActive ? "text-[#FE299E]" : "text-[#111827]"
                            }`}
                          >
                            {l.label}
                          </span>
                        </div>
                        <ArrowRight
                          className={`w-6 h-6 ${
                            isActive ? "text-[#FE299E]" : "text-[#111827]/30"
                          }`}
                        />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="mt-8 pt-6 border-t border-[#111827]/10 space-y-6"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]"
              >
                Start a project <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="flex items-center justify-between text-sm text-[#111827]/65">
                <a
                  href="mailto:cubby@colonhyphenbracket.pink"
                  className="font-medium text-[#111827]/80 no-underline"
                >
                  cubby@colonhyphenbracket.pink
                </a>
                <Smile className="text-2xl" color="#FE299E" winkEvery={2800} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
