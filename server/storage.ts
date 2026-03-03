import { type ContentProfile, type InsertContentProfile, type ContentRequest, type InsertContentRequest, type AnalyticsPageVisit, type InsertAnalyticsPageVisit, type AnalyticsNavigation, type InsertAnalyticsNavigation, type CreativeSession, type InsertCreativeSession, type CreativeImage, type InsertCreativeImage, type JourneyStage, type LearningStatus, type CreativePerspective, type User, type UpsertUser, type OAuthClient, type InsertOAuthClient, type AuthorizationCode, type InsertAuthorizationCode, type AccessToken, type InsertAccessToken } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { contentProfiles, contentRequests, analyticsPageVisit, analyticsNavigation, creativeSessions, creativeImages, users, oauthClients, authorizationCodes, accessTokens } from "@shared/schema";
import { eq, desc, and, or, ilike, lt } from "drizzle-orm";

export interface IStorage {
  // User operations (for email/password + NOSTR auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: UpsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByNostrPubkey(pubkey: string): Promise<User | undefined>;
  linkNostrToUser(userId: string, nostrPubkey: string, nostrNpub: string): Promise<User | undefined>;
  
  // Content Profiles
  getContentProfile(id: string): Promise<ContentProfile | undefined>;
  getContentProfileByPerspective(perspective: string): Promise<ContentProfile | undefined>;
  createContentProfile(profile: InsertContentProfile): Promise<ContentProfile>;
  updateContentProfile(id: string, profile: Partial<ContentProfile>): Promise<ContentProfile | undefined>;
  
  // Content Requests
  getContentRequest(id: string): Promise<ContentRequest | undefined>;
  getContentRequestByKey(contentKey: string, perspective: string): Promise<ContentRequest | undefined>;
  createContentRequest(request: InsertContentRequest): Promise<ContentRequest>;
  updateContentRequest(id: string, request: Partial<ContentRequest>): Promise<ContentRequest | undefined>;
  getApprovedContentRequests(): Promise<ContentRequest[]>;
  
  // Analytics
  createPageVisit(visit: InsertAnalyticsPageVisit): Promise<AnalyticsPageVisit>;
  updatePageVisitTimeSpent(id: string, timeSpent: string): Promise<AnalyticsPageVisit | undefined>;
  createNavigation(navigation: InsertAnalyticsNavigation): Promise<AnalyticsNavigation>;
  getPageVisits(): Promise<AnalyticsPageVisit[]>;
  getNavigations(): Promise<AnalyticsNavigation[]>;
  getAnalyticsSummary(): Promise<{
    totalVisits: number;
    uniqueSessions: number;
    topPages: Array<{ path: string; visits: number }>;
    topReferrers: Array<{ referrer: string; visits: number }>;
    avgTimeSpent: number;
  }>;
  
  // Creative Process Gallery
  // Creative Sessions
  getCreativeSession(id: string): Promise<CreativeSession | undefined>;
  getCreativeSessions(): Promise<CreativeSession[]>;
  getCreativeSessionsByJourneyStage(stage: JourneyStage): Promise<CreativeSession[]>;
  createCreativeSession(session: InsertCreativeSession): Promise<CreativeSession>;
  updateCreativeSession(id: string, session: Partial<CreativeSession>): Promise<CreativeSession | undefined>;
  deleteCreativeSession(id: string): Promise<boolean>;
  
  // Creative Images
  getCreativeImage(id: string): Promise<CreativeImage | undefined>;
  getCreativeImages(): Promise<CreativeImage[]>;
  getCreativeImagesBySession(sessionId: string): Promise<CreativeImage[]>;
  getCreativeImagesByPerspective(perspective: CreativePerspective): Promise<CreativeImage[]>;
  getCreativeImagesByLearningStatus(status: LearningStatus): Promise<CreativeImage[]>;
  searchCreativeImages(filters: {
    journeyStage?: JourneyStage;
    perspective?: CreativePerspective;
    learningStatus?: LearningStatus;
    searchTerm?: string;
  }): Promise<CreativeImage[]>;
  createCreativeImage(image: InsertCreativeImage): Promise<CreativeImage>;
  updateCreativeImage(id: string, image: Partial<CreativeImage>): Promise<CreativeImage | undefined>;
  deleteCreativeImage(id: string): Promise<boolean>;
  incrementImageDownload(id: string): Promise<CreativeImage | undefined>;
  
