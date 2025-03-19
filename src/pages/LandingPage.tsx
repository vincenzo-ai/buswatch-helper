import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import { Bus, UserCircle, CheckCircle, ArrowRight, MapPin } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<'parent' | 'driver'>('parent');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 md:p-6 flex items-center justify-between">
        <Logo />
        <div className="flex gap-2">
          <Link 
            to="/parent" 
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Accesso Genitori
          </Link>
          <Link 
            to="/driver" 
            className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Accesso Autisti
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 md:px-6 md:py-16">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Motion className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">BusTracker Italia</h1>
            </Motion>
            <Motion className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                La tua soluzione affidabile per monitorare il bus scolastico dei tuoi bambini in tempo reale.
              </p>
            </Motion>
          </div>

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
                  <Link 
                    to="/parent"
                    className="flex items-center gap-2 w-fit px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Accedi come Genitore <ArrowRight size={16} />
                  </Link>
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
                  <Link 
                    to="/driver"
                    className="flex items-center gap-2 w-fit px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Accedi come Autista <ArrowRight size={16} />
                  </Link>
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
                  style={{ animationDelay: `${index * 100}ms` }}
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
                  style={{ animationDelay: `${index * 100}ms` }}
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
                <Link
                  to="/parent"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Accedi come Genitore
                </Link>
                <Link
                  to="/driver"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Accedi come Autista
                </Link>
              </div>
            </div>
          </Motion>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-6 md:px-6 md:py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo size="sm" />
            <span className="text-sm text-muted-foreground">© 2023 BusTracker Italia</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termini di Servizio
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contatti
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
