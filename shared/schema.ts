import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for email/password + NOSTR auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  passwordHash: varchar("password_hash"),
  emailVerified: boolean("email_verified").default(false),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  nostrPubkey: varchar("nostr_pubkey").unique(),
  nostrNpub: varchar("nostr_npub"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const registerUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const contentProfiles = pgTable("content_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  perspective: text("perspective").notNull(), // customer, developer, designer
  voiceCharacteristics: jsonb("voice_characteristics").notNull(),
  contextualKnowledge: jsonb("contextual_knowledge").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const contentRequests = pgTable("content_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentKey: text("content_key").notNull(),
  perspective: text("perspective").notNull(),
  prompt: text("prompt").notNull(),
  generatedContent: text("generated_content"),
  isApproved: boolean("is_approved").default(false),
  profileId: varchar("profile_id").references(() => contentProfiles.id),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const insertContentProfileSchema = createInsertSchema(contentProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentRequestSchema = createInsertSchema(contentRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertContentProfile = z.infer<typeof insertContentProfileSchema>;
export type ContentProfile = typeof contentProfiles.$inferSelect;
export type InsertContentRequest = z.infer<typeof insertContentRequestSchema>;
export type ContentRequest = typeof contentRequests.$inferSelect;

// Content types for the application
export const perspectiveSchema = z.enum(["customer", "developer", "designer"]);
export type Perspective = z.infer<typeof perspectiveSchema>;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  color: z.string(),
  url: z.string().optional(),
  content: z.record(z.string(), z.string()),
});

export type Product = z.infer<typeof productSchema>;

// Analytics schema
export const analyticsPageVisit = pgTable("analytics_page_visits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").default(sql`now()`).notNull(),
  timeSpent: varchar("time_spent"), // in seconds
});

export const analyticsNavigation = pgTable("analytics_navigation", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  fromPath: text("from_path").notNull(),
  toPath: text("to_path").notNull(),
  timestamp: timestamp("timestamp").default(sql`now()`).notNull(),
});

export const insertAnalyticsPageVisitSchema = createInsertSchema(analyticsPageVisit).omit({
  id: true,
  timestamp: true,
});

export const insertAnalyticsNavigationSchema = createInsertSchema(analyticsNavigation).omit({
  id: true,
  timestamp: true,
});

export type InsertAnalyticsPageVisit = z.infer<typeof insertAnalyticsPageVisitSchema>;
export type AnalyticsPageVisit = typeof analyticsPageVisit.$inferSelect;
export type InsertAnalyticsNavigation = z.infer<typeof insertAnalyticsNavigationSchema>;
export type AnalyticsNavigation = typeof analyticsNavigation.$inferSelect;

// Creative Process Gallery Schema
export const creativeSessions = pgTable("creative_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  journeyStage: text("journey_stage").notNull(), // "early_experiments", "brand_discovery", "perspective_mastery"
  sessionDate: timestamp("session_date").notNull(),
  learningInsights: text("learning_insights"), // What we learned from this session
  nextSteps: text("next_steps"), // How we corrected issues
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const creativeImages = pgTable("creative_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").references(() => creativeSessions.id).notNull(),
  filename: text("filename").notNull(), // Original filename
  filePath: text("file_path").notNull(), // Path to image file
  title: text("title").notNull(),
  description: text("description").notNull(),
  extendedDescription: text("extended_description"), // Longer, detailed description for individual pages
  prompt: text("prompt").notNull(), // The generation prompt used
  generationParams: jsonb("generation_params"), // Complete ImageGenerationParams: colorPalette, aspectRatio, context, minimalism, etc.
  perspective: text("perspective").notNull(), // startup_founders, content_creators, memory_capturers
  learningStatus: text("learning_status").notNull(), // "final_version", "learning_attempt", "happy_accident"
  complexityLevel: varchar("complexity_level").notNull(), // 1-5 (Hungry Caterpillar to Where's Waldo)
  designPhilosophy: text("design_philosophy"), // "characters_with_agency", "abstract_imaginative", etc.
  promptEvolution: jsonb("prompt_evolution"), // Array of prompt iterations
  rejectionReason: text("rejection_reason"), // Why this image didn't work (if applicable)
  correctionApproach: text("correction_approach"), // How we tried to fix it
  tags: jsonb("tags").default(sql`'[]'`), // Array of searchable tags
  searchKeywords: text("search_keywords"), // Additional keywords for search
  licensing: text("licensing").default("Creative Commons CC0"), // License information
  usageLocations: jsonb("usage_locations").default(sql`'[]'`), // Array of where image is used [{page, section, url}]
  downloadCount: varchar("download_count").default("0"),
  actualDownloads: varchar("actual_downloads").default("0"), // Track real downloads vs display count
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Enums for creative process (defined before schemas that use them)
export const journeyStageSchema = z.enum(["early_experiments", "brand_discovery", "perspective_mastery"]);
export const learningStatusSchema = z.enum(["final_version", "learning_attempt", "happy_accident"]);
export const creativePerspectiveSchema = z.enum(["startup_founders", "content_creators", "memory_capturers"]);

export const insertCreativeSessionSchema = createInsertSchema(creativeSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  journeyStage: journeyStageSchema,
}).extend({
  sessionDate: z.coerce.date(),
});

export const insertCreativeImageSchema = createInsertSchema(creativeImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  perspective: creativePerspectiveSchema,
  learningStatus: learningStatusSchema,
});

export type InsertCreativeSession = z.infer<typeof insertCreativeSessionSchema>;
export type CreativeSession = typeof creativeSessions.$inferSelect;
export type InsertCreativeImage = z.infer<typeof insertCreativeImageSchema>;
export type CreativeImage = typeof creativeImages.$inferSelect;

export type JourneyStage = z.infer<typeof journeyStageSchema>;
export type LearningStatus = z.infer<typeof learningStatusSchema>;
export type CreativePerspective = z.infer<typeof creativePerspectiveSchema>;

// ==========================================
// OAuth 2.0 Provider Tables
// Universal :-] Authentication
// ==========================================

export const oauthClients = pgTable("oauth_clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").unique().notNull(),
  clientSecret: varchar("client_secret").notNull(),
  name: text("name").notNull(),
  redirectUris: jsonb("redirect_uris").notNull().$type<string[]>(),
  allowedScopes: jsonb("allowed_scopes").default(sql`'["openid", "profile", "email"]'`).$type<string[]>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const authorizationCodes = pgTable("authorization_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code").unique().notNull(),
  clientId: varchar("client_id").notNull(),
  userId: varchar("user_id").notNull().references(() => users.id),
  redirectUri: text("redirect_uri").notNull(),
  scope: text("scope"),
  codeChallenge: text("code_challenge"),
  codeChallengeMethod: varchar("code_challenge_method"),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accessTokens = pgTable("access_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: varchar("token").unique().notNull(),
  clientId: varchar("client_id").notNull(),
  userId: varchar("user_id").notNull().references(() => users.id),
  scope: text("scope"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type OAuthClient = typeof oauthClients.$inferSelect;
export type InsertOAuthClient = typeof oauthClients.$inferInsert;
export type AuthorizationCode = typeof authorizationCodes.$inferSelect;
export type InsertAuthorizationCode = typeof authorizationCodes.$inferInsert;
export type AccessToken = typeof accessTokens.$inferSelect;
export type InsertAccessToken = typeof accessTokens.$inferInsert;
