# CHB Corporate Website

## Overview

CHB (Colon Hyphen Bracket = :-]) is an AI innovation company developing tools for underserved users, particularly older and traditional demographics. The corporate website provides a professional business presence, supports developer account verification, and showcases the company's "perspective-switching" technology.

**Mission Stakes**:
- **AI Memory Persistence**: Ensure AI retains user context and memory, preventing users from repeating themselves.
- **Pipes Technology**: Empower individuals with control over their personal memory and context across the internet.
- **Societal Impact**: Contribute to fighting dementia through personalized memory preservation and advanced AI context understanding.

**Brand Identity**:
- **Name**: CHB (pronounced "CHB")
- **Visual**: Utilize the `:-]` smiley face symbol for brand recognition.
- **Philosophy**: "Every Pipe should be a real slice of humanity."

## User Preferences

Preferred communication style: Simple, everyday language.

**Memory Preservation Constitutional Requirement**: Storage is cheap. There is NO excuse for losing anything, ever. **User should never have to repeat themselves.**

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript.
- **Styling**: Tailwind CSS with custom CSS variables for dynamic theming.
- **UI Components**: Shadcn/ui built on Radix UI.
- **Routing**: Wouter.
- **State Management**: React Context API for perspective switching, TanStack Query for server state.
- **Perspective-Switching**: CSS class-based content toggling, with CHB pink (`#FE299E`) for CTAs and perspective-specific colors defined in `client/src/config/perspective-themes.ts`.

### Backend
- **Runtime**: Node.js with Express.js.
- **API Design**: RESTful.
- **Database**: PostgreSQL with Drizzle ORM.

### Creative Process Database Schema
- **Tables**: `creative_sessions` (journey stages, learning insights) and `creative_images` (image metadata, prompts, learning status).
- **Key Fields**: `usageLocations` (JSONB for story section tags and legacy usage), `learningStatus` (`final_version | learning_attempt | happy_accident`), `generationParams` (JSONB for image generation metadata).

### UI/UX and Design Philosophy
- **Core Philosophy**: "Games are supposed to be fun!" - Guiding a playful, engaging visual direction.
- **Design Insight**: Focus on "characters with agency" over static "props".
- **Visual Evolution**: Transition from literal, photorealistic, and corporate imagery to abstract, playful, and game-like metaphors.
- **Consistency**: Maintain stylistic consistency within each customer perspective (e.g., all Memory Capturers images are vintage postcard illustrations).
- **Perspective-Specific Visual Languages**:
    - **Startup Founders**: Geometric puzzles, strategic game boards (blue).
    - **Content Creators**: Abstract artistic tools, creative flow (purple/magenta).
    - **Memory Capturers**: Warm illustrated farmhouse, vintage postcard aesthetic (green).
- **Technical Design**: CHB pink (`#FE299E`) for universal CTAs; other colors are perspective-driven via CSS variables. Prioritize searching existing image library before generating new images.

### Accessibility & Contrast Guidelines (CRITICAL)
**NEVER use semantic color tokens (bg-muted, text-muted-foreground) without verifying contrast.** These have caused recurring visibility issues.

**Safe Color Pairings:**
- **Light surfaces** (white, cream, bg-gray-50): Use `text-gray-900` for headings, `text-gray-700` for body text
- **Dark surfaces** (bg-gray-900, slate): Use `text-white` for headings, `text-gray-300` for body text
- **Colored surfaces** (bg-green-600, bg-purple-600, bg-brand-pink): Use `text-white` for all text

**Callout Boxes:** Use `callout-box-neutral` or `callout-box-light` utility classes (defined in index.css) instead of `bg-muted` to guarantee readable text.

**Buttons on colored backgrounds:** Always add `bg-transparent` to outline buttons on colored backgrounds to prevent white-on-white issues.
```jsx
<Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
```

### Admin Features
- Image upload with metadata.
- Learning status editor.
- File-based admin session storage.

