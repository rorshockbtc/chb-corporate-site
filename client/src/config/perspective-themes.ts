import type { Perspective, PerspectiveTheme } from "@/types/content";

// Comprehensive perspective-driven theme system
// Each theme drives content, visuals, colors, and layout for total immersion

export const perspectiveThemes: Record<Perspective, PerspectiveTheme> = {
  startup_founders: {
    colors: {
      primary: "#FE299E", // BRAND PINK - never changes across perspectives
      secondary: "#01A9F4", // BRAND BLUE - correct brand quaternary
      accent: "hsl(142, 76%, 36%)", // Success green
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(222, 84%, 5%)",
      muted: "hsl(215, 14%, 34%)",
    },
    heroSettings: {
      overlayOpacity: 0.5, // Balanced for professional look
      overlayGradient: "linear-gradient(135deg, #01A9F4 0%, #0088CC 100%)",
      brightness: 1.1,
      contrast: 1.2,
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
      containerMaxWidth: '1200px',
    },
    contentTone: {
      voice: 'authoritative',
      complexity: 'detailed',
      focus: 'features',
    },
  },

  content_creators: {
    colors: {
      primary: "#FE299E", // BRAND PINK - never changes across perspectives
      secondary: "hsl(328, 85%, 70%)", // Creative magenta  
      accent: "hsl(45, 93%, 47%)", // Creative yellow
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(328, 25%, 15%)",
      muted: "hsl(320, 15%, 45%)",
    },
    heroSettings: {
      overlayOpacity: 0.45, // Slightly more vibrant
      overlayGradient: "linear-gradient(135deg, hsl(328, 85%, 70%) 0%, hsl(288, 85%, 50%) 100%)",
      brightness: 1.15,
      contrast: 1.1,
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
      containerMaxWidth: '1100px',
    },
    contentTone: {
      voice: 'conversational',
      complexity: 'moderate',
      focus: 'benefits',
    },
  },

  memory_capturers: {
    colors: {
      primary: "#FE299E", // BRAND PINK - never changes across perspectives
      secondary: "hsl(142, 76%, 36%)", // Nurturing green
      accent: "hsl(25, 95%, 53%)", // Warm orange
      background: "hsl(45, 25%, 98%)", // Warm off-white
      foreground: "hsl(142, 35%, 15%)",
      muted: "hsl(142, 15%, 40%)",
    },
    heroSettings: {
      overlayOpacity: 0.4, // Softer, more inviting
      overlayGradient: "linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(172, 76%, 26%) 100%)",
      brightness: 1.2,
      contrast: 1.0,
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
      containerMaxWidth: '1000px',
    },
    contentTone: {
      voice: 'empathetic',
      complexity: 'simple',
      focus: 'emotions',
    },
  },
};

// Helper function to get current theme
export function getThemeForPerspective(perspective: Perspective): PerspectiveTheme {
  return perspectiveThemes[perspective];
}

// Comprehensive CSS variable mapping that overrides Tailwind tokens for actual theming
export function generateThemeCSS(theme: PerspectiveTheme): Record<string, string> {
  return {
    // Override existing Tailwind color variables to make perspectives actually change the UI
    '--primary': theme.colors.primary,
    '--primary-foreground': 'hsl(0, 0%, 100%)',
    '--secondary': theme.colors.secondary, 
    '--accent': theme.colors.accent,
    '--background': theme.colors.background,
    '--foreground': theme.colors.foreground,
    '--muted': theme.colors.muted,
    '--muted-foreground': theme.colors.muted,
    
    // Additional theme-specific variables for advanced styling
    '--theme-hero-overlay': `${theme.heroSettings.overlayOpacity}`,
    '--theme-hero-gradient': theme.heroSettings.overlayGradient,
    '--theme-brightness': `${theme.heroSettings.brightness}`,
    '--theme-contrast': `${theme.heroSettings.contrast}`,
    '--theme-container-width': theme.layout.containerMaxWidth,
    '--theme-spacing': theme.layout.spacing === 'compact' ? '2rem' : 
                      theme.layout.spacing === 'comfortable' ? '3rem' : '4rem',
    '--theme-headline-weight': theme.typography.headlineStyle === 'bold' ? '700' :
                              theme.typography.headlineStyle === 'elegant' ? '300' :
                              theme.typography.headlineStyle === 'playful' ? '600' : '800',
    '--theme-body-size': theme.contentTone.complexity === 'simple' ? '1.125rem' :
                        theme.contentTone.complexity === 'moderate' ? '1rem' : '0.875rem',
  };
}

// Complete image generation context for all perspectives
export function getImageContextForPerspective(
  perspective: Perspective, 
  placement: 'hero' | 'product-card' | 'narrative-inset' | 'ambient-divider' | 'case-study-banner'
) {
  const theme = perspectiveThemes[perspective];
  
  // Complete tone mapping for all perspectives - enables multi-perspective content generation
  const allPerspectiveTones = {
    startup_founders: 'professional' as const,
    content_creators: 'creative' as const,
    memory_capturers: 'personal' as const,
  };

  return {
    placement,
    tone: allPerspectiveTones, // Full perspective coverage for comprehensive content generation
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