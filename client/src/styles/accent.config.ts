/**
 * Accént 3.0 Brand Configuration Adapter for Colon Hyphen Bracket Corporate
 * Governance Contract: /STYLES.md (Style Control Plane — distinct from operational /AGENTS.md)
 * Upstream Reference: https://github.com/rorshockbtc/accent-ui (`src/styles/themes.ts`)
 * Canonical Spec: https://design.pipes.pink
 *
 * Defines the downstream 5-Axis Brand Profile Adapter for `playful-principal` and `albers-perspectives`,
 * ensuring intentional aesthetic drift while strictly preserving Accént's mathematical invariants:
 * - 8pt rhythmic grid
 * - 13px typographic floor (even on monospace eyebrows and footers)
 * - 44×44px touch targets
 * - Sovereign Hot Pink (`#FE299E`) across primary filled CTA buttons (white text, hover `#111827`),
 *   punctuation marks (`: - ]`), `<Smile />`, and `<ScaryHeadline />`.
 * - 7 Non-Repeating Punctuation Product Signature Colors across Home, Studio, and Products.
 */

export const ACCENT_SPEC = {
  version: "3.0.0",
  designSystemUrl: "https://design.pipes.pink",
  repoUrl: "https://github.com/rorshockbtc/accent-ui",
  stylesContractPath: "/STYLES.md",
  license: "MIT",
  author: "Colon Hyphen Bracket, LLC",
} as const;

export type AccentBrandProfileId = "playful-principal" | "albers-perspectives";

export interface AccentProductColorSlot {
  id: string;
  mark: string;
  name: string;
  hex: string;
  role: string;
}

export const CHB_SEVEN_PRODUCT_SLOTS: AccentProductColorSlot[] = [
  { id: "pipes", mark: "|||", name: "Pipes", hex: "#EAB308", role: "Solar Yellow — bright beacon of verified knowledge" },
  { id: "bang", mark: "!", name: "BANG!", hex: "#16A34A", role: "Emerald Green — local execution runtime & freedom" },
  { id: "hash", mark: "#", name: "Hash", hex: "#C2410C", role: "Burnt Terracotta / Rust — quiet, private writing retreat" },
  { id: "semi", mark: "; - ]", name: "Semi", hex: "#FE299E", role: "Sovereign Pink — flagship Socratic editor" },
  { id: "greater", mark: ">", name: "Greater", hex: "#0284C7", role: "Sky / Cobalt Blue — universal classroom in 90+ languages" },
  { id: "accent", mark: "é", name: "Accént", hex: "#E11D48", role: "Crimson / Ruby — open-source typographic craft" },
  { id: "marigold", mark: "❀", name: "Marigold", hex: "#D97706", role: "Amber Gold — local zero-knowledge civic analytics" },
];

export interface AccentTypography {
  display: string;
  serif: string;
  sans: string;
  mono: string;
  displayTracking: string;
  bodyLineHeight: string;
}

export interface AccentStructure {
  ctaRadius: string;
  posture: "pedestal-hairline" | "warm-well" | "archival-spine" | "terminal-grid";
  summary: string;
}

export interface AccentCustomExtension {
  css?: string;
  rules?: string[];
  codeSnippet?: string;
}

