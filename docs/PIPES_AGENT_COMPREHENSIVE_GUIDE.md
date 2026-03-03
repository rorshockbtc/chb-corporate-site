# Pipes: Complete Agent Briefing Document

**Purpose**: This document contains EVERYTHING you need to build Pipes. Read it completely before starting. Your goal is to "one-shot" this build using all the context provided.

**Last Updated**: December 5, 2025

---

## Table of Contents

1. [Constitutional Requirements](#constitutional-requirements)
2. [What is CHB?](#what-is-chb)
3. [What is Pipes?](#what-is-pipes)
4. [The Full Vision](#the-full-vision)
5. [The CHB Ecosystem](#the-chb-ecosystem)
6. [Authentication System](#authentication-system)
7. [Technical Stack](#technical-stack)
8. [Database Schema](#database-schema)
9. [Design Philosophy](#design-philosophy)
10. [Reference Library Pattern](#reference-library-pattern)
11. [API Integration Points](#api-integration-points)
12. [User Data Flow](#user-data-flow)
13. [Monetization Strategy](#monetization-strategy)
14. [IP Protection Requirements](#ip-protection-requirements)
15. [Implementation Checklist](#implementation-checklist)

---

## Constitutional Requirements

**READ THIS FIRST. These are non-negotiable principles.**

### 1. Memory Persistence is Sacred

> "Storage is cheap. There is NO excuse for losing anything, ever. User should NEVER have to repeat themselves."

This is not a feature request - it's the foundation of everything CHB builds. The founder spent 45 minutes manually extracting 15k lines of conversation history because a previous implementation used in-memory storage that lost everything on server restart. Their exact words:

> "Making me repeat myself is slavery when I spend hours and thousands of dollars trying to get you to be on the same page. It's unacceptable."

**What this means for Pipes:**
- ALL data goes to PostgreSQL, never in-memory storage
- Every user preference, idea, and action must be persisted
- Session storage uses PostgreSQL (via connect-pg-simple)
- Update replit.md immediately with significant decisions
- Never assume you can "remember" something - write it down

### 2. Use Authentic Data Only

- No mock data or placeholder content in production paths
- No fake user data for demos
- Surface explicit error messages instead of silent fallbacks
- If something fails, tell the user why

### 3. Privacy First

- All features opt-in
- User data never sold
- Passwords hashed with bcrypt (12 salt rounds)
- Only store what's necessary

---

## What is CHB?

**CHB (Colon Hyphen Bracket, stylized as `:-]`)** is an AI innovation company focused on developing AI tools for underserved users, particularly older and traditional demographics.

### Brand Identity

- **Name**: CHB (pronounced "CHB", not "chub" or spelled out)
- **Visual**: Use the `:-]` smiley face symbol in key brand moments
- **Primary Color**: CHB Pink `#FE299E`
- **Philosophy**: "Every Pipe should be a real slice of humanity."

### Mission Stakes

1. **AI Memory Persistence**: AI's inability to retain user context is the core problem. Users shouldn't have to repeat themselves.

2. **Pipes Technology**: Building "Pipes" (Personas as a Service) to give individuals control over their own memory and context across the internet, challenging algorithmic controls.

3. **Societal Impact**: 
   - Fighting dementia through personalized memory preservation
   - Enabling advanced AI context understanding (e.g., Tesla Bot understanding family dynamics)
   - Preserving generational memory

### Brand Voice

- Sophisticated but accessible
- "Most interesting person in the world" energy
- No condescension, always challenging the user
- Business tone (use "we" not "I")
- Pink branding throughout

---

## What is Pipes?

### The Core Concept

Pipes is an **idea pipeline manager** that helps users move ideas from capture to execution. Think of it as:

- **Kanban for Ideas**: Track ideas through stages (Captured → Developing → Ready → Executing → Complete)
- **Connected to Hash**: Ideas can originate from journal entries
- **Semi-Powered**: Get AI assistance developing rough ideas into actionable plans
- **Cross-Project**: Manage ideas across multiple projects/areas of life

### User Problems Pipes Solves

1. **Idea Capture vs. Execution Gap**: Users capture many ideas in Hash but struggle to act on them
2. **Project Organization**: Need to organize ideas by project, priority, and timeline
3. **Idea Development**: Rough concepts need refinement before becoming actionable
4. **Progress Tracking**: See the full journey from idea to completion

### MVP Features

1. **Idea Cards**
   - Title, description, source (manual or from Hash entry)
   - Status: Captured → Developing → Ready → Executing → Complete
   - Priority: Now, Next, Later, Someday
   - Tags/categories
   - Links to related Hash entries

2. **Pipeline Views**
   - Kanban board (default)
   - List view with filters
   - Calendar view for deadline-based planning

3. **Hash Integration**
   - Import ideas from journal entries
   - Link Pipes items back to Hash
   - See related journal content in Pipes

4. **Semi Integration**
   - "Develop this idea" → Semi conversation
   - AI-suggested next actions
   - Pattern detection across ideas

5. **Reference Library Integration**
   - Book recommendations based on idea content
   - Historical figure parallels for inspiration
   - Zero AI cost through template matching

---

## The Full Vision

### Beyond Just Ideas

Pipes isn't just an idea tracker - it's the infrastructure for **personal context management across the internet**.

```
┌─────────────────────────────────────────────────────────────┐
│                     THE PIPES VISION                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   TODAY: Idea Pipeline Manager                               │
│   - Track ideas from capture to execution                    │
│   - Connect with Hash journaling                             │
│   - AI-assisted idea development                             │
│                                                              │
│   TOMORROW: Personal Memory Infrastructure                   │
│   - Context that follows you across apps                     │
│   - AI that knows your preferences, history, goals           │
│   - Privacy-preserving, user-controlled                      │
│                                                              │
│   FUTURE: Pipes (Personas) as a Service                      │
│   - Subscription to your own persistent AI context           │
│   - Works across any app that integrates                     │
│   - Generational memory preservation                         │
│   - Fight dementia with personal AI companions               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### The "Pipes" Name

"Pipes" is short for "Personas" in "Personas as a Service" - the idea that each user has their own "pipe" of context that flows with them across the internet.

---

## The CHB Ecosystem

### Products Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    CHB ECOSYSTEM                              │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │    HASH     │    │    SEMI     │    │   PIPES     │       │
│  │  hash.ink   │ ←→ │  semi.pink  │ ←→ │ pipes.pink  │       │
│  │ (Journaling)│    │ (AI Layer)  │    │  (Ideas)    │       │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘       │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                  │
│              ┌─────────────┴─────────────┐                   │
│              │  UNIVERSAL :-] IDENTITY    │                   │
│              │  colonhyphenbracket.pink   │                   │
│              │  (Corporate Site / Auth)   │                   │
│              └───────────────────────────┘                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Hash (hash.ink) - BUILT
**The Journaling Platform**

Hash is an AI-powered journaling platform for high-IQ, non-linear thinkers:
- Rich text, voice memos, and media capture
- Personal knowledge graph via hashtag analysis
- Scout Reports (25-40 page PDF analyses)
- Semi integration for idea exploration

**Key Technical Achievements:**
- Reference Library pattern (template + user data = AI-quality output at $0)
- Scout Report PDF generation without external AI calls
- NOSTR integration for decentralized publishing
- 3D knowledge graph visualization

### Semi (semi.pink) - BUILT
**The Conversational AI Layer**

Semi provides:
- Three modes: Socratic (questions), Extension (builds on ideas), Balanced
- Context awareness from user's journaling history
- Integration with Hash for idea exploration
- API endpoints for other CHB apps

**Semi's Value Proposition:**
> "A win-win-win" - Use AI you already trust, pay what you already pay, get better results + privacy.

- Addresses the "AI Tax" problem (users burning tokens on bad prompts)
- Works as an intelligent layer optimizing prompts, saving tokens
- Context persists across apps in the CHB ecosystem
- Never trains competitor models with your data

### Scout - INTEGRATED INTO HASH
**The Async Analysis Engine**

Scout is a background service (not standalone) that:
- Runs temporal pattern analysis on journals
- Generates "PhD-tier insights" through multi-model synthesis
- Produces Fireside Chat reports (rare, 2-4x/year)
- Detects cognitive patterns, growth areas, blindspots

### Corporate Site (colonhyphenbracket.pink) - BUILT
**The Auth Hub and Company Presence**

What's implemented:
- Custom email/password authentication (works for anyone)
- NOSTR authentication (privacy alternative)
- Perspective-switching UI for different customer types
- Company information and product links

---

## Authentication System

### CRITICAL: Use the Proven Pattern

The corporate site has a **fully tested, working authentication system** that you should replicate exactly.

### Two Auth Methods

1. **Email/Password** (Primary) - Works for anyone with an email address
   - No third-party accounts required (not Replit, Google, or GitHub)
   - Maximum user reach (TAM expansion was explicit goal)
   
2. **NOSTR (NIP-07)** (Alternative) - For privacy-focused users
   - Cryptographic identity via browser extension (Alby, nos2x)
   - Challenge-response flow

### Dependencies

```bash
npm install bcrypt express-session connect-pg-simple
npm install --save-dev @types/bcrypt @types/connect-pg-simple @types/express-session
```

### Database Schema for Auth

```typescript
// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, varchar, timestamp, jsonb, index, boolean } from "drizzle-orm/pg-core";
import { z } from "zod";

// Session storage for express-session
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage - supports both Email/Password and NOSTR
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  passwordHash: varchar("password_hash"), // bcrypt hash
  emailVerified: boolean("email_verified").default(false),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  nostrPubkey: varchar("nostr_pubkey").unique(),
  nostrNpub: varchar("nostr_npub"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Validation schemas
export const registerUserSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
```

### Server Auth Module

Create `server/email-auth.ts`:

```typescript
import bcrypt from "bcrypt";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { registerUserSchema, loginUserSchema } from "@shared/schema";

const SALT_ROUNDS = 12;

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
      sameSite: "lax",
    },
  });
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function setupEmailAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Registration endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const parseResult = registerUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: parseResult.error.errors.map(e => e.message),
        });
      }

      const { email, password, firstName, lastName } = parseResult.data;
      const normalizedEmail = email.toLowerCase().trim();

      const existingUser = await storage.getUserByEmail(normalizedEmail);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "An account with this email already exists",
        });
      }

      const passwordHash = await hashPassword(password);
      const user = await storage.createUser({
        email: normalizedEmail,
        passwordHash,
        firstName: firstName || null,
        lastName: lastName || null,
        emailVerified: false,
      });

      (req.session as any).userId = user.id;

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        error: "Registration failed. Please try again.",
      });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const parseResult = loginUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: parseResult.error.errors.map(e => e.message),
        });
      }

      const { email, password } = parseResult.data;
      const normalizedEmail = email.toLowerCase().trim();

      const user = await storage.getUserByEmail(normalizedEmail);
      if (!user || !user.passwordHash) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      (req.session as any).userId = user.id;

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        error: "Login failed. Please try again.",
      });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ success: false, error: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  // Get current user endpoint
  app.get("/api/auth/user", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) return res.json(null);

      const user = await storage.getUser(userId);
      if (!user) return res.json(null);

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.json(null);
    }
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const userId = (req.session as any)?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await storage.getUser(userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  (req as any).user = user;
  next();
};
```

### Client Auth Hook

```typescript
// client/src/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch,
  };
}
```

### Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Random 32+ character string for session encryption

---

## Technical Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: wouter
- **Data Fetching**: TanStack Query v5
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod validation

### Backend

- **Runtime**: Node.js with Express.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Session Storage**: connect-pg-simple
- **Password Hashing**: bcrypt (12 salt rounds)

### Key Patterns

1. **Default Query Fetcher**: Already configured, don't define queryFn
2. **Mutations**: Use `apiRequest` from `@lib/queryClient`
3. **Cache Invalidation**: Always invalidate after mutations
4. **Query Keys**: Use arrays for hierarchical keys: `['/api/ideas', id]`

### Directory Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/          # shadcn components
│   │   ├── hooks/
│   │   │   └── useAuth.ts   # Auth hook
│   │   ├── lib/
│   │   │   └── queryClient.ts
│   │   ├── pages/
│   │   │   ├── home.tsx
│   │   │   ├── dashboard.tsx
│   │   │   └── signup.tsx
│   │   └── App.tsx
├── server/
│   ├── db.ts
│   ├── email-auth.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── index.ts
├── shared/
│   └── schema.ts
└── docs/
```

