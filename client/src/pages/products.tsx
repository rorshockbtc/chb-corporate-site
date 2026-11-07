import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";
import { Seo } from "@/components/brand/seo";

const BLUE = "#0A9BE0";
const GREEN = "#3FA535";
const PINK = "#FE299E";
const GOLD = "#D97706";
const EASE = [0.22, 1, 0.36, 1] as const;

interface ProductItem {
  id: string;
  mark: string;
  name: string;
  color: string;
  status: string;
  href: string;
  cta: string;
  secondaryHref?: string;
  secondaryCta?: string;
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
    status: "Live · Cross-Platform",
    href: "https://pipes.pink",
    cta: "Claim your pipe at pipes.pink",
    secondaryHref: "https://pipes.pink/download",
    secondaryCta: "Download for Mac, Windows & Mobile",
    tagline: "Curators get paid when people, or machines, learn from them.",
    body: "AI giants scrape and farm human knowledge for free, without consent or compensation. Pipes solves that: you get a free personal pipe to store your private knowledge and research, a business pipe to integrate with your operations, or curated topic pipes to publish on what you know best—from aerospace engineering and fly fishing to writing books. When people or AI agents retrieve and learn from your verified nodes, you earn 70% royalties. Available across Web, Mac, Windows, iOS, Android, and Chromium extension, with full local zero-cloud capability.",
    points: [
      "Register a pipe to represent your knowledge and share it with other humans and AI agents. Earn 70%.",
      "Free personal namespace · Public publishing starts at $5/month",
      "Curate any topic you care about: from aerospace to fly fishing",
      "Solves real-time AI retrieval (RAG) with verifiable provenance",
      "Cross-platform: Web, Mac, Windows, iOS, Android & Chromium extension",
      "Can run 100% locally on your own machine",
    ],
  },
  {
    id: "bang",
    mark: "!",
    name: "BANG!",
    color: PINK,
    status: "Live in Pipes Desktop",
    href: "https://pipes.pink/desktop/bang",
    cta: "Open BANG! IDE",
    secondaryHref: "https://pipes.pink/download",
    secondaryCta: "Download Pipes for Desktop",
    tagline: "Update your own website with a local assistant—for $0, without calling us.",
    body: "Traditional agencies love charging monthly retainers just to change a headline, swap an image, or update copy. We built BANG! so you're never held hostage for simple edits. Included right inside Pipes for Desktop, BANG! is a friendly local website editor made for regular, non-technical teams (and developers too). Just open BANG! and tell your local assistant in plain English what you want changed—it updates your site on your computer for $0, with zero coding required.",
    points: [
      "Built for regular, non-technical teams (and developers too)",
      "Update copy, images, and pages in plain English for $0",
      "No agency retainers or hourly fees just to make basic site edits",
      "Runs privately on your own computer inside Pipes for Desktop",
      "Invoke specialized Pipes (like website design) whenever you need them",
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
    body: "Greater lets teachers, co-ops, tutors, and families spin up a turnkey Socratic classroom in seconds. Built with local browser intelligence so student questions and private data never leave the room.",
    points: [
      "90+ languages supported out of the box",
      "Local browser processing: zero student data in the cloud",
      "Ready in under 60 seconds",
      "Built for homeschooling, co-ops, and small schools",
    ],
  },
  {
    id: "accent",
    mark: "é",
    name: "Accént",
    color: PINK,
    status: "Open Source · MIT",
    href: "https://design.pipes.pink",
    cta: "Explore Accént design system",
    secondaryHref: "https://github.com/rorshockbtc/accent-ui",
    secondaryCta: "View on GitHub",
    tagline: "A free, open-source design system to keep your software consistent.",
    body: "Accént is the design system behind every tool we build. It's completely free and open source under the MIT license because smaller teams and Main Street businesses shouldn't have to spend $50,000 just to get a polished visual foundation. When you build quickly—especially with AI tools—screens can easily turn into a patchwork of mismatched buttons, random fonts, and clashing colors. Accént gives you one clean, shared source of truth so your entire product looks like it came from the same head. (And if you already have a design system or visual identity you love, we're just as happy to build inside yours.)",
    points: [
      "Free & open source (MIT license on GitHub)",
      "Keeps pages consistent, even when building fast with AI",
      "Accessible color pairings, typography, and motion built in",
      "Open to everyone: request components or submit improvements",
      "Flexible: we can use Accént or adapt to your existing brand",
    ],
  },
];

