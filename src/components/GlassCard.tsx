
import { cn } from "@/lib/utils";
import { Motion } from '@/components/AnimatePresence';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  animate?: "fade" | "slide" | "scale" | "none";
}

const GlassCard = ({ 
  children, 
  className, 
  padding = "md",
  animate = "none"
}: GlassCardProps) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const animationClasses = {
    fade: "animate-fade-in",
    slide: "animate-slide-up",
    scale: "animate-scale-in",
    none: "",
  };

  return (
    <Motion className={cn(
      "glass-card rounded-xl shadow-sm",
      paddingClasses[padding],
      animationClasses[animate],
      className
    )}>
      {children}
    </Motion>
  );
};

export default GlassCard;