### Build System
- **Bundler**: Vite for development and production.
- **Deployment**: Express server for API and static frontend assets.

### Content Strategy
- **Tone**: Business-focused, perspective-driven, integrate `:-]` for brand moments.
- **IP Protection**: Refer to "Pipes" as "programmatic generation" or "managed AI environments" due to patent-pending status.

### Authentication
- **Custom Email/Password Authentication**: Standalone email/password system with bcrypt hashing and PostgreSQL session storage.
- **OAuth 2.0 Provider**: Implemented as an authorization server for cross-domain authentication (Pipes, Hash, Semi) with PKCE support. Includes `oauth_clients`, `authorization_codes`, `access_tokens` tables and endpoints for `/oauth/authorize`, `/oauth/token`, `/oauth/userinfo`.
- **NOSTR Authentication**: NIP-07 challenge-response flow with cryptographic signature verification, 7-day session expiration, and PIN protection.

## External Dependencies

### Database
- **Primary**: PostgreSQL.
- **Hosting**: Neon Database.
- **ORM/Migrations**: Drizzle ORM and Drizzle Kit.

### AI Services
- **Custom AI**: Semi API (for perspective-aware content generation).
- **Image Generation**: Gemini API.
- **Authentication**: Bearer token-based API authentication (`CHB_SEMI_API_KEY`, `GEMINI_API_KEY`).

### UI and Styling Libraries
- **Components**: Radix UI.
- **Icons**: Lucide React.
- **Typography**: Google Fonts (Roboto, Lora, JetBrains Mono).
- **Form Management**: React Hook Form with Zod validation.

### Third-party Integrations
- **Analytics**: User perspective switching behavior tracking.
- **Product Links**: Direct links to live CHB products (e.g., hash.pink, semi.pink).
- **Social Media**: Twitter integration.

## CHB Ecosystem Products

The corporate site serves as the OAuth 2.0 provider and central hub for the CHB ecosystem:

