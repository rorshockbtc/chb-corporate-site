import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DesignSystemPage() {
  const { currentPerspective } = usePerspective();
  const { theme } = usePerspectiveTheme();

  return (
    <div className="container mx-auto py-24 px-6 space-y-16">
      <header className="space-y-4">
        <h1 className="text-fluid-hero font-bold section-title-perspective">Design System</h1>
        <p className="text-fluid-body-xl text-muted-foreground max-w-3xl">
          The visual language of Colon Hyphen Bracket (:-]). A perspective-driven system
          built for clarity, continuity, and human connection.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-brand-pink hover:opacity-90">
            <a href="https://github.com/rorshockbtc/Chbdesignsystem" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </header>

      <section className="space-y-8">
        <h2 className="text-fluid-display font-bold border-b pb-2">Core Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <ColorCard name="Brand Pink" hex={BRAND_COLORS.pink} description="Primary CTA / Brand Signature" />
          <ColorCard name="Brand Yellow" hex={BRAND_COLORS.yellow} description="Highlights / Accents" />
          <ColorCard name="Brand Blue" hex={BRAND_COLORS.blue} description="Startup Founders Base" />
          <ColorCard name="Brand Green" hex={BRAND_COLORS.green} description="Memory Capturers Base" />
          <ColorCard name="Surface" hex={BRAND_COLORS.surface} description="Dark Backgrounds" />
          <ColorCard name="Text on Surface" hex={BRAND_COLORS.textOnSurface} description="Light Typography" />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-fluid-display font-bold border-b pb-2">Active Perspective: {currentPerspective.replace('_', ' ')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-perspective-light/10 border-perspective">
            <CardHeader>
              <CardTitle>Perspective Primary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-lg bg-perspective mb-4" />
              <p className="text-sm font-mono uppercase text-center">{theme.colors.secondary}</p>
            </CardContent>
          </Card>
          <Card className="bg-perspective-light/10 border-perspective">
            <CardHeader>
              <CardTitle>Perspective Accent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-lg bg-[var(--perspective-accent)] mb-4" />
              <p className="text-sm font-mono uppercase text-center">{theme.colors.accent}</p>
            </CardContent>
          </Card>
          <Card className="bg-perspective-light/10 border-perspective">
            <CardHeader>
              <CardTitle>Perspective Muted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-lg bg-[var(--perspective-muted)] mb-4" />
              <p className="text-sm font-mono uppercase text-center">{theme.colors.muted}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-fluid-display font-bold border-b pb-2">Typography</h2>
        <div className="space-y-12">
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground">--fluid-hero</p>
            <h1 className="text-fluid-hero font-black tracking-tighter">The future of AI is human.</h1>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground">--fluid-display</p>
            <h2 className="text-fluid-display font-bold">Every Pipe is a real slice of humanity.</h2>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground">--fluid-body-xl</p>
            <p className="text-fluid-body-xl">We build tools for the people Big Tech left behind.</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-fluid-display font-bold border-b pb-2">Components</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-brand-pink hover:opacity-90">Brand Primary</Button>
              <Button className="pipes-link">Perspective Action</Button>
              <Button variant="outline">Secondary Action</Button>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Badges</h3>
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-brand-pink hover:bg-brand-pink/90">New</Badge>
              <Badge variant="outline" className="border-perspective text-perspective">Beta</Badge>
              <Badge variant="secondary">Tier: Period</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorCard({ name, hex, description }: { name: string, hex: string, description: string }) {
  return (
    <div className="space-y-3">
      <div 
        className="aspect-square rounded-xl shadow-inner border" 
        style={{ backgroundColor: hex }} 
      />
      <div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-xs font-mono uppercase text-muted-foreground">{hex}</p>
        <p className="text-[10px] mt-1 leading-tight">{description}</p>
      </div>
    </div>
  );
}
