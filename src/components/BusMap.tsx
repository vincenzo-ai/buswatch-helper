
import { useState, useEffect, useRef } from 'react';
import { Motion } from '@/components/AnimatePresence';
import { cn } from '@/lib/utils';
import { MapPin, Navigation2 } from 'lucide-react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface BusMapProps {
  className?: string;
  busLocation?: Coordinates;
  destinationLocation?: Coordinates;
  isDriver?: boolean;
  children?: React.ReactNode;
}

const BusMap = ({
  className,
  busLocation = { lat: 40.712776, lng: -74.005974 },
  destinationLocation = { lat: 40.730610, lng: -73.935242 },
  isDriver = false,
  children,
}: BusMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate location updates
  useEffect(() => {
    if (!mapLoaded) return;
    
    const interval = setInterval(() => {
      setLocationUpdated(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [mapLoaded]);

  return (
    <Motion className={cn(
      "relative w-full h-full rounded-xl overflow-hidden bg-gray-100",
      className
    )}>
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20"></div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {/* Simulated map background */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+555555(-73.935242,40.730610),pin-s+3498db(-74.005974,40.712776)/-73.97,40.72,11.5/800x600@2x?access_token=pk.placeholder')] bg-cover bg-center"></div>
            
            {/* Bus marker with pulsing effect */}
            <div className={cn(
              "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
              locationUpdated ? "translate-x-[calc(-50%+5px)] translate-y-[calc(-50%-8px)]" : ""
            )}>
              <div className="relative">
                <Navigation2 
                  size={32} 
                  className="text-primary transform -rotate-45" 
                />
                <span className="absolute inset-0 rounded-full animate-ping bg-primary/30"></span>
              </div>
            </div>
            
            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 glass-card flex items-center justify-center rounded-full">
                <span className="text-xl">+</span>
              </button>
              <button className="w-10 h-10 glass-card flex items-center justify-center rounded-full">
                <span className="text-xl">−</span>
              </button>
            </div>

            {/* Map overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/10 to-transparent"></div>
            
            {/* Children content */}
            {children && (
              <div className="absolute inset-x-0 bottom-0 p-4">
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </Motion>
  );
};

export default BusMap;
