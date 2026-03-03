import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface AssetManifest {
  filename: string;
  filePath: string;
  size: number;
  lastModified: Date;
  checksum: string;
  exists: boolean;
}

// Generate manifest of all available assets
export async function generateAssetManifest(): Promise<AssetManifest[]> {
  const assetsDir = join(process.cwd(), 'attached_assets', 'generated_images');
  const manifest: AssetManifest[] = [];
  
  try {
    const files = readdirSync(assetsDir).filter(file => file.endsWith('.png'));
    
    for (const filename of files) {
      const filePath = `/attached_assets/generated_images/${filename}`;
      const fullPath = join(assetsDir, filename);
      
      try {
        const stats = statSync(fullPath);
        manifest.push({
          filename,
          filePath,
          size: stats.size,
          lastModified: stats.mtime,
          checksum: `${stats.size}_${stats.mtime.getTime()}`, // Simple checksum
          exists: true
        });
      } catch (error) {
        manifest.push({
          filename,
          filePath,
          size: 0,
          lastModified: new Date(),
          checksum: '',
          exists: false
        });
      }
    }
  } catch (error) {
    console.error('Error generating asset manifest:', error);
  }
  
  return manifest.sort((a, b) => a.filename.localeCompare(b.filename));
}

// Validate that database images have corresponding files
export async function validateDatabaseAssets(dbImages: { filename: string; filePath: string }[]): Promise<{
  valid: { filename: string; filePath: string }[];
  invalid: { filename: string; filePath: string; reason: string }[];
}> {
  const manifest = await generateAssetManifest();
  const validFiles = new Set(manifest.filter(m => m.exists).map(m => m.filename));
  
  const valid: { filename: string; filePath: string }[] = [];
  const invalid: { filename: string; filePath: string; reason: string }[] = [];
  
  for (const dbImage of dbImages) {
    if (validFiles.has(dbImage.filename)) {
      valid.push(dbImage);
    } else {
      invalid.push({
        ...dbImage,
        reason: `File not found: ${dbImage.filename}`
      });
    }
  }
  
  return { valid, invalid };
}

// Auto-repair database by updating with correct filenames
export function findBestMatch(brokenFilename: string, availableFiles: string[]): string | null {
  // Remove file extension for matching
  const brokenBase = brokenFilename.replace(/\.[^/.]+$/, '').toLowerCase();
  
  // Find exact matches first
  const exactMatch = availableFiles.find(file => 
    file.toLowerCase().replace(/\.[^/.]+$/, '') === brokenBase
  );
  if (exactMatch) return exactMatch;
  
  // Find partial matches based on key terms
  const keywords = brokenBase.split(/[_-]/);
  const matches = availableFiles.filter(file => {
    const fileLower = file.toLowerCase();
    return keywords.some(keyword => keyword.length > 3 && fileLower.includes(keyword));
  });
  
  return matches.length > 0 ? matches[0] : null;
}