# PIPES_MANIFEST.md
## CHB Context Engine — Public Surface Documentation

> **IP Notice**: This document describes the *observable UI behavior* of the Perspectives 
> context engine. Internal routing logic, pipe definitions, and context-injection algorithms 
> are proprietary and patent-pending. They are not included in this repository.

---

## What Is the Perspectives Engine?

The CHB corporate site uses a **Perspectives Engine** that presents the same product ecosystem 
through three distinct audience lenses simultaneously. The *same URL* serves *radically different 
content, colors, typography, and emotional tone* depending on which perspective is active.

This is not A/B testing. All three perspectives are always available; users self-select.

The three perspectives are:

| Perspective Key | Audience | Product Emphasis | Emotional Register |
|----------------|----------|------------------|--------------------|
| `startup_founders` | Technical builders, growth hackers | ROI, scalability, infrastructure | Authoritative, precise |
| `content_creators` | Writers, creators, independent media | Creative flow, audience building | Conversational, playful |
| `memory_capturers` | Families, older demographics, legacy builders | Memory preservation, simplicity | Empathetic, warm |

---

## Architecture Overview

```
User visits colonhyphenbracket.pink
         │
         ▼
┌─────────────────────┐
│  PerspectiveContext  │  (React Context — client/src/hooks/use-perspective.tsx)
│  ─────────────────  │
│  activePerspective  │◄── localStorage | query param | user selection
│  setActivePerspective│
└────────┬────────────┘
         │ feeds into
         ▼
┌─────────────────────────────────────────────────┐
│  Three-layer injection system                    │
│                                                  │
│  Layer 1: CSS Variables on :root[data-perspective]│
│           (index.css — perspective-primary, etc.) │
│                                                  │
│  Layer 2: perspectiveThemes config               │
│           (config/perspective-themes.ts)         │
│           → colors, typography, layout, heroSettings │
│                                                  │
│  Layer 3: Content switching via perspective key  │
│           (components render perspective-specific │
│            copy, images, CTAs)                   │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Rendered output     │
│  • Perspective color │
│  • Perspective copy  │
│  • Perspective images│
│  • Perspective CTAs  │
└─────────────────────┘
```

---

## Layer 1: CSS Variable Injection

**File**: `client/src/index.css`

The `:root` element receives a `data-perspective` attribute at runtime. CSS rules cascade 
perspective-specific values into shared utility classes.

```css
:root[data-perspective="startup_founders"] {
  --perspective-primary:   #01A9F4;   /* Brand blue */
  --perspective-accent:    hsl(142, 76%, 36%);
  --perspective-secondary: #33B3F6;
  --perspective-light:     #CCE9FD;
}

:root[data-perspective="content_creators"] {
  --perspective-primary:   hsl(328, 85%, 70%);  /* Creative magenta */
  --perspective-accent:    hsl(45, 93%, 47%);
  --perspective-secondary: hsl(328, 85%, 80%);
  --perspective-light:     hsl(328, 70%, 90%);
}

:root[data-perspective="memory_capturers"] {
  --perspective-primary:   hsl(142, 76%, 36%);  /* Nurturing green */
  --perspective-accent:    hsl(25, 95%, 53%);
  --perspective-secondary: hsl(142, 76%, 46%);
  --perspective-light:     hsl(142, 60%, 85%);
}
```

**Universal utility classes that consume these variables:**

| Class | Effect |
|-------|--------|
| `.section-title-perspective` | Text color = perspective primary |
| `.accent-perspective` | Text color = perspective primary |
| `.border-perspective` | Border color = perspective primary |
| `.bg-perspective` | Background = perspective primary |
| `.bg-perspective-light` | Background = perspective light tint |
| `.pipes-link` | Button styled with perspective-primary background |

**The one constant**: `#FE299E` (CHB pink) is *never* overridden by perspective. 
It is always the universal CTA color. The `--brand-pink` variable is perspective-immune.

---

## Layer 2: Theme Config Object

**File**: `client/src/config/perspective-themes.ts`

Each perspective exports a full theme object covering:

