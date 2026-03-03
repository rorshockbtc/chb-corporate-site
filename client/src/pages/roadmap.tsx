import { Check } from "lucide-react";
import { usePerspectiveContent } from "@/hooks/use-perspective";

export default function Roadmap() {
  // Perspective-aware hero imagery for structured layout
  const heroImage = usePerspectiveContent({
    startup_founders: "/generated/images/startup_founders_roadmap_hero.png",
    content_creators: "/generated/images/content_creators_roadmap_hero.png", 
    memory_capturers: "/generated/images/memory_capturers_roadmap_hero.png"
  });
  
  const phases = [
    {
      id: "foundation",
      title: "Foundation",
      status: "complete",
      icon: Check,
      iconColor: "bg-brand-green text-black",
      content: {
        startup_founders: [
          "✓ Business intelligence management (Hash)",
          "✓ AI strategic partnership (Semi)",
          "✓ Market pattern recognition (Scout)"
        ],
        content_creators: [
          "✓ Creative knowledge management (Hash)",
          "✓ AI writing partnership (Semi)",
          "✓ Content pattern recognition (Scout)"
        ],
        memory_capturers: [
          "✓ Family knowledge management (Hash)",
          "✓ AI conversation partnership (Semi)",
          "✓ Memory pattern recognition (Scout)"
        ]
      }
    },
    {
      id: "integration",
      title: "Integration",
      status: "in-progress",
      icon: "2",
      iconColor: "bg-brand-yellow text-black",
      content: {
        startup_founders: [
          "→ Business perspective switching (Pipes)",
          "→ Universal :-] authentication",
          "→ Cross-app context persistence",
          "→ Enhanced data security"
        ],
        content_creators: [
          "→ Creative perspective switching (Pipes)",
          "→ Universal :-] authentication",
          "→ Cross-platform synchronization",
          "→ Enhanced privacy controls"
        ],
        memory_capturers: [
          "→ Family perspective switching (Pipes)",
          "→ Universal :-] authentication",
          "→ Cross-generation synchronization",
          "→ Enhanced privacy controls"
        ]
      }
    },
    {
      id: "evolution",
      title: "Evolution",
      status: "planned",
      icon: "3",
      iconColor: "bg-brand-blue text-white",
      content: {
        startup_founders: [
          "→ Predictive market insights",
          "→ Business community sharing",
          "→ Enterprise-grade security",
          "→ Global market access"
        ],
        content_creators: [
          "→ Predictive creative suggestions",
          "→ Creator community sharing",
          "→ Creator-grade security",
          "→ Global creative reach"
        ],
        memory_capturers: [
          "→ Predictive memory connections",
          "→ Family knowledge sharing",
          "→ Family-grade security",
          "→ Generational accessibility"
        ]
      }
    }
  ];

  const visionContent = usePerspectiveContent({
    startup_founders: {
      title: "Our Business Vision",
      description: "AI that accelerates growth, not bureaucracy. Technology that respects market dynamics, protects competitive advantage, and amplifies strategic capabilities without overwhelming complexity.",
      principles: [
        "Market opportunity comes first",
        "Competitive advantage is non-negotiable", 
        "Technology should drive business results",
        "AI should enhance, not replace, strategic thinking"
      ]
    },
    content_creators: {
      title: "Our Creative Vision",
      description: "AI that amplifies creativity, not conformity. Technology that respects artistic vision, protects creative privacy, and amplifies authentic expression without overwhelming complexity.",
      principles: [
        "Creative agency comes first",
        "Authenticity is non-negotiable", 
        "Technology should serve creators",
        "AI should enhance, not replace, human creativity"
      ]
    },
    memory_capturers: {
      title: "Our Family Vision", 
      description: "AI that honors relationships, not algorithms. Technology that respects family values, protects personal privacy, and amplifies meaningful connections without overwhelming complexity.",
      principles: [
        "Family values come first",
        "Privacy is non-negotiable", 
        "Technology should preserve what matters",
        "AI should enhance, not replace, human connection"
      ]
    }
  });

  return (
    <main className="pt-20">
      
      {/* Structured Header Section - 48px spacing */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left-aligned content for consistency */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-fluid-hero text-foreground font-serif" data-testid="roadmap-title">
                  The Path Forward
                </h1>
                <p className="text-fluid-body-xl text-muted-foreground max-w-2xl">
                  Our vision extends beyond individual tools to a complete ecosystem of human-centered AI
                </p>
              </div>
            </div>
            
            {/* Perspective-aware hero image with proper aspect ratio */}
            <div className="order-first lg:order-last">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30">
                <img 
                  src={heroImage} 
                  alt="CHB Roadmap vision"
                  className="w-full h-full object-cover object-center"
                  data-testid="roadmap-header-image"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Roadmap Phases - Structured Layout with 32px spacing */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Clean three-column phase grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {phases.map((phase) => {
              const phaseContent = usePerspectiveContent(phase.content);
              
              return (
                <div key={phase.id} className="text-left space-y-6">
                  
                  {/* Phase header with icon */}
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${phase.iconColor} rounded-2xl flex items-center justify-center`}>
                      {typeof phase.icon === "string" ? (
                        <span className="font-bold text-lg">{phase.icon}</span>
                      ) : (
                        <phase.icon size={20} />
                      )}
                    </div>
                    <h3 className="text-fluid-heading text-foreground" data-testid={`phase-${phase.id}-title`}>
                      {phase.title}
                    </h3>
                  </div>
                  
                  {/* Phase content with consistent spacing */}
                  <div className="space-y-4">
                    {phaseContent.map((item, index) => (
                      <p key={index} className="text-fluid-body text-muted-foreground" data-testid={`phase-${phase.id}-item-${index}`}>
                        {item}
                      </p>
                    ))}
                  </div>
                  
                </div>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* Vision Section - Structured Left-Aligned Layout */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Vision content with consistent left alignment */}
          <div className="text-left space-y-12 lg:space-y-16">
            
            {/* Vision header and description */}
            <div className="space-y-6">
              <h2 className="text-fluid-display text-foreground font-serif" data-testid="vision-title">
                {visionContent.title}
              </h2>
              <p className="text-fluid-body-xl text-muted-foreground max-w-3xl" data-testid="vision-description">
                {visionContent.description}
              </p>
            </div>
            
            {/* Principles with structured spacing */}
            <div className="space-y-6">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Our Core Principles</h3>
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {visionContent.principles.map((principle, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2" />
                    <span className="text-base text-foreground leading-relaxed" data-testid={`principle-${index}`}>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Constitutional AI Principles - Structured Card */}
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 space-y-8">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">Constitutional AI Principles</h3>
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                    <Check size={18} className="text-primary-foreground" />
                  </div>
                  <span className="text-base text-foreground leading-relaxed">Human agency and decision-making primacy</span>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center">
                    <Check size={18} className="text-secondary-foreground" />
                  </div>
                  <span className="text-base text-foreground leading-relaxed">Privacy and data sovereignty</span>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-2xl flex items-center justify-center">
                    <Check size={18} className="text-accent-foreground" />
                  </div>
                  <span className="text-base text-foreground leading-relaxed">Transparent, auditable AI systems</span>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-quaternary rounded-2xl flex items-center justify-center">
                    <Check size={18} className="text-white" />
                  </div>
                  <span className="text-base text-foreground leading-relaxed">Value alignment and constitutional governance</span>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