---

## Database Schema

### Pipes-Specific Tables

```typescript
// shared/schema.ts

// Ideas table - core of Pipes
export const ideas = pgTable("ideas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id),
  
  title: text("title").notNull(),
  description: text("description"),
  
  // Status tracking
  status: varchar("status").default("captured"), 
  // Options: captured, developing, ready, executing, complete, archived
  priority: varchar("priority").default("later"), 
  // Options: now, next, later, someday
  
  // Source connections
  sourceType: varchar("source_type"), // 'manual', 'hash', 'semi'
  sourceId: varchar("source_id"),     // Hash entry ID or Semi conversation ID
  
  // Metadata
  tags: text("tags").array().default([]),
  deadline: timestamp("deadline"),
  completedAt: timestamp("completed_at"),
  
  // Reference Library cache
  matchedFigures: jsonb("matched_figures"),
  matchedBooks: jsonb("matched_books"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects for grouping ideas
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  color: varchar("color").default("#FE299E"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Actions (next steps) for ideas
export const actions = pgTable("actions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ideaId: varchar("idea_id").notNull().references(() => ideas.id),
  text: text("text").notNull(),
  completed: boolean("completed").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Types
export type Idea = typeof ideas.$inferSelect;
export type InsertIdea = typeof ideas.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type Action = typeof actions.$inferSelect;
```

