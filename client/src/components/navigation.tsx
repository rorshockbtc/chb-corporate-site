import { useState } from 'react';
import { Link, useLocation } from "wouter";
import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import { useAuth } from "@/hooks/useAuth";
import { useNostrAuth } from "@/hooks/use-nostr-auth";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Menu, X, User } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const { currentPerspective, setPerspective } = usePerspective();
  const { getThemeColor } = usePerspectiveTheme();
  const { isAuthenticated: isEmailAuth } = useAuth();
  const { isAuthenticated: isNostrAuth } = useNostrAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAuthenticated = isEmailAuth || isNostrAuth;
  
  // Get current perspective colors for eye icon container
  const containerColor = getThemeColor('secondary');

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/contact", label: "Contact" },
  ];

  const perspectives = [
    { id: "startup_founders" as const, label: "Startup Founders" },
    { id: "content_creators" as const, label: "Content Creators" },
    { id: "memory_capturers" as const, label: "Memory Capturers" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Single unified masthead - premium and functional */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border/30 nav-backdrop">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo with integrated perspective switcher */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl tracking-wide" data-testid="logo-link">
                <span className="font-medium">colon</span>
                <span className="font-extralight">hyphen</span>
                <span className="font-medium">bracket</span>
              </Link>
              
              {/* Enhanced perspective switcher - colored container shows it drives functionality */}
              {/* Hidden on mobile to avoid redundancy with hamburger menu */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 hover:bg-transparent" 
                      aria-label="Change perspective"
                      data-testid="perspective-switcher"
                    >
                      {/* Perspective-colored container with white icon for visibility */}
                      <div 
                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md" 
                        style={{
                          backgroundColor: containerColor,
                          border: `1px solid ${containerColor}`,
                        }}
                      >
                        <Eye className="h-4 w-4 text-white drop-shadow-sm" />
                      </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <div className="p-1">
                    {perspectives.map((p) => (
                      <DropdownMenuItem
                        key={p.id}
                        onClick={() => setPerspective(p.id)}
                        className={`cursor-pointer ${
                          currentPerspective === p.id ? "bg-secondary text-secondary-foreground" : ""
                        }`}
                        data-testid={`perspective-option-${p.id}`}
                      >
                        {p.label}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            </div>
            
            {/* Main navigation - spacious and clean */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-base font-light hover:text-primary transition-colors ${
                    location === href ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                  data-testid={`nav-${label.toLowerCase()}`}
                >
                  {label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium text-sm flex items-center gap-2"
                  data-testid="account-button"
                >
                  <User className="h-4 w-4" />
                  Account
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium text-sm"
                  data-testid="signup-button"
                >
                  Sign Up
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                data-testid="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu dropdown - full navigation and perspective access */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/30" id="mobile-menu">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-col space-y-4">
              {/* Navigation links */}
              <div className="flex flex-col space-y-3">
                {navItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block w-full py-2 text-base font-light hover:text-primary transition-colors ${
                      location === href ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${label.toLowerCase()}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              
              {/* Perspective selector for mobile */}
              <div className="border-t border-border/30 pt-4">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Perspective</p>
                <div className="space-y-2">
                  {perspectives.map((p) => (
                    <Button
                      key={p.id}
                      onClick={() => {
                        setPerspective(p.id);
                        setIsMobileMenuOpen(false);
                      }}
                      variant={currentPerspective === p.id ? "default" : "ghost"}
                      className="w-full justify-start text-left"
                      data-testid={`mobile-perspective-${p.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-account-button"
                >
                  <User className="h-4 w-4" />
                  Account
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="block px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium text-sm text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-signup-button"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
