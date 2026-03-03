export type Perspective = "startup_founders" | "content_creators" | "memory_capturers";

export interface PerspectiveContent {
  [key: string]: string;
}

export interface ContentSection {
  id: string;
  title: string;
  content: Record<Perspective, string>;
}

export interface Product {
  id: string;
  name: string;
  symbol: string;
  color: string;
  url?: string;
  description: Record<Perspective, string>;
  features: Record<Perspective, string[]>;
}

// Image context for perspective-driven imagery
export interface ImageContext {
  placement: 'hero' | 'product-card' | 'narrative-inset' | 'ambient-divider' | 'case-study-banner';
  tone: Record<Perspective, 'inspirational' | 'technical' | 'personal' | 'professional' | 'creative'>;
  aspectRatio: string;
  overlaySettings?: {
    opacity: number;
    gradient: string;
  };
}

export interface ContentGenerationRequest {
  contentKey: string;
  perspective: Perspective;
  prompt: string;
  context?: Record<string, any>;
}

export interface ContentGenerationResponse {
  content: string;
  cached: boolean;
  success: boolean;
  requestId?: string;
  error?: string;
}

// Comprehensive perspective theme system
export interface PerspectiveTheme {
  // Visual identity
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
  
  // Hero and imagery settings
  heroSettings: {
    overlayOpacity: number; // 0.4-0.6 for proper visibility
    overlayGradient: string;
    brightness: number;
    contrast: number;
    imageStyle: 'warm' | 'cool' | 'neutral' | 'dramatic';
  };
  
  // Typography preferences
  typography: {
    headlineStyle: 'bold' | 'elegant' | 'playful' | 'authoritative';
    bodyTone: 'professional' | 'friendly' | 'technical' | 'emotional';
    alignment: 'left' | 'center' | 'justified';
  };
  
  // Layout modifiers
  layout: {
    spacing: 'compact' | 'comfortable' | 'spacious';
    gridStyle: 'structured' | 'asymmetric' | 'minimal';
    containerMaxWidth: string;
  };
  
  // Content generation preferences
  contentTone: {
    voice: 'authoritative' | 'conversational' | 'empathetic';
    complexity: 'simple' | 'moderate' | 'detailed';
    focus: 'benefits' | 'features' | 'emotions';
  };
}
