import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { RiseLines, FadeUp } from "@/components/brand/motion";

const PINK = "#FE299E";
const BLUE = "#0A9BE0";
const GREEN = "#3FA535";

const PRODUCTS = [
  {
    mark: "|", name: "Pipes", color: BLUE, status: "Live", href: "https://pipes.pink", cta: "Open pipes.pink",
    scary: "AI scraping everything you've ever written",
    friendly: "Curators get paid when people, or machines, learn from them.",
    body: "Pipes is a home for curated human knowledge. Claim your own pipe for $9 a year, publish what you know, and keep 70% of what readers and AI agents pay to use it. Every piece is signed, so provenance is never a guess.",
    points: ["Your own namespace, for $9 a year", "Creators keep 70%", "Signed, verifiable provenance", "No algorithmic feed. Ever."],
  },
  {
    mark: "#", name: "Hash", color: GREEN, status: "Live in Pipes", href: "https://pipes.pink/write", cta: "Start writing",
    scary: "Your private notes training someone else's model",
    friendly: "A quiet, private place to think.",
    body: "Hash is a calm writing sanctuary for notes, journals, and drafts. It organizes itself without folders, imports your Substack in one click, and keeps everything private until you decide to publish.",
    points: ["Private by default", "One-click Substack import", "Organizes itself", "Publish to your pipe when ready"],
  },
  {
    mark: ";-]", name: "Semi", color: PINK, status: "Live in Pipes", href: "https://pipes.pink/write", cta: "Meet Semi",
    scary: "An AI that forgets you every session",
    friendly: "An editor who remembers, and doesn't pretend.",
    body: "A semicolon means the thought isn't finished. Semi is a patient editor-in-residence that remembers your projects, your voice, and your family's stories, and asks good questions instead of writing slop for you.",
    points: ["Remembers context over time", "Asks, doesn't ghostwrite", "Honest about what it doesn't know", "Never trained on your data"],
  },
  {
    mark: ">", name: "Greater", color: BLUE, status: "Live", href: "https://greater.pink", cta: "Open greater.pink",
    scary: "EdTech that treats kids like data",
    friendly: "A private classroom in any of 90 languages, in a minute.",
    body: "Greater lets teachers, co-ops, and families spin up a Socratic classroom in seconds, with AI that runs in the browser so student information never leaves the room.",
    points: ["90+ languages", "Local AI, no student data in the cloud", "Ready in about a minute", "Built for small schools and families"],
  },
  {
    mark: "&", name: "Marigold", color: GREEN, status: "Live", href: "https://bolt.pipes.pink", cta: "Try Marigold",
    scary: "Uploading sensitive records to a stranger's server",
    friendly: "Serious analytics that never leave your laptop.",
    body: "Marigold matches and analyzes hundreds of thousands of records right in your browser. Civic groups, nonprofits, and researchers get real answers without ever handing their data to the cloud.",
    points: ["500k+ rows in the browser", "Nothing uploaded, ever", "Encrypted at rest", "Made for civic and nonprofit work"],
  },
  {
    mark: "/", name: "Accént", color: PINK, status: "Open source", href: "https://design.pipes.pink", cta: "Explore the system",
    scary: "Design systems nobody can find or follow",
    friendly: "Our design system, out in the open.",
    body: "Accént is the design system behind everything we make: tokens, components, motion, and accessible color pairings, published so you can see exactly how the sausage is made.",
    points: ["Open tokens and components", "Accessible color pairings", "Motion guidelines", "Used across every CHB product"],
  },
];

export default function Products() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <div className="brand-canvas min-h-screen">
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-display font-bold text-mega">
              <RiseLines immediate lines={["Things we make.", <span key="b" className="text-[#FE299E]">Go try them.</span>]} />
            </h1>
            <FadeUp delay={0.3}>
              <p className="mt-10 text-xl sm:text-2xl leading-[1.45] text-[#111827]/80 max-w-[36ch]">
                We build our own tools, every one named after a punctuation mark, because punctuation is how humans give
                thought shape. Each one takes something scary and makes it kind.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.4} className="lg:col-span-5">
            <img src="/images/brand/products-workbench.jpg" alt="A tiny figure on a drafting table among giant punctuation sculptures"
              className="w-full aspect-[16/10] object-cover rounded-[28px]" />
          </FadeUp>
        </div>
      </section>

      {/* Picker */}
      <section className="pb-28 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-[#111827]/10 pb-6">
            {PRODUCTS.map((x, i) => (
              <button key={x.name} onClick={() => setActive(i)}
                className="relative bg-transparent cursor-pointer font-display text-3xl sm:text-5xl font-bold transition-colors pb-2"
                style={{ color: i === active ? x.color : "rgba(17,24,39,0.22)" }}
                data-testid={`product-tab-${x.name.toLowerCase()}`}>
                <span className="mr-2">{x.mark}</span>{x.name}
                {i === active && (
                  <motion.span layoutId="prod-underline" className="absolute left-0 right-0 -bottom-[26px] h-[5px] rounded-full"
                    style={{ backgroundColor: x.color }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={p.name} className="mt-16 grid lg:grid-cols-12 gap-12 lg:gap-16"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <div className="lg:col-span-7">
                <div className="font-display text-[110px] sm:text-[150px] font-bold leading-none" style={{ color: p.color }}>{p.mark}</div>
                <p className="mt-8 font-display text-2xl sm:text-3xl font-semibold text-[#111827]/35 line-through decoration-4" style={{ textDecorationColor: p.color }}>
                  {p.scary}
                </p>
                <h2 className="mt-3 font-display text-big font-bold text-[#111827]">{p.friendly}</h2>
                <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[#111827]/75 max-w-[56ch]">{p.body}</p>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} href={p.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-white text-lg font-semibold no-underline"
                    style={{ backgroundColor: p.color }}>
                    {p.cta} <ArrowUpRight className="w-5 h-5" />
                  </motion.a>
                  <span className="text-lg text-[#111827]/55">{p.status}</span>
                </div>
              </div>
              <ul className="lg:col-span-5 lg:pt-10">
                {p.points.map((pt, i) => (
                  <motion.li key={pt} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-baseline gap-5 py-6 border-t border-[#111827]/10 font-display text-2xl sm:text-3xl font-semibold text-[#111827]">
                    <span style={{ color: p.color }}>{p.mark}</span>{pt}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Together */}
      <section className="py-28 sm:py-36 bg-[#111827] text-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-center">
          <h2 className="lg:col-span-7 font-display font-bold text-huge">
            Better together, <span className="text-[#0A9BE0]">fine</span> <span className="text-[#3FA535]">alone</span><span className="text-[#FE299E]">.</span>
          </h2>
          <p className="lg:col-span-5 text-xl leading-relaxed text-white/70">
            Think in Hash, refine with Semi, publish to your pipe, teach with Greater, and analyze with Marigold. Or just
            use the one you need. One account works across all of them.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="py-32 sm:py-40 text-center">
        <Smile className="text-[120px] sm:text-[160px]" color={PINK} winkEvery={3000} />
        <h2 className="font-display font-bold text-huge mt-8 px-5">Need something we haven't made yet?</h2>
        <Link href="/contact" className="mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111827] text-[#FAF8F5] hover:bg-[#FE299E] transition-colors text-lg font-semibold no-underline">
          Tell the studio <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
