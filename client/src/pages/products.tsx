import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";

const BLUE = "#0A9BE0";
const GREEN = "#3FA535";
const PINK = "#FE299E";

interface ProductItem {
  id: string;
  mark: string;
  name: string;
  color: string;
  status: string;
  href: string;
  cta: string;
  tagline: string;
  body: string;
  points: string[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: "pipes",
    mark: "|||",
    name: "Pipes",
    color: BLUE,
    status: "Live flagship",
    href: "https://pipes.pink",
    cta: "Claim your pipe at pipes.pink",
    tagline: "Curators get paid when people, or machines, learn from them.",
    body: "Pipes is a home for curated human knowledge. Claim your own three-pipe namespace for $9 a year, publish what you know, and keep 70% of what readers and AI agents pay to cite or learn from it. Every canon is signed with cryptographic provenance—no scraping, no anonymous regurgitation.",
    points: [
      "Always three pipes: |||",
      "Your own namespace for $9 a year",
      "Creators keep 70% royalties",
      "Signed, verifiable provenance",
      "Zero algorithmic feeds. Ever.",
    ],
  },
  {
    id: "hash",
    mark: "#",
    name: "Hash",
    color: GREEN,
    status: "Live in Pipes",
    href: "https://pipes.pink/write",
    cta: "Start writing in Hash",
    tagline: "A quiet, private place to think before the world weighs in.",
    body: "Hash is a calm writing sanctuary for private notes, journals, and early drafts. It organizes itself without rigid folder structures, imports your Substack in one click, and keeps everything private until you explicitly choose to publish.",
    points: [
      "Private by default",
      "Self-organizing semantic layers",
      "1-click Substack & RSS import",
      "Seal to your Pipe when you're ready",
    ],
  },
  {
    id: "semi",
    mark: "; - ]",
    name: "Semi",
    color: PINK,
    status: "Live in Pipes",
    href: "https://pipes.pink/write",
    cta: "Meet Semi",
    tagline: "An editor who remembers, and doesn't pretend.",
    body: "A semicolon means the thought isn't finished yet. Semi is a patient Socratic editor-in-residence who remembers your projects, your voice, and your family's stories over time. Semi asks clarifying questions instead of writing corporate slop for you.",
    points: [
      "Remembers your voice across sessions",
      "Socratic editor: asks, doesn't ghostwrite",
      "Honest about what it doesn't know",
      "Never trained on your private drafts",
    ],
  },
  {
    id: "greater",
    mark: ">",
    name: "Greater",
    color: BLUE,
    status: "Live",
    href: "https://greater.pink",
    cta: "Open greater.pink",
    tagline: "A private classroom in any of 90 languages, in a minute.",
    body: "Greater lets teachers, co-ops, tutors, and families spin up a turnkey Socratic classroom in seconds. Built with local browser AI so student questions and private data never leave the room.",
    points: [
      "90+ languages supported out of the box",
      "Local browser AI: zero student data in the cloud",
      "Ready in under 60 seconds",
      "Built for homeschooling, co-ops, and small schools",
    ],
  },
  {
    id: "accent",
    mark: "é",
    name: "Accént",
    color: PINK,
    status: "Open source",
    href: "https://design.pipes.pink",
    cta: "Explore Accént design system",
    tagline: "Our design system, published out in the open.",
    body: "Accént is the living design system behind every Colon Hyphen Bracket product: tokens, accessible high-contrast pairings, responsive motion, and crisp hairlines. We publish it freely so everyone can see how the craft comes together.",
    points: [
      "Accessible color pairings and contrast standards",
      "Open tokens and component specs",
      "Disciplined Framer Motion presets",
      "Shared foundation for all CHB tools",
    ],
  },
];

