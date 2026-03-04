# ColonHyphenBracket Design System (:-])
## The Visual Language of Perspective-Switching

This document defines the formal design system for the CHB corporate ecosystem. It is designed to be consumed by both developers (via CSS variables) and designers (via Figma Tokens).

---

## 1. Core Brand DNA

The CHB brand is built on a foundation of "Incidental Baseline" stability, layered with "Perspective-Specific" overlays.

| Token | Hex | Usage |
|-------|-----|-------|
| **Brand Pink** | `#FE299E` | Universal Primary / CTA. Never changes. |
| **Brand Yellow** | `#FFCF00` | Secondary highlight / Badges. |
| **Brand Green** | `#B8E986` | Hash Product / Tertiary. |
| **Brand Blue** | `#01A9F4` | Semi Product / Quaternary. |
| **Surface** | `#111111` | Dark mode base / Footers. |
| **Text on Surface** | `#EEEEEE` | High-contrast light typography. |

---

## 2. Perspective Systems (The Pipes)

The UI dynamically re-skins itself based on the active audience perspective.

### Startup Founders (Precision & Scale)
- **Primary**: `#01A9F4` (Brand Blue)
- **Accent**: `hsl(142, 76%, 36%)` (Success Green)
- **Typography**: Inter (Authoritative, Bold)
- **Imagery**: Geometric, blue-tinted, professional.

### Content Creators (Flow & Expression)
- **Primary**: `hsl(328, 85%, 70%)` (Creative Magenta)
- **Accent**: `hsl(45, 93%, 47%)` (Vibrant Yellow)
- **Typography**: Playfair Display (Playful, Editorial)
- **Imagery**: Abstract, warm-tinted, artistic.

### Memory Capturers (Legacy & Connection)
- **Primary**: `hsl(142, 76%, 36%)` (Nurturing Green)
- **Accent**: `hsl(25, 95%, 53%)` (Warm Orange)
- **Typography**: Georgia / Playfair (Elegant, Emotional)
- **Imagery**: Farmhouse aesthetic, vintage postcard style.

---

## 3. Typography (Fluid Scale)

We use a "Fluid Scaling" system that responds to viewport width without breakpoints.

- **Hero**: `clamp(2.5rem, 5vw + 1rem, 5rem)`
- **Display**: `clamp(2rem, 4vw + 0.75rem, 3.5rem)`
- **Body**: `clamp(1rem, 1.5vw + 0.25rem, 1.25rem)`

---

## 4. Component Patterns

- **Buttons**: 16px radius (`--radius`).
- **Cards**: Layered shadows, subtle borders (`border-border`).
- **Pipes Link**: Perspective-aware action buttons with lift on hover.

---

*© 2026 Colon Hyphen Bracket, LLC. Every Pipe is a real slice of humanity. :-]*
