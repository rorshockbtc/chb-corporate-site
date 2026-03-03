import { Eye } from "lucide-react";
import { usePerspective } from "@/hooks/use-perspective";
import { usePerspectiveTheme } from "@/hooks/use-perspective-theme";
import type { Perspective } from "@/types/content";

export function PerspectiveSelector() {
  const { currentPerspective, setPerspective } = usePerspective();
  const { theme } = usePerspectiveTheme();

  const perspectives: { key: Perspective; label: string; color: string }[] = [
    { key: "startup_founders", label: "Startup Founders", color: "#01A9F4" },
    { key: "content_creators", label: "Content Creators", color: "hsl(328, 85%, 70%)" },
    { key: "memory_capturers", label: "Memory Capturers", color: "hsl(142, 76%, 36%)" },
  ];
  
  const currentPerspectiveData = perspectives.find(p => p.key === currentPerspective);

  return (
    <div 
      className={`fixed top-20 left-6 z-50 backdrop-blur-sm rounded-lg p-3 shadow-xl max-w-[140px] ${
        currentPerspective === 'memory_capturers' 
          ? 'bg-white/40 border border-amber-200/40' 
          : 'bg-white/40'
      }`}
      data-testid="perspective-selector-menu"
    >
      <div className="flex items-center space-x-2 mb-3">
        <div 
          className="p-1 rounded-full" 
          style={{ backgroundColor: currentPerspectiveData?.color }}
        >
          <Eye className="text-white" size={12} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Perspective</span>
          <span className="text-sm font-medium">{currentPerspectiveData?.label}</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {perspectives.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPerspective(key)}
            className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
              currentPerspective === key
                ? "text-white"
                : "hover:bg-muted"
            }`}
            style={{
              backgroundColor: currentPerspective === key ? perspectives.find(p => p.key === key)?.color : undefined
            }}
            data-testid={`perspective-option-${key}`}
            aria-pressed={currentPerspective === key}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
