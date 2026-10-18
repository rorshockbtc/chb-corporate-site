import type { Perspective, PerspectiveTheme } from "@/types/content";

// Canonical Warm Albers Sandstone + Massimo Vignelli Swiss Grid Theme System
// Fixes contrast bugs (--muted vs --muted-foreground) and uses high-contrast
// editorial registration accents per Perspective Pipe.

export const perspectiveThemes: Record<Perspective, PerspectiveTheme> = {
  startup_founders: {
    colors: {
      primary: "#FE299E",      // Canonical CHB Hot Pink
      secondary: "#0B5CAB",    // High-contrast Blueprint Cobalt (WCAG AA+ on #EAE0D0)
      accent: "#1B6346",       // Archival Forest Green
      background: "#EAE0D0",   // Warm Albers Sandstone
      foreground: "#281B16",   // Deep Espresso Ink (12.8:1 contrast)
      muted: "#4A3A32",        // Deep Warm Umber secondary text (8.1:1 contrast)
    },
    heroSettings: {
      overlayOpacity: 0.12,
      overlayGradient: "linear-gradient(135deg, #281B16 0%, #0B5CAB 100%)",
      brightness: 1.0,
      contrast: 1.05,
      imageStyle: 'cool',
    },
    typography: {
      headlineStyle: 'authoritative',
      bodyTone: 'professional',
      alignment: 'left',
    },
    layout: {
      spacing: 'compact',
      gridStyle: 'structured',
      containerMaxWidth: '1280px',
    },
    contentTone: {
      voice: 'authoritative',
      complexity: 'detailed',
      focus: 'features',
    },
  },

  content_creators: {
    colors: {
      primary: "#FE299E",      // Canonical CHB Hot Pink
      secondary: "#B81468",    // High-contrast Atelier Magenta (WCAG AA+ on #EAE0D0)
      accent: "#B85D19",       // Warm Ochre / Terracotta
      background: "#EAE0D0",   // Warm Albers Sandstone
      foreground: "#281B16",   // Deep Espresso Ink
      muted: "#4A3A32",        // Deep Warm Umber secondary text
    },
    heroSettings: {
      overlayOpacity: 0.12,
      overlayGradient: "linear-gradient(135deg, #281B16 0%, #B81468 100%)",
      brightness: 1.0,
      contrast: 1.05,
      imageStyle: 'warm',
    },
    typography: {
      headlineStyle: 'playful',
      bodyTone: 'friendly',
      alignment: 'left',
    },
    layout: {
      spacing: 'comfortable',
      gridStyle: 'asymmetric',
      containerMaxWidth: '1280px',
    },
    contentTone: {
      voice: 'conversational',
      complexity: 'moderate',
      focus: 'benefits',
    },
  },

  memory_capturers: {
    colors: {
      primary: "#FE299E",      // Canonical CHB Hot Pink
      secondary: "#1B6346",    // High-contrast Archival Emerald (WCAG AA+ on #EAE0D0)
      accent: "#B85D19",       // Warm Terracotta
      background: "#EAE0D0",   // Warm Albers Sandstone
      foreground: "#281B16",   // Deep Espresso Ink
      muted: "#4A3A32",        // Deep Warm Umber secondary text
    },
    heroSettings: {
      overlayOpacity: 0.12,
      overlayGradient: "linear-gradient(135deg, #281B16 0%, #1B6346 100%)",
      brightness: 1.0,
      contrast: 1.05,
      imageStyle: 'warm',
    },
    typography: {
      headlineStyle: 'elegant',
      bodyTone: 'emotional',
      alignment: 'left',
    },
    layout: {
      spacing: 'spacious',
      gridStyle: 'minimal',
      containerMaxWidth: '1280px',
    },
    contentTone: {
      voice: 'empathetic',
      complexity: 'simple',
      focus: 'emotions',
    },
  },
};

export function getThemeForPerspective(perspective: Perspective): PerspectiveTheme {
  return perspectiveThemes[perspective];
}

// Guarantees distinct surface (--muted) vs text (--muted-foreground) tokens for high contrast
export function generateThemeCSS(theme: PerspectiveTheme): Record<string, string> {
  return {
    '--primary': theme.colors.primary,
    '--primary-foreground': '#FFFFFF',
    '--secondary': theme.colors.secondary,
    '--secondary-foreground': '#FFFFFF',
    '--accent': theme.colors.accent,
    '--accent-foreground': '#FFFFFF',
    '--background': theme.colors.background,
    '--foreground': theme.colors.foreground,
    '--card': '#F2EAE0',
    '--card-foreground': '#281B16',
    '--popover': '#F2EAE0',
    '--popover-foreground': '#281B16',
    '--muted': '#E4DACB',
    '--muted-foreground': theme.colors.muted,
    '--border': '#D3C7B5',
    '--input': '#E4DACB',
    '--ring': '#FE299E',
    '--theme-hero-overlay': `${theme.heroSettings.overlayOpacity}`,
    '--theme-hero-gradient': theme.heroSettings.overlayGradient,
    '--theme-brightness': `${theme.heroSettings.brightness}`,
    '--theme-contrast': `${theme.heroSettings.contrast}`,
    '--theme-container-width': theme.layout.containerMaxWidth,
    '--theme-spacing': '3rem',
    '--theme-headline-weight': '700',
    '--theme-body-size': '1.0625rem',
  };
}

export function getImageContextForPerspective(
  perspective: Perspective,
  placement: 'hero' | 'product-card' | 'narrative-inset' | 'ambient-divider' | 'case-study-banner'
) {
  const theme = perspectiveThemes[perspective];
  const allPerspectiveTones = {
    startup_founders: 'professional' as const,
    content_creators: 'creative' as const,
    memory_capturers: 'personal' as const,
  };

  return {
    placement,
    tone: allPerspectiveTones,
    currentPerspective: perspective,
    imageStyle: theme.heroSettings.imageStyle,
    overlaySettings: {
      opacity: theme.heroSettings.overlayOpacity,
      gradient: theme.heroSettings.overlayGradient,
    },
    aspectRatio: placement === 'hero' ? '16:9' :
                 placement === 'product-card' ? '4:3' :
                 placement === 'case-study-banner' ? '21:9' : '3:2',
  };
}