import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import AuthDialog from '@/components/AuthDialog';
import { Bus, UserCircle, CheckCircle, MapPin, LogIn, Key, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { driverDemoAccount, parentDemoAccount } from '@/lib/demoAccounts';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: <Bus className="text-primary h-6 w-6" />,
    title: "Tracciamento in tempo reale",
    description: "Monitora il bus del tuo bambino con aggiornamenti di posizione in tempo reale e notifiche di arrivo."
  },
  {
    icon: <UserCircle className="text-primary h-6 w-6" />,
    title: "Profili sicuri",
    description: "Gestisci i profili dei tuoi bambini e ricevi notifiche personalizzate per ciascun bambino."
  },
  {
    icon: <CheckCircle className="text-primary h-6 w-6" />,
    title: "Sicurezza e tranquillità",
    description: "Sapere esattamente quando il bus arriverà ti offre tranquillità e aiuta a pianificare la tua giornata."
  },
];

const STEPS = [
  "Registra il tuo profilo come genitore",
  "Aggiungi i profili dei tuoi bambini",
  "Visualizza il percorso del bus in tempo reale",
  "Ricevi notifiche quando il bus è in arrivo"
];

const LandingPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'driver' | 'parent'>('parent');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { toast } = useToast();
  const navigate = useNavigate();

  const openAuth = (type: 'driver' | 'parent', mode: 'login' | 'register') => {
    setAuthType(type);
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const loginWithDemo = (type: 'driver' | 'parent') => {
    const account = type === 'driver' ? driverDemoAccount : parentDemoAccount;
    
    toast({
      title: "Account demo",
      description: `Accesso con account ${type === 'driver' ? 'autista' : 'genitore'} demo`
    });
    
    const redirectPath = type === 'driver' ? '/driver' : '/parent';
    navigate(redirectPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 md:p-6 flex items-center justify-between">
        <Logo />
        <div className="flex gap-2">
          <button 
            onClick={() => openAuth('parent', 'login')}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Area Genitori
          </button>
          <button 
            onClick={() => openAuth('driver', 'login')}
            className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Area Autisti
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 md:px-6 md:py-16">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Motion className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Ti Accompagno</h1>
            </Motion>
            <Motion className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                La tua soluzione affidabile per monitorare il bus scolastico dei tuoi bambini in tempo reale.
              </p>
            </Motion>
          </div>

          {/* Demo account banner */}
          <Motion className="mb-10 animate-fade-in">
            <div className="w-full max-w-2xl mx-auto p-4 bg-blue-50 rounded-xl border border-blue-200 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Demo Account</h2>
              <p className="text-blue-700 mb-4 text-center">
                Prova tutte le funzionalità dell'app con i nostri account demo preconfigurati
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                <Button 
                  onClick={() => loginWithDemo('parent')}
                  className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  <Key className="h-4 w-4" />
                  Genitore Demo
                </Button>
                <Button 
                  onClick={() => loginWithDemo('driver')}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2"
                >
                  <Key className="h-4 w-4" />
                  Autista Demo
                </Button>
              </div>
            </div>
          </Motion>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <Motion className="animate-slide-up">
              <div className="rounded-xl overflow-hidden h-[350px] md:h-[450px] bg-[url('https://images.unsplash.com/photo-1557223562-6c77ef16210f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center">
                <div className="w-full h-full flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div 
                    className="p-2 px-4 rounded-full text-white text-sm font-medium bg-primary/90 backdrop-blur-sm w-fit mb-2"
                  >
                    Per Genitori
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Monitora il bus dei tuoi bambini</h2>
                  <p className="text-white/90 mb-4">
                    Segui in tempo reale il percorso del bus e ricevi notifiche quando sta per arrivare.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => openAuth('parent', 'login')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                      Accedi / Registrati
                    </button>
                  </div>
                </div>
              </div>
            </Motion>

            <Motion className="animate-slide-up delay-100">
              <div className="rounded-xl overflow-hidden h-[350px] md:h-[450px] bg-[url('https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center">
                <div className="w-full h-full flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div 
                    className="p-2 px-4 rounded-full text-white text-sm font-medium bg-secondary/90 backdrop-blur-sm w-fit mb-2"
                  >
                    Per Autisti
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Gestisci il tuo percorso</h2>
                  <p className="text-white/90 mb-4">
                    Condividi la tua posizione e tieni i genitori informati sul tuo percorso.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => openAuth('driver', 'login')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                      Accedi / Registrati
                    </button>
                  </div>
                </div>
              </div>
            </Motion>
          </div>

          <div className="mb-16">
            <Motion className="text-center mb-10 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Caratteristiche principali</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Offriamo strumenti avanzati per rendere il trasporto scolastico più sicuro e trasparente.
              </p>
            </Motion>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <Motion 
                  key={index} 
                  className="animate-fade-in" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="border border-border rounded-xl p-6 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Motion>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <Motion className="text-center mb-10 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Come funziona</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Iniziare a utilizzare BusTracker è semplice e veloce.
              </p>
            </Motion>

            <div className="max-w-2xl mx-auto relative border-l-2 border-primary/30 ml-4 md:ml-8 pl-8 py-4">
              {STEPS.map((step, index) => (
                <Motion 
                  key={index} 
                  className="mb-8 last:mb-0 animate-fade-in" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute left-0 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Passo {index + 1}</h3>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                </Motion>
              ))}
            </div>
          </div>

          <Motion className="animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto per iniziare?</h2>
              <p className="text-muted-foreground mb-6">
                Scegli se accedere come genitore o come autista e inizia subito a utilizzare BusTracker.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => openAuth('parent', 'register')}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Inizia come Genitore
                </button>
                <button
                  onClick={() => openAuth('driver', 'register')}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                >
                  Inizia come Autista
                </button>
              </div>
            </div>
          </Motion>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-6 md:px-6 md:py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo size="sm" />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/termini-di-servizio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termini di Servizio
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/contatti" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contatti
            </Link>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ShieldAlert size={14} />
              Admin
            </Link>
          </div>
        </div>
      </footer>
      
      <AuthDialog 
        isOpen={isAuthOpen} 
        onOpenChange={setIsAuthOpen} 
        initialUserType={authType}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;
