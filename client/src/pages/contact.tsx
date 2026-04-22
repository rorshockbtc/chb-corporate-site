import { Mail, ExternalLink, Building } from "lucide-react";
import { usePerspectiveContent } from "@/hooks/use-perspective";
import { ContactForm } from "@/components/contact-form";

export default function Contact() {
  const contactContent = usePerspectiveContent({
    startup_founders: {
      title: "Let's build the market together",
      description: "Ready to experience AI that accelerates your business growth? Join entrepreneurs who've discovered what technology feels like when it's built for real market impact.",
      ctaText: "Let's Scale"
    },
    content_creators: {
      title: "Let's create together",
      description: "Ready to experience AI that amplifies your creative voice? Join creators who've discovered what technology feels like when it's built for authentic expression.",
      ctaText: "Let's Create"
    },
    memory_capturers: {
      title: "Let's preserve together",
      description: "Ready to experience AI that honors your family's story? Join families who've discovered what technology feels like when it's built for what truly matters.",
      ctaText: "Let's Connect"
    }
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "Direct communication",
      contact: "cubby@colonhyphenbracket.pink",
      href: "mailto:cubby@colonhyphenbracket.pink",
      color: "bg-brand-pink",
      testId: "contact-email"
    },
    {
      icon: Building,
      title: "Follow CHB",
      subtitle: "Company updates",
      contact: "@chb_coop",
      href: "https://twitter.com/chb_coop", 
      color: "bg-brand-green",
      testId: "contact-business"
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold font-serif leading-tight" data-testid="contact-title">
                {contactContent.title}
              </h1>
              
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl" data-testid="contact-description">
                {contactContent.description}
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-60"></div>
                <img 
                  src="/generated/images/contact_hero_universal.png" 
                  alt="Professional connection illustration"
                  className="relative w-80 h-80 object-contain drop-shadow-2xl"
                  data-testid="contact-hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Methods Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold font-serif mb-6">Choose Your Connection</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Whether you prefer email, personal updates, or business discussions, we're here to connect in the way that works best for you.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 mb-20 max-w-3xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={method.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card border border-border rounded-2xl p-8 text-center space-y-6 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                  <div className={`w-20 h-20 ${method.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                    <method.icon size={32} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{method.title}</h3>
                    <p className="text-muted-foreground">{method.subtitle}</p>
                  </div>
                  <a
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                    data-testid={method.testId}
                  >
                    <span>{method.contact}</span>
                    {method.href.startsWith("http") && <ExternalLink size={16} />}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 space-y-3">
              <h3 className="text-3xl lg:text-4xl font-bold font-serif">{contactContent.ctaText}</h3>
              <p className="text-muted-foreground text-lg">
                Send us a note. We read every message and reply personally.
              </p>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-lg">
              <ContactForm subjectPrefix="CHB Contact Page" testIdPrefix="contact-page" />
            </div>
            <div className="text-center mt-8">
              <a
                href="https://hash.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                data-testid="try-hash-free-button"
              >
                <span>Or try Hash for free</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-serif mb-6">Common Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Everything you need to know about CHB and our AI for the underserved</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6 text-primary">What makes CHB different from other AI companies?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We build AI for people Big Tech overlooks—individuals who want real personalization, 
                control over their data, and tools that respect their values instead of flattening them. 
                Constitutional governance means transparency and human agency are baked in, not bolted on.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6 text-primary">How do your products work together?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Hash captures and organizes your thoughts, Semi helps develop and extend ideas, Scout finds 
                patterns and connections, and Workshop ensures everything aligns with your values. Each tool 
                excels individually but becomes more powerful when used together.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6 text-primary">What does "AI for the underserved" mean?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                It means building for the people mainstream AI ignores: individuals who want personalization 
                tied to their actual values, control over what's shared, and transparency about how their AI 
                makes decisions. Less one-size-fits-all, more your-size-fits-you.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6 text-primary">Are your tools available now?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Hash and Semi are available today. Scout is integrated into Hash for pattern recognition, 
                and Workshop provides the governance framework across all tools. We're continuously improving 
                and expanding capabilities based on user feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
