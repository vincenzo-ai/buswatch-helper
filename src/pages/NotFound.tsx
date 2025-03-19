
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Motion } from '@/components/AnimatePresence';
import GlassCard from '@/components/GlassCard';
import Logo from '@/components/Logo';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <Motion className="w-full max-w-md">
        <GlassCard className="text-center animate-fade-in">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! We couldn't find that page
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={18} />
            Return Home
          </Link>
        </GlassCard>
      </Motion>
    </div>
  );
};

export default NotFound;
