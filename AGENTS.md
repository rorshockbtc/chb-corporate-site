# AGENTS.md — Colon Hyphen Bracket Corporate (`rorshockbtc/chb-corporate-site`)

## Accént Design System Governance & Operational Contract

This repository is an official downstream consumer and brand showcase of **Accént 3.0** (`https://github.com/rorshockbtc/accent-ui` · `https://design.pipes.pink`).

> **Style vs. Operational Governance**: All visual, chromatic, typographic, and architectural specifications live in [`STYLES.md`](./STYLES.md) and [`client/src/styles/accent.config.ts`](./client/src/styles/accent.config.ts). This file specifies operational rules and workflow contracts for agents working in this codebase.

---

### 1. Assigned Brand Profiles (`src/styles/themes.ts` in `@rorshockbtc/accent-ui`)
- **Primary Flagship Theme**: `playful-principal`
  - **Canvas**: Crisp Alabaster `#FAF8F5`, Warm Stone Card `#F3EEE6`, Ink `#111827`
  - **Accents**: Sovereign Hot Pink `#FE299E` (mark/rule/primary CTA), Sky `#0A9BE0` / `#0B5CAB`, Emerald `#3FA535`
  - **Typography**: `Bricolage Grotesque` (display) + `Newsreader` (editorial serif) + `Inter` (UI sans) + `JetBrains Mono` (code/eyebrows)
  - **CTA Shape**: Pill (`--a-radius-cta: 9999px`)
  - **Signature Mark**: `: - ]` (animated via `<Smile />`)
- **Secondary Perspectives Theme**: `albers-perspectives`
  - **Canvas**: Josef Albers Warm Sandstone `#EAE0D0`, Deep Espresso Ink `#281B16`

### 2. Canonical Motion Primitives (`@rorshockbtc/accent-ui`)
All bespoke motion primitives built in `client/src/components/brand/` (`RiseLines`, `FadeUp`, `Hairline`, `Stagger`, `StaggerItem`, `Eyebrow`, `Smile`, `ScaryHeadline`) are synchronized with `@rorshockbtc/accent-ui` (`src/components/editorial-motion/AccentBrandMotion.tsx`).
- **Rule**: Never hardcode one-off cubic-beziers or bypass `useReducedMotion()`. Always use `EASE_EDITORIAL = [0.22, 1, 0.36, 1]` for Tier 2 entrance choreography and `EASE_ACCENT = [0.16, 1, 0.3, 1]` for Tier 1 micro-interactions.
- **Upstreaming**: If you create a new brand motion primitive in `client/src/components/brand/`, parameterize its colors with `var(--a-*)` tokens so it can be upstreamed to `rorshockbtc/accent-ui`.

### 3. Non-Negotiable Operational & Style Guardrails
1. **Sovereign Hot Pink `#FE299E` CTA Buttons**: Primary CTAs ("Bring us a challenge", "Start a project", "Book a one-week sprint", "Send note") must always use `#FE299E` with white text and `shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]`, transitioning to `#111827` on hover. Never use dark burgundy `#B81468` which appears muddied/dull on OLED displays.
2. **7 Distinct Product Colors**: Never duplicate signature product colors across ecosystem showcases. Pipes (`#EAB308`), Semi (`#FE299E`), Hash (`#C2410C`), BANG! (`#16A34A`), Greater (`#0284C7`), Accént (`#E11D48`), Marigold (`#D97706`).
3. **No Text Below 13px (`0.8125rem`)**: Even in monospace eyebrows (`<Eyebrow />`), badges, and footers.
4. **44×44px Minimum Touch Targets**: Every button, nav link, and perspective switcher control must meet `min-h-[44px]`.
5. **Hairlines Over Box-Shadows / Cards**: Architectural pedestals and hairlines (`1px solid var(--a-rule)`) replace heavy drop shadows and boxy cards.

### 4. Colophon & Cross-Repo Lineage
The site footer, `/manifesto`, and `/design` pages acknowledge upstream lineage: *"Built on Accént 3.0 · Playful-Principal Brand Adapter · MIT Open Source"*, linking to `https://design.pipes.pink` and `https://github.com/rorshockbtc/accent-ui`.
