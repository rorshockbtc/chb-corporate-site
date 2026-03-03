import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Brain, Shield, Coins, Heart, Globe, Eye, Layers, Code, ExternalLink, Key, Users, TrendingUp, FileText, Zap, Database } from "lucide-react";
import { Link } from "wouter";
import { usePerspectiveContent } from "@/hooks/use-perspective";

export default function PipesDeepDive() {
  const [viewMode, setViewMode] = useState<"highlights" | "deep-dive">("highlights");
  
  const heroContent = usePerspectiveContent({
    startup_founders: {
      subtitle: "Scalable Expertise",
      title: "Install Expert Knowledge. Instantly.",
      description: "Instead of hiring consultants or building training datasets, install verified expert knowledge into your AI systems. Launch products that sound like industry insiders.",
      biggestWin: "Our home brewing app gives advice that sounds like a master brewer because it is."
    },
    content_creators: {
      subtitle: "Expertise as Equity",
      title: "Your Knowledge Earns While You Sleep",
      description: "Transform your accumulated wisdom into a revenue-generating asset. Instead of trading time for money, build an expertise asset that compounds over time.",
      biggestWin: "Someone in Japan is using my cooking pipe in their recipe app. I just got paid for knowledge I shared three years ago."
    },
    memory_capturers: {
      subtitle: "Knowledge Preservation",
      title: "Your Collection Has Real Value",
      description: "Transform years of collecting into something shareable and valuable. That 'random' knowledge collection? It's a pipe others will pay to use.",
      biggestWin: "I've been saving vintage camera articles for 15 years. Now it's a pipe that other people actually pay to use."
    }
  });

  const problemSolution = {
    problem: "Domain experts spend years accumulating knowledge but have no scalable way to monetize it. Meanwhile, AI systems are trained on undifferentiated internet data with no accountability, transparency, or compensation to original knowledge creators.",
    solution: "Pipes creates economic infrastructure for human expertise. Own a namespace, declare your bias openly, and earn equity from every installation. Your knowledge, packaged and portable."
  };

  const features = [
    {
      icon: Key,
      title: "Namespace Ownership",
      description: "Like domain names for expertise—pipe\\flyfishing is yours forever. Own your corner of human knowledge."
    },
    {
      icon: Eye,
      title: "Transparent Bias",
      description: "Curators declare their perspective openly. No pretending objectivity—choose your biases intentionally."
    },
    {
      icon: Coins,
      title: "Equity Model",
      description: "Contributors earn ongoing revenue share, not one-time payments. Expertise as equity that compounds."
    },
    {
      icon: Layers,
      title: "Layerable Pipes",
      description: "Install multiple perspectives simultaneously. Get nuanced AI output from diverse viewpoints."
    }
  ];

  const creationSteps = [
    {
      step: 1,
      title: "Claim Your Namespace",
      description: "Choose your topic and claim your corner of expertise. pipe\\sourdough is yours. Own it."
    },
    {
      step: 2,
      title: "Declare Your Bias",
      description: "We celebrate perspective. Tell installers who you are and what lens you bring. Transparency is the point."
    },
    {
      step: 3,
      title: "Curate Your Content",
      description: "Add your best knowledge—articles, insights, frameworks. Hash entries can become Pipe content."
    },
    {
      step: 4,
      title: "Publish & Earn",
      description: "Make it available in the marketplace. Every installation generates equity. Every query earns credits."
    }
  ];

  const installationFlow = usePerspectiveContent({
    startup_founders: {
      title: "Installation for Founders",
      description: "Browse the marketplace, find expert knowledge for your domain, install with one click. Your AI now sounds like an industry insider.",
      example: "Building a wine recommendation app? Install pipe\\sommelier and pipe\\food-pairing. Instant expertise."
    },
    content_creators: {
      title: "Become a Curator",
      description: "Your years of content creation become a Pipe. Blog posts, tutorials, opinions—all packaged into a revenue-generating asset.",
      example: "Your cooking channel becomes pipe\\mediterranean-cooking. Earn from every recipe app that installs you."
    },
    memory_capturers: {
      title: "Share Your Collection",
      description: "That obsessive hobby? The decades of articles you've saved? It's a Pipe waiting to be created.",
      example: "Your vintage camera knowledge becomes pipe\\film-photography. Photography apps install your expertise."
    }
  });

  const synergy = {
    hashConnection: {
      title: "Hash → Pipes",
      description: "Your Hash journals reveal your expertise. What you know deeply emerges from what you write. Create Pipes from your strongest themes."
    },
    semiConnection: {
      title: "Semi → Pipes",
      description: "Semi helps you discover your biases and optimize content quality. When someone queries a Pipe, Semi synthesizes the curated content into coherent responses."
    }
  };

  const biasExamples = [
    {
      perspective: "Traditionalist",
      description: "Values time-tested methods and classical techniques"
    },
    {
      perspective: "Innovator",
      description: "Prioritizes new approaches and cutting-edge experimentation"
    },
    {
      perspective: "Pragmatist",
      description: "Focuses on what works regardless of tradition or novelty"
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-pink/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-14 h-14 bg-brand-pink rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-white tracking-widest">| | |</span>
                </div>
                <span className="text-brand-pink font-semibold tracking-wide uppercase">{heroContent.subtitle}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900" data-testid="pipes-title">
                {heroContent.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                {heroContent.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://pipes.pink" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group bg-brand-pink hover:bg-brand-pink/90" data-testid="cta-try-pipes">
                    Explore Pipes
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
            <div className="bg-brand-pink/10 border border-brand-pink/20 rounded-3xl p-8 lg:p-10">
              <div className="flex items-start gap-4 mb-6">
                <Heart className="h-8 w-8 text-brand-pink flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-brand-pink uppercase tracking-wide mb-2">Biggest Win</p>
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
                <TabsTrigger value="highlights" data-testid="tab-highlights" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-brand-pink data-[state=active]:text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Highlights
                </TabsTrigger>
                <TabsTrigger value="deep-dive" data-testid="tab-deep-dive" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-brand-pink data-[state=active]:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Deep Dive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Deep Dive Content - The Curator Economy Thesis */}
      {viewMode === "deep-dive" && (
        <>
          {/* Executive Summary */}
          <section className="py-16 lg:py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Executive Summary</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                    The Curator Economy: A New Paradigm for Human Expertise in the Age of AI
                  </h2>
                  <p className="text-sm text-gray-500">Estimated reading time: 12-15 minutes</p>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    The AI revolution has a dirty secret: <strong className="text-white">the people creating the knowledge AI uses get nothing.</strong> 
                    Domain experts spend decades accumulating wisdom, only to watch Big Tech scrape it for training data without compensation, 
                    attribution, or accountability. This case study examines how Pipes fundamentally restructures this relationship, creating 
                    a new economic actor—the Curator—and the infrastructure for what we call the Curator Economy.
                  </p>

                  <div className="bg-white/5 rounded-2xl p-8 my-8">
                    <h3 className="text-lg font-bold text-brand-pink mb-4">Key Insights</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-start gap-3">
                        <span className="text-brand-pink font-bold">1.</span>
                        <span>AI isn't replacing human expertise—it's creating unprecedented demand for curated knowledge</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-brand-pink font-bold">2.</span>
                        <span>The current AI value chain is fundamentally broken: those who create knowledge capture none of the value</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-brand-pink font-bold">3.</span>
                        <span>Pipes introduces namespace ownership, transparent bias declarations, and equity-based compensation to fix this</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-brand-pink font-bold">4.</span>
                        <span>Early namespace holders—like early domain name registrants—stand to capture significant value</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part I: The Problem */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Part I</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    The Broken Value Chain of AI
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Consider this scenario: A cardiologist spends 20 years developing nuanced diagnostic intuition. She writes papers, 
                    mentors residents, contributes to online forums. Then an AI company scrapes her content—along with millions of other 
                    documents—and trains a model that can now perform "AI-assisted diagnosis." The cardiologist receives nothing. 
                    The AI company is valued at billions.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    This isn't a hypothetical. It's the current state of AI development. And it represents what we believe is the 
                    <strong className="text-gray-900"> single biggest market inefficiency in the technology sector today</strong>.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">The Three Failures of Current AI</h3>
                  
                  <div className="space-y-8 mt-6">
                    <div className="border-l-4 border-red-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Failure #1: No Attribution</h4>
                      <p className="text-gray-700">
                        When you ask ChatGPT a question about sourdough baking, you get an answer synthesized from thousands of sources. 
                        But which sources? Which bakers' hard-won insights are you receiving? You'll never know. The original contributors 
                        are invisible, their expertise laundered through corporate training processes until all provenance is lost.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Failure #2: No Compensation</h4>
                      <p className="text-gray-700">
                        The Reddit moderator who spent years cultivating the best vintage camera community online? The forum regular who 
                        answered thousands of detailed audio engineering questions? The blogger who documented every lesson learned from 
                        a decade of startup experience? All of their knowledge now lives inside AI systems generating billions in revenue. 
                        Their compensation: zero.
                      </p>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Failure #3: No Accountability</h4>
                      <p className="text-gray-700">
                        Current AI presents itself as neutral, objective, authoritative. It isn't. Every AI system embodies the biases 
                        of its training data and the values of its creators. But because those biases are hidden inside black-box models, 
                        users have no way to understand—let alone choose—which perspectives they're receiving.
                      </p>
                    </div>
                  </div>

                  <div className="callout-box-neutral p-8 my-10">
                    <p className="text-lg text-gray-900 italic">
                      "The internet was supposed to democratize knowledge. Instead, we've created a system where the world's collected 
                      wisdom flows into corporate data centers, gets processed into proprietary AI systems, and generates wealth for 
                      shareholders while the original knowledge creators get nothing."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part II: The Curator Economy Vision */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Part II</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    The Curator Economy Vision
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We propose a fundamentally different model. Instead of knowledge flowing one-way into opaque corporate systems, 
                    Pipes creates infrastructure for a new economic paradigm: <strong className="text-gray-900">the Curator Economy</strong>.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">What is a Curator?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Not a content creator. Not an influencer. A <strong className="text-gray-900">Curator</strong> is someone who selects, 
                    organizes, and contextualizes knowledge with intentional perspective. They don't just create information—they decide 
                    what matters, how it connects, and what values it embodies.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    In the Curator Economy, curators fill three critical roles that were previously held by AI companies alone:
                  </p>

                  <div className="grid gap-6 my-10">
                    <Card className="border-2 border-brand-pink/30">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Users className="h-10 w-10 text-brand-pink" />
                          <h4 className="text-xl font-bold text-gray-900">AI's Boss</h4>
                        </div>
                        <p className="text-gray-700">
                          Curators decide what knowledge matters and what perspectives AI should embody. When you install <code className="text-brand-pink">pipe\sourdough</code>, 
                          you're not just getting bread information—you're getting a curated perspective on bread-making from someone who has 
                          decided what matters about the craft. The curator is the boss of that particular AI domain.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-500/30">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Database className="h-10 w-10 text-green-600" />
                          <h4 className="text-xl font-bold text-gray-900">AI's Source</h4>
                        </div>
                        <p className="text-gray-700">
                          Instead of undifferentiated internet data scraped without consent, AI gets vetted, attributed expertise from known 
                          sources. Users can choose exactly which perspectives and values they want their AI to reflect. Want conservative 
                          financial advice? Install a Pipe from a curator who embodies that approach. Want progressive analysis? Install 
                          a different Pipe. Transparency replaces corporate opacity.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-500/30">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Shield className="h-10 w-10 text-purple-600" />
                          <h4 className="text-xl font-bold text-gray-900">AI's Regulator</h4>
                        </div>
                        <p className="text-gray-700">
                          Every Pipe comes with an explicit bias statement. Curators control which values and perspectives their Pipe embodies—
                          and they must declare them publicly. This isn't hidden manipulation dressed as objectivity. It's 
                          <strong className="text-gray-900"> transparent bias</strong>, where users know exactly what they're getting 
                          and can make informed choices about whose perspective they trust.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border-l-4 border-brand-pink pl-6 my-10">
                    <p className="text-xl text-gray-900 italic">
                      "This isn't about better AI tools. It's about who controls AI—and we believe that should be the humans 
                      whose knowledge makes it valuable."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part III: How Pipes Works */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Part III</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    How Pipes Works: A Technical Walkthrough
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mt-6">Step 1: Namespace Registration</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Like domain names in the early internet, Pipes namespaces are scarce. There can only be one <code className="text-brand-pink">pipe\vintage-cameras</code>. 
                    One <code className="text-brand-pink">pipe\sourdough</code>. One <code className="text-brand-pink">pipe\startup-finance</code>. When you register a namespace, 
                    you're claiming ownership of a topic area that will grow in value as the Curator Economy expands.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 2: Knowledge Curation</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Using Semi (our AI assistant), you curate and refine the knowledge that will power your Pipe. This isn't just 
                    uploading documents—it's an interactive process of selection, organization, and perspective declaration. What do you 
                    believe about your topic? What matters? What doesn't? Semi helps you articulate and structure your expertise.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Your Hash entries—the private journal that captures your thoughts, insights, and evolving understanding—become the 
                    raw material for your Pipe. Knowledge that you've accumulated over years becomes structured, installable expertise.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 3: Bias Declaration</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Every Pipe requires a public bias statement. This isn't about pretending to be objective—it's about honest positioning. 
                    A <code className="text-brand-pink">pipe\personal-finance</code> might declare: "This Pipe prioritizes long-term wealth building over 
                    short-term gains. It assumes a moderate risk tolerance and a 20+ year time horizon. It's skeptical of cryptocurrency 
                    as a primary investment vehicle."
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Users who share those values will install it. Users who don't will find Pipes that better match their perspective. 
                    Everyone knows what they're getting.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 4: Installation & Distribution</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Pipes can be installed in any application that supports the Pipes protocol. When a developer builds an app about 
                    baking and wants to incorporate expert sourdough knowledge, they install <code className="text-brand-pink">pipe\sourdough</code>. 
                    Their users now have access to curated expertise from a real human who knows the domain deeply—not generic AI output 
                    synthesized from anonymous internet scraping.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 5: Ongoing Value Capture</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Here's where the economics get interesting. Every installation generates ongoing revenue for the curator. Every query 
                    against the Pipe generates micropayments. As the Pipe becomes more popular and more installations occur, the curator's 
                    revenue compounds. Early curators in popular domains stand to build significant passive income streams.
                  </p>

                  <div className="callout-box-neutral p-8 my-10">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Example: The Vintage Camera Pipe</h4>
                    <p className="text-gray-700 mb-4">
                      Sarah, a vintage camera collector and blogger for 15 years, registers <code className="text-brand-pink">pipe\vintage-cameras</code>. 
                      She curates her knowledge about film cameras, lenses, buying guides, and restoration techniques.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Photography apps install her Pipe to provide expert buying advice</li>
                      <li>• Marketplace apps use it to help users price and describe their equipment</li>
                      <li>• Educational platforms incorporate it for courses on film photography</li>
                      <li>• Each installation and query generates revenue for Sarah</li>
                      <li>• Her 15 years of expertise now compound as economic value</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part IV: Who This Is For */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Part IV</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    Who Should Be Building Pipes?
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The Curator Economy isn't for everyone. It's for people who have accumulated real expertise and want it to 
                    generate ongoing value. Here's who we believe will thrive:
                  </p>

                  <div className="grid gap-8 my-10">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Domain Experts with Teaching Instincts</h4>
                      <p className="text-gray-700">
                        You've spent years mastering something—and you enjoy explaining it to others. Maybe you're the person friends 
                        always ask about audio equipment, or parenting strategies, or tax optimization. You've answered the same 
                        questions hundreds of times. A Pipe lets you answer them once, with your full context and perspective, and 
                        get paid every time that knowledge helps someone.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Professionals with Accumulated Wisdom</h4>
                      <p className="text-gray-700">
                        Doctors, lawyers, financial advisors, engineers, therapists—professionals who have developed nuanced judgment 
                        over decades of practice. Your expertise isn't just facts; it's wisdom about how to apply those facts in 
                        complex real-world situations. That judgment is valuable, and right now it's not being captured or compensated.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Niche Enthusiasts with Deep Knowledge</h4>
                      <p className="text-gray-700">
                        The fountain pen collector who can identify any nib on sight. The cocktail historian who knows the origin of 
                        every classic drink. The vintage synth enthusiast who has personally owned and restored dozens of instruments. 
                        You're not famous, but in your domain, you're irreplaceable. The Curator Economy finally lets that matter economically.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Content Creators Ready to Level Up</h4>
                      <p className="text-gray-700">
                        You've been creating content for years—blog posts, YouTube videos, podcasts. You've built an audience and 
                        established expertise. But you're tired of the attention economy treadmill, where you have to keep producing 
                        to keep earning. Pipes lets you convert that accumulated work into an asset that earns passively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part V: The Economics */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Part V</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    The Economic Model: How Curators Build Wealth
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Traditional content monetization is linear: you create, you get paid once (or per-view), you must create again. 
                    The Curator Economy is different. It's designed to be <strong className="text-gray-900">compounding</strong>.
                  </p>

                  <div className="grid md:grid-cols-3 gap-8 my-10">
                    <Card className="border-2">
                      <CardContent className="p-6 space-y-4">
                        <TrendingUp className="h-10 w-10 text-brand-pink" />
                        <h3 className="text-lg font-bold text-gray-900">Equity, Not Fees</h3>
                        <p className="text-gray-700 text-sm">
                          You don't sell your Pipe once. You retain ownership and earn ongoing revenue share from every installation 
                          and query. Your expertise appreciates like real estate—it can generate income for decades.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardContent className="p-6 space-y-4">
                        <Layers className="h-10 w-10 text-purple-600" />
                        <h3 className="text-lg font-bold text-gray-900">Network Effects</h3>
                        <p className="text-gray-700 text-sm">
                          As more apps install your Pipe, it becomes more valuable to other apps. Popular Pipes attract more attention, 
                          more installations, more queries. Success compounds.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardContent className="p-6 space-y-4">
                        <Key className="h-10 w-10 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Namespace Scarcity</h3>
                        <p className="text-gray-700 text-sm">
                          Like domain names in 1995, namespace ownership creates artificial scarcity. <code className="text-brand-pink">pipe\cooking</code> 
                          can only belong to one curator. First mover advantage is real and substantial.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">The Layered Revenue Model</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Curators can earn from multiple streams simultaneously:
                  </p>
                  <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li><strong className="text-gray-900">Installation fees:</strong> One-time or recurring payments from apps that want to include your expertise</li>
                    <li><strong className="text-gray-900">Query royalties:</strong> Micropayments for every question answered using your Pipe</li>
                    <li><strong className="text-gray-900">Attribution bonuses:</strong> Additional compensation when users specifically request your perspective</li>
                    <li><strong className="text-gray-900">Premium tiers:</strong> Higher-priced access for commercial or enterprise applications</li>
                  </ul>

                  <div className="callout-box-neutral p-8 my-10">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Early Mover Advantage</h4>
                    <p className="text-gray-700">
                      Remember when people dismissed domain names as worthless? "Why would anyone pay for cars.com?" Those early 
                      registrants are now sitting on assets worth millions. Pipe namespaces follow similar logic. The person who 
                      registers <code className="text-brand-pink">pipe\personal-finance</code> or <code className="text-brand-pink">pipe\home-cooking</code> today 
                      is claiming territory in the Curator Economy while most people still don't know it exists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part VI: Why Now */}
          <section className="py-16 lg:py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-pink font-semibold tracking-wide uppercase">Part VI</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                    Why Now? The Convergence of Forces
                  </h2>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Three forces are converging to make the Curator Economy not just possible, but inevitable:
                  </p>

                  <div className="space-y-8 my-10">
                    <div className="bg-white/5 rounded-2xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4">1. AI Maturity</h4>
                      <p className="text-gray-300">
                        Language models have crossed a critical threshold. They can now synthesize nuanced expert knowledge—not just 
                        regurgitate facts, but understand context, apply judgment, and communicate with appropriate subtlety. This 
                        means curated expertise can actually be delivered effectively through AI interfaces.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4">2. The Distribution Crisis</h4>
                      <p className="text-gray-300">
                        Individual creators are struggling. The attention economy is saturated. Platform algorithms favor 
                        sensationalism over substance. Experts with genuine knowledge find it increasingly hard to monetize that 
                        expertise. The Curator Economy offers a completely different path—one based on the enduring value of 
                        expertise rather than the fleeting value of attention.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4">3. Trust Collapse</h4>
                      <p className="text-gray-300">
                        People are losing faith in institutions—and in opaque AI systems that claim objectivity while embodying 
                        hidden biases. There's growing demand for transparency: who made this, what do they believe, why should 
                        I trust them? Pipes provides exactly this through mandatory bias declarations and transparent attribution.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-pink pl-6 my-10">
                    <p className="text-xl text-white italic">
                      "The question isn't whether the Curator Economy will emerge—it's who will be positioned to capture value 
                      when it does. Early namespace holders will have first-mover advantages that are nearly impossible to replicate."
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-10">The Bottom Line</h3>
                  <p className="text-gray-300 leading-relaxed">
                    AI is creating unprecedented demand for human expertise—but current systems extract that expertise without 
                    compensation. Pipes fixes this by making human knowledge ownable, installable, and monetizable. If you have 
                    genuine expertise in any domain, now is the time to claim your namespace and start building your Pipe.
                  </p>

                  <p className="text-xl text-brand-pink font-bold mt-10">
                    Every Pipe is a real slice of humanity. :-]
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
                <Card className="border-brand-pink/50 dark:border-brand-pink/30 bg-pink-50/50 dark:bg-pink-900/10">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-sm font-semibold text-brand-pink uppercase tracking-wide">The Solution</p>
                    <p className="text-lg text-gray-900 leading-relaxed">{problemSolution.solution}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* One-Liner Banner */}
          <section className="py-12 bg-brand-pink">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <p className="text-2xl lg:text-3xl font-bold text-white">
                Human expertise packaged as reusable, monetizable AI infrastructure.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  What Makes Pipes Different
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center space-y-4" data-testid={`feature-${index}`}>
                    <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mx-auto">
                      <feature.icon className="h-8 w-8 text-brand-pink" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Namespace Ownership Visual */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  Own Your Namespace
                </h2>
                <p className="text-lg text-gray-700">Like domain names, but for what you know</p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 lg:p-12 font-mono text-center">
                <p className="text-gray-400 text-sm mb-4">Your expertise, your namespace:</p>
                <div className="space-y-4">
                  <p className="text-2xl lg:text-4xl">
                    <span className="text-gray-500">pipe\</span><span className="text-brand-pink">sourdough</span>
                  </p>
                  <p className="text-2xl lg:text-4xl">
                    <span className="text-gray-500">pipe\</span><span className="text-green-400">vintage-cameras</span>
                  </p>
                  <p className="text-2xl lg:text-4xl">
                    <span className="text-gray-500">pipe\</span><span className="text-purple-400">startup-gtm</span>
                  </p>
                </div>
                <p className="text-gray-400 text-sm mt-6">Yours forever. Your rules. Your equity.</p>
              </div>
            </div>
          </section>

          {/* Bias Transparency */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  Bias as a Feature
                </h2>
                <p className="text-lg text-gray-700">We don't pretend AI is objective. Neither should you.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {biasExamples.map((bias, index) => (
                  <Card key={index} className="border-2 text-center" data-testid={`bias-${index}`}>
                    <CardContent className="p-6 space-y-3">
                      <Eye className="h-8 w-8 text-brand-pink mx-auto" />
                      <h3 className="text-lg font-bold text-gray-900">{bias.perspective}</h3>
                      <p className="text-sm text-gray-700">{bias.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 bg-brand-pink/10 border border-brand-pink/20 rounded-xl p-6 text-center">
                <p className="text-gray-900">
                  "Every Pipe comes with an explicit bias statement because <strong>transparency isn't a bug—it's the whole point</strong>. Choose your perspectives intentionally."
                </p>
              </div>
            </div>
          </section>

          {/* Creation Flow */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  Create Your Pipe
                </h2>
                <p className="text-lg text-gray-700">Four steps from knowledge to equity</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {creationSteps.map((step, index) => (
                  <div key={index} className="relative" data-testid={`creation-step-${step.step}`}>
                    {index < creationSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-brand-pink/30 to-transparent -translate-x-4 z-0" />
                    )}
                    <div className="relative z-10 space-y-4">
                      <div className="w-12 h-12 bg-brand-pink rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Installation for Your Persona */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-pink/5 to-purple-500/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <Card className="border-2 border-brand-pink/30">
                <CardContent className="p-8 lg:p-12 space-y-6">
                  <div className="flex items-center gap-4">
                    <Code className="h-10 w-10 text-brand-pink" />
                    <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-gray-900">
                      {installationFlow.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700">{installationFlow.description}</p>
                  <div className="callout-box-neutral p-6">
                    <p className="text-sm text-gray-700 mb-2">Example:</p>
                    <p className="text-gray-900 font-medium">{installationFlow.example}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Ecosystem Synergy */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  How Pipes Connects
                </h2>
                <p className="text-lg text-gray-700">Your expertise flows through the ecosystem</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="border-2 border-green-500/30">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">#</span>
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-700" />
                      <div className="w-12 h-12 bg-brand-pink rounded-xl flex items-center justify-center">
                        <span className="text-sm font-bold text-white tracking-widest">| | |</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{synergy.hashConnection.title}</h3>
                    <p className="text-gray-700">{synergy.hashConnection.description}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-500/30">
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
                    <h3 className="text-xl font-bold text-gray-900">{synergy.semiConnection.title}</h3>
                    <p className="text-gray-700">{synergy.semiConnection.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* :-] Moments */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  :-] Moments
                </h2>
                <p className="text-lg text-gray-700">The magic that makes you smile</p>
              </div>

              <div className="space-y-6">
                {[
                  "Typing pipe\\ and seeing YOUR topic appear in that distinctive monospace pink—it feels like claiming digital territory",
                  "The Perspective Explorer showing 9 different viewpoints analyzing the same event side by side",
                  "When a curator sees '+$12.47 from pipe\\vintage-cameras' in their earnings dashboard"
                ].map((moment, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-brand-pink/10 rounded-xl border border-brand-pink/20">
                    <span className="text-2xl">:-]</span>
                    <p className="text-lg text-gray-900">{moment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Brand Voice Quote */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <Globe className="h-16 w-16 text-brand-pink mx-auto mb-8" />
              <blockquote className="text-xl lg:text-2xl text-gray-900 leading-relaxed italic mb-6">
                "Your expertise has been working for free. Let's fix that. Every link you've saved, every opinion you've formed, every recommendation you've made—it's all value that's been leaking into the void. Pipes plugs the leak."
              </blockquote>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-brand-pink">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
            Ready to package your expertise?
          </h2>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            Claim your namespace. Declare your bias. Start earning from what you know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://pipes.pink" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="group" data-testid="cta-final-pipes">
                Explore the Marketplace
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link href="/products/hash">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
                Start with Hash
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
