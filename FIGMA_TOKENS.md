# FIGMA_TOKENS.md
## CHB Brand — CSS Variable Export for Figma Tokens

> Import this file into Figma via the **Tokens Studio** plugin (formerly Figma Tokens).
> All values are production-accurate as of March 2026.
> Variables marked `[RUNTIME]` are set dynamically and should be mapped to Figma modes.

---

## 1. Brand Colors (Global / Perspective-Immune)

These never change regardless of active perspective.

```json
{
  "brand": {
    "pink": {
      "value": "#FE299E",
      "type": "color",
      "description": "Primary CTA color. Never override. CHB signature."
    },
    "yellow": {
      "value": "#FFCF00",
      "type": "color",
      "description": "Secondary highlight, tier badges, attention elements."
    },
    "green": {
      "value": "#B8E986",
      "type": "color",
      "description": "Tertiary. Memory Capturers light accent. Hash product color."
    },
    "blue": {
      "value": "#01A9F4",
      "type": "color",
      "description": "Quaternary. Startup Founders perspective. Semi product color."
    },
    "surface": {
      "value": "#111111",
      "type": "color",
      "description": "Dark surface base. Footer, dark nav states."
    },
    "textOnSurface": {
      "value": "#EEEEEE",
      "type": "color",
      "description": "Light body text on dark/surface backgrounds."
    }
  }
}
```

---

## 2. Semantic / Base Tokens (Shadcn System)

```json
{
  "semantic": {
    "background": {
      "value": "hsl(0, 0%, 99%)",
      "type": "color",
      "description": "Default page background. Near-white."
    },
    "foreground": {
      "value": "hsl(215, 25%, 15%)",
      "type": "color",
      "description": "Default text color on light backgrounds."
    },
    "card": {
      "value": "hsl(0, 0%, 100%)",
      "type": "color"
    },
    "cardForeground": {
      "value": "hsl(215, 25%, 15%)",
      "type": "color"
    },
    "muted": {
      "value": "hsl(210, 20%, 96%)",
      "type": "color",
      "description": "Avoid using directly — low contrast on light surfaces."
    },
    "mutedForeground": {
      "value": "hsl(215, 15%, 55%)",
      "type": "color",
      "description": "Subdued text. Verify contrast before use."
    },
    "border": {
      "value": "hsl(210, 20%, 88%)",
      "type": "color"
    },
    "input": {
      "value": "hsl(210, 20%, 94%)",
      "type": "color"
    },
    "ring": {
      "value": "hsl(330, 65%, 55%)",
      "type": "color",
      "description": "Focus ring. Warm pink-adjacent."
    },
    "destructive": {
      "value": "hsl(0, 70%, 50%)",
      "type": "color"
    }
  }
}
```

---

## 3. Perspective Modes (Figma Variable Modes)

Create three Figma modes: `startup_founders`, `content_creators`, `memory_capturers`.

```json
{
  "perspective": {
    "primary": {
      "startup_founders": { "value": "#01A9F4", "type": "color" },
      "content_creators": { "value": "hsl(328, 85%, 70%)", "type": "color" },
      "memory_capturers": { "value": "hsl(142, 76%, 36%)", "type": "color" }
    },
    "accent": {
      "startup_founders": { "value": "hsl(142, 76%, 36%)", "type": "color" },
      "content_creators": { "value": "hsl(45, 93%, 47%)", "type": "color" },
      "memory_capturers": { "value": "hsl(25, 95%, 53%)", "type": "color" }
    },
    "secondary": {
      "startup_founders": { "value": "#33B3F6", "type": "color" },
      "content_creators": { "value": "hsl(328, 85%, 80%)", "type": "color" },
      "memory_capturers": { "value": "hsl(142, 76%, 46%)", "type": "color" }
    },
    "light": {
      "startup_founders": { "value": "#CCE9FD", "type": "color" },
      "content_creators": { "value": "hsl(328, 70%, 90%)", "type": "color" },
      "memory_capturers": { "value": "hsl(142, 60%, 85%)", "type": "color" }
    },
    "pageBackground": {
      "startup_founders": { "value": "hsl(0, 0%, 100%)", "type": "color" },
      "content_creators": { "value": "hsl(0, 0%, 100%)", "type": "color" },
      "memory_capturers": { "value": "hsl(45, 25%, 98%)", "type": "color" }
    }
  }
}
```

---

## 4. Typography Tokens