### Migration Pattern

```bash
# Safe schema sync - use this
npm run db:push --force

# NEVER manually write SQL migrations
# NEVER change ID column types (serial ↔ varchar)
```

---

## Design Philosophy

### Core Principles

1. **"Games are supposed to be fun!"** - Guiding principle for playful, engaging visuals
2. **Characters with agency** (like Pixar's lamp) over static "props"
3. **Consistency within context** - Maintain style within each view/section
4. **Privacy-first** - All features opt-in
5. **Progressive disclosure** - Start simple, unlock complexity

### Color System

```css
:root {
  /* CHB Pink - ONLY for CTAs and brand moments */
  --chb-pink: #FE299E;
  --chb-pink-light: #FF6BC6;
  --chb-pink-dark: #D1007E;
  
  /* Neutral palette */
  --background: #FFFFFF;
  --background-dark: #0A0A0A;
  --text-primary: #1A1A1A;
  --text-secondary: #6B7280;
}
```

**IMPORTANT**: CHB Pink (`#FE299E`) is ONLY for:
- Primary CTAs (buttons, links)
- Brand moments (logo, `:-]` symbol)
- NOT for backgrounds or large areas

### UI/UX Guidelines

1. **Minimalist white aesthetic** with pink accents
2. **Use `data-testid`** on all interactive elements
3. **Follow shadcn/ui conventions**
4. **Prefer composition over configuration**
5. **Keep components small and focused**
6. **Always show loading states** (`.isLoading` / `.isPending`)

### Typography

- **Fonts**: Roboto, Lora, JetBrains Mono
- **Icons**: Lucide React for actions, react-icons/si for company logos

---

## Reference Library Pattern

### The Core Insight

Most "AI-generated" content follows predictable patterns that can be replicated locally at zero cost:

```
CURATED TEMPLATE + KEYWORD MATCHING + USER'S WORDS = PERSONALIZED OUTPUT
```

### How It Works

1. User writes idea with keywords like "startup", "build"
2. System detects keywords and matches to archetype (e.g., Andrew Carnegie)
3. Pre-written prose is combined with user's actual content
4. Output feels AI-generated but costs $0

### Pipes Implementation

**Example: Idea Development**

User has idea: "I want to build a newsletter about productivity"

1. Pipes detects: "newsletter", "productivity", "build"
2. Reference Library returns:
   - Historical figure: Benjamin Franklin (polymath, self-improvement)
   - Books: "Atomic Habits", "Getting Things Done"
3. Pipes presents: "Great minds who built similar things..."

**Example: Roadblock Analysis**

User marks idea as "stuck" and types: "I don't have time, too many commitments"

1. Reference Library detects: "time", "commitments"
2. Returns: The War of Art (resistance), Getting Things Done (systems)
3. Pipes presents actionable framing without AI call

### API Endpoints (from Hash)

```
GET  /api/reference-library              # Library metadata
GET  /api/reference-library/figures      # Historical figures
POST /api/reference-library/figures/match # Match figures to text
GET  /api/reference-library/books        # Books by category
POST /api/reference-library/books/match  # Match books to text
GET  /api/reference-library/search?q=    # Search all content
```

---

## API Integration Points

### Pipes API Endpoints (to implement)

```typescript
// Ideas CRUD
GET    /api/ideas                    # List user's ideas
POST   /api/ideas                    # Create idea
GET    /api/ideas/:id                # Get single idea
PATCH  /api/ideas/:id                # Update idea
DELETE /api/ideas/:id                # Delete idea

// Projects
GET    /api/projects                 # List projects
POST   /api/projects                 # Create project
PATCH  /api/projects/:id             # Update project
DELETE /api/projects/:id             # Delete project

// Actions
GET    /api/ideas/:id/actions        # Get actions for idea
POST   /api/ideas/:id/actions        # Add action
PATCH  /api/actions/:id              # Update action
DELETE /api/actions/:id              # Delete action

// Status changes
POST   /api/ideas/:id/status         # Change status
POST   /api/ideas/:id/priority       # Change priority
```

### Cross-App Communication

**Pipes to Hash:**
```typescript
// Get user's journal entries for linking
const entries = await fetch('https://hash.ink/api/entries?limit=20', {
  credentials: 'include',
});

// Search entries
const results = await fetch('https://hash.ink/api/entries/search?q=startup', {
  credentials: 'include',
});

// Reference library (public)
const figures = await fetch('https://hash.ink/api/reference-library/figures');
```

**Pipes to Semi:**
```typescript
// Develop an idea with AI
const response = await fetch('https://semi.pink/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    message: "Help me develop this idea: [user's idea text]",
    context: { source: 'pipes', ideaId: 'abc123' },
  }),
});
```

---

## User Data Flow

### Idea Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                        USER'S MIND                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  HASH: Journal Entry                                         │
│  "I've been thinking about starting a newsletter about..."   │
└─────────────────────────────────────────────────────────────┘
                              │
                    [Extract to Pipes]
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  PIPES: Idea Card (Captured)                                 │
│  Title: "Newsletter about productivity"                       │
│  Source: Hash entry #abc123                                   │
│  Status: Captured                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                    [Develop with Semi]
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  SEMI: Conversation                                          │
│  "Let's explore this. What specific angle interests you?"    │
│  [User refines idea through dialogue]                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  PIPES: Idea Card (Developing → Ready)                       │
│  Title: "Newsletter: Weekly Systems Thinking"                │
│  Next Actions: [Research platforms, Draft issue 1]           │
│  Deadline: Jan 15                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  HASH: Progress Journal                                      │
│  "Launched newsletter today! 50 subscribers"                 │
│  [Links back to Pipes idea]                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Monetization Strategy

### CHB Tier Structure

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | Basic features, limited AI |
| Comma (,) | $10/mo | Full features, standard AI |
| Period (.) | $20/mo | Everything + priority AI |
| Ellipsis (...) | $40/mo | Team features, API access |

### Credit System

- 1 credit = 1,000 AI tokens
- Monthly credits based on tier
- Banked credits don't expire
- Reference Library features cost $0

### Pipes-Specific

- **Free**: 10 ideas, basic pipeline views
- **Paid**: Unlimited ideas, Semi integration, advanced views
- **Reference Library**: Always free (no AI cost)

---

## IP Protection Requirements

### Patent-Pending Technology

**CRITICAL**: "Pipes" technology is patent-pending. In public-facing content, use alternative terms:

- ✅ "managed approach"
- ✅ "programmatic generation"
- ✅ "managed AI environments"
- ❌ Do NOT explain HOW it works technically
- ❌ Do NOT reveal implementation details

### What You Can Say

- Describe WHAT it does (benefits, outcomes)
- Mention speed ("under 200ms response")
- Reference quality ("PhD-tier insights")

### What You Cannot Say

- How the matching algorithm works
- Technical implementation details
- Architecture diagrams of the core technology

---

## Implementation Checklist

### Phase 1: Foundation

- [ ] Set up PostgreSQL database with Drizzle ORM
- [ ] Implement email/password authentication (copy from corporate site)
- [ ] Create users, sessions, ideas, projects, actions tables
- [ ] Run `npm run db:push --force` to sync schema
- [ ] Create basic storage interface

### Phase 2: Core Features

- [ ] Ideas CRUD API endpoints
- [ ] Projects CRUD API endpoints
- [ ] Actions CRUD API endpoints
- [ ] Kanban board UI component
- [ ] Idea card component
- [ ] Status/priority change handlers

### Phase 3: Views

- [ ] Kanban view (default)
- [ ] List view with filters
- [ ] Calendar view for deadlines
- [ ] Project filtering

### Phase 4: Integration

- [ ] Reference Library integration (call Hash API)
- [ ] Semi "Develop idea" button
- [ ] Hash entry linking
- [ ] Cross-app context sharing

### Phase 5: Polish

- [ ] Loading states for all queries
- [ ] Error handling with toast notifications
- [ ] Responsive design
- [ ] Dark mode support
- [ ] `data-testid` on all interactive elements

---

## Quick Reference

### Environment Variables

```
DATABASE_URL=postgresql://...
SESSION_SECRET=random-32-plus-character-string
```

### Key Commands

```bash
npm run dev            # Start development server
npm run db:push        # Sync schema to database
npm run db:push --force  # Force sync (safe)
```

### Common Mistakes to Avoid

1. **Don't use in-memory storage** - Everything goes to PostgreSQL
2. **Don't forget email normalization** - `email.toLowerCase().trim()`
3. **Don't manually write SQL migrations** - Use `db:push`
4. **Don't change ID column types** - Keep what's there
5. **Don't use CHB pink for backgrounds** - CTAs only
6. **Don't use mock data** - Always real data or clear placeholders
7. **Don't forget `data-testid`** - On every interactive element

---

## Final Notes

This document contains everything learned from building Hash, Semi, and the corporate site. The authentication system is battle-tested. The design philosophy emerged from iterative feedback. The Reference Library pattern saves AI costs while maintaining quality.

Your mission: Build Pipes as the next step in the CHB ecosystem - an idea pipeline manager that connects with Hash for capture and Semi for development, all unified by the universal :-] identity.

Remember: **Storage is cheap. Never lose data. Users should never repeat themselves.**

Good luck, and welcome to CHB! :-]
