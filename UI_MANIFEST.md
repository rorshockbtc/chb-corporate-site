# UI_MANIFEST.md
## CHB Corporate Site — Design System Reference

> This document catalogs the complete color palette, typography system, and component 
> patterns in use. It is the authoritative source for Figma migration and design token 
> synchronization.

---

## Brand Sheet vs. Implementation

The fast brand sheet defines six foundational colors:

| Token Name | Hex | Usage Role |
|-----------|-----|------------|
| **Surface** | `#111111` | Dark page backgrounds, nav on scroll |
| **Text on Surface** | `#EEEEEE` | Body text on dark backgrounds |
| **Brand Primary** | `#FE299E` | All CTAs, never overridden by perspective |
| **Brand Secondary** | `#FFCF00` | Highlights, badges, tier accents |
| **Brand Tertiary** | `#B8E986` | Memory Capturers accent (light green) |
| **Brand Quaternary** | `#01A9F4` | Startup Founders perspective color |

### Why the Implementation Extends the Brand Sheet

The corporate site serves **three simultaneous audience perspectives**. The brand sheet 
covers the *universal* brand layer. The implementation adds perspective-specific colors 
on top:

| Addition | Value | Reason |
|---------|-------|--------|
| Content Creators magenta | `hsl(328, 85%, 70%)` | Distinct from brand pink; creative/editorial energy |
| Memory Capturers green | `hsl(142, 76%, 36%)` | Deeper, warmer than `#B8E986`; better legibility |
| Farmhouse warm cream | `#faf6f0 → #e9e2d4` | Vintage postcard aesthetic for older demographic |
| Founders steel blue | `#1e40af` | Authority/trust signal for B2B audience |

All additions are perspective-scoped and do not affect the universal brand layer.

---

## CSS Custom Properties (Full Reference)

### Universal Brand Tokens

```css
/* --- Core Brand Colors --- */
--brand-pink:    #FE299E;   /* Primary CTA — NEVER change, NEVER override */
--brand-yellow:  #FFCF00;   /* Secondary highlight */
--brand-green:   #B8E986;   /* Tertiary / Memory Capturers light */
--brand-blue:    #01A9F4;   /* Quaternary / Startup Founders */

/* --- Surface System --- */
--brand-surface:     #111111;  /* Dark surface base */
--surface-dark:      #111111;  /* Alias for dark backgrounds */
--text-on-surface:   #EEEEEE;  /* Light text on dark surfaces */

/* --- Shadcn/Radix Base Tokens --- */
--background:           hsl(0, 0%, 99%);
--foreground:           hsl(215, 25%, 15%);
--card:                 hsl(0, 0%, 100%);
--card-foreground:      hsl(215, 25%, 15%);
--primary:              #FE299E;
--primary-foreground:   hsl(0, 0%, 100%);
--secondary:            #FFCF00;
--secondary-foreground: hsl(215, 25%, 15%);
--muted:                hsl(210, 20%, 96%);
--muted-foreground:     hsl(215, 15%, 55%);
--accent:               #B8E986;
--accent-foreground:    hsl(215, 25%, 15%);
--destructive:          hsl(0, 70%, 50%);
--destructive-foreground: hsl(0, 0%, 98%);
--border:               hsl(210, 20%, 88%);
--input:                hsl(210, 20%, 94%);
--ring:                 hsl(330, 65%, 55%);
--quaternary:           #01A9F4;

/* --- Border Radius --- */
--radius: 16px;
```

### Perspective-Driven Tokens (Runtime)

These are set dynamically on `:root[data-perspective="..."]` and consumed by utility classes.

```css
--perspective-primary:    /* Active perspective signature color */
--perspective-accent:     /* Supporting accent for active perspective */
--perspective-secondary:  /* Lighter variant of perspective primary */
--perspective-light:      /* Very light tint for section backgrounds */
--perspective-light-rgb:  /* RGB triplet for opacity-based usage */
```

### Hero Theme Tokens (Runtime, per perspective)

```css
--theme-hero-overlay:    /* Opacity value 0–1 for hero image dimming */
--theme-hero-gradient:   /* CSS gradient string for hero color wash */
--theme-brightness:      /* CSS filter brightness multiplier */
--theme-contrast:        /* CSS filter contrast multiplier */
--theme-container-width: /* Max-width: 1000px | 1100px | 1200px */
--theme-spacing:         /* Section padding: 2rem | 3rem | 4rem */
--theme-headline-weight: /* Font weight: 300 | 600 | 700 | 800 */
--theme-body-size:       /* Body font size: 0.875rem | 1rem | 1.125rem */
```

---

## Typography System

### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Default body, headings, UI |
| `--font-serif` | Same as sans (currently aliased) | H1–H6 by Tailwind default |
| `--font-mono` | `'JetBrains Mono', 'SF Mono', Consolas, monospace` | Code, credentials, tokens |
| `Playfair Display` | Loaded via @fontsource | Content Creators & Memory Capturers decorative headings |
| `Georgia` | System serif | Fallback for farmhouse/editorial body text |

### Fluid Type Scale

All type sizes use CSS `clamp()` for device-responsive scaling without breakpoints.

