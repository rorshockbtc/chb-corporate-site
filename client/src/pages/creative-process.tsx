import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ArrowLeft, Download, Search, Filter, Grid, List, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResilientImage } from "@/components/resilient-image";
import type { CreativeSession, CreativeImage, JourneyStage, LearningStatus, CreativePerspective } from "@shared/schema";

type ViewMode = "story" | "gallery" | "comparison";
type LayoutMode = "grid" | "list";

export default function CreativeProcess() {
  const [viewMode, setViewMode] = useState<ViewMode>("story");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("grid");
  const [selectedImage, setSelectedImage] = useState<CreativeImage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [journeyStageFilter, setJourneyStageFilter] = useState<JourneyStage | "all">("all");
  const [perspectiveFilter, setPerspectiveFilter] = useState<CreativePerspective | "all">("all");
  const [learningStatusFilter, setLearningStatusFilter] = useState<LearningStatus | "all">("all");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "gallery" ? 20 : 12;
  
  // Comparison state
  const [comparisonMode, setComparisonMode] = useState<"sessions" | "perspectives" | "quality" | "selected">("sessions");
  const [selectedForComparison, setSelectedForComparison] = useState<CreativeImage[]>([]);

  // Fetch creative sessions for story rail
  const { data: sessionsData } = useQuery<{ success: boolean; sessions: CreativeSession[] }>({
    queryKey: ["/api/creative/sessions", { journeyStage: journeyStageFilter !== "all" ? journeyStageFilter : undefined }],
    queryFn: async ({ queryKey }) => {
      const [url, params] = queryKey as [string, any];
      const searchParams = new URLSearchParams();
      if (params?.journeyStage) {
        searchParams.append("journeyStage", params.journeyStage);
      }
      const response = await fetch(`${url}?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch sessions");
      return response.json();
    },
    enabled: viewMode === "story" || viewMode === "comparison"
  });

  // Asset validation - check for broken images
  const { data: assetValidation } = useQuery<{
    success: boolean;
    validation: {
      valid: { filename: string; filePath: string }[];
      invalid: { filename: string; filePath: string; reason: string }[];
    };
    availableAssets: number;
    brokenImages: number;
    workingImages: number;
    manifest: Array<{
      filename: string;
      filePath: string;
      size: number;
      lastModified: string;
      checksum: string;
      exists: boolean;
    }>;
  }>({
    queryKey: ['/api/creative/assets/validate'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Fetch creative images with filters
  const { data: imagesData } = useQuery<{ success: boolean; images: CreativeImage[] }>({
    queryKey: [
      "/api/creative/images",
      { 
        searchTerm: searchTerm || undefined,
        journeyStage: journeyStageFilter !== "all" ? journeyStageFilter : undefined,
        perspective: perspectiveFilter !== "all" ? perspectiveFilter : undefined,
        learningStatus: learningStatusFilter !== "all" ? learningStatusFilter : undefined
      }
    ],
    queryFn: async ({ queryKey }) => {
      const [url, params] = queryKey as [string, any];
      const searchParams = new URLSearchParams();
      if (params?.searchTerm) searchParams.append("searchTerm", params.searchTerm);
      if (params?.journeyStage) searchParams.append("journeyStage", params.journeyStage);
      if (params?.perspective) searchParams.append("perspective", params.perspective);
      if (params?.learningStatus) searchParams.append("learningStatus", params.learningStatus);
      
      const response = await fetch(`${url}?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch images");
      return response.json();
    },
  });

  const sessions = sessionsData?.sessions || [];
  const allImagesRaw = imagesData?.images || [];
  
  // Maintain two stable references:
  // 1. allImagesRaw: Full dataset with duplicates (for Story tab statistics)
  // 2. allImagesDeduped: Deduplicated by filename (for Gallery/Filter tabs)
  const allImagesDeduped = useMemo(() => {
    const seenFilenames = new Set<string>();
    return allImagesRaw.filter(img => {
      if (seenFilenames.has(img.filename)) {
        return false;
      }
      seenFilenames.add(img.filename);
      return true;
    });
  }, [allImagesRaw]);
  
  // Choose which dataset to use based on view mode
  const allImages = viewMode === "story" ? allImagesRaw : allImagesDeduped;
  
  // Pagination logic - only apply to Gallery view
  const totalPages = Math.ceil(allImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const images = viewMode === "gallery" ? allImages.slice(startIndex, endIndex) : allImages;
  
  // Reset page when filters change and clamp to valid range
  const resetPagination = () => setCurrentPage(1);
  const clampCurrentPage = () => {
    const maxPage = Math.max(1, Math.ceil(allImages.length / itemsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };
  
  // Comparison helper functions
  const toggleImageSelection = (image: CreativeImage) => {
    setSelectedForComparison(prev => {
      const exists = prev.find(img => img.id === image.id);
      if (exists) {
        return prev.filter(img => img.id !== image.id);
      } else if (prev.length < 4) {
        return [...prev, image];
      }
      return prev;
    });
  };

  const groupImagesByPerspective = () => {
    const groups: Record<string, CreativeImage[]> = {};
    allImages.forEach(img => {
      const key = img.perspective;
      if (!groups[key]) groups[key] = [];
      groups[key].push(img);
    });
    return Object.entries(groups);
  };

  const groupImagesByQuality = () => {
    const groups: Record<string, CreativeImage[]> = {};
    allImages.forEach(img => {
      const key = img.learningStatus;
      if (!groups[key]) groups[key] = [];
      groups[key].push(img);
    });
    return Object.entries(groups);
  };
  
  // Auto-clamp page when data changes
  useEffect(() => {
    clampCurrentPage();
  }, [allImages.length, currentPage, itemsPerPage]);

  const handleDownload = async (image: CreativeImage) => {
    try {
      // Increment download counter
      await fetch(`/api/creative/images/${image.id}/download`, { method: "POST" });
      
      // Invalidate queries to refresh download counts
      queryClient.invalidateQueries({ queryKey: ["/api/creative/images"] });
      queryClient.invalidateQueries({ queryKey: ["/api/creative/sessions"] });
      
      // Create download link
      const link = document.createElement("a");
      link.href = image.filePath;
      link.download = image.filename;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const formatJourneyStage = (stage: JourneyStage) => {
    const stages = {
      early_experiments: "Early Experiments",
      brand_discovery: "Brand Discovery", 
      perspective_mastery: "Perspective Mastery"
    };
    return stages[stage];
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

  const getQualityInsight = (status: LearningStatus, rejectionReason?: string) => {
    switch (status) {
      case "final_version": 
        return {
          category: "✅ Included - Production Ready",
          rationale: "Met all criteria: proper perspective alignment, technical quality, and authentic aesthetic that resonates with target audience.",
          bgColor: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
          textColor: "text-green-800 dark:text-green-200"
        };
      case "happy_accident": 
        return {
          category: "⚡ Included - Breakthrough Discovery", 
          rationale: "Unexpected result that revealed new design directions or solved problems we didn't know we had.",
          bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-200"
        };
      case "learning_attempt":
        const reason = rejectionReason || "Didn't meet quality standards or failed to connect with target perspective";
        return {
          category: "❌ Excluded - Learning Experience",
          rationale: `${reason}. Valuable for understanding what doesn't work and refining our approach.`,
          bgColor: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800", 
          textColor: "text-amber-800 dark:text-amber-200"
        };
      default:
        return {
          category: "🔍 Under Review",
          rationale: "Still evaluating quality and fit for target perspectives.",
          bgColor: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
          textColor: "text-gray-800 dark:text-gray-200"
        };
    }
  };

  const getSessionConnections = (currentStage: string, previousStage?: string): string => {
    if (!previousStage) return "";
    
    const connections: Record<string, Record<string, string>> = {
      'brand_discovery': {
        'early_experiments': "the importance of exploring fundamental visual concepts before diving into brand-specific aesthetics."
      },
      'perspective_mastery': {
        'early_experiments': "the foundation of experimental thinking that allowed us to iterate fearlessly.",
        'brand_discovery': "how to balance brand coherence with perspective-specific adaptations for maximum audience resonance."
      }
    };
    
    return connections[currentStage]?.[previousStage] || "valuable insights about the creative process and visual communication.";
  };

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Simplified Header */}
      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 transition-colors duration-200" data-testid="back-to-products">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Button>
            </Link>
            
            {/* Asset Health Status */}
            {assetValidation && assetValidation.brokenImages > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="destructive">
                  {assetValidation.brokenImages} broken images
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={async () => {
                    try {
                      await fetch('/api/creative/assets/repair', { method: 'POST' });
                      queryClient.invalidateQueries({ queryKey: ['/api/creative/images'] });
                      queryClient.invalidateQueries({ queryKey: ['/api/creative/assets/validate'] });
                    } catch (error) {
                      console.error('Auto-repair failed:', error);
                    }
                  }}
                  className="text-xs"
                >
                  Auto-Repair
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl font-bold font-serif leading-tight" data-testid="page-title">
              Our Creative Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed" data-testid="page-subtitle">
              This is the real story of how CHB's visual identity came to life—every experiment, breakthrough, and lesson learned. 
              We believe in radical transparency: showing not just the polished final results, but the complete creative journey 
              with all its iterations, surprises, and discoveries.
            </p>
          </div>

          {/* Primary Navigation */}
          <div className="mt-8">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-pink)]/80 p-1.5 h-14 rounded-xl shadow-lg" data-testid="view-mode-tabs">
                <TabsTrigger 
                  value="story" 
                  className="gap-3 !text-white data-[state=active]:!bg-white data-[state=active]:!text-primary data-[state=active]:shadow-lg hover:!text-white/90 font-semibold transition-all duration-200"
                >
                  <BookOpen className="h-5 w-5" />
                  Story
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery" 
                  className="gap-3 !text-white data-[state=active]:!bg-white data-[state=active]:!text-primary data-[state=active]:shadow-lg hover:!text-white/90 font-semibold transition-all duration-200"
                >
                  <Grid className="h-5 w-5" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger 
                  value="comparison" 
                  className="gap-3 !text-white data-[state=active]:!bg-white data-[state=active]:!text-primary data-[state=active]:shadow-lg hover:!text-white/90 font-semibold transition-all duration-200"
                >
                  <Filter className="h-5 w-5" />
                  Filter
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <Tabs value={viewMode} className="w-full">
            {/* Story First View - COMPLETELY RESTRUCTURED FOR TEACHING AI CURATION */}
            <TabsContent value="story" className="space-y-16">
              {/* Introduction: The Real Problem We're Solving */}
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-blue-200/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto space-y-6">
                  <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Why Most AI-Generated Content Fails
                  </h2>
                  <p className="text-lg text-center text-muted-foreground leading-relaxed">
                    Speed doesn't equal quality. Anyone can ask AI to generate 100 images in minutes—but you'll spend hours 
                    finding the one that doesn't scream "AI slop." This is the story of how we learned to <strong>curate AI</strong>, 
                    not just command it. And why that changes everything.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border text-center">
                      <div className="text-3xl font-bold text-red-600">{allImages.filter(img => img.learningStatus === 'learning_attempt').length}</div>
                      <div className="text-sm text-muted-foreground">AI Failures (The Learning)</div>
                    </div>
                    <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border text-center">
                      <div className="text-3xl font-bold text-green-600">{allImages.filter(img => img.learningStatus === 'final_version').length}</div>
                      <div className="text-sm text-muted-foreground">Curated Winners</div>
                    </div>
                    <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {allImages.length > 0 
                          ? Math.round((allImages.filter(img => img.learningStatus === 'final_version').length / allImages.length) * 100) 
                          : 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACT 1: The AI Slop Problem */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-8 border border-red-200/50">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                      <div>
                        <h3 className="text-3xl font-bold">The AI Slop Problem</h3>
                        <p className="text-red-700 dark:text-red-300 text-sm">When AI takes your instructions too literally</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-lg">
                      <p className="leading-relaxed">
                        We wanted to create playful images with <strong>"hidden punctuation"</strong> (our brand's signature: 
                        colon-hyphen-bracket). AI's interpretation? <span className="font-mono bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                        Bold, superimposed text that screams "I'M AI GENERATED!"</span>
                      </p>
                      <p className="leading-relaxed">
                        We said <strong>"no text"</strong> in images meant for 80-year-old Memory Capturers. AI added Lorem Ipsum and 
                        random misspelled words anyway. This is <strong>AI slop</strong>—technically following instructions, but 
                        utterly useless to anyone.
                      </p>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 border-l-4 border-red-500">
                        <p className="font-semibold text-red-800 dark:text-red-200 mb-2">The Core Problem:</p>
                        <p className="text-muted-foreground">
                          AI generates <em>fast</em>, but it doesn't understand <em>context, emotion, or appropriateness</em>. 
                          Without curation, you're brute-forcing your way through 50-100 generations hoping to stumble on "good enough."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Examples of AI Slop */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="slop-examples" className="border border-red-200/50 rounded-lg px-6 bg-white/30 dark:bg-gray-800/30">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge variant="destructive">Learning Attempts</Badge>
                        <span className="font-semibold">View Examples: What NOT to Do</span>
                        <span className="text-sm text-muted-foreground ml-auto mr-4">
                          ({allImages.filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_1_slop')).length} examples)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {allImages
                          .filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_1_slop'))
                          .slice(0, 6)
                          .map((image: CreativeImage) => (
                            <Card key={image.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-red-200" data-testid={`slop-example-${image.id}`}>
                              <div 
                                className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                                onClick={() => setSelectedImage(image)}
                              >
                                <ResilientImage image={image} onDownload={handleDownload} showMetadata={false} className="w-full" />
                                <div className="absolute top-2 right-2">
                                  <Badge variant="destructive" className="shadow-lg">❌ Failed</Badge>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-sm mb-2">{image.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* ACT 2: The Curation Breakthrough */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200/50">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                      <div>
                        <h3 className="text-3xl font-bold">The Curation Breakthrough</h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">From literal instructions to emotional design</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-lg">
                      <p className="leading-relaxed">
                        The breakthrough wasn't asking AI <em>harder</em>—it was changing the <strong>environment and context</strong>. 
                        Instead of saying "show a family doing something together," we asked: <span className="font-semibold text-blue-700 dark:text-blue-300">
                        "What aesthetic speaks to an 80+ year old audience?"</span>
                      </p>
                      <p className="leading-relaxed">
                        Answer: <strong>Vintage postcards</strong>. Familiar. Nostalgic. A format they've held in their hands for decades. 
                        Suddenly, we weren't generating generic family photos—we were evoking <em>emotion through form</em>.
                      </p>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 border-l-4 border-blue-500">
                        <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">The Lesson:</p>
                        <p className="text-muted-foreground">
                          Stop brute-forcing prompts. Start <em>curating environments</em>. Define your aesthetic constraints <em>once</em>, 
                          then let AI work within that controlled space. This is how you get consistency instead of chaos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Before/After Examples */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="curation-examples" className="border border-blue-200/50 rounded-lg px-6 bg-white/30 dark:bg-gray-800/30">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-blue-600">Before & After</Badge>
                        <span className="font-semibold">View The Transformation: Generic Farmhouse → Vintage Postcards</span>
                        <span className="text-sm text-muted-foreground ml-auto mr-4">
                          ({allImages.filter(img => Array.isArray(img.usageLocations) && (img.usageLocations.includes('story_act_2_before') || img.usageLocations.includes('story_act_2_after'))).length} examples)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                        {/* Learning Attempts */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">×</span>
                            Generic Farmhouse (Too Literal)
                          </h4>
                          <div className="grid gap-3">
                            {allImages
                              .filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_2_before'))
                              .slice(0, 3)
                              .map((image: CreativeImage) => (
                                <Card key={image.id} className="group hover:shadow-lg transition-all cursor-pointer border-amber-200" onClick={() => setSelectedImage(image)}>
                                  <div className="flex gap-3 p-3">
                                    <ResilientImage image={image} onDownload={handleDownload} showMetadata={false} className="w-24 h-24 object-cover rounded" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium line-clamp-2">{image.title}</p>
                                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Why rejected: Too modern, missing nostalgic feel</p>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                          </div>
                        </div>

                        {/* Final Versions */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">✓</span>
                            Vintage Postcard Aesthetic (Emotional Win)
                          </h4>
                          <div className="grid gap-3">
                            {allImages
                              .filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_2_after'))
                              .slice(0, 3)
                              .map((image: CreativeImage) => (
                                <Card key={image.id} className="group hover:shadow-lg transition-all cursor-pointer border-green-200" onClick={() => setSelectedImage(image)}>
                                  <div className="flex gap-3 p-3">
                                    <ResilientImage image={image} onDownload={handleDownload} showMetadata={false} className="w-24 h-24 object-cover rounded" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium line-clamp-2">{image.title}</p>
                                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">Why it works: Nostalgic format, familiar to 80+ audience</p>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* ACT 3: Managed AI - The Future */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-purple-200/50">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                      <div>
                        <h3 className="text-3xl font-bold">Managed AI: Consistency Without Chaos</h3>
                        <p className="text-purple-700 dark:text-purple-300 text-sm">The future of programmatic content generation</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-lg">
                      <p className="leading-relaxed">
                        Imagine this: You write <strong>one prompt</strong>. But instead of getting one generic response, you get 
                        <strong className="text-purple-700 dark:text-purple-300"> multiple outputs—each perfectly tailored to different audiences</strong>, 
                        yet all maintaining your defined aesthetic rules. Same concept, different emotional languages.
                      </p>
                      <p className="leading-relaxed">
                        That's <strong>programmatic generation</strong> with managed AI environments. You're not asking AI to guess 
                        what "professional" or "nostalgic" means—you've <em>defined it programmatically</em>. The environment enforces 
                        consistency across images, videos, text, any AI model you plug in.
                      </p>
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-6 border-l-4 border-purple-500">
                        <p className="font-semibold text-purple-800 dark:text-purple-200 mb-2">The Revolution:</p>
                        <p className="text-muted-foreground">
                          <strong>Curation becomes currency</strong>. While others compete on AI speed (which commodifies instantly), 
                          you compete on <em>controlled quality</em>. Your ability to define and enforce aesthetic consistency—that's 
                          what you monetize. That's the economic shift: from creation speed to curation excellence.
                        </p>
                      </div>
                      <p className="leading-relaxed text-base text-muted-foreground mt-4">
                        CHB is building this future. Our products already adapt content to different perspectives—developers see technical 
                        depth, designers see UX thinking, customers see benefits. The same technology that powers this website could power 
                        <em> your entire web experience</em>, letting you tune everything to your preferences. Stay tuned.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Collapsible Final Examples - One Concept, Three Audiences */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="managed-examples" className="border border-purple-200/50 rounded-lg px-6 bg-white/30 dark:bg-gray-800/30">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">Consistency Demo</Badge>
                        <span className="font-semibold">View Live Example: One Concept → Three Tailored Outputs</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-6">
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200/50">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <strong>Same Hero Image Request</strong> → Three completely different visual expressions. 
                            Notice how each maintains quality standards while speaking to its audience's emotional language.
                          </p>
                        </div>

                        {/* Show Hero images across perspectives */}
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                          {/* Startup Founders Hero */}
                          {allImages
                            .filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_3_founders'))
                            .slice(0, 1)
                            .map((image: CreativeImage) => (
                              <Card key={image.id} className="group hover:shadow-xl transition-all cursor-pointer border-purple-200" onClick={() => setSelectedImage(image)}>
                                <div className="relative bg-muted rounded-lg overflow-hidden">
                                  <ResilientImage image={image} onDownload={handleDownload} showMetadata={false} className="w-full aspect-video object-cover" />
                                  <Badge className="absolute top-2 right-2 bg-blue-600 text-white">Founders</Badge>
                                </div>
                                <CardContent className="p-4 space-y-2">
                                  <p className="text-sm font-semibold">{image.title}</p>
                                  <p className="text-xs text-purple-600 dark:text-purple-400">
                                    <strong>Why this works:</strong> Playful, dynamic imagery signals innovation and rapid iteration—key founder values
                                  </p>
                                </CardContent>
                              </Card>
                            ))}

                          {/* Content Creators Hero */}
                          {allImages
                            .filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_3_creators'))
                            .slice(0, 1)
                            .map((image: CreativeImage) => (
                              <Card key={image.id} className="group hover:shadow-xl transition-all cursor-pointer border-purple-200" onClick={() => setSelectedImage(image)}>
                                <div className="relative bg-muted rounded-lg overflow-hidden">
                                  <ResilientImage image={image} onDownload={handleDownload} showMetadata={false} className="w-full aspect-video object-cover" />
                                  <Badge className="absolute top-2 right-2 bg-pink-600 text-white">Creators</Badge>
                                </div>
                                <CardContent className="p-4 space-y-2">
                                  <p className="text-sm font-semibold">{image.title}</p>
                                  <p className="text-xs text-purple-600 dark:text-purple-400">
                                    <strong>Why this works:</strong> Flow states and creative processes speak directly to artists and content makers
                                  </p>
                                </CardContent>
                              </Card>
                            ))}

                          {/* Memory Capturers Hero */}
                          {allImages
                            .filter(img => Array.isArray(img.usageLocations) && img.usageLocations.includes('story_act_3_memory'))
                            .slice(0, 1)
                            .map((image: CreativeImage) => (
                              <Card key={image.id} className="group hover:shadow-xl transition-all cursor-pointer border-purple-200" onClick={() => setSelectedImage(image)}>
                                <div className="relative bg-muted rounded-lg overflow-hidden">
                                  <ResilientImage image={image} onDownload={handleDownload} showMetadata={false} className="w-full aspect-video object-cover" />
                                  <Badge className="absolute top-2 right-2 bg-amber-600 text-white">Memory</Badge>
                                </div>
                                <CardContent className="p-4 space-y-2">
                                  <p className="text-sm font-semibold">{image.title}</p>
                                  <p className="text-xs text-purple-600 dark:text-purple-400">
                                    <strong>Why this works:</strong> Nostalgic lakeside scenes evoke family memories and generational connection
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border border-purple-200/50">
                          <p className="text-sm font-semibold text-purple-800 dark:text-purple-200 mb-2">🎯 The Consistency Proof:</p>
                          <p className="text-sm text-muted-foreground">
                            All three images meet the same quality bar (composition, clarity, professionalism) but speak completely different emotional languages. 
                            That's <strong>managed AI</strong>—defining quality once, enforcing it programmatically across any audience or context.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-pink-200/50 text-center">
                <h3 className="text-2xl font-bold mb-4">The Future is Tunable</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  This is just the beginning. The same principles that let us curate AI-generated imagery—defining environments, 
                  enforcing consistency, creating emotional resonance—can revolutionize how you experience the entire web. 
                  <strong className="text-foreground"> What if you could tune everything to match your preferences?</strong>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Interested in learning more? <Link href="/products"><Button variant="link" className="text-pink-600 dark:text-pink-400 p-0 h-auto">Explore CHB's Products →</Button></Link>
                </p>
              </div>
            </TabsContent>

            {/* Gallery View */}
            <TabsContent value="gallery" className="space-y-8">
              {/* Gallery Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">All Images</h3>
                  <Badge variant="secondary">{allImages.length} total</Badge>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search images..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        resetPagination();
                      }}
                      className="pl-12 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50 rounded-lg shadow-sm focus:shadow-md transition-all duration-200"
                      data-testid="search-input"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLayoutMode(layoutMode === "grid" ? "list" : "grid")}
                    className="h-10 w-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    data-testid="layout-toggle"
                  >
                    {layoutMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className={`grid gap-4 ${layoutMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {images.map((image: CreativeImage) => (
                  <Card key={image.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50" data-testid={`gallery-image-${image.id}`}>
                    <div 
                      className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                      onClick={() => setSelectedImage(image)}
                    >
                      <ResilientImage
                        image={image}
                        onDownload={handleDownload}
                        showMetadata={false}
                        className="w-full"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                        <Badge variant="secondary" className="text-sm font-medium bg-black/80 text-white border-0 shadow-lg">
                          {formatPerspective(image.perspective as CreativePerspective)}
                        </Badge>
                        <Badge 
                          variant="default"
                          className={`text-sm font-semibold shadow-lg border-0 ${
                            image.learningStatus === 'final_version' ? 'bg-green-600 text-white hover:bg-green-700' :
                            image.learningStatus === 'learning_attempt' ? 'bg-amber-600 text-white hover:bg-amber-700' :
                            'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {formatLearningStatus(image.learningStatus as LearningStatus)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold">{image.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                        
                        {/* Visual Identity Indicators */}
                        {image.generationParams && (
                          <div className="flex flex-wrap gap-1">
                            {(image.generationParams as any).colorPalette && (
                              <Badge variant="outline" className="text-xs capitalize">
                                {String((image.generationParams as any).colorPalette)}
                              </Badge>
                            )}
                            {(image.generationParams as any).context?.tone && (
                              <Badge variant="outline" className="text-xs capitalize">
                                {String((image.generationParams as any).context.tone)}
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        {/* Quality Decomposition */}
                        {(() => {
                          const insight = getQualityInsight(image.learningStatus as LearningStatus, image.rejectionReason || undefined);
                          return (
                            <div className={`p-3 rounded-md border ${insight.bgColor}`}>
                              <div className={`text-xs font-medium mb-1 ${insight.textColor}`}>
                                {insight.category}
                              </div>
                              <p className={`text-xs ${insight.textColor} opacity-80`}>
                                {insight.rationale}
                              </p>
                            </div>
                          );
                        })()}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {image.downloadCount} downloads
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDownload(image)}
                            className="gap-2 bg-white/80 dark:bg-gray-800/80 hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm hover:shadow-md"
                            data-testid={`gallery-download-${image.id}`}
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination for Gallery View */}
              {viewMode === "gallery" && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-2">...</span>
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8 h-8 p-0"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                  
                  <span className="text-sm text-muted-foreground ml-4">
                    Page {currentPage} of {totalPages} ({allImages.length} total images)
                  </span>
                </div>
              )}
            </TabsContent>

            {/* Filter & Search View */}
            <TabsContent value="comparison" className="space-y-8">
              {/* Filter Controls */}
              <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Filter & Explore</h3>
                    <p className="text-muted-foreground">Find specific images by stage, perspective, or learning outcome</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search images by title, description, or keywords..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        resetPagination();
                      }}
                      className="pl-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50 rounded-lg shadow-sm focus:shadow-md transition-all duration-200"
                      data-testid="filter-search-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={journeyStageFilter} onValueChange={(value) => { setJourneyStageFilter(value as JourneyStage | "all"); resetPagination(); }}>
                      <SelectTrigger className="h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" data-testid="journey-stage-filter">
                        <SelectValue placeholder="Journey Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages ({sessions.length})</SelectItem>
                        <SelectItem value="early_experiments">Early Experiments ({sessions.filter(s => s.journeyStage === 'early_experiments').length})</SelectItem>
                        <SelectItem value="brand_discovery">Brand Discovery ({sessions.filter(s => s.journeyStage === 'brand_discovery').length})</SelectItem>
                        <SelectItem value="perspective_mastery">Perspective Mastery ({sessions.filter(s => s.journeyStage === 'perspective_mastery').length})</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={perspectiveFilter} onValueChange={(value) => { setPerspectiveFilter(value as CreativePerspective | "all"); resetPagination(); }}>
                      <SelectTrigger className="h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" data-testid="perspective-filter">
                        <SelectValue placeholder="Perspective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Perspectives ({allImages.length})</SelectItem>
                        <SelectItem value="startup_founders">Startup Founders ({allImages.filter(img => img.perspective === 'startup_founders').length})</SelectItem>
                        <SelectItem value="content_creators">Content Creators ({allImages.filter(img => img.perspective === 'content_creators').length})</SelectItem>
                        <SelectItem value="memory_capturers">Memory Capturers ({allImages.filter(img => img.perspective === 'memory_capturers').length})</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={learningStatusFilter} onValueChange={(value) => { setLearningStatusFilter(value as LearningStatus | "all"); resetPagination(); }}>
                      <SelectTrigger className="h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" data-testid="learning-status-filter">
                        <SelectValue placeholder="Learning Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status ({allImages.length})</SelectItem>
                        <SelectItem value="final_version">Final Versions ({allImages.filter(img => img.learningStatus === 'final_version').length})</SelectItem>
                        <SelectItem value="learning_attempt">Learning Attempts ({allImages.filter(img => img.learningStatus === 'learning_attempt').length})</SelectItem>
                        <SelectItem value="happy_accident">Happy Accidents ({allImages.filter(img => img.learningStatus === 'happy_accident').length})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Results Summary */}
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-semibold text-foreground">{images.length}</span> images 
                      {(journeyStageFilter !== "all" || perspectiveFilter !== "all" || learningStatusFilter !== "all") && 
                        <span> matching your filters</span>
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Filtered Results Display */}
              <div className={`grid gap-4 ${layoutMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {images.map((image: CreativeImage) => (
                  <Card key={image.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-border/50" data-testid={`filter-image-${image.id}`}>
                    <div 
                      className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                      onClick={() => setSelectedImage(image)}
                    >
                      <ResilientImage
                        image={image}
                        onDownload={handleDownload}
                        showMetadata={false}
                        className="w-full"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                        <Badge variant="secondary" className="text-sm font-medium bg-black/80 text-white border-0 shadow-lg">
                          {formatPerspective(image.perspective as CreativePerspective)}
                        </Badge>
                        <Badge 
                          variant="default"
                          className={`text-sm font-semibold shadow-lg border-0 ${
                            image.learningStatus === 'final_version' ? 'bg-green-600 text-white hover:bg-green-700' :
                            image.learningStatus === 'learning_attempt' ? 'bg-amber-600 text-white hover:bg-amber-700' :
                            'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {formatLearningStatus(image.learningStatus as LearningStatus)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold">{image.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                        
                        {/* Visual Identity Indicators */}
                        {image.generationParams && (
                          <div className="flex flex-wrap gap-1">
                            {(image.generationParams as any).colorPalette && (
                              <Badge variant="outline" className="text-xs capitalize">
                                {String((image.generationParams as any).colorPalette)}
                              </Badge>
                            )}
                            {(image.generationParams as any).context?.tone && (
                              <Badge variant="outline" className="text-xs capitalize">
                                {String((image.generationParams as any).context.tone)}
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {image.downloadCount} downloads
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDownload(image)}
                            className="gap-2 bg-white/80 dark:bg-gray-800/80 hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm hover:shadow-md"
                            data-testid={`filter-download-${image.id}`}
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Legacy Comparison Content - TO BE REMOVED */}
            <TabsContent value="legacy-comparison" className="space-y-8">
              <div className="space-y-8">
                <div className="text-center py-6">
                  <h3 className="text-2xl font-semibold mb-4">Visual Decision Analysis</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Compare creative approaches, iterations, and perspective adaptations to understand our visual decision-making process.
                  </p>
                </div>

                {/* Comparison Mode Selector */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={comparisonMode === "sessions" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setComparisonMode("sessions")}
                      className="gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      By Creative Sessions
                    </Button>
                    <Button
                      variant={comparisonMode === "perspectives" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setComparisonMode("perspectives")}
                      className="gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      By Perspective
                    </Button>
                    <Button
                      variant={comparisonMode === "quality" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setComparisonMode("quality")}
                      className="gap-2"
                    >
                      <Grid className="h-4 w-4" />
                      By Quality
                    </Button>
                    <Button
                      variant={comparisonMode === "selected" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setComparisonMode("selected")}
                      className="gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Selected ({selectedForComparison.length}/4)
                    </Button>
                  </div>
                  
                  {comparisonMode === "selected" && selectedForComparison.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedForComparison([])}
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>

                {/* Dynamic Comparison Content */}
                {comparisonMode === "sessions" && (
                  <div className="space-y-8">
                    {sessions.map((session) => {
                      const sessionImages = allImages.filter(img => img.sessionId === session.id);
                      if (sessionImages.length === 0) return null;
                      
                      return (
                        <div key={session.id} className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 space-y-6 bg-card/50">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xl font-semibold">{session.title}</h4>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {sessionImages.length} variations
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{session.description}</p>
                            <Badge variant="secondary" className="w-fit">
                              {formatJourneyStage(session.journeyStage as JourneyStage)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {sessionImages.map((image) => (
                              <Card key={image.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow">
                                <div 
                                  className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                                  onClick={() => setSelectedImage(image)}
                                >
                                  <ResilientImage
                                    image={image}
                                    onDownload={handleDownload}
                                    showMetadata={false}
                                    className="w-full"
                                  />
                                  
                                  {/* Selection overlay for adding to comparison */}
                                  {comparisonMode === "sessions" && (
                                    <div 
                                      className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleImageSelection(image);
                                      }}
                                    >
                                      <Button size="sm" variant="secondary" className="gap-2">
                                        <Search className="h-4 w-4" />
                                        Add to Compare
                                      </Button>
                                    </div>
                                  )}
                                  
                                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                                    <Badge variant="secondary" className="text-sm font-medium bg-black/80 text-white border-0 shadow-lg">
                                      {formatPerspective(image.perspective as CreativePerspective)}
                                    </Badge>
                                    <Badge 
                                      variant="default"
                                      className={`text-sm font-semibold shadow-lg border-0 ${
                                        image.learningStatus === 'final_version' ? 'bg-green-600 text-white hover:bg-green-700' :
                                        image.learningStatus === 'learning_attempt' ? 'bg-amber-600 text-white hover:bg-amber-700' :
                                        'bg-purple-600 text-white hover:bg-purple-700'
                                      }`}
                                    >
                                      {formatLearningStatus(image.learningStatus as LearningStatus)}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <CardContent className="p-3 space-y-2">
                                  <h5 className="font-medium text-sm line-clamp-1">{image.title}</h5>
                                  
                                  {image.rejectionReason && (
                                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                                      <p className="text-xs text-red-700 dark:text-red-300">
                                        <span className="font-medium">Rejected:</span> {image.rejectionReason}
                                      </p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          {/* Session insights */}
                          {(session.learningInsights || session.nextSteps) && (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 space-y-3 border border-blue-200/50">
                              {session.learningInsights && (
                                <div>
                                  <h6 className="font-medium text-sm mb-1 text-blue-800 dark:text-blue-200">💡 What We Learned</h6>
                                  <p className="text-sm text-blue-700 dark:text-blue-300">{session.learningInsights}</p>
                                </div>
                              )}
                              {session.nextSteps && (
                                <div>
                                  <h6 className="font-medium text-sm mb-1 text-purple-800 dark:text-purple-200">🔄 How We Adapted</h6>
                                  <p className="text-sm text-purple-700 dark:text-purple-300">{session.nextSteps}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {comparisonMode === "perspectives" && (
                  <div className="space-y-8">
                    {groupImagesByPerspective().map(([perspective, perspectiveImages]) => (
                      <div key={perspective} className="border-2 border-dashed border-green-200 rounded-xl p-6 space-y-4 bg-green-50/30">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-semibold">{formatPerspective(perspective as CreativePerspective)}</h4>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {perspectiveImages.length} images
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {perspectiveImages.slice(0, 8).map((image) => (
                            <Card key={image.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow">
                              <div 
                                className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                                onClick={() => setSelectedImage(image)}
                              >
                                <ResilientImage
                                  image={image}
                                  onDownload={handleDownload}
                                  showMetadata={false}
                                  className="w-full"
                                />
                                
                                <div 
                                  className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleImageSelection(image);
                                  }}
                                >
                                  <Button size="sm" variant="secondary" className="gap-2">
                                    <Search className="h-4 w-4" />
                                    Compare
                                  </Button>
                                </div>
                                
                                <div className="absolute top-2 right-2 z-10">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      image.learningStatus === 'final_version' ? 'bg-green-50 text-green-700 border-green-200' :
                                      image.learningStatus === 'learning_attempt' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                      'bg-purple-50 text-purple-700 border-purple-200'
                                    }`}
                                  >
                                    {formatLearningStatus(image.learningStatus as LearningStatus)}
                                  </Badge>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                        
                        {perspectiveImages.length > 8 && (
                          <p className="text-sm text-muted-foreground text-center">
                            Showing 8 of {perspectiveImages.length} images. Switch to Gallery view to see all.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {comparisonMode === "quality" && (
                  <div className="space-y-8">
                    {groupImagesByQuality().map(([quality, qualityImages]) => (
                      <div key={quality} className="border-2 border-dashed border-amber-200 rounded-xl p-6 space-y-4 bg-amber-50/30">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-semibold">{formatLearningStatus(quality as LearningStatus)}</h4>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {qualityImages.length} images
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {qualityImages.slice(0, 8).map((image) => (
                            <Card key={image.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow">
                              <div 
                                className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                                onClick={() => setSelectedImage(image)}
                              >
                                <ResilientImage
                                  image={image}
                                  onDownload={handleDownload}
                                  showMetadata={false}
                                  className="w-full"
                                />
                                
                                <div 
                                  className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleImageSelection(image);
                                  }}
                                >
                                  <Button size="sm" variant="secondary" className="gap-2">
                                    <Search className="h-4 w-4" />
                                    Compare
                                  </Button>
                                </div>
                                
                                <div className="absolute top-2 left-2 z-10">
                                  <Badge variant="secondary" className="text-xs">
                                    {formatPerspective(image.perspective as CreativePerspective)}
                                  </Badge>
                                </div>
                              </div>
                              
                              <CardContent className="p-3 space-y-2">
                                {image.rejectionReason && (
                                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                                    <p className="text-xs text-red-700 dark:text-red-300">
                                      <span className="font-medium">Why:</span> {image.rejectionReason}
                                    </p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {comparisonMode === "selected" && (
                  <div className="space-y-8">
                    {selectedForComparison.length === 0 ? (
                      <div className="text-center py-12 space-y-4">
                        <div className="text-6xl">🔍</div>
                        <h4 className="text-xl font-semibold">No Images Selected</h4>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Switch to other comparison modes and hover over images to add them to your comparison workspace. You can select up to 4 images.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h4 className="text-xl font-semibold mb-2">Side-by-Side Comparison</h4>
                          <p className="text-muted-foreground">
                            Compare {selectedForComparison.length} selected images to understand creative decisions and variations.
                          </p>
                        </div>
                        
                        <div className={`grid gap-6 ${
                          selectedForComparison.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                          selectedForComparison.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                          selectedForComparison.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                        }`}>
                          {selectedForComparison.map((image, index) => (
                            <Card key={image.id} className="relative overflow-hidden">
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 z-20 w-6 h-6 p-0"
                                onClick={() => toggleImageSelection(image)}
                              >
                                ×
                              </Button>
                              
                              <div 
                                className="relative cursor-pointer bg-muted rounded-lg overflow-hidden"
                                onClick={() => setSelectedImage(image)}
                              >
                                <ResilientImage
                                  image={image}
                                  onDownload={handleDownload}
                                  showMetadata={false}
                                  className="w-full"
                                />
                                
                                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {formatPerspective(image.perspective as CreativePerspective)}
                                  </Badge>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      image.learningStatus === 'final_version' ? 'bg-green-50 text-green-700 border-green-200' :
                                      image.learningStatus === 'learning_attempt' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                      'bg-purple-50 text-purple-700 border-purple-200'
                                    }`}
                                  >
                                    {formatLearningStatus(image.learningStatus as LearningStatus)}
                                  </Badge>
                                </div>
                              </div>
                              
                              <CardContent className="p-4 space-y-3">
                                <h5 className="font-medium text-sm">{image.title}</h5>
                                <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                                
                                {image.rejectionReason && (
                                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                                    <p className="text-xs text-red-700 dark:text-red-300">
                                      <span className="font-medium">Rejected:</span> {image.rejectionReason}
                                    </p>
                                  </div>
                                )}
                                
                                <div className="text-xs text-muted-foreground">
                                  {image.downloadCount} downloads
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Fallback for empty states */}
                {comparisonMode === "sessions" && sessions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-muted-foreground">No creative sessions available for comparison.</p>
                  </div>
                )}
                
                {(comparisonMode === "perspectives" || comparisonMode === "quality") && allImages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-muted-foreground">No images available for comparison.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Detail Drawer */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="image-detail-dialog">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedImage.title}</DialogTitle>
                <DialogDescription>
                  {selectedImage.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <img
                    src={selectedImage.filePath}
                    alt={selectedImage.description}
                    className="w-full rounded-lg shadow-lg"
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {formatPerspective(selectedImage.perspective as CreativePerspective)}
                    </Badge>
                    <Badge variant="outline">
                      {formatLearningStatus(selectedImage.learningStatus as LearningStatus)}
                    </Badge>
                    <Badge variant="outline">
                      Complexity: {selectedImage.complexityLevel}/5
                    </Badge>
                  </div>
                  
                  <Button 
                    onClick={() => handleDownload(selectedImage)}
                    className="w-full gap-2"
                    data-testid="detail-download-button"
                  >
                    <Download className="h-4 w-4" />
                    Download Full Resolution ({selectedImage.downloadCount} downloads)
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedImage.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Generation Prompt</h4>
                    <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                      {selectedImage.prompt}
                    </div>
                  </div>
                  
                  {/* Visual Generation Parameters */}
                  {selectedImage.generationParams && (
                    <div>
                      <h4 className="font-semibold mb-2">Visual Identity Parameters</h4>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        {(selectedImage.generationParams as any).colorPalette && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Color Palette:</span>
                            <Badge variant="outline" className="capitalize">
                              {String((selectedImage.generationParams as any).colorPalette)}
                            </Badge>
                          </div>
                        )}
                        {(selectedImage.generationParams as any).context?.tone && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Visual Tone:</span>
                            <Badge variant="outline" className="capitalize">
                              {String((selectedImage.generationParams as any).context.tone)}
                            </Badge>
                          </div>
                        )}
                        {(selectedImage.generationParams as any).context?.type && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Context Type:</span>
                            <Badge variant="outline" className="capitalize">
                              {String((selectedImage.generationParams as any).context.type)}
                            </Badge>
                          </div>
                        )}
                        {(selectedImage.generationParams as any).context?.detail && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Detail Level:</span>
                            <Badge variant="outline" className="capitalize">
                              {String((selectedImage.generationParams as any).context.detail)}
                            </Badge>
                          </div>
                        )}
                        {(selectedImage.generationParams as any).background && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Background:</span>
                            <Badge variant="outline" className="capitalize">
                              {String((selectedImage.generationParams as any).background)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        These parameters create the distinct visual identity for each perspective.
                      </p>
                    </div>
                  )}
                  
                  {/* Quality Decomposition in Dialog */}
                  {(() => {
                    const insight = getQualityInsight(selectedImage.learningStatus as LearningStatus, selectedImage.rejectionReason || undefined);
                    return (
                      <div>
                        <h4 className="font-semibold mb-2">Quality Assessment</h4>
                        <div className={`p-4 rounded-lg border ${insight.bgColor}`}>
                          <div className={`text-sm font-medium mb-2 ${insight.textColor}`}>
                            {insight.category}
                          </div>
                          <p className={`text-sm ${insight.textColor} opacity-80`}>
                            {insight.rationale}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {selectedImage.rejectionReason && (
                    <div>
                      <h4 className="font-semibold mb-2">Why This Didn't Work</h4>
                      <p className="text-muted-foreground">{selectedImage.rejectionReason}</p>
                    </div>
                  )}
                  
                  {selectedImage.correctionApproach && (
                    <div>
                      <h4 className="font-semibold mb-2">How We Corrected It</h4>
                      <p className="text-muted-foreground">{selectedImage.correctionApproach}</p>
                    </div>
                  )}
                  
                  {selectedImage.designPhilosophy && (
                    <div>
                      <h4 className="font-semibold mb-2">Design Philosophy</h4>
                      <p className="text-muted-foreground">{selectedImage.designPhilosophy}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}