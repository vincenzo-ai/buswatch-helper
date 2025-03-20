import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import MapboxMap from '@/components/MapboxMap';
import GlassCard from '@/components/GlassCard';
import TimerCard from '@/components/TimerCard';
import MapLocationCard from '@/components/MapLocationCard';
import { ArrowLeft, Users, Bell, Phone, ChevronRight, Bus, UserPlus, MapPin } from 'lucide-react';
import { toast } from "sonner";
import Footer from '@/components/Footer';

const CHILDREN = [
  { id: 1, name: "Emma", grade: "3ª Elementare", stop: "Quartiere Parkside", time: "7:35" },
];

const DRIVER_INFO = {
  name: "Giovanni Rossi",
  busNumber: "42",
  phone: "333 123 4567",
};

const ROUTE_INFO = {
  eta: "12 min",
  distance: "2.5 km",
  nextStop: "Quartiere Parkside",
  finalStop: "Scuola Elementare Lincoln",
  status: "active" as const,
};

const ParentApp = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(12); // in minuti
  const [busActive, setBusActive] = useState(true);

  useEffect(() => {
    // Simula movimento del bus diminuendo il tempo rimanente
    if (busActive && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime === 5 && notificationsEnabled) {
            toast("Bus in arrivo!", {
              description: "Il bus arriverà alla fermata tra circa 5 minuti.",
              icon: <Bus size={18} />
            });
          }
          return newTime;
        });
      }, 30000); // Aggiorna ogni 30 secondi in questa demo
      return () => clearInterval(interval);
    }
  }, [busActive, timeRemaining, notificationsEnabled]);

  // Mostra notifica di arrivo quando il tempo raggiunge 0
  useEffect(() => {
    if (timeRemaining === 0 && notificationsEnabled) {
      toast("Bus arrivato!", {
        description: "Il bus è arrivato alla fermata Quartiere Parkside.",
        icon: <MapPin size={18} />
      });
      setBusActive(false);
    }
  }, [timeRemaining, notificationsEnabled]);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    toast(notificationsEnabled ? "Notifiche disattivate" : "Notifiche attivate", {
      description: notificationsEnabled 
        ? "Non riceverai più notifiche relative al bus." 
        : "Riceverai notifiche sull'arrivo del bus.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Indietro</span>
        </Link>
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <button
            onClick={toggleNotifications}
            className={cn(
              "p-2 rounded-full transition-colors",
              notificationsEnabled 
                ? "bg-primary/10 text-primary" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <Bell size={18} />
          </button>
          <Link 
            to="/child-profile" 
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <UserPlus size={18} />
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <GlassCard className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-medium">Famiglia Bianchi</h2>
                <p className="text-sm text-muted-foreground">{CHILDREN.length} bambino monitorato</p>
              </div>
            </div>
            <Link to="#" className="text-sm text-primary hover:underline">Gestisci</Link>
          </GlassCard>
        </Motion>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Motion className="animate-slide-up order-2 md:order-1">
            <div className="flex flex-col gap-6 h-full">
              {/* Timer Card */}
              <TimerCard
                timeRemaining={timeRemaining}
                nextStop={ROUTE_INFO.nextStop}
                finalStop={ROUTE_INFO.finalStop}
                isActive={busActive}
              />

              {/* Informazioni Bambini */}
              <GlassCard>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={20} className="text-primary" />
                  <h3 className="font-medium">I tuoi Bambini</h3>
                </div>
                
                {CHILDREN.map(child => (
                  <div key={child.id} className="rounded-lg border border-border p-3 mb-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{child.name}</h4>
                        <p className="text-sm text-muted-foreground">{child.grade}</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {child.name[0]}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      <span>Fermata: {child.stop}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Bell size={14} className="text-primary" />
                      <span>Orario ritiro: {child.time}</span>
                    </div>
                  </div>
                ))}
              </GlassCard>

              {/* Informazioni Autista */}
              <GlassCard className="mt-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Bus size={20} className="text-primary" />
                  <h3 className="font-medium">Informazioni Bus</h3>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Autista</p>
                    <p className="font-medium">{DRIVER_INFO.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Numero Bus</p>
                    <p className="font-medium">#{DRIVER_INFO.busNumber}</p>
                  </div>
                </div>
                
                <button className="flex items-center justify-between w-full p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-primary" />
                    <span>{DRIVER_INFO.phone}</span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              </GlassCard>
            </div>
          </Motion>

          <Motion className="animate-scale-in order-1 md:order-2 aspect-square md:aspect-auto h-[300px] md:h-auto">
            <MapboxMap>
              <MapLocationCard
                distance={ROUTE_INFO.distance}
                nextStop={ROUTE_INFO.nextStop}
                status={timeRemaining > 0 ? "active" : "completed"}
                className="animate-slide-up"
              />
            </MapboxMap>
          </Motion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParentApp;
