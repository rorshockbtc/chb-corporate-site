import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/products", label: "Products" },
  { href: "/#manifesto", label: "Manifesto" },
  { href: "https://hire.colonhyphenbracket.pink", label: "About Kyle", external: true },
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

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FAF8F5]/90 backdrop-blur-md shadow-[0_1px_0_rgba(17,24,39,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="text-xl tracking-wide text-[#111827] no-underline" data-testid="logo-link">
          <span className="font-medium">colon</span>
          <span className="font-extralight">hyphen</span>
          <span className="font-medium">bracket</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="link-swipe text-[15px] font-medium text-[#111827] no-underline pb-0.5">
                {l.label} ↗
              </a>
            ) : (
              <Link key={l.label} href={l.href}
                className={`link-swipe text-[15px] font-medium no-underline pb-0.5 ${
                  location === l.href ? "text-[#FE299E]" : "text-[#111827]"
                }`}
                data-testid={`nav-${l.label.toLowerCase()}`}>
                {l.label}
              </Link>
            )
          )}
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-[15px] font-semibold no-underline"
              data-testid="nav-start-project">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </nav>

        <button className="md:hidden p-2 -mr-2 text-[#111827]" onClick={() => setOpen((o) => !o)}
          aria-expanded={open} aria-label="Menu" data-testid="mobile-menu-toggle">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-[#FAF8F5] px-6 pt-10"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}>
            <div className="flex flex-col gap-6">
              {[...LINKS, { href: "/contact", label: "Start a project →" }].map((l, i) => (
                <motion.a key={l.label} href={l.href}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-5xl font-bold text-[#111827] no-underline">
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