```json
{
  "font": {
    "family": {
      "sans": {
        "value": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        "type": "fontFamily"
      },
      "serif": {
        "value": "Playfair Display, Georgia, serif",
        "type": "fontFamily"
      },
      "mono": {
        "value": "JetBrains Mono, SF Mono, Consolas, monospace",
        "type": "fontFamily"
      }
    },
    "size": {
      "hero": {
        "value": "clamp(2.5rem, 5vw + 1rem, 5rem)",
        "type": "fontSize",
        "description": "40px → 80px. Page hero headlines."
      },
      "display": {
        "value": "clamp(2rem, 4vw + 0.75rem, 3.5rem)",
        "type": "fontSize",
        "description": "32px → 56px. Section headers."
      },
      "heading": {
        "value": "clamp(1.5rem, 3vw + 0.5rem, 2.25rem)",
        "type": "fontSize",
        "description": "24px → 36px. Subheadings."
      },
      "bodyXL": {
        "value": "clamp(1.125rem, 2vw + 0.5rem, 1.5rem)",
        "type": "fontSize",
        "description": "18px → 24px. Lead copy."
      },
      "body": {
        "value": "clamp(1rem, 1.5vw + 0.25rem, 1.25rem)",
        "type": "fontSize",
        "description": "16px → 20px. Standard body."
      },
      "caption": {
        "value": "clamp(0.875rem, 1vw + 0.25rem, 1rem)",
        "type": "fontSize",
        "description": "14px → 16px. Labels, captions."
      }
    },
    "weight": {
      "black":     { "value": "900", "type": "fontWeight" },
      "extraBold": { "value": "800", "type": "fontWeight" },
      "bold":      { "value": "700", "type": "fontWeight" },
      "semiBold":  { "value": "600", "type": "fontWeight" },
      "medium":    { "value": "500", "type": "fontWeight" },
      "regular":   { "value": "400", "type": "fontWeight" },
      "light":     { "value": "300", "type": "fontWeight" }
    },
    "lineHeight": {
      "hero":    { "value": "1.1–1.3 (fluid)", "type": "lineHeight" },
      "display": { "value": "1.2–1.4 (fluid)", "type": "lineHeight" },
      "body":    { "value": "1.5–1.8 (fluid)", "type": "lineHeight" }
    },
    "letterSpacing": {
      "tight":   { "value": "-0.02em", "type": "letterSpacing", "description": "Hero / black weight" },
      "snug":    { "value": "-0.015em", "type": "letterSpacing", "description": "Display / extra-bold" },
      "normal":  { "value": "-0.01em", "type": "letterSpacing", "description": "Headings" },
      "default": { "value": "0", "type": "letterSpacing" }
    }
  }
}
```

---

## 5. Border Radius

```json
{
  "radius": {
    "sm":      { "value": "12px", "type": "borderRadius" },
    "md":      { "value": "14px", "type": "borderRadius" },
    "lg":      { "value": "16px", "type": "borderRadius", "description": "Default card/button radius" },
    "xl":      { "value": "20px", "type": "borderRadius" },
    "farmhouse": { "value": "18px", "type": "borderRadius", "description": "Memory Capturers cards" },
    "pill":    { "value": "9999px", "type": "borderRadius", "description": "Tier badges, pills" }
  }
}
```

---

## 6. Spacing / Container

```json
{
  "spacing": {
    "sectionCompact":      { "value": "2rem", "type": "spacing", "description": "Startup Founders sections" },
    "sectionComfortable":  { "value": "3rem", "type": "spacing", "description": "Content Creators sections" },
    "sectionSpacious":     { "value": "4rem", "type": "spacing", "description": "Memory Capturers sections" }
  },
  "container": {
    "founders": { "value": "1200px", "type": "sizing" },
    "creators": { "value": "1100px", "type": "sizing" },
    "memory":   { "value": "1000px", "type": "sizing" }
  }
}
```

---

## 7. Farmhouse / Memory Capturers Specialty Colors

These are used only in the Memory Capturers perspective and do not map to the brand sheet.
They represent the vintage postcard / southern farmhouse aesthetic for that demographic.

```json
{
  "farmhouse": {
    "cardBg":         { "value": "#faf6f0", "type": "color" },
    "cardBgMid":      { "value": "#f2ede3", "type": "color" },
    "cardBgDeep":     { "value": "#ede4d3", "type": "color" },
    "cardBorder":     { "value": "#c8b99c", "type": "color" },
    "textWarm":       { "value": "#2d1810", "type": "color" },
    "textMuted":      { "value": "#5a4d42", "type": "color" },
    "textBody":       { "value": "#4a3e35", "type": "color" },
    "sectionBg":      { "value": "#f8f4ee", "type": "color" },
    "sectionBgDeep":  { "value": "#e9e2d4", "type": "color" }
  }
}
```

---

## Figma Setup Instructions

1. Install **Tokens Studio** plugin in Figma
2. Create a new token set named `CHB Brand`
3. Paste each JSON block above into its corresponding token group
4. For perspective tokens, create **three modes**: `startup_founders`, `content_creators`, `memory_capturers`
5. Map `perspective/primary` as your primary accent variable — it drives section titles, borders, and secondary buttons
6. Map `brand/pink` (#FE299E) as a **separate, fixed** CTA color — it should NOT be a mode variable
7. Publish tokens to your Figma file's local variables panel

---

*Last updated: March 2026 | Exports from: `client/src/index.css` + `client/src/config/perspective-themes.ts`*
