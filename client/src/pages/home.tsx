import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { ScaryHeadline } from "@/components/brand/scary-words";
import { RiseLines, FadeUp } from "@/components/brand/motion";
import { Seo } from "@/components/brand/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

function ResponsiveArt({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`bg-[#F1ECE4] ${className}`} aria-hidden />;
  return (
    <picture className="block w-full">
      <source media="(max-width: 639px)" srcSet={`/images/brand/${name}-mobile.webp`} type="image/webp" />
      <source media="(max-width: 639px)" srcSet={`/images/brand/${name}-mobile.jpg`} type="image/jpeg" />
      <source srcSet={`/images/brand/${name}.webp`} type="image/webp" />
      <img
        src={`/images/brand/${name}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setOk(false)}
        className={`object-cover ${className}`}
      />
    </picture>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */
function Hero() {
  const mobileArtRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileArtRef,
    offset: ["start end", "end start"],
  });
  const mobileArtY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const mobileArtScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.1, 1.06]);

  return (
    <section
      className="relative overflow-hidden bg-[#F7F6F1] border-b border-[#111827]/10"
      data-testid="hero-section"
    >
      {/* Mobile & Tablet (< lg): Clean stacked layout with scroll-parallax staircase art */}
      <div className="lg:hidden pt-24 sm:pt-32 pb-12">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <h1
            className="font-display font-bold text-[#111827] text-[clamp(2.35rem,9vw,4.25rem)] leading-[0.98]"
            data-testid="hero-title-mobile"
          >
            <ScaryHeadline accent="#FE299E" />
          </h1>

          <FadeUp delay={0.2} className="mt-6">
            <p className="text-lg sm:text-xl leading-[1.5] text-[#111827]/85 max-w-[38ch]">
              Colon Hyphen Bracket takes the intimidating parts of software (compliance, infrastructure, cryptography) and makes them clear, honest, and kind to use. For founders, creators, and families Big Tech forgot.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.div whileTap={{ scale: 0.96 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FE299E] text-white text-base sm:text-lg font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]"
                >
                  Bring us a challenge <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <Link
                href="/manifesto"
                className="text-base sm:text-lg font-semibold text-[#111827] hover:text-[#FE299E] no-underline link-swipe py-2"
              >
                Read the manifesto →
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Dedicated mobile-cropped staircase + pink umbrella ramp artwork with motion reveal & parallax */}
        <motion.div
          ref={mobileArtRef}
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
          className="mt-8 px-5 sm:px-8"
        >
          <div className="rounded-[24px] overflow-hidden border border-[#111827]/10 shadow-sm bg-[#F7F6F1]">
            <motion.div style={{ y: mobileArtY, scale: mobileArtScale }}>
              <picture>
                <source srcSet="/images/brand/scary-staircase-mobile.webp" type="image/webp" />
                <img
                  src="/images/brand/scary-staircase-mobile.jpg"
                  alt="A gentle ramp with a person holding a pink umbrella bypassing a tall jagged staircase"
                  className="w-full aspect-[4/3] object-cover block"
                  loading="eager"
                />
              </picture>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FAF8F5] border border-[#111827]/10 text-sm font-medium text-[#111827]/80 shadow-xs"
          >
            <span className="font-display font-bold text-[#FE299E] shrink-0 whitespace-nowrap">: - ]</span>
            <span>Every steep staircase is just a ramp nobody bothered to design yet.</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop (lg+): Full-bleed taller-than-viewport staircase canvas */}
      <div className="hidden lg:flex relative min-h-[126vh] flex-col justify-between pt-36 pb-24">
        <picture>
          <source srcSet="/images/brand/scary-staircase.webp" type="image/webp" />
          <img
            src="/images/brand/scary-staircase.jpg"
            alt="A gentle ramp with a person holding a pink umbrella bypassing a tall jagged staircase"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-[12%_top] scale-x-[-1]"
            loading="eager"
          />
        </picture>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-12">
          <div className="max-w-[64rem]">
            <h1
              className="font-display font-bold text-[#111827] text-[clamp(3.5rem,5.6vw,6.2rem)] leading-[0.96]"
              data-testid="hero-title"
            >
              <ScaryHeadline accent="#FE299E" />
            </h1>

            <FadeUp delay={0.25} className="mt-10">
              <p className="text-2xl leading-[1.45] text-[#111827]/85 max-w-[35ch]">
                Colon Hyphen Bracket takes the intimidating parts of software (compliance, infrastructure, cryptography) and makes them clear, honest, and kind to use. For founders, creators, and families Big Tech forgot.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]"
                  >
                    Bring us a challenge <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <Link
                  href="/manifesto"
                  className="text-lg font-semibold text-[#111827] hover:text-[#FE299E] no-underline link-swipe"
                >
                  Read the manifesto →
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-12 mt-52">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#111827]/10 text-base font-medium text-[#111827]/80 shadow-sm">
            <span className="font-display font-bold text-[#FE299E] shrink-0 whitespace-nowrap">: - ]</span>
            <span>Every steep staircase is just a ramp nobody bothered to design yet.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── MARQUEE ───────────────────────────── */
function Marquee() {
  const words = ["Scary", "→", "Clear", "→", "Shipped", ": - ]", "Honest", "#", "Independent", "; - ]", "Kind", "|||", "Opinionated", "é", "Crafted", "❀"];
  const row = [...words, ...words];
  return (
    <div className="border-y border-[#111827]/10 py-5 sm:py-6 overflow-hidden bg-[#FAF8F5]" aria-hidden>
      <div className="animate-chb-marquee flex gap-8 sm:gap-10 whitespace-nowrap font-display text-3xl sm:text-5xl font-bold">
        {row.map((w, i) => (
          <span key={i} className={/[:;é#|❀→]/.test(w) ? "text-[#FE299E]" : "text-[#111827]/85"}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── MANIFESTO (CONTINUOUS SCROLL REVEAL) ──────────────────────────── */
const MCOL = ["#FE299E", "#0A9BE0", "#3FA535"];
const OPINIONS = [
  { id: "op-0", mark: ": - ]", line: "You shouldn't have to speak tech.", note: "Technology should speak your language, not the other way around. If scary words are being used, it's a translation problem. We fix that." },
  { id: "op-1", mark: "#", line: "Explicit bias beats fake neutrality.", note: "We have opinions. We tell you what they are. You're smart enough to disagree." },
  { id: "op-2", mark: "; - ]", line: "One principal beats four handoffs.", note: "Strategy, design, and code in one head. No telephone game, no translation tax." },
  { id: "op-3", mark: "|||", line: "Independent means uncompromised.", note: "We value all businesses, especially the independent ones. We're independent too. No VC to please—we answer only to the people who use our software." },
  { id: "op-4", mark: "é", line: "Craft is how you scale.", note: "Clean architecture and a real design system are what let small teams act big." },
  { id: "op-5", mark: "❀", line: "Your data is yours. Full stop.", note: "Local-first, private by default. You own your code, your content, and your data on day one—we never sell, mine, or train on what you make." },
];

function Manifesto() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const targetY = window.innerHeight * 0.42;
      let closestIdx = 0;
      let closestDist = Infinity;

      for (let i = 0; i < OPINIONS.length; i++) {
        const el = document.getElementById(OPINIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - targetY);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        }
      }
      setActive(closestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="manifesto" className="py-24 sm:py-40 scroll-mt-24" data-testid="section-manifesto">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <h2 className="font-display font-bold text-huge text-[#111827]">
            What we believe.
          </h2>
        </FadeUp>

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <ol className="lg:col-span-8 space-y-3 lg:space-y-0">
            {OPINIONS.map((o, i) => {
              const isActive = active === i;
              const accentColor = MCOL[i % 3];
              return (
                <motion.li
                  key={o.id}
                  id={o.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.65, delay: i * 0.05, ease: EASE }}
                  className="relative scroll-mt-48 py-6 sm:py-14 px-4 sm:px-6 lg:px-0 rounded-2xl lg:rounded-none border-t border-[#111827]/10 flex items-baseline gap-4 sm:gap-10 cursor-pointer lg:cursor-default"
                  onClick={() => setActive(i)}
                >
                  {/* Animated active card highlight on mobile (< lg) */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-belief-highlight"
                      className="lg:hidden absolute inset-0 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10 shadow-xs -z-10"
                      style={{ borderLeftWidth: 4, borderLeftColor: accentColor }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  <motion.span
                    animate={{
                      scale: isActive ? 1.14 : 1,
                      rotate: isActive ? -4 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                    className={`font-display font-bold text-2xl sm:text-4xl w-12 sm:w-14 shrink-0 whitespace-nowrap transition-colors duration-300 origin-left ${
                      isActive ? "" : "lg:text-[#111827]/25"
                    }`}
                    style={{ color: accentColor }}
                  >
                    {o.mark}
                  </motion.span>
                  <div className="flex-1">
                    <span
                      className={`block font-display font-bold text-big transition-all duration-300 text-[#111827] ${
                        isActive ? "translate-x-1 lg:translate-x-2" : "lg:text-[#111827]/30"
                      }`}
                    >
                      {o.line}
                    </span>
                    <div
                      className={`block lg:hidden mt-2.5 text-base sm:text-xl leading-relaxed transition-colors duration-300 ${
                        isActive ? "text-[#111827]/90 font-medium" : "text-[#111827]/65"
                      }`}
                    >
                      {o.note}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div className="hidden lg:block lg:col-span-4 lg:pt-6">
            <div className="sticky top-40 p-8 rounded-3xl bg-[#F3EEE6] border border-[#111827]/10 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div
                    className="font-display text-[96px] font-bold leading-none"
                    style={{ color: MCOL[active % 3] }}
                  >
                    {OPINIONS[active].mark}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#111827] mt-4">
                    {OPINIONS[active].line}
                  </h3>
                  <p className="mt-4 text-xl leading-relaxed text-[#111827]/75">
                    {OPINIONS[active].note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── WHO WE HELP ─────────────────────────── */
const AUDIENCES = [
  {
    key: "founders",
    who: "Founders",
    color: "#0A9BE0",
    headline: "Scale your vision.",
    title: "Scale beyond Silicon Valley's defaults",
    body: "Founders Big Tech overlooks deserve technology that respects their market and their edge. We build products that amplify your vision instead of flattening it into the same template every other startup uses.",
    artName: "founders-blueprint",
    alt: "A figure on a giant blueprint that curls into a wave, a sky-blue kite above",
  },
  {
    key: "creators",
    who: "Creators",
    color: "#FE299E",
    headline: "Create authentically.",
    title: "Create without creative conformity",
    body: "Independent creators deserve tools that amplify their voice rather than homogenize it. Write privately, publish on your own terms, and get paid when people (or machines) learn from your work.",
    artName: "creators-terrace",
    alt: "An independent creator at a terrace worktable with giant translucent thought sheets rising into the sky",
  },
  {
    key: "families",
    who: "Families",
    color: "#3FA535",
    headline: "Preserve what matters.",
    title: "Preventing Big Tech erasure, one family at a time",
    body: "Your family's stories belong to you, not to algorithms built to sell you things. We help you capture, protect, and pass down what matters, privately and on your terms.",
    artName: "families-lighthouse",
    alt: "A lighthouse with a green beam watching over a family in a rowboat",
  },
];

function WhoWeHelp() {
  const [activeKey, setActiveKey] = useState("founders");

  useEffect(() => {
    const handleScroll = () => {
      const targetY = window.innerHeight * 0.42;
      let bestKey = AUDIENCES[0].key;
      let bestDist = Infinity;

      for (const a of AUDIENCES) {
        const el = document.getElementById(`who-${a.key}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom >= targetY) {
            bestKey = a.key;
            break;
          }
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - targetY);
          if (dist < bestDist) {
            bestDist = dist;
            bestKey = a.key;
          }
        }
      }
      setActiveKey(bestKey);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAudience = (key: string) => {
    const el = document.getElementById(`who-${key}`);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 sm:py-36 bg-[#F3EEE6]" data-testid="section-who">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact sticky perspective header */}
        <div className="sticky top-16 sm:top-20 z-20 bg-[#F3EEE6]/95 backdrop-blur-md border-b border-[#111827]/10 py-3 sm:py-4 mb-12 sm:mb-16">
          <div className="flex items-baseline justify-between sm:justify-start gap-x-3 sm:gap-x-10 whitespace-nowrap">
            <span className="font-display font-bold text-[15px] sm:text-4xl text-[#111827]">
              We build for:
            </span>
            {AUDIENCES.map((x) => {
              const isActive = activeKey === x.key;
              return (
                <button
                  key={x.key}
                  onClick={() => scrollToAudience(x.key)}
                  className="relative bg-transparent cursor-pointer font-display text-[16px] sm:text-4xl font-bold transition-all duration-300 py-1 shrink-0"
                  style={{ color: isActive ? x.color : "rgba(17,24,39,0.28)" }}
                >
                  {x.who}
                  {isActive && (
                    <motion.span
                      layoutId="aud-active-bar"
                      className="absolute left-0 right-0 -bottom-1 sm:-bottom-1.5 h-[3px] sm:h-[5px] rounded-full"
                      style={{ backgroundColor: x.color }}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sequential Chapters with tactile scroll-reveal animations */}
        <div className="space-y-20 sm:space-y-32">
          {AUDIENCES.map((a, idx) => (
            <div
              key={a.key}
              id={`who-${a.key}`}
              className={`scroll-mt-32 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                idx === 0 ? "pt-2" : "pt-10 border-t border-[#111827]/10"
              }`}
            >
              <FadeUp delay={0.1} className="lg:col-span-5 order-2 lg:order-1">
                <div className="font-display text-3xl sm:text-5xl font-bold" style={{ color: a.color }}>
                  {a.headline}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-4 sm:mt-6 text-[#111827]">
                  {a.title}
                </h3>
                <p className="mt-4 sm:mt-5 text-lg sm:text-xl leading-relaxed text-[#111827]/75">
                  {a.body}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-lg font-semibold no-underline link-swipe"
                  style={{ color: a.color }}
                >
                  Tell us what's scary <ArrowRight className="w-5 h-5" />
                </Link>
              </FadeUp>
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="lg:col-span-7 order-1 lg:order-2"
              >
                <ResponsiveArt
                  name={a.artName}
                  alt={a.alt}
                  className="w-full aspect-[5/4] sm:aspect-[4/3] rounded-[24px] sm:rounded-[28px] shadow-sm border border-[#111827]/5"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */
const STEPS = [
  { n: "01", word: "Scary", body: "You bring the thing that keeps you up at night: a regulator, a migration, a gnarly architecture, a product nobody can use." },
  { n: "02", word: "Clear", body: "In days, not quarters, we map it, name it, and draw it, so everyone from the board to the newest hire gets it." },
  { n: "03", word: "Shipped", body: "Then we build it for real: production code on a real design system, architected to keep scaling after we leave." },
];

function HowItWorks() {
  return (
    <section className="py-24 sm:py-36" data-testid="section-how">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mt-8 sm:mt-14 grid md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.12}>
              <div className="font-display text-2xl font-bold text-[#111827]/25">{s.n}</div>
              <div
                className={`relative inline-block font-display font-bold text-huge mt-2 ${
                  i === 2 ? "text-[#FE299E]" : i === 0 ? "text-[#111827]/35" : "text-[#0A9BE0]"
                }`}
              >
                {s.word}
                {i === 0 && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
                    className="absolute left-0 right-0 top-1/2 h-[5px] sm:h-[6px] bg-[#FE299E] origin-left rounded-full"
                  />
                )}
              </div>
              <p className="mt-5 sm:mt-6 text-lg leading-relaxed text-[#111827]/75 max-w-[32ch]">{s.body}</p>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2} className="mt-16 sm:mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#111827]/10 pt-10">
          <p className="font-display text-2xl sm:text-3xl font-semibold max-w-2xl">
            Principal-led. Fixed scope. Starting with a one-week sprint or single-day build.
          </p>
          <Link href="/studio" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors text-lg font-semibold no-underline self-start">
            How the studio works <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────── THINGS WE MAKE ─────────────────────────── */
const MAKES = [
  { color: "#0A9BE0", mark: "|||", name: "Pipes", line: "Curated human knowledge across web, desktop, mobile & browser.", href: "https://pipes.pink" },
  { color: "#FE299E", mark: "!", name: "BANG!", line: "A local IDE inside Pipes Desktop to edit your own website for $0.", href: "https://pipes.pink/desktop/bang" },
  { color: "#3FA535", mark: "#", name: "Hash", line: "A private place to think and write.", href: "https://pipes.pink/write" },
  { color: "#FE299E", mark: "; - ]", name: "Semi", line: "A Socratic editor that remembers, and doesn't pretend.", href: "https://pipes.pink/write" },
  { color: "#0A9BE0", mark: ">", name: "Greater", line: "A classroom in any of 90 languages, in a minute.", href: "https://greater.pink" },
  { color: "#FE299E", mark: "é", name: "Accént", line: "Our free, open-source design system (MIT).", href: "https://design.pipes.pink" },
  { color: "#D97706", mark: "❀", name: "Marigold", line: "Zero-knowledge local civic analytics.", href: "https://marigoldinsights.org" },
];

function ThingsWeMake() {
  return (
    <section className="py-24 sm:py-36 bg-[#111827] text-[#FAF8F5]" data-testid="section-make">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <h2 className="font-display font-bold text-huge max-w-4xl">
            We build our own tools, too. Every one is named after punctuation.
          </h2>
        </FadeUp>
        <ul className="mt-12 sm:mt-16">
          {MAKES.map((m, i) => (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              <motion.a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98, x: 4 }}
                className="group grid grid-cols-12 items-baseline gap-3 sm:gap-4 py-6 sm:py-8 border-t border-white/10 no-underline text-[#FAF8F5]"
              >
                <motion.span
                  initial={{ scale: 0.7, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.1 + i * 0.06 }}
                  className="col-span-3 sm:col-span-2 lg:col-span-1 font-display text-3xl sm:text-5xl font-bold whitespace-nowrap transition-transform group-hover:-rotate-6"
                  style={{ color: m.color }}
                >
                  {m.mark}
                </motion.span>
                <span className="col-span-8 sm:col-span-4 font-display text-3xl sm:text-5xl font-bold transition-transform duration-500 group-hover:translate-x-3">
                  {m.name}
                </span>
                <ArrowUpRight className="sm:hidden col-span-1 justify-self-end self-center w-5 h-5 text-white/40" />
                <span className="col-span-9 col-start-4 sm:col-start-auto sm:col-span-5 lg:col-span-6 text-base sm:text-xl text-white/65 group-hover:text-white transition-colors">
                  {m.line}
                </span>
                <ArrowUpRight className="hidden sm:block col-span-1 justify-self-end w-7 h-7 text-white/30 group-hover:text-[#FE299E] transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CLOSE ─────────────────────────────── */
const SUMMARY_CARDS = [
  {
    title: "Fixed Sprints",
    body: "$7,500 one-week sprint or single-day build. No scope creep, no runaway retainers.",
  },
  {
    title: "Direct Kyle",
    body: "No account managers or junior handoffs. You talk directly with the principal architect.",
  },
  {
    title: "Code You Own",
    body: "Clean architecture, tested repo, full design tokens. Deployed and handed over on Friday.",
  },
];

function Close() {
  return (
    <section className="py-20 sm:py-28 text-center" data-testid="section-close">
      <div className="max-w-[1060px] mx-auto px-5">
        <FadeUp>
          <Smile className="text-[88px] sm:text-[124px]" color="#FE299E" winkEvery={3000} />
        </FadeUp>
        <h2 className="font-display font-bold text-huge mt-4 sm:mt-5">
          <RiseLines lines={["Got something scary?", "Let's make it smile."]} />
        </h2>

        <div className="mt-7 sm:mt-9 grid sm:grid-cols-3 gap-5 text-left">
          {SUMMARY_CARDS.map((card, i) => (
            <FadeUp
              key={card.title}
              delay={0.1 + i * 0.1}
              className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10"
            >
              <div className="font-display text-2xl font-bold text-[#111827]">{card.title}</div>
              <p className="mt-2 text-base text-[#111827]/70 leading-relaxed">{card.body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-10 flex flex-wrap justify-center items-center gap-4">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-sm">
              Start a project <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <a href="mailto:cubby@colonhyphenbracket.pink" className="inline-flex items-center px-6 sm:px-8 py-4 rounded-full border-2 border-[#111827] text-[#111827] text-base sm:text-lg font-semibold no-underline hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors">
            cubby@colonhyphenbracket.pink
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="brand-canvas min-h-screen">
      <Seo
        title="Colon Hyphen Bracket : - ] | Principal Design, Software Architecture & Independent Tools"
        description="Colon Hyphen Bracket turns the intimidating parts of software (compliance, infrastructure, cryptography, and data architecture) into clarity, speed, and a smile. Fixed one-week sprints ($7,500) and sovereign tools."
        path="/"
        image="/images/og/og-home.jpg"
      />
      <Hero />
      <Marquee />
      <Manifesto />
      <WhoWeHelp />
      <HowItWorks />
      <ThingsWeMake />
      <Close />
    </div>
  );
}