const ECOSYSTEM_STEPS = [
  {
    title: "# Think",
    color: GREEN,
    body: "Quiet notes and early drafting in Hash, safe from external scraping.",
  },
  {
    title: "; - ] Refine",
    color: PINK,
    body: "Semi asks Socratic questions and helps you clarify your thoughts without ghostwriting.",
  },
  {
    title: "||| Publish",
    color: BLUE,
    body: "Claim your sovereign pipe across web, desktop, and mobile, and earn 70% royalties.",
  },
  {
    title: "! Build",
    color: PINK,
    body: "Open BANG! inside Pipes Desktop to update your own site locally for $0—no code needed.",
  },
  {
    title: "❀ Analyze",
    color: GOLD,
    body: "Analyze and query hundreds of thousands of records locally in Marigold.",
  },
];

const CUSTOM_CARDS = [
  {
    title: "Custom Tools & Engines",
    body: "Need a specialized local-first database, cross-platform app, or diagnostic companion? We build bespoke software tailored to your specific problem.",
  },
  {
    title: "Built on Open Rails",
    body: "Engineered on our free, open-source Accént design system and modern web standards—so your software stays clean, fast, and easy to maintain.",
  },
  {
    title: "Complete Ownership",
    body: "You own every single line of code, token, and design asset on day one. No monthly seat licenses, no proprietary hostage fees.",
  },
];

