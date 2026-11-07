import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { ScaryHeadline, MANIFESTO_SCARY_PAIRS } from "@/components/brand/scary-words";
import { RiseLines, FadeUp } from "@/components/brand/motion";
import { Seo } from "@/components/brand/seo";

const PILLARS = [
  {
    mark: ": - ]",
    color: "#FE299E",
    title: "From Southern Appalachia to Wall Street—and back.",
    body: "I grew up in Southern Appalachia and spent the last fifteen years leading design and software architecture at places like Custodia Bank, UnitedHealth Group, and Walmart, alongside high-growth coastal startups. Along the way, I noticed an uncomfortable truth: the best product craft, cleanest architecture, and most honest software almost exclusively serve a tiny circle of coastal tech companies—while the businesses, schools, and clinics that actually run our communities get sold bloated, unpatched WordPress templates and predatory maintenance retainers.",
  },
  {
    mark: "|||",
    color: "#0A9BE0",
    title: "Main Street deserves principal-level software.",
    body: "Whether you run an independent venue, a regional manufacturer, a homeschool co-op, or a venture-backed startup in New York or San Francisco, you deserve software that works, scales, and belongs to you. We don't build throwaway marketing fluff. We build real tools, real design systems, and real data architecture that make your business stronger on day five—and five years from now.",
  },
  {
    mark: "#",
    color: "#3FA535",
    title: "Explicit perspective beats fake neutrality.",
    body: "Every piece of software has a point of view. Most tech companies hide theirs behind dark patterns, legalese, and black-box algorithms trained on scraped human work. We declare our bias openly: your data belongs to you, creators should get paid when machines learn from them, and software should be a patient Socratic partner—never a replacement for human judgment.",
  },
  {
    mark: "; - ]",
    color: "#FE299E",
    title: "Scary is a failure of craft, not intelligence.",
    body: "When a founder, a teacher, or a grandparent feels intimidated by software, the user isn't the problem—the design is. Our job is to take the gnarliest parts of technology (cryptography, compliance, local-first computing, zero-knowledge analytics) and shoulder that complexity ourselves, so the person on the other side of the screen just gets clarity, speed, and a smile.",
  },
];

const CONTRASTS = [
  {
    them: "Four-person agency pods playing telephone between strategy decks, Figma files, and junior contractors.",
    us: "One principal designer-architect who listens on Monday, designs on Wednesday, and ships production code on Friday.",
    color: "#FE299E",
  },
  {
    them: "Bloated, unpatched WordPress builds with surprise hosting fees and $300/hr maintenance traps.",
    us: "Modern, fast, accessible software in a repository you own outright—documented so your team is never held hostage.",
    color: "#0A9BE0",
  },
  {
    them: "Black-box features bolted on for investor slides that quietly upload your customers' private records to someone else's cloud.",
    us: "Local-first, sovereign tools (Pipes |||, Hash #, Semi ; - ], Marigold ❀) built around privacy and verifiable provenance.",
    color: "#3FA535",
  },
  {
    them: "Treating businesses outside San Francisco and New York like an afterthought.",
    us: "Bringing Fortune-500 and Series-B product rigor to Main Street, regulated teams, and ambitious founders everywhere.",
    color: "#FE299E",
  },
];

export default function ManifestoPage() {
  return (
    <div className="brand-canvas min-h-screen">
      <Seo
        title="Manifesto | Colon Hyphen Bracket : - ] — Coastal Rigor, Appalachian Honesty"
        description="Why a principal designer-architect from Southern Appalachia built Colon Hyphen Bracket for the founders, creators, families, and Main Street businesses Big Tech overlooked."
        path="/manifesto"
      />

      {/* Full-Width Bold Typographic Hero */}
      <section className="pt-28 sm:pt-40 pb-20 sm:pb-32 border-b border-[#111827]/10" data-testid="manifesto-hero">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-display font-bold text-[#111827] text-[clamp(2.2rem,6.5vw,6.5rem)] leading-[0.96]">
            <ScaryHeadline
              accent="#FE299E"
              pairs={MANIFESTO_SCARY_PAIRS}
              leadIn="We replace"
              connector="with"
              fallbackWord="real craft"
            />
          </h1>

          <FadeUp delay={0.25} className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-8 sm:gap-10 items-end">
            <p className="lg:col-span-8 font-display text-xl sm:text-4xl font-semibold leading-[1.3] sm:leading-[1.25] text-[#111827]">
              Why a principal designer-architect from Southern Appalachia built a studio for the founders, creators, families, and Main Street businesses Big Tech overlooked.
            </p>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-base sm:text-lg font-semibold no-underline"
              >
                Work with us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* The Story & 4 Pillars */}
      <section className="py-20 sm:py-36" data-testid="manifesto-pillars">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16 sm:space-y-32">
          {PILLARS.map((p, idx) => (
            <FadeUp
              key={p.title}
              delay={idx * 0.05}
              className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-start pt-10 border-t border-[#111827]/10 first:border-t-0 first:pt-0"
            >
              <div className="lg:col-span-4">
                <div
                  className="font-display font-black leading-none text-5xl sm:text-7xl whitespace-nowrap"
                  style={{ color: p.color }}
                >
                  {p.mark}
                </div>
              </div>
              <div className="lg:col-span-8">
                <h2 className="font-display text-2xl sm:text-5xl font-bold text-[#111827] leading-[1.1]">
                  {p.title}
                </h2>
                <p className="mt-4 sm:mt-6 text-lg sm:text-2xl leading-relaxed text-[#111827]/75 max-w-[58ch]">
                  {p.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Dark Navy Band: How Default Agencies Work vs. How CHB Works */}
      <section className="py-20 sm:py-36 bg-[#111827] text-[#FAF8F5]" data-testid="manifesto-contrast">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display font-bold text-huge max-w-4xl">
            What we refuse to do—and what we do instead.
          </h2>

          <div className="mt-12 sm:mt-16 space-y-0">
            {CONTRASTS.map((c, i) => (
              <FadeUp
                key={i}
                delay={i * 0.06}
                className="grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-12 py-8 sm:py-10 border-t border-white/15 items-baseline"
              >
                <div className="md:col-span-5">
                  <p className="font-display text-lg sm:text-2xl font-medium text-white/40 line-through decoration-2" style={{ textDecorationColor: c.color }}>
                    {c.them}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="font-display text-xl sm:text-3xl font-bold text-white leading-snug">
                    <span className="mr-3" style={{ color: c.color }}>→</span>
                    {c.us}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Signature & Close */}
      <section className="py-20 sm:py-32 text-center" data-testid="manifesto-close">
        <div className="max-w-[960px] mx-auto px-5">
          <FadeUp>
            <Smile className="text-[96px] sm:text-[150px]" color="#FE299E" winkEvery={3000} />
          </FadeUp>
          <h2 className="font-display font-bold text-huge mt-6">
            <RiseLines immediate lines={["Coastal rigor.", "Appalachian honesty."]} />
          </h2>
          <p className="mt-6 text-lg sm:text-2xl text-[#111827]/75 max-w-2xl mx-auto leading-relaxed">
            Whether you're on Main Street or Sand Hill Road, if you're building something that matters, we'd love to help you ship it.
          </p>
          <FadeUp delay={0.2} className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FE299E] text-white text-lg font-semibold no-underline shadow-sm"
              >
                Start a project <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors text-lg font-semibold no-underline"
            >
              See how the studio works
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
