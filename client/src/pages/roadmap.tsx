import { Check, ArrowRight, ExternalLink, Sparkles, Shield, Cpu } from "lucide-react";
import { Link } from "wouter";
import { usePerspectiveContent } from "@/hooks/use-perspective";

export default function Roadmap() {
  const heroContent = usePerspectiveContent({
    startup_founders: {
      eyebrow: "PIPE\\FOUNDERS // ARCHITECTURAL ROADMAP",
      title: "What We've Shipped—and Where Sovereign Knowledge Goes Next",
      subtitle:
        "Over the past 16 months, ColonHyphenBracket (:-]) moved from standalone AI experiments to a unified, production-grade Sovereign Knowledge Ecosystem anchored by Pipes.Pink.",
      image: "/images/pipes/pipes-dev-mcp-hub.png",
      imageCaption: "LIVE IN PRODUCTION — Pipes.Pink Developer & MCP Server Hub + HTTP 402 Agent Gate.",
    },
    content_creators: {
      eyebrow: "PIPE\\CREATORS // THE CURATOR ECONOMY ROADMAP",
      title: "Building the Sovereign Publishing & Royalty Rail for Human Creators",
      subtitle:
        "We promised creators a way to own their voice, unify private writing (# Hash + ;-] Semi) with public publishing (| | | Pipes), and collect 70% royalties when AI cites their work. That foundation is now live.",
      image: "/images/pipes/pipes-curator-dashboard.png",
      imageCaption: "LIVE IN PRODUCTION — Pipes.Pink Curator Analytics, Deeded Namespaces & 70% Royalty Engine.",
    },
    memory_capturers: {
      eyebrow: "PIPE\\LEGACY // GENERATIONAL MEMORY ROADMAP",
      title: "Preserving Human Wisdom Across Decades and Generations",
      subtitle:
        "From private # Hash memory vaults and ;-] Semi's persistent recall to encrypted Family Pipes and 90+ language Greater classrooms—see what is live today and what we are building next.",
      image: "/images/pipes/pipes-hash-studio-semi.png",
      imageCaption: "LIVE IN PRODUCTION — # Hash Epistemic Sanctuary & ;-] Semi unified inside Pipes.Pink/Write.",
    },
  });

  const phases = [
    {
      id: "foundation",
      badge: "PHASE 01 · COMPLETE & LIVE",
      title: "Core Memory & Socratic Intelligence",
      status: "complete",
      accentColor: "#1B6346",
      content: {
        startup_founders: [
          "✓ # Hash persistent strategic memory vault (Episodic, Semantic & Voice layers)",
          "✓ ;-] Semi Socratic co-founder & smart multi-model cost routing",
          "✓ Universal :-] OAuth 2.0 & Nostr NIP-07 cryptographic authentication",
          "✓ & Scout perspective discovery & cross-domain pattern recognition",
        ],
        content_creators: [
          "✓ # Hash private epistemic writing sanctuary (All / Notes / Journal / Mono)",
          "✓ ;-] Semi Socratic Editor-in-Residence who learns and protects your voice",
          "✓ 1-click Substack & RSS archive ingestion with automatic semantic tagging",
          "✓ Interactive 3D Knowledge Galaxy visualizing your entire body of work",
        ],
        memory_capturers: [
          "✓ # Hash private family memory journal with zero corporate model training",
          "✓ ;-] Semi patient memory companion ('She Doesn't Forget')",
          "✓ Constitutional storage guarantee: never repeat yourself to AI again",
          "✓ Simple, calm Warm Albers Sandstone interface built for every generation",
        ],
      },
    },
    {
      id: "integration",
      badge: "PHASE 02 · SHIPPED IN 2025–2026",
      title: "The Unified Pipes Sovereign Ecosystem",
      status: "complete",
      accentColor: "#FE299E",
      content: {
        startup_founders: [
          "✓ Pipes.Pink Sovereign Knowledge Protocol & Deeded pipe\\ Namespaces ($9/yr)",
          "✓ Unification of # Hash & ;-] Semi directly inside pipes.pink/write ('Seal to Pipe')",
          "✓ Model Context Protocol (MCP) Server & HTTP 402 Agent Gate (70% royalty split)",
          "✓ Marigold (bolt.pipes.pink) zero-PII DuckDB-WASM & ! BANG native macOS IDE",
        ],
        content_creators: [
          "✓ Deeded pipe\\handle ownership ($9/yr) with SHA-256 Merkle-DAG provenance",
          "✓ 70% creator revenue share on human subscriptions & AI agent MCP citations",
          "✓ Sovereign Podcast Pavilion for publishing verified audio + transcript canons",
          "✓ > Greater.Pink turnkey 90+ language classrooms powered by your Pipes",
        ],
        memory_capturers: [
          "✓ Unified # Hash + ;-] Semi workspace at pipes.pink/write",
          "✓ Selective 'Seal to Pipe' for private or family-only Legacy Pipes",
          "✓ > Greater.Pink 90+ language community & homeschooling classrooms",
          "✓ Local-first WebGPU browser inference for complete family privacy",
        ],
      },
    },
    {
      id: "evolution",
      badge: "PHASE 03 · ACTIVE R&D HORIZON",
      title: "Federation, Sovereign Hardware & Enterprise Clusters",
      status: "in-progress",
      accentColor: "#0B5CAB",
      content: {
        startup_founders: [
          "→ Air-gapped Enterprise Pipe Clusters for regulated banking, health & defense",
          "→ Cross-organization federated MCP citation settlements & Lightning/402 rails",
          "→ Automated schema & compliance verification inside Marigold + Pipes",
          "→ Expanded ! BANG macOS/iOS local multi-agent swarm orchestration",
        ],
        content_creators: [
          "→ Collaborative Multi-Curator Pipes with automatic royalty split contracts",
          "→ Real-time cryptographic citation badges for external websites & newsletters",
          "→ Direct reader-to-curator micro-patronage & sovereign audio syndication",
          "→ On-device voice synthesis & multilingual canon dubbing in Greater",
        ],
        memory_capturers: [
          "→ Generational Time-Capsule Pipes with multi-key family stewardship",
          "→ Offline-first home archive synchronization across desktop and mobile",
          "→ Guided oral-history interview modes with ;-] Semi for grandparents",
          "→ Printable archival heirloom editions compiled directly from # Hash",
        ],
      },
    },
  ];

  const visionContent = usePerspectiveContent({
    startup_founders: {
      title: "Our Architectural Vision for Builders",
      description:
        "AI should strengthen your company's proprietary moat, not dissolve it into a competitor's training set. Every protocol we ship is designed to give founders deterministic ownership over their domain intelligence.",
      principles: [
        "Proprietary domain knowledge belongs in a deeded Pipe—never in Big Tech's free training pool",
        "Explicit perspective beats fake algorithmic neutrality",
        "Local-first execution (WebGPU & DuckDB-WASM) eliminates cloud surveillance and runaway API bills",
        "Human architects remain AI's boss, source, and regulator",
      ],
    },
    content_creators: {
      title: "Our Vision for the Curator Economy",
      description:
        "The next era of the internet belongs to verified human curators. By combining private epistemic writing (# Hash + ;-] Semi) with cryptographic publishing and MCP metering (| | | Pipes), creators turn AI from a threat into a 70% royalty stream.",
      principles: [
        "Every creator deserves a deeded pipe\\handle and cryptographic proof of authorship",
        "AI agents must pay 70% royalties via MCP & HTTP 402 to cite human expertise",
        "Socratic editing sharpens your authentic voice instead of replacing it with slop",
        "Independent ownership guarantees zero algorithmic throttling",
      ],
    },
    memory_capturers: {
      title: "Our Vision for Families & Legacy",
      description:
        "Technology should honor human relationships and preserve wisdom across generations—quietly, privately, and without manipulation.",
      principles: [
        "Storage is cheap: nothing you write in # Hash is ever lost or forgotten",
        "Constitutional privacy: your family stories never train corporate foundation models",
        "Patient, respectful AI (;-] Semi) that adapts to your pace and remembers your context",
        "Heirloom-grade software built to last for decades, not quarterly ad cycles",
      ],
    },
  });

  return (
    <main className="pt-20 bg-[#EAE0D0] text-[#281B16]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#231814] text-[#FE299E] font-mono text-xs font-bold uppercase tracking-[0.15em]">
                {heroContent.eyebrow}
              </div>
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#281B16] leading-[1.08] tracking-tight"
                data-testid="roadmap-title"
              >
                {heroContent.title}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#4A3A32] leading-relaxed max-w-2xl">
                {heroContent.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors"
                  data-testid="roadmap-cta-pipes"
                >
                  <span>Explore Live on Pipes.Pink</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://pipes.pink/write"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-bold text-sm inline-flex items-center gap-2 transition-colors"
                  data-testid="roadmap-cta-hash"
                >
                  <span>Open # Hash &amp; ;-] Semi</span>
                  <ExternalLink className="h-4 w-4 text-[#FE299E]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#231814] border border-[#3D2B24] rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="rounded-xl overflow-hidden border border-[#3D2B24] bg-[#160F0C]">
                  <img
                    src={heroContent.image}
                    alt="CHB Shipped Architecture"
                    className="w-full h-56 sm:h-64 object-cover object-top"
                    data-testid="roadmap-header-image"
                  />
                </div>
                <p className="font-mono text-[11px] text-[#D3C7B5] mt-3 leading-relaxed">
                  {heroContent.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Phase Roadmap Grid */}
      <section className="py-16 lg:py-24 bg-[#E4DACB] border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {phases.map((phase) => {
              const phaseContent = usePerspectiveContent(phase.content);

              return (
                <div
                  key={phase.id}
                  className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#D3C7B5]">
                      <span
                        className="px-2.5 py-1 rounded text-white font-mono text-[11px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: phase.accentColor }}
                      >
                        {phase.badge}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-mono text-xs font-bold"
                        style={{ backgroundColor: phase.accentColor }}
                      >
                        {phase.status === "complete" ? <Check size={16} /> : "03"}
                      </div>
                    </div>

                    <h3
                      className="font-serif text-2xl sm:text-3xl font-bold text-[#281B16]"
                      data-testid={`phase-${phase.id}-title`}
                    >
                      {phase.title}
                    </h3>

                    <div className="space-y-3">
                      {phaseContent.map((item, index) => (
                        <p
                          key={index}
                          className="text-sm sm:text-base text-[#281B16] leading-relaxed font-medium"
                          data-testid={`phase-${phase.id}-item-${index}`}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Constitutional AI Principles */}
      <section className="py-16 lg:py-24 bg-[#EAE0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#281B16]"
              data-testid="vision-title"
            >
              {visionContent.title}
            </h2>
            <p
              className="text-base sm:text-lg text-[#4A3A32] leading-relaxed"
              data-testid="vision-description"
            >
              {visionContent.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {visionContent.principles.map((principle, index) => (
              <div
                key={index}
                className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-xl p-6 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-7 h-7 bg-[#231814] text-[#FE299E] rounded-lg flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                  0{index + 1}
                </div>
                <span
                  className="text-sm sm:text-base text-[#281B16] font-medium leading-relaxed"
                  data-testid={`principle-${index}`}
                >
                  {principle}
                </span>
              </div>
            ))}
          </div>

          {/* High-Contrast Dark Espresso CTA Box */}
          <div className="bg-[#231814] border border-[#3D2B24] rounded-2xl p-8 lg:p-12 text-[#F2EAE0] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#FE299E]">
                BUILD WITH US // SELF-SERVE OR BESPOKE R&amp;D
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2EAE0]">
                Want to claim your <code className="font-mono text-[#FE299E]">pipe\</code> namespace or commission a custom architecture sprint?
              </h3>
              <p className="text-sm sm:text-base text-[#D3C7B5] leading-relaxed">
                Everything in Phase 01 and Phase 02 is live right now at <strong>pipes.pink</strong>, <strong>greater.pink</strong>, and <strong>bolt.pipes.pink</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
              >
                <span>Claim Your Pipe ($9/yr)</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://hire.colonhyphenbracket.pink/studio"
                className="px-6 py-3.5 rounded-xl bg-[#F2EAE0] hover:bg-white text-[#231814] font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
              >
                <span>R&amp;D Studio ($7.5k Sprint)</span>
                <ArrowRight className="h-4 w-4 text-[#FE299E]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
