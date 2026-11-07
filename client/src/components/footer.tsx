import { Link } from "wouter";
import { ExternalLink, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export function Footer() {
  return (
    <footer className="bg-[#EAE0D0] border-t border-[#D3C7B5] py-16 text-[#281B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact & Direct Action Strip */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 pb-14 mb-14 border-b border-[#D3C7B5] items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#231814] text-[#FE299E] font-mono text-xs font-bold uppercase tracking-[0.15em]">
              DIRECT HUMAN CONTACT // NO TICKET QUEUES
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold font-serif text-[#281B16] leading-tight">
              Drop us a line <span className="font-mono text-[#FE299E]">:-]</span>
            </h3>
            <p className="text-[#4A3A32] text-base sm:text-lg leading-relaxed">
              Questions about claiming a <code className="font-mono font-bold text-[#281B16]">pipe\</code> namespace, migrating your Substack into <code className="font-mono font-bold text-[#281B16]">#</code> Hash Sanctuary, or commissioning a 1-week R&amp;D sprint? We read every note and reply personally.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://pipes.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#231814] hover:bg-[#3A2821] text-[#F2EAE0] font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                data-testid="footer-cta-pipes"
              >
                <span className="text-[#FE299E]">| | |</span>
                <span>Open Pipes.Pink</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#FE299E]" />
              </a>
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-lg bg-[#FE299E] hover:bg-[#E01E8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                data-testid="footer-cta-signup"
              >
                <span>Create :-] Account</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-sm text-[#4A3A32] pt-1">
              Prefer direct email?{" "}
              <a
                href="mailto:cubby@colonhyphenbracket.pink"
                className="text-[#281B16] font-semibold underline decoration-[#FE299E] decoration-2 underline-offset-4 hover:text-[#FE299E]"
              >
                cubby@colonhyphenbracket.pink
              </a>
            </p>
          </div>
          <div className="lg:col-span-6 bg-[#F2EAE0] border border-[#D3C7B5] rounded-2xl p-6 sm:p-8">
            <ContactForm variant="compact" subjectPrefix="CHB Footer" testIdPrefix="footer-contact" />
          </div>
        </div>

        {/* 4-Column Architectural Sitemap */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#231814] text-[#FE299E] font-mono text-sm font-bold">
                :-]
              </span>
              <span className="text-lg tracking-tight text-[#281B16]">
                <span className="font-bold">colon</span>
                <span className="font-normal text-[#4A3A32]">hyphen</span>
                <span className="font-bold">bracket</span>
              </span>
            </div>
            <p className="text-sm text-[#4A3A32] leading-relaxed">
              Sovereign knowledge infrastructure &amp; explicit perspective protocols for builders, creators, and families overlooked by Big Tech.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#281B16]">
              Sovereign Ecosystem
            </h4>
            <div className="space-y-2 text-sm text-[#4A3A32]">
              <div>
                <a
                  href="https://pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#281B16] font-semibold hover:text-[#FE299E] transition-colors inline-flex items-center gap-1.5"
                  data-testid="footer-pipes-link"
                >
                  <span className="font-mono text-xs text-[#FE299E] font-bold">| | |</span>
                  <span>Pipes (pipes.pink)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a
                  href="https://pipes.pink/write"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#281B16] transition-colors inline-flex items-center gap-1.5"
                  data-testid="footer-hash-link"
                >
                  <span className="font-mono text-xs text-[#1B6346] font-bold">#</span>
                  <span>Hash Sanctuary (in Pipes)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a
                  href="https://pipes.pink/write"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#281B16] transition-colors inline-flex items-center gap-1.5"
                  data-testid="footer-semi-link"
                >
                  <span className="font-mono text-xs text-[#B81468] font-bold">;-]</span>
                  <span>Semi Socratic Editor</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a
                  href="https://greater.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#281B16] transition-colors inline-flex items-center gap-1.5"
                  data-testid="footer-greater-link"
                >
                  <span className="font-mono text-xs text-[#0B5CAB] font-bold">&gt;</span>
                  <span>Greater Classrooms</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a
                  href="https://bolt.pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#281B16] transition-colors inline-flex items-center gap-1.5"
                  data-testid="footer-marigold-link"
                >
                  <span className="font-mono text-xs text-[#B85D19] font-bold">&amp;</span>
                  <span>Marigold &amp; Ampersand</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <Link
                  href="/scout"
                  className="hover:text-[#281B16] transition-colors inline-flex items-center gap-1.5"
                  data-testid="footer-scout-link"
                >
                  <span className="font-mono text-xs text-[#281B16] font-bold">&amp;</span>
                  <span>Scout Perspective Engine</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#281B16]">
              Architecture &amp; Studio
            </h4>
            <div className="space-y-2 text-sm text-[#4A3A32]">
              <div>
                <Link href="/products" className="hover:text-[#281B16] transition-colors">
                  All Products &amp; Pricing
                </Link>
              </div>
              <div>
                <Link href="/products/pipes" className="hover:text-[#281B16] transition-colors">
                  Pipes Protocol Spec
                </Link>
              </div>
              <div>
                <Link href="/roadmap" className="hover:text-[#281B16] transition-colors">
                  Shipped &amp; Forward Roadmap
                </Link>
              </div>
              <div>
                <Link href="/studio" className="text-[#281B16] font-semibold hover:text-[#FE299E] transition-colors">
                  CHB Studio &amp; R&amp;D Lab (/studio) →
                </Link>
              </div>
              <div>
                <a
                  href="https://design.pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FE299E] transition-colors inline-flex items-center gap-1"
                >
                  <span>/ Accént 3.0 (design.pipes.pink)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a
                  href="https://hire.colonhyphenbracket.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FE299E] transition-colors inline-flex items-center gap-1"
                >
                  <span>Kyle&apos;s Principal Portfolio</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#281B16]">
              Account &amp; Connect
            </h4>
            <div className="space-y-2 text-sm text-[#4A3A32]">
              <div>
                <Link
                  href="/signup"
                  className="text-[#281B16] font-semibold hover:text-[#FE299E] transition-colors"
                >
                  Create Universal :-] Account
                </Link>
              </div>
              <div>
                <Link href="/account" className="hover:text-[#281B16] transition-colors">
                  Sign In / Nostr NIP-07
                </Link>
              </div>
              <div>
                <a
                  href="https://twitter.com/chb_coop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#281B16] transition-colors"
                  data-testid="footer-business-twitter"
                >
                  @chb_coop
                </a>
              </div>
              <div>
                <a
                  href="mailto:cubby@colonhyphenbracket.pink"
                  className="hover:text-[#281B16] transition-colors"
                  data-testid="footer-email"
                >
                  cubby@colonhyphenbracket.pink
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D3C7B5] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A3A32] font-mono">
          <p>&copy; 2026 ColonHyphenBracket, LLC (:-]). Explicit perspective &gt; fake neutrality.</p>
          <p>Warm Albers Sandstone · Massimo Vignelli Grid · Powered by Pipes.Pink</p>
        </div>
      </div>
    </footer>
  );
}
