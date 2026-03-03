import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";

export function HeroSection() {
  const { isTransitioning, currentPerspective } = usePerspective();
  const { getHeroSettings } = usePerspectiveTheme();
  const heroSettings = getHeroSettings();
  
  const heroImage = usePerspectiveContent({
    startup_founders: "/generated/images/startup_founders_playful_juggling.png",
    content_creators: "/generated/images/content_creators_creative_flow.png", 
    memory_capturers: "/generated/images/memory_capturers_lake_whimsical.png"
  });

  const heroContent = usePerspectiveContent({
    startup_founders: {
      title: "Scale your vision",
      description: ":-] helps entrepreneurs build products for market segments overlooked by Silicon Valley. Traditional values, growth-focused solutions, and AI that respects your product's positioning and competitive advantages.",
    },
    content_creators: {
      title: "Create authentically",
      description: ":-] builds technology for the creators and storytellers overlooked by Big Tech. Creative tools that amplify your unique voice, respect your intellectual property, and help you build genuine audience connections.",
    },
    memory_capturers: {
      title: "Preserve what matters", 
      description: "Whether you're preserving decades of family stories or capturing today's precious moments, our technology helps you breathe life into memories while you're busy living them. :-] is there when you want us, invisible when you don't.",
    }
  });

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Cinematic full-bleed background with accessibility-focused layering */}
      <div className="absolute inset-0">
        
        {/* Base hero image - higher visibility for cinematic effect */}
        <div 
          className="absolute inset-0"
          style={{
            filter: `brightness(${heroSettings.brightness}) contrast(${heroSettings.contrast})`
          }}
        >
          <img 
            src={heroImage} 
            alt=""
            className="w-full h-full object-cover object-center opacity-60" 
          />
        </div>
        
        {/* Controlled scrim that ensures text readability zones */}
        <div className="absolute inset-0">
          {/* Light gradient scrim for navigation area - top 20% */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent"></div>
          
          {/* Text readability zone - adaptive background for content area */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/60 to-transparent"
            style={{
              background: `linear-gradient(135deg, 
                var(--background) 0%, 
                hsla(var(--background-hsl, 0, 0%, 100%), 0.95) 20%, 
                hsla(var(--background-hsl, 0, 0%, 100%), 0.75) 40%, 
                transparent 70%
              )`
            }}
          ></div>
          
        </div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8">
          {/* Left-aligned content layout for better readability */}
          <div className="text-left py-24 lg:py-32">
            <div className={`perspective-content transition-all duration-1000 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              
              {/* Dramatic headline - left-aligned for readability */}
              <h1 className="text-fluid-hero mb-8 tracking-tight section-title-perspective font-bold" data-testid="hero-title">
                <span className="block">{heroContent.title}</span>
              </h1>
              
              {/* Elegant supporting text with proper hierarchy - left-aligned container */}
              <div className="max-w-3xl mb-12">
                <p className="text-fluid-body-xl text-muted-foreground font-light" data-testid="hero-description">
                  {heroContent.description}
                </p>
              </div>
              
              {/* Clean CTAs - left-aligned for consistency */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center items-start">
                <a 
                  href="mailto:cubby@colonhyphenbracket.pink" 
                  className="bg-foreground text-background px-8 py-4 rounded-full text-base font-medium hover:bg-foreground/90 hover:scale-[1.02] transition-all duration-300 shadow-lg"
                  data-testid="button-email"
                >
                  Start a Conversation
                </a>
                <div className="hidden sm:flex items-center justify-center h-[56px] text-sm text-foreground/60 font-light px-4">
                  <span>or</span>
                </div>
                <a 
                  href="#products" 
                  className="border border-foreground/30 text-foreground px-8 py-4 rounded-full text-base font-light hover:border-foreground/60 hover:text-foreground hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm bg-white/40"
                  data-testid="button-explore"
                >
                  Explore Our Work
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}