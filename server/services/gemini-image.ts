// Gemini Image Generation Service
// Based on javascript_gemini blueprint integration

import * as fs from "fs";
import * as path from "path";
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ImageContext {
  type: 'hero' | 'product-card' | 'narrative-inset' | 'ambient-divider' | 'case-study-banner';
  placement: 'full-bleed' | 'card' | 'inline' | 'background' | 'banner';
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:4' | '21:9' | '9:16';
  overlay: 'none' | 'text' | 'gradient' | 'subtle';
  tone: 'cinematic' | 'minimal' | 'warm' | 'technical' | 'ambient';
  detail: 'rich' | 'moderate' | 'simple' | 'abstract';
}

export interface ImageGenerationParams {
  prompt: string;
  background?: "transparent" | "white" | "black" | "charcoal";
  complexity?: number; // 0-100 scale
  minimalism?: number; // 0-100 scale (opposite of complexity in UX)
  perspective?: "startup_founders" | "content_creators" | "memory_capturers";
  context?: ImageContext; // New contextual system
  seed?: number;
  colorPalette?: "vibrant" | "soft" | "monochrome" | "natural";
  aspectRatio?: "1:1" | "16:9" | "4:3" | "3:4" | "9:16" | "21:9";
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  imagePath?: string;
  error?: string;
  metadata: {
    generatedAt: string;
    prompt: string;
    finalPrompt: string;
    parameters: ImageGenerationParams;
  };
}

export class GeminiImageService {
  private static ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private static buildContextualPrompt(params: ImageGenerationParams): string {
    const { prompt, background, complexity, minimalism, perspective, context, colorPalette, aspectRatio } = params;
    
    let enhancedPrompt = prompt;
    
    // If context is provided, use new contextual system
    if (context) {
      return this.buildNewContextualPrompt(params);
    }
    
    // Legacy system fallback (keep existing functionality)
    // Background handling
    if (background === "transparent") {
      enhancedPrompt += ". The background must be transparent";
    } else if (background) {
      enhancedPrompt += `. ${background} background`;
    }
    
    // Complexity/Minimalism scaling (based on your legacy system)
    const actualComplexity = minimalism ? (100 - minimalism) : (complexity || 50);
    
    if (actualComplexity <= 20) {
      enhancedPrompt += ". Very minimalist style, simple composition with few elements, clean and uncluttered";
    } else if (actualComplexity <= 40) {
      enhancedPrompt += ". Minimalist style with moderate detail, focused composition";
    } else if (actualComplexity <= 60) {
      enhancedPrompt += ". Balanced complexity with moderate detail and elements";
    } else if (actualComplexity <= 80) {
      enhancedPrompt += ". Rich detail with multiple elements, complex composition";
    } else {
      enhancedPrompt += ". Very detailed and complex composition with many interconnected elements, intricate design";
    }
    
    // Color palette
    if (colorPalette === "vibrant") {
      enhancedPrompt += ", vibrant colors";
    } else if (colorPalette === "soft") {
      enhancedPrompt += ", soft pastel colors";
    } else if (colorPalette === "monochrome") {
      enhancedPrompt += ", monochromatic color scheme";
    } else if (colorPalette === "natural") {
      enhancedPrompt += ", natural earth tones";
    }
    
    // Only add perspective-specific abstract character scenes for non-transparent backgrounds
    if (background !== "transparent") {
      if (perspective === "startup_founders") {
        enhancedPrompt += ". Character scene: A whimsical Rube Goldberg contraption where geometric puzzle pieces with expressive faces connect in an endless chain reaction. Each piece has determined personality traits - tilted forward with focus, bouncing with excitement as connections spark. Floating geometric shapes orbit around the central mechanism, their movements suggesting breakthrough moments and collaborative energy. Abstract but alive with entrepreneurial spirit";
      } else if (perspective === "content_creators") {
        enhancedPrompt += ". Character scene: Playful creative spirits in the form of animated brushstrokes, musical notes, and geometric shapes that dance together in harmonious chaos. Each element has distinct personality - some shy and contemplative, others bold and expressive. They weave between floating frames and canvases, leaving trails of color and inspiration. A symphony of creative energy where every element feels alive and purposeful";
      } else if (perspective === "memory_capturers") {
        enhancedPrompt += ". Character scene: Warm, gentle character-shapes that resemble family silhouettes but abstracted into soft geometric forms. They gather in a circle, passing glowing orbs of light between them - each orb containing swirling patterns that suggest photos, stories, and memories. The character-shapes have loving, protective postures, and trails of golden light connect them across time. Conveys continuity and connection through abstract familial bonds";
      }
    }
    
    // Quality and style specifications
    enhancedPrompt += ". High quality, professional illustration";
    
    if (aspectRatio && aspectRatio !== "1:1") {
      enhancedPrompt += `, ${aspectRatio} aspect ratio`;
    }
    
    return enhancedPrompt;
  }

