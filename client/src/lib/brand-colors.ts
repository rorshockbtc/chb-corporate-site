export const BRAND_COLORS = {
  pink:   "#FE299E",
  yellow: "#FFCF00",
  green:  "#B8E986",
  blue:   "#01A9F4",
  surface: "#111111",
  textOnSurface: "#EEEEEE",

  hash:  "#4CAF50",
  semi:  "#9C27B0",
  pipes: "#FE299E",
} as const;

export type BrandColor = (typeof BRAND_COLORS)[keyof typeof BRAND_COLORS];
