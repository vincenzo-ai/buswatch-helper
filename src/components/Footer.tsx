
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <div className={cn("text-center py-4 text-xs text-muted-foreground", className)}>
      designed and created by Vincenzo C
    </div>
  );
};

export default Footer;
