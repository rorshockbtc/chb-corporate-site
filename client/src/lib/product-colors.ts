/**
 * Centralized Canonical Product Color Registry
 *
 * Enforces the strict 7-product non-repeating signature color palette
 * across all pages of Colon Hyphen Bracket corporate site.
 *
 * Defined in STYLES.md & accent.config.ts:
 *   - Pipes |||: Solar Yellow (#EAB308)
 *   - BANG! !: Emerald Green (#16A34A)
 *   - Hash #: Burnt Terracotta / Rust (#C2410C)
 *   - Semi ; - ]: Sovereign Pink (#FE299E)
 *   - Greater >: Sky / Cobalt Blue (#0284C7)
 *   - Accént é: Crimson / Ruby (#E11D48)
 *   - Marigold ❀: Amber Gold (#D97706)
 */

export const PRODUCT_COLORS = {
  pipes: "#EAB308",
  bang: "#16A34A",
  hash: "#C2410C",
  semi: "#FE299E",
  greater: "#0284C7",
  accent: "#E11D48",
  marigold: "#D97706",
} as const;

export type ProductId = keyof typeof PRODUCT_COLORS;

export const PRODUCT_SLOTS = [
  { id: "pipes", mark: "|||", name: "Pipes", color: PRODUCT_COLORS.pipes, role: "Solar Yellow — bright beacon of verified knowledge" },
  { id: "bang", mark: "!", name: "BANG!", color: PRODUCT_COLORS.bang, role: "Emerald Green — local execution runtime & freedom" },
  { id: "hash", mark: "#", name: "Hash", color: PRODUCT_COLORS.hash, role: "Burnt Terracotta / Rust — quiet, private writing retreat" },
  { id: "semi", mark: "; - ]", name: "Semi", color: PRODUCT_COLORS.semi, role: "Sovereign Pink — flagship Socratic editor" },
  { id: "greater", mark: ">", name: "Greater", color: PRODUCT_COLORS.greater, role: "Sky / Cobalt Blue — universal classroom in 90+ languages" },
  { id: "accent", mark: "é", name: "Accént", color: PRODUCT_COLORS.accent, role: "Crimson / Ruby — open-source typographic craft" },
  { id: "marigold", mark: "❀", name: "Marigold", color: PRODUCT_COLORS.marigold, role: "Amber Gold — local zero-knowledge civic analytics" },
] as const;
