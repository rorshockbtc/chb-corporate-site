import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Brain, Zap, Shield, DollarSign, Heart, Route, Sparkles, TrendingDown, ExternalLink, FileText, Users, Database, Eye } from "lucide-react";
import { Link } from "wouter";
import { usePerspectiveContent } from "@/hooks/use-perspective";

export default function SemiDeepDive() {
  const [viewMode, setViewMode] = useState<"highlights" | "deep-dive">("highlights");
  
  const heroContent = usePerspectiveContent({
    startup_founders: {
      subtitle: "Smart AI Routing",
      title: "Your AI Costs Drop. Quality Goes Up.",
      description: "Semi routes strategically—quick questions stay cheap, important decisions get the big models. Cost control without sacrificing quality.",
      biggestWin: "My AI costs dropped 60% and the quality actually improved because Semi learned our domain."
    },
    content_creators: {
      subtitle: "Creative Partner",
      title: "Your AI Writes in Your Voice",
      description: "Semi knows your voice from Hash and maintains it across all content creation. First drafts that actually sound like you.",
      biggestWin: "Semi writes in my voice now. First drafts sound like ME, not generic AI."
    },
    memory_capturers: {
      subtitle: "Patient Assistant",
      title: "Your AI Remembers Your Preferences",
      description: "Semi remembers you like slower, more careful conversations. Patient, gentle, and always at your pace.",
      biggestWin: "Semi explains things at my pace. It remembers I like step-by-step instructions."
    }
  });

  const problemSolution = usePerspectiveContent({
    startup_founders: {
      problem: "AI assistants charge the same rate regardless of query complexity. A simple question costs as much as a complex analysis.",
      solution: "Semi routes intelligently—simple queries stay local and cheap, complex ones go to premium models when needed. You only pay for what you actually need."
    },
    content_creators: {
      problem: "Every AI writes the same way. Your content sounds like everyone else's. Generic, bland, forgettable.",
      solution: "Semi learns your voice from Hash. The more you journal, the more your AI sounds like you. Authentic content at scale."
    },
    memory_capturers: {
      problem: "AI moves too fast. Explanations are too technical. It doesn't remember that you prefer things simple.",
      solution: "Semi adapts to your pace. It remembers your preferences and adjusts automatically. No judgment, just patience."
    }
  });

  const features = [
    {
      icon: Route,
      title: "Intelligent Routing",
      description: "Uses the cheapest model that can handle your query. Premium models only when genuinely needed."
    },
    {
      icon: Brain,
      title: "Learns Continuously",
      description: "Gets smarter about YOU every day. Your patterns, preferences, and domain expertise compound over time."
    },
    {
      icon: Sparkles,
      title: "Memory-Aware",
      description: "Connected to Hash, Semi knows your context. She remembers what you've discussed before."
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "See exactly what each interaction costs. No surprises, no hidden fees."
    }
  ];

  const routingExamples = [
    {
      query: "What's the capital of France?",
      route: "Local Model",
      cost: "~1 credit",
      reason: "Simple factual lookup—no need for expensive API"
    },
    {
      query: "Help me analyze our Q3 metrics",
      route: "Premium Model",
      cost: "~5 credits",
      reason: "Complex analysis benefits from advanced reasoning"
    },
    {
      query: "Draft an email to my team about the launch",
      route: "Local + Hash",
      cost: "~2 credits",
      reason: "Pulls your voice from Hash, writes locally"
    }
  ];

  const synergy = {
    hashConnection: {
      title: "Hash → Semi",
      description: "Your memories inform Semi's responses. She knows your communication style, past decisions, and preferences from day one."
    },
    pipesConnection: {
      title: "Pipes → Semi",
      description: "When you install a Pipe, Semi synthesizes that curator's knowledge into your responses. Expert-level answers without expert-level costs."
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-500/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">;</span>
                </div>
                <span className="text-purple-600 font-semibold tracking-wide uppercase">{heroContent.subtitle}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900" data-testid="semi-title">
                {heroContent.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                {heroContent.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://semi.pink" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group bg-purple-600 hover:bg-purple-700" data-testid="cta-try-semi">
                    Try Semi
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/products">
                  <Button size="lg" variant="outline" data-testid="link-back-products">
                    Back to Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Biggest Win Quote */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-8 lg:p-10">
              <div className="flex items-start gap-4 mb-6">
                <Heart className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Biggest Win</p>
                  <p className="text-lg lg:text-xl text-gray-900 italic leading-relaxed">
                    "{heroContent.biggestWin}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-700">How deep do you want to go?</span>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "highlights" | "deep-dive")} className="w-auto">
              <TabsList className="bg-gray-200 dark:bg-gray-800">
                <TabsTrigger value="highlights" data-testid="tab-highlights" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Highlights
                </TabsTrigger>
                <TabsTrigger value="deep-dive" data-testid="tab-deep-dive" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Deep Dive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Deep Dive Content - The Intelligence Layer */}
      {viewMode === "deep-dive" && (
        <>
          {/* Executive Summary */}
          <section className="py-16 lg:py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-purple-400 font-semibold tracking-wide uppercase">Executive Summary</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                    The Intelligence Layer: Why Context Beats Capability in the Age of AI
                  </h2>
                  <p className="text-sm text-gray-500">Estimated reading time: 10-12 minutes</p>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Every AI company wants you to believe their model is smarter. <strong className="text-white">That's the wrong competition.</strong> 
                    The real battle isn't model quality—it's context. An average model with perfect context beats a genius model 
                    with amnesia. This case study examines why Semi's approach—context-first, routing-smart, honestly-priced—
                    represents a fundamentally different philosophy of AI assistance.
                  </p>

                  <div className="bg-white/5 rounded-2xl p-8 my-8">
                    <h3 className="text-lg font-bold text-purple-400 mb-4">Key Insights</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold">1.</span>
                        <span>Model quality has diminishing returns—context quality has compounding returns</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold">2.</span>
                        <span>Intelligent routing can reduce AI costs by 60%+ while improving quality for complex tasks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold">3.</span>
                        <span>Semi learns your voice, preferences, and domain—becoming more valuable with every interaction</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 font-bold">4.</span>
                        <span>Honest pricing (credits) creates sustainable AI instead of "free" products that exploit your data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part I: The Context Problem */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-purple-600 font-semibold tracking-wide uppercase">Part I</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    The Context Problem: Why Smarter Models Aren't the Answer
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The AI industry is obsessed with benchmarks. Who has the highest score on MMLU? Whose model writes 
                    better code on HumanEval? This competition misses the point entirely.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Consider two scenarios:
                  </p>

                  <div className="space-y-8 mt-6">
                    <div className="border-l-4 border-red-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Scenario A: The Genius with Amnesia</h4>
                      <p className="text-gray-700">
                        You're using GPT-5 (or whatever the latest frontier model is). It's incredibly smart—top of every 
                        benchmark. You ask: "Should I take this job offer?" The model has no idea who you are, what you value, 
                        what your current job is like, what your financial situation is, or what your career goals are. It 
                        gives you generic advice that could apply to anyone.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Scenario B: The Average Model with Perfect Context</h4>
                      <p className="text-gray-700">
                        You're using a capable but not cutting-edge model. But it knows everything: your current salary, 
                        your manager frustrations, your long-term goal of starting a company, your recent conversation with 
                        your spouse about work-life balance, your commute complaints. It gives you specific advice that 
                        accounts for your actual situation.
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mt-8">
                    Which response is more valuable? <strong className="text-gray-900">Scenario B wins every time.</strong> 
                    Context isn't a nice-to-have—it's the primary determinant of AI usefulness.
                  </p>

                  <div className="callout-box-neutral p-8 my-10">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">The Compounding Effect</h4>
                    <p className="text-gray-700">
                      Model improvements have diminishing returns. The jump from GPT-3 to GPT-4 was transformative. 
                      The jump from GPT-4 to future models will be incremental. But context improvements compound 
                      indefinitely. The more you use an AI that remembers you, the more valuable each interaction becomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part II: How Semi Thinks */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-purple-600 font-semibold tracking-wide uppercase">Part II</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    How Semi Thinks: The Architecture of Personalized AI
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Semi isn't trying to be the smartest model. She's trying to be 
                    <strong className="text-gray-900"> the AI that knows you best</strong>. Here's how she achieves that:
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">The Three Pillars of Semi</h3>

                  <div className="grid gap-6 my-10">
                    <Card className="border-2 border-green-500/30">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Database className="h-10 w-10 text-green-600" />
                          <h4 className="text-xl font-bold text-gray-900">Pillar 1: Hash Integration</h4>
                        </div>
                        <p className="text-gray-700">
                          Semi reads from your Hash—the private memory journal that captures your context over time. 
                          When you ask a question, Semi doesn't just parse your words; she understands them in the context 
                          of everything you've ever told Hash. Your preferences, your history, your goals—all inform her response.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-500/30">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Route className="h-10 w-10 text-purple-600" />
                          <h4 className="text-xl font-bold text-gray-900">Pillar 2: Intelligent Routing</h4>
                        </div>
                        <p className="text-gray-700">
                          Not every question needs GPT-4. "What time is it in Tokyo?" can be answered by a lightweight model 
                          in milliseconds. "Help me think through this strategic decision" deserves the full power of a 
                          frontier model. Semi routes intelligently—cheap for simple, premium for complex. You never 
                          overpay for capability you don't need.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-brand-pink/30">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Sparkles className="h-10 w-10 text-brand-pink" />
                          <h4 className="text-xl font-bold text-gray-900">Pillar 3: Voice Learning</h4>
                        </div>
                        <p className="text-gray-700">
                          The more you interact with Semi, the more she learns your communication style. Your vocabulary, 
                          your tone, your typical sentence structure. Eventually, when she drafts something for you, 
                          it sounds like you—not like generic AI output. First drafts that actually sound like the 
                          person who's going to send them.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6 my-10">
                    <p className="text-xl text-gray-900 italic">
                      "She doesn't forget. She learns you. And she gets smarter every day—not because we update her, 
                      but because you use her."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part III: The Economics of AI */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-purple-600 font-semibold tracking-wide uppercase">Part III</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    The Economics of AI: Why "Free" Is a Lie
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Other AI services pretend computation is free. It isn't. Running large language models costs real money—
                    significant money. When a service is "free," you're paying in other ways: your data, your attention, 
                    your privacy.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">The Honest Credit Model</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Semi uses credits. <strong className="text-gray-900">Credits aren't obstacles—they're acknowledgment 
                    that quality takes resources.</strong> This creates three important dynamics:
                  </p>

                  <div className="space-y-8 mt-6">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Dynamic #1: Alignment</h4>
                      <p className="text-gray-700">
                        When you pay for AI, we're aligned: we want to make the product better so you use it more. 
                        When AI is "free," the company's incentive is to extract value from you (your data, your 
                        attention for ads) rather than deliver value to you.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Dynamic #2: Sustainability</h4>
                      <p className="text-gray-700">
                        Free AI services burn venture capital hoping to figure out monetization later. That's not 
                        sustainable. Credits ensure Semi can operate indefinitely—your AI assistant won't disappear 
                        when funding runs out.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Dynamic #3: Intelligent Usage</h4>
                      <p className="text-gray-700">
                        Credits encourage thoughtful AI usage rather than spam. When interactions have cost, you 
                        think about what you're asking. This leads to better questions and more valuable answers.
                      </p>
                    </div>
                  </div>

                  <div className="callout-box-neutral p-8 my-10">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Routing Savings in Practice</h4>
                    <p className="text-gray-700 mb-4">
                      Intelligent routing typically reduces AI costs by 60% or more. Here's how it works in practice:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Simple queries (70% of requests): Handled by fast, cheap local models</li>
                      <li>• Medium complexity (25% of requests): Routed to capable mid-tier models</li>
                      <li>• Complex reasoning (5% of requests): Escalated to frontier models when needed</li>
                      <li>• Result: Premium quality where it matters, efficiency everywhere else</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part IV: Who Semi Is For */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-purple-600 font-semibold tracking-wide uppercase">Part IV</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    Who Benefits Most from Semi?
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Semi is for anyone who wants AI that actually understands them—but some use cases show 
                    particularly dramatic benefits:
                  </p>

                  <div className="grid gap-8 my-10">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Startup Founders</h4>
                      <p className="text-gray-700">
                        You're making hundreds of decisions daily with incomplete information. Semi remembers every 
                        strategic conversation, every investor interaction, every pivot consideration. When you ask 
                        for advice, she accounts for your specific situation—your runway, your team dynamics, your 
                        market positioning. Generic startup advice becomes personalized strategic counsel.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Content Creators</h4>
                      <p className="text-gray-700">
                        Your voice is your brand—and other AIs destroy it with generic output. Semi learns how you 
                        write, what topics you care about, how you structure arguments. First drafts that actually 
                        sound like you. Ideas that fit your existing content strategy. Research that knows what 
                        you already know and what you're trying to learn.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Knowledge Workers</h4>
                      <p className="text-gray-700">
                        You're drowning in information—emails, meetings, documents, decisions. Semi becomes your 
                        external brain. She remembers what was discussed in last month's planning meeting. She 
                        knows which stakeholders prefer which communication styles. She surfaces relevant context 
                        exactly when you need it, without you having to search.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">People Who Want Patient AI</h4>
                      <p className="text-gray-700">
                        Maybe you prefer slower, more thorough explanations. Maybe you need step-by-step guidance. 
                        Maybe you want an AI that doesn't rush you. Semi learns your pace and adjusts. She remembers 
                        that you like things explained from first principles, or that you prefer bullet points, 
                        or that you learn better with examples.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part V: Semi in the Ecosystem */}
          <section className="py-16 lg:py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-purple-400 font-semibold tracking-wide uppercase">Part V</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                    Semi in the Curator Economy
                  </h2>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Semi isn't a standalone product—she's the intelligence layer that makes everything else in 
                    the CHB ecosystem work. Here's how the pieces connect:
                  </p>

                  <div className="space-y-8 my-10">
                    <div className="bg-white/5 rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <ArrowLeft className="h-6 w-6 text-green-400" />
                        <h4 className="text-xl font-bold text-white">Hash → Semi</h4>
                      </div>
                      <p className="text-gray-300">
                        Semi reads from Hash to personalize every interaction. Your private journal becomes 
                        the context that makes Semi uniquely valuable to you. The more you journal, the smarter 
                        Semi becomes—not through training, but through understanding.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <ArrowRight className="h-6 w-6 text-brand-pink" />
                        <h4 className="text-xl font-bold text-white">Semi → Pipes</h4>
                      </div>
                      <p className="text-gray-300">
                        When you're ready to become a curator, Semi helps you create and refine Pipes. She 
                        understands your expertise (from Hash), helps you structure it (through conversation), 
                        and refines it (through iteration). Pipes are created in Semi, not in some separate tool.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Eye className="h-6 w-6 text-purple-400" />
                        <h4 className="text-xl font-bold text-white">Pipes → Semi</h4>
                      </div>
                      <p className="text-gray-300">
                        When someone queries a Pipe, Semi executes it. She synthesizes the curated knowledge 
                        into coherent, perspective-aware responses. The curator provides the expertise; 
                        Semi provides the intelligence to deliver it effectively.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6 my-10">
                    <p className="text-xl text-white italic">
                      "Semi is where you chat freely, where your expertise is captured, and where your Pipes 
                      come to life. She's the interface between human wisdom and AI capability."
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-10">The Bottom Line</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The AI race isn't about who has the smartest model. It's about who knows you best. Semi wins 
                    that race by design—not through bigger parameters, but through deeper context. Start chatting 
                    freely. Let her learn you. Watch every interaction become more valuable than the last.
                  </p>

                  <p className="text-xl text-purple-400 font-bold mt-10">
                    She doesn't forget. She learns you. And she gets better every day. :-]
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Quick Highlights Content */}
      {viewMode === "highlights" && (
        <>
          {/* Problem/Solution */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">The Problem</p>
                    <p className="text-lg text-gray-900 leading-relaxed">{problemSolution.problem}</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">The Solution</p>
                    <p className="text-lg text-gray-900 leading-relaxed">{problemSolution.solution}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* One-Liner Banner */}
          <section className="py-12 bg-purple-600">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <p className="text-2xl lg:text-3xl font-bold text-white">
                Your AI that learns you, routes intelligently, costs less.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  What Makes Semi Different
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center space-y-4" data-testid={`feature-${index}`}>
                    <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mx-auto">
                      <feature.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Routing Examples */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  See Routing in Action
                </h2>
                <p className="text-lg text-gray-700">Semi picks the right model for each query</p>
              </div>

              <div className="space-y-6">
                {routingExamples.map((example, index) => (
                  <Card key={index} className="border-2" data-testid={`routing-example-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 mb-1">Query</p>
                          <p className="text-lg font-medium text-gray-900">"{example.query}"</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-700 mb-1">Route</p>
                            <p className="font-bold text-purple-600">{example.route}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-700 mb-1">Cost</p>
                            <p className="font-bold text-green-600">{example.cost}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-4 italic">{example.reason}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Credit Philosophy */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="bg-gradient-to-br from-purple-500/10 to-brand-pink/10 border border-purple-500/20 rounded-3xl p-8 lg:p-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-gray-900">
                      Credit Philosophy
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Semi interactions DO cost credits—servers cost money to run. But the cost is minimal and transparent:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <TrendingDown className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Simple queries (local):</strong> Low credit cost</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Complex queries (external):</strong> Premium credit cost</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Brain className="h-5 w-5 text-brand-pink flex-shrink-0 mt-0.5" />
                        <span><strong>Learning/training:</strong> Included in background</span>
                      </li>
                    </ul>
                    <p className="text-gray-900 font-medium pt-4">
                      "Semi is very efficient—we're still settling on exact credit amounts, but you'll get ample use from any tier."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ecosystem Synergy */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  How Semi Connects
                </h2>
                <p className="text-lg text-gray-700">Semi is the intelligence layer for everything</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="border-2 border-green-500/30">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">;</span>
                      </div>
                      <ArrowLeft className="h-6 w-6 text-gray-700" />
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">#</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{synergy.hashConnection.title}</h3>
                    <p className="text-gray-700">{synergy.hashConnection.description}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-brand-pink/30">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">;</span>
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-700" />
                      <div className="w-12 h-12 bg-brand-pink rounded-xl flex items-center justify-center">
                        <span className="text-sm font-bold text-white tracking-widest">| | |</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{synergy.pipesConnection.title}</h3>
                    <p className="text-gray-700">{synergy.pipesConnection.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Promise Section */}
          <section className="py-16 lg:py-24 bg-purple-600">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-6">
                She Doesn't Forget
              </h2>
              <p className="text-xl text-purple-100 leading-relaxed mb-8">
                Most AI tools start fresh every conversation. Semi builds on everything you've shared. 
                Every chat makes her smarter about <em>you</em>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Your preferences", "Your history", "Your context", "Your goals"].map((item, index) => (
                  <span key={index} className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}


      {/* CTA */}
      <section className="py-16 lg:py-24 bg-purple-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
            Ready to meet your AI?
          </h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Semi gets smarter every day. The sooner you start, the more she learns about you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://semi.pink" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="group" data-testid="cta-final-semi">
                Try Semi Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link href="/products/pipes">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
                Learn About Pipes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
