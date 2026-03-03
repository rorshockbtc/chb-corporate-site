# UI_MANIFEST.md
## CHB Corporate Site — Full UI Audit
### v2 — Post GitHub Provisioning

---

## 1. The Pipes Injection Mechanism

"Pipes" in this codebase means the **Perspectives Engine**: a runtime CSS variable injection system that re-skins the entire UI per audience segment. Here is the exact mechanism, layer by layer.

### Runtime Flow

```
User Action / Page Load
       │
       ▼
localStorage.getItem("chb-perspective")
       │  (default: "startup_founders")
       ▼
PerspectiveContext (React Context)
  client/src/hooks/use-perspective.tsx
       │
       ▼
usePerspectiveTheme() effect fires on perspective change
  client/src/hooks/use-perspective-theme.tsx
       │
       ├─► document.documentElement.setAttribute("data-perspective", key)
       │         triggers CSS selector cascade in index.css
       │
       └─► Object.entries(cssVariables).forEach(([prop, val]) =>
               root.style.setProperty(prop, val)
           )
               writes ~15 --theme-* and --perspective-* variables
               directly onto :root inline style
```

### Layer A — CSS Attribute Selectors (index.css)

Triggered by `data-perspective` attribute on `<html>`. These set the four perspective palette variables:

```css
:root[data-perspective="startup_founders"] {
  --perspective-primary:   #01A9F4;
  --perspective-accent:    hsl(142, 76%, 36%);
  --perspective-secondary: #33B3F6;
  --perspective-light:     #CCE9FD;
  --perspective-light-rgb: 188, 202, 235;
}
:root[data-perspective="content_creators"] {
  --perspective-primary:   hsl(328, 85%, 70%);
  --perspective-accent:    hsl(45, 93%, 47%);
  --perspective-secondary: hsl(328, 85%, 80%);
  --perspective-light:     hsl(328, 70%, 90%);
  --perspective-light-rgb: 245, 214, 235;
}
:root[data-perspective="memory_capturers"] {
  --perspective-primary:   hsl(142, 76%, 36%);
  --perspective-accent:    hsl(25, 95%, 53%);
  --perspective-secondary: hsl(142, 76%, 46%);
  --perspective-light:     hsl(142, 60%, 85%);
  --perspective-light-rgb: 204, 233, 204;
}
```

### Layer B — Inline CSS Variables (set via JS)

`generateThemeCSS()` in `perspective-themes.ts` outputs these, applied via `root.style.setProperty()`:

| Variable | Controls |
|----------|---------|
| `--primary` | Shadcn primary token (overrides base) |
| `--secondary` | Shadcn secondary token |
| `--accent` | Shadcn accent token |
| `--background` | Page background |
| `--foreground` | Default text color |
| `--muted` / `--muted-foreground` | Subdued text |
| `--theme-hero-overlay` | Hero image opacity (0.4–0.5) |
| `--theme-hero-gradient` | Hero color wash gradient string |
| `--theme-brightness` | CSS filter brightness |
| `--theme-contrast` | CSS filter contrast |
| `--theme-container-width` | Max-width: 1000–1200px |
| `--theme-spacing` | Section padding: 2–4rem |
| `--theme-headline-weight` | Font weight: 300–800 |
| `--theme-body-size` | Body font size: 0.875–1.125rem |
| `--perspective-primary` | Perspective signature color (alias of secondary) |
| `--perspective-accent` | Perspective accent |
| `--perspective-text` | Perspective foreground |
| `--perspective-muted` | Perspective muted text |

### Layer C — Content Switching (React)

`usePerspectiveContent()` accepts a keyed object and returns the value for the active perspective:

```tsx
const headline = usePerspectiveContent({
  startup_founders: "Scale your AI infrastructure",
  content_creators: "Build an audience that compounds",
  memory_capturers: "Never lose another memory",
});
```

