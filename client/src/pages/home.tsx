import { useState, useEffect } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { ScaryHeadline } from "@/components/brand/scary-words";
import { RiseLines, FadeUp } from "@/components/brand/motion";

function Art({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`bg-[#F1ECE4] ${className}`} aria-hidden />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className={`object-cover ${className}`} />;
}

/* ─────────────────────────────── HERO (MULE DESIGN INSPIRED) ─────────────────────────────── */
function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28" data-testid="hero-section">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Full-bleed hero banner with text layered over warm architectural Guy Billout illustration */}
        <div className="relative rounded-[36px] overflow-hidden bg-[#111827] text-[#FAF8F5] min-h-[560px] sm:min-h-[640px] flex flex-col justify-end p-8 sm:p-14 lg:p-18 shadow-xl">
          {/* Background image with gentle tint so white headline is punchy & legible */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/brand/scary-staircase.jpg"
              alt="A gentle ramp bypassing a jagged staircase with a pink umbrella"
              className="w-full h-full object-cover opacity-35 filter blur-[0.5px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/85 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="font-display font-bold text-[#FAF8F5] text-[clamp(2.6rem,7.4vw,7.75rem)] leading-[0.95]" data-testid="hero-title">
              <ScaryHeadline accent="#FE299E" />
            </h1>

            <FadeUp delay={0.25} className="mt-8 sm:mt-10">
              <p className="text-xl sm:text-2xl leading-[1.45] text-white/85 max-w-[36ch]">
                Colon Hyphen Bracket takes the intimidating parts of software (compliance, infrastructure, AI) and makes them clear, honest, and kind to use. For founders, creators, and families Big Tech forgot.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]">
                    Bring us something scary <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <a href="#manifesto" className="text-lg font-medium text-white/80 hover:text-white no-underline link-swipe">
                  Explore our core opinions ↓
                </a>
              </div>
            </FadeUp>
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
    <div className="border-y border-[#111827]/10 py-6 overflow-hidden bg-[#FAF8F5]" aria-hidden>
      <motion.div className="flex gap-10 whitespace-nowrap font-display text-4xl sm:text-5xl font-bold"
        animate={{ x: ["0%", "-50%"] }} transition={{ duration: 38, ease: "linear", repeat: Infinity }}>
        {row.map((w, i) => (
          <span key={i} className={/[:;é#|❀→]/.test(w) ? "text-[#FE299E]" : "text-[#111827]/85"}>{w}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── MANIFESTO (CONTINUOUS SCROLL REVEAL) ──────────────────────────── */
const MCOL = ["#FE299E", "#0A9BE0", "#3FA535"];
const OPINIONS = [
  { id: "op-0", mark: ": - ]", line: "Scary is a design problem.", note: "If people are afraid of your product, that's on us, not them. Fear is just complexity nobody bothered to explain." },
  { id: "op-1", mark: "#", line: "Explicit bias beats fake neutrality.", note: "We have opinions. We tell you what they are. You're smart enough to disagree." },
  { id: "op-2", mark: "; - ]", line: "One senior human beats four handoffs.", note: "Strategy, design, and code in one head. No telephone game, no translation tax." },
  { id: "op-3", mark: "|||", line: "Independent means uncompromised.", note: "No VC to please. Curators keep 70% of what they create. We answer to the people who use the software." },
  { id: "op-4", mark: "é", line: "Craft is how you scale.", note: "Clean architecture and a real design system are what let small teams act big." },
  { id: "op-5", mark: "❀", line: "Your data is yours. Full stop.", note: "Local-first, private by default. Marigold analyzes data in your browser; we never sell, mine, or train on what you make." },
];

function Manifesto() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 320;
      for (let i = 0; i < OPINIONS.length; i++) {
        const el = document.getElementById(OPINIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(i);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="manifesto" className="py-28 sm:py-36 scroll-mt-24" data-testid="section-manifesto">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <h2 className="font-display font-bold text-huge text-[#111827]">
          What we believe.
        </h2>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <ol className="lg:col-span-8">
            {OPINIONS.map((o, i) => (
              <li key={o.id} id={o.id} className="scroll-mt-48">
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group w-full text-left py-7 sm:py-8 border-t border-[#111827]/10 flex items-baseline gap-5 sm:gap-8 bg-transparent cursor-pointer"
                >
                  <span
                    className={`font-display font-bold text-2xl sm:text-3xl w-14 shrink-0 transition-colors duration-300 ${active === i ? "" : "text-[#111827]/25"}`}
                    style={active === i ? { color: MCOL[i % 3] } : undefined}
                  >
                    {o.mark}
                  </span>
                  <div className="flex-1">
                    <span
                      className={`block font-display font-bold text-big transition-all duration-300 ${
                        active === i ? "text-[#111827] translate-x-2" : "text-[#111827]/30"
                      }`}
                    >
                      {o.line}
                    </span>
                    {/* Inline on mobile, sticky side on desktop */}
                    <div className="block lg:hidden mt-3 text-lg text-[#111827]/75">
                      {o.note}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block lg:col-span-4 lg:pt-6">
            <div className="sticky top-36 p-8 rounded-3xl bg-[#F3EEE6]/70 border border-[#111827]/10 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

/* ─────────────────────────── WHO WE HELP (CONTINUOUS SCROLL STORYTELLING) ─────────────────────────── */
const AUDIENCES = [
  {
    key: "founders", who: "Founders", color: "#0A9BE0", headline: "Scale your vision.",
    title: "Scale beyond Silicon Valley's defaults",
    body: "Founders Big Tech overlooks deserve technology that respects their market and their edge. We build products that amplify your vision instead of flattening it into the same template every other startup uses.",
    art: "/images/brand/founders-blueprint.jpg", alt: "A figure on a giant blueprint that curls into a wave, a sky-blue kite above",
  },
  {
    key: "creators", who: "Creators", color: "#FE299E", headline: "Create authentically.",
    title: "Create without creative conformity",
    body: "Independent creators deserve tools that amplify their voice rather than homogenize it. Write privately, publish on your own terms, and get paid when people (or machines) learn from your work.",
    art: "/images/brand/scary-staircase.jpg", alt: "A jagged staircase replaced by a gentle ramp, a figure with a pink umbrella",
  },
  {
    key: "families", who: "Families", color: "#3FA535", headline: "Preserve what matters.",
    title: "Preventing Big Tech erasure, one family at a time",
    body: "Your family's stories belong to you, not to algorithms built to sell you things. We help you capture, protect, and pass down what matters, privately and on your terms.",
    art: "/images/brand/families-lighthouse.jpg", alt: "A lighthouse with a green beam watching over a family in a rowboat",
  },
];

function WhoWeHelp() {
  const [activeKey, setActiveKey] = useState("founders");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (const a of AUDIENCES) {
        const el = document.getElementById(`who-${a.key}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveKey(a.key);
            break;
          }
        }
      }
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
    <section className="py-28 sm:py-36 bg-[#F3EEE6]" data-testid="section-who">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Sticky perspective header tracking scroll */}
        <div className="sticky top-20 z-10 bg-[#F3EEE6]/90 backdrop-blur-md border-b border-[#111827]/10 py-4 mb-16">
          <div className="flex flex-wrap items-baseline gap-x-6 sm:gap-x-10 gap-y-3">
            <span className="font-display font-bold text-2xl sm:text-4xl text-[#111827]">
              We build for:
            </span>
            {AUDIENCES.map((x) => {
              const isActive = activeKey === x.key;
              return (
                <button
                  key={x.key}
                  onClick={() => scrollToAudience(x.key)}
                  className="relative bg-transparent cursor-pointer font-display text-2xl sm:text-4xl font-bold transition-all duration-300 py-1"
                  style={{ color: isActive ? x.color : "rgba(17,24,39,0.25)" }}
                >
                  {x.who}
                  {isActive && (
                    <motion.span
                      layoutId="aud-active-bar"
                      className="absolute left-0 right-0 -bottom-1.5 h-[5px] rounded-full"
                      style={{ backgroundColor: x.color }}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sequential Chapters - Scroll to reveal without forced clicking */}
        <div className="space-y-32">
          {AUDIENCES.map((a) => (
            <div
              key={a.key}
              id={`who-${a.key}`}
              className="scroll-mt-36 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-8 border-t border-[#111827]/10"
            >
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="font-display text-4xl sm:text-5xl font-bold" style={{ color: a.color }}>
                  {a.headline}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-6 text-[#111827]">
                  {a.title}
                </h3>
                <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#111827]/75">
                  {a.body}
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-lg font-semibold no-underline link-swipe"
                  style={{ color: a.color }}
                >
                  Tell us what's scary <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                <Art src={a.art} alt={a.alt} className="w-full aspect-[4/3] rounded-[28px] shadow-sm" />
              </div>
            </div>
          ))}
        </div>
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
              <div className={`font-display font-bold text-huge mt-2 ${i === 2 ? "text-[#FE299E]" : i === 0 ? "text-[#111827]/30 line-through decoration-[#FE299E] decoration-4" : "text-[#0A9BE0]"}`}>
                {s.word}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-[#111827]/75 max-w-[32ch]">{s.body}</p>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2} className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#111827]/10 pt-10">
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
  { color: "#0A9BE0", mark: "|||", name: "Pipes", line: "Curated human knowledge. Creators keep 70%.", href: "https://pipes.pink" },
  { color: "#3FA535", mark: "#", name: "Hash", line: "A private place to think and write.", href: "https://pipes.pink/write" },
  { color: "#FE299E", mark: "; - ]", name: "Semi", line: "An AI editor that remembers, and doesn't pretend.", href: "https://pipes.pink/write" },
  { color: "#0A9BE0", mark: ">", name: "Greater", line: "A classroom in any of 90 languages, in a minute.", href: "https://greater.pink" },
  { color: "#FE299E", mark: "é", name: "Accént", line: "Our design system, out in the open.", href: "https://design.pipes.pink" },
  { color: "#D97706", mark: "❀", name: "Marigold", line: "Zero-knowledge local civic analytics.", href: "https://marigoldinsights.org" },
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
                <span className="col-span-2 sm:col-span-1 font-display text-4xl sm:text-5xl font-bold transition-transform group-hover:-rotate-6" style={{ color: m.color }}>{m.mark}</span>
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

/* ─────────────────────────────── CLOSE (RICH GROUNDED HERO CONCLUSION) ─────────────────────────────── */
function Close() {
  return (
    <section className="py-28 sm:py-36 text-center" data-testid="section-close">
      <div className="max-w-[1000px] mx-auto px-5">
        <FadeUp>
          <Smile className="text-[120px] sm:text-[180px]" color="#FE299E" winkEvery={3000} />
        </FadeUp>
        <h2 className="font-display font-bold text-huge mt-8">
          <RiseLines lines={["Got something scary?", "Let's make it smile."]} />
        </h2>

        {/* Studio Direct Reassurance Cards (Replaces the empty white void) */}
        <FadeUp delay={0.2} className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10">
            <div className="font-display text-2xl font-bold text-[#111827]">Fixed Sprints</div>
            <p className="mt-2 text-base text-[#111827]/70 leading-relaxed">
              $7,500 one-week sprint or single-day build. No scope creep, no runaway retainers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10">
            <div className="font-display text-2xl font-bold text-[#111827]">Direct Kyle</div>
            <p className="mt-2 text-base text-[#111827]/70 leading-relaxed">
              No account managers or junior handoffs. You talk directly with the principal architect.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10">
            <div className="font-display text-2xl font-bold text-[#111827]">Code You Own</div>
            <p className="mt-2 text-base text-[#111827]/70 leading-relaxed">
              Clean architecture, tested repo, full design tokens. Deployed and handed over on Friday.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3} className="mt-12 flex flex-wrap justify-center items-center gap-4">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-sm">
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