import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { usePerspective } from "@/hooks/use-perspective";
import { useAuth } from "@/hooks/useAuth";
import { useNostrAuth } from "@/hooks/use-nostr-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ExternalLink } from "lucide-react";
import { SPRING_LAYOUT, TAP } from "@/lib/motion/tokens";
import type { Perspective } from "@/types/content";

export function Navigation() {
  const [location] = useLocation();
  const { currentPerspective, setPerspective } = usePerspective();
  const { isAuthenticated: isEmailAuth } = useAuth();
  const { isAuthenticated: isNostrAuth } = useNostrAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = isEmailAuth || isNostrAuth;

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/studio", label: "Studio" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/contact", label: "Contact" },
  ];

  const perspectives: {
    id: Perspective;
    label: string;
    shortLabel: string;
    surfaceBg: string;
    inkColor: string;
    dotColor: string;
  }[] = [
    {
      id: "startup_founders",
      label: "Startup Founders",
      shortLabel: "Founders",
      surfaceBg: "#D4EBF5",
      inkColor: "#02212F",
      dotColor: "#01A9F4",
    },
    {
      id: "content_creators",
      label: "Content Creators",
      shortLabel: "Creators",
      surfaceBg: "#F1DBDA",
      inkColor: "#18002E",
      dotColor: "#FE299E",
    },
    {
      id: "memory_capturers",
      label: "Memory Capturers",
      shortLabel: "Families",
      surfaceBg: "#DBECC8",
      inkColor: "#192E01",
      dotColor: "#5C9F00",
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-[#FAF8F5]/95 backdrop-blur-md border-b-[1.5px] border-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Playful colonhyphenbracket :-] Brandmark + Perspective Selector */}
            <div className="flex items-center gap-4 lg:gap-5">
              <Link
                href="/"
                className="flex items-center gap-2 text-[#111827] hover:opacity-90 transition-opacity no-underline"
                data-testid="logo-link"
              >
                <span className="text-lg sm:text-xl tracking-tight text-[#111827]">
                  <span className="font-bold">colon</span>
                  <span className="font-normal text-[#374151]">hyphen</span>
                  <span className="font-bold">bracket</span>
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#FE299E] text-white font-mono text-sm font-bold tracking-tight border border-[#111827] shadow-[0_2px_0_#111827]">
                  :-]
                </span>
              </Link>

              {/* Desktop Human Perspective Switcher (Accént 3.0 Albers Chromatic Pills) */}
              <div
                className="hidden xl:flex items-center bg-[#E8E2D5] border-[1.5px] border-[#111827] rounded-full p-1 gap-1 shadow-[0_2px_0_#111827]"
                role="group"
                aria-label="Perspective Switcher"
                data-testid="perspective-switcher"
              >
                <span className="px-2.5 font-mono text-[10px] uppercase tracking-[0.14em] font-bold text-[#111827] select-none">
                  For:
                </span>
                {perspectives.map((p) => {
                  const isActive = currentPerspective === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPerspective(p.id)}
                      className={`relative px-2.5 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border-none whitespace-nowrap ${
                        isActive
                          ? "text-[#111827] font-bold"
                          : "text-[#374151] hover:text-[#111827] bg-transparent"
                      }`}
                      data-testid={`perspective-option-${p.id}`}
                      aria-pressed={isActive}
                      title={`View CHB for ${p.label}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-perspective-pill"
                          transition={SPRING_LAYOUT}
                          className="absolute inset-0 rounded-full -z-10 border border-[#111827]"
                          style={{ backgroundColor: p.surfaceBg }}
                        />
                      )}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 relative z-10 border border-[#111827]/40"
                        style={{ backgroundColor: p.dotColor }}
                      />
                      <span className="relative z-10">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Navigation Links + Design System + Portfolio + Sign Up */}
            <div className="hidden md:flex items-center gap-3.5 lg:gap-4 shrink-0">
              <nav className="flex items-center gap-3.5 lg:gap-4">
                {navItems.map(({ href, label }) => {
                  const isActive = location === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-sm transition-colors no-underline whitespace-nowrap ${
                        isActive
                          ? "text-[#111827] font-bold underline decoration-[#FE299E] decoration-2 underline-offset-8"
                          : "text-[#111827] font-medium hover:text-[#FE299E]"
                      }`}
                      data-testid={`nav-${label.toLowerCase()}`}
                    >
                      {label}
                    </Link>
                  );
                })}

                <a
                  href="https://design.pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8E2D5] hover:bg-[#FE299E] text-[#111827] hover:text-white border border-[#111827] font-mono text-[11px] font-bold tracking-tight transition-colors no-underline whitespace-nowrap shrink-0"
                  data-testid="nav-design-system"
                  title="Explore Accént 3.0 — The Pipes & CHB Design System"
                >
                  <span>/ Accént 3.0</span>
                  <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                </a>

                <a
                  href="https://hire.colonhyphenbracket.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-[0.1em] text-[#374151] hover:text-[#FE299E] transition-colors no-underline hidden 2xl:inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  data-testid="nav-hire-kyle"
                >
                  <span>Portfolio ↗</span>
                </a>
              </nav>

              <div className="flex items-center gap-2 pl-2 border-l border-[#111827]/20 shrink-0">
                {isAuthenticated ? (
                  <motion.div whileHover={{ y: -1 }} whileTap={TAP}>
                    <Link
                      href="/account"
                      className="px-4 py-2 bg-[#FE299E] text-white rounded-full border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827] hover:bg-[#E01E8B] transition-all font-bold text-xs inline-flex items-center gap-1.5 no-underline whitespace-nowrap"
                      data-testid="account-button"
                    >
                      <User className="h-3.5 w-3.5 shrink-0" />
                      <span>Account</span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ y: -1 }} whileTap={TAP}>
                    <Link
                      href="/signup"
                      className="px-4 py-2 bg-[#FE299E] text-white rounded-full border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827] hover:bg-[#E01E8B] transition-all font-bold text-xs inline-flex items-center gap-1.5 no-underline whitespace-nowrap"
                      data-testid="signup-button"
                    >
                      <span>Sign Up</span>
                      <span className="font-mono text-[11px]">:-]</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                className="text-[#111827] hover:bg-[#E8E2D5]"
                data-testid="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-[#FAF8F5] border-b-2 border-[#111827] shadow-xl"
          id="mobile-menu"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
            {/* Perspective Switcher on Mobile */}
            <div className="bg-[#E8E2D5] border-[1.5px] border-[#111827] rounded-xl p-3 shadow-[0_2px_0_#111827]">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#111827] mb-2">
                Choose Your Perspective
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {perspectives.map((p) => {
                  const isActive = currentPerspective === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPerspective(p.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-center transition-all border border-[#111827] ${
                        isActive ? "font-bold shadow-[0_2px_0_#111827]" : "bg-[#FAF8F5] font-medium"
                      }`}
                      style={isActive ? { backgroundColor: p.surfaceBg, color: p.inkColor } : undefined}
                      data-testid={`mobile-perspective-${p.id}`}
                    >
                      <div className="text-xs">{p.shortLabel}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block w-full py-2.5 px-3 rounded-lg text-base font-semibold transition-colors no-underline ${
                    location === href
                      ? "bg-[#111827] text-[#FAF8F5]"
                      : "text-[#111827] hover:bg-[#E8E2D5]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${label.toLowerCase()}`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://design.pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 px-3 rounded-lg text-base font-semibold text-[#111827] hover:bg-[#E8E2D5] transition-colors no-underline"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-design-system"
              >
                / Accént 3.0 Design System (design.pipes.pink) ↗
              </a>
              <a
                href="https://hire.colonhyphenbracket.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 px-3 rounded-lg text-base font-semibold text-[#111827] hover:bg-[#E8E2D5] transition-colors no-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kyle&apos;s Principal Portfolio ↗
              </a>
            </div>

            {/* Direct Conversion CTAs */}
            <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-[#111827]/20">
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-[#FE299E] text-white rounded-full border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827] font-bold text-sm no-underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-account-button"
                >
                  <User className="h-4 w-4" />
                  <span>Manage :-] Account</span>
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="block px-5 py-3 bg-[#FE299E] text-white rounded-full border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827] font-bold text-sm text-center no-underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-signup-button"
                >
                  Sign Up for Universal :-] Account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
