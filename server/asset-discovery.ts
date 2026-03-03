import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface DiscoveredAsset {
  filename: string;
  filePath: string;
  size: number;
  lastModified: Date;
  perspective: 'memory_capturers' | 'content_creators' | 'startup_founders' | 'unknown';
  category: 'products' | 'creative' | 'strategy' | 'social' | 'farmhouse' | 'game' | 'unknown';
  suggestedTitle: string;
  suggestedDescription: string;
}

// Intelligent asset discovery and categorization
export function discoverAssets(): DiscoveredAsset[] {
  const assetsDir = join(process.cwd(), 'attached_assets', 'generated_images');
  const assets: DiscoveredAsset[] = [];
  
  try {
    const files = readdirSync(assetsDir).filter(file => file.endsWith('.png'));
    
    for (const filename of files) {
      const filePath = `/attached_assets/generated_images/${filename}`;
      const fullPath = join(assetsDir, filename);
      
      try {
        const stats = statSync(fullPath);
        const asset = categorizeAsset(filename, filePath, stats);
        assets.push(asset);
      } catch (error) {
        console.warn(`Failed to stat file: ${filename}`, error);
      }
    }
  } catch (error) {
    console.error('Error discovering assets:', error);
  }
  
  return assets.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
}

function categorizeAsset(filename: string, filePath: string, stats: any): DiscoveredAsset {
  const lowerName = filename.toLowerCase();
  
  // Determine perspective
  let perspective: DiscoveredAsset['perspective'] = 'unknown';
  if (lowerName.includes('memory') || lowerName.includes('farmhouse') || lowerName.includes('family') || lowerName.includes('vintage')) {
    perspective = 'memory_capturers';
  } else if (lowerName.includes('creative') || lowerName.includes('content') || lowerName.includes('artistic')) {
    perspective = 'content_creators';
  } else if (lowerName.includes('strategic') || lowerName.includes('business') || lowerName.includes('planning')) {
    perspective = 'startup_founders';
  }
  
  // Determine category
  let category: DiscoveredAsset['category'] = 'unknown';
  if (lowerName.includes('product') || lowerName.includes('showcase')) {
    category = 'products';
  } else if (lowerName.includes('creative') || lowerName.includes('artistic') || lowerName.includes('flow')) {
    category = 'creative';
  } else if (lowerName.includes('strategic') || lowerName.includes('planning') || lowerName.includes('business')) {
    category = 'strategy';
  } else if (lowerName.includes('social') || lowerName.includes('preview') || lowerName.includes('chb_branded')) {
    category = 'social';
  } else if (lowerName.includes('farmhouse') || lowerName.includes('countryside') || lowerName.includes('postcard')) {
    category = 'farmhouse';
  } else if (lowerName.includes('game') || lowerName.includes('puzzle') || lowerName.includes('adventure')) {
    category = 'game';
  }
  
  // Generate smart title and description
  const { title, description } = generateTitleAndDescription(filename, perspective, category);
  
  return {
    filename,
    filePath,
    size: stats.size,
    lastModified: stats.mtime,
    perspective,
    category,
    suggestedTitle: title,
    suggestedDescription: description
  };
}

function generateTitleAndDescription(filename: string, perspective: string, category: string): { title: string; description: string } {
  // Remove file extension and decode filename
  const base = filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  
  // Extract hash if present (last segment after underscore)
  const parts = base.split(' ');
  const hash = parts[parts.length - 1];
  const isHash = /^[a-f0-9]{8}$/.test(hash);
  const nameWithoutHash = isHash ? parts.slice(0, -1).join(' ') : base;
  
  // Capitalize and clean up
  const title = nameWithoutHash
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Generate context-aware descriptions
  const descriptions = {
    memory_capturers: {
      farmhouse: "Warm farmhouse aesthetic designed to resonate with traditional family values and generational connection",
      products: "Family-focused product showcase emphasizing memory preservation and authentic relationships", 
      social: "Social media assets optimized for Memory Capturers perspective with nostalgic appeal",
      unknown: "Visual content designed for Memory Capturers audience prioritizing authenticity and family connection"
    },
    content_creators: {
      creative: "Artistic workspace and creative flow visualization for content creators seeking inspiration",
      strategy: "Creative strategy roadmap designed specifically for content creators and artistic professionals",
      social: "Social media assets optimized for Content Creators perspective with creative flair",
      unknown: "Visual content designed for Content Creators audience emphasizing creative expression and authentic voice"
    },
    startup_founders: {
      strategy: "Strategic business planning visualization for startup founders and entrepreneurs",
      products: "Business-focused product showcase emphasizing growth potential and market opportunity",
      game: "Game-like approach to business strategy making complex planning more accessible",
      unknown: "Visual content designed for Startup Founders perspective focusing on strategic growth and business intelligence"
    },
    unknown: {
      unknown: "Visual asset from CHB's creative development process showcasing perspective-aware design evolution"
    }
  };
  
  const perspectiveDescriptions = descriptions[perspective as keyof typeof descriptions] || descriptions.unknown;
  const description = perspectiveDescriptions[category as keyof typeof perspectiveDescriptions] || perspectiveDescriptions.unknown;
  
  return { title, description };
}