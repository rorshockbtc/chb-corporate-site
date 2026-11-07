import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp, Eyebrow } from "@/components/brand/motion";

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
  { d: "Fri", t: "Smile", b: "Walkthrough, decision memo, repo handed over. :-]" },
];

const TIERS = [
  { name: "The Sprint", price: "$7,500", per: "one week, fixed", body: "Go from a scary thesis to a working, deployed prototype and an architecture you can build on. You own every line.", cta: "Book a sprint" },
  { name: "The Partner", price: "$15,000", per: "per month", body: "A principal designer-architect embedded in your team: product direction, design system, and production code. Pause anytime.", cta: "Start a conversation" },
  { name: "The Build", price: "Custom", per: "by milestone", body: "Turnkey products: classrooms, data rooms, client platforms. Scoped honestly and shipped calmly.", cta: "Scope a build" },
];

const FAQ = [
  { q: "Is it really just one person?", a: "One principal (Kyle Cyree, 15+ years across Custodia Bank, UnitedHealth Group, and Walmart) with a disciplined AI-assisted workflow. When a project needs more hands, we bring trusted specialists, but you always talk to the person doing the work." },
  { q: "Do you do design or engineering?", a: "Yes. That's the point. The handoff between them is where most products lose months." },
  { q: "What if my problem isn't scary?", a: "Then it's probably fun, and we like fun too." },
  { q: "Do you use AI?", a: "Carefully and openly. Never on your private data without permission, and never as a substitute for judgment." },
];

export default function StudioPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="brand-canvas min-h-screen">
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp><Eyebrow mark=":-]">The studio</Eyebrow></FadeUp>
          <h1 className="font-display font-bold text-mega mt-8">
            <RiseLines immediate lines={["One senior human.", <span key="n" className="text-[#FE299E]">No handoffs.</span>]} />
          </h1>
          <FadeUp delay={0.3} className="mt-12 grid lg:grid-cols-12 gap-10">
            <p className="lg:col-span-7 text-xl sm:text-2xl leading-[1.45] text-[#111827]/80">
              Most product teams lose months translating between strategy decks, design files, and engineering tickets.
              At Colon Hyphen Bracket, the person who understands your problem is the same person who designs the
              screens and writes the code. Less telephone, more shipping.
            </p>
            <div className="lg:col-span-5 lg:justify-self-end self-end">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline">
                  Book a one-week sprint <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Art band */}
      <FadeUp className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <img src="/images/brand/scary-staircase.jpg" alt="A jagged staircase bypassed by a gentle ramp" className="w-full aspect-[21/9] object-cover rounded-[28px]" />
      </FadeUp>

      {/* Who */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp><Eyebrow mark="&">Who we build for</Eyebrow></FadeUp>
          <ul className="mt-12">
            {WHO.map((w, i) => (
              <FadeUp key={w.who} delay={i * 0.06}>
                <li className="group grid md:grid-cols-12 gap-3 md:gap-8 items-baseline py-7 border-t border-[#111827]/10">
                  <span className="md:col-span-5 font-display font-bold text-big group-hover:text-[#FE299E] transition-colors">{w.who}</span>
                  <span className="md:col-span-7 text-lg sm:text-xl text-[#111827]/70">{w.line}</span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* A week */}
      <section className="py-28 sm:py-36 bg-[#F3EEE6]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp><Eyebrow mark=";-]">What a sprint actually looks like</Eyebrow></FadeUp>
          <h2 className="font-display font-bold text-huge mt-8 max-w-4xl">Five days from scary to shipped.</h2>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {WEEK.map((w, i) => (
              <FadeUp key={w.d} delay={i * 0.08}>
                <div className="font-mono text-sm text-[#111827]/40">{w.d}</div>
                <div className={`font-display text-4xl font-bold mt-2 ${i === 4 ? "text-[#FE299E]" : ""}`}>{w.t}</div>
                <p className="mt-3 text-[17px] leading-relaxed text-[#111827]/70">{w.b}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp><Eyebrow mark="|">Ways to work together</Eyebrow></FadeUp>
          <div className="mt-14 grid md:grid-cols-3 md:divide-x divide-[#111827]/10 border-t border-[#111827]/10">
            {TIERS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1} className="pt-10 md:px-8 first:md:pl-0 last:md:pr-0 pb-10 flex flex-col">
                <div className="font-display text-3xl font-bold">{t.name}</div>
                <div className="mt-6 font-display text-6xl font-bold tracking-tight">{t.price}</div>
                <div className="font-mono text-sm text-[#111827]/50 mt-1">{t.per}</div>
                <p className="mt-6 text-lg leading-relaxed text-[#111827]/75 flex-1">{t.body}</p>
                <Link href="/contact" className="mt-8 link-swipe inline-flex items-center gap-2 text-lg font-semibold text-[#111827] no-underline self-start">
                  {t.cta} <ArrowRight className="w-5 h-5 text-[#FE299E]" />
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28 sm:pb-36">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <FadeUp><Eyebrow mark="?">Honest answers</Eyebrow></FadeUp>
          <div className="mt-10">
            {FAQ.map((f, i) => (
              <div key={f.q} className="border-t border-[#111827]/10">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left bg-transparent cursor-pointer"
                  aria-expanded={open === i}>
                  <span className="font-display text-2xl sm:text-3xl font-bold">{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }}><Plus className="w-7 h-7 text-[#FE299E]" /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-lg sm:text-xl leading-relaxed text-[#111827]/75 pr-12">
                      <span className="block pb-7">{f.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="pb-36 text-center">
        <Smile className="text-[120px] sm:text-[160px]" color="#FE299E" winkEvery={3000} />
        <h2 className="font-display font-bold text-huge mt-8 px-5">Let's make it smile.</h2>
        <Link href="/contact" className="mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-lg font-semibold no-underline">
          Start a project <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
