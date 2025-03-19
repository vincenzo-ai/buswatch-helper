
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import BusMap from '@/components/BusMap';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';
import { ArrowLeft, Bus, RadioTower, Battery, SignalHigh, User, MapPin, Clock } from 'lucide-react';

type RouteStatus = 'idle' | 'active' | 'completed';

const ROUTE_INFO = {
  name: "Morning Route - Lincoln Elementary",
  stops: [
    { name: "Parkside Neighborhood", time: "7:30 AM", completed: false },
    { name: "Hillcrest Avenue", time: "7:40 AM", completed: false },
    { name: "Oakwood Lane", time: "7:50 AM", completed: false },
    { name: "Lincoln Elementary School", time: "8:10 AM", completed: false },
  ]
};

const DriverApp = () => {
  const [routeStatus, setRouteStatus] = useState<RouteStatus>('idle');
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [battery, setBattery] = useState(87);
  const [signal, setSignal] = useState(4);
  const [currentStopIndex, setCurrentStopIndex] = useState(-1);
  const [stopProgress, setStopProgress] = useState<boolean[]>(
    Array(ROUTE_INFO.stops.length).fill(false)
  );

  // Simulate battery drain
  useEffect(() => {
    if (isSharingLocation) {
      const interval = setInterval(() => {
        setBattery(prev => Math.max(prev - 1, 10));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isSharingLocation]);

  // Simulate signal fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSignal(Math.floor(Math.random() * 2) + 3); // 3 or 4 bars
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleLocationSharing = () => {
    if (isSharingLocation) {
      setIsSharingLocation(false);
      setRouteStatus('idle');
      setCurrentStopIndex(-1);
      setStopProgress(Array(ROUTE_INFO.stops.length).fill(false));
    } else {
      setIsSharingLocation(true);
      setRouteStatus('active');
      setCurrentStopIndex(0);
    }
  };

  const markStopAsCompleted = (index: number) => {
    if (index === currentStopIndex) {
      const newStopProgress = [...stopProgress];
      newStopProgress[index] = true;
      setStopProgress(newStopProgress);
      
      // If there are more stops, move to the next one
      if (index < ROUTE_INFO.stops.length - 1) {
        setCurrentStopIndex(index + 1);
      } else {
        // Route completed
        setRouteStatus('completed');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <SignalHigh size={16} className={signal < 3 ? "text-destructive" : ""} />
            <span>{signal}G</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Battery size={16} className={battery < 20 ? "text-destructive" : ""} />
            <span>{battery}%</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <GlassCard className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-medium">John Driver</h2>
                <p className="text-sm text-muted-foreground">Bus #42</p>
              </div>
            </div>
            <StatusBadge status={routeStatus} />
          </GlassCard>
        </Motion>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Motion className="animate-fade-in order-2 md:order-1">
            <div className="flex flex-col gap-6 h-full">
              <GlassCard>
                <div className="flex items-center gap-3 mb-4">
                  <Bus size={20} className="text-primary" />
                  <h2 className="font-medium">Route Details</h2>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium">{ROUTE_INFO.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ROUTE_INFO.stops.length} stops · Approx. 40 min
                  </p>
                </div>
                <div className="space-y-4">
                  {ROUTE_INFO.stops.map((stop, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-all",
                        stopProgress[index] 
                          ? "bg-green-50 border-green-200" 
                          : index === currentStopIndex && routeStatus === 'active'
                            ? "bg-blue-50 border-blue-200 animate-pulse"
                            : "bg-transparent border-border"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          stopProgress[index] 
                            ? "bg-green-100 text-green-700" 
                            : index === currentStopIndex && routeStatus === 'active'
                              ? "bg-blue-100 text-blue-700"
                              : "bg-muted text-muted-foreground"
                        )}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{stop.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock size={14} />
                            <span>{stop.time}</span>
                          </div>
                        </div>
                      </div>
                      {index === currentStopIndex && routeStatus === 'active' && !stopProgress[index] && (
                        <button
                          onClick={() => markStopAsCompleted(index)}
                          className="text-sm px-3 py-1 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      {stopProgress[index] && (
                        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <RadioTower size={20} className={isSharingLocation ? "text-primary animate-pulse" : "text-muted-foreground"} />
                    <h3 className="font-medium">Location Sharing</h3>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    isSharingLocation ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  )}>
                    {isSharingLocation ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {isSharingLocation 
                    ? "Your location is being shared with parents in real-time." 
                    : "Activate location sharing to allow parents to track the bus."
                  }
                </p>
                <button
                  onClick={toggleLocationSharing}
                  className={cn(
                    "w-full py-3 rounded-lg font-medium transition-all",
                    isSharingLocation
                      ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  {isSharingLocation ? "Stop Sharing Location" : "Start Sharing Location"}
                </button>
              </GlassCard>
            </div>
          </Motion>

          <Motion className="animate-fade-in delay-75 order-1 md:order-2 aspect-square md:aspect-auto h-[300px] md:h-auto">
            <BusMap isDriver={true} />
          </Motion>
        </div>
      </main>
    </div>
  );
};

export default DriverApp;