  // OAuth 2.0 Provider
  getOAuthClient(clientId: string): Promise<OAuthClient | undefined>;
  listOAuthClients(): Promise<OAuthClient[]>;
  createOAuthClient(client: InsertOAuthClient): Promise<OAuthClient>;
  createAuthorizationCode(code: InsertAuthorizationCode): Promise<AuthorizationCode>;
  getAuthorizationCode(code: string): Promise<AuthorizationCode | undefined>;
  markAuthorizationCodeUsed(code: string): Promise<void>;
  createAccessToken(token: InsertAccessToken): Promise<AccessToken>;
  getAccessToken(token: string): Promise<AccessToken | undefined>;
  cleanupExpiredTokens(): Promise<void>;
}

// We've migrated to DatabaseStorage - MemStorage removed

// Database storage implementation migrated from MemStorage

export class DatabaseStorage implements IStorage {
  // Content Profiles
  async getContentProfile(id: string): Promise<ContentProfile | undefined> {
    const [profile] = await db.select().from(contentProfiles).where(eq(contentProfiles.id, id));
    return profile || undefined;
  }

  async getContentProfileByPerspective(perspective: string): Promise<ContentProfile | undefined> {
    const [profile] = await db.select().from(contentProfiles).where(eq(contentProfiles.perspective, perspective));
    return profile || undefined;
  }

  async createContentProfile(insertProfile: InsertContentProfile): Promise<ContentProfile> {
    const [profile] = await db.insert(contentProfiles).values(insertProfile).returning();
    return profile;
  }