Called in: `hero-section.tsx`, `product-card.tsx`, `home.tsx`, `products.tsx`,
`chb-case-study.tsx`, `roadmap.tsx`, `scout.tsx`, `contact.tsx`, and all three product pages.

---

## 2. CSS Classes Injected by the Perspectives Engine

### Universal Utility Classes (consume `--perspective-*` variables)

These classes work on ANY element and automatically respond to the active perspective:

| Class | CSS Effect | Used In |
|-------|-----------|---------|
| `.section-title-perspective` | `color: var(--perspective-primary)` | `hero-section.tsx`, `home.tsx` |
| `.accent-perspective` | `color: var(--perspective-primary)` | `home.tsx` |
| `.border-perspective` | `border-color: var(--perspective-primary)` | — |
| `.bg-perspective` | `background: var(--perspective-primary)` | `home.tsx` |
| `.bg-perspective-light` | `background: var(--perspective-light)` | — |
| `.pipes-link` | `bg: var(--perspective-primary)` + hover lift | `home.tsx` |
| `.optional-includes-bg` | rgba opacity from `--perspective-light-rgb` | — |
| `.perspective-content` | Transition base class | — |

### Perspective-Specific Named Classes

These are **hard-coded to a single perspective**. They are applied via conditional logic in JSX:

```tsx
// home.tsx pattern
className={
  currentPerspective === 'memory_capturers' ? 'farmhouse-section' :
  currentPerspective === 'startup_founders' ? 'founders-section' :
  'creators-section'
}
```

**Startup Founders** (`founders-*`):
- `.founders-section` — subtle blue radial gradient background
- `.founders-title` — Inter 700, `#1e40af`, tight tracking ⚠️ *hardcoded*
- `.founders-body` — Inter 500, `#1e3a8a` ⚠️ *hardcoded*
- `.founders-display` — Inter 800, `#1e3a8a` ⚠️ *hardcoded*
- `.founders-heading` — *referenced in TSX but not defined in CSS* 🐛

**Content Creators** (`creators-*`):
- `.creators-section` — subtle purple/magenta radial gradient
- `.creators-title` — Playfair Display italic, `#7c3aed` ⚠️ *hardcoded*
- `.creators-body` — Georgia 400, `#6b21a8` ⚠️ *hardcoded*
- `.creators-display` — Playfair Display 600, `#581c87` ⚠️ *hardcoded*
- `.creators-heading` — *referenced in TSX but not defined in CSS* 🐛
- `.creators-border` — *referenced in TSX but not defined in CSS* 🐛

**Memory Capturers** (`farmhouse-*`):
- `.farmhouse-section` — warm cream gradient with diagonal grain texture
- `.farmhouse-card` — layered shadow, tan border, cream gradient
- `.farmhouse-card-white` — lighter card variant
- `.farmhouse-title` — Inter 700, `#2d1810` ⚠️ *hardcoded*
- `.farmhouse-body` — Georgia, `#4a3e35` ⚠️ *hardcoded*
- `.farmhouse-display` — Playfair Display 600, `#1a0e08` ⚠️ *hardcoded*
- `.farmhouse-subheader` — Georgia, `#3c2f26` ⚠️ *hardcoded*
- `.farmhouse-text-warm` — `#2d1810` ⚠️ *hardcoded*
- `.farmhouse-text-muted` — `#5a4d42` ⚠️ *hardcoded*
- `.farmhouse-heading` — *referenced in TSX but not defined in CSS* 🐛
- `.farmhouse-border` — *referenced in TSX but not defined in CSS* 🐛

### Tailwind Arbitrary CSS Variable Classes (from `usePerspectiveStyles()`)

Generated dynamically by the hook and applied inline:

```
bg-[var(--theme-primary)]
bg-[var(--theme-secondary)]
border-[var(--theme-accent)]
bg-[var(--theme-background)]
text-[var(--theme-foreground)]
text-[var(--theme-muted)]
border-[var(--theme-muted)]
hover:border-[var(--theme-primary)]
```

