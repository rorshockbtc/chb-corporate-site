import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useNostrAuth } from "@/hooks/use-nostr-auth";
import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CreditCard,
  Link2,
  LayoutDashboard,
  Brain,
  Database,
  Sparkles,
  ExternalLink,
  Lock,
  Mail,
  Shield,
  Clock,
  Check,
  Zap,
  Heart,
  Eye
} from "lucide-react";

type Tier = "comma" | "period" | "ellipsis" | "free";

interface TierInfo {
  name: string;
  symbol: string;
  price: number;
  credits: number;
  creditsLabel: string;
  description: string;
  features: string[];
}

const tierData: Record<Tier, TierInfo> = {
  free: {
    name: "Free",
    symbol: "",
    price: 0,
    credits: 1000,
    creditsLabel: "1k",
    description: "Try the ecosystem",
    features: ["Basic Semi access", "Hash journal", "Browse Pipes marketplace"]
  },
  comma: {
    name: "Comma",
    symbol: ",",
    price: 7,
    credits: 50000,
    creditsLabel: "50k",
    description: "For individuals getting started",
    features: ["50k monthly credits", "Full Semi routing", "Hash with AI reflection", "Install public Pipes"]
  },
  period: {
    name: "Period",
    symbol: ".",
    price: 21,
    credits: 200000,
    creditsLabel: "200k",
    description: "For creators and builders",
    features: ["200k monthly credits", "Priority Semi routing", "Advanced Hash insights", "Create & monetize Pipes"]
  },
  ellipsis: {
    name: "Ellipsis",
    symbol: "...",
    price: 210,
    credits: 1000000,
    creditsLabel: "1M",
    description: "For power users and teams",
    features: ["1M monthly credits", "Dedicated Semi capacity", "Full ecosystem access", "Premium curator features"]
  }
};

export default function Account() {
  const { user: emailUser, isAuthenticated: isEmailAuth, isLoading: emailLoading } = useAuth();
  const { isAuthenticated: isNostrAuth, user: nostrUser } = useNostrAuth();
  const { currentPerspective } = usePerspective();
  const { getThemeColor } = usePerspectiveTheme();
  const [, setLocation] = useLocation();

  const isAuthenticated = isEmailAuth || isNostrAuth;
  const user = emailUser || nostrUser;
  const primaryColor = getThemeColor('primary');

  // Mock data - replace with real API data
  const currentTier: Tier = "comma";
  const creditsUsed = 12500;
  const creditsTotal = tierData[currentTier].credits;
  const creditsRemaining = creditsTotal - creditsUsed;
  const creditPercentUsed = (creditsUsed / creditsTotal) * 100;

  if (emailLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign in to continue</CardTitle>
            <CardDescription>Access your CHB account to manage your subscription and connected apps.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/signup">
              <Button size="lg" data-testid="button-signin">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tierInfo = tierData[currentTier];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold" data-testid="text-account-title">Your Account</h1>
            <TierBadge tier={currentTier} />
          </div>
          <p className="text-muted-foreground">
            Manage your CHB ecosystem in one place. :-]
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2" data-testid="tab-overview">
              <LayoutDashboard className="h-4 w-4 hidden sm:block" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2" data-testid="tab-profile">
              <User className="h-4 w-4 hidden sm:block" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2" data-testid="tab-subscription">
              <CreditCard className="h-4 w-4 hidden sm:block" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="apps" className="gap-2" data-testid="tab-apps">
              <Link2 className="h-4 w-4 hidden sm:block" />
              Apps
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewTab 
              user={user} 
              tierInfo={tierInfo} 
              currentTier={currentTier}
              creditsUsed={creditsUsed}
              creditsTotal={creditsTotal}
              creditsRemaining={creditsRemaining}
              creditPercentUsed={creditPercentUsed}
              primaryColor={primaryColor}
            />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <ProfileTab user={user} />
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <SubscriptionTab 
              currentTier={currentTier} 
              creditsUsed={creditsUsed}
              creditsTotal={creditsTotal}
              primaryColor={primaryColor}
            />
          </TabsContent>

          {/* Connected Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            <ConnectedAppsTab currentPerspective={currentPerspective} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Tier Badge Component
function TierBadge({ tier }: { tier: Tier }) {
  const info = tierData[tier];
  const colors = {
    free: "bg-gray-100 text-gray-700 border-gray-300",
    comma: "bg-blue-50 text-blue-700 border-blue-300",
    period: "bg-purple-50 text-purple-700 border-purple-300",
    ellipsis: "bg-pink-50 text-pink-700 border-pink-300"
  };

  return (
    <Badge variant="outline" className={`${colors[tier]} text-base px-3 py-1 font-mono`} data-testid="badge-tier">
      {info.symbol && <span className="text-xl mr-1">{info.symbol}</span>}
      {info.name}
    </Badge>
  );
}

// Overview Tab
function OverviewTab({ 
  user, 
  tierInfo, 
  currentTier,
  creditsUsed, 
  creditsTotal, 
  creditsRemaining,
  creditPercentUsed,
  primaryColor 
}: { 
  user: any;
  tierInfo: TierInfo;
  currentTier: Tier;
  creditsUsed: number;
  creditsTotal: number;
  creditsRemaining: number;
  creditPercentUsed: number;
  primaryColor: string;
}) {
  return (
    <>
      {/* Credits Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Credit Balance
          </CardTitle>
          <CardDescription>
            Your credits power Semi interactions across the ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{creditsUsed.toLocaleString()} used</span>
            <span>{creditsRemaining.toLocaleString()} remaining</span>
          </div>
          <Progress value={creditPercentUsed} className="h-3" />
          <div className="flex justify-between items-center pt-2">
            <span className="text-2xl font-bold" data-testid="text-credits-remaining">
              {creditsRemaining.toLocaleString()}
            </span>
            <span className="text-muted-foreground">of {creditsTotal.toLocaleString()} monthly</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Semi is very efficient—you'll get ample use from your {tierInfo.name} tier. Credits reset monthly.
          </p>
        </CardContent>
      </Card>

      {/* CHB Promise */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            The CHB Promise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <PromiseItem 
              icon={<Brain className="h-5 w-5" />}
              title="She doesn't forget"
              description="Your context persists across conversations and sessions"
            />
            <PromiseItem 
              icon={<Shield className="h-5 w-5" />}
              title="Your data, your rules"
              description="You control what's shared and what stays private"
            />
            <PromiseItem 
              icon={<Clock className="h-5 w-5" />}
              title="Build now, save later"
              description="Your work compounds—nothing is lost"
            />
            <PromiseItem 
              icon={<Sparkles className="h-5 w-5" />}
              title="Amplification, not automation"
              description="We enhance your expertise, not replace it"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <QuickLinkCard
          title="Hash"
          description="Your private memory journal"
          icon={<Database className="h-6 w-6" />}
          href="https://hash.pink"
          color={BRAND_COLORS.hash}
        />
        <QuickLinkCard
          title="Semi"
          description="Your intelligent AI assistant"
          icon={<Brain className="h-6 w-6" />}
          href="https://semi.pink"
          color={BRAND_COLORS.semi}
        />
        <QuickLinkCard
          title="Pipes"
          description="Curator marketplace"
          icon={<Sparkles className="h-6 w-6" />}
          href="https://pipes.pink"
          color={BRAND_COLORS.pipes}
        />
      </div>
    </>
  );
}

function PromiseItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <div className="text-primary shrink-0">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function QuickLinkCard({ title, description, icon, href, color }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  href: string;
  color: string;
}) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
      data-testid={`link-${title.toLowerCase()}`}
    >
      <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ color }}>{icon}</div>
            <span className="font-semibold">{title}</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </a>
  );
}

// Profile Tab
function ProfileTab({ user }: { user: any }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Manage your account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                defaultValue={user?.firstName || ""} 
                placeholder="Your first name"
                disabled
                data-testid="input-firstname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                defaultValue={user?.lastName || ""} 
                placeholder="Your last name"
                disabled
                data-testid="input-lastname"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Input 
                id="email" 
                type="email" 
                defaultValue={user?.email || ""} 
                disabled
                data-testid="input-email"
              />
              {user?.emailVerified && (
                <Badge variant="secondary" className="shrink-0">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Profile editing coming soon
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage your authentication methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email & Password</p>
                <p className="text-sm text-muted-foreground">
                  {user?.email ? "Connected" : "Not configured"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled data-testid="button-change-password">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">NOSTR</p>
                <p className="text-sm text-muted-foreground">
                  {user?.nostrPubkey ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <Badge variant="secondary">
              Cryptographic identity
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            Password changes and additional security features coming soon.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

// Subscription Tab
function SubscriptionTab({ 
  currentTier, 
  creditsUsed, 
  creditsTotal,
  primaryColor 
}: { 
  currentTier: Tier;
  creditsUsed: number;
  creditsTotal: number;
  primaryColor: string;
}) {
  return (
    <>
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your subscription powers the entire CHB ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TierBadge tier={currentTier} />
              <span className="text-2xl font-bold">${tierData[currentTier].price}/mo</span>
            </div>
            <a href="https://hash.pink/settings/billing" target="_blank" rel="noopener noreferrer">
              <Button data-testid="button-manage-billing">
                Manage in Hash
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
          <p className="text-muted-foreground">
            {tierData[currentTier].creditsLabel} credits per month • Shared across Hash, Semi, and Pipes
          </p>
        </CardContent>
      </Card>

      {/* Tier Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Compare Plans</CardTitle>
          <CardDescription>
            All tiers include full ecosystem access—pay for the capacity you need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {(["comma", "period", "ellipsis"] as Tier[]).map((tier) => (
              <TierCard 
                key={tier} 
                tier={tier} 
                isCurrentTier={tier === currentTier}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Semi is very efficient, and we're still settling on exact credit amounts. 
            You can use the ecosystem now and get ample use from Comma and Period tiers.
          </p>
        </CardContent>
      </Card>

      {/* Credit Top-ups Preview */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Zap className="h-5 w-5" />
            Credit Top-ups
          </CardTitle>
          <CardDescription>
            Need more credits mid-month?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Top-up packs coming soon. For now, upgrade your tier for more monthly credits.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

function TierCard({ tier, isCurrentTier }: { tier: Tier; isCurrentTier: boolean }) {
  const info = tierData[tier];
  
  return (
    <div 
      className={`p-4 rounded-lg border-2 ${isCurrentTier ? 'border-primary bg-primary/5' : 'border-border'}`}
      data-testid={`tier-card-${tier}`}
    >
      <div className="text-center mb-4">
        <span className="text-4xl font-mono" aria-hidden="true">{info.symbol}</span>
        <h3 className="text-xl font-bold">{info.name}</h3>
        <p className="text-2xl font-bold mt-2">${info.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
        <p className="text-sm text-muted-foreground">{info.creditsLabel} credits</p>
      </div>
      <p className="text-sm text-center text-muted-foreground mb-4">{info.description}</p>
      <ul className="space-y-2">
        {info.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {isCurrentTier && (
        <Badge className="w-full justify-center mt-4">Current Plan</Badge>
      )}
    </div>
  );
}

// Connected Apps Tab
function ConnectedAppsTab({ currentPerspective }: { currentPerspective: string }) {
  const apps = [
    {
      id: "hash",
      name: "Hash",
      tagline: "Your private memory journal",
      description: "Hash captures your thoughts, learnings, and evolution. It's the private foundation that powers personalization across the ecosystem. What you write here travels with you—Semi knows you because Hash tells her.",
      synergy: "Your Hash journals reveal your expertise and inform how Semi responds to you.",
      icon: <Database className="h-8 w-8" />,
      color: BRAND_COLORS.hash,
      url: "https://hash.pink",
      connected: true
    },
    {
      id: "semi", 
      name: "Semi",
      tagline: "Your intelligent AI assistant",
      description: "Semi is the AI layer for everything. She routes intelligently—simple queries stay local (efficient), complex ones go external (when needed). She learns your preferences and gets smarter about YOU every day.",
      synergy: "Semi uses your Hash for context and can query Pipes for domain expertise.",
      icon: <Brain className="h-8 w-8" />,
      color: BRAND_COLORS.semi,
      url: "https://semi.pink",
      connected: true
    },
    {
      id: "pipes",
      name: "Pipes",
      tagline: "Curator marketplace",
      description: "Package your expertise into reusable, monetizable AI infrastructure. Like domain names for knowledge—claim your namespace, curate your perspective, earn equity from your wisdom.",
      synergy: "Your Hash reveals what you know deeply. Create Pipes from your strongest themes.",
      icon: <Sparkles className="h-8 w-8" />,
      color: BRAND_COLORS.pipes,
      url: "https://pipes.pink",
      connected: false
    }
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Ecosystem</CardTitle>
          <CardDescription>
            One account, unified experience. Your context travels everywhere.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {apps.map((app) => (
            <div 
              key={app.id}
              className="p-4 border rounded-lg space-y-3"
              data-testid={`app-card-${app.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ color: app.color }}>{app.icon}</div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {app.name}
                      {app.connected && (
                        <Badge variant="secondary" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{app.tagline}</p>
                  </div>
                </div>
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" data-testid={`button-go-to-${app.id}`}>
                    Go to {app.name}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
              <p className="text-sm">{app.description}</p>
              <div className="flex items-start gap-2 text-sm bg-muted/50 p-3 rounded">
                <Link2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground"><strong>Synergy:</strong> {app.synergy}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Single Account Benefits */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardHeader>
          <CardTitle>Why One Account Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your entire intellectual identity travels with you. Your Hash reveals who you are, 
            Semi understands how you think, and Pipes lets you share what you know. 
          </p>
          <p className="font-medium">
            Zero friction. Full context. :-]
          </p>
        </CardContent>
      </Card>
    </>
  );
}
