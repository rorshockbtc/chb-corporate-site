import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight, Lightbulb, Download, Brain, Shield, Zap, Users, Database, Sparkles, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { usePerspectiveContent } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";

export default function Products() {
  const { getImageContext } = usePerspectiveTheme();
  
  const heroContent = usePerspectiveContent({
    startup_founders: {
      title: "One Account. Three Powers.",
      subtitle: "Change the Internet Forever",
      description: "This isn't a product suite. It's infrastructure for the Curator Economy—where humans become AI's boss, source, and regulator. Build something that matters.",
      workflowTitle: "The Founder Journey",
      workflowDescription: "From first conversation to monetized expertise"
    },
    content_creators: {
      title: "One Account. Three Powers.",
      subtitle: "Own Your Voice",
      description: "This isn't a product suite. It's infrastructure for the Curator Economy—where your expertise becomes equity, your perspective becomes power, and AI works for you.",
      workflowTitle: "The Creator Journey",
      workflowDescription: "From ideas to income that compounds"
    },
    memory_capturers: {
      title: "One Account. Three Powers.",
      subtitle: "Preserve What Matters",
      description: "This isn't a product suite. It's infrastructure for the Curator Economy—where your knowledge lives forever, your wisdom passes on, and nothing is ever lost.",
      workflowTitle: "The Legacy Journey",
      workflowDescription: "From memories to meaning that lasts"
    }
  });

  const workflowSteps = usePerspectiveContent({
    startup_founders: [
      {
        step: 1,
        product: "Semi",
        symbol: ";",
        color: "bg-purple-600",
        title: "Chat Freely",
        description: "Start with Semi. Ask anything. Brainstorm wildly. She's your AI that learns you—no training required, no setup, just talk.",
        detail: "The conversation that becomes your foundation"
      },
      {
        step: 2,
        product: "Hash",
        symbol: "#",
        color: "bg-green-600",
        title: "Synthesize & Share",
        description: "Hash captures and connects everything. Enable conversation sharing across all your apps. Nothing lost, everything searchable.",
        detail: "Your strategic memory that grows with you"
      },
      {
        step: 3,
        product: "Pipes",
        symbol: "| | |",
        color: "bg-brand-pink",
        title: "Create & Refine",
        description: "Create Pipes directly in Semi. Package your expertise, refine with AI assistance, and deploy anywhere—website builders, apps, or raw code.",
        detail: "Your knowledge, infinitely scalable"
      }
    ],
    content_creators: [
      {
        step: 1,
        product: "Semi",
        symbol: ";",
        color: "bg-purple-600",
        title: "Chat Freely",
        description: "Start with Semi. Explore ideas out loud. She learns your voice, your style, your perspective—just by listening.",
        detail: "Every conversation makes her smarter about you"
      },
      {
        step: 2,
        product: "Hash",
        symbol: "#",
        color: "bg-green-600",
        title: "Synthesize & Share",
        description: "Hash organizes the chaos. Your best ideas surface. Share context across apps so your AI ecosystem speaks with one voice.",
        detail: "From scattered thoughts to structured gold"
      },
      {
        step: 3,
        product: "Pipes",
        symbol: "| | |",
        color: "bg-brand-pink",
        title: "Create & Refine",
        description: "Build Pipes in Semi from your accumulated wisdom. Monetize your expertise. Earn while you sleep as others install your knowledge.",
        detail: "Passive income from what you already know"
      }
    ],
    memory_capturers: [
      {
        step: 1,
        product: "Semi",
        symbol: ";",
        color: "bg-purple-600",
        title: "Chat Freely",
        description: "Start with Semi. Talk about what matters. She remembers everything—your stories, your wisdom, your way of seeing the world.",
        detail: "Your companion who never forgets"
      },
      {
        step: 2,
        product: "Hash",
        symbol: "#",
        color: "bg-green-600",
        title: "Synthesize & Share",
        description: "Hash preserves and connects your memories. Family members can access your wisdom naturally. Share across generations.",
        detail: "Your grandchildren can ask Semi about you"
      },
      {
        step: 3,
        product: "Pipes",
        symbol: "| | |",
        color: "bg-brand-pink",
        title: "Create & Refine",
        description: "Transform your collection into a Pipe. That vintage camera knowledge? Local history expertise? It lives on and helps others.",
        detail: "Your knowledge lives beyond you"
      }
    ]
  });

  const chbPromise = [
    {
      icon: Brain,
      title: "She doesn't forget",
      description: "Context persists across conversations. No more repeating yourself."
    },
    {
      icon: Shield,
      title: "Your data, your rules",
      description: "You control what's shared, stored, and remembered. Always."
    },
    {
      icon: Database,
      title: "Build now, save later",
      description: "Your work compounds. Nothing is lost. Everything is searchable."
    },
    {
      icon: Users,
      title: "Amplification, not automation",
      description: "We enhance your expertise—we don't replace it."
    }
  ];

  const products = [
    {
      id: "hash",
      name: "Hash",
      symbol: "#",
      color: "bg-green-600",
      textColor: "text-green-600",
      oneLiner: "Your private AI memory journal that never forgets.",
      description: "Capture thoughts, ideas, and memories. Semi reads from Hash to know who you are. Your private garden of knowledge.",
      features: ["Private by default", "AI-native journaling", "Personality extraction", "Cross-product memory"],
      link: "/products/hash",
      external: "https://hash.pink"
    },
    {
      id: "semi",
      name: "Semi",
      symbol: ";",
      color: "bg-purple-600",
      textColor: "text-purple-600",
      oneLiner: "Your AI that learns you, routes intelligently, costs less.",
      description: "Intelligent AI routing. Simple queries stay cheap, complex ones get premium models. Gets smarter about you every day.",
      features: ["Smart routing", "Learns continuously", "Memory-aware", "Transparent pricing"],
      link: "/products/semi",
      external: "https://semi.pink"
    },
    {
      id: "pipes",
      name: "Pipes",
      symbol: "| | |",
      color: "bg-brand-pink",
      textColor: "text-brand-pink",
      oneLiner: "Human expertise packaged as reusable, monetizable AI infrastructure.",
      description: "Create namespaces for your expertise. Declare your bias. Earn equity from installations. Your knowledge, your rules.",
      features: ["Namespace ownership", "Transparent bias", "Equity model", "Portable installation"],
      link: "/products/pipes",
      external: "https://pipes.pink"
    }
  ];

  const chbCaseStudyContent = usePerspectiveContent({
    startup_founders: {
      title: "How We Built This: CHB Corporate Website Case Study",
      description: "See our perspective-switching technology in action. This corporate website demonstrates how we 'drink our own champagne' - using CHB's integrated ecosystem to create dynamic, business-focused experiences that adapt to different stakeholder needs.",
      ctaText: "Read Business Case Study"
    },
    content_creators: {
      title: "How We Created This: CHB Corporate Website Case Study", 
      description: "Experience our perspective-switching technology firsthand. This corporate website showcases how we use CHB's creative tools to build authentic, adaptive experiences that honor different creative perspectives while maintaining artistic integrity.",
      ctaText: "Read Creative Case Study"
    },
    memory_capturers: {
      title: "How We Made This: CHB Corporate Website Case Study",
      description: "Discover our perspective-switching technology in practice. This corporate website shows how we use CHB's family-centered approach to create meaningful, adaptive experiences that respect different generational perspectives while preserving what matters most.",
      ctaText: "Read Our Story"
    }
  });

  const creativeProcessContent = usePerspectiveContent({
    startup_founders: {
      title: "Complete Transparency in Our Creative Process",
      description: "We believe business success requires openness. See every iteration, every learning moment, and every adaptation in our image generation journey. Download our creative work, study our methods, and understand exactly how we refined our visual brand strategy.",
      highlightText: "Business transparency builds trust.",
      ctaText: "Explore Our Business Process"
    },
    content_creators: {
      title: "Open Source Creative Journey", 
      description: "Creativity thrives through sharing. See every experiment, every happy accident, and every breakthrough in our image generation story. Download our creative work, study our methods, and understand exactly how we developed our visual voice.",
      highlightText: "Creative transparency builds community.",
      ctaText: "Explore Our Creative Process"
    },
    memory_capturers: {
      title: "Our Open Family Album of Learning",
      description: "Honest storytelling connects generations. See every attempt, every lesson learned, and every moment of growth in our image creation journey. Download our creative work, study our approach, and understand exactly how we built our visual story together.",
      highlightText: "Honest sharing builds connection.",
      ctaText: "Explore Our Learning Journey"
    }
  });

  return (
    <main className="pt-20">
      
      {/* Hero Section - Ecosystem Story */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
            <p className="text-brand-pink font-semibold tracking-wide uppercase" data-testid="products-subtitle">
              {heroContent.subtitle}
            </p>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-foreground" data-testid="products-page-title">
              {heroContent.title}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {heroContent.description}
            </p>
          </div>

          {/* Workflow Visualization */}
          <div className="bg-card border rounded-3xl p-8 lg:p-12 shadow-lg">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2" data-testid="workflow-title">
                {heroContent.workflowTitle}
              </h2>
              <p className="text-muted-foreground">{heroContent.workflowDescription}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {workflowSteps.map((step, index) => (
                <div key={step.step} className="relative" data-testid={`workflow-step-${step.step}`}>
                  {/* Connection line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-muted-foreground/30 to-transparent -translate-x-4 z-0" />
                  )}
                  
                  <div className="relative z-10 space-y-4">
                    {/* Step indicator with product symbol */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{step.symbol}</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Step {step.step}</p>
                        <p className="font-bold text-foreground">{step.product}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    <p className="text-sm text-brand-pink font-medium italic">"{step.detail}"</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/signup">
                <Button size="lg" className="group" data-testid="cta-get-started">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Curator Economy - World-Changing Vision */}
      <section className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <p className="text-brand-pink font-semibold tracking-wide uppercase">The Big Picture</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
              Welcome to the Curator Economy
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI isn't replacing humans. It's creating a new kind of job—<strong className="text-brand-pink">Curator</strong>—and 
              an entirely new economy where your expertise has real, compounding value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10" data-testid="curator-pillar-1">
              <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-brand-pink" />
              </div>
              <h3 className="text-xl font-bold mb-3">Become AI's Boss</h3>
              <p className="text-gray-400 leading-relaxed">
                Instead of being replaced by AI, Curators direct it. You decide what knowledge matters, 
                what perspectives count, and what values the AI should embody. Your judgment, amplified.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10" data-testid="curator-pillar-2">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Control Your Sources</h3>
              <p className="text-gray-400 leading-relaxed">
                Big Tech trains AI on undifferentiated internet data. CHB lets you declare exactly what 
                sources matter—and earn when others use your curated knowledge. Your expertise, your equity.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10" data-testid="curator-pillar-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Regulate AI Values</h3>
              <p className="text-gray-400 leading-relaxed">
                Force AI to respect your values instead of undermining them with Big AI's agenda. 
                Choose your perspectives intentionally. Transparent bias, not hidden manipulation.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              This isn't just about better tools. It's about who controls AI—and we believe that should be <em>you</em>.
            </p>
            <p className="text-2xl font-bold text-brand-pink">
              Every Pipe is a real slice of humanity. :-]
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid - Deep Dive Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-4">
              Three Powers. One Account. Infinite Possibilities.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each tool excels individually. Together, they form infrastructure for the Curator Economy.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-pink/30" data-testid={`product-card-${product.id}`}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 ${product.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-bold text-white">{product.symbol}</span>
                    </div>
                    <a 
                      href={product.external} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-brand-pink transition-colors"
                      data-testid={`link-external-${product.id}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black">{product.name}</CardTitle>
                    <CardDescription className="text-sm font-medium mt-1">{product.oneLiner}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{product.description}</p>
                  
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Sparkles className={`h-4 w-4 ${product.textColor}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={product.link}>
                    <Button variant="outline" className="w-full group/btn" data-testid={`link-deepdive-${product.id}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CHB Promise Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-4">
              The CHB Promise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Core principles that guide everything we build. This isn't marketing—it's our constitution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {chbPromise.map((item, index) => (
              <div key={index} className="text-center space-y-4" data-testid={`promise-${index}`}>
                <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mx-auto">
                  <item.icon className="h-8 w-8 text-brand-pink" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Philosophy Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-pink/10 to-purple-500/10 border border-brand-pink/20 rounded-3xl p-8 lg:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-brand-pink rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-foreground">
                  Designed to Be Used
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Semi is very efficient—we're still settling on exact credit amounts, but you'll get ample use from any tier. 
                  She routes intelligently, saving expensive API calls for when they're truly needed.
                </p>
                <p className="text-muted-foreground">
                  Credits aren't obstacles. They're acknowledgment that servers cost money and quality AI takes resources. 
                  We want you to <strong>use</strong> your credits—not hoard them.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-background/80 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Comma</p>
                    <p className="font-bold text-foreground">$7<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-brand-pink">50k credits</p>
                  </div>
                  <div className="bg-background/80 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p className="font-bold text-foreground">$21<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-brand-pink">200k credits</p>
                  </div>
                  <div className="bg-background/80 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Ellipsis</p>
                    <p className="font-bold text-foreground">$210<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-brand-pink">1M credits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHB Case Study Section - Structured Layout */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground" data-testid="case-study-title">
                {chbCaseStudyContent.title}
              </h2>
            </div>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto" data-testid="case-study-description">
              {chbCaseStudyContent.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chb-case-study" data-testid="case-study-cta">
                <Button size="lg" className="group">
                  {chbCaseStudyContent.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Creative Process Transparency Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground" data-testid="creative-process-title">
                {creativeProcessContent.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto" data-testid="creative-process-description">
                {creativeProcessContent.description}
              </p>
              
              <div className="bg-accent/10 border border-accent/20 p-6 rounded-xl max-w-2xl mx-auto">
                <p className="text-base font-medium text-accent-foreground italic">
                  "{creativeProcessContent.highlightText}"
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 items-center">
              <Link href="/creative-process" data-testid="creative-process-cta">
                <Button size="lg" className="group">
                  {creativeProcessContent.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4" />
                <span>Free downloads • Full resolution • Complete transparency</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-pink/10 via-purple-500/5 to-brand-pink/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
            Ready to build your knowledge infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One account unlocks everything. Your Hash memories power Semi's intelligence. Your insights become Pipes that earn equity. Start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="group" data-testid="cta-final-signup">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://semi.pink" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" data-testid="cta-try-semi">
                Try Semi Now
              </Button>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