  private static buildNewContextualPrompt(params: ImageGenerationParams): string {
    const { prompt, background, minimalism = 50, perspective, context, colorPalette = 'vibrant' } = params;
    
    if (!context) return this.buildContextualPrompt(params);
    
    // Context-specific visual treatments
    const contextTreatments = {
      'hero': {
        composition: 'Epic wide cinematic composition with dramatic depth of field and immersive perspective',
        lighting: 'Dramatic cinematic lighting with rich atmospheric effects and dynamic shadows',
        detail: 'Ultra-rich environmental detail and immersive storytelling elements'
      },
      'product-card': {
        composition: 'Clean centered composition with balanced negative space and clear focal hierarchy',
        lighting: 'Even, professional lighting with subtle depth',
        detail: 'Simple, clear visual elements with purposeful restraint'
      },
      'narrative-inset': {
        composition: 'Intimate storytelling composition with organic flow and natural framing',
        lighting: 'Warm, inviting lighting that supports content flow',
        detail: 'Moderate contextual detail that enhances without overwhelming text'
      },
      'ambient-divider': {
        composition: 'Flowing horizontal composition with subtle movement and rhythm',
        lighting: 'Soft ambient lighting with gentle transitions',
        detail: 'Abstract, atmospheric detail for supportive background presence'
      },
      'case-study-banner': {
        composition: 'Documentary-style composition with authentic narrative focus',
        lighting: 'Natural, story-driven lighting that feels genuine',
        detail: 'Rich contextual storytelling detail that supports the narrative'
      }
    };

    // Get perspective-specific character narratives
    const perspectiveNarratives = {
      startup_founders: "Abstract geometric puzzle pieces with expressive personalities connect in endless chain reactions, creating pathways of opportunity. Each piece represents different business functions with some pieces glowing with breakthrough ideas while others lock together showing seamless collaboration.",
      content_creators: "Playful creative spirits manifest as animated brushstrokes, musical notes, and geometric shapes that dance together in harmonious creative chaos. Each element has distinct personality - some shy and contemplative, others bold and expressive, weaving between floating creative frames.",
      memory_capturers: "Warm, gentle character-shapes resembling family silhouettes abstracted into soft geometric forms. They gather in loving circles, passing glowing orbs of light containing swirling patterns that suggest photos, stories, and precious memories with trails of golden connection across time."
    };

    const treatment = contextTreatments[context.type];
    const narrative = perspectiveNarratives[perspective as keyof typeof perspectiveNarratives] || perspectiveNarratives.startup_founders;

    // Build color palette description
    const colorDescriptions = {
      vibrant: 'vibrant, energetic colors with dynamic contrasts',
      soft: 'soft, warm pastel colors with gentle transitions',
      monochrome: 'elegant monochrome palette with strategic accent colors',
      natural: 'natural earth tones with organic color harmony'
    };

    // Context-aware detail level
    let styleDesc = '';
    const contextDetail = context.detail === 'rich' ? Math.max(10, minimalism - 30) :
                         context.detail === 'simple' ? Math.min(90, minimalism + 30) : 
                         context.detail === 'abstract' ? Math.min(95, minimalism + 40) : minimalism;

    if (contextDetail <= 30) {
      styleDesc = 'Rich, layered visual style with complex detailed composition';
    } else if (contextDetail <= 70) {
      styleDesc = 'Balanced visual style with thoughtful detail and clear focus';
    } else {
      styleDesc = 'Clean, refined visual style with maximum impact through thoughtful simplicity';
    }

    // Build background (only for non-transparent)
    const backgroundDesc = background === 'transparent' ? '' : `${background} background. `;

    // Aspect ratio guidance with context awareness
    const aspectHints = {
      '16:9': context.type === 'hero' ? 'Ultra-wide cinematic framing for immersive storytelling' : 'Wide landscape framing',
      '4:3': 'Classic balanced proportions with comfortable viewing hierarchy', 
      '1:1': 'Square centered composition with equal visual weight',
      '3:4': 'Vertical portrait orientation with strong focal flow',
      '21:9': 'Ultra-wide panoramic composition for epic storytelling',
      '9:16': 'Tall vertical composition optimized for mobile viewing'
    };

    const aspectRatio = context.aspectRatio || '1:1';
    
    // Only add character narratives for non-transparent backgrounds
    const characterNarrative = background === 'transparent' ? '' : `Character narrative: ${narrative}`;
    
    return `${prompt}. ${backgroundDesc}${aspectHints[aspectRatio]}. ${treatment.composition}. ${treatment.lighting}. ${styleDesc}, ${colorDescriptions[colorPalette]}. ${characterNarrative} ${treatment.detail}. High quality, professional illustration optimized for ${context.placement} placement with ${context.tone} visual tone.`;
  }

