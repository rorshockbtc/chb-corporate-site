import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Smile } from "./smile";

export type ScaryPair = { scary: string; friendly: string };

export const HOME_SCARY_PAIRS: ScaryPair[] = [
  { scary: "SOC 2 audits", friendly: "a checklist" },
  { scary: "HIPAA", friendly: "trust" },
  { scary: "Kubernetes", friendly: "uptime" },
  { scary: "AI agents", friendly: "a helper" },
  { scary: "legacy code", friendly: "calm" },
  { scary: "regulators", friendly: "easy audits" },
  { scary: "cryptography", friendly: "privacy" },
];

export const STUDIO_SCARY_PAIRS: ScaryPair[] = [
  { scary: "four-person handoffs", friendly: "one senior human" },
  { scary: "six-month discovery", friendly: "a five-day sprint" },
  { scary: "bloated agency retainers", friendly: "shipped code" },
  { scary: "Figma-to-nowhere", friendly: "working software" },
];

export const MANIFESTO_SCARY_PAIRS: ScaryPair[] = [
  { scary: "coastal gatekeeping", friendly: "Main Street craft" },
  { scary: "unpatched WordPress", friendly: "software you own" },
  { scary: "fake AI neutrality", friendly: "honest opinions" },
  { scary: "opaque surveillance", friendly: "local-first trust" },
];

export const SCARY_PAIRS = HOME_SCARY_PAIRS;

type Phase = "scary" | "strike" | "friendly";

/**
 * "[leadIn] [scary thing] [connector] [friendly thing] : - ]"
 * The scary word is struck through, then the friendly outcome
 * replaces [fallbackWord] on the following line. Loops.
 */
export function ScaryHeadline({
  accent = "#FE299E",
  pairs = HOME_SCARY_PAIRS,
  leadIn = "We turn",
  connector = "into",
  fallbackWord = "a smile",
  inkColor = "#111827",
  struckColor = "rgba(17,24,39,0.28)",
}: {
  accent?: string;
  pairs?: ScaryPair[];
  leadIn?: string;
  connector?: string;
  fallbackWord?: string;
  inkColor?: string;
  struckColor?: string;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("scary");

  useEffect(() => {
    const ms: Record<Phase, number> = reduce
      ? { scary: 2400, strike: 10, friendly: 2600 }
      : { scary: 1700, strike: 600, friendly: 2400 };
    const t = window.setTimeout(() => {
      if (phase === "scary") setPhase("strike");
      else if (phase === "strike") setPhase("friendly");
      else {
        setPhase("scary");
        setI((n) => (n + 1) % pairs.length);
      }
    }, ms[phase]);
    return () => window.clearTimeout(t);
  }, [phase, reduce, pairs.length]);

  const pair = pairs[i % pairs.length];
  const struck = phase !== "scary";
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <span className="block" aria-label={`${leadIn} ${pair.scary} ${connector} ${pair.friendly}`}>
      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          style={{ color: inkColor }}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, ease }}
        >
          {leadIn}
        </motion.span>
      </span>

      {/* Line 2: the scary thing */}
      <span className="block overflow-hidden pb-[0.08em] min-h-[1.06em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={pair.scary}
            className="relative inline-block"
            initial={{ y: "100%" }}
            animate={{ y: "0%", color: struck ? struckColor : inkColor }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease }}
          >
            {pair.scary}
            <motion.span
              aria-hidden
              className="absolute left-[-2%] top-[52%] h-[0.085em] rounded-full"
              style={{ backgroundColor: accent }}
              initial={{ width: "0%" }}
              animate={{ width: struck ? "104%" : "0%" }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Line 3: into [friendly] : - ] */}
      <span className="block overflow-hidden pb-[0.08em] min-h-[1.06em]">
        <motion.span
          className="inline-block mr-[0.24em]"
          style={{ color: inkColor }}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        >
          {connector}
        </motion.span>
        <span className="relative inline-block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={phase === "friendly" ? pair.friendly : fallbackWord}
              className="inline-block"
              style={{ color: phase === "friendly" ? accent : inkColor }}
              initial={{ y: "100%", rotate: phase === "friendly" ? -3 : 0 }}
              animate={{ y: "0%", rotate: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              {phase === "friendly" ? pair.friendly : fallbackWord}
            </motion.span>
          </AnimatePresence>
        </span>{" "}
        <Smile className="hidden sm:inline-flex align-baseline text-[0.78em]" color={accent} winkEvery={phase === "friendly" ? 900 : 5000} />
      </span>
    </span>
  );
}
