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
            <a href="mailto:cubby@colonhyphenbracket.pink"
              className="link-swipe inline-block mt-6 text-lg text-white/80 hover:text-white no-underline">
              cubby@colonhyphenbracket.pink
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-4">Studio</div>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/studio" className="link-swipe no-underline text-white/80 hover:text-white">How we work</Link></li>
              <li><Link href="/contact" className="link-swipe no-underline text-white/80 hover:text-white">Start a project</Link></li>
              <li><a href="https://hire.colonhyphenbracket.pink" className="link-swipe no-underline text-white/80 hover:text-white">About Kyle ↗</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-4">Products</div>
            <ul className="space-y-2.5 text-[15px]">
              <li><a href="https://pipes.pink" className="link-swipe no-underline text-white/80 hover:text-white">Pipes |</a></li>
              <li><a href="https://pipes.pink/write" className="link-swipe no-underline text-white/80 hover:text-white">Hash # &amp; Semi ;-]</a></li>
              <li><a href="https://greater.pink" className="link-swipe no-underline text-white/80 hover:text-white">Greater &gt;</a></li>
              <li><Link href="/roadmap" className="link-swipe no-underline text-white/80 hover:text-white">Roadmap</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-4">Open</div>
            <ul className="space-y-2.5 text-[15px]">
              <li><a href="https://design.pipes.pink" className="link-swipe no-underline text-white/80 hover:text-white">Accént design system /</a></li>
              <li><a href="https://github.com/rorshockbtc" className="link-swipe no-underline text-white/80 hover:text-white">GitHub</a></li>
              <li><Link href="/account" className="link-swipe no-underline text-white/80 hover:text-white">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-3 text-sm text-white/50">
          <span>© 2026 Colon Hyphen Bracket, LLC. Independent. Opinionated. Kind.</span>
          <span>This site is the portfolio. View source if you like.</span>
        </div>
      </div>
    </footer>
  );
}
