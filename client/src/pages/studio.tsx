import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";
import {
  Reveal,
  Stagger,
  StaggerItem,
  AccentRevealText,
  AccentKineticBadge,
  SPRING_LAYOUT,
  TAP,
} from "@/components/motion/primitives";

const OVERLOOKED_VERTICALS = [
  {
    number: "01",
    tag: "VENTURE ARCHITECTURE // SEED TO SERIES B",
    title: "Startups: From Zero-to-One to Series B Velocity",
    surface: "#D4EBF5",
    ink: "#02212F",
    image: "/images/studio/studio-overlooked-startups.svg",
    quote:
      "Most early-stage startups burn six months and $400k hiring four specialists—a PM, a UI designer, a frontend dev, and a backend engineer—only to spend 80% of their runway in Slack translation loops.",
    bullets: [
      "Collapse the 4-person product pod into a single Principal Systems Architect who designs the schema, crafts the UI, and ships the production codebase.",
      "Interactive, investor-ready full-stack prototypes and production MVPs shipped in 1 to 4 weeks—not static Figma slide decks.",
      "Built-in growth telemetry, deterministic AI agent harnesses, and clean React / TypeScript / Postgres / Rust architecture.",
    ],
    proof: [
      { name: "Pipes.Pink Protocol", href: "https://pipes.pink" },
      { name: "Clubhouse 1099", href: "https://hire.colonhyphenbracket.pink/case-studies/clubhouse1099" },
      { name: "Custodia Bank", href: "https://hire.colonhyphenbracket.pink/case-studies/custodia" },
    ],
  },
  {
    number: "02",
    tag: "SOVEREIGN EDUCATION // CLASSICAL ACADEMIES & FAMILIES",
    title: "Private Schools, Homeschool Co-Ops & Families",
    surface: "#FFF5C9",
    ink: "#3F3300",
    image: "/images/studio/studio-overlooked-schools.svg",
    quote:
      "Big EdTech treats students as ad-tech data exhaust. Classical academies, micro-schools, and families deserve sovereign tools that cultivate deep literacy—not dopamine loops.",
    bullets: [
      "Turnkey Sovereign Classrooms (Greater >): deploy a 90+ language Socratic curriculum in 60 seconds with local AI that never sends student PII to the cloud.",
      "Epistemic writing instruments (# Hash & Cassandra) that teach students how to structure arguments, cite primary sources, and think alongside ;-] Semi.",
      "Custom parent/faculty portals, enrollment workflows, and local-first archival libraries priced for independent schools.",
    ],
    proof: [
      { name: "Greater (>) Classrooms", href: "https://greater.pink" },
      { name: "Cassandra Focus Mode", href: "https://hire.colonhyphenbracket.pink/case-studies/cassandra" },
    ],
  },
  {
    number: "03",
    tag: "INSTITUTIONAL SANCTUARY // FAITH & CIVIC STEWARDSHIP",
    title: "Faith-Based, Non-Profit & Civic Organizations",
    surface: "#F1DBDA",
    ink: "#18002E",
    image: "/images/studio/studio-overlooked-faith.svg",
    quote:
      "Mission-driven institutions carry centuries of wisdom and high-trust community relationships, yet are routinely handed clunky, extractive software from the 2000s.",
    bullets: [
      "Permanent, content-addressed publishing archives & podcast pavilions that turn decades of homilies, lectures, and manuscripts into searchable knowledge graphs.",
      "Zero-PII civic and donor analytics (powered by our Marigold DuckDB-WASM engine) so sensitive member records never leave your hardware unencrypted.",
      "Dignified, book-grade typography and accessible interfaces engineered on Accént 3.0.",
    ],
    proof: [
      { name: "Marigold Zero-PII Civic Engine", href: "https://bolt.pipes.pink" },
      { name: "Accént 3.0 Design System", href: "https://design.pipes.pink" },
    ],
  },
  {
    number: "04",
    tag: "AMERICAN ENTERPRISE // MAIN STREET & REGIONAL OPERATORS",
    title: "Main Street, Independent Commerce & Field Teams",
    surface: "#DBECC8",
    ink: "#192E01",
    image: "/images/studio/studio-overlooked-mainstreet.svg",
    quote:
      "Silicon Valley builds for Fortune 500 procurement committees. We build high-margin operational weapons for the independent businesses that actually run the country.",
    bullets: [
      "Voice-first field CRMs and mobile operations tools: let reps speak a 20-second voice note in the parking lot and automatically extract structured CRM records.",
      "Bespoke multilingual hospitality & DTC estates (like Hacienda Chicuinaco & High Draw Golf) with zero ongoing agency bloat.",
      "Automated multi-location inventory, vendor reconciliation, and private AI operations copilots.",
    ],
    proof: [
      { name: "Hacienda Chicuinaco", href: "https://www.chicuinaco.com" },
      { name: "High Draw Custom DTC", href: "https://hire.colonhyphenbracket.pink/case-studies/highdraw" },
    ],
  },
];

