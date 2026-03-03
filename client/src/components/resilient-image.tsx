import { useState } from "react";
import { ImageOff, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CreativeImage } from "@shared/schema";

interface ResilientImageProps {
  image: CreativeImage;
  onDownload?: (image: CreativeImage) => void;
  showMetadata?: boolean;
  className?: string;
}

export function ResilientImage({ 
  image, 
  onDownload, 
  showMetadata = false, 
  className = "" 
}: ResilientImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Failed to load image: ${image.filename} at ${image.filePath}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const formatLearningStatus = (status: string) => {
    const statuses = {
      final_version: "Final Version",
      learning_attempt: "Learning Attempt", 
      happy_accident: "Happy Accident"
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "final_version": return "default" as const;
      case "happy_accident": return "secondary" as const;
      case "learning_attempt": return "outline" as const;
      default: return "outline" as const;
    }
  };

  if (imageError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-muted rounded-lg p-8 text-center ${className}`}>
        <ImageOff className="h-12 w-12 text-muted-foreground mb-4" />
        <h4 className="font-medium text-sm mb-2">{image.title}</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Image temporarily unavailable
        </p>
        {showMetadata && (
          <div className="space-y-2">
            <Badge variant={getStatusVariant(image.learningStatus)}>
              {formatLearningStatus(image.learningStatus)}
            </Badge>
            {onDownload && (
              <button
                onClick={() => onDownload(image)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download className="h-3 w-3" />
                Try Download
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
        )}
        <img
          src={image.filePath}
          alt={image.title}
          className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          style={{ objectFit: 'cover' }}
        />
        
        {/* Overlay with metadata */}
        {showMetadata && imageLoaded && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
            <div>
              <h4 className="font-medium text-white text-sm mb-1">{image.title}</h4>
              <p className="text-white/80 text-xs line-clamp-3">{image.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant={getStatusVariant(image.learningStatus)} className="text-xs">
                {formatLearningStatus(image.learningStatus)}
              </Badge>
              
              {onDownload && (
                <button
                  onClick={() => onDownload(image)}
                  className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-xs"
                >
                  <Download className="h-3 w-3" />
                  {image.downloadCount || 0}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom metadata for non-overlay mode */}
      {showMetadata && !imageLoaded && (
        <div className="mt-3 space-y-2">
          <h4 className="font-medium text-sm">{image.title}</h4>
          <div className="flex items-center justify-between">
            <Badge variant={getStatusVariant(image.learningStatus)} className="text-xs">
              {formatLearningStatus(image.learningStatus)}
            </Badge>
            {onDownload && (
              <button
                onClick={() => onDownload(image)}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                <Download className="h-3 w-3" />
                {image.downloadCount || 0}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}