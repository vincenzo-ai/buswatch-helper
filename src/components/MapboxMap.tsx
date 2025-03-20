
import { useState, useEffect, useRef, ReactNode } from 'react';
import { Motion } from '@/components/AnimatePresence';
import { cn } from '@/lib/utils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  const map = useRef<L.Map | null>(null);
  const busMarker = useRef<L.Marker | null>(null);
  const destMarker = useRef<L.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Inizializza la mappa quando il componente viene montato
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Crea una nuova istanza di mappa Leaflet
    const newMap = L.map(mapContainer.current).setView(
      [(busLocation.lat + destinationLocation.lat) / 2, (busLocation.lng + destinationLocation.lng) / 2], 
      12
    );

    // Aggiungi il layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

    // Crea icone personalizzate per i marker
    const busIcon = L.divIcon({
      className: 'bus-marker',
      html: `<div class="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-300"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const destIcon = L.divIcon({
      className: 'destination-marker',
      html: `<div class="w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-300"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    // Aggiungi marker per il bus
    busMarker.current = L.marker([busLocation.lat, busLocation.lng], {
      icon: busIcon
    }).addTo(newMap);

    // Aggiungi marker per la destinazione
    destMarker.current = L.marker([destinationLocation.lat, destinationLocation.lng], {
      icon: destIcon
    }).addTo(newMap);

    // Adatta la vista per visualizzare entrambi i marker
    const bounds = L.latLngBounds(
      [busLocation.lat, busLocation.lng],
      [destinationLocation.lat, destinationLocation.lng]
    );
    
    newMap.fitBounds(bounds, {
      padding: [50, 50]
    });

    // Imposta la mappa e aggiorna lo stato
    map.current = newMap;
    setMapLoaded(true);

    // Pulizia al momento dello smontaggio
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Aggiorna le posizioni dei marker quando cambiano
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Aggiorna la posizione del marker del bus
    if (busMarker.current) {
      busMarker.current.setLatLng([busLocation.lat, busLocation.lng]);
    }

    // Aggiorna la posizione del marker della destinazione
    if (destMarker.current) {
      destMarker.current.setLatLng([destinationLocation.lat, destinationLocation.lng]);
    }

    // Aggiorna i confini della mappa
    const bounds = L.latLngBounds(
      [busLocation.lat, busLocation.lng],
      [destinationLocation.lat, destinationLocation.lng]
    );
    
    map.current.fitBounds(bounds, {
      padding: [50, 50]
    });
  }, [busLocation, destinationLocation, mapLoaded]);

  return (
    <Motion className={cn(
      "relative w-full h-full rounded-xl overflow-hidden bg-gray-100",
      className
    )}>
      <div className="w-full h-full">
        <div className="w-full h-full relative">
          <div ref={mapContainer} className="absolute inset-0" />
          
          {/* Overlay mappa */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/10 to-transparent"></div>
          
          {/* Contenuto child */}
          {children && (
            <div className="absolute inset-x-0 bottom-0 p-4 z-10">
              {children}
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
};

export default MapboxMap;
