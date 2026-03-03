import { readdir } from 'fs/promises';
import { join } from 'path';
import { storage } from './storage';

export interface MassPopulationResult {
  totalFiles: number;
  existingInDb: number;
  newlyAdded: number;
  categorized: {
    final_versions: number;
    learning_attempts: number;
    happy_accidents: number;
  };
  perspectives: {
    startup_founders: number;
    content_creators: number;
    memory_capturers: number;
  };
}

export async function massPopulateImages(): Promise<MassPopulationResult> {
  const imagesDir = join(process.cwd(), '..', 'attached_assets', 'generated_images');
  
  try {
    // Get all image files
    const files = await readdir(imagesDir);
    const imageFiles = files.filter(file => 
      file.toLowerCase().match(/\.(png|jpg|jpeg|webp|gif)$/i)
    );

    // Get existing images from database
    const existingImages = await storage.getCreativeImages();
    const existingFilenames = new Set(existingImages.map(img => img.filename));

    const result: MassPopulationResult = {
      totalFiles: imageFiles.length,
      existingInDb: existingImages.length,
      newlyAdded: 0,
      categorized: {
        final_versions: 0,
        learning_attempts: 0,
        happy_accidents: 0
      },
      perspectives: {
        startup_founders: 0,
        content_creators: 0,
        memory_capturers: 0
      }
    };

    // Process each new file
    for (const filename of imageFiles) {
      if (!existingFilenames.has(filename)) {
        const metadata = generateImageMetadata(filename);
        
        // Create comprehensive session assignment logic
        const sessionId = await determineSessionFromFilename(filename);
        
        const newImage = {
          sessionId,
          filename,
          filePath: `/attached_assets/generated_images/${filename}`,
          title: metadata.title,
          description: metadata.description,
          prompt: metadata.inferredPrompt,
          perspective: metadata.perspective,
          learningStatus: metadata.learningStatus,
          rejectionReason: metadata.rejectionReason,
          correctionApproach: metadata.correctionApproach,
          complexityLevel: metadata.complexityLevel,
          downloadCount: "0"
        };

        await storage.createCreativeImage(newImage);
        result.newlyAdded++;
        (result.categorized as any)[metadata.learningStatus]++;
        (result.perspectives as any)[metadata.perspective]++;
      }
    }

    return result;
  } catch (error) {
    console.error('Mass population failed:', error);
    throw error;
  }
}

async function determineSessionFromFilename(filename: string): Promise<string> {
  // Get existing sessions from database
  const sessions = await storage.getCreativeSessions();
  
  if (sessions.length === 0) {
    throw new Error("No creative sessions found in database");
  }
  
  const lower = filename.toLowerCase();
  
  // Find sessions by journey stage
  const earlySessions = sessions.filter(s => s.journeyStage === 'early_experiments');
  const brandSessions = sessions.filter(s => s.journeyStage === 'brand_discovery');
  const masterySessions = sessions.filter(s => s.journeyStage === 'perspective_mastery');
  
  // Early experiments - basic concepts, simple ideas
  if (lower.includes('game') || lower.includes('puzzle') || lower.includes('concept') ||
      lower.includes('simple') || lower.includes('basic') || lower.includes('test') ||
      lower.includes('experiment') || lower.includes('initial')) {
    return earlySessions.length > 0 ? earlySessions[0].id : sessions[0].id;
  }
  
  // Perspective mastery - final versions, farmhouse aesthetic, branded content
  if (lower.includes('farmhouse') || lower.includes('family') || lower.includes('branded') ||
      lower.includes('chb') || lower.includes('final') || lower.includes('postcard') ||
      lower.includes('social_preview') || lower.includes('favicon') || lower.includes('mastery') ||
      lower.includes('production') || lower.includes('hero')) {
    return masterySessions.length > 0 ? masterySessions[0].id : sessions[sessions.length - 1].id;
  }
  
  // Brand discovery - everything else, the middle phase
  return brandSessions.length > 0 ? brandSessions[0].id : sessions[Math.floor(sessions.length / 2)].id;
}