export default function Products() {
  const [activeId, setActiveId] = useState("pipes");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (const item of PRODUCTS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="brand-canvas min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-display font-bold text-mega">
              <RiseLines immediate lines={["Software named after", <span key="b" className="text-[#FE299E]">punctuation.</span>]} />
            </h1>
            <FadeUp delay={0.3}>
              <p className="mt-10 text-xl sm:text-2xl leading-[1.45] text-[#111827]/80 max-w-[36ch]">
                Punctuation is how humans give thought shape: a pause, a connection, a quiet aside. Every tool we make is named after the mark it behaves like—and built for people, not algorithms.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.4} className="lg:col-span-5">
            <img
              src="/images/brand/products-workbench.jpg"
              alt="A tiny figure on a vast drafting table among giant punctuation sculptures"
              className="w-full aspect-[16/10] object-cover rounded-[28px] shadow-sm"
            />
          </FadeUp>
        </div>
      </section>

      {/* Sticky Storytelling Rail & Continuous Chapters */}
      <section className="pb-28 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Top Sticky Punctuation Index Bar */}
          <div className="sticky top-20 z-20 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#111827]/10 py-4 mb-16">
            <div className="flex flex-wrap items-baseline gap-x-6 sm:gap-x-10 gap-y-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#111827]/40 hidden md:inline">
                Scroll to explore:
              </span>
              {PRODUCTS.map((x) => {
                const isActive = activeId === x.id;
                return (
                  <button
                    key={x.id}
                    onClick={() => scrollToSection(x.id)}
                    className="relative bg-transparent cursor-pointer font-display text-2xl sm:text-3xl font-bold transition-all duration-300 py-1"
                    style={{ color: isActive ? x.color : "rgba(17,24,39,0.3)" }}
                  >
                    <span className="mr-2 font-black">{x.mark}</span>
                    <span>{x.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute left-0 right-0 -bottom-2 h-[4px] rounded-full"
                        style={{ backgroundColor: x.color }}
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection("marigold")}
                className="relative bg-transparent cursor-pointer font-display text-2xl sm:text-3xl font-bold transition-all duration-300 py-1"
                style={{ color: activeId === "marigold" ? "#3FA535" : "rgba(17,24,39,0.3)" }}
              >
                <span className="mr-2">&amp;</span>
                <span>Marigold</span>
              </button>
            </div>
          </div>

          {/* Sequential Product Chapters */}
          <div className="space-y-32">
            {PRODUCTS.map((p, idx) => (
              <div
                key={p.id}
                id={p.id}
                className="scroll-mt-36 pt-8 pb-12 border-t border-[#111827]/10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                <div className="lg:col-span-4 lg:sticky lg:top-36">
                  <div
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: p.mark === "|||" ? "100px" : "130px",
                      color: p.color,
                      letterSpacing: p.mark === "|||" ? "0.08em" : "normal",
                    }}
                  >
                    {p.mark}
                  </div>
                  <div className="font-display text-4xl font-bold text-[#111827] mt-3">
                    {p.name}
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold bg-[#111827]/5 text-[#111827]/70">
                    {p.status}
                  </span>
                  <div className="mt-8 hidden lg:block">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-base font-semibold no-underline shadow-sm transition-transform hover:-translate-y-0.5"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.cta} <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight">
                    {p.tagline}
                  </h2>
                  <p className="mt-8 text-xl leading-relaxed text-[#111827]/75 max-w-[54ch]">
                    {p.body}
                  </p>

                  <ul className="mt-12 space-y-4">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-baseline gap-4 py-4 border-t border-[#111827]/10 font-display text-xl sm:text-2xl font-semibold text-[#111827]"
                      >
                        <span style={{ color: p.color }} className="font-bold">
                          {p.mark === "|||" ? "|||" : "—"}
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 lg:hidden">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-base font-semibold no-underline"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.cta} <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Standalone Marigold Chapter (The Floral Exception) */}
            <div
              id="marigold"
              className="scroll-mt-36 pt-12 pb-16 border-t-2 border-[#3FA535]/30 bg-[#F3EEE6] -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 rounded-[36px]"
            >
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-[#3FA535]/15 text-[#3FA535] mb-4">
                    The Exception to Punctuation · Named After the Flower
                  </div>
                  <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#111827] leading-tight">
                    Marigold <span className="text-[#3FA535]">&amp;</span>
                  </h2>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#111827]/80 mt-4">
                    Serious local analytics that never touch a stranger's cloud.
                  </h3>
                  <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#111827]/75 max-w-[52ch]">
                    Marigold is our zero-knowledge analytics engine built on DuckDB-Wasm and WebGPU. It queries and reconciles hundreds of thousands of records entirely in your browser. Civic organizations, researchers, and healthcare advocates get deep insights without ever sacrificing data sovereignty.
                  </p>
                  <ul className="mt-8 space-y-3">
                    <li className="flex items-center gap-3 text-lg font-semibold text-[#111827]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3FA535]" />
                      500k+ rows analyzed client-side in milliseconds
                    </li>
                    <li className="flex items-center gap-3 text-lg font-semibold text-[#111827]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3FA535]" />
                      Zero PII uploaded to any cloud server
                    </li>
                    <li className="flex items-center gap-3 text-lg font-semibold text-[#111827]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3FA535]" />
                      Encrypted at rest with native Web Crypto
                    </li>
                  </ul>
                  <div className="mt-10">
                    <a
                      href="https://bolt.pipes.pink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#3FA535] hover:bg-[#348a2c] text-white text-lg font-semibold no-underline transition-colors shadow-sm"
                    >
                      Open Marigold on Bolt <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-[24px] overflow-hidden shadow-sm border border-[#111827]/10 bg-white">
                    <img
                      src="/images/brand/marigold-real.jpg"
                      alt="Golden African Marigold blooms in full ruffled spherical flower"
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  <p className="text-xs text-[#111827]/50 text-center italic">
                    Tagetes erecta — vibrant, resilient, and unapologetically golden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How They Work Together Band */}
      <section className="py-28 sm:py-36 bg-[#111827] text-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end pb-16 border-b border-white/10">
            <h2 className="lg:col-span-7 font-display font-bold text-huge">
              Better together, <span className="text-[#0A9BE0]">fine</span> <span className="text-[#3FA535]">alone</span><span className="text-[#FE299E]">.</span>
            </h2>
            <p className="lg:col-span-5 text-xl leading-relaxed text-white/70">
              Think in Hash, refine with Semi, publish to your pipe, teach with Greater, and analyze with Marigold. Or just use the one you need. One : - ] account works across all of them.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-display text-4xl font-bold text-[#3FA535]"># Think</div>
              <p className="mt-3 text-base text-white/70 leading-relaxed">
                Quiet notes and epistemic drafting in Hash, safe from external model scraping.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-display text-4xl font-bold text-[#FE299E]">; - ] Refine</div>
              <p className="mt-3 text-base text-white/70 leading-relaxed">
                Semi asks Socratic questions and helps you clarify your thoughts without ghostwriting.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-display text-4xl font-bold text-[#0A9BE0]">||| Publish</div>
              <p className="mt-3 text-base text-white/70 leading-relaxed">
                Claim your sovereign pipe, sign your provenance, and earn 70% royalties.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="font-display text-4xl font-bold text-[#3FA535]">&amp; Analyze</div>
              <p className="mt-3 text-base text-white/70 leading-relaxed">
                Analyze and query hundreds of thousands of records locally in Marigold.
              </p>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-sm text-white/50">
            <span>Free to start · $9/yr to claim a sovereign Pipe · 70% creator royalties</span>
            <span>Single unified cryptographic login across the entire ecosystem</span>
          </div>
        </div>
      </section>

      {/* Close Section */}
      <section className="py-32 sm:py-40 text-center">
        <Smile className="text-[120px] sm:text-[160px]" color={PINK} winkEvery={3000} />
        <h2 className="font-display font-bold text-huge mt-8 px-5">Need something we haven't made yet?</h2>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-lg font-semibold no-underline"
        >
          Tell the studio <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}