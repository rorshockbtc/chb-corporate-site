import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Smile } from "./smile";

export const SCARY_PAIRS: { scary: string; friendly: string }[] = [
  { scary: "SOC 2 audits", friendly: "a checklist" },
  { scary: "HIPAA", friendly: "trust" },
  { scary: "Kubernetes", friendly: "uptime" },
  { scary: "AI agents", friendly: "a helper" },
  { scary: "legacy code", friendly: "calm" },
  { scary: "regulators", friendly: "easy audits" },
  { scary: "cryptography", friendly: "privacy" },
];

type Phase = "scary" | "strike" | "friendly";

/**
 * "We turn [scary thing] into [friendly thing] :-]"
 * The scary word is struck through, then the friendly outcome
 * replaces "a smile" on the following line. Loops.
 */
export function ScaryHeadline({ accent = "#FE299E" }: { accent?: string }) {
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
        setI((n) => (n + 1) % SCARY_PAIRS.length);
      }
    }, ms[phase]);
    return () => window.clearTimeout(t);
  }, [phase, reduce]);

  const pair = SCARY_PAIRS[i];
  const struck = phase !== "scary";
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <span className="block" aria-label={`We turn ${pair.scary} into ${pair.friendly}`}>
      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span className="block" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease }}>
          We turn
        </motion.span>
      </span>

      {/* Line 2: the scary thing */}
      <span className="block overflow-hidden pb-[0.08em] h-[1.02em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={pair.scary}
            className="relative inline-block whitespace-nowrap"
            initial={{ y: "100%" }}
            animate={{ y: "0%", color: struck ? "rgba(17,24,39,0.28)" : "rgba(17,24,39,1)" }}
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

      {/* Line 3: into [friendly] :-] */}
      <span className="block overflow-hidden pb-[0.08em] h-[1.02em] whitespace-nowrap">
        <motion.span className="inline-block mr-[0.24em]" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
          into
        </motion.span>
        <span className="relative inline-block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={phase === "friendly" ? pair.friendly : "smile"}
              className="inline-block"
              style={{ color: phase === "friendly" ? accent : "#111827" }}
              initial={{ y: "100%", rotate: phase === "friendly" ? -3 : 0 }}
              animate={{ y: "0%", rotate: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              {phase === "friendly" ? pair.friendly : "a smile"}
            </motion.span>
          </AnimatePresence>
        </span>{" "}
        <Smile className="hidden sm:inline-flex align-baseline text-[0.8em]" color={accent} winkEvery={phase === "friendly" ? 900 : 5000} />
      </span>
    </span>
  );
}
