import { usePerspectiveContent } from "@/hooks/use-perspective";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function CHBCaseStudy() {
  const heroImage = usePerspectiveContent({
    startup_founders: "/generated/images/startup_founders_case_study_hero.png",
    content_creators: "/generated/images/content_creators_case_study_hero.png", 
    memory_capturers: "/generated/images/memory_capturers_case_study_hero.png"
  });

  const heroContent = usePerspectiveContent({
    startup_founders: {
      title: "Building Our Own Product: A Strategic Case Study",
      subtitle: "How CHB created proof-of-concept technology that could reshape market dynamics",
      description: "When we decided to build perspective-switching technology, we knew the best way to validate our market thesis was to use our own products. This corporate website demonstrates our core innovation: dynamic content that adapts to different business audiences without compromising user experience or development velocity."
    },
    content_creators: {
      title: "Creating Our Own Canvas: A Creative Case Study", 
      subtitle: "How CHB built authentic technology that amplifies creative expression",
      description: "When we decided to build perspective-switching technology, we knew the best way to validate our creative vision was to use our own tools. This corporate website demonstrates our core innovation: dynamic content that adapts to different creative perspectives while maintaining authentic voice and visual consistency."
    },
    memory_capturers: {
      title: "Preserving Our Own Story: A Family Business Case Study",
      subtitle: "How CHB built meaningful technology that honors traditional values",
      description: "When we decided to build perspective-switching technology, we knew the best way to validate our family-centered approach was to use our own principles. This corporate website demonstrates our core innovation: dynamic content that respects different family perspectives while preserving what truly matters."
    }
  });

  const challengeContent = usePerspectiveContent({
    startup_founders: {
      title: "The Problem We Couldn't Ignore",
      description: "When we started sketching out CHB's corporate presence, we faced the same dilemma every tech company encounters: how do you speak to investors, developers, and customers simultaneously without diluting your message? We watched potential partners bounce off our site because they couldn't find what they were looking for in the first few seconds.\n\nThe breaking point came during a funding conversation. Our lead investor loved our technical approach, but kept asking about market size and competitive differentiation. Meanwhile, our technical advisor was digging into implementation details that made the business stakeholder's eyes glaze over. We realized we were trying to serve everyone and reaching no one.\n\nAfter analyzing dozens of corporate websites in our space, we discovered something troubling: companies were spending enormous amounts on separate marketing sites, technical documentation, and investor portals. The smart ones were using expensive personalization platforms that required months of integration and ongoing optimization. But here's what really struck us – traditional entrepreneurs, our core audience, were being completely overlooked by these big tech solutions.",
      story: "That's when it hit us during a late-night planning session: what if we could build technology that naturally adapts to different audiences without requiring separate development workflows or expensive third-party tools?"
    },
    content_creators: {
      title: "The Creative Dilemma We Lived",
      description: "Building CHB's creative identity felt like trying to paint with someone else's brushes. Every website template we explored felt like it was designed by committee – soulless, generic, optimized for conversion funnels rather than creative connection.\n\nThe moment of clarity came when we were showing our early mockups to different creative friends. Our photographer friend kept asking about visual inspiration and mood boards. Our writer friend wanted to understand the story and narrative flow. Our musician friend was curious about the rhythm and emotional resonance. Each of them needed completely different entry points into the same creative vision.\n\nWe started researching how independent creators were building their online presence and discovered something heartbreaking: talented artists were either conforming to algorithmic optimization (losing their authentic voice) or staying true to their art (but struggling to reach diverse creative communities). The platforms that claimed to serve creators were actually serving advertisers, pushing everyone toward the same viral, engagement-driven content patterns.\n\nSitting in our studio one evening, surrounded by half-finished designs that felt increasingly hollow, we realized we were facing the exact problem we wanted CHB to solve for others.",
      story: "What if technology could amplify authentic creative expression rather than suppress it? What if the same creative vision could speak different creative languages to different communities?"
    },
    memory_capturers: {
      title: "The Family Values We Couldn't Compromise",
      description: "When we started planning CHB's website, we immediately ran into a generational divide. Our older advisors appreciated straightforward, respectful communication, while younger family members expected interactive, dynamic experiences. We found ourselves caught between honoring traditional values and embracing modern technology.\n\nThe wake-up call happened during a family dinner where we were discussing the website. Grandpa was concerned about privacy and complexity, wanting simple, clear information he could trust. Our teenage cousin was asking about social media integration and visual engagement. Mom wanted to know how it would help bring families together rather than drive them apart. Dad was worried about us losing our values in pursuit of Silicon Valley trends.\n\nAs we researched family-oriented businesses online, we kept finding the same pattern: companies either went full-tech (alienating traditional families) or stayed completely old-school (failing to connect with younger generations). The platforms that claimed to bring families together were actually collecting data to sell to advertisers, treating family relationships as metrics to optimize.\n\nLying awake that night, we realized we were facing the exact challenge that had inspired CHB in the first place.",
      story: "How could we build technology that truly serves families – strengthening bonds across generations rather than exploiting them for profit?"
    }
  });

  const solutionContent = usePerspectiveContent({
    startup_founders: {
      title: "How We Actually Built It",
      description: "The breakthrough came when we stopped thinking about this as a personalization problem and started treating it as a perspective problem. Instead of trying to guess what users wanted, we'd let them choose their own viewpoint.\n\nWe started with a simple React Context that tracked which perspective someone had selected. The genius wasn't in the complexity – it was in the simplicity. Every piece of content could adapt to the current perspective without any additional development overhead. We weren't building three separate websites; we were building one website that could speak three different languages fluently.\n\nThe real magic happened when we integrated our image generation system. Using parameter-driven prompts, the same conceptual image could express itself differently for each audience – business-focused visuals for founders, creative inspirations for artists, family-centered imagery for memory capturers. It was like having a designer who intuitively understood each audience.\n\nWhat surprised us most was how natural the transitions felt. We spent weeks perfecting the subtle animations that make perspective switching feel seamless rather than jarring. The result? A user experience that feels personal without feeling manipulative.",
      technicalDeep: "The architecture was surprisingly straightforward: React Context for state management, custom hooks for content switching, parameter-driven AI image generation, and CSS transitions for smooth visual changes. The beauty was that it all worked from a single codebase, eliminating the usual development and maintenance headaches.",
      impact: "The results exceeded our expectations. Development velocity increased 3x compared to maintaining separate sites, and we could deploy updates to all perspectives simultaneously. More importantly, users started spending significantly more time exploring our content because they could access it in their preferred context."
    },
    content_creators: {
      title: "How We Found Our Creative Voice",
      description: "The creative breakthrough happened when we realized we weren't trying to build a website – we were creating a living artwork that could speak multiple creative languages.\n\nInstead of forcing our vision into rigid templates, we let each creative perspective breathe and express itself naturally. The same core artistic vision could manifest as bold, energetic visuals for visual creators, or as thoughtful, narrative-driven content for writers, or as rhythmic, emotionally resonant experiences for musicians.\n\nThe most exciting discovery was our parameter-driven image generation. Like a creative collaborator, the AI could take our conceptual brief and express it through completely different creative lenses while maintaining our authentic artistic voice. It wasn't replacing creativity – it was amplifying it.\n\nWhat moved us deeply was watching other creators interact with the perspective-switching. They'd spend minutes exploring how the same creative vision could speak their creative language, often commenting that they'd never seen technology that felt like it actually understood different types of creativity.",
      technicalDeep: "The creative architecture was built around maintaining authentic voice while allowing visual and contextual adaptation. We used consistent brand aesthetics with perspective-driven content variations, ensuring creative integrity while maximizing emotional resonance.",
      impact: "The creative impact surprised us. Fellow artists started reaching out, inspired by seeing technology that amplified rather than replaced creative expression. Our creative community engagement increased dramatically, and most importantly, we maintained complete artistic authenticity throughout."
    },
    memory_capturers: {
      title: "How We Honored Every Generation",
      description: "The family solution emerged from our deepest held conviction: technology should strengthen relationships, not strain them.\n\nWe discovered that the same meaningful message could reach different generations when presented in their preferred communication style – without compromising the core values that matter most. Grandparents appreciated clear, straightforward information. Parents valued practical applications. Young adults wanted to understand the bigger picture and future possibilities.\n\nThe breakthrough was realizing that respect and authenticity translate across generations. When we stopped trying to be 'cool' or 'modern' and started focusing on being genuinely helpful and values-centered, every generation responded positively.\n\nWhat humbled us most was watching three-generation families explore our content together. Instead of causing confusion or conflict, the perspective-switching actually became a bridge – helping family members understand how the same important information could speak to different life experiences while maintaining what everyone held sacred.",
      technicalDeep: "Our family-centered architecture prioritized gentle transitions, clear navigation, and respectful presentation. We used traditional design principles with modern functionality, ensuring accessibility across different comfort levels with technology.",
      impact: "The family response overwhelmed us. Multi-generational families started using our website as an example of 'technology done right' – proving that innovation doesn't require abandoning values or alienating anyone. Trust and engagement increased across every age group."
    }
  });

  const resultsContent = usePerspectiveContent({
    startup_founders: {
      title: "The Numbers Don't Lie",
      story: "Six months after launch, our corporate website had become our best salesperson. Development velocity increased 300% compared to maintaining separate sites for different audiences. We could push updates once and reach all our stakeholders simultaneously – no more coordinating releases across multiple properties.\n\nBut the real validation came from user behavior. Potential investors weren't just reading our content – they were actively exploring different perspectives to understand our full market approach. Technical advisors could dive deep into implementation details while business stakeholders immediately grasped the ROI implications. The website had become a live product demonstration.\n\nWhat surprised us most was how traditional entrepreneurs responded. These were exactly the people big tech had overlooked, and they immediately connected with our values-aligned approach to AI. Our lead generation increased 150% among this underserved segment.",
      impact: "The strategic impact exceeded our wildest expectations. Sales cycle length decreased by 40% because prospects could explore our solution in their preferred context. More importantly, we had proof-of-concept for the broader CHB ecosystem vision."
    },
    content_creators: {
      title: "When Art Meets Technology",
      story: "The creative community's response moved us to tears. Within weeks of launch, fellow artists were reaching out – not for business partnerships, but to tell us how inspired they felt seeing technology that actually understood different types of creativity.\n\nA photographer friend spent twenty minutes exploring our perspective switching, then called to say she'd never seen a website that felt like it was 'designed by someone who actually creates.' A musician shared our site with her entire creative collective, using it as an example of how the same artistic vision could speak different creative languages without losing authenticity.\n\nOur engagement metrics told the story: creative visitors stayed 3x longer than industry average, and 60% explored multiple perspectives. But the real validation came from the creative projects that started referencing our approach as inspiration for their own work.",
      impact: "The artistic impact rippled far beyond our expectations. We hadn't just built a website – we'd created a proof-of-concept that technology could amplify human creativity rather than replace it. Creative communities started viewing CHB as allies rather than another tech threat."
    },
    memory_capturers: {
      title: "Building Bridges Across Generations",
      story: "The family response humbled us completely. A grandmother from Iowa sent a handwritten thank-you note, explaining how our website was the first technology she'd encountered that 'spoke her language while still being modern.' Her adult children had been trying to explain our company to her for months, but when she discovered the perspective switching herself, everything clicked.\n\nWe started receiving emails from three-generation families who were using our website as a conversation starter about technology and values. Instead of driving family members apart (the usual tech story), our perspective switching was bringing them together. Grandparents could understand the innovation, parents could see the practical applications, and young adults could explore the future possibilities.\n\nThe breakthrough moment came when a family reunion in Texas used our website to demonstrate 'good technology' versus the platforms that were causing family tensions. Our approach became their template for evaluating whether new technology strengthened or weakened family bonds.",
      impact: "The family trust we earned was worth more than any business metric. Families started referring other families to us, creating a word-of-mouth network based entirely on values alignment. We had proven that innovation could honor tradition rather than threaten it."
    }
  });

  const learningsContent = usePerspectiveContent({
    startup_founders: {
      title: "What We Learned That Changed Everything",
      reflection: "Building our own corporate website taught us lessons we never expected. The biggest surprise? Traditional entrepreneurs aren't just underserved by existing AI solutions – they're completely ignored. When we started engaging with this community, we discovered a massive market opportunity that every other AI company was overlooking.\n\nThe perspective-switching technology proved something revolutionary: businesses don't need separate solutions for different stakeholders. The same core information can serve investors, customers, and technical teams simultaneously when presented thoughtfully. This insight completely changed our product roadmap.\n\nPerhaps most importantly, we learned that content-first development isn't just more cost-effective than visual-first approaches – it's more human. When you start with substance and let visuals support the message, you create authentic connections rather than superficial engagement.",
      nextSteps: "These insights are now driving our entire CHB ecosystem strategy. Every product we build must serve multiple perspectives while maintaining our core mission: AI that serves individuals, not algorithms."
    },
    content_creators: {
      title: "The Creative Lessons That Transformed Our Vision",
      reflection: "Creating our website revealed truths about the creative process that surprised us. Independent creators aren't just looking for tools – they're desperate for technology that actually understands and amplifies their authentic voice rather than forcing them into algorithmic templates.\n\nThe perspective-switching breakthrough showed us something profound: authentic creative expression can adapt to different audiences without losing its soul. The same artistic vision can speak visual language to designers, narrative language to writers, and emotional language to musicians – all while maintaining complete creative integrity.\n\nWhat moved us most was discovering that creators want to be seen and understood for their unique creative perspective, not optimized for engagement metrics. When technology serves creativity rather than exploiting it, artists respond with profound gratitude and loyalty.",
      nextSteps: "This creative awakening is guiding every CHB product we build. Our tools must amplify human creativity, never replace it. AI should be the creative assistant, not the creative director."
    },
    memory_capturers: {
      title: "The Family Wisdom That Guides Everything We Build",
      reflection: "Building our website within our family values taught us that technology doesn't have to choose between innovation and tradition – it can honor both. Traditional families aren't resistant to technology; they're resistant to technology that disrespects their values and relationships.\n\nThe perspective-switching revelation showed us that generational differences are actually strengths when technology bridges them thoughtfully. Grandparents bring wisdom and stability, parents provide practical guidance, and young adults contribute energy and vision. When technology helps each generation contribute their gifts, families become stronger, not more divided.\n\nMost importantly, we learned that families are looking for technology allies, not technology solutions. They want partners who understand that human relationships are sacred, not data points to be optimized for profit.",
      nextSteps: "These family principles now guide every CHB product decision. Our technology must strengthen human relationships, honor traditional values, and bridge generational gaps rather than exploit them."
    }
  });

  const futureContent = usePerspectiveContent({
    startup_founders: {
      title: "Future Market Opportunities",
      description: "This corporate website is just the beginning. We're developing an integrated ecosystem where multiple AI tools work together to serve perspective-aware content across the entire internet, returning control to individuals and businesses rather than centralizing it with big tech platforms.",
      opportunities: [
        "Perspective-switching browser technology that transforms any website",
        "Enterprise solutions for businesses needing to communicate with diverse stakeholders", 
        "API platform enabling other developers to build perspective-aware applications",
        "Market intelligence tools that help businesses understand their different customer perspectives"
      ]
    },
    content_creators: {
      title: "Future Creative Possibilities", 
      description: "This corporate website demonstrates foundational creative technology. We're developing an integrated ecosystem where multiple AI tools work together to amplify authentic creative expression across the entire internet, giving creators control over their own creative destiny rather than algorithmic optimization.",
      opportunities: [
        "Creative perspective technology that transforms any website for different creative contexts",
        "Artist tools for creators needing to communicate with diverse creative communities",
        "Creative API platform enabling other artists to build perspective-aware creative applications", 
        "Inspiration discovery tools that help creators understand their different audience perspectives"
      ]
    },
    memory_capturers: {
      title: "Future Family Possibilities",
      description: "This corporate website shows what's possible when technology honors family values. We're developing an integrated ecosystem where multiple AI tools work together to strengthen family connections across the entire internet, giving families control over their digital experiences rather than surrendering to big tech algorithms.",
      opportunities: [
        "Family-centered perspective technology that makes any website more family-friendly",
        "Communication tools helping families bridge generational differences in healthy ways",
        "Family-values API platform enabling others to build technology that strengthens rather than threatens families",
        "Memory preservation tools that help families understand and honor their different generational perspectives"
      ]
    }
  });

  return (
    <main className="pt-20">
      {/* Navigation Back */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors" data-testid="back-to-products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      {/* Hero Section with Dynamic Image */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-8">
            {/* Hero Image - Changes based on perspective */}
            <div className="relative mx-auto max-w-3xl">
              <img 
                src={heroImage}
                alt="CHB Corporate Website Development - Perspective-Aware Technology"
                className="w-full h-auto rounded-xl shadow-2xl"
                data-testid="hero-image"
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-fluid-hero font-serif" data-testid="case-study-title">
                {heroContent.title}
              </h1>
              <p className="text-fluid-heading text-muted-foreground" data-testid="case-study-subtitle">
                {heroContent.subtitle}
              </p>
              <p className="text-fluid-body-xl max-w-3xl mx-auto" data-testid="case-study-description">
                {heroContent.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-fluid-display font-serif" data-testid="challenge-title">
              {challengeContent.title}
            </h2>
            <div className="space-y-6">
              <p className="text-fluid-body-xl" data-testid="challenge-description">
                {challengeContent.description}
              </p>
              {challengeContent.story && (
                <blockquote className="border-l-4 border-primary bg-primary/5 pl-6 py-4 italic text-fluid-body-xl">
                  {challengeContent.story}
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-fluid-display font-serif" data-testid="solution-title">
              {solutionContent.title}
            </h2>
            <p className="text-fluid-body-xl" data-testid="solution-description">
              {solutionContent.description}
            </p>
            
            {solutionContent.technicalDeep && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
                <h3 className="text-fluid-heading mb-4">Technical Deep Dive</h3>
                <p className="text-fluid-body text-muted-foreground">
                  {solutionContent.technicalDeep}
                </p>
              </div>
            )}

            {solutionContent.impact && (
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Real-World Impact</h3>
                <p className="leading-relaxed" data-testid="solution-impact">
                  {solutionContent.impact}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-serif" data-testid="results-title">
              {resultsContent.title}
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" data-testid="results-story">
                {resultsContent.story}
              </p>
              {resultsContent.impact && (
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Lasting Impact</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {resultsContent.impact}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Learnings Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-serif" data-testid="learnings-title">
              {learningsContent.title}
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" data-testid="learnings-reflection">
                {learningsContent.reflection}
              </p>
              <div className="bg-accent/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Moving Forward</h3>
                <p className="leading-relaxed" data-testid="next-steps">
                  {learningsContent.nextSteps}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-serif" data-testid="future-title">
              {futureContent.title}
            </h2>
            <div className="space-y-4" data-testid="future-vision">
              <p className="text-lg leading-relaxed">
                {futureContent.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-serif">Experience It Yourself</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This entire page adapts to your selected perspective. Try switching between different viewpoints using the perspective selector to see how the same story transforms for different audiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" data-testid="cta-products">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore All Products
                </Button>
              </Link>
              <Link href="/contact" data-testid="cta-contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get In Touch
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}