const LAB_SHOWCASE = [
  {
    id: "pipes",
    symbol: "| | |",
    name: "Pipes.Pink Protocol",
    badge: "MERKLE-DAG WEB PROTOCOL",
    url: "https://pipes.pink",
    image: "/images/pipes/pipes-marketplace.png",
    desc: "Content-addressed SHA-256 Merkle-DAG where expert curators deed permanent pipe\\ namespaces ($9/yr), link ideas via the Ampersand (&) Graph, and earn 70% royalties when AI agents query their vaults.",
  },
  {
    id: "hash-semi",
    symbol: "# ;-]",
    name: "Hash Sanctuary & Semi",
    badge: "WRITING & MEMORY ATELIER",
    url: "https://pipes.pink/write",
    image: "/images/pipes/pipes-hash-studio-semi.png",
    desc: "Distraction-free literary sanctuary paired with Semi—the Socratic Editor-in-Residence who remembers every note, imports Substack archives in 1 click, and seals canons to your Pipe.",
  },
  {
    id: "marigold",
    symbol: "&",
    name: "Marigold DuckDB-WASM",
    badge: "500K+ ROW BROWSER ANALYTICS",
    url: "https://bolt.pipes.pink",
    image: "/images/marigold/marigold-hero.png",
    desc: "Zero-knowledge statistical record linkage and civic analytics running 100% client-side in WebAssembly (DuckDB-WASM + WebCrypto AES-GCM) with zero cloud PII exposure.",
  },
  {
    id: "accent",
    symbol: "/",
    name: "Accént 3.0 Design System",
    badge: "DESIGN.PIPES.PINK",
    url: "https://design.pipes.pink",
    image: "/images/pipes/pipes-dev-mcp-hub.png",
    desc: "Our open-source W3C DTCG 2025.10 design system combining Josef Albers's chromatic interaction with Massimo Vignelli's structural grids across 49 WCAG AAA pairings.",
  },
];

