import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import type { CreativeImage, LearningStatus } from "@shared/schema";

// Suggested story section tags for curation
export const STORY_SECTION_TAGS = [
  { value: "story_act_1_slop", label: "Act 1: AI Slop (Hidden Punctuation)" },
  { value: "story_act_2_before", label: "Act 2: Before (Generic Farmhouse)" },
  { value: "story_act_2_after", label: "Act 2: After (Vintage Postcard)" },
  { value: "story_act_3_founders", label: "Act 3: Founders Hero" },
  { value: "story_act_3_creators", label: "Act 3: Creators Hero" },
  { value: "story_act_3_memory", label: "Act 3: Memory Hero" },
];

export const commonRejectionReasons = [
  "Too much text overlay obscures image",
  "Color palette conflicts with brand aesthetic", 
  "Composition too busy for target perspective",
  "Visual hierarchy unclear or confusing",
  "Style doesn't match intended audience",
  "Technical quality issues (resolution, artifacts)",
  "Perspective mismatch - wrong emotional tone",
  "Elements too small for web display",
  "Background conflicts with text readability",
  "Generic stock photo appearance"
];

interface ImageMetadataEditorProps {
  image: CreativeImage;
  onSave: (data: Partial<CreativeImage>) => void;
  onCancel: () => void;
  isSaving?: boolean;
  showQuickReasons?: boolean;
}