---

## 3. Default (Incidental) Baseline State

The **Default UI** — before any explicit user selection — is `startup_founders`.

Persistence: `localStorage.getItem("chb-perspective")` → falls back to `"startup_founders"` if missing.

### Default Active Values

| Property | Default Value |
|----------|--------------|
| `--perspective-primary` | `#01A9F4` (brand blue) |
| `--perspective-light` | `#CCE9FD` |
| Hero overlay | `linear-gradient(135deg, #01A9F4 0%, #0088CC 100%)`, opacity 0.5 |
| Hero brightness | 1.1 |
| Section class | `.founders-section` |
| Typography class | `.founders-title`, `.founders-body` |
| Container max-width | 1200px |
| Section padding | 2rem (compact) |
| Font weight | 800 (extra-bold) |
| Body font size | 0.875rem |
| Content voice | Authoritative, features-focused |
| `--primary` (Shadcn) | `#FE299E` (unchanged — pink is always primary) |
| `--secondary` (Shadcn) | `#01A9F4` (brand blue for this perspective) |

### Default Page → Component Visual Mapping

```
Navigation
  bg-white/95 + backdrop-blur-[12px]   nav-backdrop class
  Logo: CHB :-]                         text-foreground (dark on light)
  Perspective Selector: visible         color #01A9F4 active indicator

Hero Section
  Background: perspective image         brightness(1.1) contrast(1.2)
  Overlay: blue gradient                #01A9F4 → #0088CC, opacity 0.5
  H1: .text-fluid-hero                  .section-title-perspective → #01A9F4
  Subtext: text-white/90                on the hero overlay

Product Cards
  bg-card (white)
  Title: text-foreground
  Badge: bg-primary (#FE299E)

CTA Buttons
  bg: var(--brand-pink) = #FE299E      NEVER changes with perspective
  text: white
```

---

## 4. Shadcn Component Inventory

| Component | Import Count | Primary Usage |
|-----------|-------------|---------------|
| `button` | 22 | CTAs, form submits, nav actions |
| `card` / `card-header` / `card-content` | 12 | Product cards, account panels |
| `badge` | 9 | Tier labels, status indicators |
| `input` | 8 | Auth forms, admin fields |
| `label` | 7 | Form field labels |
| `tabs` / `tabs-list` / `tabs-trigger` / `tabs-content` | 5 | Creative process, product toggles |
| `select` / `select-item` | 4 | Admin filters |
| `tooltip` | 3 | Nav icons, info overlays |
| `textarea` | 3 | Contact form, admin notes |
| `dialog` | 3 | Auth modals, image editor |
| `separator` | 2 | Nav dividers, section breaks |
| `dropdown-menu` | 2 | Nav user menu |
| `toggle` | 1 | View mode switch |
| `toaster` / `toast` | 1 | Global notifications |
| `slider` | 1 | Admin image controls |
| `skeleton` | 1 | Loading states |
| `sheet` | 1 | Mobile nav drawer |
| `progress` | 1 | Account credit bar |
| `form` | 1 | React Hook Form wrapper |
| `collapsible` | 1 | Expandable FAQ |
| `checkbox` | 1 | Admin bulk select |
| `accordion` | 1 | Product FAQ sections |

All components are sourced from `@/components/ui/*` (Radix UI + shadcn defaults). No third-party UI components beyond shadcn.

---

## 5. Tailwind v4 Readiness Audit

### Breaking Changes to Prepare For

| Issue | v3 Pattern | v4 Pattern | Status |
|-------|-----------|-----------|--------|
| Config file | `tailwind.config.ts` with `theme.extend` | `@theme` block in CSS | Not migrated — plan required |
| `!important` prefix | `!text-white` | `text-white!` (suffix) | 4 instances flagged in creative-process.tsx |
| Plugin imports | `require("tailwindcss-animate")` | ESM `import` or `@plugin` | Will break with v4 |
| `darkMode: ["class"]` | `tailwind.config.ts` option | `@custom-variant dark (...)` in CSS | Not migrated |
| Arbitrary value opacity | `bg-[#FE299E]/80` | Works same + `bg-[var(...)]/80` also works | OK |

