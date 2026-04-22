import { Heart, Shield, Users, BookOpen, Camera, MessageCircle } from "lucide-react";

export default function MemoryCapturersDeepDive() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-32 farmhouse-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold font-serif leading-tight farmhouse-heading">
                Technology That Honors Your Family's Story
              </h1>
              
              <p className="text-2xl farmhouse-body leading-relaxed">
                In a world where Big Tech treats your memories as data to be mined, :-] builds AI that 
                preserves what truly matters—on your terms, with the privacy your family deserves.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-3xl blur-xl"></div>
                <img 
                  src="/generated/images/Family_sharing_memories_on_porch_e4f89057.png" 
                  alt="Multi-generational family actively sharing memories and stories on farmhouse porch"
                  className="relative w-96 h-auto rounded-2xl shadow-2xl border-2 border-amber-200/60"
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
            <h2 className="text-5xl font-bold font-serif mb-6">The Problem With Modern Technology</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Today's AI companies see your family stories as training data. Your conversations, your photos, 
              your most precious memories become products to be sold to the highest bidder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Shield className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Your Privacy is Their Product</h3>
              <p className="text-muted-foreground">
                Big Tech AI reads your conversations, analyzes your photos, and sells insights about your 
                family to advertisers. Your intimate moments become corporate profit.
              </p>
            </div>

            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">One-Size-Fits-All Values</h3>
              <p className="text-muted-foreground">
                Mainstream AI is tuned for the median user and flattens what makes your family unique. 
                It's designed by people who don't know your story and don't ask.
              </p>
            </div>

            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <MessageCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Loneliness by Design</h3>
              <p className="text-muted-foreground">
                Tech companies profit from isolation. They want you scrolling alone, not building 
                real connections with family and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The CHB Solution */}
      <section className="py-32 farmhouse-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6 farmhouse-heading">The :-] Difference</h2>
            <p className="text-xl farmhouse-body max-w-4xl mx-auto">
              :-] isn't just another tech company. We build AI that serves families—not shareholders—and 
              respects the values you actually hold instead of the ones an algorithm assumes you do.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold mb-8 farmhouse-heading">Constitutional AI Governance</h3>
              <div className="space-y-6 farmhouse-body text-lg">
                <p>
                  :-] AI operates under constitutional principles that protect your values. Our AI can't be 
                  reprogrammed to push agendas or mine your data because it's built with constitutional 
                  safeguards that are unchangeable.
                </p>
                <p>
                  Think of it like the Bill of Rights for artificial intelligence. Your privacy, your values, 
                  and your family's autonomy are protected by design, not corporate policy.
                </p>
              </div>
            </div>
            
            <div className="bg-card farmhouse-border rounded-2xl p-8">
              <h4 className="text-2xl font-bold mb-6 farmhouse-heading">Our Constitutional Principles</h4>
              <div className="space-y-4 farmhouse-body">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <p>Human agency and decision-making primacy</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <p>Privacy and data sovereignty</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <p>Transparent, auditable AI systems</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <p>Value alignment and constitutional governance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products that Serve Families */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-card farmhouse-border rounded-2xl p-8">
              <Heart className="w-16 h-16 text-amber-600 mb-6" />
              <h4 className="text-3xl font-bold mb-6 farmhouse-heading">Hash: Your Family's Digital Legacy</h4>
              <div className="space-y-4 farmhouse-body">
                <p>
                  Hash helps you capture and organize your family's stories, wisdom, and memories. 
                  Unlike social media that disappears or gets censored, Hash preserves your legacy forever.
                </p>
                <p>
                  From grandparents sharing life lessons to parents documenting their children's growth, 
                  Hash ensures your family's story is never lost or exploited.
                </p>
              </div>
            </div>

            <div className="bg-card farmhouse-border rounded-2xl p-8">
              <BookOpen className="w-16 h-16 text-amber-600 mb-6" />
              <h4 className="text-3xl font-bold mb-6 farmhouse-heading">Semi: AI That Respects Your Values</h4>
              <div className="space-y-4 farmhouse-body">
                <p>
                  Semi is an AI writing partner that learns who you are and what matters to you—rather 
                  than nudging you toward someone else's defaults. You set the tone; she follows your lead.
                </p>
                <p>
                  Need help with a family newsletter? Planning an event? Drafting a tribute? Semi gives 
                  you thoughtful assistance that sounds like you—not like everyone else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How CHB Helps Families */}
      <section className="py-32 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6">How CHB Serves Families</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Practical ways families can use our tools to preserve values, strengthen connections, 
              and create lasting legacies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <Camera className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Family Rituals & Celebrations</h3>
              <p className="text-muted-foreground mb-4">
                Use Semi to organize the conversations and traditions that bring your family together—from 
                weekly check-ins to holiday gatherings—with discussion prompts and planning help that 
                reflect what your family actually cares about.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Personalized Learning Support</h3>
              <p className="text-muted-foreground mb-4">
                Semi helps you build learning materials that reflect your perspective and your child's 
                pace. You decide what to emphasize and how to teach it; Semi supports the work without 
                imposing a hidden agenda.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Heart className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Legacy & Memory Preservation</h3>
              <p className="text-muted-foreground mb-4">
                Hash helps you document family stories, preserve elder wisdom, and create digital archives 
                of your family's journey. Capture oral histories, organize family photos, and pass what 
                matters most to the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 farmhouse-section">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold font-serif mb-8 farmhouse-heading">
            Join Families Who Put Their Story First
          </h2>
          
          <p className="text-2xl farmhouse-body mb-12 leading-relaxed">
            You don't have to settle for technology that flattens what makes your family yours. :-] is 
            building AI that honors your story, respects your privacy, and preserves what truly matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            <a
              href="https://hash.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="try-hash-button"
            >
              Start with Hash
            </a>
            <a
              href="/contact"
              className="px-10 py-4 border-2 border-amber-600 text-amber-700 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="learn-more-button"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}