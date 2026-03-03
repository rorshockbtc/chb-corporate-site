import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import type { IStorage } from './storage';

export interface ImageUsage {
  imageId: string;
  filename: string;
  filePath: string;
  usageLocations: Array<{
    page: string;
    section: string;
    url: string;
    description?: string;
  }>;
}

export interface UsageLocation {
  page: string;
  section: string;
  url: string;
  description?: string;
}

/**
 * Scans the codebase to find hardcoded image references and map them to usage locations
 */
export async function scanImageUsage(storage: IStorage): Promise<ImageUsage[]> {
  const usage: ImageUsage[] = [];
  const images = await storage.getCreativeImages();
  
  // Define the pages/components to scan for image usage
  const scanTargets = [
    {
      file: 'client/src/pages/startup-founders-deep-dive.tsx',
      page: 'Startup Founders Deep Dive',
      url: '/startup-founders-deep-dive',
      section: 'Hero Image'
    },
    {
      file: 'client/src/pages/content-creators-deep-dive.tsx', 
      page: 'Content Creators Deep Dive',
      url: '/content-creators-deep-dive',
      section: 'Hero Image'
    },
    {
      file: 'client/src/pages/memory-capturers-deep-dive.tsx',
      page: 'Memory Capturers Deep Dive', 
      url: '/memory-capturers-deep-dive',
      section: 'Hero Image'
    },
    {
      file: 'client/src/pages/products.tsx',
      page: 'Products',
      url: '/products',
      section: 'Hero Section'
    },
    {
      file: 'client/src/pages/chb-case-study.tsx',
      page: 'CHB Case Study',
      url: '/chb-case-study', 
      section: 'Hero Section'
    },
    {
      file: 'client/src/components/hero-section.tsx',
      page: 'Homepage',
      url: '/',
      section: 'Hero Section'
    },
    {
      file: 'client/src/pages/home.tsx',
      page: 'Homepage Extended',
      url: '/',
      section: 'Multiple Sections'
    },
    {
      file: 'client/src/pages/roadmap.tsx',
      page: 'Roadmap',
      url: '/roadmap',
      section: 'Roadmap Content'
    },
    {
      file: 'client/src/pages/contact.tsx',
      page: 'Contact',
      url: '/contact',
      section: 'Contact Page'
    },
    {
      file: 'client/src/pages/image-demo.tsx',
      page: 'Image Demo',
      url: '/image-demo',
      section: 'Demo Content'
    },
    {
      file: 'client/src/pages/image-gallery.tsx',
      page: 'Image Gallery',
      url: '/image-gallery',
      section: 'Gallery Content'
    },
    {
      file: 'client/src/components/product-card.tsx',
      page: 'Product Cards',
      url: '/products',
      section: 'Product Components'
    }
  ];

  // Scan each file for image references
  for (const target of scanTargets) {
    try {
      const filePath = join(process.cwd(), target.file);
      const fileContent = readFileSync(filePath, 'utf-8');
      
      // Find image references in the file - look for both direct src attributes and usePerspectiveContent objects
      const directImageMatches = fileContent.match(/src=["']([^"']*(?:generated\/images|generated_images)\/[^"']*)["']/g) || [];
      
      // Also look for perspective content objects with image paths
      const perspectiveContentMatches = fileContent.match(/["']([^"']*(?:generated\/images|generated_images)\/[^"']*)["']/g) || [];
      
      // Combine both types of matches and remove duplicates
      const combinedMatches = [...directImageMatches, ...perspectiveContentMatches];
      const uniqueMatches = Array.from(new Set(combinedMatches));
      const imageMatches = uniqueMatches.length > 0 ? uniqueMatches : null;
      
      console.log(`🔍 Scanning ${target.file} for image references...`);
      
      if (imageMatches) {
        console.log(`📸 Found ${imageMatches.length} image reference(s) in ${target.file}`);
        for (const match of imageMatches) {
          // Extract the image path - handle both src="..." and direct "..." patterns
          let pathMatch = match.match(/src=["']([^"']*)["']/);
          if (!pathMatch) {
            pathMatch = match.match(/["']([^"']*)["']/);
          }
          if (pathMatch) {
            const imagePath = pathMatch[1];
            const filename = imagePath.split('/').pop();
            
            console.log(`🖼️ Processing image reference: ${imagePath} -> filename: ${filename}`);
            
            if (filename) {
              // Find the corresponding database image by multiple criteria
              const dbImage = images.find((img: any) => {
                // Extract just the base filename without path for comparison
                const dbFilename = img.filename || (img.filePath ? img.filePath.split('/').pop() : '');
                const componentFilename = filename;
                
                // Match by exact filename
                if (dbFilename === componentFilename) return true;
                
                // Match by filename without extension if needed
                const dbBase = dbFilename.replace(/\.[^.]*$/, '');
                const componentBase = componentFilename.replace(/\.[^.]*$/, '');
                if (dbBase === componentBase) return true;
                
                // Match by checking if the component filename is contained in the database path
                if (img.filePath && img.filePath.includes(componentFilename)) return true;
                
                // Also try matching the component path style
                const componentPathVariant = imagePath.replace('/generated/images/', '/attached_assets/generated_images/');
                if (img.filePath === componentPathVariant) return true;
                
                return false;
              });
              
              if (dbImage) {
                console.log(`🎯 Found match: ${filename} -> ${dbImage.title} (ID: ${dbImage.id})`);
                let existingUsage = usage.find(u => u.imageId === dbImage.id);
                if (!existingUsage) {
                  existingUsage = {
                    imageId: dbImage.id,
                    filename: dbImage.filename,
                    filePath: dbImage.filePath,
                    usageLocations: []
                  };
                  usage.push(existingUsage);
                }
                
                // Add usage location
                const usageLocation = {
                  page: target.page,
                  section: target.section,
                  url: target.url,
                  description: `Referenced in ${target.file}`
                };
                existingUsage.usageLocations.push(usageLocation);
                console.log(`📍 Added usage location: ${target.page} (${target.url}) for image ${dbImage.title}`);
              } else {
                console.log(`❌ No database match found for image: ${filename} (from ${imagePath})`);
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan ${target.file}:`, error);
    }
  }

  return usage;
}

/**
 * Updates the database with current image usage information
 */
export async function updateImageUsageInDatabase(storage: IStorage): Promise<void> {
  console.log("🔍 Starting usage scan...");
  const usage = await scanImageUsage(storage);
  console.log(`📊 Found ${usage.length} images with usage data`);
  
  for (const imageUsage of usage) {
    try {
      console.log(`🔄 Updating image ${imageUsage.filename} with ${imageUsage.usageLocations.length} locations:`, 
        imageUsage.usageLocations.map(loc => `${loc.page} (${loc.url})`));
      
      // Auto-promote to final version if image is in use on live site
      const updateData: any = {
        usageLocations: imageUsage.usageLocations
      };
      
      if (imageUsage.usageLocations.length > 0) {
        updateData.learningStatus = "final_version";
        console.log(`🎯 Auto-promoting ${imageUsage.filename} to 'final_version' status (in use on live site)`);
      }
      
      await storage.updateCreativeImage(imageUsage.imageId, updateData);
      
      console.log(`✅ Successfully updated usage for image ${imageUsage.filename}: ${imageUsage.usageLocations.length} locations`);
    } catch (error) {
      console.error(`❌ Failed to update usage for image ${imageUsage.imageId}:`, error);
    }
  }
  
  // Note: Demotion is disabled to prevent incorrectly downgrading legitimate final images
  // that may be used outside the scanned locations
  // await demoteUnusedImages(storage, usage);
  
  console.log("🏁 Usage scan completed");
}

/**
 * Demotes images that are no longer in use back to learning_attempt status
 */
async function demoteUnusedImages(storage: IStorage, currentUsage: ImageUsage[]): Promise<void> {
  const allImages = await storage.getCreativeImages();
  const usedImageIds = new Set(currentUsage.map(u => u.imageId));
  
  for (const image of allImages) {
    // If image was marked as final but is no longer in use, demote it
    if (image.learningStatus === "final_version" && !usedImageIds.has(image.id)) {
      try {
        await storage.updateCreativeImage(image.id, {
          learningStatus: "learning_attempt",
          usageLocations: []
        });
        console.log(`📉 Demoted ${image.title} back to 'learning_attempt' (no longer in use)`);
      } catch (error) {
        console.error(`❌ Failed to demote image ${image.id}:`, error);
      }
    }
  }
}

/**
 * Gets usage statistics for all images
 */
export async function getUsageStats(storage: IStorage): Promise<{
  totalImages: number;
  imagesInUse: number;
  unusedImages: number;
  usageByPage: Record<string, number>;
}> {
  const images = await storage.getCreativeImages();
  const totalImages = images.length;
  let imagesInUse = 0;
  const usageByPage: Record<string, number> = {};
  
  for (const image of images) {
    const locations = Array.isArray(image.usageLocations) ? image.usageLocations : [];
    if (locations.length > 0) {
      imagesInUse++;
      locations.forEach((location: any) => {
        const page = location.page || 'Unknown';
        usageByPage[page] = (usageByPage[page] || 0) + 1;
      });
    }
  }
  
  return {
    totalImages,
    imagesInUse,
    unusedImages: totalImages - imagesInUse,
    usageByPage
  };
}

/**
 * Adds a new usage location for an image
 */
export async function addImageUsage(storage: IStorage, imageId: string, usage: UsageLocation): Promise<void> {
  const image = await storage.getCreativeImage(imageId);
  if (!image) {
    throw new Error(`Image with ID ${imageId} not found`);
  }
  
  const currentUsage = Array.isArray(image.usageLocations) ? image.usageLocations : [];
  const updatedUsage = [...currentUsage, usage];
  
  await storage.updateCreativeImage(imageId, {
    usageLocations: updatedUsage
  });
}

/**
 * Removes a usage location for an image
 */
export async function removeImageUsage(storage: IStorage, imageId: string, usageIndex: number): Promise<void> {
  const image = await storage.getCreativeImage(imageId);
  if (!image) {
    throw new Error(`Image with ID ${imageId} not found`);
  }
  
  const currentUsage = Array.isArray(image.usageLocations) ? image.usageLocations : [];
  const updatedUsage = currentUsage.filter((_: any, index: number) => index !== usageIndex);
  
  await storage.updateCreativeImage(imageId, {
    usageLocations: updatedUsage
  });
}