import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { HeroSection } from "@/components/hero-section";
import { Check, Shield, Sparkles } from "lucide-react";

export function HomePage() {
  const { currentPerspective } = usePerspective();

  const winWinWinContent = usePerspectiveContent({
    startup_founders: {
      headline: "A win-win-win for your business",
      subheadline: "Use the AI models you already trust. Pay what you already pay. Get dramatically better results while keeping your competitive intelligence private.",
      wins: [
        { icon: "budget", title: "Same Budget", description: "No new subscriptions. Use existing AI spend more efficiently." },
        { icon: "results", title: "Better Results", description: "Optimized prompts mean fewer wasted tokens and higher quality outputs." },
        { icon: "privacy", title: "Privacy & Control", description: "Your strategic data never trains competitor models." }
      ]
    },
    content_creators: {
      headline: "A win-win-win for your creativity",
      subheadline: "Use the AI tools you already love. Pay what you already pay. Get higher quality creative output while protecting your unique voice.",
      wins: [
        { icon: "budget", title: "Same Cost", description: "No extra subscriptions. Make your existing AI tools work harder." },
        { icon: "results", title: "Higher Quality", description: "Smart prompt optimization means better creative results with less effort." },
        { icon: "privacy", title: "Creative Privacy", description: "Your ideas and style stay yours—never feeding someone else's training data." }
      ]
    },
    memory_capturers: {
      headline: "A win-win-win for your family",
      subheadline: "Use the AI you're already comfortable with. Pay what you already pay. Get clearer conversations while keeping your family's stories completely private.",
      wins: [
        { icon: "budget", title: "Same Price", description: "No new costs. Your existing setup just works better." },
        { icon: "results", title: "Clearer Conversations", description: "Better AI responses mean easier memory capture and storytelling." },
        { icon: "privacy", title: "Family Privacy", description: "Your memories and stories never leave your control." }
      ]
    }
  });

  const ecosystemContent = usePerspectiveContent({
    startup_founders: {
      title: "Why punctuation matters",
      description: "Every symbol represents scalable growth potential. # organizes your team's knowledge, ; continues strategic conversations, and | transforms market perspectives. Our naming strategy drives brand recognition and market differentiation.",
      explanation: "We believe technology should accelerate business growth through memorable, searchable, and investable products. When VCs think of knowledge management, they'll remember Hash. When you need strategic writing support, Semi continues your vision."
    },
    content_creators: {
      title: "Why punctuation matters",
      description: "Every symbol tells your unique story. # captures your creative thoughts, ; continues your creative conversations, and | transforms content perspectives. Our naming helps your audience remember and share your work.",
      explanation: "We believe technology should amplify creativity and help creators build authentic connections. When you think of organizing creative ideas, you'll remember Hash. When you need writing inspiration, Semi extends your creative voice."
    },
    memory_capturers: {
      title: "Why punctuation matters", 
      description: "Every symbol preserves what matters most. # captures precious thoughts and memories, ; continues family conversations across generations, and | transforms how you see shared experiences.",
      explanation: "We believe technology should honor relationships and preserve family stories. When you think of capturing memories, you'll remember Hash. When you want to continue meaningful conversations, Semi helps bridge generations."
    }
  });

  const missionContent = usePerspectiveContent({
    startup_founders: {
      title: "Scale beyond Silicon Valley's limits",
      description: "Traditional entrepreneurs deserve AI that respects your market positioning and competitive advantages. We're building technology that amplifies your business vision rather than conforming to Valley groupthink."
    },
    content_creators: {
      title: "Create without creative conformity",
      description: "Independent creators deserve AI that amplifies your authentic voice rather than homogenizing your creative expression. We're building technology that extends your artistic vision rather than replacing it."
    },
    memory_capturers: {
      title: "Preventing Big Tech erasure, one family at a time",
      description: "Unless people like us get involved in protecting our stories, our memories and values will be monetized by algorithms designed to sell us things. This threatens our ability to own our legacies and preserve what truly matters for future generations."
    }
  });

  const ctaContent = usePerspectiveContent({
    startup_founders: {
      title: "Your Competitive Edge",
      description: "Ready to scale with AI that respects your market positioning? Join entrepreneurs who've discovered technology that amplifies their strategic advantages rather than commoditizing their innovation.",
      primaryCTA: "Discuss Your Strategy",
      secondaryCTA: "Connect on X"
    },
    content_creators: {
      title: "Your Creative Canvas",
      description: "Ready to create with AI that amplifies your authentic voice? Join creators who've discovered technology that extends their artistic vision rather than replacing their creative process.",
      primaryCTA: "Share Your Vision",
      secondaryCTA: "Connect on X"
    },
    memory_capturers: {
      title: "Our Promise",
      description: "To help you own your life story completely. :-] are building private, personal technology that helps you capture, preserve, and share your family's legacy on your terms - never feeding your memories into someone else's algorithm to sell you things.",
      primaryCTA: "Share Your Family Story",
      secondaryCTA: "Explore Our Values"
    }
  });

  const productsContent = usePerspectiveContent({
    startup_founders: {
      showcase_title: "Strategy, punctuated.",
      showcase_description: "Every breakthrough needs the right tools at the right moment. # organizes your competitive intelligence, ; continues strategic conversations, & discovers market patterns, and | transforms any content into business-focused insights."
    },
    content_creators: {
      showcase_title: "Vision, punctuated.",
      showcase_description: "Every masterpiece starts with a single creative spark. # captures your artistic ideas, ; continues creative conversations, & discovers inspiration patterns, and | transforms any content into creative possibilities."
    },
    memory_capturers: {
      showcase_title: "Your moments, punctuated.",
      showcase_description: "Life is beautiful, tragic, frustrating, and yours. :-] makes it easy to punctuate what you're experiencing and helps you fill in the details. We're here when you want to turn a 'full stop' into an Oxford comma."
    }
  });

  const principlesContent = usePerspectiveContent({
    startup_founders: {
      title: "Preventing digital tyranny,<br />one entrepreneur at a time",
      description: "Unless traditional entrepreneurs get involved with technology development, business innovation will be controlled by algorithms designed to extract value rather than create it. This threatens free market competition and entrepreneurial independence."
    },
    content_creators: {
      title: "Preventing digital censorship,<br />one creator at a time", 
      description: "Unless independent creators get involved with AI training and development, creative expression will be determined by a few hundred 20-something software engineers in San Francisco. This threatens artistic freedom and authentic storytelling."
    },
    memory_capturers: {
      title: "Own your memories,<br />preserve your legacy",
      description: "Your family's stories belong to you, not to algorithms designed to sell you things. We help you capture, preserve, and share what matters most - completely privately, on your terms, for the people you love."
    }
  });

  const products = [
    {
      symbol: "#",
      name: "Hash",
      url: "https://hash.pink",
      description: {
        startup_founders: "Your business insights, organized automatically. Capture strategic ideas and discover market opportunities you never noticed.",
        content_creators: "Your creative ideas, organized automatically. Capture inspiration naturally and discover creative connections you never noticed.",
        memory_capturers: "Your precious memories, organized automatically. Capture family stories naturally and discover meaningful connections across generations."
      },
      features: {
        startup_founders: ["Strategic insight capture", "Business-focused design"],
        content_creators: ["Voice-to-text capture", "Creative workflow design"],
        memory_capturers: ["Memory preservation", "Family-friendly design"]
      }
    },
    {
      symbol: ";",
      name: "Semi",
      url: "https://semi.pink", 
      description: {
        startup_founders: "Use AI models you already trust, pay what you already pay, get better results. Semi optimizes your prompts and protects your strategic data from training competitor models.",
        content_creators: "Use AI tools you already love, pay what you already pay, get higher quality. Semi optimizes your creative workflow while keeping your ideas private.",
        memory_capturers: "Use the AI you're comfortable with, pay what you already pay, get clearer conversations. Semi makes AI easier while keeping your family stories completely private."
      },
      features: {
        startup_founders: ["Same budget, better results", "Privacy-first AI layer"],
        content_creators: ["Same cost, higher quality", "Creative privacy protection"],
        memory_capturers: ["Same price, clearer results", "Family data stays yours"]
      }
    },
    {
      symbol: "&",
      name: "Scout",
      url: "/scout",
      description: {
        startup_founders: "Lightning-fast market intelligence that finds competitive patterns across your entire business landscape.",
        content_creators: "Lightning-fast pattern recognition that finds creative connections across your entire content library.",
        memory_capturers: "Lightning-fast story discovery that finds meaningful connections across your entire family history."
      },
      features: {
        startup_founders: ["Under 200ms response", "Business intelligence"],
        content_creators: ["Under 200ms response", "Content pattern detection"],
        memory_capturers: ["Under 200ms response", "Memory pattern discovery"]
      }
    },
    {
      symbol: "|",
      name: "Pipes",
      url: "#",
      description: {
        startup_founders: "Transform any website's perspective instantly. See market content through different business viewpoints without creating accounts.",
        content_creators: "Transform any website's perspective instantly. See content through different creative viewpoints without creating accounts.",
        memory_capturers: "Transform any website's perspective instantly. See content through different family viewpoints while strengthening meaningful connections across generations."
      },
      features: {
        startup_founders: ["Browser plugin", "Business transforms"],
        content_creators: ["Browser plugin", "Creative transforms"],
        memory_capturers: ["Browser plugin", "Family-focused transforms"]
      }
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Win-Win-Win Value Proposition */}
      <section className={`py-16 lg:py-20 ${
        currentPerspective === 'memory_capturers' ? 'bg-gradient-to-b from-amber-50/50 to-background' :
        currentPerspective === 'startup_founders' ? 'bg-gradient-to-b from-blue-50/30 to-background' :
        currentPerspective === 'content_creators' ? 'bg-gradient-to-b from-purple-50/30 to-background' :
        'bg-gradient-to-b from-muted/30 to-background'
      }`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${
              currentPerspective === 'memory_capturers' ? 'text-green-800' :
              currentPerspective === 'startup_founders' ? 'text-blue-900' :
              currentPerspective === 'content_creators' ? 'text-purple-900' :
              'text-foreground'
            }`} data-testid="win-win-win-headline">
              {winWinWinContent.headline}
            </h2>
            <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${
              currentPerspective === 'memory_capturers' ? 'text-green-700/80' :
              currentPerspective === 'startup_founders' ? 'text-blue-800/70' :
              currentPerspective === 'content_creators' ? 'text-purple-800/70' :
              'text-muted-foreground'
            }`} data-testid="win-win-win-subheadline">
              {winWinWinContent.subheadline}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {winWinWinContent.wins.map((win, index) => (
              <div 
                key={index}
                className={`relative p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  currentPerspective === 'memory_capturers' ? 'bg-white/90 border-2 border-green-200/60 shadow-lg hover:shadow-xl' :
                  currentPerspective === 'startup_founders' ? 'bg-white/80 border border-blue-200/50 shadow-md hover:shadow-lg' :
                  currentPerspective === 'content_creators' ? 'bg-white/80 border border-purple-200/50 shadow-md hover:shadow-lg' :
                  'bg-card border border-border/50 shadow-sm hover:shadow-md'
                }`}
                data-testid={`win-card-${index + 1}`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  win.icon === 'budget' ? 'bg-green-100 text-green-600' :
                  win.icon === 'results' ? 'bg-amber-100 text-amber-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {win.icon === 'budget' && <Check className="w-6 h-6" />}
                  {win.icon === 'results' && <Sparkles className="w-6 h-6" />}
                  {win.icon === 'privacy' && <Shield className="w-6 h-6" />}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  currentPerspective === 'memory_capturers' ? 'text-green-800' :
                  currentPerspective === 'startup_founders' ? 'text-blue-900' :
                  currentPerspective === 'content_creators' ? 'text-purple-900' :
                  'text-foreground'
                }`}>
                  {win.title}
                </h3>
                <p className="text-muted-foreground">
                  {win.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Statement - Enhanced with Visual Impact */}
      <section className={`py-24 lg:py-32 ${
        currentPerspective === 'memory_capturers' ? 'farmhouse-section' :
        currentPerspective === 'startup_founders' ? 'founders-section' :
        currentPerspective === 'content_creators' ? 'creators-section' :
        ''
      }`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="max-w-4xl">
              <h2 className="text-fluid-display mb-8 section-title-perspective font-bold">
                {missionContent.title}
              </h2>
              <p className={`text-fluid-body-xl mb-8 ${
                currentPerspective === 'memory_capturers' ? 'farmhouse-body' :
                currentPerspective === 'startup_founders' ? 'founders-body' :
                currentPerspective === 'content_creators' ? 'creators-body' :
                'text-muted-foreground'
              }`}>
                {missionContent.description}
              </p>
              {(currentPerspective === 'memory_capturers' || currentPerspective === 'startup_founders' || currentPerspective === 'content_creators') && (
                <div className="mt-8">
                  <a 
                    href={currentPerspective === 'memory_capturers' ? '/memory-capturers-deep-dive' : 
                         currentPerspective === 'startup_founders' ? '/startup-founders-deep-dive' :
                         '/content-creators-deep-dive'}
                    className="pipes-link"
                    data-testid="link-deep-dive"
                  >
                    {currentPerspective === 'memory_capturers' ? 'Read Our Deep Dive' :
                     currentPerspective === 'startup_founders' ? 'Read Strategic Analysis' :
                     'Read Creative Manifesto'}
                    <span className="ml-2">↗</span>
                  </a>
                </div>
              )}
            </div>
            {(currentPerspective === 'memory_capturers' || currentPerspective === 'startup_founders' || currentPerspective === 'content_creators') && (
              <div className="flex justify-center lg:justify-end">
                <div className="max-w-sm relative">
                  <div className={`absolute -inset-3 rounded-3xl opacity-30 blur-sm ${
                    currentPerspective === 'memory_capturers' ? 'bg-gradient-to-br from-amber-200 to-orange-200' :
                    currentPerspective === 'startup_founders' ? 'bg-gradient-to-br from-blue-200 to-indigo-200' :
                    'bg-gradient-to-br from-purple-200 to-pink-200'
                  }`}></div>
                  <img 
                    src={currentPerspective === 'memory_capturers' ? '/generated/images/memory_capturers_lake_whimsical.png' :
                         currentPerspective === 'startup_founders' ? '/generated/images/startup_founders_strategic_planning.png' :
                         '/generated/images/content_creators_studio_playground.png'}
                    alt={currentPerspective === 'memory_capturers' ? 'Family memories preserved like vintage polaroids' :
                         currentPerspective === 'startup_founders' ? 'Strategic planning and competitive analysis' :
                         'Creative workspace with artistic inspiration'}
                    className={`relative w-full h-auto rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-2 ${
                      currentPerspective === 'memory_capturers' ? 'border-amber-200/60' :
                      currentPerspective === 'startup_founders' ? 'border-blue-200/60' :
                      'border-purple-200/60'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      {(currentPerspective === 'memory_capturers' || currentPerspective === 'startup_founders' || currentPerspective === 'content_creators') && (
        <div className="relative py-8">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent ${
            currentPerspective === 'memory_capturers' ? 'via-amber-200/30' :
            currentPerspective === 'startup_founders' ? 'via-blue-200/30' :
            'via-purple-200/30'
          }`}></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-4">
                <div className="w-12 h-px bg-perspective opacity-40"></div>
                <span className={`text-sm font-medium accent-perspective ${
                  currentPerspective === 'memory_capturers' ? 'farmhouse-body' :
                  currentPerspective === 'startup_founders' ? 'founders-body' :
                  'creators-body'
                }`}>
                  {currentPerspective === 'memory_capturers' ? 'Our Values' :
                   currentPerspective === 'startup_founders' ? 'Our Principles' :
                   'Our Philosophy'}
                </span>
                <div className="w-12 h-px bg-perspective opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* How the Pipes Work - Narrative Explainer */}
      <section className={`py-28 lg:py-36 ${
        currentPerspective === 'memory_capturers' ? 'farmhouse-section' :
        currentPerspective === 'startup_founders' ? 'founders-section' :
        currentPerspective === 'content_creators' ? 'creators-section' :
        'bg-gradient-to-b from-background to-muted/10'
      }`}>
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Section narrative introduction */}
          <div className="text-left mb-20">
            <h2 className="text-fluid-hero mb-6 section-title-perspective font-bold">
              <span dangerouslySetInnerHTML={{ __html: principlesContent.title }}></span>
            </h2>
            <p className={`text-fluid-body-xl max-w-4xl ${
              currentPerspective === 'memory_capturers' ? 'farmhouse-body' :
              currentPerspective === 'startup_founders' ? 'founders-body' :
              currentPerspective === 'content_creators' ? 'creators-body' :
              'text-muted-foreground'
            }`}>
              {principlesContent.description}
            </p>
          </div>
          
          {/* Optional Includes - Perspective-specific deep dives */}
          {currentPerspective === 'startup_founders' && (
            <div className="mb-16 p-8 rounded-2xl optional-includes-bg">
              <h3 className="text-xl font-bold mb-4 section-title-perspective">Technical Control You Actually Want</h3>
              <div className="space-y-3 text-sm founders-body">
                <p><strong>Context Awareness:</strong> Semi provides real context about your business model, competitive landscape, and market positioning - not generic startup advice.</p>
                <p><strong>Browser-Side Processing:</strong> Our dspy.ts framework processes your data locally, minimizing API costs and preventing your proprietary insights from being fed into competitor training models.</p>
                <p><strong>IP Protection:</strong> Your strategic thinking stays on your infrastructure. We don't monetize your competitive intelligence or accidentally leak it through model contamination.</p>
                <p><strong>Cost Reduction:</strong> Local processing means you're not paying per-token for every strategic conversation. Scale your thinking without scaling your AI bills.</p>
              </div>
            </div>
          )}
          
          {currentPerspective === 'content_creators' && (
            <div className="mb-16 p-8 rounded-2xl optional-includes-bg">
              <h3 className="text-xl font-bold mb-4 section-title-perspective">Creative Consistency You Control</h3>
              <div className="space-y-3 text-sm creators-body">
                <p><strong>Thought Preservation:</strong> Hash captures your creative ideas in your voice, maintaining authenticity across all your work - no matter which AI tool you use later.</p>
                <p><strong>Character Consistency:</strong> Unlike Veo3's character drift problems, Pipes manages character and setting consistency externally, responding to updates across your entire creative workflow.</p>
                <p><strong>Cross-Platform Control:</strong> Generate content with Hash/Semi, then plug the consistent output into any AI engine while maintaining your creative vision and character integrity.</p>
                <p><strong>Creative IP Protection:</strong> Your ideas, characters, and creative concepts stay in your ecosystem - not feeding someone else's creative training model.</p>
              </div>
            </div>
          )}
          
          {/* Core principles - Enhanced storytelling layout with better rhythm */}
          <div className="space-y-20 lg:space-y-28">
            
            {/* Principle 1 - Explicit Bias */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 section-title-perspective">
                  Explicit Bias &gt; Fake Neutrality
                </h3>
                <p className={`text-base lg:text-lg leading-relaxed mb-4 ${currentPerspective === 'memory_capturers' ? 'farmhouse-body' : 'text-muted-foreground'}`}>
                  We don't claim to be "unbiased"—that's a fool's errand. Instead, we're explicitly biased and honest about our analysis.
                </p>
                <p className={`text-base leading-relaxed ${currentPerspective === 'memory_capturers' ? 'farmhouse-subheader' : 'text-muted-foreground/80'}`}>
                  We trust that you're intelligent enough to form your own opinions when presented with transparent perspectives. This approach shifts discourse from prescriptive decree to meaningful dialogue.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <img 
                    src={currentPerspective === 'startup_founders' ? '/generated/images/startup_founders_honest_dialogue.png' : currentPerspective === 'content_creators' ? '/generated/images/content_creators_authenticity.png' : '/attached_assets/generated_images/Farmhouse_porch_authenticity_illustration_e732cff1.png'} 
                    alt="Honest dialogue illustration"
                    className={`w-full max-w-sm h-auto rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                      currentPerspective === 'memory_capturers' ? 'border-2 border-amber-200/60' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
            
            {/* Principle 2 - Independence */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={currentPerspective === 'startup_founders' ? '/generated/images/startup_founders_independence.png' : currentPerspective === 'content_creators' ? '/generated/images/content_creators_independence.png' : '/attached_assets/generated_images/Farmhouse_homestead_independence_illustration_d6cbfe84.png'} 
                    alt="Independent vision illustration"
                    className={`w-full max-w-sm h-auto rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                      currentPerspective === 'memory_capturers' ? 'border-2 border-amber-200/60' : ''
                    }`}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 section-title-perspective">
                  Independent = Uncompromised
                </h3>
                <p className={`text-base lg:text-lg leading-relaxed mb-4 ${currentPerspective === 'memory_capturers' ? 'farmhouse-body' : 'text-muted-foreground'}`}>
                  CHB has never taken investor funding, enabling development focused on users rather than shareholders.
                </p>
                <p className={`text-base leading-relaxed ${currentPerspective === 'memory_capturers' ? 'farmhouse-subheader' : 'text-muted-foreground/80'}`}>
                  The mission isn't wealth accumulation—it's proliferating American values. This independence allows technology that serves We The People without compromise.
                </p>
              </div>
            </div>
            
            {/* Principle 3 - Personal Service */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 section-title-perspective">
                  Personal Service at Scale
                </h3>
                <p className={`text-base lg:text-lg leading-relaxed mb-4 ${currentPerspective === 'memory_capturers' ? 'farmhouse-body' : 'text-muted-foreground'}`}>
                  Unlike Big Tech's scaled-but-soulless approach, CHB provides direct access with real human support.
                </p>
                <p className={`text-base leading-relaxed ${currentPerspective === 'memory_capturers' ? 'farmhouse-subheader' : 'text-muted-foreground/80'}`}>
                  Share your product needs and CHB will build features specifically for you. This is bespoke software for the digital age—technology that serves individuals, not algorithms.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <img 
                    src={currentPerspective === 'startup_founders' ? '/generated/images/startup_founders_personal_service.png' : currentPerspective === 'content_creators' ? '/generated/images/content_creators_community.png' : '/generated/images/memory_capturers_community_final.png'} 
                    alt="Personal service illustration"
                    className={`w-full max-w-sm h-auto rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                      currentPerspective === 'memory_capturers' ? 'border-2 border-amber-200/60' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Product Utility Row - Clean and Functional */}
      <section id="products" className={`py-24 lg:py-32 ${currentPerspective === 'memory_capturers' ? 'farmhouse-section' : 'bg-gradient-to-b from-muted/5 to-background'}`}>
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Clean section header - left-aligned for consistency */}
          <div className="text-left mb-20">
            <h2 className={`text-4xl lg:text-6xl font-black mb-6 leading-tight ${currentPerspective === 'memory_capturers' ? 'farmhouse-text-warm farmhouse-heading' : 'text-foreground'}`}>
              {productsContent.showcase_title}
            </h2>
            <p className={`text-lg lg:text-xl max-w-4xl leading-relaxed ${currentPerspective === 'memory_capturers' ? 'farmhouse-text-muted' : 'text-muted-foreground'}`}>
              {productsContent.showcase_description}
            </p>
          </div>
          
          {/* Product utility grid - Clean and uniform */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Hash */}
            <div className="group">
              <div className={`${currentPerspective === 'memory_capturers' ? 'bg-white/95 border-2 border-amber-200/60 shadow-lg backdrop-blur-sm' : 'bg-card/60 backdrop-blur-sm border border-border/30'} rounded-2xl p-8 lg:p-10 h-full hover:bg-card/80 hover:border-border/60 transition-all duration-300`}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-4xl lg:text-5xl font-light accent-perspective group-hover:opacity-80 transition-colors">
                    #
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${currentPerspective === 'memory_capturers' ? 'farmhouse-text-warm' : 'text-foreground'}`}>Hash</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {products[0].description[currentPerspective] || products[0].description.startup_founders}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {(products[0].features[currentPerspective] || products[0].features.startup_founders).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={products[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center accent-perspective hover:opacity-80 transition-colors font-medium"
                  >
                    Try Hash
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Semi */}
            <div className="group">
              <div className={`${currentPerspective === 'memory_capturers' ? 'bg-white/95 border-2 border-amber-200/60 shadow-lg backdrop-blur-sm' : 'bg-card/60 backdrop-blur-sm border border-border/30'} rounded-2xl p-8 lg:p-10 h-full hover:bg-card/80 hover:border-border/60 transition-all duration-300`}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-4xl lg:text-5xl font-light accent-perspective group-hover:opacity-80 transition-colors">
                    ;
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${currentPerspective === 'memory_capturers' ? 'farmhouse-text-warm' : 'text-foreground'}`}>Semi</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {products[1].description[currentPerspective] || products[1].description.startup_founders}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {(products[1].features[currentPerspective] || products[1].features.startup_founders).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={products[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center accent-perspective hover:opacity-80 transition-colors font-medium"
                  >
                    Try Semi
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Scout */}
            <div className="group">
              <div className={`${currentPerspective === 'memory_capturers' ? 'bg-white/95 border-2 border-amber-200/60 shadow-lg backdrop-blur-sm' : 'bg-card/60 backdrop-blur-sm border border-border/30'} rounded-2xl p-8 lg:p-10 h-full hover:bg-card/80 hover:border-border/60 transition-all duration-300`}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-4xl lg:text-5xl font-light accent-perspective group-hover:opacity-80 transition-colors">
                    &
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${currentPerspective === 'memory_capturers' ? 'farmhouse-text-warm' : 'text-foreground'}`}>Scout</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {products[2].description[currentPerspective] || products[2].description.startup_founders}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {(products[2].features[currentPerspective] || products[2].features.startup_founders).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="text-sm text-muted-foreground/60 font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pipes */}
            <div className="group">
              <div className={`${currentPerspective === 'memory_capturers' ? 'bg-white/95 border-2 border-amber-200/60 shadow-lg backdrop-blur-sm' : 'bg-card/60 backdrop-blur-sm border border-border/30'} rounded-2xl p-8 lg:p-10 h-full hover:bg-card/80 hover:border-border/60 transition-all duration-300`}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-4xl lg:text-5xl font-light accent-perspective group-hover:opacity-80 transition-colors">
                    |
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${currentPerspective === 'memory_capturers' ? 'farmhouse-text-warm' : 'text-foreground'}`}>Pipes</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {products[3].description[currentPerspective] || products[3].description.startup_founders}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-muted-foreground">Transform any website's perspective</div>
                  <div className="text-sm text-muted-foreground">See content through different audience lenses</div>
                  <div className="text-sm text-muted-foreground">Control your information diet</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="text-sm text-muted-foreground/60 font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Ecosystem Overview - Why Punctuation Matters */}
      <section className={`py-20 lg:py-28 ${currentPerspective === 'memory_capturers' ? 'farmhouse-section' : 'bg-muted/30'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className={`max-w-5xl mx-auto ${currentPerspective === 'memory_capturers' ? 'farmhouse-card-white' : 'bg-card border border-border'} rounded-3xl p-8 lg:p-12 shadow-xl`}>
            <div className="text-center mb-12">
              <h2 className={`text-3xl lg:text-4xl font-light mb-6 ${currentPerspective === 'memory_capturers' ? 'farmhouse-title' : 'text-foreground'}`}>
                {ecosystemContent.title}
              </h2>
              <p className={`text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed ${currentPerspective === 'memory_capturers' ? 'farmhouse-body' : 'text-muted-foreground'}`}>
                {ecosystemContent.description}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className={`text-lg leading-relaxed mb-8 ${currentPerspective === 'memory_capturers' ? 'farmhouse-subheader' : 'text-muted-foreground'}`}>
                {ecosystemContent.explanation}
              </p>
              
              {/* Add Learn More Link */}
              <div className="mt-8">
                <a 
                  href="/chb-case-study" 
                  className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                    currentPerspective === 'memory_capturers' 
                      ? 'bg-green-700 text-white hover:bg-green-800' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  Learn More About Our Philosophy
                  <span className="ml-2">↗</span>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Call to Action - Full Width for Impact */}
      <section className={`py-20 lg:py-28 ${currentPerspective === 'memory_capturers' ? 'farmhouse-section' : ''}`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <div className={`${currentPerspective === 'memory_capturers' ? 'farmhouse-card-white' : 'bg-card border border-border'} rounded-3xl p-12 lg:p-20 text-center shadow-2xl`}>
              <h3 className="text-3xl lg:text-4xl font-light mb-8 section-title-perspective">
                {ctaContent.title}
              </h3>
              <p className={`text-lg lg:text-xl leading-relaxed mb-12 ${currentPerspective === 'memory_capturers' ? 'farmhouse-body' : 'text-muted-foreground'}`}>
                {ctaContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <a 
                  href="mailto:cubby@colonhyphenbracket.pink" 
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors"
                  data-testid="email-cta"
                >
                  {ctaContent.primaryCTA}
                </a>
                <a 
                  href="https://twitter.com/RorshockBTC" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="border border-primary text-primary px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/10 transition-colors"
                  data-testid="twitter-cta"
                >
                  {ctaContent.secondaryCTA}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}