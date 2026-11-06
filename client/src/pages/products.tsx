import { BookOpen, ArrowRight, Lightbulb, Download, Brain, Shield, Zap, Users, Database, Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePerspectiveContent } from "@/hooks/use-perspective";
import {
  TAP,
  CARD_HOVER,
  CARD_TAP,
  AccentRevealText,
  AccentRevealImage,
  AccentKineticBadge,
  AccentEditorialReveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/primitives";

export default function Products() {
  const heroContent = usePerspectiveContent({
    startup_founders: {
      eyebrow: "PIPE\\FOUNDERS // SOVEREIGN PRODUCT SUITE",
      title: "One Account. Five Sovereign Operators.",
      subtitle: "Infrastructure for the Curator Economy",
      description:
        "This isn't a generic AI wrapper suite. It is sovereign knowledge infrastructure—where founders and domain experts own their pipe\\ namespaces, keep 70% of AI citation revenue, and run local-first intelligence without training a competitor's model.",
      workflowTitle: "The Founder & Builder Journey",
      workflowDescription: "From private architectural notes to a monetized, MCP-connected domain Pipe",
    },
    content_creators: {
      eyebrow: "PIPE\\CREATORS // THE CURATOR ECONOMY",
      title: "One Account. Five Sovereign Operators.",
      subtitle: "Own Your Voice & Your Canon",
      description:
        "This isn't a generic content generator. It is infrastructure for the Curator Economy—where your private # Hash notebook and ;-] Semi Socratic editor compile directly into deeded Pipes ($9/yr) that pay you 70% royalties.",
      workflowTitle: "The Creator & Author Journey",
      workflowDescription: "From raw sparks in # Hash Sanctuary to recurring 70% royalties on Pipes.Pink",
    },
    memory_capturers: {
      eyebrow: "PIPE\\LEGACY // CONSTITUTIONAL MEMORY",
      title: "One Account. Five Sovereign Operators.",
      subtitle: "Preserve What Matters Forever",
      description:
        "Storage is cheap—nothing you care about should ever be lost or harvested by advertisers. Capture decades of family wisdom in # Hash Sanctuary, converse with ;-] Semi ('She Doesn't Forget'), and share encrypted family Pipes across generations.",
      workflowTitle: "The Family & Legacy Journey",
      workflowDescription: "From private daily memories to a living family canon that endures",
    },
  });

  const workflowSteps = usePerspectiveContent({
    startup_founders: [
      {
        step: "01",
        product: "# Hash + ;-] Semi",
        symbol: "# ;-]",
        accent: "#1B6346",
        title: "Think Privately & Stress-Test with Semi",
        description:
          "Capture strategic memos, architecture decisions, and pitch iterations inside pipes.pink/write. Semi remembers every prior decision and challenges your assumptions without leaking data.",
        detail: "Constitutional memory that compounds across every sprint",
        ctaHref: "https://pipes.pink/write",
        ctaLabel: "Open # Hash + ;-] Semi",
      },
      {
        step: "02",
        product: "| | | Pipes",
        symbol: "| | |",
        accent: "#FE299E",
        title: "Seal to a Deeded pipe\\ Namespace",
        description:
          "Compile your verified playbooks into a SHA-256 Merkle-DAG canon under your own pipe\\handle ($9/yr) on pipes.pink—ready for internal team mounting or public discovery.",
        detail: "Cryptographic provenance for your institutional moat",
        ctaHref: "https://pipes.pink",
        ctaLabel: "Claim Your Pipe ($9/yr)",
      },
      {
        step: "03",
        product: "& MCP + > Greater",
        symbol: "& >",
        accent: "#0B5CAB",
        title: "Connect Agents via MCP & Scale Classrooms",
        description:
          "Expose your Pipe to Claude, Cursor, and enterprise agents via Model Context Protocol & HTTP 402 (earning 70% royalties), or spin up 90+ language training classrooms on greater.pink.",
        detail: "Deterministic citations & turnkey global distribution",
        ctaHref: "https://greater.pink",
        ctaLabel: "Explore Greater & MCP",
      },
    ],
    content_creators: [
      {
        step: "01",
        product: "# Hash + ;-] Semi",
        symbol: "# ;-]",
        accent: "#1B6346",
        title: "Import Your Archive & Draft in Sanctuary",
        description:
          "Ingest your Substack in one click or draft fresh essays inside pipes.pink/write. ;-] Semi acts as your Socratic Editor-in-Residence who knows your voice and never writes hollow slop.",
        detail: "First drafts and Socratic edits grounded in your voice",
        ctaHref: "https://pipes.pink/write",
        ctaLabel: "Write in # Hash Sanctuary",
      },
      {
        step: "02",
        product: "| | | Pipes",
        symbol: "| | |",
        accent: "#FE299E",
        title: "Deed Your Pipe & Publish Sovereign Podcasts",
        description:
          "Hit 'Seal to Pipe' to publish SHA-256 verified editions and audio episodes in the Sovereign Podcast Pavilion under your own pipe\\handle ($9/yr).",
        detail: "You own the namespace, the subscriber list, and the canon",
        ctaHref: "https://pipes.pink",
        ctaLabel: "Claim Your Creator Pipe",
      },
      {
        step: "03",
        product: "70% Royalties",
        symbol: "70%",
        accent: "#B81468",
        title: "Earn 70% When Humans Subscribe or AI Cites You",
        description:
          "Instead of letting AI labs scrape your work for free, our MCP Server and HTTP 402 Agent Gate meter agent queries and route 70% of all revenue directly to you.",
        detail: "Turn AI scraping into recurring creator equity",
        ctaHref: "/products/pipes",
        ctaLabel: "Read Curator Economics",
      },
    ],
    memory_capturers: [
      {
        step: "01",
        product: "# Hash Sanctuary",
        symbol: "#",
        accent: "#1B6346",
        title: "Capture Stories, Recipes & Wisdom",
        description:
          "Write naturally in your private # Hash Sanctuary (pipes.pink/write). Every family story, recipe, and lesson is encrypted and organized automatically.",
        detail: "Private by default—never used to train corporate AI",
        ctaHref: "https://pipes.pink/write",
        ctaLabel: "Open # Hash Vault Free",
      },
      {
        step: "02",
        product: ";-] Semi",
        symbol: ";-]",
        accent: "#B81468",
        title: "Converse with a Companion Who Never Forgets",
        description:
          "Because ;-] Semi reads your # Hash vault, she remembers your family tree, preferences, and stories across years—always patient, always at your pace.",
        detail: "She doesn't forget—because # Hash remembers",
        ctaHref: "/products/semi",
        ctaLabel: "Learn About ;-] Semi",
      },
      {
        step: "03",
        product: "| | | Family Pipes",
        symbol: "| | |",
        accent: "#FE299E",
        title: "Pass Down a Living Family Pipe",
        description:
          "Selectively seal cherished memories or recipes into a private Family Pipe on pipes.pink so your children and grandchildren can explore your wisdom in your own words.",
        detail: "A living heirloom for generations to come",
        ctaHref: "https://pipes.pink",
        ctaLabel: "Explore Family Pipes",
      },
    ],
  });

  const products = [
    {
      id: "pipes",
      name: "Pipes",
      symbol: "| | |",
      badge: "LIVE FLAGSHIP · PIPES.PINK",
      accentColor: "#FE299E",
      oneLiner: "The Sovereign Knowledge Protocol, Marketplace & ! BANG macOS IDE.",
      description:
        "Deed your own pipe\\handle ($9/yr), seal SHA-256 Merkle-DAG canons from your # Hash vault, host Sovereign Podcasts, and earn 70% royalties when subscribers or AI agents query your expertise via MCP & HTTP 402.",
      features: [
        "Deeded pipe\\ namespaces ($9/yr) & SHA-256 canons",
        "70% creator revenue share via MCP & HTTP 402 Agent Gate",
        "Sovereign Podcast Pavilion & 3D Knowledge Galaxy",
        "Native macOS ! BANG Agentic IDE for local-first builders",
      ],
      image: "/images/pipes/pipes-marketplace.png",
      link: "/products/pipes",
      external: "https://pipes.pink",
      externalLabel: "Claim a Pipe on Pipes.Pink",
    },
    {
      id: "hash",
      name: "Hash Sanctuary",
      symbol: "#",
      badge: "UNIFIED IN PIPES · PIPES.PINK/WRITE",
      accentColor: "#1B6346",
      oneLiner: "Your private epistemic writing & memory vault that never forgets.",
      description:
        "Now unified directly inside Pipes (pipes.pink/write). Capture notes, journals, and long-form essays across four modes (All / Notes / Journal / Mono), import your Substack in one click, and 'Seal to Pipe' whenever you're ready.",
      features: [
        "Private by constitution—zero third-party model training",
        "Episodic, semantic, and voice-learning memory layers",
        "1-click Substack & RSS archive ingestion",
        "Direct 'Seal to Pipe' cryptographic compilation",
      ],
      image: "/images/pipes/pipes-hash-sanctuary.png",
      link: "/products/hash",
      external: "https://pipes.pink/write",
      externalLabel: "Open # Hash Sanctuary Free",
    },
    {
      id: "semi",
      name: "Semi",
      symbol: ";-]",
      badge: "UNIFIED IN PIPES · PIPES.PINK/WRITE",
      accentColor: "#B81468",
      oneLiner: "Your Socratic Editor-in-Residence who remembers your entire vault.",
      description:
        "Living alongside # Hash inside pipes.pink/write, Semi reads your persistent memory vault so you never repeat yourself. She sharpens your thinking through Socratic dialogue and routes queries intelligently to cut AI costs by 60%+.",
      features: [
        "'She Doesn't Forget'—continuous recall across your # Hash vault",
        "Socratic Editor-in-Residence (human agency over autopilot slop)",
        "Smart local + frontier model routing for transparent cost control",
        "Learns and preserves your authentic writing voice",
      ],
      image: "/images/pipes/pipes-hash-studio-semi.png",
      link: "/products/semi",
      external: "https://pipes.pink/write",
      externalLabel: "Chat with ;-] Semi in Pipes",
    },
    {
      id: "greater",
      name: "Greater",
      symbol: ">",
      badge: "LIVE · GREATER.PINK",
      accentColor: "#0B5CAB",
      oneLiner: "Turnkey 90+ language Sovereign Classrooms & local WebGPU AI.",
      description:
        "Transform any curated Pipe into an interactive, multilingual learning environment in 60 seconds (npx @pipes/greater). Powered by on-device WebGPU neural inference so schools and communities pay $0 in cloud API bills.",
      features: [
        "Real-time curriculum translation across 90+ languages",
        "Zero-cloud WebGPU browser inference engine",
        "Built for micro-schools, homeschoolers & technical bootcamps",
        "Seamless integration with curated Pipes canons",
      ],
      image: "/images/pipes/pipes-classroom-mpb.png",
      link: "/products/pipes",
      external: "https://greater.pink",
      externalLabel: "Launch Greater.Pink",
    },
    {
      id: "marigold",
      name: "Ampersand / Scout & Marigold",
      symbol: "&",
      badge: "LIVE · BOLT.PIPES.PINK",
      accentColor: "#B85D19",
      oneLiner: "Sub-200ms semantic citation graph & zero-PII DuckDB-WASM analytics.",
      description:
        "Ampersand (&) powers the cross-Pipe citation graph and Scout perspective discovery, while Marigold (bolt.pipes.pink) executes 500k+ row statistical record linkage and Apache Arrow analytics 100% inside your browser.",
      features: [
        "Sub-200ms semantic citation graph across Sovereign Pipes",
        "DuckDB-WASM + Apache Arrow zero-knowledge browser analytics",
        "Fellegi-Sunter probabilistic record linkage with zero PII leakage",
        "Scout perspective engine for discovering overlooked connections",
      ],
      image: "/images/marigold/01_marigold_landing_hero.png",
      link: "/scout",
      external: "https://bolt.pipes.pink",
      externalLabel: "Open Marigold Workbench",
    },
    {
      id: "studio",
      name: "CHB R&D Studio",
      symbol: ":-]",
      badge: "BESPOKE SPRINTS · HIRE.COLONHYPHENBRACKET.PINK",
      accentColor: "#231814",
      oneLiner: "1-Week Architecture Sprints ($7.5k) & Zero-to-One Sovereign Builds.",
      description:
        "Need custom sovereign AI, an enterprise Pipe cluster, or a high-craft product shipped in production code without agency bloat? Partner directly with Principal Architect Kyle Cyree.",
      features: [
        "$7,500 1-Week Architecture & Functional Prototype Sprint",
        "$15k–$25k Zero-to-One Production Systems Engagement",
        "Proven across regulated fintech (Custodia), Lowe's, Walmart & Centene",
        "Direct principal execution—strategy (MBA), craft (MFA) & shipping code",
      ],
      image: "/images/studio/studio-hero-architecture.png",
      link: "/contact",
      external: "https://hire.colonhyphenbracket.pink/studio",
      externalLabel: "Commission the R&D Studio",
    },
  ];

  const chbPromise = [
    {
      icon: Brain,
      title: "She doesn't forget",
      description: "Context persists across your # Hash vault and ;-] Semi. Never repeat yourself to AI again.",
    },
    {
      icon: Shield,
      title: "Your canon, your deed",
      description: "Deed your pipe\\ namespace for $9/yr and keep 70% of all subscriber and AI agent MCP royalties.",
    },
    {
      icon: Database,
      title: "Storage is constitutional",
      description: "Nothing is ever lost, throttled, or silently used to train somebody else's foundation model.",
    },
    {
      icon: Users,
      title: "Amplification, not slop",
      description: "Human judgment stays in command. AI is your Socratic editor and router—never your replacement.",
    },
  ];

  const chbCaseStudyContent = usePerspectiveContent({
    startup_founders: {
      title: "How We Built This: Drinking Our Own Perspective-Pipe Champagne",
      description:
        "This corporate site is itself powered by three live Perspective Pipes (pipe\\founders, pipe\\creators, pipe\\legacy). Read the architectural case study on how we engineered perspective-driven routing and sovereign identity.",
      ctaText: "Read Business Architecture Case Study",
    },
    content_creators: {
      title: "How We Created This: Perspective-Driven Editorial Design",
      description:
        "See how this website adapts its voice, proof points, and visual registration across three distinct human lenses—while anchoring every screen on Warm Albers Sandstone and Massimo Vignelli Swiss typography.",
      ctaText: "Read Creative Case Study",
    },
    memory_capturers: {
      title: "How We Made This: Calm, Human-Centered Technology in Practice",
      description:
        "Discover why we rejected algorithmic feeds and dark patterns to build a warm, archival-grade digital home that respects different generational needs.",
      ctaText: "Read Our Story",
    },
  });

  const creativeProcessContent = usePerspectiveContent({
    startup_founders: {
      title: "Complete Transparency in Our Design & Engineering Process",
      description:
        "Trust requires inspectable proof. Explore our open archive of visual iterations, architectural diagrams, and design system specifications.",
      highlightText: "Architectural transparency builds durable trust.",
      ctaText: "Explore Our Process Archive",
    },
    content_creators: {
      title: "Open Studio Notebook: From Early Sketches to Albers Sandstone",
      description:
        "See every experiment, visual study, and typographic evolution that shaped the ColonHyphenBracket and Pipes.Pink design language.",
      highlightText: "Creative transparency builds genuine community.",
      ctaText: "Explore Our Creative Process",
    },
    memory_capturers: {
      title: "Our Open Family Album of Building :-]",
      description:
        "Honest storytelling connects generations. Browse the full history of how we crafted our visual and product story.",
      highlightText: "Honest sharing builds lasting connection.",
      ctaText: "Explore Our Learning Journey",
    },
  });

  return (
    <main className="pt-20 bg-[#EAE0D0] text-[#281B16]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#EAE0D0] border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 max-w-4xl mx-auto mb-16">
            <AccentKineticBadge label={heroContent.eyebrow} className="justify-center" />
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281B16]"
              data-testid="products-page-title"
            >
              <AccentRevealText text={heroContent.title} as="span" immediate />
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#4A3A32] leading-relaxed">
              {heroContent.description}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={TAP}
                href="https://pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm inline-flex items-center gap-2 transition-all shadow-sm"
                data-testid="hero-claim-pipe"
              >
                <span>Claim Your Pipe on Pipes.Pink ($9/yr)</span>
                <ExternalLink className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={TAP}
                href="https://pipes.pink/write"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-bold text-sm inline-flex items-center gap-2 transition-all"
                data-testid="hero-open-hash"
              >
                <span>Open # Hash &amp; ;-] Semi Free</span>
                <ExternalLink className="h-4 w-4 text-[#FE299E]" />
              </motion.a>
            </div>
          </div>

          {/* 3-Step Workflow Card */}
          <div className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm">
            <div className="text-center mb-10">
              <h2
                className="font-serif text-2xl sm:text-3xl font-bold text-[#281B16] mb-2"
                data-testid="workflow-title"
              >
                {heroContent.workflowTitle}
              </h2>
              <p className="text-[#4A3A32] text-sm sm:text-base">
                {heroContent.workflowDescription}
              </p>
            </div>

            <Stagger className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {workflowSteps.map((step) => (
                <StaggerItem key={step.step}>
                  <motion.div
                    whileHover={CARD_HOVER}
                    whileTap={CARD_TAP}
                    className="h-full bg-[#EAE0D0] border border-[#D3C7B5] hover:border-[#281B16] rounded-xl p-6 flex flex-col justify-between space-y-5 transition-colors shadow-sm"
                    data-testid={`workflow-step-${step.step}`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A3A32]">
                          STEP {step.step} · {step.product}
                        </span>
                        <span
                          className="px-2.5 py-1 rounded text-white font-mono text-xs font-bold"
                          style={{ backgroundColor: step.accent }}
                        >
                          {step.symbol}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#281B16]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#4A3A32] leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-xs font-mono font-bold text-[#281B16] bg-[#F2EAE0] border border-[#D3C7B5] rounded-lg px-3 py-2">
                        "{step.detail}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D3C7B5]">
                      {step.ctaHref.startsWith("http") ? (
                        <a
                          href={step.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#281B16] hover:text-[#FE299E]"
                        >
                          <span>{step.ctaLabel}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-[#FE299E]" />
                        </a>
                      ) : (
                        <Link
                          href={step.ctaHref}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#281B16] hover:text-[#FE299E]"
                        >
                          <span>{step.ctaLabel}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#FE299E]" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-10 text-center">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-xl bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-bold text-sm inline-flex items-center gap-2 transition-colors"
                data-testid="cta-get-started"
              >
                <span>Create Universal :-] Account</span>
                <ArrowRight className="h-4 w-4 text-[#FE299E]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Curator Economy — High-Contrast Dark Espresso Section */}
      <section className="py-16 lg:py-24 bg-[#231814] text-[#F2EAE0] border-b border-[#3D2B24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FE299E]/20 text-[#FE299E] font-mono text-xs font-bold uppercase tracking-[0.15em]">
              THE CURATOR ECONOMY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F2EAE0]">
              Welcome to the Curator Economy
            </h2>
            <p className="text-base sm:text-lg text-[#D3C7B5] max-w-3xl mx-auto leading-relaxed">
              AI isn't replacing human judgment—it is creating a massive premium on verified human perspective. With <strong className="text-[#FE299E]">Pipes.Pink</strong>, you become AI's boss, source, and sovereign owner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <div
              className="bg-[#2E201B] rounded-2xl p-7 border border-[#3D2B24]"
              data-testid="curator-pillar-1"
            >
              <div className="w-12 h-12 bg-[#FE299E]/20 rounded-xl flex items-center justify-center mb-5">
                <Users className="h-6 w-6 text-[#FE299E]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F2EAE0] mb-2.5">
                01. Become AI's Boss
              </h3>
              <p className="text-sm sm:text-base text-[#D3C7B5] leading-relaxed">
                Instead of letting generic models flatten your thinking, direct them with Socratic precision inside <code className="font-mono text-[#FE299E]">#</code> Hash and <code className="font-mono text-[#FE299E]">;-]</code> Semi. You decide what sources and values govern every output.
              </p>
            </div>

            <div
              className="bg-[#2E201B] rounded-2xl p-7 border border-[#3D2B24]"
              data-testid="curator-pillar-2"
            >
              <div className="w-12 h-12 bg-[#1B6346]/30 rounded-xl flex items-center justify-center mb-5">
                <Database className="h-6 w-6 text-[#4ADE80]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F2EAE0] mb-2.5">
                02. Deed Your Sources ($9/yr)
              </h3>
              <p className="text-sm sm:text-base text-[#D3C7B5] leading-relaxed">
                Big Tech scrapes the open web without attribution. On <strong>Pipes.Pink</strong>, you deed your <code className="font-mono text-[#FE299E]">pipe\handle</code> for $9/yr and seal SHA-256 verified canons that prove your authorship forever.
              </p>
            </div>

            <div
              className="bg-[#2E201B] rounded-2xl p-7 border border-[#3D2B24]"
              data-testid="curator-pillar-3"
            >
              <div className="w-12 h-12 bg-[#0B5CAB]/30 rounded-xl flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-[#60A5FA]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F2EAE0] mb-2.5">
                03. Earn 70% Royalties via MCP
              </h3>
              <p className="text-sm sm:text-base text-[#D3C7B5] leading-relaxed">
                When human subscribers or external AI agents query your Pipe through our Model Context Protocol (MCP) and HTTP 402 Agent Gate, <strong>70% of revenue flows directly to you</strong>.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-[#FE299E]">
              Every Pipe is a verified slice of human wisdom. :-]
            </p>
          </div>
        </div>
      </section>

      {/* 6-Card Sovereign Ecosystem & Studio Matrix */}
      <section className="py-16 lg:py-24 bg-[#EAE0D0] border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#FE299E]">
              SHIPPED &amp; LIVE IN PRODUCTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#281B16]">
              Explore the Complete Ecosystem
            </h2>
            <p className="text-base sm:text-lg text-[#4A3A32] max-w-2xl mx-auto">
              Every operator below is live today. Launch any application directly or read its architectural deep dive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#F2EAE0] border border-[#D3C7B5] hover:border-[#281B16] rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-sm"
                data-testid={`product-card-${product.id}`}
              >
                <div>
                  {/* Dark Espresso Screenshot Header */}
                  <div className="bg-[#231814] p-4 border-b border-[#D3C7B5]">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D3C7B5]">
                        {product.badge}
                      </span>
                      <a
                        href={product.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FE299E] hover:text-white transition-colors"
                        data-testid={`link-external-${product.id}`}
                        title={product.externalLabel}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-[#3D2B24] bg-[#160F0C]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded-lg text-white font-mono text-sm font-bold"
                        style={{ backgroundColor: product.accentColor }}
                      >
                        {product.symbol}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#281B16]">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-sm font-semibold text-[#281B16]">
                      {product.oneLiner}
                    </p>

                    <p className="text-xs sm:text-sm text-[#4A3A32] leading-relaxed">
                      {product.description}
                    </p>

                    <ul className="space-y-1.5 pt-2">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#281B16] font-medium"
                        >
                          <CheckCircle2
                            className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                            style={{ color: product.accentColor }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dual CTAs: Launch Live App + Deep Dive */}
                <div className="p-6 pt-4 border-t border-[#D3C7B5] space-y-2">
                  <a
                    href={product.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    style={{ backgroundColor: product.accentColor }}
                  >
                    <span>{product.externalLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <Link
                    href={product.link}
                    className="w-full py-2 px-4 rounded-lg bg-[#E4DACB] hover:bg-[#D3C7B5] text-[#281B16] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    data-testid={`link-deepdive-${product.id}`}
                  >
                    <span>Architectural Deep Dive</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHB Constitutional Promise */}
      <section className="py-16 lg:py-24 bg-[#E4DACB] border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#281B16]">
              The CHB Constitutional Promise
            </h2>
            <p className="text-base sm:text-lg text-[#4A3A32] max-w-2xl mx-auto">
              Four commitments that govern every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chbPromise.map((item, index) => (
              <div
                key={index}
                className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-6 text-left space-y-3"
                data-testid={`promise-${index}`}
              >
                <div className="w-12 h-12 bg-[#231814] rounded-xl flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-[#FE299E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#281B16]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4A3A32] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing & Credit Philosophy */}
      <section className="py-16 lg:py-24 bg-[#EAE0D0] border-b border-[#D3C7B5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-shrink-0 w-14 h-14 bg-[#231814] rounded-2xl flex items-center justify-center">
                <Zap className="h-7 w-7 text-[#FE299E]" />
              </div>
              <div className="space-y-5 flex-1">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E]">
                    HONEST ECONOMICS // NO SURVEILLANCE SUBSIDIES
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281B16]">
                    Transparent Deeds, 70% Royalties &amp; Smart Routing Credits
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#4A3A32] leading-relaxed">
                  When an AI product claims to be "100% free forever," your private data is the product. We charge honest, transparent prices so your vault stays sovereign—and when you curate a Pipe, <strong>70% of subscriber and AI agent revenue comes back to you</strong>.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#EAE0D0] border border-[#D3C7B5] rounded-xl p-4">
                    <p className="font-mono text-xs font-bold uppercase text-[#4A3A32]">
                      Deeded Pipe
                    </p>
                    <p className="font-serif text-2xl font-bold text-[#281B16] mt-1">
                      $9<span className="text-xs font-sans font-normal text-[#4A3A32]">/yr</span>
                    </p>
                    <p className="text-xs font-mono text-[#FE299E] font-bold mt-1">
                      70% Creator Royalty
                    </p>
                  </div>
                  <div className="bg-[#EAE0D0] border border-[#D3C7B5] rounded-xl p-4">
                    <p className="font-mono text-xs font-bold uppercase text-[#4A3A32]">
                      Comma Tier
                    </p>
                    <p className="font-serif text-2xl font-bold text-[#281B16] mt-1">
                      $7<span className="text-xs font-sans font-normal text-[#4A3A32]">/mo</span>
                    </p>
                    <p className="text-xs font-mono text-[#1B6346] font-bold mt-1">
                      50k Semi Credits
                    </p>
                  </div>
                  <div className="bg-[#EAE0D0] border border-[#D3C7B5] rounded-xl p-4">
                    <p className="font-mono text-xs font-bold uppercase text-[#4A3A32]">
                      Period Tier
                    </p>
                    <p className="font-serif text-2xl font-bold text-[#281B16] mt-1">
                      $21<span className="text-xs font-sans font-normal text-[#4A3A32]">/mo</span>
                    </p>
                    <p className="text-xs font-mono text-[#0B5CAB] font-bold mt-1">
                      200k Semi Credits
                    </p>
                  </div>
                  <div className="bg-[#EAE0D0] border border-[#D3C7B5] rounded-xl p-4">
                    <p className="font-mono text-xs font-bold uppercase text-[#4A3A32]">
                      Ellipsis Tier
                    </p>
                    <p className="font-serif text-2xl font-bold text-[#281B16] mt-1">
                      $210<span className="text-xs font-sans font-normal text-[#4A3A32]">/mo</span>
                    </p>
                    <p className="text-xs font-mono text-[#B81468] font-bold mt-1">
                      1M Semi Credits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study & Creative Process Cards (High-Contrast Paired Grid) */}
      <section className="py-16 lg:py-20 bg-[#E4DACB] border-b border-[#D3C7B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#231814] rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#FE299E]" />
                </div>
                <h2
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#281B16]"
                  data-testid="case-study-title"
                >
                  {chbCaseStudyContent.title}
                </h2>
                <p
                  className="text-sm sm:text-base text-[#4A3A32] leading-relaxed"
                  data-testid="case-study-description"
                >
                  {chbCaseStudyContent.description}
                </p>
              </div>
              <div>
                <Link
                  href="/chb-case-study"
                  data-testid="case-study-cta"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{chbCaseStudyContent.ctaText}</span>
                  <ArrowRight className="h-4 w-4 text-[#FE299E]" />
                </Link>
              </div>
            </div>

            <div className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#231814] rounded-xl flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-[#FE299E]" />
                </div>
                <h2
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#281B16]"
                  data-testid="creative-process-title"
                >
                  {creativeProcessContent.title}
                </h2>
                <p
                  className="text-sm sm:text-base text-[#4A3A32] leading-relaxed"
                  data-testid="creative-process-description"
                >
                  {creativeProcessContent.description}
                </p>
                <div className="bg-[#EAE0D0] border border-[#D3C7B5] px-4 py-3 rounded-xl">
                  <p className="text-xs sm:text-sm font-semibold text-[#281B16] italic">
                    "{creativeProcessContent.highlightText}"
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/creative-process"
                  data-testid="creative-process-cta"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{creativeProcessContent.ctaText}</span>
                  <ArrowRight className="h-4 w-4 text-[#FE299E]" />
                </Link>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#4A3A32] font-mono">
                  <Download className="h-3.5 w-3.5" />
                  <span>Open Archive</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="py-16 lg:py-24 bg-[#231814] text-[#F2EAE0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FE299E]/20 text-[#FE299E] font-mono text-xs font-bold uppercase tracking-[0.15em]">
            START TODAY // ONE UNIVERSAL :-] ACCOUNT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F2EAE0]">
            Ready to claim your sovereign knowledge infrastructure?
          </h2>
          <p className="text-base sm:text-lg text-[#D3C7B5] max-w-2xl mx-auto leading-relaxed">
            Your <code className="font-mono text-[#FE299E]">#</code> Hash memories power <code className="font-mono text-[#FE299E]">;-]</code> Semi's intelligence—and compile into <code className="font-mono text-[#FE299E]">| | |</code> Pipes that earn 70% creator royalties.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
            <a
              href="https://pipes.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
              data-testid="cta-final-pipes"
            >
              <span>Claim Your Pipe on Pipes.Pink</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://pipes.pink/write"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-[#F2EAE0] hover:bg-white text-[#231814] font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
              data-testid="cta-try-semi"
            >
              <span>Open # Hash &amp; ;-] Semi Free</span>
              <ExternalLink className="h-4 w-4 text-[#FE299E]" />
            </a>
            <Link
              href="/signup"
              className="px-7 py-4 rounded-xl border border-[#3D2B24] hover:border-[#FE299E] text-[#F2EAE0] font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
              data-testid="cta-final-signup"
            >
              <span>Create :-] Account</span>
              <ArrowRight className="h-4 w-4 text-[#FE299E]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
