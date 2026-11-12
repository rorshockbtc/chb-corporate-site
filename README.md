# Colon Hyphen Bracket `:-]`

Live site: [colonhyphenbracket.pink](https://colonhyphenbracket.pink)  
Principal portfolio: [hire.colonhyphenbracket.pink](https://hire.colonhyphenbracket.pink)  
Source: [github.com/rorshockbtc/chb-corporate-site](https://github.com/rorshockbtc/chb-corporate-site)

Independent product studio building local-first developer tools, sovereign software handovers, and editorial web systems — powered by the **Accént 3.0** design system.

---

## Routes

- `/` — Studio manifesto, seven-product overview, and sovereignty thesis
- `/products` — Seven live tools (`Pipes`, `BANG!`, `Hash`, `Semi`, `Marigold`, `Accént`, `CHB`)
- `/studio` — Engineering engagements (`$7,500` 1-week sprint, `$15k/mo` fractional principal partner, custom builds) + client handover proof ([Hacienda Chicuinaco](https://hire.colonhyphenbracket.pink/case-studies/chicuinaco))
- `/design` — Live **Accént 3.0** token reference, canonical product color slots, and editorial primitives
- `/manifesto` — Why software should work offline, export cleanly, and never hold users hostage
- `/contact` — Direct project & partnership intake

---

## Design System (`Accént 3.0`)

Operational rules live in [`AGENTS.md`](./AGENTS.md) and [`STYLES.md`](./STYLES.md), with typed tokens in [`client/src/styles/accent.config.ts`](./client/src/styles/accent.config.ts):

- **Surfaces & Ink:** Warm Alabaster (`#FAF8F5`) and Charcoal Ink (`#111827` / `#121113`)
- **Primary Accent & Filled CTAs:** Sovereign Hot Pink (`#FE299E`), shifting to Ink (`#111827`) on hover
- **Typography:** `Bricolage Grotesque` (display), `Plus Jakarta Sans` (body), `JetBrains Mono` (code/meta)
- **Legibility & Touch Contract:** Minimum `13px` (`0.8125rem`) body/UI text and `>= 44×44px` interactive touch targets

---

## Development & Deployment

```bash
npm run dev      # Local Express + Vite dev server
npm run check    # TypeScript type check (tsc)
npm run build    # Vite client bundle + esbuild server bundle -> dist/
npm start        # Run production build
```

Static client builds deploy to **Vercel** via `dist/public` (`npm run build`), including social OG metadata generation (`prerender-social.cjs`).

---

## License

MIT — see [`LICENSE`](./LICENSE). Copyright (c) 2026 Colon Hyphen Bracket, LLC.
