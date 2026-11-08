import { type ReactNode } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Smile } from "@/components/brand/smile";
import { FadeUp } from "@/components/brand/motion";

export interface CloseCardItem {
  title: string;
  body: string;
}

interface PageCloseProps {
  headline: ReactNode;
  subhead: ReactNode;
  cards: [CloseCardItem, CloseCardItem, CloseCardItem];
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
  testId?: string;
}

export function PageClose({
  headline,
  subhead,
  cards,
  primaryCta = "Start a project",
  primaryHref = "/contact",
  secondaryCta = "cubby@colonhyphenbracket.pink",
  secondaryHref = "mailto:cubby@colonhyphenbracket.pink",
  secondaryExternal = true,
  testId = "section-close",
}: PageCloseProps) {
  return (
    <section
      className="py-24 sm:py-32 text-center bg-[#FAF8F5] border-t border-[#111827]/10"
      data-testid={testId}
    >
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
        <FadeUp>
          <Smile className="text-[76px] sm:text-[104px]" color="#FE299E" winkEvery={3000} />
          <h2 className="font-display font-bold text-huge mt-5 sm:mt-6 text-[#111827]">
            {headline}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-4 sm:mt-5 text-lg sm:text-2xl text-[#111827]/75 max-w-[48ch] mx-auto leading-relaxed">
            {subhead}
          </p>
        </FadeUp>

        <div className="mt-8 sm:mt-12 grid sm:grid-cols-3 gap-5 text-left">
          {cards.map((card, i) => (
            <FadeUp
              key={card.title}
              delay={0.12 + i * 0.08}
              className="p-6 sm:p-7 rounded-2xl bg-[#F3EEE6] border border-[#111827]/10 flex flex-col"
            >
              <div className="font-display text-xl sm:text-2xl font-bold text-[#111827]">
                {card.title}
              </div>
              <p className="mt-2.5 text-base text-[#111827]/75 leading-relaxed flex-1">
                {card.body}
              </p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.25} className="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-4">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--a-accent-fill,#B81468)] text-white text-base sm:text-lg font-semibold no-underline shadow-sm hover:bg-[#111827] transition-colors"
            >
              {primaryCta} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {secondaryExternal ? (
            <a
              href={secondaryHref}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-full border-2 border-[#111827] text-[#111827] text-base sm:text-lg font-semibold no-underline hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors"
            >
              {secondaryCta}
            </a>
          ) : (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-[#111827] text-[#111827] text-base sm:text-lg font-semibold no-underline hover:bg-[#111827] hover:text-[#FAF8F5] transition-colors"
            >
              {secondaryCta} →
            </Link>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
