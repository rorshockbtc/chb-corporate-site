import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Eye, Brain, Clock, Shield, Sparkles, Search, Layers, MessageCircle, ArrowRight } from "lucide-react";

export default function Scout() {
  const { currentPerspective } = usePerspective();
  
  const heroContent = usePerspectiveContent({
    startup_founders: {
      title: "Scout",
      symbol: "&",
      tagline: "Intelligence that finds what matters",
      description: "Your business generates insights every day—in meetings, research, competitor analysis, strategic conversations. Scout connects those dots instantly, surfacing patterns and opportunities that would otherwise take weeks to discover.",
      problem: "Most business intelligence gets lost in scattered notes, forgotten conversations, and siloed data. When you finally need that crucial insight, it's buried somewhere you can't find.",
      solution: "Scout works across your entire CHB ecosystem—Hash notes, Semi conversations, everything. When you have a question, Scout finds relevant connections in under 200 milliseconds. Not hours. Not minutes. Instantly."
    },
    content_creators: {
      title: "Scout",
      symbol: "&",
      tagline: "Inspiration that finds you",
      description: "Your creative journey is full of ideas—sketches, drafts, voice notes, conversations about what works and what doesn't. Scout weaves these threads together, surfacing creative connections you never knew existed.",
      problem: "Creative work is inherently scattered. That brilliant idea from three months ago? The technique you discussed with a collaborator? Without help, these connections stay hidden.",
      solution: "Scout maps your entire creative archive—every note in Hash, every brainstorm in Semi. When you're stuck, Scout surfaces unexpected connections in under 200 milliseconds. Keeping you in flow, not frustration."
    },
    memory_capturers: {
      title: "Scout",
      symbol: "&",
      tagline: "Memories that find each other",
      description: "Your family's story spans decades—the little moments, the big milestones, the connections between generations. Scout helps you discover how these memories connect, finding the threads that make your family's story richer.",
      problem: "Family memories live in different places—photo albums, stories, conversations with grandparents. Finding the right memory at the right moment often feels impossible.",
      solution: "Scout gently maps your family's archive—stories in Hash, conversations in Semi. When grandchildren ask about 'that time when...', Scout helps you find the answer in under 200 milliseconds."
    }
  });

  const differentiators = usePerspectiveContent({
    startup_founders: {
      title: "What Makes Scout Different",
      items: [
        {
          icon: "speed",
          title: "Speed That Respects Your Time",
          description: "Under 200 milliseconds. That's faster than you can finish your thought. Scout's intelligent indexing means answers arrive before your coffee cools—not after your meeting ends.",
          detail: "Traditional search makes you wait. Scout anticipates. The difference between 'I'll look that up later' and 'Here it is.'"
        },
        {
          icon: "patterns",
          title: "Pattern Recognition, Not Just Search",
          description: "Scout doesn't just find keywords. It understands relationships—how your Q3 strategy connects to that competitor analysis from June, or how your investor feedback relates to your product roadmap.",
          detail: "This is the kind of connection that takes humans days to discover. Scout surfaces it instantly."
        },
        {
          icon: "quality",
          title: "Quality Over Quantity",
          description: "Scout speaks only when it has something valuable to say. No notification spam. No arbitrary check-ins. Just genuine insights when they matter.",
          detail: "We call this 'quality-gated' delivery. You get analysis when it's useful—not on someone else's schedule."
        },
        {
          icon: "privacy",
          title: "Your Intelligence Stays Yours",
          description: "Scout runs within your CHB ecosystem. Your competitive analysis never trains someone else's model. Your strategic insights never leak to competitors.",
          detail: "In a world where your data is everyone's training data, Scout keeps your intelligence truly private."
        }
      ]
    },
    content_creators: {
      title: "What Makes Scout Different",
      items: [
        {
          icon: "speed",
          title: "Speed That Keeps You Creating",
          description: "Under 200 milliseconds. That's fast enough to keep your creative flow unbroken. When inspiration calls, Scout answers before you lose the thread.",
          detail: "The difference between 'I had this great idea once...' and 'Right here—let me build on it.'"
        },
        {
          icon: "patterns",
          title: "Creative Connections, Not Just Keywords",
          description: "Scout doesn't just find files. It discovers themes—how your sketch from April relates to the concept you're developing now, or how a client conversation sparked an idea you forgot.",
          detail: "These unexpected connections are the foundation of creative breakthroughs."
        },
        {
          icon: "quality",
          title: "Inspiration on Your Terms",
          description: "Scout doesn't interrupt your creative process with random notifications. It surfaces connections when you're ready—when you ask, when you're stuck, when you need it.",
          detail: "We call this 'quality-gated' inspiration. Creative flow is sacred. Scout respects that."
        },
        {
          icon: "privacy",
          title: "Your Ideas Stay Yours",
          description: "Scout runs within your CHB ecosystem. Your creative concepts never become training data for someone else's AI. Your unique voice stays unique.",
          detail: "In a world of AI-generated sameness, protecting your creative fingerprint matters."
        }
      ]
    },
    memory_capturers: {
      title: "What Makes Scout Different",
      items: [
        {
          icon: "speed",
          title: "Instant Recall When It Matters",
          description: "Under 200 milliseconds. When the grandkids ask about grandpa's Navy stories, Scout helps you find them before the moment passes.",
          detail: "Family time shouldn't be spent searching. It should be spent remembering together."
        },
        {
          icon: "patterns",
          title: "Story Connections, Not Just Search",
          description: "Scout doesn't just find photos. It discovers how memories connect—how grandma's recipes relate to holidays from the 1960s, or how your parents' courtship connects to that house on Oak Street.",
          detail: "These are the threads that make family history come alive across generations."
        },
        {
          icon: "quality",
          title: "Gentle Memory Surfacing",
          description: "Scout doesn't bombard you with random notifications. It gently surfaces memories when they're meaningful—anniversaries, milestones, when you're ready to reminisce.",
          detail: "We call this 'quality-gated' memory. Your family's stories deserve care, not chaos."
        },
        {
          icon: "privacy",
          title: "Family Privacy Protected",
          description: "Scout runs entirely within your CHB ecosystem. Your family's stories never become training data. Your precious memories stay within your family, forever.",
          detail: "In a world where everything is shared, keeping family memories private is a gift to future generations."
        }
      ]
    }
  });

  const howItWorks = usePerspectiveContent({
    startup_founders: {
      title: "How Scout Works",
      intro: "Scout is integrated directly into Semi, your AI business partner. Here's what happens behind the scenes:",
      steps: [
        { 
          number: "1",
          title: "Connected Knowledge", 
          description: "Scout connects to everything in your CHB ecosystem—your Hash notes, your Semi conversations, your captured insights. One unified intelligence layer." 
        },
        { 
          number: "2",
          title: "Intelligent Indexing", 
          description: "Advanced pattern recognition maps relationships between concepts, people, projects, and ideas. Not just keywords—actual understanding." 
        },
        { 
          number: "3",
          title: "Instant Discovery", 
          description: "Ask anything. Scout returns relevant connections in under 200 milliseconds. The insight you needed was always there—Scout just finds it instantly." 
        }
      ]
    },
    content_creators: {
      title: "How Scout Works",
      intro: "Scout is woven into Semi, your AI creative partner. Here's what happens when you create:",
      steps: [
        { 
          number: "1",
          title: "Connected Creativity", 
          description: "Scout connects to your entire creative archive—notes in Hash, brainstorms in Semi, every captured idea. One unified creative memory." 
        },
        { 
          number: "2",
          title: "Creative Mapping", 
          description: "Pattern recognition identifies thematic threads, visual connections, and conceptual relationships across your body of work." 
        },
        { 
          number: "3",
          title: "Instant Inspiration", 
          description: "Wonder aloud. Scout surfaces unexpected connections in under 200 milliseconds—keeping you in flow, feeding your creativity." 
        }
      ]
    },
    memory_capturers: {
      title: "How Scout Works",
      intro: "Scout is part of Semi, your family's conversation partner. Here's what makes it special:",
      steps: [
        { 
          number: "1",
          title: "Connected Family Archive", 
          description: "Scout connects to everything you've captured—memories in Hash, stories shared with Semi, every precious moment. One unified family history." 
        },
        { 
          number: "2",
          title: "Gentle Story Mapping", 
          description: "Thoughtful pattern recognition finds connections between people, places, and moments—building a living map of your family's journey." 
        },
        { 
          number: "3",
          title: "Instant Recall", 
          description: "Ask about anything. Scout helps you find related memories in under 200 milliseconds—perfect for family gatherings and quiet moments alike." 
        }
      ]
    }
  });

  const useCases = usePerspectiveContent({
    startup_founders: {
      title: "Scout in Action",
      scenarios: [
        {
          question: "\"What did we learn from last quarter's customer interviews?\"",
          result: "Scout surfaces the key insights from 47 captured notes across three team members—organized by theme, with connections to your current product decisions."
        },
        {
          question: "\"How is our competitor positioning against us?\"",
          result: "Scout finds every mention across your research, team discussions, and strategic notes—with patterns highlighted that you might have missed."
        },
        {
          question: "\"What was that idea from the board meeting last month?\"",
          result: "Scout locates the exact note, but also surfaces three related ideas from other conversations that strengthen the concept."
        }
      ]
    },
    content_creators: {
      title: "Scout in Action",
      scenarios: [
        {
          question: "\"What visual styles have I explored for this type of project?\"",
          result: "Scout surfaces sketches, moodboards, and notes from similar projects—organized by approach, with connections to client feedback and your own reflections."
        },
        {
          question: "\"What did that collaborator say about color theory?\"",
          result: "Scout finds the conversation, but also surfaces three other discussions where color came up—building a richer picture of your evolving approach."
        },
        {
          question: "\"I'm stuck—what else have I tried for this concept?\"",
          result: "Scout shows your exploration path across weeks of work—the dead ends, the breakthroughs, the unexpected connections that might spark something new."
        }
      ]
    },
    memory_capturers: {
      title: "Scout in Action",
      scenarios: [
        {
          question: "\"Tell me about grandpa's time in the Navy.\"",
          result: "Scout surfaces stories from conversations with grandpa, photos from that era, and even connections to how it shaped his later life—all ready to share."
        },
        {
          question: "\"What was that recipe grandma used to make?\"",
          result: "Scout finds the recipe, but also surfaces the story behind it—the holiday it was always made for, the family members who loved it most."
        },
        {
          question: "\"How did mom and dad meet?\"",
          result: "Scout weaves together the story from multiple conversations—their first date, what they remember differently, how the family likes to tell it."
        }
      ]
    }
  });

  const ctaContent = usePerspectiveContent({
    startup_founders: {
      title: "Ready to Find What Matters?",
      description: "Scout is integrated directly into Semi. When you use Semi for business conversations and strategic thinking, Scout's intelligence works in the background—ready to surface connections the moment you need them.",
      primaryCTA: "Try Semi",
      primaryUrl: "https://semi.pink",
      secondaryText: "Already using Hash? Scout connects to your notes too."
    },
    content_creators: {
      title: "Ready to Find Your Next Breakthrough?",
      description: "Scout is woven into Semi. As you brainstorm and explore ideas with Semi, Scout quietly maps your creative journey—ready with unexpected connections when inspiration calls.",
      primaryCTA: "Try Semi",
      primaryUrl: "https://semi.pink",
      secondaryText: "Already using Hash? Scout connects to your creative archive too."
    },
    memory_capturers: {
      title: "Ready to Discover Your Family's Story?",
      description: "Scout is part of Semi. As you capture memories and share stories, Scout gently maps the connections—ready to help you find that special moment whenever you need it.",
      primaryCTA: "Try Semi",
      primaryUrl: "https://semi.pink",
      secondaryText: "Already using Hash? Scout connects to your memories too."
    }
  });

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'speed': return Clock;
      case 'patterns': return Brain;
      case 'quality': return Sparkles;
      case 'privacy': return Shield;
      case 'search': return Search;
      case 'layers': return Layers;
      default: return Eye;
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section - Text-focused, no confusing imagery */}
      <section className={`py-20 lg:py-28 ${
        currentPerspective === 'memory_capturers' ? 'bg-gradient-to-b from-amber-50/50 to-background' :
        currentPerspective === 'startup_founders' ? 'bg-gradient-to-b from-blue-50/30 to-background' :
        currentPerspective === 'content_creators' ? 'bg-gradient-to-b from-purple-50/30 to-background' :
        'bg-gradient-to-b from-muted/30 to-background'
      }`}>
        <div className="max-w-4xl mx-auto px-8">
          <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors" data-testid="back-to-products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-6xl lg:text-7xl font-light ${
              currentPerspective === 'memory_capturers' ? 'text-green-700' :
              currentPerspective === 'startup_founders' ? 'text-blue-700' :
              'text-purple-700'
            }`}>
              {heroContent.symbol}
            </span>
            <h1 className={`text-5xl lg:text-6xl font-bold ${
              currentPerspective === 'memory_capturers' ? 'text-green-800' :
              currentPerspective === 'startup_founders' ? 'text-blue-900' :
              'text-purple-900'
            }`} data-testid="scout-title">
              {heroContent.title}
            </h1>
          </div>
          
          <p className={`text-2xl lg:text-3xl font-medium mb-8 ${
            currentPerspective === 'memory_capturers' ? 'text-green-700' :
            currentPerspective === 'startup_founders' ? 'text-blue-800' :
            'text-purple-800'
          }`} data-testid="scout-tagline">
            {heroContent.tagline}
          </p>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8" data-testid="scout-description">
            {heroContent.description}
          </p>

          {/* Problem/Solution framing */}
          <div className={`rounded-2xl p-8 space-y-6 ${
            currentPerspective === 'memory_capturers' ? 'bg-white/80 border-2 border-green-200/60' :
            currentPerspective === 'startup_founders' ? 'bg-white/70 border border-blue-200/50' :
            'bg-white/70 border border-purple-200/50'
          }`}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">The Problem</h3>
              <p className="text-foreground leading-relaxed">{heroContent.problem}</p>
            </div>
            <div className={`h-px ${
              currentPerspective === 'memory_capturers' ? 'bg-green-200' :
              currentPerspective === 'startup_founders' ? 'bg-blue-200' :
              'bg-purple-200'
            }`} />
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wide mb-2 ${
                currentPerspective === 'memory_capturers' ? 'text-green-600' :
                currentPerspective === 'startup_founders' ? 'text-blue-600' :
                'text-purple-600'
              }`}>The Solution</h3>
              <p className="text-foreground leading-relaxed">{heroContent.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Scout Different */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 text-center ${
            currentPerspective === 'memory_capturers' ? 'text-green-800' :
            currentPerspective === 'startup_founders' ? 'text-blue-900' :
            'text-purple-900'
          }`}>
            {differentiators.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Scout isn't just another search tool. It's intelligence that understands your world.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {differentiators.items.map((item, index) => {
              const IconComponent = getIconComponent(item.icon);
              return (
                <div 
                  key={index}
                  className={`p-8 rounded-2xl transition-all duration-300 hover:scale-[1.01] ${
                    currentPerspective === 'memory_capturers' ? 'bg-white/90 border-2 border-green-200/60 shadow-lg' :
                    currentPerspective === 'startup_founders' ? 'bg-white/80 border border-blue-200/50 shadow-md' :
                    currentPerspective === 'content_creators' ? 'bg-white/80 border border-purple-200/50 shadow-md' :
                    'bg-card border border-border/50'
                  }`}
                  data-testid={`differentiator-${index + 1}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    currentPerspective === 'memory_capturers' ? 'bg-green-100 text-green-600' :
                    currentPerspective === 'startup_founders' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    currentPerspective === 'memory_capturers' ? 'text-green-800' :
                    currentPerspective === 'startup_founders' ? 'text-blue-900' :
                    'text-purple-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <p className={`text-sm italic ${
                    currentPerspective === 'memory_capturers' ? 'text-green-600/80' :
                    currentPerspective === 'startup_founders' ? 'text-blue-600/80' :
                    'text-purple-600/80'
                  }`}>
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-20 lg:py-28 ${
        currentPerspective === 'memory_capturers' ? 'bg-gradient-to-b from-amber-50/30 to-background' :
        currentPerspective === 'startup_founders' ? 'bg-gradient-to-b from-blue-50/20 to-background' :
        currentPerspective === 'content_creators' ? 'bg-gradient-to-b from-purple-50/20 to-background' :
        'bg-muted/30'
      }`}>
        <div className="max-w-5xl mx-auto px-8">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 text-center ${
            currentPerspective === 'memory_capturers' ? 'text-green-800' :
            currentPerspective === 'startup_founders' ? 'text-blue-900' :
            'text-purple-900'
          }`}>
            {howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {howItWorks.intro}
          </p>
          
          <div className="space-y-6">
            {howItWorks.steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-6 p-6 rounded-xl ${
                  currentPerspective === 'memory_capturers' ? 'bg-white/80 border border-green-200/40' :
                  currentPerspective === 'startup_founders' ? 'bg-white/60 border border-blue-200/30' :
                  'bg-white/60 border border-purple-200/30'
                }`}
                data-testid={`how-it-works-step-${index + 1}`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                  currentPerspective === 'memory_capturers' ? 'bg-green-100 text-green-700' :
                  currentPerspective === 'startup_founders' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {step.number}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    currentPerspective === 'memory_capturers' ? 'text-green-800' :
                    currentPerspective === 'startup_founders' ? 'text-blue-900' :
                    'text-purple-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scout in Action - Use Cases */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 text-center ${
            currentPerspective === 'memory_capturers' ? 'text-green-800' :
            currentPerspective === 'startup_founders' ? 'text-blue-900' :
            'text-purple-900'
          }`}>
            {useCases.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Real questions. Instant answers. Unexpected connections.
          </p>
          
          <div className="space-y-8">
            {useCases.scenarios.map((scenario, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden ${
                  currentPerspective === 'memory_capturers' ? 'bg-white/90 border-2 border-green-200/60 shadow-lg' :
                  currentPerspective === 'startup_founders' ? 'bg-white/80 border border-blue-200/50 shadow-md' :
                  'bg-white/80 border border-purple-200/50 shadow-md'
                }`}
                data-testid={`use-case-${index + 1}`}
              >
                <div className={`px-8 py-5 ${
                  currentPerspective === 'memory_capturers' ? 'bg-green-50/50' :
                  currentPerspective === 'startup_founders' ? 'bg-blue-50/50' :
                  'bg-purple-50/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <MessageCircle className={`w-5 h-5 ${
                      currentPerspective === 'memory_capturers' ? 'text-green-600' :
                      currentPerspective === 'startup_founders' ? 'text-blue-600' :
                      'text-purple-600'
                    }`} />
                    <p className={`text-lg font-medium ${
                      currentPerspective === 'memory_capturers' ? 'text-green-800' :
                      currentPerspective === 'startup_founders' ? 'text-blue-900' :
                      'text-purple-900'
                    }`}>
                      {scenario.question}
                    </p>
                  </div>
                </div>
                <div className="px-8 py-5">
                  <div className="flex items-start gap-3">
                    <ArrowRight className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      currentPerspective === 'memory_capturers' ? 'text-green-500' :
                      currentPerspective === 'startup_founders' ? 'text-blue-500' :
                      'text-purple-500'
                    }`} />
                    <p className="text-muted-foreground leading-relaxed">
                      {scenario.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 lg:py-28 ${
        currentPerspective === 'memory_capturers' ? 'bg-gradient-to-b from-amber-50/30 to-background' :
        currentPerspective === 'startup_founders' ? 'bg-gradient-to-b from-blue-50/20 to-background' :
        currentPerspective === 'content_creators' ? 'bg-gradient-to-b from-purple-50/20 to-background' :
        'bg-muted/30'
      }`}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${
            currentPerspective === 'memory_capturers' ? 'text-green-800' :
            currentPerspective === 'startup_founders' ? 'text-blue-900' :
            'text-purple-900'
          }`}>
            {ctaContent.title}
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            {ctaContent.description}
          </p>
          
          <p className={`text-sm mb-10 ${
            currentPerspective === 'memory_capturers' ? 'text-green-600' :
            currentPerspective === 'startup_founders' ? 'text-blue-600' :
            'text-purple-600'
          }`}>
            {ctaContent.secondaryText}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={ctaContent.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="scout-cta-primary"
            >
              <Button size="lg" className="w-full sm:w-auto bg-brand-pink hover:bg-brand-pink/90">
                {ctaContent.primaryCTA}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <Link href="/products">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="scout-cta-secondary">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
