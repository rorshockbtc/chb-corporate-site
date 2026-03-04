import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Github, 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Info, 
  Code,
  Layers,
  Box,
  CheckCircle2,
  Copy
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DesignSystemPage() {
  const { currentPerspective, setPerspective } = usePerspective();
  const { theme } = usePerspectiveTheme();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: text,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 selection:bg-brand-pink/20">
      {/* Hero Header */}
      <section className="bg-perspective-light/10 border-b border-perspective py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto relative">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-brand-pink hover:bg-brand-pink/90 text-white px-4 py-1.5 text-sm font-bold rounded-full shadow-lg shadow-brand-pink/20">
                M3-SPEC 1.0.0
              </Badge>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Perspective-Engine v4</span>
            </div>
            <h1 className="text-fluid-hero font-black section-title-perspective tracking-tighter leading-[0.85]">
              Colon Hyphen Bracket <br/>
              <span className="text-foreground italic opacity-90">Design System</span>
            </h1>
            <p className="text-fluid-body-xl text-muted-foreground leading-relaxed max-w-2xl">
              A Material M3-inspired visual language that adapts to user psychology. 
              Our "Perspective Switching" technology transforms the UI from 
              <span className="text-foreground font-semibold"> high-scale infrastructure</span> to 
              <span className="text-foreground font-semibold"> nostalgic preservation</span> instantly.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button asChild className="bg-brand-pink hover:opacity-90 h-14 px-10 text-lg rounded-2xl shadow-xl shadow-brand-pink/20 transition-all hover:scale-[1.02]">
                <a href="https://github.com/rorshockbtc/chb-corporate-site" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-3 h-6 w-6" />
                  Source Code
                </a>
              </Button>
              <Button variant="outline" className="h-14 px-10 text-lg rounded-2xl border-brand-pink/30 text-brand-pink hover:bg-brand-pink/5 backdrop-blur-sm">
                <ExternalLink className="mr-3 h-6 w-6" />
                Figma Specs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-16">
        <Tabs defaultValue="tokens" className="space-y-12">
          <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-muted/50 p-1.5 text-muted-foreground w-full lg:w-auto shadow-inner">
            <TabsTrigger value="tokens" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xl transition-all font-bold">
              <Palette className="mr-2.5 h-4 w-4" />
              Design Tokens
            </TabsTrigger>
            <TabsTrigger value="typography" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xl transition-all font-bold">
              <Type className="mr-2.5 h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xl transition-all font-bold">
              <Layout className="mr-2.5 h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="perspectives" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xl transition-all font-bold">
              <Sparkles className="mr-2.5 h-4 w-4" />
              Perspective Engine
            </TabsTrigger>
          </TabsList>

          {/* TOKENS TAB */}
          <TabsContent value="tokens" className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">Core Brand DNA</h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <ColorToken 
                    name="Brand Pink" 
                    hex={BRAND_COLORS.pink} 
                    variable="--brand-pink"
                    usage="Primary Brand Action & Global CTAs" 
                  />
                  <ColorToken 
                    name="Brand Yellow" 
                    hex={BRAND_COLORS.yellow} 
                    variable="--brand-yellow"
                    usage="Secondary Highlights & Success States" 
                  />
                  <ColorToken 
                    name="Hash Green" 
                    hex={BRAND_COLORS.hash} 
                    variable="--brand-green"
                    usage="Memory Capturer Context" 
                  />
                  <ColorToken 
                    name="Semi Purple" 
                    hex={BRAND_COLORS.semi} 
                    variable="--brand-purple"
                    usage="Content Creator Context" 
                  />
                  <ColorToken 
                    name="Surface" 
                    hex={BRAND_COLORS.surface} 
                    variable="--surface-dark"
                    usage="Main Background Surface" 
                  />
                  <ColorToken 
                    name="Contrast Text" 
                    hex={BRAND_COLORS.textOnSurface} 
                    variable="--text-on-surface"
                    usage="High Visibility Typography" 
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-perspective-light/20 flex items-center justify-center text-perspective">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">Active Context</h2>
                </div>
                <Card className="bg-perspective-light/5 border-perspective/20 shadow-none rounded-3xl overflow-hidden group">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Perspective Variable Map</p>
                        <h3 className="text-xl font-bold capitalize">{currentPerspective.replace('_', ' ')}</h3>
                      </div>
                      <Badge variant="outline" className="border-perspective text-perspective font-mono px-4 py-1">
                        LIVE
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-20 rounded-2xl bg-perspective shadow-sm border border-black/5" />
                        <p className="text-xs font-mono text-muted-foreground">--perspective-primary</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 rounded-2xl bg-[var(--perspective-accent)] shadow-sm border border-black/5" />
                        <p className="text-xs font-mono text-muted-foreground">--perspective-accent</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-perspective/10">
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        All perspective colors (except Brand Pink) are derived from the active audience lens. 
                        This ensures the visual tone shifts with the user's intent.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TYPOGRAPHY TAB */}
          <TabsContent value="typography" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Type className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Fluid Typography System</h2>
              </div>
              
              <div className="grid gap-12">
                <TypographyPreview 
                  label="Hero Display" 
                  className="text-fluid-hero font-black leading-[0.85] tracking-tighter"
                  token="--fluid-hero"
                  range="40px → 80px"
                  text="Every Pipe is a real slice of humanity."
                />
                <TypographyPreview 
                  label="Section Header" 
                  className="text-fluid-display font-bold tracking-tight"
                  token="--fluid-display"
                  range="32px → 56px"
                  text="Context is the currency of the future."
                />
                <TypographyPreview 
                  label="Body Large" 
                  className="text-fluid-body-xl leading-relaxed"
                  token="--fluid-body-xl"
                  range="18px → 24px"
                  text="We build tools for the people Big Tech left behind. Memory captures, creative flow, and expertise packaged as monetizable infrastructure."
                />
              </div>
            </div>
          </TabsContent>

          {/* COMPONENTS TAB */}
          <TabsContent value="components" className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Box className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Action Surfaces</h2>
                  </div>
                  <ComponentShowcase 
                    title="Universal Buttons" 
                    description="Consistent brand touchpoints that never change with perspective."
                    code={`<Button className="bg-brand-pink text-white rounded-2xl h-14 px-8 font-bold">
  Brand Primary
</Button>`}
                  >
                    <div className="flex flex-wrap gap-6">
                      <Button className="bg-brand-pink hover:opacity-90 text-white rounded-2xl h-14 px-8 font-bold shadow-lg shadow-brand-pink/20">Brand Primary</Button>
                      <Button variant="outline" className="border-brand-pink text-brand-pink hover:bg-brand-pink/5 rounded-2xl h-14 px-8 font-bold">Secondary Action</Button>
                    </div>
                  </ComponentShowcase>
                </div>

                <div className="space-y-6">
                  <ComponentShowcase 
                    title="Perspective Links" 
                    description="Dynamic elements that inherit colors from the active audience lens."
                    code={`<Button className="pipes-link">
  Explore | | |
</Button>`}
                  >
                    <div className="flex flex-wrap gap-6">
                      <Button className="pipes-link">Explore | | |</Button>
                      <Button variant="outline" className="border-perspective text-perspective hover:bg-perspective/5 rounded-2xl h-14 px-8 font-bold">Learn Context</Button>
                    </div>
                  </ComponentShowcase>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                      <Info className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Informational Logic</h2>
                  </div>
                  <ComponentShowcase 
                    title="Status Badges" 
                    description="Compact feedback elements for system states."
                    code={`<Badge className="bg-brand-pink text-white px-4 py-1 rounded-full">
  v1.0.0-Stable
</Badge>`}
                  >
                    <div className="flex flex-wrap gap-4">
                      <Badge className="bg-brand-pink hover:bg-brand-pink/90 text-white px-4 py-1.5 rounded-full font-bold">Stable v1.0</Badge>
                      <Badge variant="outline" className="border-perspective text-perspective px-4 py-1.5 rounded-full font-bold">Perspective Active</Badge>
                      <Badge className="bg-brand-yellow text-black hover:bg-brand-yellow/90 px-4 py-1.5 rounded-full font-bold">System Alert</Badge>
                    </div>
                  </ComponentShowcase>
                </div>

                <div className="space-y-6">
                  <ComponentShowcase 
                    title="Subscription Tiers" 
                    description="Visual shorthand for service levels using punctuation glyphs."
                    code={`<div className="font-mono text-2xl w-12 h-12 flex items-center justify-center bg-muted rounded-2xl border border-border">
  ...
</div>`}
                  >
                    <div className="flex gap-6">
                      <div className="font-mono text-3xl w-14 h-14 flex items-center justify-center bg-muted/50 rounded-2xl border border-border shadow-sm font-black text-brand-pink">,</div >
                      <div className="font-mono text-3xl w-14 h-14 flex items-center justify-center bg-muted/50 rounded-2xl border border-border shadow-sm font-black text-brand-pink">.</div>
                      <div className="font-mono text-3xl w-14 h-14 flex items-center justify-center bg-muted/50 rounded-2xl border border-border shadow-sm font-black text-brand-pink">...</div>
                    </div>
                  </ComponentShowcase>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PERSPECTIVES TAB */}
          <TabsContent value="perspectives" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-perspective-light/10 border border-perspective/20 rounded-[2.5rem] p-12 space-y-12">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-4xl font-black tracking-tight">Switch the Lens</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The entire design system re-tokens itself based on these three perspectives. 
                  Toggle them to see the components on this page adapt their visual personality.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <PerspectiveControlCard 
                  title="Startup Founders" 
                  perspective="startup_founders" 
                  description="High-precision grid, geometric puzzles, and cold strategic blues."
                  isActive={currentPerspective === 'startup_founders'}
                  onClick={() => setPerspective('startup_founders')}
                />
                <PerspectiveControlCard 
                  title="Content Creators" 
                  perspective="content_creators" 
                  description="Fluid creative flow, abstract artistic tools, and magenta energy."
                  isActive={currentPerspective === 'content_creators'}
                  onClick={() => setPerspective('content_creators')}
                />
                <PerspectiveControlCard 
                  title="Memory Capturers" 
                  perspective="memory_capturers" 
                  description="Warm illustrated farmhouse, vintage postcards, and nurturing greens."
                  isActive={currentPerspective === 'memory_capturers'}
                  onClick={() => setPerspective('memory_capturers')}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ColorToken({ name, hex, variable, usage }: { name: string, hex: string, variable: string, usage: string }) {
  const { toast } = useToast();
  
  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    toast({ title: "Copied Token", description: val });
  };

  return (
    <div className="group space-y-4 p-4 rounded-3xl hover:bg-muted/50 transition-all border border-transparent hover:border-border">
      <div 
        className="aspect-video rounded-2xl shadow-xl shadow-black/5 border border-black/5 transition-transform group-hover:scale-[1.03] duration-300 relative overflow-hidden cursor-pointer" 
        style={{ backgroundColor: hex }}
        onClick={() => copyValue(hex)}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 backdrop-blur-[2px] transition-opacity">
          <Copy className="h-6 w-6 text-white drop-shadow-md" />
        </div>
      </div>
      <div className="space-y-1 px-1">
        <h4 className="font-bold text-lg tracking-tight">{name}</h4>
        <div className="flex items-center gap-2">
          <code className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-mono text-muted-foreground">{variable}</code>
          <code className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-mono text-muted-foreground uppercase">{hex}</code>
        </div>
        <p className="text-xs mt-2 leading-relaxed text-muted-foreground/80">{usage}</p>
      </div>
    </div>
  );
}

