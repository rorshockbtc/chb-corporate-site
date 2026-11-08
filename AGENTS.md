# AGENTS.md — Colon Hyphen Bracket Corporate (`rorshockbtc/chb-corporate-site`)

## Accént Design System Governance & Engineered Drift Contract

This repository is an official downstream consumer and brand showcase of **Accént 3.0** (`https://github.com/rorshockbtc/accent-ui` · `https://design.pipes.pink`).

### 1. Assigned Brand Profiles (`src/styles/themes.ts` in `@rorshockbtc/accent-ui`)
- **Primary Flagship Theme**: `playful-principal`
  - **Canvas**: Crisp Alabaster `#FAF8F5`, Warm Stone Card `#F3EEE6`, Ink `#111827`
  - **Accents**: CHB Hot Pink `#FE299E` (mark/rule), Accessible Pink Fill `#B81468` (WCAG AA button fill with `#FFFFFF` text), Sky `#0A9BE0` / `#0B5CAB`, Emerald `#3FA535`
  - **Typography**: `Bricolage Grotesque` (display) + `Newsreader` (editorial serif) + `Inter` (UI sans) + `JetBrains Mono` (code/eyebrows)
  - **CTA Shape**: Pill (`--a-radius-cta: 9999px`)
  - **Signature Mark**: `: - ]` (animated via `<Smile />`)
- **Secondary Perspectives Theme**: `albers-perspectives`
  - **Canvas**: Josef Albers Warm Sandstone `#EAE0D0`, Deep Espresso Ink `#281B16`

### 2. Canonical Motion Primitives (`@rorshockbtc/accent-ui`)
All bespoke motion primitives built in `client/src/components/brand/` (`RiseLines`, `FadeUp`, `Hairline`, `Stagger`, `StaggerItem`, `Eyebrow`, `Smile`, `ScaryHeadline`) have been upstreamed to `@rorshockbtc/accent-ui` (`src/components/editorial-motion/AccentBrandMotion.tsx`).
- **Rule**: Never hardcode one-off cubic-beziers or bypass `useReducedMotion()`. Always use `EASE_EDITORIAL = [0.22, 1, 0.36, 1]` for Tier 2 entrance choreography and `EASE_ACCENT = [0.16, 1, 0.3, 1]` for Tier 1 micro-interactions.
- **Upstreaming**: If you create a new brand motion primitive in `client/src/components/brand/`, parameterize its colors with `var(--a-*)` tokens so it can be upstreamed to `rorshockbtc/accent-ui`.

### 3. Non-Negotiable Accént Invariants
1. **No Text Below 13px (`0.8125rem`)**: Even in monospace eyebrows (`<Eyebrow />`), badges, and footers.
2. **44×44px Minimum Touch Targets**: Every button, nav link, and perspective switcher control must meet `min-h-[44px]`.
3. **WCAG 2.1 AA/AAA Contrast**: Never place `#FFFFFF` text on raw `#FE299E` buttons (`3.4:1` fails AA); use `--a-accent-fill` (`#B81468`, `5.6:1` AA) or dark `#111827` ink.
4. **Hairlines Over Box-Shadows**: Divide sections with `1px solid var(--a-rule)` hairlines and `<Hairline />` draws rather than SaaS drop shadows.

### 4. Adapter & Token Bridge Architecture
- **Adapter Config**: `client/src/styles/accent.config.ts` mirrors the upstream `playful-principal` and `albers-perspectives` brand profiles from `rorshockbtc/accent-ui` (`src/styles/themes.ts`).
- **Token Bridge**: `client/src/index.css` maps `--a-*` variables alongside `--chb-*` dual-namespace aliases.
- **Accessible Fill Rule**: Primary pink buttons with white text utilize `--a-accent-fill` (`#B81468`, 5.6:1 WCAG AA) or dark `#111827` ink, preserving `#FE299E` for punctuation marks (`: - ]`), strike-through bars, and accent rules.
- **Colophon**: The site footer, `/manifesto`, and `/design` pages acknowledge upstream lineage: *"Built on Accént 3.0 · Playful-Principal Brand Adapter · MIT Open Source"*.
