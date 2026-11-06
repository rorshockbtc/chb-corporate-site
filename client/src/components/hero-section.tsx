import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { ArrowRight, ExternalLink, Shield, Sparkles, Terminal, Layers } from "lucide-react";
import {
  SPRING_LAYOUT,
  TAP,
  CARD_HOVER,
  CARD_TAP,
  AccentRevealText,
  AccentRevealImage,
} from "@/components/motion/primitives";
import type { Perspective } from "@/types/content";

export function HeroSection() {
  const { isTransitioning, currentPerspective, setPerspective } = usePerspective();
  const [activeProductTab, setActiveProductTab] = useState<
    "pipes" | "hash_semi" | "mcp_galaxy" | "greater_marigold"
  >("pipes");

  const perspectives: {
    id: Perspective;
    pipeHandle: string;
    shortTitle: string;
    description: string;
    accentColor: string;
  }[] = [
    {
      id: "startup_founders",
      pipeHandle: "pipe\\founders",
      shortTitle: "Builders & Founders",
      description: "Sovereign AI, domain moats & R&D sprints",
      accentColor: "#0B5CAB",
    },
    {
      id: "content_creators",
      pipeHandle: "pipe\\creators",
      shortTitle: "Authors & Curators",
      description: "Deeded namespaces & 70% AI royalties",
      accentColor: "#B81468",
    },
    {
      id: "memory_capturers",
      pipeHandle: "pipe\\legacy",
      shortTitle: "Families & Historians",
      description: "Private memory vaults & patient AI",
      accentColor: "#1B6346",
    },
  ];

  const heroContent = usePerspectiveContent({
    startup_founders: {
      eyebrow: "PIPE\\FOUNDERS // SOVEREIGN KNOWLEDGE & INFRASTRUCTURE",
      title: "Own your domain's intelligence. Don't rent it from Big Tech.",
      description:
        "ColonHyphenBracket (:-]) builds sovereign knowledge infrastructure for founders and overlooked markets. Seal institutional expertise into cryptographic pipe\\ namespaces on Pipes.Pink, think privately in # Hash Sanctuary with ;-] Semi, and deploy local-first AI that never leaks your competitive moat.",
      primaryCtaText: "Claim Your Pipe on Pipes.Pink",
      primaryCtaSub: "Free reader · $9/yr deeded namespace",
      secondaryCtaText: "Open # Hash + ;-] Semi Studio",
      metricStrip: [
        { label: "Creator & Domain Share", value: "70% via MCP & HTTP 402" },
        { label: "Cryptographic Canon", value: "SHA-256 Merkle-DAG" },
        { label: "Bespoke R&D Sprint", value: "$7,500 / 1-Week Shipped" },
      ],
    },
    content_creators: {
      eyebrow: "PIPE\\CREATORS // THE CURATOR ECONOMY",
      title: "Your voice is sovereign property. Make AI pay to cite it.",
      description:
        "AI giants scraped the open web without consent or compensation. Pipes.Pink restores the covenant: draft and refine inside your private # Hash Sanctuary with ;-] Semi, seal your canon into a deeded pipe\\ handle ($9/yr), and earn 70% royalties whenever AI agents or subscribers query your work.",
      primaryCtaText: "Start Curating on Pipes.Pink",
      primaryCtaSub: "Earn 70% royalties on AI & reader queries",
      secondaryCtaText: "Write Free in # Hash Sanctuary",
      metricStrip: [
        { label: "Creator Royalty Split", value: "70% Direct to You" },
        { label: "Deeded Namespace", value: "$9/yr Sovereign Handle" },
        { label: "Substack & RSS Import", value: "1-Click Canon Ingestion" },
      ],
    },
    memory_capturers: {
      eyebrow: "PIPE\\LEGACY // CONSTITUTIONAL MEMORY",
      title: "A private sanctuary for the stories your family can't afford to lose.",
      description:
        "Storage is cheap—there is no excuse for losing a single memory or repeating yourself to an amnesiac chatbot. Capture decades of family wisdom in # Hash Sanctuary, converse with ;-] Semi ('She Doesn't Forget'), and preserve an encrypted, living legacy Pipe for future generations.",
      primaryCtaText: "Open Your Private # Hash Vault",
      primaryCtaSub: "Zero training leakage · Encrypted memory",
      secondaryCtaText: "Explore Family Pipes on Pipes.Pink",
      metricStrip: [
        { label: "Constitutional Rule", value: "She Doesn't Forget" },
        { label: "Privacy Guarantee", value: "Zero Model Training" },
        { label: "Legacy Sharing", value: "Selective Family Pipes" },
      ],
    },
  });

  const productShowcases = {
    pipes: {
      symbol: "| | |",
      badge: "LIVE FLAGSHIP · PIPES.PINK",
      title: "Pipes Sovereign Knowledge Protocol & Marketplace",
      caption:
        "Deed your own pipe\\handle ($9/yr), publish SHA-256 verified knowledge canons, and monetize via human subscriptions + HTTP 402 AI agent queries (70% creator split).",
      image: "/images/pipes/pipes-marketplace.png",
      ctaLabel: "Sign Up & Claim a Pipe on Pipes.Pink",
      ctaHref: "https://pipes.pink",
    },
    hash_semi: {
      symbol: "# + ;-]",
      badge: "UNIFIED IN PIPES · PIPES.PINK/WRITE",
      title: "# Hash Epistemic Sanctuary & ;-] Semi Socratic Editor",
      caption:
        "Your private writing vault (All / Notes / Journal / Mono) paired with Semi—the Socratic Editor-in-Residence who remembers every entry and helps you 'Seal to Pipe' when ready.",
      image: "/images/pipes/pipes-hash-studio-semi.png",
      ctaLabel: "Open # Hash & ;-] Semi Free",
      ctaHref: "https://pipes.pink/write",
    },
    mcp_galaxy: {
      symbol: "& + !",
      badge: "AGENT GATE · MCP & 3D GALAXY",
      title: "Ampersand Citation Graph, MCP Hub & ! BANG macOS IDE",
      caption:
        "Visualize every note in a 3D Knowledge Galaxy, connect Pipes directly to Claude & Cursor via MCP, or run local-first multi-agent swarms in the native macOS ! BANG IDE.",
      image: "/images/pipes/pipes-dev-mcp-hub.png",
      ctaLabel: "Explore Developer & MCP Hub",
      ctaHref: "https://pipes.pink",
    },
    greater_marigold: {
      symbol: "> + &",
      badge: "SOVEREIGN EDUCATION & ANALYTICS",
      title: "> Greater Classrooms (90+ Languages) & Marigold DuckDB-WASM",
      caption:
        "Deploy turnkey multilingual classrooms in 60 seconds (greater.pink) or run zero-PII client-side statistical record linkage on 500k+ rows in the browser (bolt.pipes.pink).",
      image: "/images/pipes/pipes-classroom-mpb.png",
      ctaLabel: "Launch Greater.Pink Classroom",
      ctaHref: "https://greater.pink",
    },
  };

  const activeShowcase = productShowcases[activeProductTab];

  return (
    <section className="relative pt-20 pb-16 lg:pt-24 lg:pb-24 bg-[#EAE0D0] border-b border-[#D3C7B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Issue / Volume Masthead — Swiss Architectural Ledger */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#D3C7B5] pb-3 mb-6 text-[11px] font-mono uppercase tracking-[0.2em] text-[#4A3A32]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FE299E] animate-pulse" />
            <span className="font-bold text-[#281B16]">COLON HYPHEN BRACKET · VOL. 04</span>
          </div>
          <span className="hidden sm:inline">SOVEREIGN KNOWLEDGE R&amp;D LAB &amp; ARCHITECTURAL STUDIO</span>
          <span>EST. 2024 · ALL SYSTEMS SHIP LIVE</span>
        </div>

        {/* Top Interactive Perspective Pipe Bar — Explains the 3 Perspectives as Live Pipes */}
        <div className="mb-10 bg-[#F2EAE0] border border-[#D3C7B5] rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-[#231814] text-[#FE299E] font-mono text-xs font-bold">
                | | | LIVE PIPE LENS
              </span>
              <p className="text-xs sm:text-sm text-[#281B16] font-medium">
                <strong>Experience Pipes in action:</strong> Mount a perspective lens below to re-index this entire site for your domain.
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
                    onClick={() => setPerspective(p.id)}
                    className={`px-3.5 py-2 rounded-lg text-left transition-all border cursor-pointer ${
                      isActive
                        ? "bg-[#231814] text-[#F2EAE0] border-[#231814] shadow-sm"
                        : "bg-[#EAE0D0]/70 text-[#281B16] border-[#D3C7B5] hover:bg-[#E4DACB]"
                    }`}
                    data-testid={`hero-perspective-${p.id}`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold tracking-tight">
                        {p.pipeHandle}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isActive ? "#FE299E" : p.accentColor }}
                      />
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 font-medium ${
                        isActive ? "text-[#D3C7B5]" : "text-[#4A3A32]"
                      }`}
                    >
                      {p.shortTitle}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main 12-Column Swiss Architectural Split Hero */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Columns: Editorial Proposition & Direct Conversion Funnel */}
          <div
            className={`lg:col-span-7 space-y-6 transition-opacity duration-200 ${
              isTransitioning ? "opacity-40" : "opacity-100"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#E4DACB] border border-[#D3C7B5]">
              <span className="w-2 h-2 rounded-full bg-[#FE299E]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#281B16]">
                {heroContent.eyebrow}
              </span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-[3.65rem] font-light text-[#281B16] leading-[1.05] tracking-tight"
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
              className="text-base sm:text-lg lg:text-xl text-[#281B16]/90 leading-relaxed max-w-2xl font-normal"
              data-testid="hero-description"
            >
              {heroContent.description}
            </p>

            {/* Primary & Secondary Conversion CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={TAP}
                href={
                  currentPerspective === "memory_capturers"
                    ? "https://pipes.pink/write"
                    : "https://pipes.pink"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 group"
                data-testid="button-primary-pipes-cta"
              >
                <span>{heroContent.primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={TAP}
                href={
                  currentPerspective === "memory_capturers"
                    ? "https://pipes.pink"
                    : "https://pipes.pink/write"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-semibold text-base transition-all flex items-center justify-center gap-2"
                data-testid="button-secondary-hash-cta"
              >
                <span>{heroContent.secondaryCtaText}</span>
                <ExternalLink className="h-4 w-4 text-[#FE299E]" />
              </motion.a>
            </div>

            {/* Direct Account & Ecosystem Quick-Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm font-medium text-[#281B16]">
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 text-[#281B16] hover:text-[#FE299E] underline decoration-[#FE299E] decoration-2 underline-offset-4 font-semibold"
                data-testid="hero-link-signup"
              >
                <span>Create Universal :-] Account</span>
              </Link>
              <span className="text-[#D3C7B5]">•</span>
              <a
                href="https://greater.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#4A3A32] hover:text-[#281B16] transition-colors"
              >
                <span className="font-mono font-bold text-[#0B5CAB]">&gt;</span>
                <span>Launch Greater Classroom</span>
              </a>
              <span className="text-[#D3C7B5]">•</span>
              <a
                href="https://hire.colonhyphenbracket.pink/studio"
                className="inline-flex items-center gap-1 text-[#4A3A32] hover:text-[#281B16] transition-colors"
              >
                <span>Commission 1-Week R&amp;D Sprint ($7.5k) →</span>
              </a>
            </div>

            {/* 3-Column Architectural Proof Strip */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#D3C7B5]">
              {heroContent.metricStrip.map((metric, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-lg px-4 py-3"
                >
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#4A3A32] font-semibold">
                    {metric.label}
                  </div>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#281B16] mt-0.5">
                    {metric.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Dark Espresso (#231814) Live Product Studio Well */}
          <div className="lg:col-span-5">
            <div className="bg-[#231814] border-2 border-[#281B16] rounded-2xl p-4 sm:p-5 text-[#F2EAE0] shadow-xl">
              {/* Studio Well Header & Interactive Operator Tabs */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#3D2B24]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FE299E]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#D3C7B5] font-bold">
                    LIVE SOVEREIGN ECOSYSTEM
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#FE299E] font-bold">
                  {activeShowcase.badge}
                </span>
              </div>

              {/* 4 Operator Switcher Buttons with Shared Spring Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5 mb-4">
                {[
                  { id: "pipes" as const, symbol: "| | |", label: "Pipes.Pink" },
                  { id: "hash_semi" as const, symbol: "# ;-]", label: "Hash + Semi" },
                  { id: "mcp_galaxy" as const, symbol: "& !", label: "MCP & IDE" },
                  { id: "greater_marigold" as const, symbol: "> &", label: "Greater" },
                ].map((tab) => {
                  const isSelected = activeProductTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveProductTab(tab.id)}
                      className={`relative px-2.5 py-2 rounded-lg font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "text-white font-bold"
                          : "text-[#D3C7B5] hover:text-white bg-[#2E201B] border border-[#3D2B24]"
                      }`}
                      data-testid={`hero-showcase-tab-${tab.id}`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="hero-operator-pill"
                          transition={SPRING_LAYOUT}
                          className="absolute inset-0 bg-[#FE299E] rounded-lg -z-0"
                        />
                      )}
                      <span className="relative z-10">{tab.symbol}</span>
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* High-Contrast Screenshot Frame with Curtain Reveal */}
              <div className="rounded-xl overflow-hidden border border-[#3D2B24] bg-[#160F0C] mb-4">
                <AccentRevealImage
                  key={activeProductTab}
                  src={activeShowcase.image}
                  alt={activeShowcase.title}
                  className="w-full h-56 sm:h-64"
                  imgClassName="object-top"
                  delay={0.05}
                />
              </div>

              {/* Showcase Caption & Direct Product Launch CTA */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#FE299E]/20 text-[#FE299E] font-mono text-xs font-bold">
                    {activeShowcase.symbol}
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F2EAE0] leading-snug">
                    {activeShowcase.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#D3C7B5] leading-relaxed">
                  {activeShowcase.caption}
                </p>
                <div className="pt-1 flex items-center justify-between gap-3">
                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    whileTap={TAP}
                    href={activeShowcase.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#F2EAE0] hover:bg-white text-[#231814] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    data-testid="hero-showcase-launch-cta"
                  >
                    <span>{activeShowcase.ctaLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#FE299E]" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}