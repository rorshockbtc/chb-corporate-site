import { useEffect, useMemo, useRef } from 'react';
import { usePerspective } from './use-perspective';
import { 
  perspectiveThemes, 
  getThemeForPerspective, 
  generateThemeCSS,
  getImageContextForPerspective 
} from '@/config/perspective-themes';
import type { PerspectiveTheme, ImageContext } from '@/types/content';

/**
 * Hook to access the current perspective's comprehensive theme
 * Drives colors, imagery, layout, typography, and content tone
 */
export function usePerspectiveTheme() {
  const { currentPerspective, isTransitioning } = usePerspective();
  const lastAppliedTheme = useRef<string | null>(null);
  const isTransitionClassApplied = useRef(false);

  const theme = useMemo(() => {
    return getThemeForPerspective(currentPerspective);
  }, [currentPerspective]);

  // Memoized CSS variables to prevent redundant calculations
  const cssVariables = useMemo(() => {
    const baseVars = generateThemeCSS(theme);
    
    // Add perspective-specific variables
    const perspectiveVars = {
      '--perspective-primary': theme.colors.secondary, // Use secondary color as perspective primary
      '--perspective-accent': theme.colors.accent,
      '--perspective-text': theme.colors.foreground,
      '--perspective-muted': theme.colors.muted,
    };
    
    return { ...baseVars, ...perspectiveVars };
  }, [theme]);

  // Apply CSS variables and data-perspective attribute to document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Only apply if theme actually changed
    if (lastAppliedTheme.current === currentPerspective) return;
    
    // Set data-perspective attribute for CSS selectors
    root.setAttribute('data-perspective', currentPerspective);
    
    // Set CSS custom properties efficiently
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Add transition class only once
    if (!isTransitionClassApplied.current) {
      root.classList.add('theme-transition');
      isTransitionClassApplied.current = true;
    }
    
    lastAppliedTheme.current = currentPerspective;
  }, [currentPerspective, cssVariables]);
  
  // Cleanup on unmount (not on every render)
  useEffect(() => {
    return () => {
      if (isTransitionClassApplied.current) {
        document.documentElement.classList.remove('theme-transition');
        isTransitionClassApplied.current = false;
      }
    };
  }, []);

  return {
    theme,
    currentPerspective,
    isTransitioning,
    
    // Helper functions for theme-aware components
    getImageContext: (placement: ImageContext['placement']) => 
      getImageContextForPerspective(currentPerspective, placement),
      
    getThemeColor: (colorKey: keyof PerspectiveTheme['colors']) => 
      theme.colors[colorKey],
      
    getHeroSettings: () => theme.heroSettings,
    
    getLayoutSettings: () => theme.layout,
    
    getTypographySettings: () => theme.typography,
    
    getContentTone: () => theme.contentTone,
  };
}

/**
 * Hook for perspective-aware styling classes
 * Returns dynamic classes that respond to CSS variables for true reactivity
 */
export function usePerspectiveStyles() {
  const { theme, currentPerspective } = usePerspectiveTheme();

  const styles = useMemo(() => {
    return {
      // Dynamic container using CSS variable
      container: 'theme-container mx-auto px-6 lg:px-8',
      
      // Responsive spacing using CSS variables
      sectionSpacing: 'space-y-[var(--theme-spacing)]',
      
      // Dynamic typography using CSS variables
      heroHeadline: `text-4xl lg:text-6xl font-[var(--theme-headline-weight)] tracking-tight text-left`,
      
      bodyText: `text-[var(--theme-body-size)] text-left text-muted-foreground`,
      
      // Hero overlay with dynamic gradient and opacity
      heroOverlay: 'hero-image-overlay absolute inset-0',
      
      // Fully reactive accent classes using CSS variables
      accentButton: `bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white transition-colors duration-300`,
      
      accentBorder: `border-[var(--theme-accent)] transition-colors duration-300`,
      
      // Theme-aware background and text colors
      themeBackground: `bg-[var(--theme-background)] transition-colors duration-300`,
      
      themeForeground: `text-[var(--theme-foreground)] transition-colors duration-300`,
      
      themeMuted: `text-[var(--theme-muted)] transition-colors duration-300`,
      
      // Perspective-specific card styling
      themeCard: `bg-[var(--theme-background)] border-[var(--theme-muted)] hover:border-[var(--theme-primary)] transition-all duration-300`,
    };
  }, [currentPerspective]); // Only depend on perspective, not full theme object

  return styles;
}

/**
 * Hook for theme-aware image generation prompts
 * Enhances image prompts with perspective-specific styling cues
 */
export function usePerspectiveImagePrompt() {
  const { theme, currentPerspective } = usePerspectiveTheme();

  const enhanceImagePrompt = (basePrompt: string, placement: ImageContext['placement']) => {
    const styleKeywords = {
      startup_founders: 'professional, corporate, clean lines, modern office, technology, business setting',
      content_creators: 'vibrant, creative workspace, artistic, colorful, inspiring, dynamic lighting',
      memory_capturers: 'warm, family-oriented, nostalgic, cozy, personal, emotional connection',
    };

    const placementKeywords = {
      hero: 'cinematic, dramatic lighting, wide angle, immersive',
      'product-card': 'clean, focused, well-lit, commercial photography',
      'narrative-inset': 'storytelling, contextual, supporting narrative',
      'ambient-divider': 'abstract, atmospheric, subtle, background element',
      'case-study-banner': 'professional, showcase, detailed, informative',
    };

    return `${basePrompt}, ${styleKeywords[currentPerspective]}, ${placementKeywords[placement]}, ${theme.heroSettings.imageStyle} tones`;
  };

  return {
    enhanceImagePrompt,
    currentImageStyle: theme.heroSettings.imageStyle,
    perspectiveKeywords: {
      startup_founders: 'professional, corporate, technology',
      content_creators: 'creative, vibrant, artistic', 
      memory_capturers: 'warm, family, nostalgic',
    }[currentPerspective],
  };
}