import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { ScaryHeadline } from "@/components/brand/scary-words";
import { RiseLines, FadeUp } from "@/components/brand/motion";

function Art({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`bg-[#F1ECE4] ${className}`} aria-hidden />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className={`object-cover ${className}`} />;
}

/* ─────────────────────────────── HERO ─────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden" data-testid="hero-section">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <h1 className="font-display font-bold text-[#111827] text-[clamp(2.6rem,7.4vw,7.75rem)] leading-[0.95]" data-testid="hero-title">
          <ScaryHeadline />
        </h1>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <FadeUp delay={0.3} className="lg:col-span-6">
            <p className="text-xl sm:text-2xl leading-[1.45] text-[#111827]/80 max-w-[34ch]">
              Colon Hyphen Bracket takes the intimidating parts of software (compliance, infrastructure, AI) and makes
              them clear, honest, and kind to use. For founders, creators, and families Big Tech forgot.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]">
                  Bring us something scary <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <a href="#manifesto" className="link-swipe text-lg font-medium text-[#111827] no-underline">
                Read the manifesto
              </a>
            </div>
          </FadeUp>

          <motion.div style={{ y: artY }} className="lg:col-span-6">
            <FadeUp delay={0.45}>
              <Art src="/images/brand/hero-bridge.jpg" alt="A tiny figure crosses a smile-shaped pink bridge over a jagged chasm" className="w-full aspect-[16/10] rounded-[28px]" />
            </FadeUp>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── MARQUEE ───────────────────────────── */
