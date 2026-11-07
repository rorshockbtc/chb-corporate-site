/**
 * Accént Design System (`rorshockbtc/accent-ui`) — Playful-Principal Brand Motion Primitives
 * Synchronized with upstream `src/components/accent/editorial-motion/AccentBrandMotion.tsx`.
 */
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL } from "@/lib/motion/tokens";

const EASE = EASE_EDITORIAL;

/** Line-by-line masked rise for big display type. */
export function RiseLines({
  lines,
  className = "",
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : {
            whileInView: "visible",
            viewport: { once: true, amount: 0.15 },
          })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "110%" },
              visible: reduce ? { opacity: 1 } : { y: "0%" },
            }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Soft fade-up on scroll. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Small mono eyebrow with a punctuation mark. */
export function Eyebrow({ mark, children, color = "#FE299E" }: { mark: string; children: ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#111827]/60">
      <span className="font-bold text-[15px]" style={{ color }}>{mark}</span>
      <span>{children}</span>
    </div>
  );
}
