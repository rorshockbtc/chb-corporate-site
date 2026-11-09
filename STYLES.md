# STYLES.md — Accént 3.0 Brand Adapter Contract (`playful-principal` & `albers-perspectives`)

> **Style Control Plane (`STYLES.md` vs. `AGENTS.md`)**: This file is the authoritative, rigid, opinionated design-system specification for **Colon Hyphen Bracket Corporate (`colonhyphenbracket.pink`)**. Operational agent rules belong in `AGENTS.md`; all visual, typographic, chromatic, structural, and motion rules live here and in [`client/src/styles/accent.config.ts`](./client/src/styles/accent.config.ts).
> Canonical Spec: https://design.pipes.pink/?brand=playful-principal · Upstream Package: [`rorshockbtc/accent-ui`](https://github.com/rorshockbtc/accent-ui)

---

## 1. Unique Styling Invariants (Preserve at All Costs)

1. **Sovereign Hot Pink (`#FE299E`) Primary CTAs & Brand Invariants**:
   - Primary CTA buttons ("Bring us a challenge", "Start a project", "Book a one-week sprint", "Send note", and flagship Semi actions) use sovereign Hot Pink (`#FE299E`) with crisp white text and signature glow shadow `shadow-[0_10px_30px_-10px_rgba(254,41,158,0.6)]`, transitioning to `#111827` ink on hover.
   - On mobile OLED screens (especially iPhone), `#B81468` renders visibly dark burgundy/wine which conflicts with brand identity. Sovereign Hot Pink (`#FE299E`) is the canonical primary CTA fill across all viewports.
   - Punctuation marks (`: - ]`), `<Smile />` eye-winks, `<Eyebrow />` brackets, strike-through bars (`<ScaryHeadline />`), and dynamic scroll/underline indicators strictly use `#FE299E`.
2. **Strict 7-Product Non-Repeating Signature Colors**:
   Each of the 7 punctuation products retains its sovereign signature color across `home.tsx`, `studio.tsx`, and `products.tsx` with zero collision:
   - `|||` **Pipes**: Solar Yellow (`#EAB308`) — bright beacon of verified knowledge
   - `!` **BANG!**: Emerald Green (`#16A34A`) — local execution runtime & freedom
   - `#` **Hash**: Burnt Terracotta / Rust (`#C2410C`) — quiet, private writing retreat
   - `; - ]` **Semi**: Sovereign Pink (`#FE299E`) — flagship Socratic editor
   - `>` **Greater**: Sky / Cobalt Blue (`#0284C7`) — universal classroom in 90+ languages
   - `é` **Accént**: Crimson / Ruby (`#E11D48`) — open-source typographic craft
   - `❀` **Marigold**: Amber Gold (`#D97706`) — local zero-knowledge civic analytics
3. **Architectural Pedestals Over Boxy Cards (De-Cardification)**:
   - Sticky belief panels use an understated left hairline divider (`border-l border-[#111827]/15 pl-8 lg:pl-10`) instead of boxy cards.
   - Platform showcases in `studio.tsx` breathe as open architectural pedestals with top hairlines (`border-t border-[#111827]/15 pt-6`).
4. **Typographic Expression (`Playful-Principal` Voice)**:
   - Display headers run on **Bricolage Grotesque** (`font-display font-bold`, optical tracking `-0.035em`).
   - Editorial pull-quotes & italics run on **Newsreader** / **Cormorant Garamond** (`font-serif italic`).
   - Technical tags & eyebrows run on **JetBrains Mono** (`font-mono`).
5. **Guy Billout Surrealist Editorial Artwork**:
   - Full-bleed WebP illustrations (`scary-staircase.webp`, `founders-blueprint`, `creators-terrace`, `families-lighthouse`) must remain uncropped and unhindered.
6. **Footer Restraint**:
   - The "Bitcoin Accepted Here" element in `footer.tsx` must remain a compact, tasteful pill badge (`text-xs font-mono uppercase tracking-[0.14em]`), never a loud banner card.

---

## 2. Mathematical & Accessibility Invariants (Accént Layer 1)

1. **Dual-Namespace CSS Variable Bridge (`client/src/index.css` & `client/src/styles/accent.config.ts`)**:
   - Root `:root` and `.dark` blocks map `--a-bg`, `--a-surface`, `--a-ink`, `--a-muted`, `--a-rule`, `--a-accent`, `--a-accent-fill`, `--a-accent-fg`, `--a-accent-text`, `--a-sky`, `--a-emerald`, and `--a-radius-cta` (`9999px`) directly to `--chb-*` aliases.
2. **Strict `13px` (`0.8125rem`) Typographic Floor**:
   - Zero `text-[10px]` or `text-[11px]` classes anywhere in `client/src/`. Minimum label/eyebrow size is `text-xs` (`13px`).
3. **`44×44px` Touch Targets**:
   - All buttons, nav links, and filter pills must enforce `min-h-[44px]`.
4. **Tier 2 Motion Primitives (`client/src/components/brand/`)**:
   - `RiseLines`, `FadeUp`, `Reveal`, `Hairline`, `Stagger`, `Eyebrow`, `ScaryHeadline`, and `Smile` are synchronized with `@rorshockbtc/accent-ui` (`[0.22, 1, 0.36, 1]` editorial curve + `stiffness: 240, damping: 24` spring) and honor `useReducedMotion()`.

---

## 3. Upstream Contribution Pipeline (`@rorshockbtc/accent-ui`)

When this imprint develops a new layout pedestal, component, or motion refinement:
1. **Local Incubation**: Keep it in `client/src/components/brand/` and declare it in `client/src/styles/accent.config.ts` under `upstreamCandidates`.
2. **Audit & Parameterization**: Run `npx @rorshockbtc/accent-ui contribute <path-to-component>` (or `node scripts/accent-contribute.js`) to verify:
   - Zero hardcoded hex codes (all colors mapped to `--a-*` semantic variables).
   - $\ge 13\text{px}$ type floor compliance and $\ge 44\times 44\text{px}$ touch targets.
   - GPU-only composited motion (`transform`, `opacity`).
3. **Upstream PR**: Submit to `rorshockbtc/accent-ui` to make the primitive available across the entire ecosystem without manual cross-repo PR arbitration.