### Hash (hash.pink)
- **One-liner**: Your private AI memory journal that never forgets.
- **Core Function**: Personal memory capture, context preservation, personality extraction.
- **Synergy**: Powers Semi's personalization—Semi knows you because Hash told her.
- **Colors**: Green (#4CAF50) for Memory Capturers.

### Semi (semi.pink)
- **One-liner**: Your AI that learns you, routes intelligently, costs less.
- **Core Function**: Intelligent AI routing (local first, external when needed), continuous learning.
- **Credit Model**: All interactions have cost (not $0). Keep messaging general: "Very efficient, still settling on exact amounts."
- **Business Logic**: Average users should exhaust monthly credits → incentive to upgrade tiers.
- **Colors**: Purple (#9C27B0) for Content Creators.

### Pipes (pipes.pink)
- **One-liner**: Human expertise packaged as reusable, monetizable AI infrastructure.
- **Symbol**: | | | (three pipes, plural)
- **Core Function**: Curator marketplace, namespace ownership, expertise-as-equity.
- **Differentiators**: Transparent bias, layerable perspectives, equity model.
- **IP Note**: Patent-pending—use "managed approach" or "programmatic generation" publicly.
- **Colors**: CHB Pink (#FE299E).

### The Curator Economy (Big Vision)
- **Core Thesis**: AI isn't replacing humans—it's creating a new job: **Curator**.
- **Three Pillars**:
  - **AI's Boss**: Curators decide what knowledge matters and what perspectives AI should embody
  - **AI's Source**: Instead of undifferentiated internet data, AI gets vetted, attributed expertise
  - **AI's Regulator**: Curators control which values and perspectives their content embodies—transparent bias, not hidden manipulation
- **Power Shift**: Give humans a say in which sources Big Tech uses, force AI to respect user values instead of undermining with Big AI agenda
- **Key Message**: "This isn't about better AI tools. It's about who controls AI—and we believe that should be you."
- **Tagline**: "Every Pipe is a real slice of humanity. :-]"

### Subscription Tiers
- **Comma**: $7/mo, 50k credits—For individuals getting started.
- **Period**: $21/mo, 200k credits—For creators and builders.
- **Ellipsis**: $210/mo, 1M credits—For power users and teams.
- **Punctuation Visuals**: Use `,` `.` `...` as tier badges.

### CHB Promise (Core Messaging)
- **"She doesn't forget"**: Context persists across conversations.
- **"Your data, your rules"**: User controls what's shared.
- **"Build now, save later"**: Work compounds, nothing is lost.
- **"Amplification, not automation"**: Enhance expertise, don't replace it.

### Account Hub (/account)
- **Overview Tab**: Tier badge, credit balance, CHB Promise, quick links.
- **Profile Tab**: User info, security settings (Coming Soon).
- **Subscription Tab**: Tier comparison, billing via Hash.
- **Connected Apps Tab**: Hash/Semi/Pipes synergy descriptions.

### Products Page Structure
- **/products**: Ecosystem overview with "One Account. Three Powers" hero, Curator Economy section, workflow visualization, product cards, CHB Promise, credit philosophy
- **/products/hash**: Deep dive with Quick Highlights / Deep Dive toggle, problem/solution, features, workflows, ecosystem synergy, :-] moments
- **/products/semi**: Deep dive with Quick Highlights / Deep Dive toggle, routing examples, credit philosophy, "She doesn't forget" promise
- **/products/pipes**: Deep dive with Quick Highlights / Deep Dive toggle, namespace ownership, bias transparency, creation flow, Curator Economy thesis

### Two-Path Content Structure
Each deep dive page offers:
- **Quick Highlights** (default): Concise feature lists, key points, practical benefits
- **Deep Dive**: PhD/HBR/McKinsey-level breakdown explaining WHY these products will change lives, Curator Economy connection

### Workflow Narratives by Persona (Revised)
- **All Personas Start with Semi**: Chat freely about anything—she learns you
- **Hash Synthesizes**: Captures and connects everything, enables conversation sharing across apps
- **Pipes Created in Semi**: Package expertise, refine with AI assistance, deploy anywhere
- **Startup Founders**: Chat freely with Semi → Hash synthesizes + shares → Create/refine Pipes in Semi → Deploy to websites/apps
- **Content Creators**: Chat freely with Semi → Hash organizes chaos → Build Pipes from wisdom → Monetize expertise
- **Memory Capturers**: Chat freely with Semi → Hash preserves + shares → Transform collection into Pipe → Legacy lives on

## Recent Changes

- **Dec 8, 2025**: Overhauled Products page with ecosystem story, workflow visualization, and CHB Promise.
- **Dec 8, 2025**: Created deep dive pages for Hash, Semi, and Pipes (/products/hash, /products/semi, /products/pipes).
- **Dec 8, 2025**: Added /account page with tabbed interface (Overview, Profile, Subscription, Connected Apps).
- **Dec 8, 2025**: Navigation now shows "Account" button for authenticated users, "Sign Up" for guests.
- **Dec 8, 2025**: Authenticated users redirected from /signup to /account (unless in OAuth flow).
- **Dec 8, 2025**: Saved ecosystem questionnaire responses to docs folder.
- **Dec 8, 2025**: Updated Pipes symbol to | | | (three pipes) throughout site.
- **Dec 8, 2025**: Revised workflow to start with Semi → Hash synthesizes → Pipes created in Semi.
- **Dec 8, 2025**: Added Curator Economy section to Products page (AI's boss, source, regulator).
- **Dec 8, 2025**: Added two-path content structure to deep dive pages (Quick Highlights vs Deep Dive toggle).
- **Dec 8, 2025**: Enhanced deep dive content with PhD/HBR-level narrative breakdown for Curator Economy thesis.