```typescript
interface PerspectiveTheme {
  colors: {
    primary: string;    // Always #FE299E (brand pink, CTA-only)
    secondary: string;  // Perspective signature color
    accent: string;     // Supporting accent
    background: string; // Page background
    foreground: string; // Default text
    muted: string;      // Subdued text
  };
  heroSettings: {
    overlayOpacity: number;   // 0.4–0.5, controls image dimming
    overlayGradient: string;  // Perspective-tinted gradient on hero image
    brightness: number;       // CSS filter brightness
    contrast: number;         // CSS filter contrast
    imageStyle: 'cool' | 'warm';
  };
  typography: {
    headlineStyle: 'authoritative' | 'playful' | 'elegant';
    bodyTone: 'professional' | 'friendly' | 'emotional';
    alignment: 'left' | 'center';
  };
  layout: {
    spacing: 'compact' | 'comfortable' | 'spacious';
    gridStyle: 'structured' | 'asymmetric' | 'minimal';
    containerMaxWidth: string;
  };
  contentTone: {
    voice: 'authoritative' | 'conversational' | 'empathetic';
    complexity: 'detailed' | 'moderate' | 'simple';
    focus: 'features' | 'benefits' | 'emotions';
  };
}
```

The `generateThemeCSS()` function converts this into a flat CSS variable map that is 
applied inline to the document root when a perspective activates.

---

## Layer 3: Perspective-Specific Content & Typography

Each perspective has its own named CSS class system for typography:

### Startup Founders
```css
.founders-title     { font: Inter 700, tracking tight, color #1e40af }
.founders-body      { font: Inter 500, color #1e3a8a }
.founders-display   { font: Inter 800, tracking tighter }
.founders-section   { bg: subtle blue gradient with radial highlights }
```

### Content Creators
```css
.creators-title     { font: Playfair Display italic 400, color #7c3aed }
.creators-body      { font: Georgia 400, color #6b21a8 }
.creators-display   { font: Playfair Display 600, color #581c87 }
.creators-section   { bg: subtle purple/magenta gradient }
```

### Memory Capturers
```css
.farmhouse-title    { font: Inter 700, color #2d1810, warm text-shadow }
.farmhouse-body     { font: Georgia, color #4a3e35, line-height 1.7 }
.farmhouse-display  { font: Playfair Display 600, color #1a0e08 }
.farmhouse-card     { warm cream gradient, tan border, layered shadows }
.farmhouse-section  { bg: layered warm cream with diagonal grain texture }
```

---

## Perspective Selector Component

**File**: `client/src/components/perspective-selector.tsx`

The selector renders in the navigation bar. It allows users to switch perspectives at any time. 
The selection is persisted to `localStorage` and restored on next visit.

```
[Startup Founder] [Content Creator] [Memory Capturer]
                          ↑ active perspective highlighted
```

---

## Two-Path Content Structure

Each product deep-dive page (`/products/hash`, `/products/semi`, `/products/pipes`) 
implements a toggle between:

- **Quick Highlights** (default): Concise feature bullets, practical benefits, 3-5 min read
- **Deep Dive**: HBR/McKinsey-level case study format, 8-15 min read, Curator Economy thesis

This toggle is perspective-aware: the same structural switch shows different copy per perspective.

---

## What Is NOT in This Repository

The following proprietary components are excluded per IP protection policy:

- `server/pipes/` — Pipe definition schemas and routing logic
- `server/context-engine/` — The programmatic context-injection system
- Internal curator namespace resolution algorithms
- Pipe composition and layering rules (the "perspectival stacking" algorithm)

These implement CHB's patent-pending "managed AI environment" methodology, referred to 
publicly as "programmatic generation" or "managed approach."

---

## Integration Points for External Consumers

If you are building an app that integrates with CHB's perspective system:

1. **Authenticate via CHB OAuth**: `https://colonhyphenbracket.pink/oauth/authorize`
2. **Pass `perspective` claim**: The `userinfo` endpoint returns the user's last-active perspective
3. **Respect perspective theming**: Use the CSS variable system above to mirror the user's active context

---

*Last updated: March 2026 | Maintainer: CHB Engineering*
