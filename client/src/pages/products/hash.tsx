import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Brain, Shield, Lock, Sparkles, BookOpen, Heart, Users, Zap, ExternalLink, FileText, Database, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { usePerspectiveContent } from "@/hooks/use-perspective";

export default function HashDeepDive() {
  const [viewMode, setViewMode] = useState<"highlights" | "deep-dive">("highlights");
  
  const heroContent = usePerspectiveContent({
    startup_founders: {
      subtitle: "Strategic Memory",
      title: "Your Business Never Forgets",
      description: "Document decisions, pivot rationales, and investor conversations. Semi recalls them exactly when you need them most.",
      biggestWin: "I was drafting a pitch and Semi reminded me of a framework I journaled about 6 months ago. Saved hours of reinvention."
    },
    content_creators: {
      subtitle: "Creative Archive",
      title: "Your Ideas Never Get Lost",
      description: "Capture creative sparks whenever they strike. The raw material that becomes content lives here first.",
      biggestWin: "I had a random thought in the shower, journaled it, and Semi helped me turn it into my most viral thread."
    },
    memory_capturers: {
      subtitle: "Legacy Preservation",
      title: "Your Memories Live Forever",
      description: "Preserve family stories, recipes, and wisdom for generations. This is what Hash was built for.",
      biggestWin: "I've been journaling about my grandmother's recipes. Now my daughter can ask Semi and get grandma's cooking wisdom in my voice."
    }
  });

  const problemSolution = usePerspectiveContent({
    startup_founders: {
      problem: "Every conversation with AI starts from scratch. You repeat your context, your decisions, your frameworks—over and over.",
      solution: "Hash gives you a persistent memory layer. Journal once, and Semi remembers forever. Your strategic context travels with you."
    },
    content_creators: {
      problem: "Brilliant ideas vanish in seconds. By the time you sit down to create, the spark is gone.",
      solution: "Hash catches every thought before it disappears. Semi transforms those raw captures into polished content—in your voice."
    },
    memory_capturers: {
      problem: "Precious family stories fade with time. Each generation loses connection to the ones before.",
      solution: "Hash preserves your memories in a format AI can understand. Future generations can ask Semi about you and hear your wisdom."
    }
  });

  const features = [
    {
      icon: Lock,
      title: "Private by Default",
      description: "Your journal stays yours unless you explicitly share. End-to-end encryption keeps your thoughts secure."
    },
    {
      icon: Brain,
      title: "AI-Native Journaling",
      description: "Written for AI to understand, not just humans to read. Semi comprehends your entries at a deeper level."
    },
    {
      icon: Sparkles,
      title: "Personality Extraction",
      description: "Hash learns your voice, preferences, and patterns. This powers personalization across the entire CHB ecosystem."
    },
    {
      icon: Users,
      title: "Cross-Product Memory",
      description: "Your Hash entries inform Semi's responses and can become the foundation for Pipes you create."
    }
  ];

  const workflows = usePerspectiveContent({
    startup_founders: [
      {
        title: "Decision Logging",
        description: "Document why you chose this tech stack, this market, this pricing. When you revisit in 6 months, the context is there."
      },
      {
        title: "Investor Prep",
        description: "Journal your pitch iterations, objection handling, and lessons from each meeting. Semi helps you improve continuously."
      },
      {
        title: "Founder Journal",
        description: "The lonely parts of building a company. Hash is your confidant—and Semi can offer perspective when you need it."
      }
    ],
    content_creators: [
      {
        title: "Idea Capture",
        description: "Voice notes from your walk, screenshots that inspire, half-formed thoughts. All organized automatically."
      },
      {
        title: "Voice Development",
        description: "The more you journal, the better Semi understands your voice. First drafts that actually sound like you."
      },
      {
        title: "Content Recycling",
        description: "That idea you journaled 2 years ago? Semi can resurface it when you need fresh content."
      }
    ],
    memory_capturers: [
      {
        title: "Family Stories",
        description: "Record the stories your grandparents told you. Preserve them before they're lost forever."
      },
      {
        title: "Recipe Preservation",
        description: "More than ingredients—capture the techniques, the variations, the memories attached to each dish."
      },
      {
        title: "Life Lessons",
        description: "The wisdom you've accumulated over decades. Your children and grandchildren can access it through Semi."
      }
    ]
  });

  const synergy = {
    semiConnection: {
      title: "Hash → Semi",
      description: "Semi knows who you are because Hash told her. Your preferences, communication style, and past decisions all inform how Semi responds to you."
    },
    pipesConnection: {
      title: "Hash → Pipes",
      description: "Your expertise emerges from what you journal. Hash reveals what you know deeply, which can become curated Pipes that others install."
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-500/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">#</span>
                </div>
                <span className="text-green-600 font-semibold tracking-wide uppercase">{heroContent.subtitle}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900" data-testid="hash-title">
                {heroContent.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                {heroContent.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://hash.pink" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group bg-green-600 hover:bg-green-700" data-testid="cta-try-hash">
                    Try Hash
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
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 lg:p-10">
              <div className="flex items-start gap-4 mb-6">
                <Heart className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">Biggest Win</p>
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
                <TabsTrigger value="highlights" data-testid="tab-highlights" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Highlights
                </TabsTrigger>
                <TabsTrigger value="deep-dive" data-testid="tab-deep-dive" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Deep Dive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Deep Dive Content - Memory Revolution */}
      {viewMode === "deep-dive" && (
        <>
          {/* Executive Summary */}
          <section className="py-16 lg:py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-green-400 font-semibold tracking-wide uppercase">Executive Summary</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                    The Memory Revolution: Why Persistent Context Will Define the Next Era of AI
                  </h2>
                  <p className="text-sm text-gray-500">Estimated reading time: 10-12 minutes</p>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Every AI conversation you've ever had started from scratch. <strong className="text-white">That's insane.</strong> 
                    Imagine if every conversation with a colleague required re-explaining who you are, what you're working on, and 
                    what you've decided before. This case study explores why persistent AI memory isn't just a feature—it's the 
                    foundation for a fundamental shift in how humans and AI collaborate.
                  </p>

                  <div className="bg-white/5 rounded-2xl p-8 my-8">
                    <h3 className="text-lg font-bold text-green-400 mb-4">Key Insights</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 font-bold">1.</span>
                        <span>The "amnesia problem" in AI isn't a technical limitation—it's a design choice that serves corporate interests</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 font-bold">2.</span>
                        <span>Memory is the prerequisite for genuine AI personalization, not fancy algorithms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 font-bold">3.</span>
                        <span>Hash represents ownership of your AI context—your data stays yours, not theirs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 font-bold">4.</span>
                        <span>Memory compounds: the more you use Hash, the more valuable your AI interactions become</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part I: The Amnesia Problem */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-green-600 font-semibold tracking-wide uppercase">Part I</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    The Amnesia Problem: Why Your AI Forgets Everything
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You've had this experience: You open ChatGPT, Claude, or any other AI assistant. You explain your situation in 
                    detail—your project, your constraints, your preferences. You get a helpful response. The next day, you return 
                    with a follow-up question. The AI has no idea who you are. You start over from scratch.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    This isn't a technical limitation. Modern AI systems are perfectly capable of maintaining persistent context. 
                    <strong className="text-gray-900"> The amnesia is a choice</strong>—one that serves corporate interests at the 
                    expense of user experience.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Why Companies Choose Amnesia</h3>
                  
                  <div className="space-y-8 mt-6">
                    <div className="border-l-4 border-red-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Reason #1: Storage Costs Money</h4>
                      <p className="text-gray-700">
                        Storing every user's context indefinitely requires infrastructure. Companies optimize for margins, not experience. 
                        Forgetting is cheaper than remembering—so they forget.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Reason #2: Memory Creates Switching Costs</h4>
                      <p className="text-gray-700">
                        If your AI truly knows you—your preferences, your history, your context—you're much less likely to switch to a 
                        competitor. Companies fear this lock-in cuts both ways, so they keep memory shallow and portable.
                      </p>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Reason #3: Privacy Liability</h4>
                      <p className="text-gray-700">
                        The more you know about users, the more you can be held accountable for. Companies prefer the safety of 
                        ignorance to the responsibility of knowledge. Amnesia protects them, not you.
                      </p>
                    </div>
                  </div>

                  <div className="callout-box-neutral my-10">
                    <h4 className="text-lg font-bold mb-4">The CHB Constitutional Requirement</h4>
                    <p className="italic mb-4">
                      "Storage is cheap. There is NO excuse for losing anything, ever. Users should never have to repeat themselves."
                    </p>
                    <p>
                      This isn't just a product philosophy—it's our constitutional principle. We believe the inconvenience of 
                      AI amnesia disrespects users' time and intelligence. Hash exists because we refuse to accept the status quo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part II: What Memory Actually Means */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-green-600 font-semibold tracking-wide uppercase">Part II</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    What Real AI Memory Actually Means
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Hash isn't just chat history. It's not a search index of your conversations. It's something fundamentally 
                    different: <strong className="text-gray-900">a structured understanding of who you are that compounds over time</strong>.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">The Three Layers of Hash Memory</h3>

                  <div className="grid gap-6 my-10">
                    <Card className="border-2 border-green-500/30 bg-white">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <FileText className="h-10 w-10 text-green-600" />
                          <h4 className="text-xl font-bold text-gray-900">Layer 1: Episodic Memory</h4>
                        </div>
                        <p className="text-gray-700">
                          What happened, when it happened, and how you felt about it. Hash captures your experiences as they occur, 
                          preserving not just facts but context. "I tried the new sourdough recipe on Tuesday and it was too sour" 
                          becomes part of your permanent record.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-500/30 bg-white">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Brain className="h-10 w-10 text-blue-600" />
                          <h4 className="text-xl font-bold text-gray-900">Layer 2: Semantic Memory</h4>
                        </div>
                        <p className="text-gray-700">
                          What you know and believe. Over time, Hash synthesizes your episodic memories into understanding. 
                          After 20 entries about sourdough, Semi understands that you prefer a milder tang, that you bake on 
                          weekends, that you've moved from Dutch ovens to baking stones. This isn't search—it's comprehension.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-500/30 bg-white">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Heart className="h-10 w-10 text-purple-600" />
                          <h4 className="text-xl font-bold text-gray-900">Layer 3: Personality Extraction</h4>
                        </div>
                        <p className="text-gray-700">
                          Who you are. The deepest layer of Hash isn't about what you know—it's about how you think. Your 
                          communication style, your values, your priorities. When Semi eventually writes in your voice, it's 
                          because Hash has captured your essence through thousands of small observations.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6 my-10">
                    <p className="text-xl text-gray-900 italic">
                      "Other AI assistants know what you asked. Hash knows who you are."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part III: How Hash Works */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-green-600 font-semibold tracking-wide uppercase">Part III</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    How Hash Works: A Technical Walkthrough
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mt-6">Step 1: Capture</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Hash is your private AI journal. You write to it naturally—thoughts, ideas, decisions, learnings. 
                    Unlike traditional journaling, Hash is designed for AI consumption: it structures and tags your entries 
                    automatically, making them retrievable and synthesizable.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 2: Synthesis</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    As entries accumulate, Hash synthesizes understanding. It identifies patterns, connects related ideas, 
                    and builds a semantic model of your knowledge and personality. This happens continuously in the background—
                    every new entry enriches the overall picture.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 3: Context Provision</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    When you interact with Semi, she reads from Hash. Not every entry—that would be overwhelming and expensive. 
                    Instead, Hash provides relevant context based on what you're discussing. Talking about dinner plans? Hash 
                    surfaces your dietary preferences, recent restaurant experiences, and cooking interests.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-10">Step 4: Cross-Application Sharing</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    This is where Hash becomes truly powerful. Your Hash context can be shared—with your permission—across 
                    applications. Installing a recipe app? You can grant it read access to your food-related Hash entries. 
                    Now the app knows your dietary restrictions, flavor preferences, and skill level without you explaining anything.
                  </p>

                  <div className="callout-box-neutral my-10">
                    <h4 className="text-lg font-bold mb-4">Example: The Compound Effect</h4>
                    <p className="mb-4">
                      Maria journals in Hash about her startup for six months. Every meeting note, every strategic decision, 
                      every lesson learned goes into Hash. After six months:
                    </p>
                    <ul className="space-y-2">
                      <li>• Semi knows her business model, competitive landscape, and team dynamics</li>
                      <li>• Semi remembers which investors she's already pitched and what feedback she received</li>
                      <li>• Semi understands her communication style and can draft emails in her voice</li>
                      <li>• When she asks for advice, Semi's recommendations account for her specific context</li>
                      <li>• Six months of compounded understanding vs. starting from scratch every time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part IV: Who Hash Is For */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-green-600 font-semibold tracking-wide uppercase">Part IV</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    Who Benefits Most from Hash?
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Hash is for anyone tired of repeating themselves to AI—but some use cases show particularly dramatic benefits:
                  </p>

                  <div className="grid gap-8 my-10">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Knowledge Workers</h4>
                      <p className="text-gray-700">
                        You process enormous amounts of information daily. Meetings, emails, documents, decisions. Hash becomes 
                        your external brain—capturing everything, synthesizing it into understanding, and surfacing relevant 
                        context exactly when you need it. Never lose a good idea again.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Memory Capturers & Family Historians</h4>
                      <p className="text-gray-700">
                        You're preserving memories—family stories, life experiences, accumulated wisdom. Hash ensures nothing 
                        is lost. More importantly, it makes those memories accessible and shareable. Your grandchildren could 
                        one day have conversations informed by your life's accumulated understanding.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Creators & Writers</h4>
                      <p className="text-gray-700">
                        Your voice matters. Hash captures not just what you write but how you write it—your style, your 
                        vocabulary, your rhythm. When you need help with content, Semi can write in your authentic voice 
                        because Hash has taught her who you are as a communicator.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Future Pipe Creators</h4>
                      <p className="text-gray-700">
                        Your Hash entries are the raw material for Pipes. If you're considering becoming a curator in the 
                        Curator Economy, Hash is where your expertise gets captured and structured. Start building your 
                        knowledge base today; convert it to monetizable Pipes when you're ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part V: The Ecosystem Connection */}
          <section className="py-16 lg:py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-green-400 font-semibold tracking-wide uppercase">Part V</p>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                    Hash in the Curator Economy
                  </h2>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Hash isn't a standalone product—it's the foundation of everything else in the CHB ecosystem. Here's how 
                    the pieces connect:
                  </p>

                  <div className="space-y-8 my-10">
                    <div className="bg-white/5 rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <ArrowRight className="h-6 w-6 text-green-400" />
                        <h4 className="text-xl font-bold text-white">Hash → Semi</h4>
                      </div>
                      <p className="text-gray-300">
                        Semi reads from Hash to personalize every interaction. The more you journal in Hash, the more Semi 
                        understands you. This is why "she doesn't forget"—because Hash remembers everything.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <ArrowRight className="h-6 w-6 text-brand-pink" />
                        <h4 className="text-xl font-bold text-white">Hash → Pipes</h4>
                      </div>
                      <p className="text-gray-300">
                        Your Hash entries reveal what you know deeply. When you're ready to become a curator, Semi helps you 
                        transform your accumulated Hash knowledge into structured, monetizable Pipes. Your private journal 
                        becomes public expertise—selectively, under your control.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-400 pl-6 my-10">
                    <p className="text-xl text-white italic">
                      "Start with Hash. Capture everything. The value will compound—first in better AI interactions, 
                      eventually in expertise you can monetize through Pipes."
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-10">The Bottom Line</h3>
                  <p className="text-gray-300 leading-relaxed">
                    AI amnesia is a choice made by companies that don't prioritize your experience. Hash represents a different 
                    choice: that your context is valuable, that your time deserves respect, and that your accumulated knowledge 
                    should compound rather than evaporate. Start building your memory today.
                  </p>

                  <p className="text-xl text-green-400 font-bold mt-10">
                    She doesn't forget. Not because of magic—because of Hash. :-]
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
                <Card className="border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">The Solution</p>
                    <p className="text-lg text-gray-900 leading-relaxed">{problemSolution.solution}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* One-Liner Banner */}
          <section className="py-12 bg-green-600">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <p className="text-2xl lg:text-3xl font-bold text-white">
                Your private AI memory journal that never forgets.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  What Makes Hash Different
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center space-y-4" data-testid={`feature-${index}`}>
                    <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center mx-auto">
                      <feature.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Workflows */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  Key Workflows
                </h2>
                <p className="text-lg text-gray-700">How people actually use Hash</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {workflows.map((workflow, index) => (
                  <Card key={index} className="border-2 hover:border-green-500/30 transition-colors" data-testid={`workflow-${index}`}>
                    <CardContent className="p-8 space-y-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{workflow.title}</h3>
                      <p className="text-gray-700">{workflow.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Ecosystem Synergy */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-green-500/5 to-purple-500/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  How Hash Connects
                </h2>
                <p className="text-lg text-gray-700">Your Hash entries power the entire ecosystem</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="border-2 border-purple-500/30">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">#</span>
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-700" />
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">;</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{synergy.semiConnection.title}</h3>
                    <p className="text-gray-700">{synergy.semiConnection.description}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-brand-pink/30">
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
                    <h3 className="text-xl font-bold text-gray-900">{synergy.pipesConnection.title}</h3>
                    <p className="text-gray-700">{synergy.pipesConnection.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* :-] Moments */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
                  :-] Moments
                </h2>
                <p className="text-lg text-gray-700">The magic that makes you smile</p>
              </div>

              <div className="space-y-6">
                {[
                  "The first time Semi references a private journal entry perfectly in context",
                  "Reviewing your own writing from a year ago and seeing how you've grown",
                  "Realizing Hash remembered something you forgot you knew",
                  "Sharing a curated collection of memories with someone who matters"
                ].map((moment, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-xl p-6" data-testid={`moment-${index}`}>
                    <span className="text-3xl">:-]</span>
                    <p className="text-lg text-gray-900">{moment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-green-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
            Start building your memory
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Every entry makes Semi smarter. Every thought preserved is a thought you'll never lose again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://hash.pink" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="group" data-testid="cta-final-hash">
                Try Hash Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link href="/products/semi">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
                Learn About Semi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
