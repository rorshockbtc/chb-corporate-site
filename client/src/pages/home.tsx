import { Link } from "wouter";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
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
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Lock,
  Sparkles,
  Terminal,
  Database,
  Layers,
  CheckCircle2,
  BookOpen,
  Cpu,
} from "lucide-react";

export function HomePage() {
  const { currentPerspective, setPerspective } = usePerspective();

  // Section 01: The Curator Economy & Sovereign Workflow (Perspective-Aware)
  const curatorEconomyContent = usePerspectiveContent({
    startup_founders: {
      eyebrow: "01 // THE SOVEREIGN KNOWLEDGE STACK",
      title: "Stop feeding your proprietary institutional knowledge into somebody else's model.",
      subtitle:
        "Every time your team pastes strategy docs into a generic cloud chatbot, you train a competitor's foundation model. ColonHyphenBracket (:-]) gives founders a sovereign pipeline from private R&D to monetizable domain intelligence.",
      steps: [
        {
          step: "STEP 01 · PRIVATE R&D VAULT",
          symbol: "# + ;-]",
          title: "Capture decisions in # Hash. Stress-test with ;-] Semi.",
          description:
            "Log architectural decisions, investor memos, and product theses inside # Hash Sanctuary (pipes.pink/write). ;-] Semi acts as your Socratic co-founder who remembers every prior decision and never leaks your data to model training.",
          ctaText: "Open # Hash + ;-] Semi Studio",
          ctaHref: "https://pipes.pink/write",
        },
        {
          step: "STEP 02 · CRYPTOGRAPHIC COMPILATION",
          symbol: "| | |",
          title: "Seal institutional playbooks into a deeded pipe\\ namespace.",
          description:
            "With one click ('Seal to Pipe'), compile your battle-tested frameworks into a SHA-256 Merkle-DAG canon under your own pipe\\company handle ($9/yr)—complete with scoped internal or public permissions.",
          ctaText: "Claim Your pipe\\ Handle ($9/yr)",
          ctaHref: "https://pipes.pink",
        },
        {
          step: "STEP 03 · MCP & HTTP 402 AGENT GATE",
          symbol: "70%",
          title: "Connect to Claude & Cursor via MCP—or monetize your domain.",
          description:
            "Mount your Pipe into your engineering team's IDEs via Model Context Protocol (MCP), or open your canon to external AI agents via HTTP 402 and earn 70% royalties on every cited query.",
          ctaText: "Explore MCP & Developer Hub",
          ctaHref: "https://pipes.pink",
        },
      ],
    },
    content_creators: {
      eyebrow: "01 // THE CURATOR ECONOMY",
      title: "The open web broke the covenant between writers and readers. Pipes restores it.",
      subtitle:
        "Big Tech scraped decades of human writing without consent, attribution, or payout. We built Pipes.Pink so authors, researchers, and domain curators remain AI's boss, source, and sovereign owner.",
      steps: [
        {
          step: "STEP 01 · EPISTEMIC SANCTUARY",
          symbol: "# + ;-]",
          title: "Draft in # Hash Sanctuary with ;-] Semi in your authentic voice.",
          description:
            "Import your Substack or archives in one click. Write in a distraction-free sanctuary (All / Notes / Journal / Mono) alongside ;-] Semi—a Socratic Editor-in-Residence who challenges your arguments instead of generating robotic slop.",
          ctaText: "Start Writing Free in # Hash",
          ctaHref: "https://pipes.pink/write",
        },
        {
          step: "STEP 02 · DEEDED SOVEREIGNTY",
          symbol: "| | |",
          title: "Deed your pipe\\handle for $9/yr and seal your canon.",
          description:
            "Publish curated collections, research canons, and Sovereign Podcasts on Pipes.Pink. Every edition is cryptographically signed (SHA-256) so your authorship is provable and permanent.",
          ctaText: "Deed Your Pipe on Pipes.Pink",
          ctaHref: "https://pipes.pink",
        },
        {
          step: "STEP 03 · 70% CREATOR ROYALTIES",
          symbol: "70%",
          title: "Get paid 70% whenever humans subscribe or AI agents cite you.",
          description:
            "Set your own terms. When readers subscribe to your Pipe or external AI agents query your expertise through our MCP & HTTP 402 Agent Gate, 70% of the revenue flows directly to you.",
          ctaText: "See Curator Economics",
          ctaHref: "/products/pipes",
        },
      ],
    },
    memory_capturers: {
      eyebrow: "01 // CONSTITUTIONAL MEMORY",
      title: "Storage is cheap. There is no excuse for losing a single family story—ever.",
      subtitle:
        "Mainstream AI tools treat you like a stranger every morning and harvest your private life for ad targeting. We built # Hash, ;-] Semi, and Pipes so your memories compound safely across generations.",
      steps: [
        {
          step: "STEP 01 · PRIVATE FAMILY VAULT",
          symbol: "#",
          title: "Preserve stories, recipes, and wisdom in # Hash Sanctuary.",
          description:
            "Write naturally at your own pace inside pipes.pink/write. Every family story, recipe variation, and life lesson is encrypted, structured, and preserved with zero corporate surveillance.",
          ctaText: "Open Your Private # Hash Vault",
          ctaHref: "https://pipes.pink/write",
        },
        {
          step: "STEP 02 · PATIENT MEMORY COMPANION",
          symbol: ";-]",
          title: "Converse with ;-] Semi—the assistant who never forgets you.",
          description:
            "Because Semi reads from your Hash vault, you never have to repeat your background, family names, or preferences. She adapts to your pace and connects memories across years.",
          ctaText: "Meet ;-] Semi",
          ctaHref: "/products/semi",
        },
        {
          step: "STEP 03 · LIVING LEGACY PIPES",
          symbol: "| | |",
          title: "Share a curated Family Pipe with your children & grandchildren.",
          description:
            "When you choose, seal selected family history, recipes, or wisdom into a private or family-only Pipe on Pipes.Pink—so future generations can ask questions and hear answers grounded in your actual words.",
          ctaText: "Explore Family Pipes",
          ctaHref: "https://pipes.pink",
        },
      ],
    },
  });

  // Section 02: Why Punctuation Matters — The 5 Unified Operators
  const punctuationOperators = [
    {
      symbol: "| | |",
      name: "Pipes",
      status: "LIVE FLAGSHIP · PIPES.PINK",
      tagline: "Sovereign Knowledge Protocol, Marketplace & ! BANG IDE",
      description:
        "Just as Unix pipes (|) route data cleanly between programs, Pipes.Pink routes verified human perspective across the web and AI agents. Deed your pipe\\ namespace ($9/yr), publish SHA-256 canons and Sovereign Podcasts, and earn 70% royalties via MCP and HTTP 402.",
      highlights: [
        "Deeded pipe\\handle namespaces ($9/yr) with cryptographic SHA-256 provenance",
        "70% creator revenue share on reader subscriptions & AI agent MCP queries",
        "Includes Sovereign Podcast Pavilion & native macOS ! BANG Agentic IDE",
      ],
      image: "/images/pipes/pipes-marketplace.png",
      primaryCta: { label: "Sign Up on Pipes.Pink", href: "https://pipes.pink", external: true },
      secondaryCta: { label: "Pipes Deep Dive", href: "/products/pipes", external: false },
      accentColor: "#FE299E",
    },
    {
      symbol: "#",
      name: "Hash Sanctuary",
      status: "LIVE IN PIPES · PIPES.PINK/WRITE",
      tagline: "Private Epistemic Writing Vault & 3D Knowledge Galaxy",
      description:
        "The hash mark (#) indexes meaning. Now unified directly inside Pipes (pipes.pink/write), # Hash is your private epistemic notebook (All / Notes / Journal / Mono) with 1-click Substack ingestion, a 3D Knowledge Galaxy, and 1-click 'Seal to Pipe' compilation.",
      highlights: [
        "Unified inside Pipes.Pink/Write—zero-friction bridge from private thought to public Pipe",
        "Three memory layers: Episodic capture, Semantic synthesis, and Voice extraction",
        "Interactive 3D Knowledge Galaxy mapping every conceptual link across your vault",
      ],
      image: "/images/pipes/pipes-hash-sanctuary.png",
      primaryCta: { label: "Open # Hash Sanctuary Free", href: "https://pipes.pink/write", external: true },
      secondaryCta: { label: "Hash Deep Dive", href: "/products/hash", external: false },
      accentColor: "#1B6346",
    },
    {
      symbol: ";-]",
      name: "Semi",
      status: "LIVE IN PIPES · PIPES.PINK/WRITE",
      tagline: "Socratic Editor-in-Residence ('She Doesn't Forget')",
      description:
        "A semicolon (;) connects two independent thoughts without ending the sentence. Embedded alongside # Hash in pipes.pink/write, Semi is your persistent Socratic partner who remembers your entire vault, challenges your assumptions, and routes queries intelligently.",
      highlights: [
        "Constitutional Memory: reads your # Hash context so you never repeat yourself",
        "Socratic Editor-in-Residence: sharpens your thinking instead of writing generic AI slop",
        "Smart model routing that cuts inference waste while preserving your authentic voice",
      ],
      image: "/images/pipes/pipes-hash-studio-semi.png",
      primaryCta: { label: "Chat with ;-] Semi in Pipes", href: "https://pipes.pink/write", external: true },
      secondaryCta: { label: "Semi Deep Dive", href: "/products/semi", external: false },
      accentColor: "#B81468",
    },
    {
      symbol: ">",
      name: "Greater",
      status: "LIVE · GREATER.PINK",
      tagline: "Turnkey 90+ Language Sovereign Classrooms & WebGPU Engine",
      description:
        "The greater-than operator (>) directs output forward. Greater.Pink turns curated Pipes into interactive, multi-lingual classrooms in 60 seconds (npx @pipes/greater)—powered by on-device WebGPU inference with zero cloud API tax.",
      highlights: [
        "90+ language real-time sovereign classroom & curriculum translation",
        "Powered by local-first WebGPU neural inference ($0 per-query cloud API cost)",
        "Built for educators, micro-schools, faith communities, and technical bootcamps",
      ],
      image: "/images/pipes/pipes-classroom-mpb.png",
      primaryCta: { label: "Launch Greater.Pink", href: "https://greater.pink", external: true },
      secondaryCta: { label: "Explore Ecosystem", href: "/products", external: false },
      accentColor: "#0B5CAB",
    },
    {
      symbol: "&",
      name: "Ampersand Graph / Scout & Marigold",
      status: "LIVE · BOLT.PIPES.PINK",
      tagline: "Sub-200ms Citation Graph & Zero-PII DuckDB-WASM Analytics",
      description:
        "The ampersand (&) binds entities together. Ampersand powers the sub-200ms semantic citation graph across Pipes and drives Marigold (bolt.pipes.pink)—our zero-knowledge browser analytical workbench running DuckDB-WASM and Fellegi-Sunter record linkage entirely client-side.",
      highlights: [
        "Sub-200ms cross-Pipe semantic citation graph & Scout perspective discovery",
        "Marigold (bolt.pipes.pink): 500k+ row client-side DuckDB-WASM & Apache Arrow engine",
        "Zero-PII cloud leakage—built for regulated finance, healthcare, and researchers",
      ],
      image: "/images/marigold/01_marigold_landing_hero.png",
      primaryCta: { label: "Open Marigold (Bolt.Pipes.Pink)", href: "https://bolt.pipes.pink", external: true },
      secondaryCta: { label: "Explore & Scout", href: "/scout", external: false },
      accentColor: "#B85D19",
    },
  ];

  // Section 03: Three Constitutional Principles (Retained & Elevated per Perspective)
  const principlesContent = usePerspectiveContent({
    startup_founders: [
      {
        number: "01 // PRINCIPLE ONE",
        title: "Explicit Perspective > Fake Neutrality",
        subtitle: "Your market positioning is a moat—never flatten it into generic corporate consensus.",
        body: "Big Tech AI platforms hide their ideological and commercial biases behind a veil of 'neutrality,' flattening every founder's thesis into the same risk-averse mush. With Pipes, perspective is declared upfront in the protocol: mount pipe\\founders, pipe\\bitcoin, or your own company's Pipe so every answer reflects your explicit first principles.",
        proofLabel: "LIVE PROTOCOL PROOF",
        proofText: "This very website is indexed through three explicit Perspective Pipes (pipe\\founders, pipe\\creators, pipe\\legacy). Switch them anytime in the masthead.",
        image: "/images/pipes/pipes-namespace-bitcoin.png",
        imageCaption: "FIG 01.1 — Sovereign Pipe Room (pipes.pink) with explicit curator thesis & SHA-256 verification.",
        ctaLabel: "Explore Sovereign Pipes",
        ctaHref: "https://pipes.pink",
        external: true,
      },
      {
        number: "02 // PRINCIPLE TWO",
        title: "Independent = Uncompromised",
        subtitle: "Zero venture capital capture. Zero surveillance ad models. Aligned 100% with builders.",
        body: "When an AI vendor raises billions in VC, you are not the customer—your proprietary data and enterprise workflows are the product. ColonHyphenBracket (:-]) is independently owned and engineered for self-sustaining economics: transparent $9/yr namespace deeds, 70% creator payouts, and local-first WebGPU/DuckDB-WASM execution.",
        proofLabel: "ARCHITECTURAL GUARANTEE",
        proofText: "Your # Hash vault and private Pipes are never sold, never used to train third-party foundation models, and always exportable.",
        image: "/images/pipes/pipes-economics.png",
        imageCaption: "FIG 01.2 — Transparent 70/30 Curator Economy split & HTTP 402 Agent Gate architecture.",
        ctaLabel: "Read Our Architecture Spec",
        ctaHref: "/chb-case-study",
        external: false,
      },
      {
        number: "03 // PRINCIPLE THREE",
        title: "Personal Service & Bespoke Architecture",
        subtitle: "Need custom sovereign AI or a zero-to-one product shipped in 1 week? Work directly with the architect.",
        body: "Software shouldn't be a faceless ticket queue. Alongside our self-serve Pipes ecosystem, our R&D Studio partners directly with founders, regulated enterprises (fintech, healthcare, logistics), and overlooked Main Street institutions to ship production-grade architecture without agency bloat.",
        proofLabel: "DIRECT STUDIO ENGAGEMENT",
        proofText: "$7,500 1-Week Architecture Sprints · $15k–$25k Zero-to-One Systems Builds · Direct Principal Execution.",
        image: "/images/studio/studio-hero-architecture.png",
        imageCaption: "FIG 01.3 — CHB R&D Studio: Massimo Vignelli Swiss precision meets shipping TypeScript/Rust/WebGPU code.",
        ctaLabel: "Commission the R&D Studio",
        ctaHref: "https://hire.colonhyphenbracket.pink/studio",
        external: true,
      },
    ],
    content_creators: [
      {
        number: "01 // PRINCIPLE ONE",
        title: "Explicit Perspective > Fake Neutrality",
        subtitle: "Readers don't follow you for bland neutrality. They follow you for your distinct point of view.",
        body: "Algorithmic feeds and generic LLMs sand down every writer's edge until everything reads like a corporate committee wrote it. Pipes celebrates explicit human point of view: your Pipe carries your name, your thesis, and your exact citations—never blended into an anonymous soup.",
        proofLabel: "CURATOR SOVEREIGNTY",
        proofText: "Every Pipe on Pipes.Pink is a self-selected lens. Readers and AI agents explicitly mount your perspective because they trust your judgment.",
        image: "/images/pipes/pipes-namespace-bitcoin.png",
        imageCaption: "FIG 02.1 — A curated Pipe on Pipes.Pink showcasing verified authorship and perspective.",
        ctaLabel: "Claim Your Creator Pipe",
        ctaHref: "https://pipes.pink",
        external: true,
      },
      {
        number: "02 // PRINCIPLE TWO",
        title: "Independent = Uncompromised",
        subtitle: "No algorithmic throttling. No sudden platform rug-pulls. You own your canon and 70% of revenue.",
        body: "Ad-driven social networks punish external links, throttle your reach unless you pay for boosts, and quietly license your writing to AI labs. Because CHB is independent, our incentives are simple: we only succeed when creators earn real recurring royalties from their intellectual property.",
        proofLabel: "CREATOR COVENANT",
        proofText: "Deed your pipe\\handle for $9/yr. Keep 70% of all human subscriptions and AI agent MCP/HTTP 402 citations.",
        image: "/images/pipes/pipes-curator-dashboard.png",
        imageCaption: "FIG 02.2 — Curator Analytics & Royalty Dashboard inside Pipes.Pink.",
        ctaLabel: "Start Curating on Pipes.Pink",
        ctaHref: "https://pipes.pink",
        external: true,
      },
      {
        number: "03 // PRINCIPLE THREE",
        title: "Human Agency Over Autopilot Slop",
        subtitle: "AI should be your research assistant and Socratic editor—never your replacement.",
        body: "We refuse to build '1-click blog post generators' that flood the internet with dead text. Inside # Hash Sanctuary, ;-] Semi acts as a thoughtful Editor-in-Residence who knows your archive, asks sharp Socratic questions, and helps you refine work worthy of your signature.",
        proofLabel: "THE SANCTUARY WORKFLOW",
        proofText: "Import your Substack in 1 click, draft in # Hash with ;-] Semi, and Seal to Pipe when your piece is ready.",
        image: "/images/pipes/pipes-podcast-pavilion.png",
        imageCaption: "FIG 02.3 — Sovereign Podcast Pavilion & Editorial Workspace on Pipes.Pink.",
        ctaLabel: "Open # Hash Writing Sanctuary",
        ctaHref: "https://pipes.pink/write",
        external: true,
      },
    ],
    memory_capturers: [
      {
        number: "01 // PRINCIPLE ONE",
        title: "Explicit Values > Algorithmic Manipulation",
        subtitle: "Your family's values and traditions belong to you—not to a Silicon Valley engagement algorithm.",
        body: "Big Tech platforms pretend to be neutral while optimizing every screen to capture your grandchildren's attention and reshape their worldview. CHB builds calm, honest tools where you choose the perspective, the pace, and the values that guide your family's digital sanctuary.",
        proofLabel: "CALM TECHNOLOGY",
        proofText: "Zero infinite scroll, zero ad tracking, and explicit perspective lenses you control.",
        image: "/images/pipes/pipes-hash-sanctuary.png",
        imageCaption: "FIG 03.1 — # Hash Sanctuary: calm, warm archival paper designed for reflection and family history.",
        ctaLabel: "Open Your # Hash Sanctuary",
        ctaHref: "https://pipes.pink/write",
        external: true,
      },
      {
        number: "02 // PRINCIPLE TWO",
        title: "Independent = Private by Constitution",
        subtitle: "Your family's memories are sacred heritage—never free training material for corporate AI.",
        body: "Because we answer to our users rather than venture capitalists or advertisers, we enforce a strict constitutional boundary: your private # Hash journal entries and family Pipes remain yours alone. Nothing is ever sold or harvested.",
        proofLabel: "ZERO LEAKAGE PROMISE",
        proofText: "End-to-end sovereignty with selective sharing—keep entries 100% private or seal specific stories into a family-only Pipe.",
        image: "/images/pipes/pipes-hash-studio-semi.png",
        imageCaption: "FIG 03.2 — Private memory capture paired with ;-] Semi's long-term recall.",
        ctaLabel: "Learn How # Hash Protects Memory",
        ctaHref: "/products/hash",
        external: false,
      },
      {
        number: "03 // PRINCIPLE THREE",
        title: "Personal Service & Patient Guidance",
        subtitle: "Technology that adapts to your pace, remembers what matters, and treats you with respect.",
        body: "You shouldn't need a computer science degree to preserve your life's work. ;-] Semi remembers that you prefer clear, step-by-step explanations without jargon—and if you ever need a hand setting up a family archive or community classroom, a real human at :-] answers your email.",
        proofLabel: "HUMAN + PATIENT AI",
        proofText: "'She doesn't forget' isn't a slogan—it's how # Hash and ;-] Semi honor your time every day.",
        image: "/images/pipes/pipes-classroom-mpb.png",
        imageCaption: "FIG 03.3 — Accessible, human-centered interfaces across Pipes and Greater.",
        ctaLabel: "Create Your Free :-] Account",
        ctaHref: "/signup",
        external: false,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-[#EAE0D0] text-[#281B16]">
      <main>
        {/* 00 // HERO SECTION WITH LIVE PERSPECTIVE PIPE BAR & PRODUCT STUDIO WELL */}
        <HeroSection />

        {/* 01 // THE CURATOR ECONOMY & 3-STEP SOVEREIGN WORKFLOW */}
        <section
          id="curator-economy"
          className="py-20 lg:py-28 bg-[#EAE0D0] border-b border-[#D3C7B5]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 space-y-4">
              <AccentKineticBadge label={curatorEconomyContent.eyebrow} />
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#281B16] leading-[1.12] tracking-tight">
                <AccentRevealText
                  key={currentPerspective}
                  text={curatorEconomyContent.title}
                  as="span"
                />
              </h2>
              <p className="text-base sm:text-lg text-[#4A3A32] leading-relaxed">
                {curatorEconomyContent.subtitle}
              </p>
            </div>

            {/* 3-Step Workflow Grid with Stagger & Tactile Lift */}
            <Stagger className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {curatorEconomyContent.steps.map((item, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={CARD_HOVER}
                    whileTap={CARD_TAP}
                    className="h-full bg-[#F2EAE0] border border-[#D3C7B5] hover:border-[#281B16] rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-colors shadow-sm"
                    data-testid={`curator-step-${idx}`}
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#D3C7B5]">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A3A32]">
                          {item.step}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#231814] text-[#FE299E] font-mono text-xs font-bold">
                          {item.symbol}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#281B16] leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#4A3A32] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#D3C7B5]">
                      {item.ctaHref.startsWith("http") ? (
                        <a
                          href={item.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#281B16] hover:text-[#FE299E] transition-colors"
                        >
                          <span>{item.ctaText}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-[#FE299E]" />
                        </a>
                      ) : (
                        <Link
                          href={item.ctaHref}
                          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#281B16] hover:text-[#FE299E] transition-colors"
                        >
                          <span>{item.ctaText}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#FE299E]" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* High-Contrast Conversion Banner Underneath Section 01 */}
            <div className="mt-10 bg-[#231814] border border-[#3D2B24] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E]">
                  <span>| | | LIVE ON PIPES.PINK</span>
                  <span>•</span>
                  <span>UNIVERSAL :-] IDENTITY</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2EAE0]">
                  Ready to claim your sovereign <code className="font-mono text-[#FE299E]">pipe\</code> namespace or start your private <code className="font-mono text-[#F2EAE0]">#</code> Hash vault?
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="https://pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
                  data-testid="banner-claim-pipe-cta"
                >
                  <span>Claim Your Pipe ($9/yr)</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://pipes.pink/write"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#F2EAE0] hover:bg-white text-[#231814] font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
                  data-testid="banner-open-hash-cta"
                >
                  <span>Open # Hash &amp; ;-] Semi Free</span>
                  <ArrowRight className="h-4 w-4 text-[#FE299E]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 02 // WHY PUNCTUATION MATTERS — ONE UNIFIED SOVEREIGN ARCHITECTURE */}
        <section
          id="products"
          className="py-20 lg:py-28 bg-[#E4DACB] border-b border-[#D3C7B5]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div className="max-w-3xl space-y-4">
                <AccentKineticBadge label="02 // WHY PUNCTUATION MATTERS" />
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#281B16] leading-[1.12] tracking-tight">
                  Five punctuation operators. One unified sovereign ecosystem.
                </h2>
                <p className="text-base sm:text-lg text-[#4A3A32] leading-relaxed">
                  Punctuation gives human language structure, pause, and perspective. At ColonHyphenBracket (<code className="font-mono font-bold text-[#281B16]">:-]</code>), every punctuation mark is a live, shipped software operator—unified around <strong>Pipes.Pink</strong> so your private thoughts (<code className="font-mono font-bold text-[#281B16]">#</code>), Socratic AI partner (<code className="font-mono font-bold text-[#281B16]">;-]</code>), classrooms (<code className="font-mono font-bold text-[#281B16]">&gt;</code>), and citation graphs (<code className="font-mono font-bold text-[#281B16]">&amp;</code>) compound together.
                </p>
              </div>

              <div className="flex-shrink-0">
                <motion.div whileHover={{ y: -2 }} whileTap={TAP}>
                  <Link
                    href="/products"
                    className="px-5 py-3 rounded-xl bg-[#231814] text-[#F2EAE0] hover:bg-[#3A2821] font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors shadow-sm"
                    data-testid="view-all-products-button"
                  >
                    <span>Compare All Operators</span>
                    <ArrowRight className="h-4 w-4 text-[#FE299E]" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* 5 Operator Architectural Rows */}
            <div className="space-y-8">
              {punctuationOperators.map((op, index) => (
                <motion.div
                  key={op.name}
                  whileHover={CARD_HOVER}
                  transition={{ duration: 0.18 }}
                  className="bg-[#F2EAE0] border border-[#D3C7B5] hover:border-[#281B16] rounded-2xl overflow-hidden shadow-sm transition-colors"
                  data-testid={`operator-card-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="grid lg:grid-cols-12 items-stretch">
                    {/* Left 7 Cols: Operator Details & Direct CTAs */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-white font-mono text-base font-bold"
                            style={{ backgroundColor: op.accentColor }}
                          >
                            {op.symbol}
                          </span>
                          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#281B16]">
                            {op.name}
                          </span>
                          <span className="px-2.5 py-1 rounded bg-[#E4DACB] border border-[#D3C7B5] font-mono text-[11px] font-bold text-[#281B16] uppercase tracking-wider">
                            {op.status}
                          </span>
                        </div>

                        <p className="font-serif text-lg sm:text-xl font-semibold text-[#281B16]">
                          {op.tagline}
                        </p>

                        <p className="text-sm sm:text-base text-[#4A3A32] leading-relaxed">
                          {op.description}
                        </p>

                        <ul className="space-y-2 pt-2">
                          {op.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#281B16] font-medium"
                            >
                              <CheckCircle2
                                className="h-4 w-4 flex-shrink-0 mt-0.5"
                                style={{ color: op.accentColor }}
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[#D3C7B5] flex flex-wrap items-center gap-3">
                        <motion.a
                          whileTap={TAP}
                          href={op.primaryCta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-lg text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-opacity hover:opacity-95"
                          style={{ backgroundColor: op.accentColor }}
                        >
                          <span>{op.primaryCta.label}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </motion.a>

                        <motion.div whileTap={TAP}>
                          <Link
                            href={op.secondaryCta.href}
                            className="px-4 py-2.5 rounded-lg bg-[#E4DACB] hover:bg-[#D3C7B5] text-[#281B16] font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                          >
                            <span>{op.secondaryCta.label}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right 5 Cols: Dark Espresso (#231814) Matting Frame so Warm Screenshots Pop */}
                    <div className="lg:col-span-5 bg-[#231814] p-5 sm:p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#D3C7B5]">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#D3C7B5] font-bold">
                          OPERATOR 0{index + 1} // PRODUCTION VIEW
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#FE299E]">
                          {op.symbol}
                        </span>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-[#3D2B24] bg-[#160F0C]">
                        <AccentRevealImage
                          src={op.image}
                          alt={`${op.name} production interface`}
                          className="w-full h-52 sm:h-60"
                          imgClassName="object-top"
                          delay={0.08}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 // THREE CONSTITUTIONAL PRINCIPLES (RETAINED & ELEVATED) */}
        <section
          id="principles"
          className="py-20 lg:py-28 bg-[#EAE0D0] border-b border-[#D3C7B5]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16 space-y-4">
              <AccentKineticBadge label="03 // CONSTITUTIONAL PRINCIPLES" />
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#281B16] leading-[1.12] tracking-tight">
                Three principles we refuse to compromise.
              </h2>
              <p className="text-base sm:text-lg text-[#4A3A32] leading-relaxed">
                Every product we ship—from <strong>Pipes.Pink</strong> and <strong># Hash Sanctuary</strong> to bespoke enterprise builds in our <strong>R&amp;D Studio</strong>—is governed by three non-negotiable architectural commitments.
              </p>
            </div>

            <div className="space-y-12">
              {principlesContent.map((principle, idx) => (
                <AccentEditorialReveal
                  key={idx}
                  delay={idx * 0.08}
                  className="bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl overflow-hidden"
                >
                  <div className="grid lg:grid-cols-12 items-stretch" data-testid={`principle-card-${idx}`}>
                    <div
                      className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
                        idx % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="space-y-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#FE299E]">
                          {principle.number}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#281B16] leading-tight">
                          {principle.title}
                        </h3>
                        <p className="font-serif text-lg sm:text-xl font-semibold text-[#281B16]/90">
                          {principle.subtitle}
                        </p>
                        <p className="text-sm sm:text-base text-[#4A3A32] leading-relaxed">
                          {principle.body}
                        </p>

                        <div className="bg-[#EAE0D0] border border-[#D3C7B5] rounded-xl p-4 mt-4">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#281B16] mb-1">
                            {principle.proofLabel}
                          </div>
                          <p className="text-xs sm:text-sm text-[#281B16] font-medium">
                            {principle.proofText}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#D3C7B5]">
                        {principle.external ? (
                          <motion.a
                            whileTap={TAP}
                            href={principle.ctaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                          >
                            <span>{principle.ctaLabel}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-[#FE299E]" />
                          </motion.a>
                        ) : (
                          <motion.div whileTap={TAP}>
                            <Link
                              href={principle.ctaHref}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                              <span>{principle.ctaLabel}</span>
                              <ArrowRight className="h-3.5 w-3.5 text-[#FE299E]" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`lg:col-span-5 bg-[#231814] p-5 sm:p-6 flex flex-col justify-between border-t lg:border-t-0 ${
                        idx % 2 === 1
                          ? "lg:order-1 lg:border-r border-[#D3C7B5]"
                          : "lg:border-l border-[#D3C7B5]"
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden border border-[#3D2B24] bg-[#160F0C]">
                        <AccentRevealImage
                          src={principle.image}
                          alt={principle.title}
                          className="w-full h-56 sm:h-64"
                          imgClassName="object-top"
                          delay={0.1}
                        />
                      </div>
                      <p className="font-mono text-[11px] text-[#D3C7B5] mt-3 leading-relaxed">
                        {principle.imageCaption}
                      </p>
                    </div>
                  </div>
                </AccentEditorialReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 // CHOOSE YOUR PATH — DIRECT SIGN-UP & CONVERSION MATRIX */}
        <section
          id="get-started"
          className="py-20 lg:py-28 bg-[#231814] text-[#F2EAE0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FE299E]/20 text-[#FE299E] font-mono text-xs font-bold uppercase tracking-[0.15em]">
                04 // GET STARTED WITH :-] &amp; PIPES
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F2EAE0] leading-[1.12] tracking-tight">
                Three ways to step inside the Sovereign Knowledge Ecosystem.
              </h2>
              <p className="text-base sm:text-lg text-[#D3C7B5] leading-relaxed">
                Whether you want a private memory sanctuary that never forgets, a deeded <code className="font-mono text-[#FE299E]">pipe\</code> namespace that pays you 70% royalties, or a dedicated 1-week R&amp;D sprint for your company—start right here.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Tier 1: Readers, Writers & Families */}
              <div className="bg-[#2E201B] border border-[#3D2B24] rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D3C7B5]">
                      01 · SANCTUARY &amp; READER
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#1B6346] text-white font-mono text-xs font-bold">
                      FREE TO START
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2EAE0]">
                    Open # Hash Sanctuary &amp; Chat with ;-] Semi
                  </h3>
                  <p className="text-sm text-[#D3C7B5] leading-relaxed">
                    Start your private epistemic notebook at <strong>pipes.pink/write</strong>, explore public canons on <strong>pipes.pink</strong>, or create your universal <code className="font-mono text-[#FE299E]">:-]</code> identity with Email or Nostr NIP-07.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#F2EAE0] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>Private # Hash journal (All / Notes / Journal / Mono)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>;-] Semi Socratic Editor ("She Doesn't Forget")</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>Universal :-] OAuth 2.0 &amp; Nostr login across all tools</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#3D2B24]">
                  <a
                    href="https://pipes.pink/write"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#F2EAE0] hover:bg-white text-[#231814] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    data-testid="tier-1-open-hash"
                  >
                    <span>Open # Hash &amp; ;-] Semi</span>
                    <ExternalLink className="h-4 w-4 text-[#FE299E]" />
                  </a>
                  <Link
                    href="/signup"
                    className="w-full py-2.5 px-4 rounded-xl border border-[#3D2B24] hover:border-[#FE299E] text-[#D3C7B5] hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    data-testid="tier-1-signup"
                  >
                    <span>Create Universal :-] Account</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Tier 2: Sovereign Curators & Domain Owners (Highlighted Flagship) */}
              <div className="bg-[#2E201B] border-2 border-[#FE299E] rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E]">
                      02 · SOVEREIGN CURATOR
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#FE299E] text-white font-mono text-xs font-bold">
                      $9/YR DEED · 70% SPLIT
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2EAE0]">
                    Claim Your <code className="font-mono text-[#FE299E]">pipe\handle</code> on Pipes.Pink
                  </h3>
                  <p className="text-sm text-[#D3C7B5] leading-relaxed">
                    Deed your sovereign namespace on <strong>pipes.pink</strong>, seal SHA-256 verified canons from your # Hash vault, publish Sovereign Podcasts, and earn 70% royalties when humans or AI agents query your work.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#F2EAE0] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>Deeded pipe\handle namespace ($9/yr registration)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>70% royalty share via MCP Server &amp; HTTP 402 Agent Gate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>1-click Substack import &amp; 3D Knowledge Galaxy</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#3D2B24]">
                  <a
                    href="https://pipes.pink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    data-testid="tier-2-claim-pipe"
                  >
                    <span>Claim Your Pipe on Pipes.Pink</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="/products/pipes"
                    className="w-full py-2.5 px-4 rounded-xl border border-[#3D2B24] hover:border-[#FE299E] text-[#D3C7B5] hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    data-testid="tier-2-learn-more"
                  >
                    <span>Read the Pipes Protocol Spec</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Tier 3: Founders, Regulated Enterprises & R&D Studio */}
              <div className="bg-[#2E201B] border border-[#3D2B24] rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D3C7B5]">
                      03 · BESPOKE R&amp;D STUDIO
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#0B5CAB] text-white font-mono text-xs font-bold">
                      1-WEEK SPRINTS
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2EAE0]">
                    Commission the CHB Architecture Studio
                  </h3>
                  <p className="text-sm text-[#D3C7B5] leading-relaxed">
                    Need custom local-first AI, a sovereign enterprise Pipe cluster, or a zero-to-one product shipped in production code? Partner directly with Principal Architect Kyle Cyree.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#F2EAE0] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>$7,500 1-Week Architecture &amp; Working Prototype Sprint</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>$15k–$25k Zero-to-One Sovereign Systems Build</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FE299E] flex-shrink-0" />
                      <span>Proven at Custodia Bank, Lowe's, Walmart &amp; Centene</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#3D2B24]">
                  <a
                    href="https://hire.colonhyphenbracket.pink/studio"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#F2EAE0] hover:bg-white text-[#231814] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    data-testid="tier-3-studio"
                  >
                    <span>Explore the R&amp;D Studio</span>
                    <ArrowRight className="h-4 w-4 text-[#FE299E]" />
                  </a>
                  <Link
                    href="/contact"
                    className="w-full py-2.5 px-4 rounded-xl border border-[#3D2B24] hover:border-[#FE299E] text-[#D3C7B5] hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    data-testid="tier-3-contact"
                  >
                    <span>Book a Discovery Call</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;