import { TrendingUp, Zap, Target, Brain, DollarSign, Users, Shield, BarChart3 } from "lucide-react";

export default function StartupFoundersDeepDive() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-32 founders-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold font-serif leading-tight founders-heading">
                Stop Competing on Speed. Start Competing on Strategy.
              </h1>
              
              <p className="text-2xl founders-body leading-relaxed">
                While your competitors rush to ship features, :-] helps you build deeper market insights, 
                strategic advantages, and sustainable competitive moats that matter.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-3xl blur-xl"></div>
                <img 
                  src="/attached_assets/generated_images/Construction_building_game_concept_106844b2.png" 
                  alt="Strategic business planning visualization"
                  className="relative w-96 h-auto rounded-2xl shadow-2xl border-2 border-orange-200/60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6">The Strategic Intelligence Gap</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Most AI tools treat founders like code monkeys. They optimize for shipping features fast, 
              not building lasting competitive advantages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Zap className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Speed Over Strategy</h3>
              <p className="text-muted-foreground">
                AI coding assistants help you ship faster, but they can't help you build smarter. 
                You end up with technical debt and features nobody wants.
              </p>
            </div>

            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Target className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Generic Market Insights</h3>
              <p className="text-muted-foreground">
                ChatGPT gives you the same market research everyone else gets. No competitive advantage, 
                no unique perspectives, no proprietary insights.
              </p>
            </div>

            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Brain className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Shallow Business Intelligence</h3>
              <p className="text-muted-foreground">
                Most AI can't connect dots across your entire business. It sees individual features, 
                not strategic ecosystems or long-term competitive positioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The CHB Advantage */}
      <section className="py-32 founders-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6 founders-heading">How :-] Builds Strategic Advantage</h2>
            <p className="text-xl founders-body max-w-4xl mx-auto">
              :-] isn't just another AI tool. We're a strategic intelligence platform that helps 
              founders think deeper, move smarter, and build sustainable competitive moats.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold mb-8 founders-heading">Persistent Strategic Memory</h3>
              <div className="space-y-6 founders-body text-lg">
                <p>
                  Unlike ChatGPT that forgets your previous conversations, :-] builds a persistent 
                  understanding of your business, market position, and strategic goals across every interaction.
                </p>
                <p>
                  Our AI remembers your customer interviews from six months ago, connects them to today's 
                  feature discussions, and spots patterns you'd miss. It's like having a strategic advisor 
                  who never forgets and always sees the big picture.
                </p>
              </div>
            </div>
            
            <div className="bg-card founders-border rounded-2xl p-8">
              <h4 className="text-2xl font-bold mb-6 founders-heading">Strategic Intelligence Capabilities</h4>
              <div className="space-y-4 founders-body">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <p>Cross-conversation pattern recognition</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <p>Competitive positioning analysis</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <p>Market opportunity synthesis</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <p>Strategic roadmap optimization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Ecosystem for Founders */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-card founders-border rounded-2xl p-8">
              <BarChart3 className="w-16 h-16 text-orange-600 mb-6" />
              <h4 className="text-3xl font-bold mb-6 founders-heading">Scout: Pattern Recognition at Scale</h4>
              <div className="space-y-4 founders-body">
                <p>
                  Scout analyzes thousands of data points across your industry, customers, and competitors 
                  to surface insights you'd never find manually. It's like having a team of business 
                  analysts working 24/7 to spot opportunities.
                </p>
                <p>
                  From identifying underserved market segments to predicting competitor moves, Scout gives 
                  you the strategic intelligence that separates market leaders from followers.
                </p>
              </div>
            </div>

            <div className="bg-card founders-border rounded-2xl p-8">
              <DollarSign className="w-16 h-16 text-orange-600 mb-6" />
              <h4 className="text-3xl font-bold mb-6 founders-heading">Workshop: Strategic Project Intelligence</h4>
              <div className="space-y-4 founders-body">
                <p>
                  Workshop doesn't just help you build faster - it helps you build smarter. Every project 
                  decision is evaluated against your broader strategic goals and competitive positioning.
                </p>
                <p>
                  Instead of shipping random features, Workshop ensures every sprint moves you closer to 
                  sustainable competitive advantages and market dominance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className="py-32 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6">Why :-] vs. The Competition</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Most AI platforms optimize for individual productivity. :-] optimizes for strategic business outcomes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-card border border-border rounded-2xl overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-6 text-lg font-bold">Capability</th>
                  <th className="text-center p-6 text-lg font-bold text-orange-600">:-] Platform</th>
                  <th className="text-center p-6 text-lg font-bold text-muted-foreground">ChatGPT/Claude</th>
                  <th className="text-center p-6 text-lg font-bold text-muted-foreground">GitHub Copilot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-6 font-medium">Persistent Strategic Memory</td>
                  <td className="p-6 text-center text-green-600 font-bold">✓ Full Business Context</td>
                  <td className="p-6 text-center text-red-500">✗ Resets Every Session</td>
                  <td className="p-6 text-center text-red-500">✗ Code Only</td>
                </tr>
                <tr className="border-t border-border bg-muted/30">
                  <td className="p-6 font-medium">Cross-Project Intelligence</td>
                  <td className="p-6 text-center text-green-600 font-bold">✓ Ecosystem Thinking</td>
                  <td className="p-6 text-center text-red-500">✗ Isolated Conversations</td>
                  <td className="p-6 text-center text-red-500">✗ Individual Files</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-6 font-medium">Market Intelligence</td>
                  <td className="p-6 text-center text-green-600 font-bold">✓ Strategic Analysis</td>
                  <td className="p-6 text-center text-yellow-500">△ Generic Research</td>
                  <td className="p-6 text-center text-red-500">✗ No Business Context</td>
                </tr>
                <tr className="border-t border-border bg-muted/30">
                  <td className="p-6 font-medium">Competitive Positioning</td>
                  <td className="p-6 text-center text-green-600 font-bold">✓ Strategic Moats</td>
                  <td className="p-6 text-center text-red-500">✗ Surface Level</td>
                  <td className="p-6 text-center text-red-500">✗ Not Available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How CHB Helps Founders */}
      <section className="py-32 founders-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6 founders-heading">How CHB Serves Founders</h2>
            <p className="text-xl founders-body max-w-4xl mx-auto">
              Practical ways founders can leverage CHB for ideation, context preservation, and avoiding the AI tax.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <TrendingUp className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Ideation & Context Preservation</h3>
              <p className="text-muted-foreground mb-4">
                Use Hash to capture and connect ideas across time. Instead of losing context between meetings 
                and conversations, build persistent memory that helps you spot patterns and opportunities 
                that others miss.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Workshop: Avoiding the AI Tax</h3>
              <p className="text-muted-foreground mb-4">
                Workshop enforces best practices and prevents the 40-60% time waste from re-explaining 
                context to disconnected AI tools. Get consistent, high-quality assistance without 
                constant clarification loops.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Replit-Compatible Building</h3>
              <p className="text-muted-foreground mb-4">
                All CHB tools are designed for Replit compatibility, meeting founders where they are. 
                Non-technical founders can build better tools, while technical founders get enhanced 
                productivity and cleaner code output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold font-serif mb-8">
            Stop Building Features. Start Building Advantages.
          </h2>
          
          <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
            Join the founders who've discovered what AI feels like when it's built for strategic thinking, 
            not just tactical execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            <a
              href="https://hash.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="strategic-intelligence-button"
            >
              Try Hash
            </a>
            <a
              href="/contact"
              className="px-10 py-4 border-2 border-orange-600 text-orange-700 rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="discuss-strategy-button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}