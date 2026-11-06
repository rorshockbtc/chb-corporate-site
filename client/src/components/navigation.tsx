import { useState } from 'react';
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
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
    { href: "/products", label: "Ecosystem" },
    { href: "/products/pipes", label: "Pipes" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/contact", label: "Contact" },
  ];

  const perspectives: {
    id: Perspective;
    pipeHandle: string;
    label: string;
    accentColor: string;
  }[] = [
    {
      id: "startup_founders",
      pipeHandle: "pipe\\founders",
      label: "Builders",
      accentColor: "#0B5CAB",
    },
    {
      id: "content_creators",
      pipeHandle: "pipe\\creators",
      label: "Authors",
      accentColor: "#B81468",
    },
    {
      id: "memory_capturers",
      pipeHandle: "pipe\\legacy",
      label: "Families",
      accentColor: "#1B6346",
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-[#EAE0D0]/95 backdrop-blur-md border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brandmark + Mounted Perspective Pipe Switcher */}
            <div className="flex items-center gap-4 lg:gap-6">
              <Link
                href="/"
                className="flex items-center gap-2.5 text-[#281B16] hover:opacity-90 transition-opacity"
                data-testid="logo-link"
              >
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#231814] text-[#FE299E] font-mono text-sm font-bold tracking-tight">
                  :-]
                </span>
                <span className="text-lg tracking-tight text-[#281B16]">
                  <span className="font-bold">colon</span>
                  <span className="font-normal text-[#4A3A32]">hyphen</span>
                  <span className="font-bold">bracket</span>
                </span>
              </Link>

              {/* Desktop Tactile Perspective Pipe Bar */}
              <div
                className="hidden xl:flex items-center bg-[#E4DACB] border border-[#D3C7B5] rounded-lg p-1 gap-1"
                role="group"
                aria-label="Mounted Perspective Pipe"
                data-testid="perspective-switcher"
              >
                <span className="px-2 font-mono text-[10px] uppercase tracking-[0.14em] font-bold text-[#4A3A32] select-none">
                  Lens:
                </span>
                {perspectives.map((p) => {
                  const isActive = currentPerspective === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPerspective(p.id)}
                      className={`relative px-2.5 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "text-[#F2EAE0] font-bold"
                          : "text-[#281B16] hover:text-[#FE299E] font-medium"
                      }`}
                      data-testid={`perspective-option-${p.id}`}
                      aria-pressed={isActive}
                      title={`Mount ${p.pipeHandle} (${p.label} Perspective)`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-lens-pill"
                          transition={SPRING_LAYOUT}
                          className="absolute inset-0 bg-[#281B16] rounded-md -z-10 shadow-sm"
                        />
                      )}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 relative z-10"
                        style={{ backgroundColor: isActive ? "#FE299E" : p.accentColor }}
                      />
                      <span className="relative z-10">{p.pipeHandle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Navigation Links + Direct Product & Account CTAs */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              <nav className="flex items-center gap-5">
                {navItems.map(({ href, label }) => {
                  const isActive = location === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-sm transition-colors ${
                        isActive
                          ? "text-[#281B16] font-bold underline decoration-[#FE299E] decoration-2 underline-offset-8"
                          : "text-[#281B16] font-medium hover:text-[#FE299E]"
                      }`}
                      data-testid={`nav-${label.toLowerCase()}`}
                    >
                      {label}
                    </Link>
                  );
                })}

                <a
                  href="https://hire.colonhyphenbracket.pink/studio"
                  className="text-sm font-medium text-[#281B16] hover:text-[#FE299E] transition-colors"
                  data-testid="nav-work-with-us"
                >
                  R&amp;D Studio
                </a>
              </nav>

              <div className="flex items-center gap-2.5 pl-2 border-l border-[#D3C7B5]">
                <motion.a
                  whileHover={{ y: -1 }}
                  whileTap={TAP}
                  href="https://pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#231814] text-[#F2EAE0] hover:bg-[#3A2821] transition-colors font-mono text-xs font-bold tracking-wide inline-flex items-center gap-1.5"
                  data-testid="nav-launch-pipes"
                >
                  <span className="text-[#FE299E]">| | |</span>
                  <span>Open Pipes.Pink</span>
                  <ExternalLink className="h-3 w-3 text-[#D3C7B5]" />
                </motion.a>

                {isAuthenticated ? (
                  <motion.div whileHover={{ y: -1 }} whileTap={TAP}>
                    <Link
                      href="/account"
                      className="px-4 py-2 bg-[#FE299E] text-white rounded-lg hover:bg-[#E01E8B] transition-all font-semibold text-xs inline-flex items-center gap-1.5"
                      data-testid="account-button"
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>Account</span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ y: -1 }} whileTap={TAP}>
                    <Link
                      href="/signup"
                      className="px-4 py-2 bg-[#FE299E] text-white rounded-lg hover:bg-[#E01E8B] transition-all font-semibold text-xs inline-flex items-center gap-1"
                      data-testid="signup-button"
                    >
                      <span>Sign Up</span>
                      <span className="font-mono text-[11px] opacity-90">:-]</span>
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
                className="text-[#281B16] hover:bg-[#E4DACB]"
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
          className="md:hidden bg-[#F2EAE0] border-b border-[#D3C7B5] shadow-xl"
          id="mobile-menu"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
            {/* Mounted Perspective Pipe Selector on Mobile */}
            <div className="bg-[#E4DACB] border border-[#D3C7B5] rounded-xl p-3">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#281B16] mb-2">
                Mounted Perspective Pipe
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {perspectives.map((p) => {
                  const isActive = currentPerspective === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPerspective(p.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg text-center transition-all ${
                        isActive
                          ? "bg-[#231814] text-[#F2EAE0] font-bold"
                          : "bg-[#F2EAE0] text-[#281B16] font-medium border border-[#D3C7B5]"
                      }`}
                      data-testid={`mobile-perspective-${p.id}`}
                    >
                      <div className="font-mono text-[11px]">{p.pipeHandle}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          isActive ? "text-[#FE299E]" : "text-[#4A3A32]"
                        }`}
                      >
                        {p.label}
                      </div>
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
                  className={`block w-full py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
                    location === href
                      ? "bg-[#231814] text-[#F2EAE0]"
                      : "text-[#281B16] hover:bg-[#E4DACB]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${label.toLowerCase()}`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://hire.colonhyphenbracket.pink/studio"
                className="block w-full py-2.5 px-3 rounded-lg text-base font-semibold text-[#281B16] hover:bg-[#E4DACB] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-work-with-us"
              >
                R&amp;D Studio (Work With Us)
              </a>
            </div>

            {/* Direct Conversion CTAs */}
            <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-[#D3C7B5]">
              <a
                href="https://pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#231814] text-[#F2EAE0] font-mono text-sm font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-[#FE299E]">| | |</span>
                <span>Claim Your Pipe on Pipes.Pink</span>
                <ExternalLink className="h-4 w-4 text-[#FE299E]" />
              </a>
              <a
                href="https://pipes.pink/write"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#E4DACB] border border-[#D3C7B5] text-[#281B16] font-mono text-sm font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-[#1B6346]">#</span>
                <span>Open Hash Sanctuary &amp; Semi</span>
                <ExternalLink className="h-4 w-4 text-[#281B16]" />
              </a>
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-[#FE299E] text-white rounded-lg font-bold text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-account-button"
                >
                  <User className="h-4 w-4" />
                  <span>Manage :-] Account</span>
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="block px-5 py-3 bg-[#FE299E] text-white rounded-lg font-bold text-sm text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-signup-button"
                >
                  Create Universal :-] Account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