| Token | Clamp Range | Role |
|-------|-------------|------|
| `--fluid-hero` | `clamp(2.5rem, 5vw + 1rem, 5rem)` | 40px → 80px, page heroes |
| `--fluid-display` | `clamp(2rem, 4vw + 0.75rem, 3.5rem)` | 32px → 56px, section headers |
| `--fluid-heading` | `clamp(1.5rem, 3vw + 0.5rem, 2.25rem)` | 24px → 36px, subheadings |
| `--fluid-body-xl` | `clamp(1.125rem, 2vw + 0.5rem, 1.5rem)` | 18px → 24px, lead copy |
| `--fluid-body` | `clamp(1rem, 1.5vw + 0.25rem, 1.25rem)` | 16px → 20px, body text |
| `--fluid-caption` | `clamp(0.875rem, 1vw + 0.25rem, 1rem)` | 14px → 16px, captions |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--fluid-line-hero` | `clamp(1.1, 2vw + 1, 1.3)` | Hero headlines |
| `--fluid-line-display` | `clamp(1.2, 1.5vw + 1, 1.4)` | Display headers |
| `--fluid-line-body` | `clamp(1.5, 1vw + 1.4, 1.8)` | Body copy |

### Tailwind Utility Classes

```
.text-fluid-hero        font-weight: 900, letter-spacing: -0.02em
.text-fluid-display     font-weight: 800, letter-spacing: -0.015em
.text-fluid-heading     font-weight: 700, letter-spacing: -0.01em
.text-fluid-body-xl     font-weight: 400
.text-fluid-body        font-weight: 400
.text-fluid-caption     font-weight: 500
```

---

## Component Patterns

### Buttons

**Primary CTA** (universal, perspective-immune)
```jsx
<Button className="bg-brand-pink text-white hover:opacity-90">
  Get Started
</Button>
```
Hex: `#FE299E` | Text: `#FFFFFF` | Radius: `var(--radius)` = 16px

**Outline on colored backgrounds** (accessibility-critical pattern)
```jsx
<Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
  Learn More
</Button>
```
Always add `bg-transparent` to prevent white-on-white rendering.

**Perspective-aware secondary button**
```jsx
<a className="pipes-link">Explore | | |</a>
```
Background: `var(--perspective-primary)` | Text: white | Radius: 0.75rem | 
Hover: `brightness(0.9)` + `translateY(-2px)`

### Cards

**Standard Card**
```css
/* Shadcn default with 16px radius */
bg-card text-card-foreground rounded-lg border shadow-sm
```

**Farmhouse Card** (Memory Capturers only)
```css
.farmhouse-card {
  background: linear-gradient(145deg, #faf6f0, #f2ede3, #ede4d3);
  border: 2px solid #c8b99c;
  border-radius: 18px;
  /* Layered shadows + subtle grain texture via ::before pseudo-element */
}
```

**Farmhouse Card White** (lighter variant for nested content)
```css
.farmhouse-card-white {
  background: linear-gradient(145deg, #ffffff, #fefbf8, #fdf9f4);
  border: 1px solid #d4c4a8;
}
```

### Section Backgrounds

| Class | Perspective | Background |
|-------|-------------|------------|
| `.founders-section` | Startup Founders | `rgba(59,130,246,0.03)` gradient + radial highlights |
| `.creators-section` | Content Creators | `rgba(147,51,234,0.03)` gradient + radial highlights |
| `.farmhouse-section` | Memory Capturers | Warm cream `#f8f4ee → #e9e2d4` with diagonal grain |

### Navigation

```css
.nav-backdrop {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
}
```

### Callout Boxes (Accessible)

Use these utility classes instead of `bg-muted` (which has contrast issues):

```css
.callout-box-neutral  /* Safe neutral callout */
.callout-box-light    /* Lighter variant */
```

---

## Accessibility Rules

These rules are constitutional — violations are bugs, not design choices.

1. **Light surfaces** (`white`, `bg-gray-50`): `text-gray-900` headings, `text-gray-700` body
2. **Dark surfaces** (`bg-gray-900`, `#111111`): `text-white` headings, `text-gray-300` body  
3. **Colored surfaces** (`bg-green-600`, `bg-purple-600`, `#FE299E`): `text-white` all text
4. **Outline buttons on color**: Always add `bg-transparent`
5. **Never use** `bg-muted` / `text-muted-foreground` without explicit contrast verification

---

## Border Radius Scale

| Tailwind Class | Value | Usage |
|---------------|-------|-------|
| `rounded-sm` | `calc(16px - 4px)` = 12px | Small elements |
| `rounded-md` | `calc(16px - 2px)` = 14px | Medium elements |
| `rounded-lg` | `16px` | Cards, buttons (default) |
| `rounded-xl` | 20px (Tailwind default) | Hero sections |
| Custom | 18px | Farmhouse cards |

---

## Subscription Tier Badges

Visual identifiers for CHB's three subscription tiers:

| Tier | Symbol | Price | Credits |
|------|--------|-------|---------|
| Comma | `,` | $7/mo | 50k |
| Period | `.` | $21/mo | 200k |
| Ellipsis | `...` | $210/mo | 1M |

Rendered as monospace badge characters, styled with `font-mono`.

---

*Last updated: March 2026 | Maintainer: CHB Design System*
