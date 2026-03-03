import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "wouter";
import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { useAuth } from "@/hooks/useAuth";
import { NostrLoginButton } from "@/components/nostr-login-button";
import { useNostrAuth } from "@/hooks/use-nostr-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema, loginUserSchema, type RegisterUserInput, type LoginUserInput } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Key, 
  Zap, 
  Brain, 
  Lock, 
  Fingerprint,
  ArrowRight,
  Check,
  ExternalLink,
  DollarSign,
  Sparkles,
  Eye,
  Mail,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  User,
  LogOut,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Signup() {
  const { currentPerspective } = usePerspective();
  const { getThemeColor } = usePerspectiveTheme();
  const { user: emailUser, isAuthenticated: isEmailAuth, isLoading: emailLoading, refetch } = useAuth();
  const { isAuthenticated: isNostrAuth, user: nostrUser } = useNostrAuth();
  const [nostrExplainerOpen, setNostrExplainerOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [oauthRedirecting, setOauthRedirecting] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const primaryColor = getThemeColor('primary');
  const isAuthenticated = isEmailAuth || isNostrAuth;

  // Capture OAuth params ONCE on initial mount (before any URL changes)
  const oauthParamsRef = useRef<{
    client_id: string | null;
    redirect_uri: string | null;
    response_type: string | null;
    scope: string | null;
    state: string | null;
    code_challenge: string | null;
    code_challenge_method: string | null;
  } | null>(null);
  
  // Initialize OAuth params on first render only
  if (oauthParamsRef.current === null) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("oauth") === "true") {
      oauthParamsRef.current = {
        client_id: params.get("client_id"),
        redirect_uri: params.get("redirect_uri"),
        response_type: params.get("response_type"),
        scope: params.get("scope"),
        state: params.get("state"),
        code_challenge: params.get("code_challenge"),
        code_challenge_method: params.get("code_challenge_method"),
      };
      console.log("OAuth params captured:", oauthParamsRef.current);
    }
  }

  // Complete OAuth flow after authentication using cached params
  const completeOAuthFlow = useCallback(async () => {
    const oauthParams = oauthParamsRef.current;
    if (!oauthParams || !oauthParams.client_id || !oauthParams.redirect_uri) {
      console.log("No OAuth params to complete flow with");
      return;
    }
    
    console.log("Completing OAuth flow with params:", oauthParams);
    setOauthRedirecting(true);
    
    try {
      const response = await apiRequest("POST", "/oauth/authorize/complete", {
        client_id: oauthParams.client_id,
        redirect_uri: oauthParams.redirect_uri,
        scope: oauthParams.scope || "openid profile email",
        state: oauthParams.state || "",
        code_challenge: oauthParams.code_challenge || undefined,
        code_challenge_method: oauthParams.code_challenge_method || undefined,
      });
      
      const data = await response.json();
      console.log("OAuth complete response:", data);
      
      if (data.redirect_uri) {
        console.log("Redirecting to:", data.redirect_uri);
        window.location.href = data.redirect_uri;
      } else {
        console.error("OAuth complete response missing redirect_uri:", data);
        setOauthRedirecting(false);
        toast({
          title: "Redirect failed",
          description: "Could not complete the sign-in flow. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("OAuth flow completion error:", error);
      setOauthRedirecting(false);
      toast({
        title: "Authentication error",
        description: "Could not complete the sign-in flow. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Auto-complete OAuth flow when user becomes authenticated
  useEffect(() => {
    console.log("Auth state check - isAuthenticated:", isAuthenticated, "oauthRedirecting:", oauthRedirecting, "hasOAuthParams:", !!oauthParamsRef.current);
    if (isAuthenticated && !oauthRedirecting && oauthParamsRef.current) {
      console.log("User authenticated with OAuth params, completing flow...");
      completeOAuthFlow();
    }
  }, [isAuthenticated, oauthRedirecting, completeOAuthFlow]);
  
  // Redirect authenticated users without OAuth params to account page
  useEffect(() => {
    if (isAuthenticated && !oauthRedirecting && !oauthParamsRef.current) {
      setLocation("/account");
    }
  }, [isAuthenticated, oauthRedirecting, setLocation]);

  const registerForm = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const loginForm = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterUserInput) => {
      const response = await apiRequest("POST", "/api/auth/register", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Account created! :-]",
          description: "Welcome to the CHB ecosystem.",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        refetch();
      } else {
        toast({
          title: "Registration failed",
          description: data.error || "Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginUserInput) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Welcome back! :-]",
          description: "You're now signed in.",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        refetch();
      } else {
        toast({
          title: "Login failed",
          description: data.error || "Please check your credentials.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout");
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      refetch();
      toast({
        title: "Signed out",
        description: "Come back soon! :-]",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const apps = [
    {
      id: "hash",
      name: "Hash",
      url: "https://hash.pink",
      description: "Capture and preserve your personal memories with AI that understands your life story.",
      icon: Brain,
      winWinWin: {
        startup_founders: ["Same AI budget", "Clearer memory capture", "Your data stays yours"],
        content_creators: ["No extra costs", "Rich context for content", "Private by design"],
        memory_capturers: ["Affordable preservation", "Better memory quality", "Family data protected"]
      }
    },
    {
      id: "semi",
      name: "Semi",
      url: "https://semi.pink",
      description: "Get dramatically better AI results while paying the same price and keeping your data private.",
      icon: Zap,
      winWinWin: {
        startup_founders: ["Same token spend", "10x better prompts", "Competitor-proof data"],
        content_creators: ["Same subscription", "Quality-gated outputs", "Creative IP protected"],
        memory_capturers: ["Same price", "Clearer AI responses", "Never trains competitors"]
      }
    },
    {
      id: "pipes",
      name: "Pipes",
      url: null,
      description: "Your personal AI context that travels with you across the entire internet.",
      icon: Key,
      winWinWin: {
        startup_founders: ["No new subscriptions", "Context across all tools", "You control your data"],
        content_creators: ["Free ecosystem", "Style persists everywhere", "Platform independence"],
        memory_capturers: ["No hidden fees", "Family context preserved", "Generational memory"]
      }
    }
  ];

  const perspectiveMessages: Record<string, { headline: string; subheadline: string; wins: string[] }> = {
    startup_founders: {
      headline: "Build Faster with Universal Identity",
      subheadline: "One login across all your AI tools means less friction, more focus on shipping.",
      wins: ["Same budget you're already paying", "Dramatically better AI results", "Your data never trains competitors"]
    },
    content_creators: {
      headline: "Your Creative Identity, Everywhere",
      subheadline: "Seamlessly move between AI tools with your style preferences and creative context intact.",
      wins: ["Same subscription costs", "Higher quality outputs", "Your creative IP stays protected"]
    },
    memory_capturers: {
      headline: "One Key to Your Digital Legacy",
      subheadline: "Secure, simple access to preserve and share your most precious memories across all our apps.",
      wins: ["Same affordable pricing", "Better memory preservation", "Family data stays private forever"]
    }
  };

  const currentMessage = perspectiveMessages[currentPerspective];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12" data-testid="signup-hero">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">
            Create Your Account
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4" data-testid="text-hero-headline">
            {currentMessage.headline}
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto mb-6" data-testid="text-hero-subheadline">
            {currentMessage.subheadline}
          </p>
          
          {/* Win-Win-Win Value Proposition */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto" data-testid="win-win-win-section">
            {currentMessage.wins.map((win, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-sm"
                data-testid={`text-win-${index}`}
              >
                {index === 0 && <DollarSign className="w-3.5 h-3.5 text-green-500" />}
                {index === 1 && <Sparkles className="w-3.5 h-3.5 text-yellow-500" />}
                {index === 2 && <Eye className="w-3.5 h-3.5 text-blue-500" />}
                <span className="text-muted-foreground">{win}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auth Section */}
        <div className="max-w-lg mx-auto mb-16" data-testid="auth-section">
          
          {/* Already logged in state */}
          {isAuthenticated ? (
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg" data-testid="auth-connected">
              {oauthRedirecting ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-redirecting-title">Redirecting... :-]</h3>
                  <p className="text-muted-foreground">
                    Taking you back to your app...
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-connected-title">You're Signed In! :-]</h3>
                  
                  {isEmailAuth && emailUser && (
                    <div className="mb-4">
                      <p className="text-muted-foreground text-sm" data-testid="text-user-email">
                        Signed in as <span className="font-medium">{emailUser.email || emailUser.firstName || 'User'}</span>
                      </p>
                    </div>
                  )}
                  
                  {isNostrAuth && nostrUser && (
                    <div className="mb-4">
                      <p className="text-muted-foreground text-sm" data-testid="text-user-npub">
                        Connected via NOSTR: <span className="font-mono text-xs">{nostrUser.npub?.slice(0, 12)}...{nostrUser.npub?.slice(-8)}</span>
                      </p>
                    </div>
                  )}
                  
                  <p className="text-muted-foreground mb-6">
                    Your universal identity is ready. Access any CHB app below.
                  </p>
                  
                  <Button variant="outline" onClick={handleLogout} className="gap-2" data-testid="button-logout">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Primary: Email/Password Form */}
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 shadow-lg" data-testid="auth-email-section">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {authMode === "register" ? "Create an Account" : "Welcome Back"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {authMode === "register" ? "Join the CHB ecosystem" : "Sign in to continue"}
                    </p>
                  </div>
                </div>
                
                {/* Auth Mode Toggle */}
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={authMode === "register" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setAuthMode("register");
                      loginForm.reset();
                    }}
                    className="flex-1"
                    data-testid="button-mode-register"
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant={authMode === "login" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setAuthMode("login");
                      registerForm.reset();
                    }}
                    className="flex-1"
                    data-testid="button-mode-login"
                  >
                    Sign In
                  </Button>
                </div>

                {authMode === "register" && (
                  <Form {...registerForm} key="register-form">
                    <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane" {...field} data-testid="input-first-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} data-testid="input-last-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="At least 8 characters" {...field} data-testid="input-password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        className="w-full gap-2"
                        size="lg"
                        disabled={registerMutation.isPending}
                        data-testid="button-register"
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <User className="w-5 h-5" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
                
                {authMode === "login" && (
                  <Form {...loginForm} key="login-form">
                    <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" {...field} data-testid="input-login-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Your password" {...field} data-testid="input-login-password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        className="w-full gap-2"
                        size="lg"
                        disabled={loginMutation.isPending}
                        data-testid="button-login"
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <User className="w-5 h-5" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Your data stays private. We never share or sell your information.
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Alternative: NOSTR Login */}
              <div className="bg-card border border-border rounded-2xl p-6" data-testid="auth-nostr-section">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Key className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sign in with NOSTR</h3>
                      <p className="text-sm text-muted-foreground">For privacy enthusiasts</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  Use your cryptographic NOSTR identity for maximum privacy. Your keys, your identity.
                </p>
                
                <div className="flex justify-center mb-4" data-testid="nostr-login-container">
                  <NostrLoginButton />
                </div>

                {/* What is NOSTR? Explainer */}
                <Collapsible open={nostrExplainerOpen} onOpenChange={setNostrExplainerOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground" data-testid="button-nostr-explainer">
                      <HelpCircle className="w-4 h-4" />
                      What is NOSTR?
                      {nostrExplainerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4" data-testid="nostr-explainer-content">
                    <div className="bg-muted/50 rounded-xl p-4 text-sm space-y-3">
                      <p className="font-medium">NOSTR is a decentralized identity protocol</p>
                      <p className="text-muted-foreground">
                        Instead of usernames and passwords, NOSTR uses cryptographic key pairs. 
                        You own your identity - no company can lock you out or take it away.
                      </p>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="font-medium mb-2">Quick Start (2 minutes):</p>
                        <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                          <li>Install the <a href="https://getalby.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Alby browser extension</a> (free)</li>
                          <li>Create a new NOSTR identity (Alby guides you)</li>
                          <li>Click "Login with NOSTR" above</li>
                          <li>Approve the signature request in Alby</li>
                        </ol>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="font-medium mb-1">Why use NOSTR?</p>
                        <ul className="text-muted-foreground space-y-1">
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Your private key never leaves your device</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Works across thousands of NOSTR apps</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>No email, no password, no account recovery needed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}
        </div>

        {/* Apps Section */}
        <div className="mb-16" data-testid="apps-section">
          <h2 className="text-2xl font-bold text-center mb-4" data-testid="text-apps-title">Access All CHB Apps</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            One identity unlocks our entire ecosystem. Your context and preferences follow you everywhere.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app) => (
              <div 
                key={app.id}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all"
                data-testid={`card-app-${app.id}`}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <app.icon className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                
                <h3 className="text-lg font-semibold mb-1" data-testid={`text-app-name-${app.id}`}>{app.name}</h3>
                <p className="text-muted-foreground text-sm mb-3" data-testid={`text-app-desc-${app.id}`}>{app.description}</p>
                
                <div className="space-y-1 mb-3 text-xs">
                  {app.winWinWin[currentPerspective as keyof typeof app.winWinWin].map((win, i) => (
                    <div key={i} className="flex items-center gap-2" data-testid={`text-app-win-${app.id}-${i}`}>
                      <Check className="w-3 h-3 flex-shrink-0" style={{ color: primaryColor }} />
                      <span className="text-muted-foreground">{win}</span>
                    </div>
                  ))}
                </div>
                
                {app.url ? (
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: primaryColor }}
                    data-testid={`link-app-${app.id}`}
                  >
                    Visit {app.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground" data-testid={`text-coming-soon-${app.id}`}>
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Questions about signing up?
          </p>
          <Link href="/contact">
            <Button variant="outline" className="gap-2" data-testid="button-contact">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