export function ImageMetadataEditor({ 
  image, 
  onSave, 
  onCancel,
  isSaving = false,
  showQuickReasons = true
}: ImageMetadataEditorProps) {
  const [editedData, setEditedData] = useState<Partial<CreativeImage>>({});
  const [customTag, setCustomTag] = useState("");

  // Initialize state from image prop
  useEffect(() => {
    // Separate story tags from actual usage objects
    const usageArray = Array.isArray(image.usageLocations) ? image.usageLocations : [];
    const storyTags = usageArray.filter((item: any) => typeof item === 'string');
    const usageObjects = usageArray.filter((item: any) => typeof item === 'object' && item !== null);
    
    setEditedData({
      title: image.title,
      description: image.description,
      extendedDescription: image.extendedDescription || "",
      rejectionReason: image.rejectionReason || "",
      learningStatus: image.learningStatus,
      usageLocations: storyTags, // Only edit story tags, preserve objects
      _preservedUsageObjects: usageObjects, // Keep objects separately
      tags: Array.isArray(image.tags) ? image.tags : [],
      searchKeywords: image.searchKeywords || "",
      licensing: image.licensing || "Creative Commons CC0",
    });
  }, [image]);

  const updateField = (field: keyof CreativeImage, value: any) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const toggleStoryTag = (tag: string) => {
    const currentTags = Array.isArray(editedData.usageLocations) ? editedData.usageLocations : [];
    updateField(
      'usageLocations',
      currentTags.includes(tag) 
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag]
    );
  };

  const addCustomTag = () => {
    if (!customTag.trim()) return;
    const currentTags = Array.isArray(editedData.tags) ? editedData.tags : [];
    if (!currentTags.includes(customTag.trim())) {
      updateField('tags', [...currentTags, customTag.trim()]);
    }
    setCustomTag("");
  };

  const removeCustomTag = (tagToRemove: string) => {
    const currentTags = Array.isArray(editedData.tags) ? editedData.tags : [];
    updateField('tags', currentTags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    // Merge story tags with preserved usage objects
    const preservedObjects = (editedData as any)._preservedUsageObjects || [];
    const storyTags = Array.isArray(editedData.usageLocations) ? editedData.usageLocations : [];
    const mergedUsageLocations = [...preservedObjects, ...storyTags];
    
    const dataToSave = {
      ...editedData,
      rejectionReason: editedData.rejectionReason?.trim() || null,
      description: editedData.description?.trim() || "",
      extendedDescription: editedData.extendedDescription?.trim() || null,
      usageLocations: mergedUsageLocations, // Merge objects and strings
    };
    
    // Remove internal field
    delete (dataToSave as any)._preservedUsageObjects;
    
    onSave(dataToSave);
  };

  const currentUsageLocations = Array.isArray(editedData.usageLocations) ? editedData.usageLocations : [];
  const currentTags = Array.isArray(editedData.tags) ? editedData.tags : [];

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={editedData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            data-testid="edit-title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={editedData.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
            data-testid="edit-description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="extended-description">Extended Description</Label>
          <Textarea
            id="extended-description"
            value={editedData.extendedDescription || ""}
            onChange={(e) => updateField("extendedDescription", e.target.value)}
            rows={4}
            placeholder="Detailed description for image detail page..."
            data-testid="edit-extended-description"
          />
        </div>
      </div>

      {/* Learning Status */}
      <div className="space-y-2">
        <Label htmlFor="learning-status">Learning Status</Label>
        <Select 
          value={editedData.learningStatus as string}
          onValueChange={(value) => updateField("learningStatus", value as LearningStatus)}
        >
          <SelectTrigger id="learning-status" data-testid="edit-learning-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="final_version">Final Version</SelectItem>
            <SelectItem value="learning_attempt">Learning Attempt</SelectItem>
            <SelectItem value="happy_accident">Happy Accident</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Story Section Tags */}
      <div className="space-y-2">
        <Label>Story Section Tags</Label>
        <p className="text-xs text-muted-foreground mb-2">
          Select which Story tab sections should display this image
        </p>
        <div className="flex flex-wrap gap-2">
          {STORY_SECTION_TAGS.map(tag => (
            <Badge
              key={tag.value}
              variant={currentUsageLocations.includes(tag.value) ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => toggleStoryTag(tag.value)}
              data-testid={`story-tag-${tag.value}`}
            >
              {currentUsageLocations.includes(tag.value) && "✓ "}
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Image Analysis (formerly Rejection Reason) */}
      <div className="space-y-2">
        <Label htmlFor="image-analysis">Image Analysis</Label>
        <p className="text-xs text-muted-foreground">
          Document quality observations, design choices, or areas for improvement
        </p>
        <Textarea
          id="image-analysis"
          value={editedData.rejectionReason || ""}
          onChange={(e) => updateField("rejectionReason", e.target.value)}
          rows={4}
          placeholder="Describe what works, what doesn't, and why..."
          data-testid="edit-image-analysis"
        />
        
        {showQuickReasons && (
          <div className="space-y-2 mt-2">
            <Label className="text-xs">Quick Analysis Templates</Label>
            <div className="flex flex-wrap gap-2">
              {commonRejectionReasons.slice(0, 6).map((reason) => (
                <Button
                  key={reason}
                  variant="outline"
                  size="sm"
                  onClick={() => updateField("rejectionReason", reason)}
                  className="text-xs"
                  data-testid={`quick-reason-${reason.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {reason}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Tags */}
      <div className="space-y-2">
        <Label>Custom Tags</Label>
        <p className="text-xs text-muted-foreground">
          Add custom tags for better organization and searchability
        </p>
        <div className="flex gap-2">
          <Input
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomTag();
              }
            }}
            placeholder="Type tag and press Enter..."
            data-testid="custom-tag-input"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCustomTag}
            disabled={!customTag.trim()}
            data-testid="add-tag-button"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {currentTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {currentTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="gap-1 pr-1"
                data-testid={`custom-tag-${index}`}
              >
                {tag}
                <button
                  onClick={() => removeCustomTag(tag)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  data-testid={`remove-tag-${index}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Search Keywords */}
      <div className="space-y-2">
        <Label htmlFor="search-keywords">Search Keywords</Label>
        <Input
          id="search-keywords"
          value={editedData.searchKeywords || ""}
          onChange={(e) => updateField("searchKeywords", e.target.value)}
          placeholder="Comma-separated keywords for search..."
          data-testid="edit-search-keywords"
        />
      </div>

      {/* Licensing */}
      <div className="space-y-2">
        <Label htmlFor="licensing">License</Label>
        <Input
          id="licensing"
          value={editedData.licensing || ""}
          onChange={(e) => updateField("licensing", e.target.value)}
          data-testid="edit-licensing"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1"
          data-testid="save-metadata"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          data-testid="cancel-metadata"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
