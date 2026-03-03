interface SemiApiResponse {
  content: string;
  success: boolean;
  error?: string;
}

interface ContentGenerationRequest {
  prompt: string;
  perspective: string;
  context: any;
  voiceProfile: any;
}

export class SemiApiService {
  private apiKey: string;
  private baseUrl: string = 'https://api.semi.pink';

  constructor() {
    this.apiKey = process.env.SEMI_API_KEY || 'chb_corporate_prod_7f2e9a8b4c1d6e3f8a2b5c9d1e4f7a3b';
  }

  async generateContent(request: ContentGenerationRequest): Promise<SemiApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Client': 'chb-corporate-website',
        },
        body: JSON.stringify({
          prompt: this.buildContextualPrompt(request),
          temperature: 0.7,
          max_tokens: 1000,
          voice_profile: request.voiceProfile,
          context: {
            perspective: request.perspective,
            brand: 'CHB',
            company_context: 'AI innovation company for traditionalists & dissidents',
            ...request.context,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Semi API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        content: data.content || data.text || '',
        success: true,
      };
    } catch (error) {
      console.error('Semi API Error:', error);
      return {
        content: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private buildContextualPrompt(request: ContentGenerationRequest): string {
    const { prompt, perspective, context, voiceProfile } = request;
    
    const contextualPrefix = `
You are writing content for CHB (Colon Hyphen Bracket), an AI innovation company for traditionalists & dissidents.

Perspective: ${perspective}
Voice characteristics: ${JSON.stringify(voiceProfile.voiceCharacteristics)}
Contextual knowledge: ${JSON.stringify(voiceProfile.contextualKnowledge)}

Company context:
- CHB builds punctuation-named AI tools (#Hash, ;Semi, !Workshop, ?Scout)
- Focus on AI innovation for traditionalists & dissidents with constitutional governance
- Values privacy, accessibility, and human-centered design
- Serves real people who want technology to make sense

Content request: ${prompt}

Additional context: ${JSON.stringify(context)}

Write content that aligns with the specified perspective and voice characteristics. Be authentic and avoid generic marketing language.
    `;

    return contextualPrefix.trim();
  }

  async validateConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const semiApi = new SemiApiService();
