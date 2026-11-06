/**
 * Accént Motion 1.0 — Canonical Motion Tokens & Choreography Presets
 * Colon Hyphen Bracket (:-]) • AXA Design System
 */

export const DURATION = {
  fast: 0.12,
  base: 0.2,
  slow: 0.32,
} as const;

export const DURATION_MS = {
  fast: 120,
  base: 200,
  slow: 320,
} as const;

export const EASE_ACCENT: readonly [number, number, number, number] = [0.16, 1, 0.3, 1] as const;
export const EASE_ACCENT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)" as const;

/**
 * Accént Editorial Easing (Tier 2 Showcase) — slow, soft settle inspired by Chicuinaco.
 * Used for glamorous landing page hero text reveals, image curtains, and section entries.
 */
export const EASE_EDITORIAL: readonly [number, number, number, number] = [0.22, 1, 0.36, 1] as const;
export const EASE_EDITORIAL_CSS = "cubic-bezier(0.22, 1, 0.36, 1)" as const;

export const EDITORIAL_DURATION = {
  staggerWord: 0.035,
  staggerCard: 0.08,
  fadeIn: 0.65,
  reveal: 0.85,
} as const;

/**
 * Shared spring physics used strictly for `layoutId` active indicators
 * (perspective lens, product tab, nav indicator) and interactive drag.
 */
export const SPRING_LAYOUT = {
  type: "spring" as const,
  stiffness: 400,
  damping: 34,
};

/**
 * 120ms micro-feedback press scale for interactive buttons and chips.
 */
export const TAP = {
  scale: 0.97,
} as const;

/**
 * Subtle 14px rise + opacity reveal for commercial surfaces.
 */
export const RISE = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_ACCENT,
    },
  },
} as const;

/**
 * Card hover micro-interaction preset (GPU-safe transform).
 */
export const CARD_HOVER = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE_ACCENT },
} as const;

export const CARD_TAP = {
  scale: 0.985,
  transition: { duration: DURATION.fast, ease: EASE_ACCENT },
} as const;

export const STAGGER_CONTAINER = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
} as const;
