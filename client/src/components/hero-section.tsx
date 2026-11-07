import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import {
  SPRING_LAYOUT,
  TAP,
  AccentRevealText,
} from "@/components/motion/primitives";
import type { Perspective } from "@/types/content";

export function HeroSection() {
  const { isTransitioning, currentPerspective, setPerspective } = usePerspective();
  const [activePunctuation, setActivePunctuation] = useState<
    "chb" | "hash" | "semi" | "scout" | "pipes" | "accent"
  >("chb");

  const perspectives: {
    id: Perspective;
    title: string;
    subtitle: string;
    albersBg: string;
    albersInk: string;
    albersSymbol: string;
    mark: string;
  }[] = [
    {
      id: "startup_founders",
      title: "Startup Founders",
      subtitle: "Scale your vision without Big Tech lock-in",
      albersBg: "#D4EBF5",
      albersInk: "#02212F",
      albersSymbol: "#01A9F4",
      mark: ":-]",
    },
    {
      id: "content_creators",
      title: "Content Creators",
      subtitle: "Create authentically & own your perspective",
      albersBg: "#F1DBDA",
      albersInk: "#18002E",
      albersSymbol: "#FE299E",
      mark: ";-]",
    },
    {
      id: "memory_capturers",
      title: "Memory Capturers",
      subtitle: "Preserve what matters for generations",
      albersBg: "#DBECC8",
      albersInk: "#192E01",
      albersSymbol: "#5C9F00",
      mark: "&",
    },
  ];

  const activeLens =
    perspectives.find((p) => p.id === currentPerspective) || perspectives[0];

  const heroContent = usePerspectiveContent({
    startup_founders: {
      eyebrow: "COLONHYPHENBRACKET :-] · FOR STARTUP FOUNDERS",
      title: "Scale your vision.",
      lead:
        "Break free from generic AI templates that flatten your competitive edge. Build with biased-by-design tools that learn your startup's unique voice, protect your proprietary data, and ship faster than a four-person agency pod.",
      primaryCtaText: "Explore Our Products",
      primaryCtaHref: "/products",
      secondaryCtaText: "Visit CHB Studio & R&D Lab",
      secondaryCtaHref: "/studio",
      humanPromise: [
        { k: "Same Budget", v: "One ecosystem replaces 4 SaaS tools" },
        { k: "Better Results", v: "AI that learns your business context" },
        { k: "Privacy & Control", v: "Zero model training on your moat" },
      ],
    },
    content_creators: {
      eyebrow: "COLONHYPHENBRACKET :-] · FOR CONTENT CREATORS",
      title: "Create authentically.",
      lead:
        "Stop fighting algorithms and generic AI slop that sounds like everyone else. Capture raw ideas in # Hash, collaborate with ;-] Semi—the creative partner who never forgets your voice—and publish on Pipes.Pink with 70% creator royalties.",
      primaryCtaText: "Explore Creator Tools",
      primaryCtaHref: "/products",
      secondaryCtaText: "Try # Hash & ;-] Semi Free",
      secondaryCtaHref: "https://pipes.pink/write",
      humanPromise: [
        { k: "Explicitly Biased", v: "Amplifies your perspective, not averages" },
        { k: "70% Royalties", v: "Earn when readers & AI agents cite you" },
        { k: "Independent", v: "No ads, no feed manipulation, ever" },
      ],
    },
    memory_capturers: {
      eyebrow: "COLONHYPHENBRACKET :-] · FOR FAMILIES & MEMORY CAPTURERS",
      title: "Preserve what matters.",
      lead:
        "Storage is cheap—there is no excuse for losing a single family memory or repeating yourself to an amnesiac chatbot. Build a private, encrypted sanctuary where your family's stories, recipes, and wisdom live across generations.",
      primaryCtaText: "Start Preserving Memories",
      primaryCtaHref: "/signup",
      secondaryCtaText: "How We Protect Families",
      secondaryCtaHref: "/memory-capturers-deep-dive",
      humanPromise: [
        { k: "She Doesn't Forget", v: "Constitutional memory across decades" },
        { k: "Family Sanctuary", v: "Encrypted & never sold to ad networks" },
        { k: "Human-First", v: "Designed for grandparents & kids alike" },
      ],
    },
  });

  const punctuationPlayground = {
    chb: {
      symbol: ":-]",
      name: "ColonHyphenBracket",
      tagline: "Human-first software with a wink & a smile",
      desc: "Before emojis were corporate cartoons, :-] was how humans signaled warmth across a terminal. Every tool we build is named after a punctuation mark because punctuation gives human thought structure, rhythm, and meaning.",
      status: "Parent Studio & Ecosystem",
      href: "/studio",
      cta: "Meet the Studio →",
      bg: "#FAF8F5",
      ink: "#111827",
      badgeBg: "#FE299E",
    },
    hash: {
      symbol: "#",
      name: "Hash Sanctuary",
      tagline: "Your private memory & writing sanctuary",
      desc: "Capture notes, journals, and business decisions effortlessly. Hash organizes your thoughts automatically without folders or rigid tagging—and never mines your private life for ad targeting.",
      status: "Live at pipes.pink/write",
      href: "/products/hash",
      cta: "Explore # Hash →",
      bg: "#DBECC8",
      ink: "#192E01",
      badgeBg: "#192E01",
    },
    semi: {
      symbol: ";-]",
      name: "Semi",
      tagline: "The patient AI partner who never forgets",
      desc: "A semicolon means a thought isn't finished yet. Semi remembers every project, preference, and family story you share—growing sharper and more helpful every week without you repeating yourself.",
      status: "Live · Free to Chat",
      href: "/products/semi",
      cta: "Meet ;-] Semi →",
      bg: "#F1DBDA",
      ink: "#18002E",
      badgeBg: "#FE299E",
    },
    scout: {
      symbol: "&",
      name: "Scout & Marigold",
      tagline: "Connect the dots across your knowledge & data",
      desc: "The ampersand (&) joins ideas together. Scout & Marigold link your notes, citations, and 500k+ row datasets right in your browser with zero cloud surveillance.",
      status: "Live Research & Analytics",
      href: "/scout",
      cta: "Explore & Scout →",
      bg: "#FFF5C9",
      ink: "#3F3300",
      badgeBg: "#3F3300",
    },
    pipes: {
      symbol: "|",
      name: "Pipes.Pink",
      tagline: "Curated human perspective & 70% creator royalties",
      desc: "Channel your expertise into deeded pipe\\ namespaces ($9/yr), share trusted lenses with your community, and get paid 70% whenever AI agents or subscribers query your work.",
      status: "Live at pipes.pink",
      href: "/products/pipes",
      cta: "Explore | Pipes →",
      bg: "#D4EBF5",
      ink: "#02212F",
      badgeBg: "#01A9F4",
    },
    accent: {
      symbol: "/",
      name: "Accént 3.0 Design System",
      tagline: "Josef Albers color & Massimo Vignelli grids in code",
      desc: "Our open-source W3C DTCG design system powering every CHB and Pipes surface: 49 WCAG AAA color pairings, tactile ink shadows, and 4.6KB LazyMotion choreography.",
      status: "Live at design.pipes.pink",
      href: "https://design.pipes.pink",
      cta: "Open design.pipes.pink ↗",
      bg: "#ECD9FD",
      ink: "#18002E",
      badgeBg: "#B8326D",
    },
  };

  const activeMark = punctuationPlayground[activePunctuation];

  return (
    <section
      className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 border-b-[1.5px] border-[#111827] transition-colors duration-500"
      style={{ backgroundColor: activeLens.albersBg }}
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Interactive Human Perspective Selector Banner */}
        <div className="mb-10 accent-card-tactile p-3 sm:p-4 bg-[#FAF8F5]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#FE299E] text-white font-mono text-xs font-bold border border-[#111827]">
                :-] WHO WE SERVE
              </span>
              <p className="text-xs sm:text-sm text-[#111827] font-medium">
                <strong>We build for real people, not Silicon Valley averages.</strong> Pick your perspective to see how CHB fits your life:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {perspectives.map((p) => {
                const isActive = currentPerspective === p.id;
                return (
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={TAP}
                    key={p.id}
                    type="button"
                    onClick={() => setPerspective(p.id)}
                    className={`px-3.5 py-2 rounded-lg text-left transition-all border-[1.5px] border-[#111827] cursor-pointer ${
                      isActive
                        ? "shadow-[0_3px_0_#111827] font-bold"
                        : "bg-[#FAF8F5] hover:bg-[#E8E2D5] opacity-85 hover:opacity-100"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: p.albersBg, color: p.albersInk }
                        : { color: "#111827" }
                    }
                    data-testid={`hero-perspective-${p.id}`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold tracking-tight">
                        {p.title}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#FE299E]">
                        {p.mark}
                      </span>
                    </div>
                    <div className="text-[11px] mt-0.5 opacity-80 line-clamp-1">
                      {p.subtitle}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main 12-Column Playful Editorial + Tactile Split Hero */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: Human-First Story & Promises */}
          <div
            className={`lg:col-span-7 space-y-6 transition-opacity duration-200 ${
              isTransitioning ? "opacity-40" : "opacity-100"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827]">
              <Sparkles className="w-3.5 h-3.5 text-[#FE299E]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111827]">
                {heroContent.eyebrow}
              </span>
            </div>

            <h1
              className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.02] tracking-tight"
              style={{ color: activeLens.albersInk }}
              data-testid="hero-title"
            >
              <AccentRevealText
                key={currentPerspective}
                text={heroContent.title}
                as="span"
                immediate
              />
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed max-w-2xl font-normal"
              style={{ color: activeLens.albersInk }}
              data-testid="hero-description"
            >
              {heroContent.lead}
            </p>

            {/* Primary & Secondary Playful Tactile Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
              <Link
                href={heroContent.primaryCtaHref}
                className="px-7 py-4 rounded-full bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2.5 group no-underline"
                data-testid="button-primary-cta"
              >
                <span>{heroContent.primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {heroContent.secondaryCtaHref.startsWith("http") ? (
                <a
                  href={heroContent.secondaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#111827] text-[#111827] hover:text-[#FAF8F5] font-bold text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all flex items-center justify-center gap-2 no-underline"
                  data-testid="button-secondary-cta"
                >
                  <span>{heroContent.secondaryCtaText}</span>
                  <ExternalLink className="h-4 w-4 text-[#FE299E]" />
                </a>
              ) : (
                <Link
                  href={heroContent.secondaryCtaHref}
                  className="px-7 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#111827] text-[#111827] hover:text-[#FAF8F5] font-bold text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all flex items-center justify-center gap-2 no-underline"
                  data-testid="button-secondary-cta"
                >
                  <span>{heroContent.secondaryCtaText}</span>
                  <ArrowRight className="h-4 w-4 text-[#FE299E]" />
                </Link>
              )}
            </div>

            {/* 3-Column Human Promise Cards */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {heroContent.humanPromise.map((item) => (
                <div
                  key={item.k}
                  className="bg-[#FAF8F5]/95 border-[1.5px] border-[#111827] rounded-xl px-4 py-3 shadow-[0_2px_0_#111827]"
                >
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#FE299E] font-bold">
                    {item.k}
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-semibold text-[#111827] mt-0.5 leading-snug">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Interactive CHB Punctuation Playground (Zero AI Slop — Pure Kinetic Punctuation) */}
          <div className="lg:col-span-5">
            <div className="accent-card-tactile p-5 sm:p-6 bg-[#FAF8F5]">
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b-[1.5px] border-[#111827]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FE299E] border border-[#111827]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#111827] font-bold">
                    INTERACTIVE PUNCTUATION FAMILY
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#374151]">
                  Click a mark to inspect
                </span>
              </div>

              {/* 6 Playful Punctuation Keycaps */}
              <div className="grid grid-cols-6 gap-1.5 mb-5">
                {(
                  [
                    { id: "chb", sym: ":-]", label: "CHB" },
                    { id: "hash", sym: "#", label: "Hash" },
                    { id: "semi", sym: ";-]", label: "Semi" },
                    { id: "scout", sym: "&", label: "Scout" },
                    { id: "pipes", sym: "|", label: "Pipes" },
                    { id: "accent", sym: "/", label: "Accént" },
                  ] as const
                ).map((item) => {
                  const isSelected = activePunctuation === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivePunctuation(item.id)}
                      className={`py-2.5 px-1 rounded-lg border-[1.5px] border-[#111827] flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#111827] text-[#FAF8F5] translate-y-[-2px] shadow-[0_3px_0_#FE299E]"
                          : "bg-[#E8E2D5] text-[#111827] hover:bg-[#FAF8F5] shadow-[0_2px_0_#111827]"
                      }`}
                      data-testid={`punctuation-key-${item.id}`}
                    >
                      <span
                        className={`font-mono text-base sm:text-lg font-bold leading-none ${
                          isSelected ? "text-[#FE299E]" : "text-[#111827]"
                        }`}
                      >
                        {item.sym}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-tighter mt-1 opacity-80">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Punctuation Card Display */}
              <motion.div
                key={activePunctuation}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl p-5 border-[1.5px] border-[#111827] transition-colors"
                style={{ backgroundColor: activeMark.bg, color: activeMark.ink }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-2 border border-[#111827]"
                      style={{ backgroundColor: activeMark.badgeBg }}
                    >
                      {activeMark.status}
                    </span>
                    <h3
                      className="font-serif text-2xl sm:text-3xl font-bold leading-tight"
                      style={{ color: activeMark.ink }}
                    >
                      {activeMark.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold opacity-80 mt-0.5">
                      {activeMark.tagline}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border-[1.5px] border-[#111827] shadow-[0_3px_0_#111827] flex items-center justify-center shrink-0">
                    <span className="font-mono text-2xl font-bold text-[#FE299E]">
                      {activeMark.symbol}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5 opacity-90">
                  {activeMark.desc}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#111827]/20">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                    Explicitly Biased Toward You
                  </span>
                  {activeMark.href.startsWith("http") ? (
                    <a
                      href={activeMark.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold no-underline transition-colors"
                    >
                      <span>{activeMark.cta}</span>
                    </a>
                  ) : (
                    <Link
                      href={activeMark.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold no-underline transition-colors"
                    >
                      <span>{activeMark.cta}</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
