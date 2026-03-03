import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, Calendar } from "lucide-react";
import { Link } from "wouter";

// Image metadata from generation
const generatedImages = [
  {
    filename: "generated_1758657715661.png",
    url: "/generated/images/generated_1758657715661.png",
    timestamp: "2025-09-23T20:01:59.804Z",
    prompt: "CHB corporate website development showing perspective-switching technology in action, modern web development environment with multiple screens displaying different user perspectives",
    perspective: "startup_founders",
    parameters: {
      minimalism: 30,
      colorPalette: "vibrant",
      aspectRatio: "16:9"
    },
    description: "Business-focused hero image with executive boardroom style and growth-oriented design"
  },
  {
    filename: "generated_1758657720024.png", 
    url: "/generated/images/generated_1758657720024.png",
    timestamp: "2025-09-23T20:02:04.998Z",
    prompt: "CHB corporate website development showing perspective-switching technology in action, creative design environment with artistic elements and visual creativity",
    perspective: "content_creators",
    parameters: {
      minimalism: 40,
      colorPalette: "soft",
      aspectRatio: "16:9"
    },
    description: "Creative-focused hero image with artistic design elements and creator economy branding"
  },
  {
    filename: "generated_1758657725220.png",
    url: "/generated/images/generated_1758657725220.png", 
    timestamp: "2025-09-23T20:02:09.450Z",
    prompt: "CHB corporate website development showing perspective-switching technology in action, family-centered technology environment with warm, traditional values",
    perspective: "memory_capturers",
    parameters: {
      minimalism: 50,
      colorPalette: "natural",
      aspectRatio: "16:9"
    },
    description: "Family-focused hero image with warm personal aesthetic and memory preservation style"
  }
];

// Get all images from the directory (including older ones)
const allImages = [
  ...generatedImages,
  // Add older images without full metadata
  {
    filename: "generated_1758652556169.png",
    url: "/generated/images/generated_1758652556169.png",
    timestamp: "Unknown",
    prompt: "Earlier generated image",
    perspective: "Unknown",
    parameters: {},
    description: "Legacy generated image"
  }
  // Add more as needed...
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getPerspectiveBadge = (perspective: string) => {
    const variants = {
      startup_founders: "default",
      content_creators: "secondary", 
      memory_capturers: "outline"
    } as const;
    
    const labels = {
      startup_founders: "Startup Founders",
      content_creators: "Content Creators",
      memory_capturers: "Memory Capturers",
      Unknown: "Unknown"
    } as const;

    return (
      <Badge variant={variants[perspective as keyof typeof variants] || "outline"}>
        {labels[perspective as keyof typeof labels] || perspective}
      </Badge>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    if (timestamp === "Unknown") return "Unknown";
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/products" data-testid="back-to-products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Generated Images Gallery</h1>
              <p className="text-sm text-muted-foreground">
                Review all perspective-aware images created for CHB corporate website
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current CHB Case Study Images */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">CHB Case Study Hero Images</h2>
            <p className="text-muted-foreground">
              These images dynamically switch on the CHB case study page based on visitor perspective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((image) => (
              <Card key={image.filename} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(image.url)}
                    data-testid={`image-${image.perspective}`}
                  />
                  <div className="absolute top-2 right-2">
                    {getPerspectiveBadge(image.perspective)}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{image.description}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {formatTimestamp(image.timestamp)}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <strong>Prompt:</strong> {image.prompt}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(image.parameters).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          {key}: {String(value)}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedImage(image.url)}>
                        <Eye className="mr-1 h-3 w-3" />
                        View Full
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={image.url} download={image.filename}>
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedImage}
              alt="Full size view"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 bg-background/90"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Debug Info */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Generated Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{generatedImages.length}</div>
                <p className="text-xs text-muted-foreground">Active CHB case study images</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Image URLs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs font-mono">
                  {generatedImages.map(img => (
                    <div key={img.filename} className="truncate">
                      {img.url}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Test Image Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {generatedImages.map(img => (
                    <a 
                      key={img.filename}
                      href={img.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-xs text-blue-600 hover:text-blue-800 truncate"
                    >
                      {img.filename}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}