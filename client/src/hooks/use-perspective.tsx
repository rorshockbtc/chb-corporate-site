import { createContext, useContext, useState, ReactNode } from "react";
import type { Perspective } from "@/types/content";

interface PerspectiveContextType {
  currentPerspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  isTransitioning: boolean;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const [currentPerspective, setCurrentPerspective] = useState<Perspective>(() => {
    // Load from localStorage on initialization
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chb-perspective");
      if (saved && ["startup_founders", "content_creators", "memory_capturers"].includes(saved)) {
        return saved as Perspective;
      }
    }
    return "startup_founders";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setPerspective = (perspective: Perspective) => {
    if (currentPerspective === perspective) return;
    
    setIsTransitioning(true);
    
    // Add a small delay to allow for smooth transitions
    setTimeout(() => {
      setCurrentPerspective(perspective);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("chb-perspective", perspective);
      }
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <PerspectiveContext.Provider value={{ currentPerspective, setPerspective, isTransitioning }}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const context = useContext(PerspectiveContext);
  if (context === undefined) {
    throw new Error("usePerspective must be used within a PerspectiveProvider");
  }
  return context;
}

// Hook for perspective-aware content
export function usePerspectiveContent<T extends Record<Perspective, any>>(content: T): T[Perspective] {
  const { currentPerspective } = usePerspective();
  return content[currentPerspective];
}
