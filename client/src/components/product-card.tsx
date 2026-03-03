import { ExternalLink, BookOpen } from "lucide-react";
import { usePerspectiveContent, usePerspective } from "@/hooks/use-perspective";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Product } from "@/types/content";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isTransitioning } = usePerspective();
  const description = usePerspectiveContent(product.description);
  const features = usePerspectiveContent(product.features);
  
  const getDeepDiveButton = (productId: string, textColorClass: string) => {
    // Deep dive pages
    const deepDivePages: Record<string, { url: string; label: string; available: boolean }> = {
      hash: { url: "/hash-deep-dive", label: "Read Deep Dive", available: false },
      semi: { url: "/semi-deep-dive", label: "Read Deep Dive", available: false },
      scout: { url: "/scout", label: "Learn More", available: true },
      chb: { url: "/chb-case-study", label: "Read Deep Dive", available: true }
    };

    const pageInfo = deepDivePages[productId];
    
    // If product has an available deep dive page
    if (pageInfo?.available) {
      return (
        <Link href={pageInfo.url}>
          <Button 
            size="sm" 
            variant="outline" 
            className={`justify-start text-xs ${textColorClass}`}
            data-testid={`deep-dive-${productId}`}
          >
            <BookOpen className="mr-2 h-3 w-3" />
            {pageInfo.label}
          </Button>
        </Link>
      );
    }

    // For pipes, show coming soon
    if (productId === "pipes") {
      return (
        <Button 
          size="sm" 
          variant="outline" 
          disabled 
          className="justify-start text-xs"
          data-testid={`deep-dive-coming-soon-${productId}`}
        >
          <BookOpen className="mr-2 h-3 w-3" />
          Deep Dive Coming Soon
        </Button>
      );
    }

    // For other products without deep dives, show coming soon
    return (
      <Button 
        size="sm" 
        variant="ghost" 
        disabled 
        className="justify-start text-xs opacity-50"
        data-testid={`deep-dive-coming-soon-${productId}`}
      >
        <BookOpen className="mr-2 h-3 w-3" />
        Deep Dive Coming Soon
      </Button>
    );
  };

  // Fixed brand colors for products - never change with perspectives for playfulness
  const colorClassMap = {
    primary: "bg-brand-pink text-white",
    secondary: "bg-brand-yellow text-black", 
    quaternary: "bg-brand-blue text-white",
    accent: "bg-brand-green text-black",
  } as const;
  
  const textColorClassMap = {
    primary: "text-brand-pink",
    secondary: "text-brand-yellow-dark",
    quaternary: "text-brand-blue",
    accent: "text-brand-green-dark",
  } as const;

  const colorClass = colorClassMap[product.color as keyof typeof colorClassMap] || colorClassMap.primary;
  const textColorClass = textColorClassMap[product.color as keyof typeof textColorClassMap] || textColorClassMap.primary;

  return (
    <div className="product-card bg-card rounded-xl p-6">
      <div className="mb-4">
        <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mb-4`}>
          <span className="text-2xl font-bold">{product.symbol}</span>
        </div>
        <h3 className="text-xl font-bold mb-2" data-testid={`product-title-${product.id}`}>
          {product.name}
        </h3>
      </div>

      <div className={`space-y-4 perspective-content ${isTransitioning ? 'transitioning' : ''}`}>
        <p className="text-muted-foreground" data-testid={`product-description-${product.id}`}>
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-1 h-1 ${colorClass} rounded-full`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-3 mt-4">
          {product.url && product.url !== "#" ? (
            product.url.startsWith("/") ? (
              <Link
                href={product.url}
                className={`inline-flex items-center space-x-2 ${textColorClass} hover:opacity-80 transition-opacity`}
                data-testid={`product-link-${product.id}`}
              >
                <span>Learn about {product.name}</span>
                <span className="text-xs">→</span>
              </Link>
            ) : (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-2 ${textColorClass} hover:opacity-80 transition-opacity`}
                data-testid={`product-link-${product.id}`}
              >
                <span>Try {product.name}</span>
                <ExternalLink size={12} />
              </a>
            )
          ) : product.url === "#" ? (
            <span className="inline-flex items-center space-x-2 text-muted-foreground/60 text-sm">
              <span>Coming Soon</span>
            </span>
          ) : (
            <span className={`inline-flex items-center space-x-2 ${textColorClass}`}>
              <span>Integrated in ecosystem</span>
            </span>
          )}
          
          {/* Deep Dive Buttons */}
          {getDeepDiveButton(product.id, textColorClass)}
        </div>
      </div>
    </div>
  );
}