  async updateContentProfile(id: string, update: Partial<ContentProfile>): Promise<ContentProfile | undefined> {
    const [profile] = await db.update(contentProfiles)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(contentProfiles.id, id))
      .returning();
    return profile || undefined;
  }

  // Content Requests
  async getContentRequest(id: string): Promise<ContentRequest | undefined> {
    const [request] = await db.select().from(contentRequests).where(eq(contentRequests.id, id));
    return request || undefined;
  }

  async getContentRequestByKey(contentKey: string, perspective: string): Promise<ContentRequest | undefined> {
    const [request] = await db.select().from(contentRequests)
      .where(and(
        eq(contentRequests.contentKey, contentKey),
        eq(contentRequests.perspective, perspective)
      ));
    return request || undefined;
  }

  async createContentRequest(insertRequest: InsertContentRequest): Promise<ContentRequest> {
    const [request] = await db.insert(contentRequests).values(insertRequest).returning();
    return request;
  }

  async updateContentRequest(id: string, update: Partial<ContentRequest>): Promise<ContentRequest | undefined> {
    const [request] = await db.update(contentRequests)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(contentRequests.id, id))
      .returning();
    return request || undefined;
  }

  async getApprovedContentRequests(): Promise<ContentRequest[]> {
    return await db.select().from(contentRequests).where(eq(contentRequests.isApproved, true));
  }

  // Analytics
  async createPageVisit(visit: InsertAnalyticsPageVisit): Promise<AnalyticsPageVisit> {
    const [pageVisit] = await db.insert(analyticsPageVisit).values(visit).returning();
    return pageVisit;
  }

  async updatePageVisitTimeSpent(id: string, timeSpent: string): Promise<AnalyticsPageVisit | undefined> {
    const [pageVisit] = await db.update(analyticsPageVisit)
      .set({ timeSpent })
      .where(eq(analyticsPageVisit.id, id))
      .returning();
    return pageVisit || undefined;
  }

  async createNavigation(navigation: InsertAnalyticsNavigation): Promise<AnalyticsNavigation> {
    const [nav] = await db.insert(analyticsNavigation).values(navigation).returning();
    return nav;
  }

  async getPageVisits(): Promise<AnalyticsPageVisit[]> {
    return await db.select().from(analyticsPageVisit).orderBy(desc(analyticsPageVisit.timestamp));
  }

  async getNavigations(): Promise<AnalyticsNavigation[]> {
    return await db.select().from(analyticsNavigation).orderBy(desc(analyticsNavigation.timestamp));
  }

  async getAnalyticsSummary(): Promise<{
    totalVisits: number;
    uniqueSessions: number;
    topPages: Array<{ path: string; visits: number }>;
    topReferrers: Array<{ referrer: string; visits: number }>;
    avgTimeSpent: number;
  }> {
    const visits = await this.getPageVisits();
    
    const actualVisits = visits.filter(visit => 
      visit.referrer !== null || !visit.timeSpent
    );
    
    const uniqueSessions = new Set(actualVisits.map(v => v.sessionId)).size;
    
    const pageCounts = new Map<string, number>();
    actualVisits.forEach(visit => {
      pageCounts.set(visit.path, (pageCounts.get(visit.path) || 0) + 1);
    });
    const topPages = Array.from(pageCounts.entries())
      .map(([path, visits]) => ({ path, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    const referrerCounts = new Map<string, number>();
    actualVisits.forEach(visit => {
      if (visit.referrer) {
        referrerCounts.set(visit.referrer, (referrerCounts.get(visit.referrer) || 0) + 1);
      }
    });
    const topReferrers = Array.from(referrerCounts.entries())
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    const timeSpentValues = visits
      .filter(v => v.timeSpent)
      .map(v => parseInt(v.timeSpent || '0'))
      .filter(t => t > 0);
    const avgTimeSpent = timeSpentValues.length > 0 
      ? timeSpentValues.reduce((sum, time) => sum + time, 0) / timeSpentValues.length 
      : 0;

    return {
      totalVisits: actualVisits.length,
      uniqueSessions,
      topPages,
      topReferrers,
      avgTimeSpent: Math.round(avgTimeSpent),
    };
  }

  // Creative Process Gallery Methods
  async getCreativeSession(id: string): Promise<CreativeSession | undefined> {
    const [session] = await db.select().from(creativeSessions).where(eq(creativeSessions.id, id));
    return session || undefined;
  }

  async getCreativeSessions(): Promise<CreativeSession[]> {
    return await db.select().from(creativeSessions).orderBy(desc(creativeSessions.sessionDate));
  }

  async getCreativeSessionsByJourneyStage(stage: JourneyStage): Promise<CreativeSession[]> {
    return await db.select().from(creativeSessions)
      .where(eq(creativeSessions.journeyStage, stage))
      .orderBy(desc(creativeSessions.sessionDate));
  }

  async createCreativeSession(insertSession: InsertCreativeSession): Promise<CreativeSession> {
    const [session] = await db.insert(creativeSessions).values(insertSession).returning();
    return session;
  }

  async updateCreativeSession(id: string, update: Partial<CreativeSession>): Promise<CreativeSession | undefined> {
    const [session] = await db.update(creativeSessions)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(creativeSessions.id, id))
      .returning();
    return session || undefined;
  }

  async deleteCreativeSession(id: string): Promise<boolean> {
    // Delete associated images first
    await db.delete(creativeImages).where(eq(creativeImages.sessionId, id));
    
    const result = await db.delete(creativeSessions).where(eq(creativeSessions.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getCreativeImage(id: string): Promise<CreativeImage | undefined> {
    const [image] = await db.select().from(creativeImages).where(eq(creativeImages.id, id));
    return image || undefined;
  }

  async getCreativeImages(): Promise<CreativeImage[]> {
    return await db.select().from(creativeImages).orderBy(desc(creativeImages.createdAt));
  }

  async getCreativeImagesBySession(sessionId: string): Promise<CreativeImage[]> {
    return await db.select().from(creativeImages)
      .where(eq(creativeImages.sessionId, sessionId))
      .orderBy(desc(creativeImages.createdAt));
  }

  async getCreativeImagesByPerspective(perspective: CreativePerspective): Promise<CreativeImage[]> {
    return await db.select().from(creativeImages)
      .where(eq(creativeImages.perspective, perspective))
      .orderBy(desc(creativeImages.createdAt));
  }

  async getCreativeImagesByLearningStatus(status: LearningStatus): Promise<CreativeImage[]> {
    return await db.select().from(creativeImages)
      .where(eq(creativeImages.learningStatus, status))
      .orderBy(desc(creativeImages.createdAt));
  }

  async searchCreativeImages(filters: {
    journeyStage?: JourneyStage;
    perspective?: CreativePerspective;
    learningStatus?: LearningStatus;
    searchTerm?: string;
  }): Promise<CreativeImage[]> {
    const conditions = [];

    if (filters.journeyStage) {
      // Join with sessions to filter by journey stage
      const sessionsInStage = await this.getCreativeSessionsByJourneyStage(filters.journeyStage);
      const sessionIds = sessionsInStage.map(s => s.id);
      if (sessionIds.length > 0) {
        conditions.push(or(...sessionIds.map(id => eq(creativeImages.sessionId, id))));
      }
    }

    if (filters.perspective) {
      conditions.push(eq(creativeImages.perspective, filters.perspective));
    }

    if (filters.learningStatus) {
      conditions.push(eq(creativeImages.learningStatus, filters.learningStatus));
    }

    if (filters.searchTerm) {
      const term = `%${filters.searchTerm.toLowerCase()}%`;
      conditions.push(or(
        ilike(creativeImages.title, term),
        ilike(creativeImages.description, term),
        ilike(creativeImages.extendedDescription, term),
        ilike(creativeImages.prompt, term),
        ilike(creativeImages.rejectionReason, term),
        ilike(creativeImages.searchKeywords, term),
        ilike(creativeImages.correctionApproach, term),
        ilike(creativeImages.designPhilosophy, term)
      ));
    }

    if (conditions.length > 0) {
      return await db.select().from(creativeImages)
        .where(and(...conditions))
        .orderBy(desc(creativeImages.createdAt));
    }

    return await db.select().from(creativeImages).orderBy(desc(creativeImages.createdAt));
  }

  async createCreativeImage(insertImage: InsertCreativeImage): Promise<CreativeImage> {
    const [image] = await db.insert(creativeImages).values(insertImage).returning();
    return image;
  }

  async updateCreativeImage(id: string, update: Partial<CreativeImage>): Promise<CreativeImage | undefined> {
    const [image] = await db.update(creativeImages)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(creativeImages.id, id))
      .returning();
    return image || undefined;
  }

  async deleteCreativeImage(id: string): Promise<boolean> {
    const result = await db.delete(creativeImages).where(eq(creativeImages.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async incrementImageDownload(id: string): Promise<CreativeImage | undefined> {
    const existing = await this.getCreativeImage(id);
    if (!existing) return undefined;
    
    const currentCount = parseInt(existing.downloadCount || "0");
    const currentActualDownloads = parseInt(existing.actualDownloads || "0");
    
    return await this.updateCreativeImage(id, {
      downloadCount: (currentCount + 1).toString(),
      actualDownloads: (currentActualDownloads + 1).toString()
    });
  }

  // User operations (for email/password + NOSTR auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return user || undefined;
  }

  async createUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        email: userData.email?.toLowerCase(),
      })
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByNostrPubkey(pubkey: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.nostrPubkey, pubkey));
    return user || undefined;
  }

  async linkNostrToUser(userId: string, nostrPubkey: string, nostrNpub: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ nostrPubkey, nostrNpub, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  // OAuth 2.0 Provider Methods
  async getOAuthClient(clientId: string): Promise<OAuthClient | undefined> {
    const [client] = await db.select().from(oauthClients).where(eq(oauthClients.clientId, clientId));
    return client || undefined;
  }

  async listOAuthClients(): Promise<OAuthClient[]> {
    return await db.select().from(oauthClients);
  }

  async createOAuthClient(client: InsertOAuthClient): Promise<OAuthClient> {
    const [created] = await db.insert(oauthClients).values(client).returning();
    return created;
  }

  async createAuthorizationCode(code: InsertAuthorizationCode): Promise<AuthorizationCode> {
    const [created] = await db.insert(authorizationCodes).values(code).returning();
    return created;
  }

  async getAuthorizationCode(code: string): Promise<AuthorizationCode | undefined> {
    const [authCode] = await db.select().from(authorizationCodes).where(eq(authorizationCodes.code, code));
    return authCode || undefined;
  }

  async markAuthorizationCodeUsed(code: string): Promise<void> {
    await db.update(authorizationCodes)
      .set({ usedAt: new Date() })
      .where(eq(authorizationCodes.code, code));
  }

  async createAccessToken(token: InsertAccessToken): Promise<AccessToken> {
    const [created] = await db.insert(accessTokens).values(token).returning();
    return created;
  }

  async getAccessToken(token: string): Promise<AccessToken | undefined> {
    const [accessToken] = await db.select().from(accessTokens).where(eq(accessTokens.token, token));
    return accessToken || undefined;
  }

  async cleanupExpiredTokens(): Promise<void> {
    const now = new Date();
    await db.delete(authorizationCodes).where(lt(authorizationCodes.expiresAt, now));
    await db.delete(accessTokens).where(lt(accessTokens.expiresAt, now));
  }
}

export const storage = new DatabaseStorage();
