import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useImageSearch } from "@/hooks/use-debounced-search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ArrowLeft, Save, Search, Filter, Download, Edit, Tag, FileImage, Palette, Target, Clock, AlertCircle, CheckCircle, Sparkles, Eye, RefreshCw, BarChart3, Globe, MapPin, LogOut } from "lucide-react";
import type { CreativeImage, CreativeSession, LearningStatus, CreativePerspective } from "@shared/schema";
import { ImageMetadataEditor, commonRejectionReasons } from "@/components/ImageMetadataEditor";

export default function ImageAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Usage statistics query
  const { data: usageStats, refetch: refetchUsageStats } = useQuery({
    queryKey: ["/api/creative/usage/stats"],
    staleTime: 1000 * 60 * 2,
  });

  // Scan usage mutation
  const scanUsageMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/creative/usage/scan"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images"] });
      refetchUsageStats();
      toast({ title: "Usage tracking updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to scan usage", variant: "destructive" });
    },
  });
  
  // Use the enhanced search hook
  const {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    images: filteredImages,
    isLoading: isSearching,
    searchCount
  } = useImageSearch();
  
  const { data: sessionsData } = useQuery({
    queryKey: ["/api/creative/sessions"],
  });

  const sessions = (sessionsData as any)?.sessions || [];

  // State management
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [bulkRejectionReason, setBulkRejectionReason] = useState("");
  const [showBulkEditor, setShowBulkEditor] = useState(false);

  // Get all images count for display
  const { data: allImagesData } = useQuery({
    queryKey: ["/api/creative/images"],
  });
  const allImages = (allImagesData as any)?.images || [];

  // Update image mutation
  const updateImageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreativeImage> }) => {
      return apiRequest("PATCH", `/api/creative/images/${id}`, data);
    },
    onSuccess: () => {
      // Invalidate all creative images queries (base and filtered)
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images"] });
      toast({ title: "Image updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update image", variant: "destructive" });
    },
  });

  // Bulk update mutation  
  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ imageIds, data }: { imageIds: string[]; data: Partial<CreativeImage> }) => {
      const updates = imageIds.map(id => 
        apiRequest("PATCH", `/api/creative/images/${id}`, data)
      );
      return Promise.all(updates);
    },
    onSuccess: () => {
      // Invalidate all creative images queries (base and filtered)
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images"] });
      setSelectedImages(new Set());
      setBulkRejectionReason("");
      setShowBulkEditor(false);
      toast({ title: `Updated ${selectedImages.size} images successfully` });
    },
    onError: () => {
      toast({ title: "Failed to update images", variant: "destructive" });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: async () => {
      // Clear session token from localStorage
      localStorage.removeItem('chb_admin_session');
      // Clear all React Query cache
      await queryClient.clear();
      // Force full page reload to remount auth wrapper
      window.location.reload();
    },
    onError: () => {
      toast({ title: "Logout failed", variant: "destructive" });
    },
  });

  const handleBulkUpdate = () => {
    if (selectedImages.size === 0 || !bulkRejectionReason.trim()) return;
    
    bulkUpdateMutation.mutate({
      imageIds: Array.from(selectedImages),
      data: { rejectionReason: bulkRejectionReason.trim() }
    });
  };

  const handleQuickReasonSelect = (reason: string, imageId?: string) => {
    if (imageId) {
      updateImageMutation.mutate({
        id: imageId,
        data: { rejectionReason: reason }
      });
    } else {
      setBulkRejectionReason(reason);
    }
  };

  const toggleImageSelection = (imageId: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const selectAllFiltered = () => {
    const allFilteredIds = new Set<string>(filteredImages.map((img: CreativeImage) => img.id));
    setSelectedImages(allFilteredIds);
  };

  const clearSelection = () => {
    setSelectedImages(new Set());
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
      case "final_version": return "bg-green-100 text-green-800";
      case "learning_attempt": return "bg-yellow-100 text-yellow-800";
      case "happy_accident": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
                  Back to Creative Process
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Image Administration</h1>
                <p className="text-sm text-muted-foreground">
                  Edit rejection reasons and metadata for creative assets - building Pipes intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <FileImage className="h-3 w-3" />
                {allImages.length} Images
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Filter className="h-3 w-3" />
                {filteredImages.length} Filtered
              </Badge>
              {selectedImages.size > 0 && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {selectedImages.size} Selected
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="gap-2"
                data-testid="logout-button"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="space-y-6 mb-8">
          {/* Usage Tracking Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Usage Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {(usageStats as any)?.stats?.totalImages || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Images</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {(usageStats as any)?.stats?.imagesInUse || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">In Use</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {(usageStats as any)?.stats?.unusedImages || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Unused</div>
                </div>
                <div className="flex items-center justify-center">
                  <Button 
                    onClick={() => scanUsageMutation.mutate()}
                    disabled={scanUsageMutation.isPending}
                    size="sm"
                    data-testid="scan-usage"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${scanUsageMutation.isPending ? 'animate-spin' : ''}`} />
                    {scanUsageMutation.isPending ? 'Scanning...' : 'Scan Usage'}
                  </Button>
                </div>
              </div>
              
              {(usageStats as any)?.stats?.usageByPage && Object.keys((usageStats as any).stats.usageByPage).length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Usage by Page:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {Object.entries((usageStats as any).stats.usageByPage).map(([page, count]) => (
                      <div key={page} className="text-xs bg-muted/30 rounded px-2 py-1">
                        <span className="font-medium">{page}:</span> {count as number}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Images</Label>
                  <Input
                    id="search"
                    placeholder="Search titles, descriptions, prompts, tags..."
                    value={filters.searchTerm}
                    onChange={(e) => updateFilter('searchTerm', e.target.value)}
                    data-testid="search-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Learning Status</Label>
                  <Select value={filters.learningStatus} onValueChange={(value) => updateFilter('learningStatus', value)}>
                    <SelectTrigger data-testid="status-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status ({allImages.length})</SelectItem>
                      <SelectItem value="final_version">Final Versions ({allImages.filter((img: CreativeImage) => img.learningStatus === "final_version").length})</SelectItem>
                      <SelectItem value="learning_attempt">Learning Attempts ({allImages.filter((img: CreativeImage) => img.learningStatus === "learning_attempt").length})</SelectItem>
                      <SelectItem value="happy_accident">Happy Accidents ({allImages.filter((img: CreativeImage) => img.learningStatus === "happy_accident").length})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Perspective</Label>
                  <Select value={filters.perspective} onValueChange={(value) => updateFilter('perspective', value)}>
                    <SelectTrigger data-testid="perspective-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Perspectives</SelectItem>
                      <SelectItem value="startup_founders">Startup Founders</SelectItem>
                      <SelectItem value="content_creators">Content Creators</SelectItem>
                      <SelectItem value="memory_capturers">Memory Capturers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Selection</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={selectAllFiltered} data-testid="select-all">
                      Select All ({filteredImages.length})
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearSelection} data-testid="clear-selection">
                      Clear ({selectedImages.size})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Editor */}
          {selectedImages.size > 0 && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Edit className="h-5 w-5" />
                  Bulk Edit {selectedImages.size} Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bulk-reason">Rejection Reason</Label>
                    <Textarea
                      id="bulk-reason"
                      placeholder="Enter rejection reason for selected images..."
                      value={bulkRejectionReason}
                      onChange={(e) => setBulkRejectionReason(e.target.value)}
                      rows={3}
                      data-testid="bulk-rejection-input"
                    />
                  </div>
                  <Button 
                    onClick={handleBulkUpdate}
                    disabled={!bulkRejectionReason.trim() || bulkUpdateMutation.isPending}
                    className="gap-2"
                    data-testid="bulk-update-button"
                  >
                    <Save className="h-4 w-4" />
                    Update {selectedImages.size} Images
                  </Button>
                </div>
                
                {/* Quick Rejection Reasons */}
                <div className="space-y-2">
                  <Label>Quick Reasons</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonRejectionReasons.slice(0, 6).map((reason) => (
                      <Button
                        key={reason}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReasonSelect(reason)}
                        className="text-xs"
                        data-testid={`quick-reason-${reason.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {reason}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image: CreativeImage) => (
            <ImageAdminCard
              key={image.id}
              image={image}
              isSelected={selectedImages.has(image.id)}
              onToggleSelect={() => toggleImageSelection(image.id)}
              onUpdateImage={(data) => updateImageMutation.mutate({ id: image.id, data })}
              formatLearningStatus={formatLearningStatus}
              formatPerspective={formatPerspective}
              getStatusColor={getStatusColor}
              isUpdating={updateImageMutation.isPending}
            />
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No images found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Individual Image Card Component
interface ImageAdminCardProps {
  image: CreativeImage;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateImage: (data: Partial<CreativeImage>) => void;
  formatLearningStatus: (status: LearningStatus) => string;
  formatPerspective: (perspective: CreativePerspective) => string;
  getStatusColor: (status: LearningStatus) => string;
  isUpdating: boolean;
}

function ImageAdminCard({ 
  image, 
  isSelected, 
  onToggleSelect, 
  onUpdateImage, 
  formatLearningStatus,
  formatPerspective,
  getStatusColor,
  isUpdating
}: ImageAdminCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''} ${isUpdating ? 'opacity-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onToggleSelect}
              data-testid={`select-image-${image.id}`}
            />
            <Badge className={getStatusColor(image.learningStatus as LearningStatus)}>
              {formatLearningStatus(image.learningStatus as LearningStatus)}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="opacity-60 group-hover:opacity-100 transition-opacity"
            data-testid={`edit-image-${image.id}`}
            title="Edit image details"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image */}
        <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
          <img
            src={image.filePath}
            alt={image.description}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {formatPerspective(image.perspective as CreativePerspective)}
            </Badge>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <Link href={`/image-detail/${image.id}`}>
            <h4 className="font-medium text-sm line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors" data-testid={`image-title-link-${image.id}`}>{image.title}</h4>
          </Link>
          
          {isEditing ? (
            <div className="text-xs">
              <ImageMetadataEditor
                image={image}
                onSave={(data) => {
                  onUpdateImage(data);
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
                isSaving={isUpdating}
                showQuickReasons={false}
              />
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
              {image.rejectionReason && (
                <div className="bg-amber-50 border border-amber-200 rounded p-2">
                  <p className="text-xs text-amber-800 font-medium">Image Analysis:</p>
                  <p className="text-xs text-amber-800">{image.rejectionReason}</p>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{image.downloadCount || 0} downloads</span>
                <span>Complexity: {image.complexityLevel}/5</span>
              </div>
              
              {/* Generation Parameters Display */}
              {image.generationParams && (
                <div className="bg-slate-50 border border-slate-200 rounded p-2 space-y-1">
                  <p className="text-xs font-medium text-slate-700">Generation Parameters</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                    {(image.generationParams as any).colorPalette && (
                      <div>
                        <span className="font-medium">Palette:</span> {(image.generationParams as any).colorPalette}
                      </div>
                    )}
                    {(image.generationParams as any).aspectRatio && (
                      <div>
                        <span className="font-medium">Ratio:</span> {(image.generationParams as any).aspectRatio}
                      </div>
                    )}
                    {(image.generationParams as any).background && (
                      <div>
                        <span className="font-medium">BG:</span> {(image.generationParams as any).background}
                      </div>
                    )}
                    {(image.generationParams as any).minimalism !== undefined && (
                      <div>
                        <span className="font-medium">Min:</span> {(image.generationParams as any).minimalism}
                      </div>
                    )}
                    {(image.generationParams as any).context?.type && (
                      <div className="col-span-2">
                        <span className="font-medium">Context:</span> {(image.generationParams as any).context.type}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Link href={`/image-detail/${image.id}`}>
                  <Button variant="outline" size="sm" className="w-full gap-2" data-testid={`view-details-${image.id}`}>
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}