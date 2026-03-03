import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  ArrowLeft, Download, Edit, FileImage, 
  Sparkles, Eye, Globe, Info, ExternalLink, ChevronLeft, ChevronRight
} from "lucide-react";
import type { CreativeImage, LearningStatus, CreativePerspective } from "@shared/schema";
import { ImageMetadataEditor } from "@/components/ImageMetadataEditor";

export default function ImageDetail() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/image-detail/:id");
  const imageId = params?.id;

  // Fetch image data
  const { data: imageData, isLoading } = useQuery({
    queryKey: ["/api/creative/images", imageId],
    enabled: !!imageId,
  });

  const image = (imageData as any)?.image as CreativeImage;

  // Fetch all images for navigation
  const { data: allImagesData } = useQuery({
    queryKey: ["/api/creative/images"],
  });

  const allImages = (allImagesData as any)?.images || [];

  // Calculate next/previous IDs
  const currentIndex = allImages.findIndex((img: CreativeImage) => img.id === imageId);
  const previousImage = currentIndex > 0 ? allImages[currentIndex - 1] : null;
  const nextImage = currentIndex < allImages.length - 1 ? allImages[currentIndex + 1] : null;

  // State for editing
  const [isEditing, setIsEditing] = useState(false);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<CreativeImage>) => {
      return apiRequest("PATCH", `/api/creative/images/${imageId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images", imageId] });
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images"] });
      setIsEditing(false);
      toast({ title: "Image updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update image", variant: "destructive" });
    },
  });

  const handleDownload = async () => {
    if (!image) return;
    
    try {
      // Increment download counter
      await fetch(`/api/creative/images/${image.id}/download`, { method: "POST" });
      
      // Invalidate queries to refresh download counts
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images", imageId] });
      
      // Create download link
      const link = document.createElement("a");
      link.href = image.filePath;
      link.download = image.filename;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      toast({ title: "Download failed", variant: "destructive" });
    }
  };

  const formatLearningStatus = (status: LearningStatus) => {
    const statuses = {
      final_version: "Final Version",
      learning_attempt: "Learning Attempt",
      happy_accident: "Happy Accident"
    };
    return statuses[status];
  };

  const formatPerspective = (perspective: CreativePerspective) => {
    const perspectives = {
      startup_founders: "Startup Founders",
      content_creators: "Content Creators",
      memory_capturers: "Memory Capturers"
    };
    return perspectives[perspective];
  };

  const getStatusColor = (status: LearningStatus) => {
    switch (status) {
      case "final_version": return "bg-green-100 text-green-800 border-green-200";
      case "learning_attempt": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "happy_accident": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUsageLocations = () => {
    if (!image?.usageLocations) return [];
    try {
      return Array.isArray(image.usageLocations) ? image.usageLocations : JSON.parse(image.usageLocations as string);
    } catch {
      return [];
    }
  };

  const getTags = () => {
    if (!image?.tags) return [];
    try {
      return Array.isArray(image.tags) ? image.tags : JSON.parse(image.tags as string);
    } catch {
      return [];
    }
  };

  if (!match || !imageId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Image Not Found</h1>
          <Link href="/creative-process">
            <Button>Return to Creative Process</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎨</div>
          <p className="text-muted-foreground">Loading image details...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Image Not Found</h1>
          <Link href="/creative-process">
            <Button>Return to Creative Process</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/creative-process">
                <Button variant="ghost" size="sm" className="gap-2" data-testid="back-button">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Gallery
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{image.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Creative Asset Details & Transparency
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Previous/Next Navigation */}
              <div className="flex items-center gap-1 mr-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => previousImage && setLocation(`/image-detail/${previousImage.id}`)}
                  disabled={!previousImage}
                  className="gap-1"
                  data-testid="previous-image"
                  title={previousImage ? `Previous: ${previousImage.title}` : "No previous image"}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => nextImage && setLocation(`/image-detail/${nextImage.id}`)}
                  disabled={!nextImage}
                  className="gap-1"
                  data-testid="next-image"
                  title={nextImage ? `Next: ${nextImage.title}` : "No next image"}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Badge className={getStatusColor(image.learningStatus as LearningStatus)}>
                {formatLearningStatus(image.learningStatus as LearningStatus)}
              </Badge>
              <Badge variant="outline">
                {formatPerspective(image.perspective as CreativePerspective)}
              </Badge>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2"
                data-testid="edit-toggle"
              >
                <Edit className="h-4 w-4" />
                {isEditing ? "Cancel Edit" : "Edit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image and Actions */}
          <div className="space-y-6">
            {/* Main Image */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video relative bg-muted rounded-lg overflow-hidden mb-4">
                  <img
                    src={image.filePath}
                    alt={image.description}
                    className="w-full h-full object-cover"
                    data-testid="main-image"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" className="bg-black/80 text-white cursor-help">
                            {image.complexityLevel}/5 Complexity
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <p className="text-sm">
                            <strong>Minimalism to Complexity Scale</strong><br />
                            1 = Very simple, clean (Hungry Caterpillar style)<br />
                            5 = Highly detailed, busy (Where's Waldo style)<br />
                            This measures visual density and detail level.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleDownload} className="gap-2" data-testid="download-button">
                    <Download className="h-4 w-4" />
                    Download Full Resolution
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    {image.downloadCount || 0} Downloads
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <FileImage className="h-4 w-4" />
                    {image.filename}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Licensing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Licensing & Usage Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {image.licensing || "Creative Commons CC0"}
                  </h4>
                  <p className="text-green-700 text-sm">
                    This image is freely available for use, modification, and distribution.
                    No attribution required, but appreciated.
                  </p>
                </div>
                
                {/* Usage Locations and Story Tags */}
                {(() => {
                  const usageArray = getUsageLocations();
                  const usageObjects = usageArray.filter((item: any) => typeof item === 'object' && item !== null);
                  const storyTags = usageArray.filter((item: any) => typeof item === 'string');
                  
                  return (
                    <>
                      {usageObjects.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Where This Image is Used</h4>
                          <div className="space-y-2">
                            {usageObjects.map((location: any, index: number) => (
                              <div key={index} className="flex items-center justify-between bg-muted rounded p-2">
                                <span className="text-sm">{location.page} - {location.section}</span>
                                {location.url && (
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href={location.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {storyTags.length > 0 && (
                        <div className={usageObjects.length > 0 ? "pt-4 border-t" : ""}>
                          <h4 className="font-semibold mb-2">Story Section Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {storyTags.map((tag: string, index: number) => {
                              // Map tag values to human-readable labels
                              const labelMap: Record<string, string> = {
                                "story_act_1_slop": "Act 1: AI Slop",
                                "story_act_2_before": "Act 2: Before",
                                "story_act_2_after": "Act 2: After",
                                "story_act_3_founders": "Act 3: Founders",
                                "story_act_3_creators": "Act 3: Creators",
                                "story_act_3_memory": "Act 3: Memory",
                              };
                              const label = labelMap[tag] || tag;
                              return <Badge key={index} variant="secondary">{label}</Badge>;
                            })}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            These tags control which Creative Process story sections display this image
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </div>

          {/* Metadata and Details */}
          <div className="space-y-6">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Edit Image Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageMetadataEditor
                    image={image}
                    onSave={(data) => {
                      updateMutation.mutate(data);
                    }}
                    onCancel={() => setIsEditing(false)}
                    isSaving={updateMutation.isPending}
                    showQuickReasons={true}
                  />
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Image Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Description</h4>
                      <p className="text-muted-foreground">{image.description}</p>
                    </div>
                    {image.extendedDescription && (
                      <div>
                        <h4 className="font-semibold">Detailed Description</h4>
                        <p className="text-muted-foreground">{image.extendedDescription}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Creative Process */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Creative Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Generation Prompt</h4>
                      <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                        {image.prompt}
                      </div>
                    </div>

                    {image.designPhilosophy && (
                      <div>
                        <h4 className="font-semibold mb-2">Design Philosophy</h4>
                        <p className="text-muted-foreground text-sm">{image.designPhilosophy}</p>
                      </div>
                    )}

                    {image.rejectionReason && (
                      <div>
                        <h4 className="font-semibold mb-2">Image Analysis</h4>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-amber-800 text-sm">{image.rejectionReason}</p>
                        </div>
                      </div>
                    )}

                    {image.correctionApproach && (
                      <div>
                        <h4 className="font-semibold mb-2">How We Corrected It</h4>
                        <p className="text-muted-foreground text-sm">{image.correctionApproach}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tags and Search Keywords */}
                {(getTags().length > 0 || image.searchKeywords) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileImage className="h-5 w-5" />
                        Tags & Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {getTags().length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {getTags().map((tag: string, index: number) => (
                              <Badge key={index} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {image.searchKeywords && (
                        <div>
                          <h4 className="font-semibold mb-2">Search Keywords</h4>
                          <p className="text-muted-foreground text-sm">{image.searchKeywords}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}