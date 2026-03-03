import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-xl tracking-wide">
              <span className="font-medium">colon</span>
              <span className="font-extralight">hyphen</span>
              <span className="font-medium">bracket</span>
            </div>
            <p className="text-muted-foreground">
              AI innovation for traditionalists & dissidents
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Products</h4>
            <div className="space-y-2 text-muted-foreground">
              <div>
                <a 
                  href="https://hash.pink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center space-x-1"
                  data-testid="footer-hash-link"
                >
                  <span>Hash</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a 
                  href="https://semi.pink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center space-x-1"
                  data-testid="footer-semi-link"
                >
                  <span>Semi</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <a 
                  href="/scout" 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-scout-link"
                >
                  Scout
                </a>
              </div>
              <div>
                <span className="text-muted-foreground/60">Pipes</span>
                <span className="text-xs ml-1 text-muted-foreground/40">(coming soon)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Company</h4>
            <div className="space-y-2 text-muted-foreground">
              <div><a href="/#ecosystem" className="hover:text-primary transition-colors">Philosophy</a></div>
              <div><a href="/roadmap" className="hover:text-primary transition-colors">Roadmap</a></div>
              <div><a href="/contact" className="hover:text-primary transition-colors">Contact</a></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Connect</h4>
            <div className="space-y-2 text-muted-foreground">
              <div>
                <a 
                  href="https://twitter.com/RorshockBTC" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-personal-twitter"
                >
                  @RorshockBTC
                </a>
              </div>
              <div>
                <a 
                  href="https://twitter.com/chb_coop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-business-twitter"
                >
                  @chb_coop
                </a>
              </div>
              <div>
                <a 
                  href="mailto:cubby@colonhyphenbracket.pink" 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 CHB (Colon Hyphen Bracket, LLC). AI innovation for traditionalists & dissidents.</p>
        </div>
      </div>
    </footer>
  );
}