export default function Products() {
  const [activeId, setActiveId] = useState("pipes");
  const [isDarkBar, setIsDarkBar] = useState(false);

  useEffect(() => {
    const allIds = [...PRODUCTS.map((p) => p.id), "marigold"];
    const handleScroll = () => {
      const targetY = window.innerHeight * 0.4;
      let bestId = allIds[0];
      let bestDist = Infinity;

      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom >= targetY) {
            bestId = id;
            break;
          }
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - targetY);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = id;
          }
        }
      }

      // Clear active indicator if scrolled past all products into ecosystem/close bands
      const marigoldEl = document.getElementById("marigold");
      if (marigoldEl) {
        const mRect = marigoldEl.getBoundingClientRect();
        if (mRect.bottom < targetY) {
          bestId = "";
        }
        setIsDarkBar(mRect.top <= targetY && mRect.bottom >= targetY);
      } else {
        setIsDarkBar(false);
      }

      setActiveId(bestId);
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
      <Seo
        title="Products | Colon Hyphen Bracket : - ] — Pipes |||, BANG! !, Hash #, Semi ; - ], Greater >, Accént é & Marigold ❀"
        description="Independent cross-platform software by Colon Hyphen Bracket: Pipes ||| (Web, Mac, Windows, iOS, Android & Chromium extension), BANG! ! local IDE, Hash #, Semi ; - ], Greater >, Accént é, and Marigold ❀."
        path="/products"
        image="/images/og/og-products.jpg"
      />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-display font-bold text-mega">
            <RiseLines
              immediate
              lines={[
                "Software named",
                "after",
                <span key="p" className="text-[#FE299E]">
                  punctuation.
                </span>,
              ]}
            />
          </h1>
          <FadeUp delay={0.3} className="mt-8 sm:mt-12 grid lg:grid-cols-12 gap-8 sm:gap-10 items-end">
            <p className="lg:col-span-8 text-lg sm:text-2xl leading-[1.45] text-[#111827]/80 max-w-[44ch]">
              Punctuation is how humans give thought shape: a pause, a connection, a quiet aside. Every tool we make is named after the mark it behaves like—and built for people, not algorithms.
            </p>
            <div className="lg:col-span-4 lg:justify-self-end self-end">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-base sm:text-lg font-semibold no-underline"
                >
                  Start a project <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Full-Width Sticky Punctuation Index Bar */}
      {(() => {
        const isDark = isDarkBar;
        return (
          <div
            className={`sticky top-16 sm:top-20 z-30 w-full border-y transition-colors duration-300 py-3 sm:py-4 ${
              isDark
                ? "bg-[#1a140d]/95 backdrop-blur-md border-amber-900/40 shadow-md"
                : "bg-[#FAF8F5]/95 backdrop-blur-md border-[#111827]/10"
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-wrap sm:flex-nowrap items-baseline justify-start sm:justify-between gap-x-4 sm:gap-x-5 gap-y-2 sm:gap-y-0 whitespace-nowrap">
              {PRODUCTS.map((x) => {
                const isActive = activeId === x.id;
                const inactiveColor = isDark ? "rgba(250,248,245,0.45)" : "rgba(17,24,39,0.3)";
                return (
                  <button
                    key={x.id}
                    onClick={() => scrollToSection(x.id)}
                    className="relative bg-transparent cursor-pointer font-display text-[14px] sm:text-xl lg:text-2xl font-bold transition-all duration-300 py-0.5 sm:py-1 text-left sm:text-center shrink-0"
                    style={{ color: isActive ? x.color : inactiveColor }}
                  >
                    <span className="mr-1 sm:mr-1.5 font-black">{x.mark}</span>
                    <span>{x.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute left-0 right-0 -bottom-1 sm:-bottom-2 h-[2.5px] sm:h-[4px] rounded-full"
                        style={{ backgroundColor: x.color }}
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection("marigold")}
                className="relative bg-transparent cursor-pointer font-display text-[14px] sm:text-xl lg:text-2xl font-bold transition-all duration-300 py-0.5 sm:py-1 text-left sm:text-center shrink-0"
                style={{
                  color: activeId === "marigold" ? GOLD : isDark ? "rgba(250,248,245,0.45)" : "rgba(17,24,39,0.3)",
                }}
              >
                <span className="mr-1 sm:mr-1.5 text-xs sm:text-lg">❀</span>
                <span>Marigold</span>
                {activeId === "marigold" && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute left-0 right-0 -bottom-1 sm:-bottom-2 h-[2.5px] sm:h-[4px] rounded-full"
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
      <section className="pt-12 sm:pt-16 pb-20 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="space-y-20 sm:space-y-32">
            {PRODUCTS.map((p) => {
              const isActive = activeId === p.id;
              return (
                <div
                  key={p.id}
                  id={p.id}
                  className="scroll-mt-32 pt-8 pb-8 sm:pb-12 border-t border-[#111827]/10 first:border-t-0 grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="lg:col-span-4 lg:sticky lg:top-36 flex sm:block items-baseline gap-4"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.06 : 1,
                        rotate: isActive ? -3 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className={`font-display font-black leading-none whitespace-nowrap origin-left ${
                        p.mark === "|||"
                          ? "text-[64px] sm:text-[100px] tracking-[0.08em]"
                          : "text-[76px] sm:text-[130px]"
                      }`}
                      style={{ color: p.color }}
                    >
                      {p.mark}
                    </motion.div>
                    <div>
                      <div className="font-display text-3xl sm:text-4xl font-bold text-[#111827] sm:mt-3">
                        {p.name}
                      </div>
                      <span className="inline-block mt-1.5 sm:mt-2 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#111827]/5 text-[#111827]/70">
                        {p.status}
                      </span>
                    </div>
                  </motion.div>

                  <div className="lg:col-span-8">
                    <FadeUp>
                      <h2 className="font-display text-2xl sm:text-5xl font-bold text-[#111827] leading-[1.08]">
                        {p.tagline}
                      </h2>
                      <p className="mt-5 sm:mt-6 text-lg sm:text-2xl leading-relaxed text-[#111827]/75 max-w-[54ch]">
                        {p.body}
                      </p>
                    </FadeUp>

                    <ul className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3 border-t border-[#111827]/10 pt-6 sm:pt-8">
                      {p.points.map((pt, idx) => (
                        <motion.li
                          key={pt}
                          initial={{ opacity: 0, x: -14 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-5% 0px" }}
                          transition={{ duration: 0.45, delay: idx * 0.06, ease: EASE }}
                          className="flex items-baseline gap-3 text-base sm:text-lg font-medium text-[#111827]"
                        >
                          <span
                            className="font-display font-bold text-xl shrink-0"
                            style={{ color: p.color }}
                          >
                            →
                          </span>
                          <span>{pt}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <FadeUp delay={0.15} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                      <motion.a
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-white text-base sm:text-lg font-semibold no-underline shadow-sm"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.cta} <ArrowUpRight className="w-5 h-5" />
                      </motion.a>
                      {p.secondaryHref && (
                        <a
                          href={p.secondaryHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-[#111827] hover:text-[#FE299E] no-underline link-swipe py-2"
                        >
                          {p.secondaryCta} <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </FadeUp>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-Width Standalone Marigold Chapter */}
      <section
        id="marigold"
        className="scroll-mt-32 relative overflow-hidden w-full bg-[#1a140d] text-white py-20 sm:py-36"
      >
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet="/images/brand/marigold-real.webp" type="image/webp" />
            <img
              src="/images/brand/marigold-real.jpg"
              alt="Golden marigold background"
              loading="lazy"
              className="w-full h-full object-cover opacity-30 filter blur-[0.5px] scale-105"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a140d] via-[#1a140d]/88 to-[#b45309]/35" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/30 mb-6 sm:mb-8">
              <span>❀</span> The Civic Data Exception · Named After the Flower
            </div>

            <h2 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
              Designed <span className="text-[#FBBF24]">to work.</span>
            </h2>

            <p className="font-display text-xl sm:text-3xl lg:text-4xl font-bold mt-6 sm:mt-8 text-[#FAF8F5]/90 leading-snug">
              If you've got the sensitive civic data, we've got the zero-knowledge architecture... and the experience.
            </p>

            <p className="mt-6 sm:mt-8 text-base sm:text-xl leading-relaxed text-[#FAF8F5]/80 max-w-[58ch]">
              Marigold is our civic data engine engineered specifically for researchers, municipal advocates, and healthcare teams. Built on DuckDB-Wasm and client-side encryption, it reconciles hundreds of thousands of records entirely in your browser—without sending a single byte of private data to a cloud server.
            </p>

            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://marigoldinsights.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-base sm:text-lg font-bold no-underline transition-colors shadow-lg"
              >
                Open MarigoldInsights.org <ArrowUpRight className="w-5 h-5 text-[#111827]" />
              </motion.a>
              <span className="text-sm font-medium text-white/60">
                Live civic data research platform
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* How They Work Together Band */}
      <section className="py-24 sm:py-36 bg-[#F2EAE0] text-[#111827] border-t border-[#111827]/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-end pb-12 sm:pb-16 border-b border-[#111827]/15">
            <h2 className="lg:col-span-7 font-display font-bold text-huge text-[#111827]">
              Better together, <span className="text-[#0A9BE0]">fine</span> <span className="text-[#3FA535]">alone</span><span className="text-[#FE299E]">.</span>
            </h2>
            <p className="lg:col-span-5 text-lg sm:text-xl leading-relaxed text-[#111827]/75">
              Think in Hash, refine with Semi, publish to your pipe, update your own website with BANG!, teach with Greater, and analyze with Marigold. Or just use the one you need. One : - ] account works across all of them.
            </p>
          </FadeUp>

          <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ECOSYSTEM_STEPS.map((step, i) => (
              <FadeUp
                key={step.title}
                delay={i * 0.08}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#111827]/10 shadow-sm"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold" style={{ color: step.color }}>
                  {step.title}
                </div>
                <p className="mt-3 text-base text-[#111827]/75 leading-relaxed">{step.body}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.25} className="mt-12 sm:mt-14 pt-8 border-t border-[#111827]/15 flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-sm text-[#111827]/60">
            <span>Free personal namespace · Public publishing starts at $5/mo · 70% creator royalties</span>
            <span>Single unified cryptographic login across the entire ecosystem</span>
          </FadeUp>
        </div>
      </section>

      {/* Close Section */}
      <section className="pt-32 sm:pt-44 pb-24 sm:pb-36 text-center bg-[#FAF8F5] border-t border-[#111827]/10">
        <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
          <FadeUp>
            <Smile className="text-[72px] sm:text-[96px]" color={PINK} winkEvery={3000} />
            <h2 className="font-display font-bold text-huge mt-5 sm:mt-6 text-[#111827]">
              Need something we haven&apos;t built yet?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 sm:mt-5 text-lg sm:text-2xl text-[#111827]/75 max-w-[48ch] mx-auto leading-relaxed">
              Every tool on this page started because off-the-shelf software was either bloated, rented, or built to trap user data. If you have a gnarly challenge or a custom product to build, let&apos;s talk.
            </p>
          </FadeUp>

          <div className="mt-8 sm:mt-12 grid sm:grid-cols-3 gap-5 text-left">
            {CUSTOM_CARDS.map((card, i) => (
              <FadeUp
                key={card.title}
                delay={0.1 + i * 0.08}
                className="p-6 sm:p-7 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10 flex flex-col"
              >
                <div className="font-display text-xl sm:text-2xl font-bold text-[#111827]">{card.title}</div>
                <p className="mt-2.5 text-base text-[#111827]/75 leading-relaxed flex-1">{card.body}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.25} className="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-4">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-base sm:text-lg font-semibold no-underline shadow-sm hover:bg-[#111827] transition-colors"
              >
                Start a project <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-[#111827] text-[#111827] text-base sm:text-lg font-semibold no-underline hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors"
            >
              How the studio works →
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