export interface AccentBrandProfile {
  id: AccentBrandProfileId;
  name: string;
  tagline: string;
  usedBy: string;
  repoUrl: string;
  mark: string;
  typography: AccentTypography;
  structure: AccentStructure;
  productSlots?: AccentProductColorSlot[];
  customExtension?: AccentCustomExtension;
  tokens: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const PLAYFUL_PRINCIPAL_PROFILE: AccentBrandProfile = {
  id: "playful-principal",
  name: "Playful-Principal (CHB Corporate Flagship)",
  tagline: "Crisp Alabaster paper (#FAF8F5), Bricolage Grotesque display, Sovereign Hot Pink (#FE299E) rules/marks and primary pill CTAs (hover #111827).",
  usedBy: "colonhyphenbracket.pink (feat/playful-principal & main)",
  repoUrl: "https://github.com/rorshockbtc/chb-corporate-site",
  mark: ": - ]",
  typography: {
    display: "Bricolage Grotesque",
    serif: "Newsreader",
    sans: "Inter",
    mono: "JetBrains Mono",
    displayTracking: "-0.035em",
    bodyLineHeight: "1.55",
  },
  structure: {
    ctaRadius: "9999px",
    posture: "pedestal-hairline",
    summary: "De-cardified open architectural pedestals (border-l and border-t hairlines) with 9999px full-pill CTAs.",
  },
  productSlots: CHB_SEVEN_PRODUCT_SLOTS,
  customExtension: {
    css: `.accent-pedestal { border-top: 1px solid rgba(17, 24, 39, 0.15); padding-top: 1.5rem; }`,
    rules: [
      "Preserve Sovereign Hot Pink (#FE299E) on primary filled CTA buttons (hover Ink #111827), punctuation marks (: - ]), <Smile /> winks, <ScaryHeadline /> strike bars, and hover links.",
      "Do not substitute muted dark magenta or burgundy (#B81468) on filled pill CTAs.",
      "Maintain the 7 non-repeating product signature colors (Pipes #EAB308, BANG! #16A34A, Hash #C2410C, Semi #FE299E, Greater #0284C7, Accént #E11D48, Marigold #D97706).",
      "Prefer open architectural pedestals (border-l / border-t hairlines) over boxed, shadowed cards.",
    ],
  },
  tokens: {
    light: {
      "--a-bg": "#FAF8F5",
      "--a-surface": "#F3EEE6",
      "--a-card": "#F3EEE6",
      "--a-well": "#FFFFFF",
      "--a-ink": "#111827",
      "--a-muted": "#4B5563",
      "--a-rule": "rgba(17, 24, 39, 0.12)",
      "--a-accent": "#FE299E",
      "--a-accent-fill": "#FE299E",
      "--a-accent-fill-hover": "#111827",
      "--a-accent-fg": "#FFFFFF",
      "--a-accent-text": "#B81468",
      "--a-sky": "#0A9BE0",
      "--a-sky-fg": "#111827",
      "--a-sky-deep": "#0B5CAB",
      "--a-sky-deep-fg": "#FFFFFF",
      "--a-sky-surface": "#DFECEF",
      "--a-sky-ink": "#02212F",
      "--a-sky-text": "#0B5CAB",
      "--a-link": "#111827",
      "--a-emerald": "#3FA535",
      "--a-radius-cta": "9999px",
    },
    dark: {
      "--a-bg": "#0F141C",
      "--a-surface": "#18202C",
      "--a-card": "#18202C",
      "--a-well": "#222C3C",
      "--a-ink": "#FAF8F5",
      "--a-muted": "#CBD5E1",
      "--a-rule": "rgba(250, 248, 245, 0.14)",
      "--a-accent": "#FF5CB8",
      "--a-accent-fill": "#FF5CB8",
      "--a-accent-fill-hover": "#FAF8F5",
      "--a-accent-fg": "#111827",
      "--a-accent-text": "#FF7AC6",
      "--a-sky": "#38BDF8",
      "--a-sky-fg": "#111827",
      "--a-sky-deep": "#38BDF8",
      "--a-sky-deep-fg": "#111827",
      "--a-sky-surface": "#0C2536",
      "--a-sky-ink": "#E0F2FE",
      "--a-sky-text": "#38BDF8",
      "--a-link": "#FAF8F5",
      "--a-emerald": "#4ADE80",
      "--a-radius-cta": "9999px",
    },
  },
};

export const ALBERS_PERSPECTIVES_PROFILE: AccentBrandProfile = {
  id: "albers-perspectives",
  name: "Albers Sandstone (Perspectives Mode)",
  tagline: "Josef Albers Warm Sandstone (#EAE0D0), Deep Espresso Ink (#281B16), and Blueprint Cobalt / Forest accents.",
  usedBy: "colonhyphenbracket.pink (Perspectives view)",
  repoUrl: "https://github.com/rorshockbtc/chb-corporate-site",
  mark: "; - ]",
  typography: {
    display: "Newsreader",
    serif: "EB Garamond",
    sans: "Inter",
    mono: "JetBrains Mono",
    displayTracking: "-0.02em",
    bodyLineHeight: "1.65",
  },
  structure: {
    ctaRadius: "10px",
    posture: "warm-well",
    summary: "Josef Albers homages with warm sandstone wells (#F2EAE0) and 10px tactile corners.",
  },
  tokens: {
    light: {
      "--a-bg": "#EAE0D0",
      "--a-surface": "#F2EAE0",
      "--a-card": "#F2EAE0",
      "--a-well": "#FAF8F5",
      "--a-ink": "#281B16",
      "--a-muted": "#4A3A32",
      "--a-rule": "rgba(40, 27, 22, 0.16)",
      "--a-accent": "#FE299E",
      "--a-accent-fill": "#FE299E",
      "--a-accent-fill-hover": "#281B16",
      "--a-accent-fg": "#FFFFFF",
      "--a-accent-text": "#B81468",
      "--a-sky": "#0B5CAB",
      "--a-sky-fg": "#FFFFFF",
      "--a-sky-deep": "#084482",
      "--a-sky-deep-fg": "#FFFFFF",
      "--a-sky-surface": "#DFECEF",
      "--a-sky-ink": "#281B16",
      "--a-sky-text": "#0B5CAB",
      "--a-link": "#281B16",
      "--a-emerald": "#1B6346",
      "--a-radius-cta": "10px",
    },
    dark: {
      "--a-bg": "#231814",
      "--a-surface": "#2E201B",
      "--a-card": "#2E201B",
      "--a-well": "#3D2B24",
      "--a-ink": "#F2EAE0",
      "--a-muted": "#D3C7B5",
      "--a-rule": "rgba(242, 234, 224, 0.16)",
      "--a-accent": "#FF6EC7",
      "--a-accent-fill": "#FF6EC7",
      "--a-accent-fill-hover": "#F2EAE0",
      "--a-accent-fg": "#231814",
      "--a-accent-text": "#FF8CD3",
      "--a-sky": "#38BDF8",
      "--a-sky-fg": "#111827",
      "--a-sky-deep": "#38BDF8",
      "--a-sky-deep-fg": "#111827",
      "--a-sky-surface": "#3A2820",
      "--a-sky-ink": "#E0F2FE",
      "--a-sky-text": "#38BDF8",
      "--a-link": "#F2EAE0",
      "--a-emerald": "#4ADE80",
      "--a-radius-cta": "10px",
    },
  },
};

export const BRAND_PROFILES: Record<AccentBrandProfileId, AccentBrandProfile> = {
  "playful-principal": PLAYFUL_PRINCIPAL_PROFILE,
  "albers-perspectives": ALBERS_PERSPECTIVES_PROFILE,
};

/** Dual-Namespace CSS Variable Mapping: bridges Accént 3.0 `--a-*` to corporate `--chb-*` */
export const ACCENT_TO_CHB_VARIABLE_MAP: Record<string, string> = {
  "--a-bg": "--chb-bg",
  "--a-surface": "--chb-surface",
  "--a-card": "--chb-card",
  "--a-well": "--chb-well",
  "--a-ink": "--chb-ink",
  "--a-muted": "--chb-muted",
  "--a-rule": "--chb-rule",
  "--a-accent": "--chb-accent",
  "--a-accent-fill": "--chb-accent-fill",
  "--a-accent-fill-hover": "--chb-accent-fill-hover",
  "--a-accent-fg": "--chb-accent-fg",
  "--a-accent-text": "--chb-accent-text",
  "--a-sky": "--chb-sky",
  "--a-emerald": "--chb-emerald",
  "--a-radius-cta": "--chb-radius-cta",
};

/**
 * Returns a CSS string or style object mapping both `--a-*` tokens and `--chb-*` aliases
 */
export function getThemeTokens(
  profileId: AccentBrandProfileId = "playful-principal",
  mode: "light" | "dark" = "light"
): Record<string, string> {
  const profile = BRAND_PROFILES[profileId] || PLAYFUL_PRINCIPAL_PROFILE;
  const aTokens = profile.tokens[mode];
  const combined: Record<string, string> = { ...aTokens };

  for (const [aKey, chbKey] of Object.entries(ACCENT_TO_CHB_VARIABLE_MAP)) {
    if (aTokens[aKey]) {
      combined[chbKey] = aTokens[aKey];
    }
  }

  return combined;
}