export default function StudioPage() {
  const [activeLabIdx, setActiveLabIdx] = useState(0);
  const currentLab = LAB_SHOWCASE[activeLabIdx];

  return (
    <div className="min-h-screen bg-[#E8E2D5] text-[#111827] pt-16">
      {/* Studio Chapter Sub-Navigation Bar */}
      <div className="sticky top-16 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b-[1.5px] border-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-[#111827] text-[#FE299E] font-mono text-[10px] font-bold">
              :-] STUDIO
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#374151] hidden sm:inline">
              Principal Architecture &amp; R&amp;D Lab
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider shrink-0">
            <a href="#thesis" className="text-[#111827] hover:text-[#FE299E] no-underline font-bold">
              01 Thesis
            </a>
            <a href="#overlooked" className="text-[#111827] hover:text-[#FE299E] no-underline font-bold">
              02 Who We Build For
            </a>
            <a href="#lab" className="text-[#111827] hover:text-[#FE299E] no-underline font-bold">
              03 R&amp;D Lab
            </a>
            <a href="#pricing" className="text-[#111827] hover:text-[#FE299E] no-underline font-bold">
              04 Sprints &amp; Pricing
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          01 // STUDIO HERO & UNIT OF ONE THESIS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="thesis"
        className="py-16 lg:py-24 bg-[#FAF8F5] border-b-[1.5px] border-[#111827]"
        data-testid="section-studio-hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1DBDA] border-[1.5px] border-[#111827] shadow-[0_2px_0_#111827]">
                <Sparkles className="w-3.5 h-3.5 text-[#FE299E]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#18002E]">
                  COLON HYPHEN BRACKET, LLC · ARCHITECTURE &amp; R&amp;D STUDIO
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] font-bold text-[#111827] leading-[1.02] tracking-tight">
                <AccentRevealText
                  text="Architecture partner for the"
                  as="span"
                  immediate
                />{" "}
                <span className="italic text-[#FE299E]">
                  stuck &amp; underserved.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#111827] leading-relaxed">
                Colon Hyphen Bracket (<span className="font-mono font-bold text-[#FE299E]">:-]</span>) is Kyle Cyree&apos;s principal-led product architecture studio and proprietary R&amp;D lab. We replace bloated agency retainers with a 15+ year Principal Product &amp; Systems Architect equipped with deterministic AI harnesses—shipping regulated banking infrastructure, zero-PII data rooms, and sovereign knowledge protocols in days instead of quarters.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-full bg-[#FE299E] hover:bg-[#E01E8B] text-white font-bold text-sm sm:text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all inline-flex items-center gap-2 no-underline"
                  data-testid="button-studio-book"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a 1-Week Architecture Sprint ($7,500)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://hire.colonhyphenbracket.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#111827] text-[#111827] hover:text-[#FAF8F5] font-bold text-sm sm:text-base border-[1.5px] border-[#111827] shadow-[0_4px_0_#111827] transition-all inline-flex items-center gap-2 no-underline"
                  data-testid="link-studio-to-portfolio"
                >
                  <span>Inspect Kyle&apos;s 13 Case Studies</span>
                  <ExternalLink className="w-4 h-4 text-[#FE299E]" />
                </a>
              </div>
            </div>

            {/* Right 5 Cols: The "Unit of One" Economic Comparison Card */}
            <div className="lg:col-span-5">
              <div className="accent-card-tactile p-6 sm:p-8 bg-[#D4EBF5] text-[#02212F]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#02212F]/20 font-mono text-xs font-bold uppercase tracking-wider">
                  <span>01 // THE &ldquo;UNIT OF ONE&rdquo; ADVANTAGE</span>
                  <span className="text-[#FE299E]">:-] VS AGENCY</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-[#02212F]">
                  Stop paying $50k/month for four people to play telephone in Slack.
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border-[1.5px] border-[#111827]">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B91C1C]">
                      TRADITIONAL 4-PERSON POD ($40K–$60K/MO)
                    </div>
                    <p className="text-xs sm:text-sm text-[#374151] mt-1">
                      PM writes ticket → Designer draws static Figma → Frontend mocks state → Backend rewrites schema. 12 weeks to learn your hypothesis was wrong.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111827] text-[#FAF8F5] border-[1.5px] border-[#111827] shadow-[0_3px_0_#FE299E]">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FE299E]">
                      CHB PRINCIPAL ARCHITECT + AI HARNESS ($7.5K / WK)
                    </div>
                    <p className="text-xs sm:text-sm text-[#E8E2D5] mt-1">
                      One principal architect with 15+ years at Custodia Bank, UnitedHealth Group (35M+ users), and Walmart Global Tech (3M+ associates) designs the schema, UI, and production code in 5 days.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#02212F]/20 text-center font-mono">
                  <div>
                    <div className="text-lg font-bold text-[#02212F]">5 Days</div>
                    <div className="text-[10px] uppercase opacity-75">To Working Code</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#02212F]">100%</div>
                    <div className="text-[10px] uppercase opacity-75">IP Ownership</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#FE299E]">Zero</div>
                    <div className="text-[10px] uppercase opacity-75">Junior Handoffs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          02 // THE OVERLOOKED — 4 VERTICALS WE BUILD FOR
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="overlooked"
        className="py-20 lg:py-28 bg-[#E8E2D5] border-b-[1.5px] border-[#111827]"
        data-testid="section-studio-overlooked"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <AccentKineticBadge
              label="02 // WHO WE BUILD FOR · THE OVERLOOKED"
              className="mb-3 text-[#111827]"
            />
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#111827] tracking-tight leading-[1.05] mb-4">
              Bespoke architecture for the institutions Silicon Valley ignores.
            </h2>
            <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
              We partner with high-conviction founders, classical academies, faith &amp; civic stewards, and Main Street operators to ship software that respects their mission and unit economics.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {OVERLOOKED_VERTICALS.map((v) => (
              <div
                key={v.number}
                className="accent-card-tactile p-7 lg:p-8 flex flex-col justify-between"
                style={{ backgroundColor: v.surface, color: v.ink }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-[#111827] text-[#111827]">
                      {v.number} // {v.tag}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-2xl sm:text-3xl font-bold mb-3"
                    style={{ color: v.ink }}
                  >
                    {v.title}
                  </h3>

                  <div className="overflow-hidden rounded-xl border-[1.5px] border-[#111827] bg-[#FAF8F5] aspect-[16/9] mb-4 p-3 flex items-center justify-center">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-sm italic font-medium mb-4 opacity-90">
                    {v.quote}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {v.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#FE299E] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#111827]/20 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    Shipped Proof:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {v.proof.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-[#FAF8F5] font-mono text-[10px] font-bold no-underline transition-colors"
                      >
                        {p.name} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          03 // PROPRIETARY R&D LAB — WHAT WE SHIPPED IN 16 MONTHS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="lab"
        className="py-20 lg:py-28 bg-[#111827] text-[#FAF8F5] border-b-[1.5px] border-[#111827]"
        data-testid="section-studio-lab"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E] mb-2">
                03 // PROPRIETARY R&amp;D LAB · SHIPPED IN PRODUCTION
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF8F5] tracking-tight">
                We don&apos;t just advise—we build our own sovereign software suite.
              </h2>
            </div>
            <a
              href="https://design.pipes.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FE299E] text-white font-mono text-xs font-bold uppercase tracking-wider no-underline hover:bg-[#E01E8B] transition-colors self-start lg:self-auto"
            >
              <span>/ Inspect Accént 3.0 Design System</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              {LAB_SHOWCASE.map((item, idx) => {
                const isSelected = idx === activeLabIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveLabIdx(idx)}
                    className={`w-full text-left p-5 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FAF8F5] text-[#111827] border-[#FE299E] shadow-[0_4px_0_#FE299E]"
                        : "bg-[#1F2937] text-[#FAF8F5] border-[#374151] hover:border-[#FAF8F5]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                      <span className="text-[#FE299E]">{item.badge}</span>
                      <span>{item.symbol}</span>
                    </div>
                    <div className="font-serif text-2xl font-bold">{item.name}</div>
                    {isSelected && (
                      <p className="text-xs sm:text-sm text-[#374151] mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <div className="p-4 sm:p-6 rounded-2xl bg-[#1F2937] border-[1.5px] border-[#374151]">
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#374151] font-mono text-xs">
                  <span className="text-[#FE299E] font-bold">
                    {currentLab.symbol} {currentLab.name}
                  </span>
                  <a
                    href={currentLab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAF8F5] hover:text-[#FE299E] underline inline-flex items-center gap-1"
                  >
                    <span>Open Live Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="overflow-hidden rounded-xl border border-[#374151] aspect-[16/10] bg-[#111827]">
                  <img
                    src={currentLab.image}
                    alt={currentLab.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          04 // TRANSPARENT ENGAGEMENT MODELS & PRICING
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        className="py-20 lg:py-28 bg-[#FAF8F5]"
        data-testid="section-studio-pricing"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <AccentKineticBadge
              label="04 // TRANSPARENT ENGAGEMENT MODELS"
              className="mb-3 text-[#111827]"
            />
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#111827] tracking-tight mb-4">
              Fixed scope. Principal execution. Zero agency bloat.
            </h2>
            <p className="text-base sm:text-lg text-[#374151]">
              Every engagement is executed directly by Kyle Cyree (MBA, UNC Kenan-Flagler · MFA, Emerson College · 15+ years Principal Product &amp; Systems Architecture).
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Tier 1 */}
            <div className="accent-card-tactile p-7 lg:p-8 bg-[#D4EBF5] text-[#02212F] flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#01A9F4] mb-2">
                  TIER 01 // FASTEST VALIDATION
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#02212F] mb-1">
                  1-Week AI &amp; Product Sprint
                </h3>
                <div className="font-serif text-4xl font-bold text-[#02212F] my-4">
                  $7,500 <span className="text-sm font-mono font-normal">/ flat week</span>
                </div>
                <p className="text-sm leading-relaxed mb-6">
                  Go from a messy thesis or regulatory bottleneck to a live, deployed full-stack React/TypeScript prototype and system architecture blueprint in 5 business days.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm mb-6">
                  <li>• Working coded prototype deployed on Vercel</li>
                  <li>• Domain schema &amp; AI agent harness architecture</li>
                  <li>• Accént 3.0 design token &amp; component foundation</li>
                  <li>• 100% IP &amp; GitHub repository transfer</li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="w-full py-3.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold uppercase tracking-wider text-center no-underline transition-colors block"
              >
                Book 1-Week Sprint →
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="accent-card-tactile p-7 lg:p-8 bg-[#F1DBDA] text-[#18002E] flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#FE299E] mb-2">
                  TIER 02 // ONGOING PRINCIPAL PARTNER
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#18002E] mb-1">
                  Fractional Principal Architect
                </h3>
                <div className="font-serif text-4xl font-bold text-[#18002E] my-4">
                  $15,000 <span className="text-sm font-mono font-normal">/ month</span>
                </div>
                <p className="text-sm leading-relaxed mb-6">
                  Embed a Principal Product Designer &amp; Systems Architect directly into your founding team to lead zero-to-one product delivery, design systems, and engineering alignment.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm mb-6">
                  <li>• Continuous production PRs &amp; design system ownership</li>
                  <li>• Executive, board &amp; investor product narrative</li>
                  <li>• Regulated compliance UX (FINRA, OCC, HIPAA, WCAG AAA)</li>
                  <li>• Pause or cancel anytime with zero lock-in</li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="w-full py-3.5 rounded-full bg-[#FE299E] text-white hover:bg-[#111827] font-mono text-xs font-bold uppercase tracking-wider text-center no-underline transition-colors block border border-[#111827]"
              >
                Inquire About Retainer →
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="accent-card-tactile p-7 lg:p-8 bg-[#DBECC8] text-[#192E01] flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#5C9F00] mb-2">
                  TIER 03 // EXECUTIVE W2 OR TURNKEY BUILD
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#192E01] mb-1">
                  Turnkey Build or Principal W2
                </h3>
                <div className="font-serif text-4xl font-bold text-[#192E01] my-4">
                  Custom <span className="text-sm font-mono font-normal">/ milestone or W2</span>
                </div>
                <p className="text-sm leading-relaxed mb-6">
                  Commission a turnkey sovereign classroom, enterprise data room, or discuss full-time VP / Principal Product &amp; Systems Architect leadership roles.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm mb-6">
                  <li>• Turnkey Greater (&gt;) school &amp; academy deployments</li>
                  <li>• Marigold zero-PII civic &amp; enterprise data rooms</li>
                  <li>• Full-time Principal / Head of Design &amp; Architecture</li>
                  <li>• Backed by 13 production case studies</li>
                </ul>
              </div>
              <a
                href="https://hire.colonhyphenbracket.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] font-mono text-xs font-bold uppercase tracking-wider text-center no-underline transition-colors block"
              >
                View Executive Portfolio ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
