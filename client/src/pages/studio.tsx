import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";
import { Seo } from "@/components/brand/seo";

const WHO = [
  { who: "Startups", line: "Zero to one to Series B, without a four-person pod playing telephone." },
  { who: "Regulated teams", line: "Banking, healthcare, and anything with an auditor. We've shipped in all of them." },
  { who: "Schools & families", line: "Private classrooms and memory tools that never treat kids as data." },
  { who: "Main Street", line: "Field teams, venues, and independent shops that run the country." },
];

const WEEK = [
  { d: "Mon", t: "Listen", b: "You explain the scary thing. We ask annoying questions." },
  { d: "Tue", t: "Map", b: "Domain, data, and constraints drawn on one page." },
  { d: "Wed", t: "Design", b: "Real screens on a real design system, not sticky notes." },
  { d: "Thu", t: "Build", b: "Working code wired to real data, deployed." },
  { d: "Fri", t: "Smile", b: "Walkthrough, decision memo, repo handed over. : - ]" },
];

const TIERS = [
  {
    name: "The Sprint",
    price: "$7,500",
    per: "one week, fixed scope",
    body: "Go from a scary thesis to a working, deployed prototype and an architecture you can build on. You own every line.",
    cta: "Book a sprint",
  },
  {
    name: "The Partner",
    price: "Starts at $15k",
    per: "per month (fractional, ~10–20 hrs/wk)",
    body: "A principal designer-architect embedded in your team: product direction, design system, and production code. Target full engagement is $21k/month. Pause anytime.",
    cta: "Start a conversation",
  },
  {
    name: "The Build",
    price: "Custom",
    per: "by milestone or day rate",
    body: "Turnkey products, data rooms, and custom platforms scoped honestly. We also do single-day build sprints and focused interventions for smaller teams.",
    cta: "Scope a build",
  },
];

const FAQ = [
  {
    q: "Is it really just one person?",
    a: "One principal (Kyle Cyree, 15+ years across Custodia Bank, UnitedHealth Group, and Walmart) leading every decision from architecture to code. When a project needs additional hands, we bring trusted specialists, but you always talk directly to the person doing the work.",
  },
  {
    q: "Do you do smaller or single-day builds?",
    a: "Yes. $7,500 for a full week isn't a rigid floor. We regularly do single-day build sprints and focused interventions for early teams. Contact us for current day rates.",
  },
  {
    q: "Do you do design or engineering?",
    a: "Yes. That's the point. The handoff between them is where most products lose months.",
  },
  {
    q: "What if my problem isn't scary?",
    a: "Then it's probably fun, and we like fun too.",
  },
  {
    q: "How do you handle privacy and intellectual property?",
    a: "Your repository, design tokens, and intellectual property belong to you on day one. We never train external models on your private data or lock you into proprietary maintenance retainers.",
  },
];

