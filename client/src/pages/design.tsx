import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { RiseLines, FadeUp } from "@/components/brand/motion";
import { PageClose, type CloseCardItem } from "@/components/brand/page-close";
import { Seo } from "@/components/brand/seo";
import {
  ACCENT_TO_CHB_VARIABLE_MAP,
  CHB_SEVEN_PRODUCT_SLOTS,
  PLAYFUL_PRINCIPAL_PROFILE,
} from "@/styles/accent.config";

const CORE_SWATCHES = [
  {
    name: "Crisp Alabaster Canvas",
    aVar: "--a-bg",
    role: "Primary page ground across colonhyphenbracket.pink",
  },
  {
    name: "Warm Stone Surface",
    aVar: "--a-surface",
    role: "Section bands, pedestals, and subtle elevated wells",
  },
  {
    name: "Primary Ink",
    aVar: "--a-ink",
    role: "Headlines, primary typography, and hover CTA inversion",
  },
  {
    name: "Sovereign Hot Pink",
    aVar: "--a-accent",
    role: "Marks (: - ]), strike bars, primary CTA pill fills, and hover links",
  },
  {
    name: "Signal Sky Blue",
    aVar: "--a-sky",
    role: "Process steps, technical callouts, and studio cadence",
  },
  {
    name: "Signal Emerald",
    aVar: "--a-emerald",
    role: "Verification, compliance, and regulated-system highlights",
  },
] as const;

const TYPE_SPECIMENS = [
  {
    role: "Display",
    family: PLAYFUL_PRINCIPAL_PROFILE.typography.display,
    meta: `Tracking ${PLAYFUL_PRINCIPAL_PROFILE.typography.displayTracking} · Bold / Black`,
    sample: "Scary words in. Smiles out.",
    className: "font-display font-bold text-3xl sm:text-5xl tracking-[-0.035em]",
  },
  {
    role: "Editorial Serif",
    family: PLAYFUL_PRINCIPAL_PROFILE.typography.serif,
    meta: `Line height ${PLAYFUL_PRINCIPAL_PROFILE.typography.bodyLineHeight} · Long-form & monographs`,
    sample: "Coastal engineering rigor paired with Appalachian honesty.",
    className: "font-serif text-2xl sm:text-3xl leading-[1.55]",
  },
  {
    role: "UI Sans",
    family: PLAYFUL_PRINCIPAL_PROFILE.typography.sans,
    meta: "16px+ body prose · 60–70ch measure",
    sample: "One principal designer-architect from first call to final pull request.",
    className: "font-sans text-lg sm:text-xl leading-relaxed",
  },
  {
    role: "Monospace",
    family: PLAYFUL_PRINCIPAL_PROFILE.typography.mono,
    meta: "13px minimum floor · Tokens & eyebrows",
    sample: "--a-accent: #FE299E; /* var(--chb-accent) */",
    className: "font-mono text-base sm:text-lg",
  },
] as const;

const GUARDRAILS = [
  {
    num: "01",
    title: "8pt Rhythmic Spatial Grid",
    body: "Every section rhythm, padding step, and hairline column sits on multiples of 4px / 8px.",
  },
  {
    num: "02",
    title: "13px Typographic Floor",
    body: "Nothing renders below 13px (0.8125rem)—including monospace eyebrows, badges, and footer colophons.",
  },
  {
    num: "03",
    title: "44×44px Touch Targets",
    body: "Every button, nav item, swatch control, and mobile trigger maintains at least a 44×44px hit area.",
  },
  {
    num: "04",
    title: "Reduced-Motion Editorial Easing",
    body: "All motion primitives (RiseLines, FadeUp, Smile, ScaryHeadline) respect useReducedMotion() and use EASE_EDITORIAL [0.22, 1, 0.36, 1].",
  },
] as const;

const DESIGN_CLOSE_CARDS: [CloseCardItem, CloseCardItem, CloseCardItem] = [
  {
    title: "MIT Open Source",
    body: "Accént 3.0 is completely free under the MIT license—no proprietary component lock-in.",
  },
  {
    title: "Dual-Namespace Tokens",
    body: "Upstream --a-* semantics map cleanly onto site-specific --chb-* aliases without theme drift.",
  },
  {
    title: "Yours or Ours",
    body: "Need a fresh product built on Accént, or shipping cleanly inside your existing design system? We do both.",
  },
];

