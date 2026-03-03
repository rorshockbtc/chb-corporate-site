import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePerspective } from "@/hooks/use-perspective";

interface ImageGenerationParams {
  prompt: string;
  background?: "transparent" | "white" | "black" | "charcoal";
  complexity?: number;
  minimalism?: number;
  perspective?: "startup_founders" | "content_creators" | "memory_capturers";
  colorPalette?: "vibrant" | "soft" | "monochrome" | "natural";
  aspectRatio?: "1:1" | "16:9" | "4:3" | "3:4" | "9:16";
  seed?: number;
}

interface ImageResult {
  success: boolean;
  imageUrl: string;
  metadata: {
    generatedAt: string;
    prompt: string;
    finalPrompt: string;
    parameters: ImageGenerationParams;
  };
}

export default function ImageDemo() {
  const { currentPerspective } = usePerspective();
  const { toast } = useToast();
  
  const [prompt, setPrompt] = useState("Garden of Eden with CHB geometric frame, showing creativity and technology");
  const [minimalism, setMinimalism] = useState([50]);
  const [background, setBackground] = useState<"transparent" | "white" | "black" | "charcoal">("transparent");
  const [colorPalette, setColorPalette] = useState<"vibrant" | "soft" | "monochrome" | "natural">("vibrant");
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "4:3" | "3:4" | "9:16">("16:9");
  const [seed, setSeed] = useState(42);
  // Pre-generated sample images that demonstrate perspective-switching
  const sampleImages: Record<string, ImageResult> = {
    startup_founders: {
      success: true,
      imageUrl: "/generated/images/generated_1758654231891.png",
      metadata: {
        generatedAt: "2025-09-23T19:03:56.000Z",
        prompt: "CHB company logo with punctuation symbols # ; | arranged in modern design",
        finalPrompt: "CHB company logo with punctuation symbols # ; | arranged in modern design. Professional business aesthetic, executive boardroom style, growth-focused dynamic design, venture capital presentation style",
        parameters: {
          prompt: "CHB company logo with punctuation symbols # ; | arranged in modern design",
          perspective: "startup_founders",
          seed: 100,
          background: "transparent",
          minimalism: 80,
          colorPalette: "vibrant"
        }
      }
    },
    content_creators: {
      success: true,
      imageUrl: "/generated/images/generated_1758654252144.png",
      metadata: {
        generatedAt: "2025-09-23T19:04:16.000Z",
        prompt: "CHB company logo with punctuation symbols # ; | arranged in modern design",
        finalPrompt: "CHB company logo with punctuation symbols # ; | arranged in modern design. Creative visual design aesthetic, social media optimized, engaging and shareable style, creator economy branding",
        parameters: {
          prompt: "CHB company logo with punctuation symbols # ; | arranged in modern design",
          perspective: "content_creators", 
          seed: 100,
          background: "transparent",
          minimalism: 80,
          colorPalette: "vibrant"
        }
      }
    },
    memory_capturers: {
      success: true,
      imageUrl: "/generated/images/generated_1758654264243.png", 
      metadata: {
        generatedAt: "2025-09-23T19:04:27.000Z",
        prompt: "CHB company logo with punctuation symbols # ; | arranged in modern design",
        finalPrompt: "CHB company logo with punctuation symbols # ; | arranged in modern design. Warm personal aesthetic, nostalgic and emotional resonance, family-friendly design, memory preservation style",
        parameters: {
          prompt: "CHB company logo with punctuation symbols # ; | arranged in modern design",
          perspective: "memory_capturers",
          seed: 100, 
          background: "transparent",
          minimalism: 80,
          colorPalette: "vibrant"
        }
      }
    }
  };

  const [generatedImages, setGeneratedImages] = useState<ImageResult[]>([]);

  const generateImageMutation = useMutation({
    mutationFn: async (params: ImageGenerationParams) => {
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || "Failed to generate image");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedImages(prev => [data, ...prev]);
      toast({
        title: "Image Generated Successfully!",
        description: "Your perspective-aware image has been created.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message,
      });
    },
  });

  // Show pre-generated sample for current perspective
  const handleShowSample = () => {
    const sample = sampleImages[currentPerspective];
    if (sample) {
      setGeneratedImages(prev => [sample, ...prev]);
      toast({
        title: "Sample Image Displayed!",
        description: `Showing ${currentPerspective.replace('_', ' ')} perspective example.`,
      });
    }
  };

  const getCustomerType = (perspective: string): "startup_founders" | "content_creators" | "memory_capturers" => {
    switch (perspective) {
      case "startup_founders": return "startup_founders";
      case "content_creators": return "content_creators";
      case "memory_capturers": return "memory_capturers";
      default: return "startup_founders";
    }
  };

  const getPerspectiveDescription = (perspective: string) => {
    switch (perspective) {
      case "startup_founders":
        return "Business-focused, professional aesthetic for decision makers and growth-oriented entrepreneurs";
      case "content_creators":
        return "Creative, engaging aesthetic optimized for social media and audience building";
      case "memory_capturers":
        return "Warm, personal aesthetic designed for preserving memories and family connections";
      default:
        return "Professional, accessible aesthetic suitable for business audiences";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              CHB Pipes Demo
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Perspective-Switching
              <span className="block text-primary">Image Generation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience how the same concept transforms across different customer perspectives. 
              This demonstrates the core technology that will power Pipes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls Panel */}
            <Card className="h-fit" data-testid="image-controls">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Generation Controls
                  <Badge variant="outline">{currentPerspective}</Badge>
                </CardTitle>
                <CardDescription>
                  {getPerspectiveDescription(currentPerspective)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <Label htmlFor="prompt">Image Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    data-testid="input-prompt"
                  />
                </div>

                {/* Minimalism Slider */}
                <div className="space-y-3">
                  <Label>Minimalism Level: {minimalism[0]}%</Label>
                  <div className="px-3">
                    <Slider
                      value={minimalism}
                      onValueChange={setMinimalism}
                      max={100}
                      step={10}
                      className="w-full"
                      data-testid="slider-minimalism"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Hungry Caterpillar</span>
                      <span>Where's Waldo</span>
                    </div>
                  </div>
                </div>

                {/* Background Selection */}
                <div className="space-y-2">
                  <Label>Background</Label>
                  <Select value={background} onValueChange={setBackground as any}>
                    <SelectTrigger data-testid="select-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transparent">Transparent</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="charcoal">Charcoal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Palette */}
                <div className="space-y-2">
                  <Label>Color Palette</Label>
                  <Select value={colorPalette} onValueChange={setColorPalette as any}>
                    <SelectTrigger data-testid="select-palette">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vibrant">Vibrant Colors</SelectItem>
                      <SelectItem value="soft">Soft Pastels</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="natural">Natural Tones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <Label>Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio as any}>
                    <SelectTrigger data-testid="select-ratio">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">Square (1:1)</SelectItem>
                      <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                      <SelectItem value="4:3">Standard (4:3)</SelectItem>
                      <SelectItem value="3:4">Portrait (3:4)</SelectItem>
                      <SelectItem value="9:16">Mobile (9:16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seed Input */}
                <div className="space-y-2">
                  <Label htmlFor="seed">Seed (for reproducible results)</Label>
                  <Input
                    id="seed"
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(parseInt(e.target.value) || 42)}
                    placeholder="42"
                    data-testid="input-seed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Same seed + same prompt = same image
                  </p>
                </div>

                {/* Show Sample Button - Cost Protection */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleShowSample}
                    className="w-full"
                    size="lg"
                    data-testid="button-show-sample"
                  >
                    Show {currentPerspective.replace('_', ' ')} Sample
                  </Button>
                  <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
                    <strong>💰 Cost Protection:</strong> Live generation disabled to prevent expensive API usage. 
                    This demo shows pre-generated samples that demonstrate the perspective-switching technology.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Images</CardTitle>
                  <CardDescription>
                    Images adapt their style based on the selected perspective
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedImages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No images generated yet</p>
                      <p className="text-sm mt-2">Use the controls to generate your first perspective-aware image</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {generatedImages.map((result, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <img
                            src={result.imageUrl}
                            alt={result.metadata.prompt}
                            className="w-full h-auto"
                            data-testid={`image-result-${index}`}
                          />
                          <div className="p-4 bg-muted/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {result.metadata.parameters.perspective}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Minimalism: {result.metadata.parameters.minimalism}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {result.metadata.parameters.colorPalette}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {result.metadata.prompt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}