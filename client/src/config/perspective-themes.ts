import type { Perspective, PerspectiveTheme } from "@/types/content";

// Accént 3.0 (design.pipes.pink) Josef Albers Chromatic Pairings + Playful Tactile Commercial Mode
// Restores distinct, warm, human perspective identities for Startup Founders, Content Creators, and Memory Capturers.

export const perspectiveThemes: Record<Perspective, PerspectiveTheme> = {
  startup_founders: {
    colors: {
      primary: "#FE299E",      // Canonical CHB Hot Pink
      secondary: "#01A9F4",    // Accént Crystalline Sky Symbol
      accent: "#02212F",       // Accént Marine Abyss Ink
      background: "#E8E2D5",   // Accént Warm Sandstone Canvas
      foreground: "#111827",   // Accént Deep Slate Ink (16.4:1 AAA)
      muted: "#374151",        // Slate Secondary Ink
    },
    heroSettings: {
      overlayOpacity: 0.08,
      overlayGradient: "linear-gradient(135deg, #D4EBF5 0%, #E8E2D5 100%)",
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
      secondary: "#B8326D",    // Accént Sovereign Pink
      accent: "#18002E",       // Accént Deep Plum Ink
      background: "#E8E2D5",   // Accént Warm Sandstone Canvas
      foreground: "#111827",   // Accént Deep Slate Ink
      muted: "#374151",        // Slate Secondary Ink
    },
    heroSettings: {
      overlayOpacity: 0.08,
      overlayGradient: "linear-gradient(135deg, #F1DBDA 0%, #E8E2D5 100%)",
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
      secondary: "#192E01",    // Accént Deep Forest Ink
      accent: "#5C9F00",       // Accént Herbal Sage Symbol
      background: "#E8E2D5",   // Accént Warm Sandstone Canvas
      foreground: "#111827",   // Accént Deep Slate Ink
      muted: "#374151",        // Slate Secondary Ink
    },
    heroSettings: {
      overlayOpacity: 0.08,
      overlayGradient: "linear-gradient(135deg, #DBECC8 0%, #FFF5C9 100%)",
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
    '--background': '#E8E2D5',
    '--foreground': '#111827',
    '--card': '#FAF8F5',
    '--card-foreground': '#111827',
    '--popover': '#FAF8F5',
    '--popover-foreground': '#111827',
    '--muted': '#DFD8C8',
    '--muted-foreground': '#374151',
    '--border': '#111827',
    '--input': '#FAF8F5',
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