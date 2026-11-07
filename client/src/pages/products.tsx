import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";

const BLUE = "#0A9BE0";
const GREEN = "#3FA535";
const PINK = "#FE299E";
const GOLD = "#D97706";

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
      const scrollPos = window.scrollY + 280;
      for (const item of PRODUCTS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(item.id);
            return;
          }
        }
      }
      const marigoldEl = document.getElementById("marigold");
      if (marigoldEl) {
        const top = marigoldEl.offsetTop;
        const height = marigoldEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveId("marigold");
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

      {/* Full-Width Sticky Punctuation Index Bar */}
      {(() => {
        const isDark = activeId === "marigold";
        return (
          <div
            className={`sticky top-16 sm:top-20 z-30 w-full border-y transition-colors duration-300 py-4 ${
              isDark
                ? "bg-[#1a140d]/95 backdrop-blur-md border-amber-900/40 shadow-md"
                : "bg-[#FAF8F5]/95 backdrop-blur-md border-[#111827]/10"
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
              {PRODUCTS.map((x) => {
                const isActive = activeId === x.id;
                const inactiveColor = isDark ? "rgba(250,248,245,0.45)" : "rgba(17,24,39,0.3)";
                return (
                  <button
                    key={x.id}
                    onClick={() => scrollToSection(x.id)}
                    className="relative bg-transparent cursor-pointer font-display text-2xl sm:text-3xl font-bold transition-all duration-300 py-1"
                    style={{ color: isActive ? x.color : inactiveColor }}
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
                style={{
                  color: activeId === "marigold" ? GOLD : isDark ? "rgba(250,248,245,0.45)" : "rgba(17,24,39,0.3)",
                }}
              >
                <span className="mr-2 text-xl">❀</span>
                <span>Marigold</span>
                {activeId === "marigold" && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute left-0 right-0 -bottom-2 h-[4px] rounded-full"
                    style={{ backgroundColor: GOLD }}
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Sequential Product Chapters */}
      <section className="pt-16 pb-28 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="space-y-32">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className="scroll-mt-36 pt-8 pb-12 border-t border-[#111827]/10 first:border-t-0 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
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
          </div>
        </div>
      </section>

      {/* Full-Width Standalone Marigold Chapter (Edge-to-edge Mule Design-inspired typographic billboard) */}
      <section
        id="marigold"
        className="scroll-mt-32 relative overflow-hidden w-full bg-[#1a140d] text-white py-24 sm:py-36"
      >
        {/* Background Marigold Image with Warm Golden-Amber Wash */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/marigold-real.jpg"
            alt="Golden marigold background"
            className="w-full h-full object-cover opacity-30 filter blur-[0.5px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a140d] via-[#1a140d]/88 to-[#b45309]/35" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/30 mb-8">
              <span>❀</span> The Civic Data Exception · Named After the Flower
            </div>

            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              Designed <span className="text-[#FBBF24]">to work.</span>
            </h2>

            <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mt-8 text-[#FAF8F5]/90 leading-snug">
              If you've got the sensitive civic data, we've got the zero-knowledge architecture... and the experience.
            </p>

            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[#FAF8F5]/80 max-w-[58ch]">
              Marigold is our civic data engine engineered specifically for researchers, municipal advocates, and healthcare teams. Built on DuckDB-Wasm and client-side encryption, it reconciles hundreds of thousands of records entirely in your browser—without sending a single byte of private data to a cloud server.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="https://marigoldinsights.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-lg font-bold no-underline transition-colors shadow-lg"
              >
                Open MarigoldInsights.org <ArrowUpRight className="w-5 h-5 text-[#111827]" />
              </a>
              <span className="text-sm font-medium text-white/60">
                Live civic data research platform
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How They Work Together Band */}
      <section className="py-28 sm:py-36 bg-[#F2EAE0] text-[#111827] border-t border-[#111827]/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end pb-16 border-b border-[#111827]/15">
            <h2 className="lg:col-span-7 font-display font-bold text-huge text-[#111827]">
              Better together, <span className="text-[#0A9BE0]">fine</span> <span className="text-[#3FA535]">alone</span><span className="text-[#FE299E]">.</span>
            </h2>
            <p className="lg:col-span-5 text-xl leading-relaxed text-[#111827]/75">
              Think in Hash, refine with Semi, publish to your pipe, teach with Greater, and analyze with Marigold. Or just use the one you need. One : - ] account works across all of them.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#111827]/10 shadow-sm">
              <div className="font-display text-4xl font-bold text-[#3FA535]"># Think</div>
              <p className="mt-3 text-base text-[#111827]/75 leading-relaxed">
                Quiet notes and epistemic drafting in Hash, safe from external model scraping.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#111827]/10 shadow-sm">
              <div className="font-display text-4xl font-bold text-[#FE299E]">; - ] Refine</div>
              <p className="mt-3 text-base text-[#111827]/75 leading-relaxed">
                Semi asks Socratic questions and helps you clarify your thoughts without ghostwriting.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#111827]/10 shadow-sm">
              <div className="font-display text-4xl font-bold text-[#0A9BE0]">||| Publish</div>
              <p className="mt-3 text-base text-[#111827]/75 leading-relaxed">
                Claim your sovereign pipe, sign your provenance, and earn 70% royalties.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#111827]/10 shadow-sm">
              <div className="font-display text-4xl font-bold text-[#D97706]">❀ Analyze</div>
              <p className="mt-3 text-base text-[#111827]/75 leading-relaxed">
                Analyze and query hundreds of thousands of records locally in Marigold.
              </p>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-[#111827]/15 flex flex-wrap items-center justify-between gap-6 text-sm text-[#111827]/60">
            <span>Free to start · $9/yr to claim a sovereign Pipe · 70% creator royalties</span>
            <span>Single unified cryptographic login across the entire ecosystem</span>
          </div>
        </div>
      </section>

      {/* Close Section */}
      <section className="py-32 sm:py-40 text-center bg-[#FAF8F5] border-t border-[#111827]/10">
        <Smile className="text-[120px] sm:text-[160px]" color={PINK} winkEvery={3000} />
        <h2 className="font-display font-bold text-huge mt-8 px-5 text-[#111827]">Need something we haven't made yet?</h2>
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