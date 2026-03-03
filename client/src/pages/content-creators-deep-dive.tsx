import { Palette, Mic, Camera, Sparkles, Heart, Lightbulb, Users, Play } from "lucide-react";

export default function ContentCreatorsDeepDive() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-32 creators-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold font-serif leading-tight creators-heading">
                AI That Amplifies Your Voice, Never Replaces It
              </h1>
              
              <p className="text-2xl creators-body leading-relaxed">
                While others build AI to replace creators, :-] builds AI to amplify authentic voices, 
                enhance creative vision, and help artists express what only they can express.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-3xl blur-xl"></div>
                <img 
                  src="/attached_assets/generated_images/Creative_artistic_workspace_c143976e.png" 
                  alt="Creative workspace with artistic inspiration"
                  className="relative w-96 h-auto rounded-2xl shadow-2xl border-2 border-purple-200/60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Creative Crisis Section */}
      <section className="py-32 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6">The Creator Replacement Crisis</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              The AI industry is trying to automate creativity. They see artists as inefficiencies to be 
              optimized away, not unique voices to be amplified.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Mic className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Generic Content Machines</h3>
              <p className="text-muted-foreground">
                AI tools generate the same bland, soulless content for everyone. No personality, 
                no unique perspective, no authentic voice - just algorithmic mediocrity.
              </p>
            </div>

            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Camera className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Race to the Bottom</h3>
              <p className="text-muted-foreground">
                When everyone uses the same AI, all content becomes indistinguishable. Creators lose 
                their competitive edge and authentic connection with audiences.
              </p>
            </div>

            <div className="bg-card border-2 border-red-200/60 rounded-2xl p-8 text-center">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-700">Lost Humanity</h3>
              <p className="text-muted-foreground">
                AI content lacks the human experiences, struggles, and insights that make content 
                meaningful. Audiences crave authenticity, not artificial efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The CHB Philosophy */}
      <section className="py-32 creators-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6 creators-heading">Our Creative Philosophy</h2>
            <p className="text-xl creators-body max-w-4xl mx-auto">
              :-] believes the best content comes from amplifying human creativity, not replacing it. 
              We build AI that enhances your unique voice and helps you express what only you can express.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold mb-8 creators-heading">AI as Creative Partner</h3>
              <div className="space-y-6 creators-body text-lg">
                <p>
                  Think of :-] as your creative co-pilot, not your replacement. Our AI learns your style, 
                  understands your voice, and helps you overcome creative blocks while preserving what 
                  makes your content uniquely yours.
                </p>
                <p>
                  Whether you're a podcaster struggling with show notes, a writer facing blank page syndrome, 
                  or a video creator looking for fresh angles, :-] amplifies your creativity without diluting 
                  your authenticity.
                </p>
              </div>
            </div>
            
            <div className="bg-card creators-border rounded-2xl p-8">
              <h4 className="text-2xl font-bold mb-6 creators-heading">Creative Amplification Principles</h4>
              <div className="space-y-4 creators-body">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <p>Enhance, never replace human creativity</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <p>Learn and adapt to your unique voice</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <p>Preserve authentic human connection</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <p>Support sustainable creative careers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Creator Tools Ecosystem */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-card creators-border rounded-2xl p-8">
              <Palette className="w-16 h-16 text-purple-600 mb-6" />
              <h4 className="text-3xl font-bold mb-6 creators-heading">Hash: Your Creative Memory Bank</h4>
              <div className="space-y-4 creators-body">
                <p>
                  Hash captures your creative process, inspiration, and ideas over time. Unlike generic note-taking 
                  apps, Hash understands your creative patterns and helps you build on past insights.
                </p>
                <p>
                  Track inspiration sources, develop recurring themes, and never lose a great idea again. 
                  Hash becomes your personalized creative intelligence that grows with your artistic journey.
                </p>
              </div>
            </div>

            <div className="bg-card creators-border rounded-2xl p-8">
              <Sparkles className="w-16 h-16 text-purple-600 mb-6" />
              <h4 className="text-3xl font-bold mb-6 creators-heading">Semi: Your Creative Writing Partner</h4>
              <div className="space-y-4 creators-body">
                <p>
                  Semi doesn't write for you - it writes with you. Our AI learns your voice, style, and 
                  creative goals to provide suggestions that sound like you, not like a generic AI.
                </p>
                <p>
                  From blog posts to social media content, scripts to newsletters, Semi helps you overcome 
                  creative blocks while maintaining your authentic voice and unique perspective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Format Support */}
      <section className="py-32 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6">Every Creative Format, Amplified</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Whether you create written content, audio, video, or visual art, :-] adapts to your medium 
              and enhances your creative process.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300">
              <Mic className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Podcasters</h3>
              <p className="text-muted-foreground text-sm">
                Generate show outlines, improve interview questions, and create compelling show notes that 
                capture your unique interviewing style.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300">
              <Play className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Video Creators</h3>
              <p className="text-muted-foreground text-sm">
                Develop video concepts, write scripts that match your on-camera personality, and create 
                thumbnails and titles that stay true to your brand.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300">
              <Lightbulb className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Writers</h3>
              <p className="text-muted-foreground text-sm">
                Overcome writer's block, develop ideas that align with your voice, and maintain consistency 
                across all your written content.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300">
              <Users className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Community Builders</h3>
              <p className="text-muted-foreground text-sm">
                Create engaging community content, moderate discussions thoughtfully, and build authentic 
                connections with your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How CHB Serves Creators */}
      <section className="py-32 creators-section">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6 creators-heading">How CHB Serves Creators</h2>
            <p className="text-xl creators-body max-w-4xl mx-auto">
              Practical ways creators can use CHB to amplify their authentic voice while building 
              sustainable creative careers through our cooperative model.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <Mic className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Podcast & Audio Content</h3>
              <p className="text-muted-foreground mb-4">
                Use Semi to develop your interviewing style, create show outlines that match your voice, 
                and generate episode descriptions that capture your unique perspective. Hash helps track 
                recurring themes and guest insights across episodes.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Camera className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Video & Visual Content</h3>
              <p className="text-muted-foreground mb-4">
                Build consistent video concepts while maintaining your authentic on-camera personality. 
                Hash tracks what resonates with your audience, helping you develop content series 
                that feel naturally aligned with your creative vision.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <Heart className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Revenue-Sharing Cooperative</h3>
              <p className="text-muted-foreground mb-4">
                CHB is a cooperative where creators who use our tools to create templates, courses, 
                or other products benefit from profit sharing as others use them. Build once, 
                earn continuously while helping other creators succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Anti-Replacement Promise */}
      <section className="py-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-serif mb-6">Our Promise to Creators</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We pledge never to build AI that replaces human creativity. Our success depends on your success.
            </p>
          </div>

          <div className="bg-card border-2 border-purple-200 rounded-3xl p-12 text-center">
            <Sparkles className="w-20 h-20 text-purple-600 mx-auto mb-8" />
            <h3 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300">The Creative Amplification Pledge</h3>
            <div className="space-y-4 text-lg text-muted-foreground max-w-4xl mx-auto">
              <p>
                "We will never build AI that creates content without human input, creativity, and oversight. 
                Our AI exists to amplify human voices, not replace them."
              </p>
              <p>
                "We will always require human creativity, decision-making, and personal input in the creative process. 
                AI suggestions must be chosen, modified, and approved by human creators."
              </p>
              <p>
                "We will never train our AI on creator content without explicit permission, and we will never 
                sell creator insights or patterns to competitors or advertisers."
              </p>
            </div>
            <p className="text-sm text-purple-600 font-semibold mt-8">— The :-] Team</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 creators-section">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold font-serif mb-8 creators-heading">
            Amplify Your Voice, Don't Replace It
          </h2>
          
          <p className="text-2xl creators-body mb-12 leading-relaxed">
            Join creators who've discovered what AI feels like when it's built to enhance human creativity, 
            not automate it away.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            <a
              href="https://hash.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="amplify-creativity-button"
            >
              Try Hash
            </a>
            <a
              href="/contact"
              className="px-10 py-4 border-2 border-purple-600 text-purple-700 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="join-creators-button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}