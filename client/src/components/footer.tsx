import { Link } from "wouter";
import { Smile } from "@/components/brand/smile";

export function Footer() {
  return (
    <footer className="bg-[#111827] text-[#FAF8F5]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <Smile className="text-[96px] sm:text-[140px]" color="#FE299E" winkEvery={5000} />
            <p className="font-display text-3xl sm:text-4xl font-bold mt-6 max-w-md leading-tight">
              Scary words in. Smiles out.
            </p>
            <a
              href="mailto:cubby@colonhyphenbracket.pink"
              className="link-swipe inline-block mt-6 text-lg text-white/80 hover:text-white no-underline"
            >
              cubby@colonhyphenbracket.pink
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-4">Studio</div>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/studio" className="link-swipe no-underline text-white/80 hover:text-white">How we work</Link></li>
              <li><Link href="/manifesto" className="link-swipe no-underline text-white/80 hover:text-white">Manifesto</Link></li>
              <li><Link href="/contact" className="link-swipe no-underline text-white/80 hover:text-white">Start a project</Link></li>
              <li><a href="https://hire.colonhyphenbracket.pink" className="link-swipe no-underline text-white/80 hover:text-white">About Kyle ↗</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-4">Products</div>
            <ul className="space-y-2.5 text-[15px]">
              <li><a href="https://pipes.pink" className="link-swipe no-underline text-white/80 hover:text-white">Pipes |||</a></li>
              <li><a href="https://pipes.pink/write" className="link-swipe no-underline text-white/80 hover:text-white">Hash # &amp; Semi ; - ]</a></li>
              <li><a href="https://greater.pink" className="link-swipe no-underline text-white/80 hover:text-white">Greater &gt;</a></li>
              <li><a href="https://marigoldinsights.org" className="link-swipe no-underline text-white/80 hover:text-white">Marigold ❀</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-4">Open</div>
            <ul className="space-y-2.5 text-[15px]">
              <li><a href="https://design.pipes.pink" className="link-swipe no-underline text-white/80 hover:text-white">Accént design system é</a></li>
              <li><a href="https://github.com/rorshockbtc" className="link-swipe no-underline text-white/80 hover:text-white">GitHub</a></li>
              <li><Link href="/account" className="link-swipe no-underline text-white/80 hover:text-white">Sign in</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-white/55">
          <span>© 2026 Colon Hyphen Bracket, LLC. Independent. Opinionated. Kind.</span>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80 text-xs font-medium tracking-tight"
              data-testid="footer-bitcoin-badge"
            >
              <span className="text-[#F7931A] font-bold text-xs leading-none" aria-hidden="true">₿</span>
              <span>Bitcoin Accepted Here</span>
            </span>
            <span className="text-white/45">This site is the portfolio. View source if you like.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