function Marquee() {
  const words = ["Scary", "→", "Clear", "→", "Shipped", ":-]", "Honest", "#", "Independent", ";-]", "Kind", "|", "Opinionated", "&", "Crafted", "/"];
  const row = [...words, ...words];
  return (
    <div className="border-y border-[#111827]/10 py-6 overflow-hidden bg-[#FAF8F5]" aria-hidden>
      <motion.div className="flex gap-10 whitespace-nowrap font-display text-4xl sm:text-5xl font-bold"
        animate={{ x: ["0%", "-50%"] }} transition={{ duration: 38, ease: "linear", repeat: Infinity }}>
        {row.map((w, i) => (
          <span key={i} className={/[:;#|&/→]/.test(w) ? "text-[#FE299E]" : "text-[#111827]/85"}>{w}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── MANIFESTO ──────────────────────────── */
const OPINIONS = [
  { mark: ":-]", line: "Scary is a design problem.", note: "If people are afraid of your product, that's on us, not them. Fear is just complexity nobody bothered to explain." },
  { mark: "#", line: "Explicit bias beats fake neutrality.", note: "We have opinions. We tell you what they are. You're smart enough to disagree." },
  { mark: ";-]", line: "One senior human beats four handoffs.", note: "Strategy, design, and code in one head. No telephone game, no translation tax." },
  { mark: "&", line: "Your data is yours. Full stop.", note: "Local-first, private by default. We never sell, mine, or train on what you make." },
  { mark: "|", line: "Independent means uncompromised.", note: "No VC to please. We answer to the people who use the software." },
  { mark: "/", line: "Craft is how you scale.", note: "Clean architecture and a real design system are what let small teams act big." },
];

function Manifesto() {
  const [active, setActive] = useState(0);
  return (
    <section id="manifesto" className="py-28 sm:py-36" data-testid="section-manifesto">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <ol className="lg:col-span-8">
            {OPINIONS.map((o, i) => (
              <li key={o.line}>
                <button
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  className="group w-full text-left py-5 sm:py-6 border-t border-[#111827]/10 flex items-baseline gap-5 sm:gap-8 bg-transparent cursor-pointer">
                  <span className={`font-display font-bold text-2xl sm:text-3xl w-12 shrink-0 transition-colors ${active === i ? "text-[#FE299E]" : "text-[#111827]/25"}`}>{o.mark}</span>
                  <span className={`font-display font-bold text-big transition-all duration-500 ${active === i ? "text-[#111827] translate-x-2" : "text-[#111827]/30"}`}>
                    {o.line}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="lg:col-span-4 lg:pt-6">
            <div className="lg:sticky lg:top-32">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}>
                  <div className="font-display text-[96px] font-bold leading-none text-[#FE299E]">{OPINIONS[active].mark}</div>
                  <p className="mt-6 text-xl leading-relaxed text-[#111827]/75">{OPINIONS[active].note}</p>
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
    key: "founders", who: "Founders", color: "#0B8FD6", headline: "Scale your vision.",
    title: "Scale beyond Silicon Valley's defaults",
    body: "Founders Big Tech overlooks deserve technology that respects their market and their edge. We build products that amplify your vision instead of flattening it into the same template every other startup uses.",
    art: "/images/brand/founders-blueprint.jpg", alt: "A figure on a giant blueprint that curls into a wave, a pink kite above",
  },
  {
    key: "creators", who: "Creators", color: "#FE299E", headline: "Create authentically.",
    title: "Create without creative conformity",
    body: "Independent creators deserve tools that amplify their voice rather than homogenize it. Write privately, publish on your own terms, and get paid when people (or machines) learn from your work.",
    art: "/images/brand/scary-staircase.jpg", alt: "A jagged staircase replaced by a gentle ramp, a figure with a pink umbrella",
  },
  {
    key: "families", who: "Families", color: "#4E8A12", headline: "Preserve what matters.",
    title: "Preventing Big Tech erasure, one family at a time",
    body: "Your family's stories belong to you, not to algorithms built to sell you things. We help you capture, protect, and pass down what matters, privately and on your terms.",
    art: "/images/brand/families-lighthouse.jpg", alt: "A lighthouse with a pink beam watching over a family in a rowboat",
  },
];

function WhoWeHelp() {
  const [i, setI] = useState(0);
  const a = AUDIENCES[i];
  return (
    <section className="py-28 sm:py-36 bg-[#F3EEE6]" data-testid="section-who">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">

        <h2 className="font-display font-bold text-huge text-[#111827]">
          We build for{" "}
          <span className="inline-flex flex-wrap gap-x-4">
            {AUDIENCES.map((x, n) => (
              <button key={x.key} onClick={() => setI(n)}
                className="relative bg-transparent cursor-pointer font-display font-bold transition-colors"
                style={{ color: n === i ? x.color : "rgba(17,24,39,0.22)" }}
                data-testid={`audience-${x.key}`}>
                {x.who}{n < AUDIENCES.length - 1 ? "," : "."}
                {n === i && (
                  <motion.span layoutId="aud-underline" className="absolute left-0 right-3 -bottom-1 h-[6px] rounded-full"
                    style={{ backgroundColor: x.color }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
              </button>
            ))}
          </span>
        </h2>

        <AnimatePresence mode="wait">
          <motion.div key={a.key} className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="font-display text-4xl sm:text-5xl font-bold" style={{ color: a.color }}>{a.headline}</div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-6 text-[#111827]">{a.title}</h3>
              <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#111827]/75">{a.body}</p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-lg font-semibold no-underline link-swipe" style={{ color: a.color }}>
                Tell us what's scary <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Art src={a.art} alt={a.alt} className="w-full aspect-[4/3] rounded-[28px]" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */
const STEPS = [
  { n: "01", word: "Scary", body: "You bring the thing that keeps you up at night: a regulator, a migration, a pile of AI hype, a product nobody can use." },
  { n: "02", word: "Clear", body: "In days, not quarters, we map it, name it, and draw it, so everyone from the board to the newest hire gets it." },
  { n: "03", word: "Shipped", body: "Then we build it for real: production code on a real design system, architected to keep scaling after we leave." },
];

function HowItWorks() {
  return (
    <section className="py-28 sm:py-36" data-testid="section-how">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mt-14 grid md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.12}>
              <div className="font-display text-2xl font-bold text-[#111827]/25">{s.n}</div>
              <div className={`font-display font-bold text-huge mt-2 ${i === 2 ? "text-[#FE299E]" : i === 0 ? "text-[#111827]/30 line-through decoration-[#FE299E] decoration-4" : "text-[#111827]"}`}>
                {s.word}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-[#111827]/75 max-w-[32ch]">{s.body}</p>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2} className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#111827]/10 pt-10">
          <p className="font-display text-2xl sm:text-3xl font-semibold max-w-2xl">
            Principal-led. Fixed scope. Starting with a one-week sprint.
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
  { mark: "|", name: "Pipes", line: "Curated human knowledge. Creators keep 70%.", href: "https://pipes.pink" },
  { mark: "#", name: "Hash", line: "A private place to think and write.", href: "https://pipes.pink/write" },
  { mark: ";-]", name: "Semi", line: "An AI editor that remembers, and doesn't pretend.", href: "https://pipes.pink/write" },
  { mark: ">", name: "Greater", line: "A classroom in any of 90 languages, in a minute.", href: "https://greater.pink" },
  { mark: "/", name: "Accént", line: "Our design system, out in the open.", href: "https://design.pipes.pink" },
];

function ThingsWeMake() {
  return (
    <section className="py-28 sm:py-36 bg-[#111827] text-[#FAF8F5]" data-testid="section-make">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <h2 className="font-display font-bold text-huge max-w-4xl">
          We build our own tools, too. Every one is named after punctuation.
        </h2>
        <ul className="mt-16">
          {MAKES.map((m) => (
            <li key={m.name}>
              <a href={m.href} target="_blank" rel="noopener noreferrer"
                className="group grid grid-cols-12 items-baseline gap-4 py-6 sm:py-8 border-t border-white/10 no-underline text-[#FAF8F5]">
                <span className="col-span-2 sm:col-span-1 font-display text-4xl sm:text-5xl font-bold transition-transform group-hover:-rotate-6">{m.mark}</span>
                <span className="col-span-10 sm:col-span-4 font-display text-4xl sm:text-5xl font-bold transition-transform duration-500 group-hover:translate-x-3">{m.name}</span>
                <span className="col-span-10 col-start-3 sm:col-start-auto sm:col-span-6 text-lg sm:text-xl text-white/60 group-hover:text-white transition-colors">{m.line}</span>
                <ArrowUpRight className="hidden sm:block col-span-1 justify-self-end w-7 h-7 text-white/30 group-hover:text-[#FE299E] transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CLOSE ─────────────────────────────── */
function Close() {
  return (
    <section className="py-32 sm:py-44 text-center" data-testid="section-close">
      <div className="max-w-[1100px] mx-auto px-5">
        <FadeUp>
          <Smile className="text-[120px] sm:text-[180px]" color="#FE299E" winkEvery={3000} />
        </FadeUp>
        <h2 className="font-display font-bold text-huge mt-10">
          <RiseLines lines={["Got something scary?", "Let's make it smile."]} />
        </h2>
        <FadeUp delay={0.2} className="mt-12 flex flex-wrap justify-center gap-4">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline">
              Start a project <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <a href="mailto:cubby@colonhyphenbracket.pink" className="inline-flex items-center px-8 py-4 rounded-full border-2 border-[#111827] text-[#111827] text-lg font-semibold no-underline hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors">
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
