
import { useState, useEffect, useRef, ReactNode } from 'react';
import { Motion } from '@/components/AnimatePresence';
import { cn } from '@/lib/utils';
import { MapPin, Navigation2 } from 'lucide-react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleMapProps {
  className?: string;
  busLocation?: Coordinates;
  destinationLocation?: Coordinates;
  isDriver?: boolean;
  children?: ReactNode;
}

// Componente mappa interno
const MapComponent = ({
  busLocation,
  destinationLocation,
  className
}: {
  busLocation: Coordinates;
  destinationLocation: Coordinates;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [busMarker, setBusMarker] = useState<google.maps.Marker | null>(null);
  const [destMarker, setDestMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center: { lat: (busLocation.lat + destinationLocation.lat) / 2, lng: (busLocation.lng + destinationLocation.lng) / 2 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      setMap(newMap);
    }
  }, [ref, map, busLocation, destinationLocation]);

  useEffect(() => {
    if (map) {
      if (!busMarker) {
        const newBusMarker = new google.maps.Marker({
          position: busLocation,
          map,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: "#3498db",
            fillOpacity: 1,
            strokeWeight: 1,
            rotation: 0,
          },
        });
        setBusMarker(newBusMarker);
      } else {
        busMarker.setPosition(busLocation);
      }

      if (!destMarker) {
        const newDestMarker = new google.maps.Marker({
          position: destinationLocation,
          map,
        });
        setDestMarker(newDestMarker);
      } else {
        destMarker.setPosition(destinationLocation);
      }

      // Aggiorna la visualizzazione della mappa
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(busLocation.lat, busLocation.lng));
      bounds.extend(new google.maps.LatLng(destinationLocation.lat, destinationLocation.lng));
      map.fitBounds(bounds);
    }
  }, [map, busLocation, destinationLocation, busMarker, destMarker]);

  return <div ref={ref} className={cn("w-full h-full", className)} />;
};

const GoogleMap = ({
  className,
  busLocation = { lat: 41.9028, lng: 12.4964 }, // Roma come default
  destinationLocation = { lat: 41.9109, lng: 12.4818 }, // Scuola vicino Roma
  isDriver = false,
  children,
}: GoogleMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(false);

  // Simula caricamento mappa
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simula aggiornamenti posizione
  useEffect(() => {
    if (!mapLoaded) return;
    
    const interval = setInterval(() => {
      setLocationUpdated(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [mapLoaded]);

  const render = (status: Status) => {
    if (status === Status.LOADING) return <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20"></div>
    </div>;
    if (status === Status.FAILURE) return <div className="w-full h-full flex items-center justify-center text-destructive">Errore di caricamento mappa</div>;
    return null;
  };

  return (
    <Motion className={cn(
      "relative w-full h-full rounded-xl overflow-hidden bg-gray-100",
      className
    )}>
      <div className="w-full h-full">
        {!mapLoaded ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20"></div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <Wrapper apiKey="YOUR_GOOGLE_MAPS_API_KEY" render={render}>
              <MapComponent 
                busLocation={busLocation} 
                destinationLocation={destinationLocation} 
                className="absolute inset-0"
              />
            </Wrapper>
            
            {/* Overlay mappa */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/10 to-transparent"></div>
            
            {/* Contenuto child */}
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

export default GoogleMap;
