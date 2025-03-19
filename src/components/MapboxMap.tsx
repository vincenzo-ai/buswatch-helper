
import { useState, useEffect, useRef, ReactNode } from 'react';
import { Motion } from '@/components/AnimatePresence';
import { cn } from '@/lib/utils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapboxMapProps {
  className?: string;
  busLocation?: Coordinates;
  destinationLocation?: Coordinates;
  isDriver?: boolean;
  children?: ReactNode;
}

const MapboxMap = ({
  className,
  busLocation = { lat: 41.9028, lng: 12.4964 }, // Roma come default
  destinationLocation = { lat: 41.9109, lng: 12.4818 }, // Scuola vicino Roma
  isDriver = false,
  children,
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const busMarker = useRef<mapboxgl.Marker | null>(null);
  const destMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Inizializza la mappa quando il componente viene montato
  useEffect(() => {
    if (!mapContainer.current) return;

    // Imposta il token di accesso Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGVhcmx5LXRoaXMtaXMtbm90LWEtcmVhbC10b2tlbiIsInNob3VsZC1iZS1jaGFuZ2VkIjoiYnktdGhlLXVzZXIifQ';
    
    // Crea una nuova istanza di mappa
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [(busLocation.lng + destinationLocation.lng) / 2, (busLocation.lat + destinationLocation.lat) / 2],
      zoom: 12,
    });

    // Aggiungi controlli di navigazione
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Imposta la mappa quando è caricata
    newMap.on('load', () => {
      setMapLoaded(true);
      map.current = newMap;

      // Aggiungi marker per il bus
      busMarker.current = new mapboxgl.Marker({
        color: '#3498db'
      })
        .setLngLat([busLocation.lng, busLocation.lat])
        .addTo(newMap);

      // Aggiungi marker per la destinazione
      destMarker.current = new mapboxgl.Marker()
        .setLngLat([destinationLocation.lng, destinationLocation.lat])
        .addTo(newMap);

      // Adatta la vista per visualizzare entrambi i marker
      const bounds = new mapboxgl.LngLatBounds()
        .extend([busLocation.lng, busLocation.lat])
        .extend([destinationLocation.lng, destinationLocation.lat]);
      
      newMap.fitBounds(bounds, {
        padding: 50
      });
    });

    // Pulizia al momento dello smontaggio
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Aggiorna le posizioni dei marker quando cambiano
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Aggiorna la posizione del marker del bus
    if (busMarker.current) {
      busMarker.current.setLngLat([busLocation.lng, busLocation.lat]);
    }

    // Aggiorna la posizione del marker della destinazione
    if (destMarker.current) {
      destMarker.current.setLngLat([destinationLocation.lng, destinationLocation.lat]);
    }

    // Aggiorna i confini della mappa
    const bounds = new mapboxgl.LngLatBounds()
      .extend([busLocation.lng, busLocation.lat])
      .extend([destinationLocation.lng, destinationLocation.lat]);
    
    map.current.fitBounds(bounds, {
      padding: 50
    });
  }, [busLocation, destinationLocation, mapLoaded]);

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
            <div ref={mapContainer} className="absolute inset-0" />
            
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

export default MapboxMap;
