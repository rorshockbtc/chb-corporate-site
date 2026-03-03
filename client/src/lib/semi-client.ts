import { apiRequest } from "./queryClient";
import type { ContentGenerationRequest, ContentGenerationResponse } from "@/types/content";

export class SemiClient {
  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    try {
      const response = await apiRequest("POST", "/api/content/generate", request);
      return await response.json();
    } catch (error) {
      console.error("Semi client error:", error);
      return {
        content: "",
        cached: false,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getApprovedContent() {
    try {
      const response = await apiRequest("GET", "/api/content/approved");
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch approved content:", error);
      return [];
    }
  }

  async getVoiceProfile(perspective: string) {
    try {
      const response = await apiRequest("GET", `/api/profiles/${perspective}`);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch voice profile:", error);
      return null;
    }
  }

  async checkHealth() {
    try {
      const response = await apiRequest("GET", "/api/health");
      return await response.json();
    } catch (error) {
      console.error("Health check failed:", error);
      return { status: "unhealthy", error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
}

export const semiClient = new SemiClient();
