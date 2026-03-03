# CHB Corporate Site

**colonhyphenbracket.pink** — The central hub and OAuth 2.0 provider for the CHB ecosystem.

CHB (:-]) is an AI innovation company building tools for underserved users, with a focus on memory persistence, context continuity, and the Curator Economy.

---

## What This Is

A full-stack corporate website with an unusual architectural feature: a **Perspectives Engine** that serves the same content through three distinct audience lenses simultaneously. The URL doesn't change. The product doesn't change. The *framing* does — color, typography, copy tone, and emotional register all shift based on who's reading.

The three perspectives:
- **Startup Founders** — ROI, scalability, infrastructure (blue)
- **Content Creators** — Creative flow, audience building (magenta)
- **Memory Capturers** — Preservation, legacy, family (green)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Routing | Wouter |
| Server state | TanStack Query v5 |
| Backend | Node.js + Express |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| Auth | Custom email/password + NOSTR NIP-07 + OAuth 2.0 provider |
| AI | Gemini (images) + Semi API (content) |
| Build | Vite |

---

## Architecture

```
client/src/
  config/
    perspective-themes.ts     # Theme objects per perspective
  hooks/
    use-perspective.tsx        # React Context + localStorage persistence
    use-perspective-theme.tsx  # CSS variable injection at runtime
  lib/
    brand-colors.ts           # Central JS color constants
  pages/                      # Route-level components
  components/                 # Shared UI components
server/
  oauth-provider.ts           # OAuth 2.0 authorization server
  email-auth.ts               # Email/password auth
  nostr-auth.ts               # NOSTR NIP-07 auth
  routes.ts                   # API endpoints
shared/
  schema.ts                   # Drizzle schema + Zod types
```

See `PIPES_MANIFEST.md` for a detailed breakdown of how the Perspectives Engine works.  
See `UI_MANIFEST.md` for the complete design system audit and component map.  
See `FIGMA_TOKENS.md` for CSS variable exports ready for Figma Tokens Studio.

---

## Products

| Product | URL | Role |
|---------|-----|------|
| **Hash** | hash.pink | Private AI memory journal |
| **Semi** | semi.pink | Intelligent AI that learns you |
| **Pipes** | pipes.pink | Curator marketplace |

CHB Corporate acts as the OAuth 2.0 provider for all three. One account, three connected tools.

---

## Running Locally

```bash
npm install
npm run dev
```

Requires a PostgreSQL database. Set `DATABASE_URL` in your environment.

---

## Subscription Tiers

| Tier | Symbol | Price | Credits |
|------|--------|-------|---------|
| Comma | `,` | $7/mo | 50k |
| Period | `.` | $21/mo | 200k |
| Ellipsis | `...` | $210/mo | 1M |

---

*Every Pipe is a real slice of humanity. :-]*
