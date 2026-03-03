import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { semiApi } from "./services/semi-api";
import { GeminiImageService, type ImageGenerationParams } from "./services/gemini-image";
import { insertContentRequestSchema, perspectiveSchema, insertAnalyticsPageVisitSchema, insertAnalyticsNavigationSchema, insertCreativeSessionSchema, insertCreativeImageSchema, journeyStageSchema, learningStatusSchema, creativePerspectiveSchema } from "@shared/schema";
import { updateImageUsageInDatabase, getUsageStats, addImageUsage, removeImageUsage, scanImageUsage, type UsageLocation } from "./usage-tracking";
import { generateAssetManifest, validateDatabaseAssets, findBestMatch } from "./asset-manifest";
import { 
  generateChallenge, 
  verifyNostrLogin, 
  validateSession as validateNostrSession, 
  logout as nostrLogout,
  setUserPin,
  verifyUserPin,
  hasPin as userHasPin,
  getUser as getNostrUser
} from "./nostr-auth";
import { setupEmailAuth, isAuthenticated } from "./email-auth";
import { setupOAuthProvider } from "./oauth-provider";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

// Persistent admin session management with expiration
const SESSIONS_FILE = path.join(process.cwd(), '.admin-sessions.json');
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface AdminSession {
  id: string;
  createdAt: number;
  expiresAt: number;
}

function loadSessions(): Map<string, AdminSession> {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, 'utf-8');
      const sessions = JSON.parse(data) as AdminSession[];
      const now = Date.now();
      
      // Filter out expired sessions on load
      const validSessions = sessions.filter(s => s.expiresAt > now);
      return new Map(validSessions.map(s => [s.id, s]));
    }
  } catch (error) {
    console.error('Failed to load admin sessions:', error);
  }
  return new Map();
}

function saveSessions(sessions: Map<string, AdminSession>): void {
  try {
    const sessionsArray = Array.from(sessions.values());
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessionsArray, null, 2), { 
      encoding: 'utf-8',
      mode: 0o600 // Read/write for owner only
    });
  } catch (error) {
    console.error('Failed to save admin sessions:', error);
  }
}

const adminSessions = loadSessions();

function pruneExpiredSessions(): void {
  const now = Date.now();
  let modified = false;
  
  for (const [id, session] of Array.from(adminSessions.entries())) {
    if (session.expiresAt <= now) {
      adminSessions.delete(id);
      modified = true;
    }
  }
  
  if (modified) {
    saveSessions(adminSessions);
  }
}

// Prune expired sessions every hour
setInterval(pruneExpiredSessions, 60 * 60 * 1000);

function generateAdminSession(): string {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const now = Date.now();
  
  const session: AdminSession = {
    id: sessionId,
    createdAt: now,
    expiresAt: now + SESSION_EXPIRY_MS,
  };
  
  adminSessions.set(sessionId, session);
  saveSessions(adminSessions);
  return sessionId;
}

function isValidAdminSession(sessionId: string): boolean {
  const session = adminSessions.get(sessionId);
  if (!session) return false;
  
  const now = Date.now();
  if (session.expiresAt <= now) {
    adminSessions.delete(sessionId);
    saveSessions(adminSessions);
    return false;
  }
  
  return true;
}

