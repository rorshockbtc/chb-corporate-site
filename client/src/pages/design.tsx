import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Palette, Type, Layout, Sparkles } from "lucide-react";

export default function DesignSystemPage() {
  const { currentPerspective, setPerspective } = usePerspective();
  const { theme } = usePerspectiveTheme();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <section className="bg-perspective-light/10 border-b border-perspective py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl space-y-6">
            <Badge className="bg-brand-pink hover:bg-brand-pink/90 text-white px-3 py-1 text-sm">
              v1.0.0-stable
            </Badge>
            <h1 className="text-fluid-hero font-bold section-title-perspective tracking-tighter">
              The CHB Design System
            </h1>
            <p className="text-fluid-body-xl text-muted-foreground leading-relaxed">
              A perspective-driven visual language built on the principle that 
              <span className="text-foreground font-medium italic"> every Pipe should be a real slice of humanity.</span>
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="bg-brand-pink hover:opacity-90 h-12 px-8 text-lg rounded-xl">
                <a href="https://github.com/rorshockbtc/Chbdesignsystem" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View Source
                </a>
              </Button>
              <Button variant="outline" className="h-12 px-8 text-lg rounded-xl border-brand-pink text-brand-pink hover:bg-brand-pink/5">
                <ExternalLink className="mr-2 h-5 w-5" />
                Figma Tokens
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-16">
        <Tabs defaultValue="palette" className="space-y-12">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground w-full md:w-auto">
            <TabsTrigger value="palette" className="rounded-lg px-6 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground shadow-none">
              <Palette className="mr-2 h-4 w-4" />
              Palette
            </TabsTrigger>
            <TabsTrigger value="typography" className="rounded-lg px-6 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground shadow-none">
              <Type className="mr-2 h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="rounded-lg px-6 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground shadow-none">
              <Layout className="mr-2 h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="perspectives" className="rounded-lg px-6 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground shadow-none">
              <Sparkles className="mr-2 h-4 w-4" />
              Perspectives
            </TabsTrigger>
          </TabsList>

          <TabsContent value="palette" className="space-y-16 mt-0">
            <div className="space-y-8">
              <h2 className="text-fluid-display font-bold tracking-tight">Core Brand DNA</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <ColorCard name="Brand Pink" hex={BRAND_COLORS.pink} description="Universal Primary / CTA" />
                <ColorCard name="Brand Yellow" hex={BRAND_COLORS.yellow} description="Secondary Highlight" />
                <ColorCard name="Brand Blue" hex={BRAND_COLORS.blue} description="Semi / Startup Base" />
                <ColorCard name="Brand Green" hex={BRAND_COLORS.green} description="Hash / Memory Base" />
                <ColorCard name="Surface" hex={BRAND_COLORS.surface} description="Dark UI Base" />
                <ColorCard name="Text" hex={BRAND_COLORS.textOnSurface} description="Contrast Typography" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-fluid-display font-bold tracking-tight">Active Context</h2>
                <Badge variant="outline" className="border-perspective text-perspective font-mono px-3">
                  {currentPerspective}
                </Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-perspective-light/5 border-perspective/20 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Perspective Primary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 rounded-xl bg-perspective mb-4 shadow-sm" />
                    <p className="font-bold text-xl">{theme.colors.secondary}</p>
                  </CardContent>
                </Card>
                <Card className="bg-perspective-light/5 border-perspective/20 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Perspective Accent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 rounded-xl bg-[var(--perspective-accent)] mb-4 shadow-sm" />
                    <p className="font-bold text-xl">{theme.colors.accent}</p>
                  </CardContent>
                </Card>
                <Card className="bg-perspective-light/5 border-perspective/20 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Perspective Light</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 rounded-xl bg-perspective-light mb-4 shadow-sm" />
                    <p className="font-bold text-xl">{theme.colors.muted}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-12 mt-0">
            <Card className="border-none bg-muted/30 p-8">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-xs font-mono text-muted-foreground">--fluid-hero</span>
                    <span className="text-xs font-mono text-muted-foreground">40px → 80px</span>
                  </div>
                  <h1 className="text-fluid-hero font-black tracking-tighter leading-[0.9]">
                    The future of AI is human context.
                  </h1>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-xs font-mono text-muted-foreground">--fluid-display</span>
                    <span className="text-xs font-mono text-muted-foreground">32px → 56px</span>
                  </div>
                  <h2 className="text-fluid-display font-bold tracking-tight">
                    Every Pipe is a real slice of humanity.
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-xs font-mono text-muted-foreground">--fluid-body-xl</span>
                    <span className="text-xs font-mono text-muted-foreground">18px → 24px</span>
                  </div>
                  <p className="text-fluid-body-xl leading-relaxed">
                    We build tools for the people Big Tech left behind. Memory captures, 
                    creative flow, and expertise packaged as monetizable infrastructure.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-16 mt-0">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold tracking-tight">Interactive Elements</h3>
                <div className="space-y-8 p-8 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Brand CTAs</p>
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl h-12 px-6">Primary Action</Button>
                      <Button variant="outline" className="border-brand-pink text-brand-pink hover:bg-brand-pink/5 rounded-xl h-12 px-6">Secondary Action</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Perspective Actions</p>
                    <div className="flex flex-wrap gap-4">
                      <Button className="pipes-link">Explore | | |</Button>
                      <Button variant="outline" className="border-perspective text-perspective hover:bg-perspective/5 rounded-xl h-12 px-6">Learn More</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold tracking-tight">Status & Feedback</h3>
                <div className="space-y-8 p-8 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Badges</p>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-brand-pink hover:bg-brand-pink/90">Premium</Badge>
                      <Badge variant="outline" className="border-perspective text-perspective">Perspective Active</Badge>
                      <Badge variant="secondary" className="rounded-full">v1.0.0</Badge>
                      <Badge className="bg-brand-yellow text-black hover:bg-brand-yellow/90">Alert</Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Subscription Tiers</p>
                    <div className="flex gap-4">
                      <div className="font-mono text-2xl w-10 h-10 flex items-center justify-center bg-muted rounded-lg border border-border">,</div >
                      <div className="font-mono text-2xl w-10 h-10 flex items-center justify-center bg-muted rounded-lg border border-border">.</div>
                      <div className="font-mono text-2xl w-10 h-10 flex items-center justify-center bg-muted rounded-lg border border-border">...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="perspectives" className="space-y-8 mt-0">
             <div className="grid md:grid-cols-3 gap-8">
                <PerspectiveCard 
                  title="Startup Founders" 
                  perspective="startup_founders" 
                  description="Precision, Scale, and Infrastructure."
                  isActive={currentPerspective === 'startup_founders'}
                  onClick={() => setPerspective('startup_founders')}
                />
                <PerspectiveCard 
                  title="Content Creators" 
                  perspective="content_creators" 
                  description="Creative Flow and Audience Compound."
                  isActive={currentPerspective === 'content_creators'}
                  onClick={() => setPerspective('content_creators')}
                />
                <PerspectiveCard 
                  title="Memory Capturers" 
                  perspective="memory_capturers" 
                  description="Nostalgia, Preservation, and Legacy."
                  isActive={currentPerspective === 'memory_capturers'}
                  onClick={() => setPerspective('memory_capturers')}
                />
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ColorCard({ name, hex, description }: { name: string, hex: string, description: string }) {
  return (
    <div className="group space-y-3">
      <div 
        className="aspect-square rounded-2xl shadow-sm border border-black/5 transition-transform group-hover:scale-[1.02] duration-200" 
        style={{ backgroundColor: hex }} 
      />
      <div>
        <h4 className="font-bold text-sm tracking-tight">{name}</h4>
        <p className="text-xs font-mono uppercase text-muted-foreground">{hex}</p>
        <p className="text-[11px] mt-1 leading-tight text-muted-foreground/80">{description}</p>
      </div>
    </div>
  );
}

function PerspectiveCard({ title, perspective, description, isActive, onClick }: { 
  title: string, 
  perspective: string, 
  description: string,
  isActive: boolean,
  onClick: () => void
}) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 border-2 ${
        isActive ? 'border-brand-pink shadow-lg translate-y-[-4px]' : 'hover:border-primary/50 border-transparent shadow-none'
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
         <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-pink transition-all duration-500" 
              style={{ width: isActive ? '100%' : '0%' }}
            />
         </div>
         <p className="text-xs mt-4 text-muted-foreground">Click to toggle site-wide perspective</p>
      </CardContent>
    </Card>
  );
}