export default function DesignSystemPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedHex(value);
      setTimeout(() => setCopiedHex((curr) => (curr === value ? null : curr)), 1600);
    } catch {
      // Clipboard API unavailable in restricted contexts; ignore silently.
    }
  };

  return (
    <div className="brand-canvas min-h-screen" data-testid="design-adapter-page">
      <Seo
        title="Design System & Brand Adapter | Colon Hyphen Bracket : - ]"
        description="How Colon Hyphen Bracket adapts and contributes back to Accént 3.0 (MIT)—typography, semantic tokens, motion invariants, and the 7-product punctuation palette."
        path="/design"
        image="/images/og/og-home.jpg"
      />

      {/* Hero */}
      <section className="pt-28 sm:pt-40 pb-16 sm:pb-24 border-b border-[#111827]/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#111827]/60 mb-5 flex items-center gap-2.5">
            <span className="text-[#FE299E] font-bold">: - ]</span>
            <span>Accént 3.0 · Playful-Principal Brand Adapter</span>
          </div>

          <h1 className="font-display font-bold text-mega text-[#111827]">
            <RiseLines
              immediate
              lines={[
                "One open design system.",
                <span key="voice" className="text-[#FE299E]">
                  Infinite honest voices.
                </span>,
              ]}
            />
          </h1>

          <FadeUp delay={0.25} className="mt-8 sm:mt-12 grid lg:grid-cols-12 gap-8 sm:gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-2xl leading-[1.45] text-[#111827]/80">
              This site consumes{" "}
              <a
                href="https://design.pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] font-semibold underline decoration-[#FE299E] underline-offset-4 hover:text-[#FE299E]"
              >
                Accént 3.0
              </a>{" "}
              through our{" "}
              <code className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-[#F3EEE6] border border-[#111827]/10">
                playful-principal
              </code>{" "}
              brand profile (<code className="font-mono text-[0.9em]">client/src/styles/accent.config.ts</code>) and upstreams reusable motion primitives directly back to{" "}
              <a
                href="https://github.com/rorshockbtc/accent-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] font-semibold underline underline-offset-4 hover:text-[#FE299E]"
              >
                rorshockbtc/accent-ui
              </a>
              .
            </p>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://design.pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 min-h-[44px] px-7 py-3.5 rounded-full bg-[#FE299E] hover:bg-[#111827] text-white text-base font-semibold no-underline shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)] transition-all"
                  data-testid="design-cta-spec"
                >
                  Open Accént 3.0 spec <ArrowUpRight className="w-5 h-5" />
                </a>
              </motion.div>
              <a
                href="https://github.com/rorshockbtc/accent-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3.5 rounded-full border-2 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-[#FAF8F5] text-base font-semibold no-underline transition-colors"
                data-testid="design-cta-github"
              >
                GitHub (MIT) <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Core Semantic Tokens (--a-* <-> --chb-*) */}
      <section className="py-20 sm:py-28 border-b border-[#111827]/10" data-testid="design-semantic-tokens">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#FE299E] mb-3">
                01 · Semantic Token Adapter
              </div>
              <h2 className="font-display font-bold text-huge text-[#111827]">
                Crisp Alabaster &amp; Sovereign Pink.
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#111827]/70 max-w-[42ch]">
              Upstream <code className="font-mono">--a-*</code> tokens map 1:1 onto{" "}
              <code className="font-mono">--chb-*</code> aliases in CSS. Click any swatch to copy its canonical hex.
            </p>
          </FadeUp>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {CORE_SWATCHES.map((swatch, idx) => {
              const hex = PLAYFUL_PRINCIPAL_PROFILE.tokens.light[swatch.aVar];
              const chbVar = ACCENT_TO_CHB_VARIABLE_MAP[swatch.aVar];
              const isCopied = copiedHex === hex;
              return (
                <FadeUp
                  key={swatch.aVar}
                  delay={idx * 0.05}
                  className="pt-6 border-t border-[#111827]/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="w-12 h-12 rounded-full border border-[#111827]/15 shrink-0"
                        style={{ backgroundColor: hex }}
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(hex)}
                        className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-[#111827]/15 hover:border-[#FE299E] text-[14px] font-mono font-semibold text-[#111827] bg-transparent cursor-pointer transition-colors"
                        aria-label={`Copy ${swatch.name} hex ${hex}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-[#3FA535]" /> Copied {hex}
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[#111827]/60" /> {hex}
                          </>
                        )}
                      </button>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#111827] mt-5">
                      {swatch.name}
                    </h3>
                    <p className="mt-2 text-base text-[#111827]/75 leading-relaxed">
                      {swatch.role}
                    </p>
                  </div>
                  <div className="mt-4 font-mono text-[13px] text-[#111827]/60">
                    {swatch.aVar} {chbVar ? `→ ${chbVar}` : ""}
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 Non-Repeating Product Signature Colors */}
      <section className="py-20 sm:py-28 bg-[#111827] text-[#FAF8F5]" data-testid="design-product-palette">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#FE299E] mb-3">
                02 · Seven Distinct Product Signatures
              </div>
              <h2 className="font-display font-bold text-huge text-[#FAF8F5]">
                Every mark owns its own color.
              </h2>
            </div>
            <p className="text-base sm:text-lg text-white/70 max-w-[42ch]">
              Consistent across Home, Studio, Products, and Footer—zero duplicated product signatures.
            </p>
          </FadeUp>

          <ul className="mt-12 border-b border-white/10">
            {CHB_SEVEN_PRODUCT_SLOTS.map((slot, i) => {
              const isCopied = copiedHex === slot.hex;
              return (
                <FadeUp key={slot.id} delay={i * 0.04}>
                  <li className="grid grid-cols-12 items-center gap-4 py-6 border-t border-white/10">
                    <div className="col-span-12 sm:col-span-5 lg:col-span-4 flex items-baseline gap-3.5">
                      <span
                        className="font-display text-3xl sm:text-4xl font-bold whitespace-nowrap shrink-0"
                        style={{ color: slot.hex }}
                      >
                        {slot.mark}
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-bold">
                        {slot.name}
                      </span>
                    </div>
                    <p className="col-span-12 sm:col-span-4 text-base text-white/70">
                      {slot.role}
                    </p>
                    <div className="col-span-12 sm:col-span-3 flex flex-wrap sm:justify-end items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCopy(slot.hex)}
                        className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-white/15 hover:border-white/50 text-[14px] font-mono text-white bg-transparent cursor-pointer transition-colors"
                        aria-label={`Copy ${slot.name} color ${slot.hex}`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: slot.hex }}
                          aria-hidden="true"
                        />
                        {isCopied ? "Copied!" : slot.hex}
                      </button>
                      <Link
                        href={`/products#${slot.id}`}
                        className="inline-flex items-center gap-1 min-h-[44px] px-3 text-[15px] font-semibold text-white/80 hover:text-[#FE299E] no-underline transition-colors"
                      >
                        Inspect <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </li>
                </FadeUp>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Typography & Invariants */}
      <section className="py-20 sm:py-28 bg-[#F3EEE6] border-b border-[#111827]/10" data-testid="design-typography">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#111827]/60 mb-3">
              03 · Typographic Voice &amp; Mathematical Invariants
            </div>
            <h2 className="font-display font-bold text-huge text-[#111827] max-w-4xl">
              Editorial personality up top. Rigid math underneath.
            </h2>
          </FadeUp>

          <div className="mt-12 divide-y divide-[#111827]/12 border-y border-[#111827]/12">
            {TYPE_SPECIMENS.map((spec) => (
              <div key={spec.role} className="grid lg:grid-cols-12 gap-4 lg:gap-8 py-8 items-baseline">
                <div className="lg:col-span-4">
                  <div className="font-display text-xl font-bold text-[#111827]">{spec.family}</div>
                  <div className="font-mono text-[13px] text-[#111827]/60 mt-1">
                    {spec.role} · {spec.meta}
                  </div>
                </div>
                <div className={`lg:col-span-8 text-[#111827] ${spec.className}`}>
                  {spec.sample}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {GUARDRAILS.map((g, idx) => (
              <FadeUp key={g.num} delay={idx * 0.06} className="pt-6 border-t border-[#111827]/15">
                <div className="font-mono text-[13px] font-bold text-[#FE299E]">{g.num}</div>
                <h3 className="font-display text-xl font-bold text-[#111827] mt-2">{g.title}</h3>
                <p className="mt-2.5 text-base text-[#111827]/75 leading-relaxed">{g.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Colophon */}
      <section className="py-12 border-b border-[#111827]/10" data-testid="design-colophon">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm sm:text-base text-[#111827]/75">
          <div>
            Built on{" "}
            <a
              href="https://design.pipes.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#111827] hover:text-[#FE299E] underline underline-offset-4"
            >
              Accént 3.0
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/rorshockbtc/accent-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#111827] hover:text-[#FE299E] underline underline-offset-4"
            >
              Playful-Principal Brand Adapter
            </a>{" "}
            · MIT Open Source
          </div>
          <div className="font-mono text-[13px] uppercase tracking-wider text-[#111827]/60">
            Posture: {PLAYFUL_PRINCIPAL_PROFILE.structure.posture} · CTA {PLAYFUL_PRINCIPAL_PROFILE.structure.ctaRadius}
          </div>
        </div>
      </section>

      <PageClose
        headline="Need a design system that actually ships?"
        subhead="We build custom products on Accént's open rails—or step cleanly into your existing brand and token architecture."
        cards={DESIGN_CLOSE_CARDS}
        primaryCta="Start a project"
        primaryHref="/contact"
        secondaryCta="How the studio works"
        secondaryHref="/studio"
        secondaryExternal={false}
        testId="design-close"
      />
    </div>
  );
}