### Hardcoded Hex Values — Remediated

All hardcoded hex values in `.tsx`/`.ts` files have been moved to `client/src/lib/brand-colors.ts`:

| File | Was | Now |
|------|-----|-----|
| `creative-process.tsx` | `from-[#FE299E]`, `text-[#FE299E]` | `from-[var(--brand-pink)]`, `text-primary` |
| `account.tsx` | `text-[#FE299E]`, `color="#4CAF50"`, etc. | `text-primary`, `BRAND_COLORS.hash`, etc. |
| `semi-chat.tsx` | `\|\| '#FE299E'` | `\|\| 'var(--brand-pink)'` |
| `perspective-selector.tsx` | `color: "#01A9F4"` | `BRAND_COLORS.blue` |

### Hardcoded Values Still in CSS — Flagged for v4 Migration

These live in `index.css` inside named component classes. They work fine in v3 but should become CSS custom properties before a v4 migration:

```css
/* FLAGGED: founders-* classes */
.founders-title  { color: #1e40af; }  /* → var(--founders-text-primary) */
.founders-body   { color: #1e3a8a; }  /* → var(--founders-text-body) */

/* FLAGGED: creators-* classes */
.creators-title  { color: #7c3aed; }  /* → var(--creators-text-primary) */
.creators-body   { color: #6b21a8; }  /* → var(--creators-text-body) */
.creators-display{ color: #581c87; }  /* → var(--creators-text-display) */

/* FLAGGED: farmhouse-* classes */
.farmhouse-card  { background: #faf6f0 → #ede4d3; border: #c8b99c; }
.farmhouse-title { color: #2d1810; }  /* → var(--farmhouse-text-primary) */
.farmhouse-body  { color: #4a3e35; }  /* → var(--farmhouse-text-body) */
```

### Undefined CSS Classes — Bugs

These are referenced in TSX but have no corresponding CSS definition:

- `.founders-heading` — used in `startup-founders-deep-dive.tsx`
- `.creators-heading` — used in `content-creators-deep-dive.tsx`
- `.creators-border` — used in `content-creators-deep-dive.tsx`
- `.farmhouse-heading` — used in `memory-capturers-deep-dive.tsx`
- `.farmhouse-border` — used in `memory-capturers-deep-dive.tsx`

These fall through silently (no visual error) because they inherit from parent classes. They should either be defined or replaced with existing classes.

---

## 6. Brand Token Quick Reference

Defined in `client/src/lib/brand-colors.ts` (JS) and `client/src/index.css` (CSS):

| Token | JS Key | CSS Variable | Hex |
|-------|--------|-------------|-----|
| Brand Pink (CTA) | `BRAND_COLORS.pink` | `var(--brand-pink)` | `#FE299E` |
| Brand Yellow | `BRAND_COLORS.yellow` | `var(--brand-yellow)` | `#FFCF00` |
| Brand Green | `BRAND_COLORS.green` | `var(--brand-green)` | `#B8E986` |
| Brand Blue | `BRAND_COLORS.blue` | `var(--brand-blue)` | `#01A9F4` |
| Surface Dark | `BRAND_COLORS.surface` | `var(--brand-surface)` | `#111111` |
| Hash Product | `BRAND_COLORS.hash` | — | `#4CAF50` |
| Semi Product | `BRAND_COLORS.semi` | — | `#9C27B0` |
| Pipes Product | `BRAND_COLORS.pipes` | = `--brand-pink` | `#FE299E` |

---

*Last updated: March 2026 | Generated from: `index.css`, `perspective-themes.ts`, `use-perspective-theme.tsx`*
