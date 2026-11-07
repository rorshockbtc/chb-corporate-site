import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The CHB mark — ": - ]" — that occasionally winks into "; - ]".
 * Pure typography; no image assets. Spaced explicitly per brand standard.
 */
export function Smile({
  className = "",
  winkEvery = 4200,
  hoverWink = true,
  color = "currentColor",
}: {
  className?: string;
  winkEvery?: number | null;
  hoverWink?: boolean;
  color?: string;
}) {
  const reduce = useReducedMotion();
  const [wink, setWink] = useState(false);

  useEffect(() => {
    if (reduce || !winkEvery) return;
    const id = window.setInterval(() => {
      setWink(true);
      window.setTimeout(() => setWink(false), 260);
    }, winkEvery);
    return () => window.clearInterval(id);
  }, [reduce, winkEvery]);

  return (
    <span
      className={`inline-flex items-baseline font-display font-bold leading-none select-none tracking-normal ${className}`}
      style={{ color }}
      onMouseEnter={() => hoverWink && setWink(true)}
      onMouseLeave={() => hoverWink && setWink(false)}
      aria-label="colon hyphen bracket smile"
      role="img"
    >
      <span className="relative inline-block w-[0.62em] text-center">
        <motion.span
          className="absolute inset-0"
          animate={{ opacity: wink ? 0 : 1, scaleY: wink ? 0.2 : 1 }}
          transition={{ duration: 0.12 }}
        >
          :
        </motion.span>
        <motion.span
          className="absolute inset-0"
          animate={{ opacity: wink ? 1 : 0 }}
          transition={{ duration: 0.12 }}
        >
          ;
        </motion.span>
        <span className="invisible">:</span>
      </span>
      <span className="inline-block mx-[0.12em] text-center">-</span>
      <motion.span
        className="inline-block w-[0.62em] text-center origin-left"
        animate={{ rotate: wink ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
      >
        ]
      </motion.span>
    </span>
  );
}
