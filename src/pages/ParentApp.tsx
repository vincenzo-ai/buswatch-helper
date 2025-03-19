
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import BusMap from '@/components/BusMap';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';
import { 
  ArrowLeft, Users, Clock, Bell, MapPin, Phone, 
  ChevronRight, Bus, Navigation2, School
} from 'lucide-react';
import { toast } from "sonner";

const CHILDREN = [
  { id: 1, name: "Emma", grade: "3rd Grade", stop: "Parkside Neighborhood", time: "7:35 AM" },
];

const DRIVER_INFO = {
  name: "John Smith",
  busNumber: "42",
  phone: "(555) 123-4567",
};

const ROUTE_INFO = {
  eta: "12 min",
  distance: "2.5 mi",
  nextStop: "Parkside Neighborhood",
  finalStop: "Lincoln Elementary School",
  status: "active" as const,
};

const ParentApp = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(12); // in minutes
  const [busActive, setBusActive] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate bus movement by decreasing time remaining
    if (busActive && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime === 5 && notificationsEnabled) {
            toast("Bus arriving soon!", {
              description: "The bus will arrive at the stop in about 5 minutes.",
              icon: <Bus size={18} />
            });
          }
          return newTime;
        });
      }, 30000); // Update every 30 seconds in this demo
      return () => clearInterval(interval);
    }
  }, [busActive, timeRemaining, notificationsEnabled]);

  // Show arrival notification when time reaches 0
  useEffect(() => {
    if (timeRemaining === 0 && notificationsEnabled) {
      toast("Bus has arrived!", {
        description: "The bus has arrived at Parkside Neighborhood stop.",
        icon: <MapPin size={18} />
      });
      setBusActive(false);
    }
  }, [timeRemaining, notificationsEnabled]);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    toast(notificationsEnabled ? "Notifications disabled" : "Notifications enabled", {
      description: notificationsEnabled 
        ? "You will no longer receive bus notifications." 
        : "You will now receive bus arrival notifications.",
    });
  };

  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return "Arrived";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <Logo size="sm" />
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
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <GlassCard className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-medium">Johnson Family</h2>
                <p className="text-sm text-muted-foreground">{CHILDREN.length} child tracked</p>
              </div>
            </div>
            <Link to="#" className="text-sm text-primary hover:underline">Manage</Link>
          </GlassCard>
        </Motion>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Motion className="animate-slide-up order-2 md:order-1">
            <div className="flex flex-col gap-6 h-full">
              {/* ETA Information */}
              <GlassCard>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock size={20} className={busActive ? "text-primary animate-pulse" : "text-muted-foreground"} />
                    <h3 className="font-medium">Estimated Arrival</h3>
                  </div>
                  <StatusBadge status={timeRemaining > 0 ? "active" : "completed"} size="sm" />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-start">
                    <span className="text-3xl font-bold mr-1">{formatTimeRemaining(timeRemaining)}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{ROUTE_INFO.nextStop}</p>
                    <p className="text-xs text-muted-foreground">Next stop</p>
                  </div>
                </div>

                <div className="relative h-2 bg-gray-100 rounded-full mb-4">
                  <div 
                    className={cn(
                      "absolute h-full left-0 top-0 rounded-full transition-all duration-1000",
                      busActive ? "bg-primary" : "bg-green-500",
                    )}
                    style={{ width: `${100 - (timeRemaining / 12 * 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bus size={14} />
                    <span>Current Location</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <School size={14} />
                    <span>{ROUTE_INFO.finalStop}</span>
                  </div>
                </div>
              </GlassCard>

              {/* Children Information */}
              <GlassCard>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={20} className="text-primary" />
                  <h3 className="font-medium">Your Children</h3>
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
                      <span>Stop: {child.stop}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      <span>Pickup time: {child.time}</span>
                    </div>
                  </div>
                ))}
              </GlassCard>

              {/* Driver Information */}
              <GlassCard className="mt-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Bus size={20} className="text-primary" />
                  <h3 className="font-medium">Bus Information</h3>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-medium">{DRIVER_INFO.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Bus Number</p>
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
            <BusMap>
              <GlassCard className="animate-slide-up" padding="sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation2 size={18} className="text-primary" />
                    <div>
                      <p className="font-medium text-sm">{ROUTE_INFO.distance} away</p>
                      <p className="text-xs text-muted-foreground">Next: {ROUTE_INFO.nextStop}</p>
                    </div>
                  </div>
                  <StatusBadge status={timeRemaining > 0 ? "active" : "completed"} size="sm" />
                </div>
              </GlassCard>
            </BusMap>
          </Motion>
        </div>
      </main>
    </div>
  );
};

export default ParentApp;