export default function StudioPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="brand-canvas min-h-screen">
      <Seo
        title="Studio | Colon Hyphen Bracket : - ] — One Senior Human. No Handoffs."
        description="From scary thesis to shipped production code in five days. Fixed one-week sprints ($7,500), embedded partnerships, and custom builds by principal designer-architect Kyle Cyree."
        path="/studio"
        image="/images/og/og-studio.jpg"
      />

      {/* Hero */}
      <section className="pt-28 sm:pt-40 pb-16 sm:pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-display font-bold text-mega">
            <RiseLines immediate lines={["One senior human.", <span key="n" className="text-[#FE299E]">No handoffs.</span>]} />
          </h1>
          <FadeUp delay={0.3} className="mt-8 sm:mt-12 grid lg:grid-cols-12 gap-8 sm:gap-10">
            <p className="lg:col-span-7 text-lg sm:text-2xl leading-[1.45] text-[#111827]/80">
              Most product teams lose months translating between strategy decks, design files, and engineering tickets.
              At Colon Hyphen Bracket, the person who understands your problem is the same person who designs the
              screens and writes the code. Less telephone, more shipping.
            </p>
            <div className="lg:col-span-5 lg:justify-self-end self-end">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FE299E] text-white text-base sm:text-lg font-semibold no-underline">
                  Book a one-week sprint <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Bold Typographic Handoff-Elimination Band */}
      <FadeUp className="bg-[#111827] text-[#FAF8F5] py-16 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="font-display text-xl sm:text-3xl font-bold text-white/35 line-through decoration-[#FE299E] decoration-4">
              Strategy deck → Figma handoff → Jira backlog → 4 months lost
            </div>
            <div className="font-display text-2xl sm:text-5xl font-bold text-white leading-tight pt-2">
              <span className="text-[#0A9BE0]">Problem</span> →{" "}
              <span className="text-[#3FA535]">Design</span> →{" "}
              <span className="text-[#FE299E]">Production Code</span>{" "}
              <span className="text-white/60">in one head.</span>
            </div>
          </div>
          <div className="lg:col-span-6 grid sm:grid-cols-3 gap-6 border-t lg:border-t-0 lg:border-l border-white/15 pt-8 lg:pt-0 lg:pl-12">
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#0A9BE0]">1</div>
              <p className="mt-2 text-base text-white/75 leading-relaxed">
                Principal architect from first call to final pull request.
              </p>
            </div>
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#3FA535]">5 days</div>
              <p className="mt-2 text-base text-white/75 leading-relaxed">
                To go from a gnarly thesis to deployed, working software.
              </p>
            </div>
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#FE299E]">100%</div>
              <p className="mt-2 text-base text-white/75 leading-relaxed">
                Your repository, your design tokens, your IP on day one.
              </p>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Who */}
      <section className="py-20 sm:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <ul className="mt-4 sm:mt-12">
            {WHO.map((w, i) => (
              <FadeUp key={w.who} delay={i * 0.06}>
                <li className="group grid md:grid-cols-12 gap-3 md:gap-8 items-baseline py-6 sm:py-7 border-t border-[#111827]/10">
                  <span className="md:col-span-5 font-display font-bold text-big group-hover:text-[#FE299E] transition-colors">{w.who}</span>
                  <span className="md:col-span-7 text-lg sm:text-xl text-[#111827]/70">{w.line}</span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* A week */}
      <section className="py-20 sm:py-36 bg-[#F3EEE6]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display font-bold text-huge max-w-4xl">Five days from scary to shipped.</h2>
          <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {WEEK.map((w, i) => (
              <FadeUp key={w.d} delay={i * 0.08}>
                <div className="font-display text-xl font-bold text-[#111827]/30">{w.d}</div>
                <div className={`font-display text-3xl sm:text-4xl font-bold mt-2 ${i === 4 ? "text-[#FE299E]" : ""}`}>{w.t}</div>
                <p className="mt-3 text-[17px] leading-relaxed text-[#111827]/70">{w.b}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 sm:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mt-6 sm:mt-14 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111827]/10 border-t border-[#111827]/10">
            {TIERS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1} className="py-8 sm:pt-10 md:px-8 first:md:pl-0 last:md:pr-0 sm:pb-10 flex flex-col">
                <div className="font-display text-2xl sm:text-3xl font-bold">{t.name}</div>
                <div className="mt-4 sm:mt-6 font-display text-5xl sm:text-6xl font-bold tracking-tight">{t.price}</div>
                <div className="text-base sm:text-lg text-[#111827]/55 mt-1">{t.per}</div>
                <p className="mt-5 sm:mt-6 text-lg leading-relaxed text-[#111827]/75 flex-1">{t.body}</p>
                <Link href="/contact" className="mt-6 sm:mt-8 link-swipe inline-flex items-center gap-2 text-lg font-semibold text-[#111827] no-underline self-start">
                  {t.cta} <ArrowRight className="w-5 h-5 text-[#FE299E]" />
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mt-6 sm:mt-10">
            {FAQ.map((f, i) => (
              <div key={f.q} className="border-t border-[#111827]/10">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 sm:gap-6 py-5 sm:py-6 text-left bg-transparent cursor-pointer"
                  aria-expanded={open === i}
                >
                  <span className="font-display text-xl sm:text-3xl font-bold">{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0">
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-[#FE299E]" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-lg sm:text-xl leading-relaxed text-[#111827]/75 pr-4 sm:pr-12"
                    >
                      <span className="block pb-6 sm:pb-7">{f.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="pb-28 sm:pb-36 text-center">
        <Smile className="text-[100px] sm:text-[160px]" color="#FE299E" winkEvery={3000} />
        <h2 className="font-display font-bold text-huge mt-6 sm:mt-8 px-5">Let's make it smile.</h2>
        <Link href="/contact" className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-lg font-semibold no-underline">
          Start a project <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