// Middleware to check admin access
function requireAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  const sessionId = authHeader?.replace('Bearer ', '');
  
  if (!sessionId || !isValidAdminSession(sessionId)) {
    return res.status(401).json({ success: false, error: 'Admin access required' });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup email/password authentication
  await setupEmailAuth(app);

  // Setup OAuth 2.0 provider (Universal :-] Authentication)
  await setupOAuthProvider(app);

  // Admin authentication endpoint
  app.post("/api/admin/auth", async (req, res) => {
    try {
      const { password } = req.body;
      
      // Check password (in production, use proper hashing)
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
      
      const sessionId = generateAdminSession();
      res.json({ success: true, sessionId });
    } catch (error) {
      console.error("Admin auth error:", error);
      res.status(500).json({ success: false, error: 'Authentication failed' });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", requireAdmin, async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const sessionId = authHeader?.replace('Bearer ', '');
      
      if (sessionId && adminSessions.has(sessionId)) {
        adminSessions.delete(sessionId);
        saveSessions(adminSessions);
      }
      
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      console.error("Admin logout error:", error);
      res.status(500).json({ success: false, error: 'Logout failed' });
    }
  });

  // ==========================================
  // OAuth Client Management (Admin Only)
  // ==========================================
  
  // Register a new OAuth client (for Pipes, Hash, Semi)
  app.post("/api/admin/oauth-clients", requireAdmin, async (req, res) => {
    try {
      const { clientId, name, redirectUris, scopes } = req.body;
      
      if (!clientId || !name || !redirectUris || !Array.isArray(redirectUris)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: clientId, name, redirectUris (array)' 
        });
      }

      // Check if client already exists
      const existing = await storage.getOAuthClient(clientId);
      if (existing) {
        return res.status(409).json({ 
          success: false, 
          error: `Client '${clientId}' already exists` 
        });
      }

      const { registerOAuthClient } = await import("./oauth-provider");
      const result = await registerOAuthClient(
        clientId,
        name,
        redirectUris,
        scopes || ["openid", "profile", "email"]
      );

      res.json({ 
        success: true, 
        clientId: result.clientId,
        clientSecret: result.clientSecret,
        message: `Client '${clientId}' registered successfully. Save the clientSecret - it won't be shown again!`
      });
    } catch (error) {
      console.error("OAuth client registration error:", error);
      res.status(500).json({ success: false, error: 'Failed to register OAuth client' });
    }
  });

  // List all OAuth clients (without secrets)
  app.get("/api/admin/oauth-clients", requireAdmin, async (req, res) => {
    try {
      const clients = await storage.listOAuthClients();
      res.json({ 
        success: true, 
        clients: clients.map(c => ({
          clientId: c.clientId,
          name: c.name,
          redirectUris: c.redirectUris,
          allowedScopes: c.allowedScopes,
          isActive: c.isActive,
          createdAt: c.createdAt,
        }))
      });
    } catch (error) {
      console.error("OAuth clients list error:", error);
      res.status(500).json({ success: false, error: 'Failed to list OAuth clients' });
    }
  });

  // ==========================================
  // NOSTR NIP-07 Authentication Endpoints
  // ==========================================

  // Generate a challenge for NIP-07 signing
  app.get("/api/nostr/challenge", async (req, res) => {
    try {
      const { challenge, sessionKey } = generateChallenge();
      res.json({ 
        success: true, 
        challenge,
        sessionKey,
        expiresIn: 300 // 5 minutes in seconds
      });
    } catch (error) {
      console.error("NOSTR challenge generation error:", error);
      res.status(500).json({ success: false, error: 'Failed to generate challenge' });
    }
  });

  // Verify NIP-07 signed event and create session
  app.post("/api/nostr/login", async (req, res) => {
    try {
      const { sessionKey, pubkey, signedEvent } = req.body;
      
      if (!sessionKey || !pubkey || !signedEvent) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: sessionKey, pubkey, signedEvent' 
        });
      }

      const result = await verifyNostrLogin(sessionKey, pubkey, signedEvent);
      
      if (!result.success) {
        return res.status(401).json({ 
          success: false, 
          error: result.error 
        });
      }

      res.json({ 
        success: true, 
        sessionId: result.sessionId,
        user: {
          pubkey: result.user?.pubkey,
          npub: result.user?.npub,
          hasPin: result.user?.pinHash ? true : false
        }
      });
    } catch (error) {
      console.error("NOSTR login error:", error);
      res.status(500).json({ success: false, error: 'Login failed' });
    }
  });

  // Validate NOSTR session
  app.get("/api/nostr/session", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const sessionId = authHeader?.replace('Bearer ', '');
      
      if (!sessionId) {
        return res.status(401).json({ success: false, error: 'No session provided' });
      }

      const userAgent = req.headers['user-agent'];
      const session = validateNostrSession(sessionId, userAgent);
      if (!session) {
        return res.status(401).json({ success: false, error: 'Invalid or expired session' });
      }

      const user = getNostrUser(session.pubkey);
      
      res.json({ 
        success: true,
        user: {
          pubkey: user?.pubkey,
          npub: user?.npub,
          hasPin: user?.pinHash ? true : false
        }
      });
    } catch (error) {
      console.error("NOSTR session validation error:", error);
      res.status(500).json({ success: false, error: 'Session validation failed' });
    }
  });

  // NOSTR logout
  app.post("/api/nostr/logout", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const sessionId = authHeader?.replace('Bearer ', '');
      
      if (sessionId) {
        nostrLogout(sessionId);
      }
      
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      console.error("NOSTR logout error:", error);
      res.status(500).json({ success: false, error: 'Logout failed' });
    }
  });

  // Set PIN for NOSTR user
  app.post("/api/nostr/pin/set", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const sessionId = authHeader?.replace('Bearer ', '');
      
      if (!sessionId) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
      }

      const userAgent = req.headers['user-agent'];
      const session = validateNostrSession(sessionId, userAgent);
      if (!session) {
        return res.status(401).json({ success: false, error: 'Invalid session' });
      }

      const { pin } = req.body;
      if (!pin || !/^\d{4,6}$/.test(pin)) {
        return res.status(400).json({ 
          success: false, 
          error: 'PIN must be 4-6 digits' 
        });
      }

      const success = await setUserPin(session.pubkey, pin);
      if (!success) {
        return res.status(500).json({ success: false, error: 'Failed to set PIN' });
      }

      res.json({ success: true, message: 'PIN set successfully' });
    } catch (error) {
      console.error("Set PIN error:", error);
      res.status(500).json({ success: false, error: 'Failed to set PIN' });
    }
  });

  // Verify PIN for NOSTR user
  app.post("/api/nostr/pin/verify", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const sessionId = authHeader?.replace('Bearer ', '');
      
      if (!sessionId) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
      }

      const userAgent = req.headers['user-agent'];
      const session = validateNostrSession(sessionId, userAgent);
      if (!session) {
        return res.status(401).json({ success: false, error: 'Invalid session' });
      }

      const { pin } = req.body;
      if (!pin) {
        return res.status(400).json({ success: false, error: 'PIN required' });
      }

      const result = await verifyUserPin(session.pubkey, pin);
      
      if (result.retryAfter) {
        return res.status(429).json({ 
          success: false, 
          error: 'Too many attempts. Please try again later.',
          retryAfter: result.retryAfter
        });
      }
      
      res.json({ 
        success: result.success, 
        verified: result.verified 
      });
    } catch (error) {
      console.error("Verify PIN error:", error);
      res.status(500).json({ success: false, error: 'PIN verification failed' });
    }
  });

  // Check if user has PIN set
  app.get("/api/nostr/pin/status", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const sessionId = authHeader?.replace('Bearer ', '');
      
      if (!sessionId) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
      }

      const userAgent = req.headers['user-agent'];
      const session = validateNostrSession(sessionId, userAgent);
      if (!session) {
        return res.status(401).json({ success: false, error: 'Invalid session' });
      }

      const hasPin = userHasPin(session.pubkey);
      
      res.json({ success: true, hasPin });
    } catch (error) {
      console.error("PIN status error:", error);
      res.status(500).json({ success: false, error: 'Failed to check PIN status' });
    }
  });

  // Content generation endpoint
  app.post("/api/content/generate", async (req, res) => {
    try {
      const { contentKey, perspective, prompt, context } = req.body;
      
      // Validate input
      const validPerspective = perspectiveSchema.parse(perspective);
      
      // Check if content already exists and is approved
      const existing = await storage.getContentRequestByKey(contentKey, validPerspective);
      if (existing && existing.isApproved && existing.generatedContent) {
        return res.json({
          content: existing.generatedContent,
          cached: true,
          success: true,
        });
      }

      // Get voice profile for perspective
      const profile = await storage.getContentProfileByPerspective(validPerspective);
      if (!profile) {
        return res.status(404).json({ error: "Voice profile not found for perspective" });
      }

      // Generate content using Semi API
      const generationResult = await semiApi.generateContent({
        prompt,
        perspective: validPerspective,
        context: context || {},
        voiceProfile: profile,
      });

      if (!generationResult.success) {
        return res.status(500).json({ 
          error: "Failed to generate content", 
          details: generationResult.error 
        });
      }

      // Store the generated content
      const contentRequest = await storage.createContentRequest({
        contentKey,
        perspective: validPerspective,
        prompt,
        generatedContent: generationResult.content,
        isApproved: false, // Requires manual approval
        profileId: profile.id,
      });

      res.json({
        content: generationResult.content,
        cached: false,
        success: true,
        requestId: contentRequest.id,
      });
    } catch (error) {
      console.error("Content generation error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get approved content
  app.get("/api/content/approved", async (req, res) => {
    try {
      const approvedContent = await storage.getApprovedContentRequests();
      res.json(approvedContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch approved content" });
    }
  });

  // Content approval endpoint (for content management)
  app.post("/api/content/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateContentRequest(id, { isApproved: true });
      
      if (!updated) {
        return res.status(404).json({ error: "Content request not found" });
      }

      res.json({ success: true, content: updated });
    } catch (error) {
      res.status(500).json({ error: "Failed to approve content" });
    }
  });

  // Voice profile management
  app.get("/api/profiles", async (req, res) => {
    try {
      // Get all profiles (in a real app, this would be paginated)
      const profiles = await storage.getApprovedContentRequests();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  });

  app.get("/api/profiles/:perspective", async (req, res) => {
    try {
      const { perspective } = req.params;
      const validPerspective = perspectiveSchema.parse(perspective);
      const profile = await storage.getContentProfileByPerspective(validPerspective);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Image generation endpoints
  app.post("/api/images/generate", async (req, res) => {
    try {
      const params: ImageGenerationParams = req.body;
      
      // Basic validation
      if (!params.prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      console.log("Generating image with params:", params);
      
      const result = await GeminiImageService.generateImage(params);
      
      if (!result.success) {
        return res.status(500).json({ 
          error: "Image generation failed", 
          details: result.error 
        });
      }

      res.json({
        success: true,
        imageUrl: result.imageUrl,
        metadata: result.metadata,
      });
    } catch (error) {
      console.error("Image generation endpoint error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Test image generation with different complexity levels
  app.post("/api/images/test-complexity", async (req, res) => {
    try {
      const { basePrompt } = req.body;
      
      if (!basePrompt) {
        return res.status(400).json({ error: "Base prompt is required" });
      }

      // Generate images at different complexity levels
      const complexityLevels = [20, 50, 80];
      const results = [];

      for (const complexity of complexityLevels) {
        const result = await GeminiImageService.generateImage({
          prompt: basePrompt,
          complexity,
          background: "transparent",
          perspective: "startup_founders",
          seed: 42,
        });
        
        results.push({
          complexity,
          ...result,
        });
      }

      res.json({
        success: true,
        results,
      });
    } catch (error) {
      console.error("Complexity test error:", error);
      res.status(500).json({ 
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Semi chat endpoint - uses public anonymous API
  app.post("/api/semi/chat", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: "Question is required and must be a string" 
        });
      }

      // Make request to Semi's public anonymous API endpoint
      const response = await fetch('https://semi.pink/api/chb-corporate/public-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question
        })
      });

      // Check if response is HTML (indicates endpoint not available)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        // Fallback response when Semi API is not available
        const fallbackResponse = `Hi! I'm Semi, CHB's AI assistant. While our full API is being set up, here's what I can tell you:

CHB (Colon Hyphen Bracket) is an AI innovation company building tools for traditional & unconventional users. Our punctuation-named ecosystem includes:

• Hash (#) - Knowledge management for creative minds
• Semi (;) - AI writing partner with memory 
• Scout (&) - Lightning-fast pattern recognition
• Workshop (!) - Constitutional AI governance

We focus on perspective-aware technology that adapts content for different audiences. Feel free to explore our products page or contact us directly for more specific questions!`;

        return res.json({
          success: true,
          content: fallbackResponse
        });
      }

      if (!response.ok) {
        throw new Error(`Semi API responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.answer) {
        throw new Error('No answer received from Semi API');
      }

      res.json({
        success: true,
        content: data.answer
      });
    } catch (error) {
      console.error("Semi chat error:", error);
      res.status(500).json({ 
        success: false,
        error: "Failed to get response from Semi",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Mass populate images from filesystem
  app.post("/api/creative/assets/mass-populate", async (req, res) => {
    try {
      const { massPopulateImages } = await import('./mass-population');
      const result = await massPopulateImages();
      
      res.json({
        success: true,
        result
      });
    } catch (error) {
      console.error('Mass population failed:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to populate images",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Analytics endpoints
  app.post("/api/analytics/page-visit", async (req, res) => {
    try {
      const validatedData = insertAnalyticsPageVisitSchema.parse(req.body);
      const pageVisit = await storage.createPageVisit(validatedData);
      res.json({ success: true, id: pageVisit.id });
    } catch (error) {
      console.error("Analytics page visit error:", error);
      res.status(400).json({ 
        error: "Invalid page visit data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.patch("/api/analytics/page-visit/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { timeSpent } = req.body;
      const updatedVisit = await storage.updatePageVisitTimeSpent(id, timeSpent);
      if (!updatedVisit) {
        return res.status(404).json({ error: "Page visit not found" });
      }
      res.json({ success: true, id: updatedVisit.id });
    } catch (error) {
      console.error("Analytics time update error:", error);
      res.status(400).json({ 
        error: "Invalid time update data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST endpoint for sendBeacon time updates (sendBeacon only supports POST)
  app.post("/api/analytics/page-visit/:id/time", async (req, res) => {
    try {
      const { id } = req.params;
      const { timeSpent } = req.body;
      const updatedVisit = await storage.updatePageVisitTimeSpent(id, timeSpent);
      if (!updatedVisit) {
        return res.status(404).json({ error: "Page visit not found" });
      }
      res.json({ success: true, id: updatedVisit.id });
    } catch (error) {
      console.error("Analytics sendBeacon time update error:", error);
      res.status(400).json({ 
        error: "Invalid time update data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/analytics/navigation", async (req, res) => {
    try {
      const validatedData = insertAnalyticsNavigationSchema.parse(req.body);
      const navigation = await storage.createNavigation(validatedData);
      res.json({ success: true, id: navigation.id });
    } catch (error) {
      console.error("Analytics navigation error:", error);
      res.status(400).json({ 
        error: "Invalid navigation data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/analytics/summary", async (req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      console.error("Analytics summary error:", error);
      res.status(500).json({ 
        error: "Failed to get analytics summary",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/analytics/visits", async (req, res) => {
    try {
      const visits = await storage.getPageVisits();
      res.json(visits);
    } catch (error) {
      console.error("Analytics visits error:", error);
      res.status(500).json({ 
        error: "Failed to get page visits",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/analytics/navigations", async (req, res) => {
    try {
      const navigations = await storage.getNavigations();
      res.json(navigations);
    } catch (error) {
      console.error("Analytics navigations error:", error);
      res.status(500).json({ 
        error: "Failed to get navigations",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Creative Process Gallery Routes
  // Creative Sessions
  app.get("/api/creative/sessions", async (req, res) => {
    try {
      const { journeyStage } = req.query;
      let sessions;
      
      if (journeyStage && typeof journeyStage === 'string') {
        const validStage = journeyStageSchema.parse(journeyStage);
        sessions = await storage.getCreativeSessionsByJourneyStage(validStage);
      } else {
        sessions = await storage.getCreativeSessions();
      }
      
      res.json({ success: true, sessions });
    } catch (error) {
      console.error("Get creative sessions error:", error);
      res.status(400).json({ 
        error: "Failed to get creative sessions",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/creative/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getCreativeSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Creative session not found" });
      }
      res.json({ success: true, session });
    } catch (error) {
      console.error("Get creative session error:", error);
      res.status(500).json({ 
        error: "Failed to get creative session",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/creative/sessions", async (req, res) => {
    try {
      const validatedData = insertCreativeSessionSchema.parse(req.body);
      const session = await storage.createCreativeSession(validatedData);
      res.json({ success: true, session });
    } catch (error) {
      console.error("Create creative session error:", error);
      res.status(400).json({ 
        error: "Invalid session data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Creative Images
  app.get("/api/creative/images", async (req, res) => {
    try {
      const { sessionId, perspective, learningStatus, journeyStage, searchTerm } = req.query;
      let images;

      if (sessionId && typeof sessionId === 'string') {
        images = await storage.getCreativeImagesBySession(sessionId);
      } else if (perspective || learningStatus || journeyStage || searchTerm) {
        const filters: any = {};
        
        if (perspective && typeof perspective === 'string') {
          filters.perspective = creativePerspectiveSchema.parse(perspective);
        }
        if (learningStatus && typeof learningStatus === 'string') {
          filters.learningStatus = learningStatusSchema.parse(learningStatus);
        }
        if (journeyStage && typeof journeyStage === 'string') {
          filters.journeyStage = journeyStageSchema.parse(journeyStage);
        }
        if (searchTerm && typeof searchTerm === 'string') {
          filters.searchTerm = searchTerm;
        }
        
        images = await storage.searchCreativeImages(filters);
      } else {
        images = await storage.getCreativeImages();
      }
      
      res.json({ success: true, images });
    } catch (error) {
      console.error("Get creative images error:", error);
      res.status(400).json({ 
        error: "Failed to get creative images",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/creative/images/:id", async (req, res) => {
    try {
      const image = await storage.getCreativeImage(req.params.id);
      if (!image) {
        return res.status(404).json({ error: "Creative image not found" });
      }
      res.json({ success: true, image });
    } catch (error) {
      console.error("Get creative image error:", error);
      res.status(500).json({ 
        error: "Failed to get creative image",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/creative/images", async (req, res) => {
    try {
      const validatedData = insertCreativeImageSchema.parse(req.body);
      const image = await storage.createCreativeImage(validatedData);
      res.json({ success: true, image });
    } catch (error) {
      console.error("Create creative image error:", error);
      res.status(400).json({ 
        error: "Invalid image data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.patch("/api/creative/images/:id", requireAdmin, async (req, res) => {
    try {
      const image = await storage.updateCreativeImage(req.params.id, req.body);
      if (!image) {
        return res.status(404).json({ error: "Creative image not found" });
      }
      res.json({ success: true, image });
    } catch (error) {
      console.error("Update creative image error:", error);
      res.status(500).json({ 
        error: "Failed to update creative image",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/creative/images/:id/download", async (req, res) => {
    try {
      const image = await storage.incrementImageDownload(req.params.id);
      if (!image) {
        return res.status(404).json({ error: "Creative image not found" });
      }
      res.json({ success: true, downloadCount: image.downloadCount });
    } catch (error) {
      console.error("Increment download error:", error);
      res.status(500).json({ 
        error: "Failed to increment download count",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Asset validation endpoint
  app.get("/api/creative/assets/validate", async (req, res) => {
    try {
      const images = await storage.getCreativeImages();
      const dbImages = images.map(img => ({ filename: img.filename, filePath: img.filePath }));
      
      const validation = await validateDatabaseAssets(dbImages);
      const manifest = await generateAssetManifest();
      
      res.json({
        success: true,
        validation,
        availableAssets: manifest.length,
        brokenImages: validation.invalid.length,
        workingImages: validation.valid.length,
        manifest: manifest.slice(0, 20) // Return first 20 for debugging
      });
    } catch (error) {
      console.error("Asset validation error:", error);
      res.status(500).json({ 
        error: "Failed to validate assets",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Auto-repair broken assets endpoint
  app.post("/api/creative/assets/repair", async (req, res) => {
    try {
      const images = await storage.getCreativeImages();
      const dbImages = images.map(img => ({ 
        id: img.id,
        filename: img.filename, 
        filePath: img.filePath 
      }));
      
      const validation = await validateDatabaseAssets(dbImages);
      const manifest = await generateAssetManifest();
      const availableFiles = manifest.filter(m => m.exists).map(m => m.filename);
      
      const repairs: Array<{ id: string; oldFilename: string; newFilename: string }> = [];
      
      for (const invalid of validation.invalid) {
        const dbImage = images.find(img => img.filename === invalid.filename);
        if (dbImage) {
          const bestMatch = findBestMatch(invalid.filename, availableFiles);
          if (bestMatch) {
            const newFilePath = `/attached_assets/generated_images/${bestMatch}`;
            await storage.updateCreativeImage(dbImage.id, {
              filename: bestMatch,
              filePath: newFilePath
            });
            repairs.push({
              id: dbImage.id,
              oldFilename: invalid.filename,
              newFilename: bestMatch
            });
          }
        }
      }
      
      res.json({
        success: true,
        repairsApplied: repairs.length,
        repairs
      });
    } catch (error) {
      console.error("Asset repair error:", error);
      res.status(500).json({ 
        error: "Failed to repair assets",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Image usage tracking endpoints
  app.get("/api/creative/usage/stats", async (req, res) => {
    try {
      const stats = await getUsageStats(storage);
      res.json({ success: true, stats });
    } catch (error) {
      console.error("Get usage stats error:", error);
      res.status(500).json({ 
        error: "Failed to get usage statistics",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/creative/usage/scan", requireAdmin, async (req, res) => {
    try {
      await updateImageUsageInDatabase(storage);
      const stats = await getUsageStats(storage);
      res.json({ 
        success: true, 
        message: "Usage tracking updated successfully",
        stats 
      });
    } catch (error) {
      console.error("Scan usage error:", error);
      res.status(500).json({ 
        error: "Failed to scan image usage",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/creative/usage/scan-only", async (req, res) => {
    try {
      const usage = await scanImageUsage(storage);
      res.json({ success: true, usage });
    } catch (error) {
      console.error("Scan only error:", error);
      res.status(500).json({ 
        error: "Failed to scan for image usage",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/creative/images/:id/usage", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const usageSchema = z.object({
        page: z.string(),
        section: z.string(),
        url: z.string(),
        description: z.string().optional()
      });
      
      const usage = usageSchema.parse(req.body);
      await addImageUsage(storage, id, usage);
      
      res.json({ success: true, message: "Usage location added successfully" });
    } catch (error) {
      console.error("Add usage error:", error);
      res.status(500).json({ 
        error: "Failed to add usage location",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.delete("/api/creative/images/:id/usage/:usageIndex", async (req, res) => {
    try {
      const { id, usageIndex } = req.params;
      const index = parseInt(usageIndex, 10);
      
      if (isNaN(index)) {
        return res.status(400).json({ error: "Invalid usage index" });
      }
      
      await removeImageUsage(storage, id, index);
      res.json({ success: true, message: "Usage location removed successfully" });
    } catch (error) {
      console.error("Remove usage error:", error);
      res.status(500).json({ 
        error: "Failed to remove usage location",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint  
  app.get("/api/health", async (req, res) => {
    try {
      const semiStatus = await semiApi.validateConnection();
      const geminiStatus = await GeminiImageService.validateConnection();
      
      res.json({
        status: "healthy",
        services: {
          semi_api: semiStatus ? "connected" : "disconnected",
          gemini_images: geminiStatus ? "connected" : "disconnected",
          storage: "active",
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({ 
        status: "unhealthy", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
