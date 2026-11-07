import { Link } from "wouter";
import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { HeroSection } from "@/components/hero-section";
import {
  Check,
  Shield,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Heart,
  Compass,
  Users,
} from "lucide-react";
import {
  Reveal,
  Stagger,
  StaggerItem,
  AccentKineticBadge,
} from "@/components/motion/primitives";

export function HomePage() {
  const { currentPerspective } = usePerspective();

  const perspectiveThemeColors = {
    startup_founders: {
      tintBg: "#D4EBF5",
      ink: "#02212F",
      badgeBg: "#01A9F4",
      cardAccent: "#D4EBF5",
      deepDiveHref: "/startup-founders-deep-dive",
      deepDiveLabel: "Read Strategic Analysis for Founders",
      vectorSvg: "/images/studio/studio-overlooked-startups.svg",
      vectorCaption: "FIG. 01 // VENTURE & STARTUP ARCHITECTURE",
    },
    content_creators: {
      tintBg: "#F1DBDA",
      ink: "#18002E",
      badgeBg: "#FE299E",
      cardAccent: "#F1DBDA",
      deepDiveHref: "/content-creators-deep-dive",
      deepDiveLabel: "Read Creative Manifesto",
      vectorSvg: "/images/studio/studio-overlooked-faith.svg",
      vectorCaption: "FIG. 01 // CREATOR & CURATOR ATELIER",
    },
    memory_capturers: {
      tintBg: "#DBECC8",
      ink: "#192E01",
      badgeBg: "#5C9F00",
      cardAccent: "#FFF5C9",
      deepDiveHref: "/memory-capturers-deep-dive",
      deepDiveLabel: "Read Family Memory Deep Dive",
      vectorSvg: "/images/studio/studio-overlooked-schools.svg",
      vectorCaption: "FIG. 01 // FAMILY & GENERATIONAL SANCTUARY",
    },
  }[currentPerspective];

  const winWinWinContent = usePerspectiveContent({
    startup_founders: {
      headline: "A win-win-win for your business",
      subheadline:
        "Use the AI models you already trust. Pay what you already pay. Get dramatically better results while keeping your competitive intelligence private.",
      wins: [
        {
          icon: "budget",
          title: "Same Budget",
          description:
            "No bloated per-seat enterprise tax. Make your existing AI spend work harder with persistent context.",
          surface: "#D4EBF5",
        },
        {
          icon: "results",
          title: "Better Results",
          description:
            "Optimized prompts and domain memory mean fewer wasted tokens and sharper strategic output.",
          surface: "#FFF5C9",
        },
        {
          icon: "privacy",
          title: "Privacy & Control",
          description:
            "Your strategic roadmap and proprietary data never train competitor models.",
          surface: "#DBECC8",
        },
      ],
    },
    content_creators: {
      headline: "A win-win-win for your creativity",
      subheadline:
        "Use the AI tools you already love. Pay what you already pay. Get higher quality creative output while protecting and monetizing your unique voice.",
      wins: [
        {
          icon: "budget",
          title: "Same Cost + 70% Royalties",
          description:
            "Start free in # Hash & ;-] Semi, claim a $9/yr Pipe, and earn 70% when readers or AI agents query your canon.",
          surface: "#F1DBDA",
        },
        {
          icon: "results",
          title: "Higher Quality",
          description:
            "Smart memory preservation keeps your characters, tone, and creative style consistent across every draft.",
          surface: "#FFF5C9",
        },
        {
          icon: "privacy",
          title: "Creative Privacy",
          description:
            "Your raw notes and unpublished drafts stay yours—never feeding someone else's training data.",
          surface: "#DBECC8",
        },
      ],
    },
    memory_capturers: {
      headline: "A win-win-win for your family",
      subheadline:
        "Use the AI you're already comfortable with. Pay what you already pay. Get clearer conversations while keeping your family's stories completely private.",
      wins: [
        {
          icon: "budget",
          title: "Same Price",
          description:
            "No complicated subscriptions. Capture and organize decades of family memories in one calm place.",
          surface: "#DBECC8",
        },
        {
          icon: "results",
          title: "Clearer Conversations",
          description:
            "Semi remembers your family tree, milestones, and stories so you never have to repeat yourself.",
          surface: "#FFF5C9",
        },
        {
          icon: "privacy",
          title: "Family Privacy",
          description:
            "Your family photos, journals, and stories never leave your control or get sold to advertisers.",
          surface: "#D4EBF5",
        },
      ],
    },
  });

  const missionContent = usePerspectiveContent({
    startup_founders: {
      title: "Scale beyond Silicon Valley's defaults",
      description:
        "Founders Big Tech overlooks deserve AI that respects your market positioning and competitive advantages. We build technology that amplifies your business vision rather than flattening it into the same template every other startup uses.",
    },
    content_creators: {
      title: "Create without creative conformity",
      description:
        "Independent creators deserve AI that amplifies your authentic voice rather than homogenizing your creative expression. We're building technology that extends your artistic vision rather than replacing it.",
    },
    memory_capturers: {
      title: "Preventing Big Tech erasure, one family at a time",
      description:
        "Unless people like us get involved in protecting our stories, our memories and values will be monetized by algorithms designed to sell us things. This threatens our ability to own our legacies and preserve what truly matters for future generations.",
    },
  });

  const principlesContent = usePerspectiveContent({
    startup_founders: {
      eyebrow: "OUR PRINCIPLES // FOR FOUNDERS",
      title: "Independent entrepreneurs, independent infrastructure.",
      description:
        "Unless founders outside the Big Tech orbit shape AI development, business innovation will be controlled by algorithms designed to extract value rather than create it. That threatens competition and entrepreneurial independence.",
    },
    content_creators: {
      eyebrow: "OUR PHILOSOPHY // FOR CREATORS",
      title: "Preventing digital homogenization, one creator at a time.",
      description:
        "Unless independent creators shape their own tools, creative expression gets flattened by a handful of algorithmic feeds in San Francisco. We build tools that protect artistic freedom and authentic storytelling.",
    },
    memory_capturers: {
      eyebrow: "OUR VALUES // FOR FAMILIES",
      title: "Own your memories, preserve your legacy.",
      description:
        "Your family's stories belong to you, not to algorithms designed to sell you things. We help you capture, preserve, and share what matters most—completely privately, on your terms, for the people you love.",
    },
  });

  const productsContent = usePerspectiveContent({
    startup_founders: {
      showcase_title: "Strategy, punctuated.",
      showcase_description:
        "Every breakthrough needs the right tools at the right moment. # organizes your competitive intelligence, ; continues strategic conversations, & discovers market patterns, | channels domain expertise, and / governs your design system.",
    },
    content_creators: {
      showcase_title: "Vision, punctuated.",
      showcase_description:
        "Every masterpiece starts with a single creative spark. # captures your artistic ideas, ; continues creative conversations, & discovers inspiration patterns, | publishes your curated canon with 70% royalties, and / brings editorial craft to the web.",
    },
    memory_capturers: {
      showcase_title: "Your moments, punctuated.",
      showcase_description:
        "Life is beautiful, messy, surprising, and yours. :-] makes it easy to punctuate what you're experiencing and helps you fill in the details. We're here when you want to turn a 'full stop' into a living family story.",
    },
  });

  const ecosystemContent = usePerspectiveContent({
    startup_founders: {
      title: "Why punctuation matters",
      description:
        "Every symbol represents focused utility that compounds together. # organizes your team's knowledge, ; continues strategic conversations without amnesia, & links insights across 500k+ records, and | turns your domain expertise into a sovereign asset.",
      explanation:
        "We believe software should feel human, memorable, and explicitly on your side. When you think of capturing a breakthrough, you'll remember # Hash. When you need a thinking partner who remembers last quarter's trade-offs, ;-] Semi continues the conversation.",
    },
    content_creators: {
      title: "Why punctuation matters",
      description:
        "Every symbol tells part of your story. # captures raw creative sparks, ; continues your drafts without losing your voice, & connects recurring themes across your archive, and | publishes your curated perspective to the world.",
      explanation:
        "Technology should amplify human originality, not replace it with grey averages. Our punctuation-named tools work together like a writer's desk—giving you a private sanctuary to think and a sovereign stage to publish.",
    },
    memory_capturers: {
      title: "Why punctuation matters",
      description:
        "Every symbol preserves what matters most. # captures precious everyday thoughts and family stories, ; continues conversations across generations, & uncovers shared family threads, and | lets you pass down curated wisdom.",
      explanation:
        "We believe technology should honor relationships and protect family history. When you want to jot down something your child said today, you open # Hash. When you want help weaving decades of notes into a family story, ;-] Semi is right there.",
    },
  });

  const ctaContent = usePerspectiveContent({
    startup_founders: {
      title: "Your Competitive Edge :-]",
      description:
        "Ready to scale with software and AI that respects your market positioning? Explore our products or partner directly with our Principal Architecture & R&D Studio.",
      primaryCTA: "Explore CHB Studio & Sprints",
      primaryHref: "/studio",
      secondaryCTA: "Email cubby@colonhyphenbracket.pink",
    },
    content_creators: {
      title: "Your Creative Canvas :-]",
      description:
        "Ready to create with tools that amplify your authentic voice and pay you 70% royalties? Start writing in # Hash & ;-] Semi or claim your Pipe on Pipes.Pink.",
      primaryCTA: "Start Free on Pipes.Pink",
      primaryHref: "https://pipes.pink",
      secondaryCTA: "Email cubby@colonhyphenbracket.pink",
    },
    memory_capturers: {
      title: "Our Promise to Your Family :-]",
      description:
        "To help you own your life story completely. :-] builds private, personal technology that helps you capture, preserve, and share your family's legacy on your terms—never feeding your memories into an ad algorithm.",
      primaryCTA: "Create Your Family :-] Account",
      primaryHref: "/signup",
      secondaryCTA: "Email cubby@colonhyphenbracket.pink",
    },
  });

  const products = [
    {
      symbol: "#",
      name: "Hash",
      tagline: "Private Memory & Writing Sanctuary",
      badge: "LIVE · PIPES.PINK/WRITE",
      surface: "#DBECC8",
      ink: "#192E01",
      url: "https://pipes.pink/write",
      internalHref: "/products/hash",
      description: {
        startup_founders:
          "Your business insights, organized automatically. Capture strategic ideas, meeting notes, and decisions without rigid folders.",
        content_creators:
          "Your creative ideas, organized automatically. Capture inspiration naturally and keep your unpublished drafts 100% private.",
        memory_capturers:
          "Your precious memories, organized automatically. Capture family stories naturally and discover meaningful connections across generations.",
      },
      features: {
        startup_founders: [
          "Automatic knowledge organization",
          "Zero competitor training leakage",
          "1-click Seal to Pipe publishing",
        ],
        content_creators: [
          "Distraction-free writing sanctuary",
          "1-click Substack & RSS archive import",
          "3D Knowledge Galaxy visualization",
        ],
        memory_capturers: [
          "Constitutional family memory vault",
          "Simple, calm journaling interface",
          "Private by default, shareable on your terms",
        ],
      },
    },
    {
      symbol: ";-]",
      name: "Semi",
      tagline: "The Patient AI Partner Who Never Forgets",
      badge: "LIVE · FREE TO CHAT",
      surface: "#F1DBDA",
      ink: "#18002E",
      url: "https://pipes.pink/write",
      internalHref: "/products/semi",
      description: {
        startup_founders:
          "Use the AI models you already trust, pay what you already pay, get better results. Semi remembers your business context so you never repeat yourself.",
        content_creators:
          "Your Socratic Editor-in-Residence who remembers your voice, characters, and canon—helping you refine drafts without sounding like a robot.",
        memory_capturers:
          "She Doesn't Forget. Semi patiently remembers every family story, name, and milestone you share, helping you weave memories together.",
      },
      features: {
        startup_founders: [
          "Persistent business & roadmap memory",
          "Smart prompt & model routing",
          "Protects proprietary IP",
        ],
        content_creators: [
          "Preserves your authentic writing voice",
          "Recalls notes from months or years ago",
          "Socratic brainstorming without slop",
        ],
        memory_capturers: [
          "Remembers family names & dates forever",
          "Warm, patient conversational partner",
          "Zero ad-tech surveillance",
        ],
      },
    },
    {
      symbol: "&",
      name: "Scout & Marigold",
      tagline: "Pattern Discovery & Browser-Native Analytics",
      badge: "LIVE · BOLT.PIPES.PINK",
      surface: "#FFF5C9",
      ink: "#3F3300",
      url: "https://bolt.pipes.pink",
      internalHref: "/scout",
      description: {
        startup_founders:
          "Discover hidden patterns across your notes and analyze 500k+ rows of operational data right in your browser with DuckDB-WASM and zero cloud leakage.",
        content_creators:
          "Connect recurring themes across years of notebooks, research citations, and audience insights in milliseconds.",
        memory_capturers:
          "Uncover shared threads, timelines, and connections across decades of family journals, letters, and stories.",
      },
      features: {
        startup_founders: [
          "500k+ row DuckDB-WASM browser engine",
          "Zero-PII client-side record linkage",
          "Sub-100ms semantic pattern recall",
        ],
        content_creators: [
          "Bidirectional Ampersand (&) citation graph",
          "Cross-archive theme discovery",
          "Instant primary-source verification",
        ],
        memory_capturers: [
          "Generational timeline & theme linking",
          "100% local browser privacy",
          "Instant search across family archives",
        ],
      },
    },
    {
      symbol: "|",
      name: "Pipes.Pink",
      tagline: "Curated Human Perspective & Sovereign Knowledge",
      badge: "LIVE · PIPES.PINK",
      surface: "#D4EBF5",
      ink: "#02212F",
      url: "https://pipes.pink",
      internalHref: "/products/pipes",
      description: {
        startup_founders:
          "Claim your deeded pipe\\handle ($9/yr), publish verified domain intelligence, and connect directly to Claude & Cursor via MCP.",
        content_creators:
          "Own your namespace for $9/yr and earn 70% royalties whenever human subscribers or AI agents query your curated Pipe.",
        memory_capturers:
          "Create private or family-shared Pipes to pass down curated family recipes, histories, and wisdom to future generations.",
      },
      features: {
        startup_founders: [
          "Deeded pipe\\handle ($9/yr)",
          "MCP server & HTTP 402 agent settlement",
          "SHA-256 content-addressed provenance",
        ],
        content_creators: [
          "70% direct creator royalty split",
          "Zero algorithmic feed manipulation",
          "Verified human curation badges",
        ],
        memory_capturers: [
          "Heirloom family knowledge channels",
          "Multilingual Greater (>) classrooms",
          "Ad-free reading sanctuary",
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#E8E2D5] text-[#111827]">
      <HeroSection />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 01 // A WIN-WIN-WIN FOR YOUR BUSINESS / CREATIVITY / FAMILY
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 lg:py-24 bg-[#FAF8F5] border-b-[1.5px] border-[#111827]"
        data-testid="section-win-win-win"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <AccentKineticBadge
              label="01 // PRACTICAL VALUE · NO EXTRA SUBSCRIPTIONS"
              className="mb-3 text-[#111827]"
            />
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4 tracking-tight"
              data-testid="win-win-win-headline"
            >
              {winWinWinContent.headline}
            </h2>
            <p
              className="text-base sm:text-lg lg:text-xl text-[#374151] leading-relaxed"
              data-testid="win-win-win-subheadline"
            >
              {winWinWinContent.subheadline}
            </p>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {winWinWinContent.wins.map((win, index) => (
              <StaggerItem
                key={win.title}
                className="accent-card-tactile p-6 lg:p-8 flex flex-col justify-between"
                style={{ backgroundColor: win.surface }}
                data-testid={`win-card-${index + 1}`}
              >
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FAF8F5] border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827] mb-5 text-[#111827]">
                    {win.icon === "budget" && <Check className="w-6 h-6 text-[#5C9F00]" />}
                    {win.icon === "results" && <Sparkles className="w-6 h-6 text-[#FE299E]" />}
                    {win.icon === "privacy" && <Shield className="w-6 h-6 text-[#01A9F4]" />}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#111827] mb-2">
                    {win.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#111827]/85 leading-relaxed">
                    {win.description}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-[#111827]/20 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-bold text-[#111827]">
                  <span>WIN 0{index + 1}</span>
                  <span>:-] HUMAN-FIRST</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 02 // WHO WE SERVE — MISSION FOR OVERLOOKED AMERICANS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 border-b-[1.5px] border-[#111827] transition-colors duration-500"
        style={{ backgroundColor: perspectiveThemeColors.tintBg }}
        data-testid="section-mission"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border-[1.5px] border-[#111827] font-mono text-[11px] font-bold uppercase tracking-wider text-[#111827]">
                <span>02 // WHO WE SERVE</span>
              </div>

              <h2
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
                style={{ color: perspectiveThemeColors.ink }}
              >
                {missionContent.title}
              </h2>

              <p
                className="text-lg sm:text-xl leading-relaxed"
                style={{ color: perspectiveThemeColors.ink }}
              >
                {missionContent.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={perspectiveThemeColors.deepDiveHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm border-[1.5px] border-[#111827] shadow-[0_3px_0_#111827] transition-all no-underline"
                  data-testid="link-deep-dive"
                >
                  <span>{perspectiveThemeColors.deepDiveLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-[#111827] text-[#111827] hover:text-[#FAF8F5] font-bold text-sm border-[1.5px] border-[#111827] shadow-[0_3px_0_#111827] transition-all no-underline"
                >
                  <span>See How Our Studio Builds for You</span>
                  <ArrowRight className="w-4 h-4 text-[#FE299E]" />
                </Link>
              </div>
            </Reveal>

            {/* Right 5 Cols: Custom Architectural Vector Plate (Zero AI Cartoon Slop) */}
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="accent-card-tactile p-4 sm:p-5 bg-[#FAF8F5]">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#374151] pb-2.5 mb-3 border-b border-[#111827]/20">
                  <span>{perspectiveThemeColors.vectorCaption}</span>
                  <span className="text-[#FE299E] font-bold">:-] STUDIO PLATE</span>
                </div>
                <div className="overflow-hidden rounded-lg border border-[#111827] bg-[#E8E2D5] aspect-[16/10] flex items-center justify-center p-4">
                  <img
                    src={perspectiveThemeColors.vectorSvg}
                    alt={missionContent.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="pt-3 mt-3 border-t border-[#111827]/20 flex items-center justify-between text-xs text-[#374151]">
                  <span>Built for startups, creators, families &amp; Main Street</span>
                  <Link href="/studio" className="font-mono font-bold text-[#111827] hover:text-[#FE299E] no-underline">
                    /studio →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 03 // OUR 3 PRINCIPLES (EXPLICIT BIAS, INDEPENDENCE, PERSONAL SERVICE)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 bg-[#E8E2D5] border-b-[1.5px] border-[#111827]"
        data-testid="section-principles"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FE299E] mb-3">
              03 // {principlesContent.eyebrow}
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#111827] leading-[1.06] tracking-tight mb-4">
              {principlesContent.title}
            </h2>
            <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
              {principlesContent.description}
            </p>
          </Reveal>

          {/* 3 Playful Albers Principle Cards */}
          <Stagger className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Principle 1 */}
            <StaggerItem className="accent-card-tactile p-7 lg:p-8 bg-[#FAF8F5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#F1DBDA] border border-[#111827] font-mono text-xs font-bold text-[#18002E]">
                    PRINCIPLE 01
                  </span>
                  <Compass className="w-5 h-5 text-[#FE299E]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
                  Explicit Bias &gt; Fake Neutrality
                </h3>
                <p className="text-sm sm:text-base text-[#374151] leading-relaxed mb-4">
                  We don&apos;t pretend to be &ldquo;unbiased&rdquo;—that&apos;s how corporate AI produces soulless, committee-approved mush. Instead, our tools are explicitly biased toward <strong>your</strong> perspective, your values, and your goals.
                </p>
                <p className="text-xs sm:text-sm text-[#374151]/90 leading-relaxed">
                  We trust that you&apos;re smart enough to form your own convictions when given transparent lenses rather than hidden algorithmic nudges.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#111827]/15 font-mono text-[11px] font-bold text-[#111827]">
                HONEST PERSPECTIVE &gt; GENERIC SLOP
              </div>
            </StaggerItem>

            {/* Principle 2 */}
            <StaggerItem className="accent-card-tactile p-7 lg:p-8 bg-[#FAF8F5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#D4EBF5] border border-[#111827] font-mono text-xs font-bold text-[#02212F]">
                    PRINCIPLE 02
                  </span>
                  <Shield className="w-5 h-5 text-[#01A9F4]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
                  Independent = Uncompromised
                </h3>
                <p className="text-sm sm:text-base text-[#374151] leading-relaxed mb-4">
                  ColonHyphenBracket has never taken Silicon Valley VC funding. That means we answer to our users, creators, and clients—never to ad-tech shareholders demanding we harvest your private notes.
                </p>
                <p className="text-xs sm:text-sm text-[#374151]/90 leading-relaxed">
                  Our independence lets us build durable, local-first software that serves We The People without compromise.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#111827]/15 font-mono text-[11px] font-bold text-[#111827]">
                100% FOUNDER &amp; CREATOR ALIGNED
              </div>
            </StaggerItem>

            {/* Principle 3 */}
            <StaggerItem className="accent-card-tactile p-7 lg:p-8 bg-[#FAF8F5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#DBECC8] border border-[#111827] font-mono text-xs font-bold text-[#192E01]">
                    PRINCIPLE 03
                  </span>
                  <Heart className="w-5 h-5 text-[#5C9F00]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
                  Personal Service at Scale
                </h3>
                <p className="text-sm sm:text-base text-[#374151] leading-relaxed mb-4">
                  Unlike Big Tech&apos;s scaled-but-soulless ticket queues, CHB pairs self-serve products with direct access to a real principal architect through our Studio.
                </p>
                <p className="text-xs sm:text-sm text-[#374151]/90 leading-relaxed">
                  Need a custom workflow, a sovereign classroom, or a 1-week R&amp;D sprint? Tell us what you need and we build it with you.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#111827]/15 flex items-center justify-between font-mono text-[11px] font-bold text-[#111827]">
                <span>BESPOKE SOFTWARE FOR HUMANS</span>
                <Link href="/studio" className="text-[#FE299E] hover:underline no-underline">
                  Visit /studio →
                </Link>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 04 // PUNCTUATED PRODUCTS (#, ;-], &, |, /)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="products"
        className="py-20 lg:py-28 bg-[#FAF8F5] border-b-[1.5px] border-[#111827]"
        data-testid="section-products"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <AccentKineticBadge
                label="04 // THE PUNCTUATION ECOSYSTEM"
                className="mb-3 text-[#111827]"
              />
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] tracking-tight leading-[1.04] mb-4">
                {productsContent.showcase_title}
              </h2>
              <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
                {productsContent.showcase_description}
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold uppercase tracking-wider no-underline transition-colors self-start lg:self-auto"
            >
              <span>View Full Product Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>

          {/* 2×2 Punctuation Product Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {products.map((product) => (
              <div
                key={product.name}
                className="accent-card-tactile p-7 lg:p-9 flex flex-col justify-between"
                style={{ backgroundColor: product.surface, color: product.ink }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border-[1.5px] border-[#111827] shadow-[0_3px_0_#111827] flex items-center justify-center shrink-0">
                        <span className="font-mono text-2xl sm:text-3xl font-bold text-[#FE299E]">
                          {product.symbol}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#111827] text-[#111827]">
                          {product.badge}
                        </span>
                        <h3
                          className="font-serif text-2xl sm:text-3xl font-bold mt-1"
                          style={{ color: product.ink }}
                        >
                          {product.name}
                        </h3>
                        <p className="font-mono text-xs font-semibold opacity-80">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed mb-5 opacity-90">
                    {product.description[currentPerspective]}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-[#111827]/15">
                    {product.features[currentPerspective].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center text-xs sm:text-sm font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#FE299E] border border-[#111827] mr-2.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#111827]/20">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold no-underline transition-colors"
                  >
                    <span>Launch {product.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={product.internalHref}
                    className="font-mono text-xs font-bold underline underline-offset-4 hover:text-[#FE299E] no-underline"
                    style={{ color: product.ink }}
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Accént 3.0 Design System (design.pipes.pink) Full-Width Banner Card */}
          <div className="accent-card-tactile p-7 lg:p-9 bg-[#ECD9FD] text-[#18002E]">
            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FAF8F5] border-[1.5px] border-[#111827] font-mono text-lg font-bold text-[#FE299E]">
                    /
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#111827] text-[#111827]">
                    OPEN-SOURCE DESIGN SYSTEM · DESIGN.PIPES.PINK
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18002E] mt-2 mb-2">
                  Accént 3.0 (`/`): The Design System Behind CHB &amp; Pipes
                </h3>
                <p className="text-sm sm:text-base text-[#18002E]/90 leading-relaxed max-w-3xl">
                  Curious how we pair playful Josef Albers color palettes with Massimo Vignelli structural grids and 49 WCAG AAA accessible contrast tokens? Explore our live interactive design specification at <strong>design.pipes.pink</strong>.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <a
                  href="https://design.pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold uppercase tracking-wider border-[1.5px] border-[#111827] no-underline transition-colors"
                  data-testid="home-link-design-pipes"
                >
                  <span>Explore design.pipes.pink</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 05 // WHY PUNCTUATION MATTERS & STUDIO BRIDGE
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#E8E2D5] border-b-[1.5px] border-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: Why Punctuation Matters */}
            <div className="lg:col-span-7 accent-card-tactile p-8 lg:p-10 bg-[#FAF8F5] flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E] mb-2">
                  05.A // OUR NAMING STORY
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
                  {ecosystemContent.title}
                </h2>
                <p className="text-base sm:text-lg text-[#111827] leading-relaxed mb-4">
                  {ecosystemContent.description}
                </p>
                <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
                  {ecosystemContent.explanation}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#111827]/15 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/chb-case-study"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold no-underline transition-colors"
                >
                  <span>Read Our Philosophy &amp; Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="font-mono text-sm font-bold text-[#FE299E]">
                  :-]  #  ;-]  &amp;  |  /
                </span>
              </div>
            </div>

            {/* Right 5 Cols: CHB Studio & R&D Sprints Card */}
            <div className="lg:col-span-5 accent-card-tactile p-8 lg:p-10 bg-[#111827] text-[#FAF8F5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E]">
                    05.B // CHB ARCHITECTURE STUDIO
                  </span>
                  <Users className="w-4 h-4 text-[#FE299E]" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#FAF8F5] mb-3">
                  Need a custom product or AI system built fast?
                </h3>
                <p className="text-sm sm:text-base text-[#E8E2D5] leading-relaxed mb-6">
                  Alongside our self-serve products, ColonHyphenBracket operates a principal-led Architecture &amp; R&amp;D Studio for startups, private schools, faith institutions, and Main Street operators.
                </p>
                <div className="space-y-2 text-xs font-mono text-[#E8E2D5] border-t border-b border-[#FAF8F5]/20 py-4 mb-6">
                  <div>• 1-Week AI &amp; Product Architecture Sprint — $7,500</div>
                  <div>• Fractional Principal Architect — $15,000 / mo</div>
                  <div>• 15+ yrs experience (Custodia Bank, UHG, Walmart)</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FE299E] hover:bg-[#E01E8B] text-white font-mono text-xs font-bold uppercase tracking-wider no-underline transition-colors"
                  data-testid="home-link-studio"
                >
                  <span>Explore CHB Studio (/studio)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 06 // CLOSING HUMAN CALL TO ACTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="accent-card-tactile p-10 lg:p-16 text-center"
            style={{ backgroundColor: perspectiveThemeColors.tintBg }}
          >
            <h3
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
              style={{ color: perspectiveThemeColors.ink }}
            >
              {ctaContent.title}
            </h3>
            <p
              className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8"
              style={{ color: perspectiveThemeColors.ink }}
            >
              {ctaContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {ctaContent.primaryHref.startsWith("http") ? (
                <a
                  href={ctaContent.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all no-underline"
                  data-testid="email-cta"
                >
                  {ctaContent.primaryCTA}
                </a>
              ) : (
                <Link
                  href={ctaContent.primaryHref}
                  className="px-8 py-4 rounded-full bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all no-underline"
                  data-testid="email-cta"
                >
                  {ctaContent.primaryCTA}
                </Link>
              )}
              <a
                href="mailto:cubby@colonhyphenbracket.pink"
                className="px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#111827] text-[#111827] hover:text-[#FAF8F5] font-bold text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all no-underline"
                data-testid="secondary-email-cta"
              >
                {ctaContent.secondaryCTA}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