function generateImageMetadata(filename: string) {
  const title = filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/_[a-f0-9]{8}$/, "") // Remove hash
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Title case
  
  const description = `Generated image: ${title.toLowerCase()}`;
  const inferredPrompt = `Create ${title.toLowerCase()} visualization`;
  
  // Determine perspective from filename
  const lower = filename.toLowerCase();
  let perspective: 'startup_founders' | 'content_creators' | 'memory_capturers';
  
  if (lower.includes('farmhouse') || lower.includes('family') || lower.includes('countryside') ||
      lower.includes('vintage') || lower.includes('traditional') || lower.includes('authentic')) {
    perspective = 'memory_capturers';
  } else if (lower.includes('creative') || lower.includes('artistic') || lower.includes('roadmap') ||
             lower.includes('content') || lower.includes('inspiration')) {
    perspective = 'content_creators';
  } else {
    perspective = 'startup_founders';
  }
  
  // Determine learning status and quality
  const quality = categorizeImageQuality(filename, title, description);
  
  return {
    title,
    description,
    inferredPrompt,
    perspective,
    complexityLevel: 'medium' as const,
    ...quality
  };
}

function categorizeImageQuality(filename: string, title: string, description: string) {
  const content = `${filename} ${title} ${description}`.toLowerCase();
  
  // ONLY mark as final if actually used on live CHB website
  // Based on actual files that exist in public/generated/images/ directory
  const actuallyLiveImages = [
    // Images confirmed to exist in public/generated/images/ and used on site
    'content_creators_roadmap_hero',
    'memory_capturers_case_study_hero',
    'memory_capturers_products_hero_clean',
    'family_sharing_memories_on_porch_e4f89057',
    'nostalgic_farmhouse_postcard_scene_ae2babcb'
  ];
  
  const isFinal = actuallyLiveImages.some(liveImage => 
    content.includes(liveImage.toLowerCase())
  );
  
  if (isFinal) {
    return {
      learningStatus: 'final_version' as const,
      rejectionReason: null,
      correctionApproach: null
    };
  }
  
  // Happy accidents - unexpected good results that led to breakthroughs
  if (content.includes('accident') || content.includes('unexpected') || content.includes('surprise') ||
      content.includes('discovery') || content.includes('breakthrough') || content.includes('serendipity')) {
    return {
      learningStatus: 'happy_accident' as const,
      rejectionReason: null,
      correctionApproach: "Recognized unexpected positive outcome and refined approach based on this discovery"
    };
  }
  
  // Determine rejection reasons based on common iteration patterns
  let rejectionReason = null;
  let correctionApproach = null;
  
  if (content.includes('postcard') || content.includes('vintage') || content.includes('farmhouse')) {
    rejectionReason = "Aesthetic direction needed refinement - exploring balance between vintage appeal and modern usability";
    correctionApproach = "Iterate on visual elements to maintain authenticity while ensuring contemporary relevance";
  } else if (content.includes('favicon') || content.includes('icon')) {
    rejectionReason = "Icon clarity and scalability concerns at different sizes";
    correctionApproach = "Simplify design elements and test visibility across multiple scales and contexts";
  } else if (content.includes('chb') || content.includes('branded')) {
    rejectionReason = "Brand expression needed stronger personality and differentiation";
    correctionApproach = "Enhance unique CHB characteristics while maintaining professional credibility";
  } else if (content.includes('social') || content.includes('preview')) {
    rejectionReason = "Social media format optimization and engagement potential";
    correctionApproach = "Adjust composition and messaging for platform-specific performance";
  } else {
    rejectionReason = "Iterative exploration to discover optimal visual direction";
    correctionApproach = "Continue experimenting with different approaches to identify resonant concepts";
  }
  
  // Most images are learning attempts - the creative process is iterative
  return {
    learningStatus: 'learning_attempt' as const,
    rejectionReason,
    correctionApproach
  };
}

// Run the mass population if this script is executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  massPopulateImages()
    .then(result => {
      console.log('Mass population completed:', JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch(error => {
      console.error('Mass population failed:', error);
      process.exit(1);
    });
}