  private static buildEnhancedPrompt(params: ImageGenerationParams): string {
    return this.buildContextualPrompt(params);
  }

  static async generateImage(params: ImageGenerationParams): Promise<ImageGenerationResult> {
    try {
      const finalPrompt = this.buildEnhancedPrompt(params);
      const timestamp = Date.now();
      const filename = `generated_${timestamp}.png`;
      
      // Ensure directory exists
      const outputDir = path.join(process.cwd(), "public", "generated", "images");
      this.ensureDirectoryExists(outputDir);
      
      const outputPath = path.join(outputDir, filename);
      const publicUrl = `/generated/images/${filename}`;

      console.log(`Generating image with Gemini: ${finalPrompt}`);

      // IMPORTANT: only gemini-2.0-flash-preview-image-generation supports image generation
      const config: any = {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      };
      
      // Add seed for reproducible results if provided
      if (params.seed !== undefined) {
        config.seed = params.seed;
      }
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation", 
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
        config,
      });

      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error("No candidates returned from Gemini");
      }

      const content = candidates[0].content;
      if (!content || !content.parts) {
        throw new Error("No content parts returned from Gemini");
      }

      let imageFound = false;
      for (const part of content.parts) {
        if (part.text) {
          console.log("Gemini response text:", part.text);
        } else if (part.inlineData && part.inlineData.data) {
          const imageData = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, imageData);
          console.log(`Image saved to ${outputPath}`);
          imageFound = true;
        }
      }

      if (!imageFound) {
        throw new Error("No image data found in Gemini response");
      }

      return {
        success: true,
        imageUrl: publicUrl,
        imagePath: outputPath,
        metadata: {
          generatedAt: new Date().toISOString(),
          prompt: params.prompt,
          finalPrompt,
          parameters: params,
        },
      };
    } catch (error) {
      console.error("Gemini image generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        metadata: {
          generatedAt: new Date().toISOString(),
          prompt: params.prompt,
          finalPrompt: this.buildEnhancedPrompt(params),
          parameters: params,
        },
      };
    }
  }

  static async validateConnection(): Promise<boolean> {
    try {
      // Simple test to check if API key works
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Test connection",
      });
      return !!response.text;
    } catch (error) {
      console.error("Gemini connection validation failed:", error);
      return false;
    }
  }
}