function TypographyPreview({ label, className, token, range, text }: { 
  label: string, 
  className: string, 
  token: string, 
  range: string, 
  text: string 
}) {
  return (
    <div className="space-y-4 p-8 rounded-[2rem] bg-muted/20 border border-border/50 hover:border-brand-pink/20 transition-all">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono text-[10px] tracking-widest uppercase">{token}</Badge>
          <span className="text-xs font-mono text-muted-foreground">{range}</span>
        </div>
        <span className="text-sm font-bold opacity-40">{label}</span>
      </div>
      <p className={className}>{text}</p>
    </div>
  );
}

function ComponentShowcase({ title, description, code, children }: { 
  title: string, 
  description: string, 
  code: string, 
  children: React.ReactNode 
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </div>
      <div className="p-12 rounded-[2rem] bg-muted/20 border border-border/50 relative group">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-xl h-8 text-[10px] font-mono"
            onClick={() => setShowCode(!showCode)}
          >
            <Code className="h-3 w-3 mr-2" />
            {showCode ? 'HIDE SPEC' : 'VIEW SPEC'}
          </Button>
        </div>
        {showCode ? (
          <div className="bg-black/90 p-6 rounded-2xl overflow-x-auto">
            <pre className="text-xs font-mono text-pink-400 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function PerspectiveControlCard({ title, perspective, description, isActive, onClick }: { 
  title: string, 
  perspective: string, 
  description: string,
  isActive: boolean,
  onClick: () => void
}) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-500 border-2 rounded-[2rem] overflow-hidden group ${
        isActive 
          ? 'border-brand-pink shadow-2xl shadow-brand-pink/20 translate-y-[-8px]' 
          : 'hover:border-perspective/50 border-transparent bg-background/50 backdrop-blur-sm'
      }`}
      onClick={onClick}
    >
      <CardHeader className="space-y-4">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isActive ? 'bg-brand-pink text-white rotate-12 scale-110' : 'bg-muted text-muted-foreground group-hover:bg-perspective/10 group-hover:text-perspective'
        }`}>
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-2xl font-black">{title}</CardTitle>
          <CardDescription className="text-sm mt-2 font-medium">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
         <div className="flex items-center gap-3">
           <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-pink transition-all duration-700 ease-out" 
                style={{ width: isActive ? '100%' : '0%' }}
              />
           </div>
           {isActive && <CheckCircle2 className="h-5 w-5 text-brand-pink animate-in zoom-in duration-300" />}
         </div>
         <p className="text-[10px] font-mono mt-6 text-muted-foreground uppercase tracking-widest">
           {isActive ? 'Lens Engaged' : 'Click to Shift Context'}
         </p>
      </CardContent>
    </Card>
  );
}
