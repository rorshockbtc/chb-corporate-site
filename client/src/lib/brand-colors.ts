export const BRAND_COLORS = {
  pink:   "#FE299E",
  yellow: "#EAB308", // Canonical Pipes Solar Yellow
  green:  "#16A34A", // Canonical BANG! Emerald Green
  blue:   "#0284C7", // Canonical Greater Sky Blue
  surface: "#111111",
  textOnSurface: "#EEEEEE",

  pipes: "#EAB308", // Solar Yellow
  bang:  "#16A34A", // Emerald Green
  hash:  "#C2410C", // Burnt Terracotta / Rust
  semi:  "#FE299E", // Sovereign Pink
  greater: "#0284C7", // Sky Blue
  accent: "#E11D48", // Crimson / Ruby
  marigold: "#D97706", // Amber Gold
} as const;

export type BrandColor = (typeof BRAND_COLORS)[keyof typeof BRAND_COLORS];
