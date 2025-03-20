
import { Link } from 'react-router-dom';
import { Motion } from '@/components/AnimatePresence';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const NotFound = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
    <header className="p-4 flex items-center justify-between border-b border-border">
      <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Torna alla Home</span>
      </Link>
      <Logo size="sm" />
      <div className="w-9"></div>
    </header>

    <main className="flex-1 p-4 flex items-center justify-center">
      <Motion className="max-w-md w-full text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Pagina non trovata</h2>
        <p className="text-muted-foreground mb-6">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block"
        >
          Torna alla Home
        </Link>
      </Motion>
    </main>

    <Footer />
  </div>
);

export default NotFound;
