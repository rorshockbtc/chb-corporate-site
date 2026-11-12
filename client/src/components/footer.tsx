import { Link } from "wouter";
import { Smile } from "@/components/brand/smile";
import { PRODUCT_COLORS } from "@/lib/product-colors";

const FOOTER_LINK =
  "link-swipe inline-flex items-center min-h-[44px] no-underline text-white/80 hover:text-white";

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
              className="link-swipe inline-flex items-center min-h-[44px] mt-5 text-lg text-white/80 hover:text-white no-underline"
            >
              cubby@colonhyphenbracket.pink
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-2">Studio</div>
            <ul className="text-[15px]">
              <li><Link href="/studio" className={FOOTER_LINK}>How we work</Link></li>
              <li><Link href="/manifesto" className={FOOTER_LINK}>Manifesto</Link></li>
              <li><Link href="/contact" className={FOOTER_LINK}>Start a project</Link></li>
              <li>
                <a
                  href="https://hire.colonhyphenbracket.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_LINK}
                >
                  About Kyle ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-2">Products</div>
            <ul className="text-[15px]">
              <li><Link href="/products" className={FOOTER_LINK}>All 7 tools</Link></li>
              <li>
                <a href="https://pipes.pink" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                  Pipes <span className="ml-1.5 font-mono font-bold" style={{ color: PRODUCT_COLORS.pipes }}>|||</span>
                </a>
              </li>
              <li>
                <a href="https://pipes.pink/desktop/bang" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                  BANG! <span className="ml-1.5 font-mono font-bold" style={{ color: PRODUCT_COLORS.bang }}>!</span>
                </a>
              </li>
              <li>
                <a href="https://pipes.pink/write" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                  Hash <span className="mx-1 font-mono font-bold" style={{ color: PRODUCT_COLORS.hash }}>#</span> &amp; Semi <span className="ml-1 font-mono font-bold" style={{ color: PRODUCT_COLORS.semi }}>; - ]</span>
                </a>
              </li>
              <li>
                <a href="https://greater.pink" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                  Greater <span className="ml-1.5 font-mono font-bold" style={{ color: PRODUCT_COLORS.greater }}>&gt;</span>
                </a>
              </li>
              <li>
                <a href="https://marigoldinsights.org" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                  Marigold <span className="ml-1.5" style={{ color: PRODUCT_COLORS.marigold }}>❀</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-white mb-2">Open</div>
            <ul className="text-[15px]">
              <li>
                <a href="https://design.pipes.pink" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                  Accént design system <span className="ml-1.5 font-bold" style={{ color: PRODUCT_COLORS.accent }}>é</span>
                </a>
              </li>
              <li><Link href="/design" className={FOOTER_LINK}>Brand adapter : - ]</Link></li>
              <li><a href="https://github.com/rorshockbtc" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>GitHub</a></li>
              <li><a href="https://pipes.pink" target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>Pipes sign in ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-white/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-wrap">
            <span>© 2026 Colon Hyphen Bracket, LLC. Independent. Opinionated. Kind.</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>
              Built on{" "}
              <a
                href="https://design.pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="link-swipe text-white/80 hover:text-white no-underline font-medium"
              >
                Accént 3.0
              </a>{" "}
              ·{" "}
              <a
                href="https://github.com/rorshockbtc/accent-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="link-swipe text-white/80 hover:text-white no-underline font-medium"
              >
                Playful-Principal Brand Adapter
              </a>{" "}
              · MIT Open Source
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 shrink-0">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/85 text-[13px] font-medium tracking-tight"
              data-testid="footer-bitcoin-badge"
            >
              <span className="text-[#F7931A] font-bold text-[13px] leading-none" aria-hidden="true">₿</span>
              <span>Bitcoin Accepted Here</span>
            </span>
            <a
              href="https://github.com/rorshockbtc/chb-corporate-site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-white/65 hover:text-white transition-colors text-[13px] no-underline"
            >
              Source on GitHub (MIT) ↗
            </a>
            <a
              href="https://hire.colonhyphenbracket.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-white/65 hover:text-white transition-colors text-[13px] no-underline"
            >
              Kyle&apos;s Portfolio ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
