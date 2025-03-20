
import { useState, useEffect } from 'react';
import { Motion } from '@/components/AnimatePresence';
import MapboxMap from '@/components/MapboxMap';
import DriverHeader from '@/components/driver/DriverHeader';
import DriverProfileSummary from '@/components/driver/DriverProfileSummary';
import RouteDetails from '@/components/driver/RouteDetails';
import LocationSharing from '@/components/driver/LocationSharing';
import { ROUTE_INFO } from '@/constants/routeData';
import { RouteStatus } from '@/lib/driver-types';

const DriverApp = () => {
  const [routeStatus, setRouteStatus] = useState<RouteStatus>('idle');
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [battery, setBattery] = useState(87);
  const [signal, setSignal] = useState(4);
  const [currentStopIndex, setCurrentStopIndex] = useState(-1);
  const [stopProgress, setStopProgress] = useState<boolean[]>(
    Array(ROUTE_INFO.stops.length).fill(false)
  );

  // Simula consumo batteria
  useEffect(() => {
    if (isSharingLocation) {
      const interval = setInterval(() => {
        setBattery(prev => Math.max(prev - 1, 10));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isSharingLocation]);

  // Simula fluttuazione segnale
  useEffect(() => {
    const interval = setInterval(() => {
      setSignal(Math.floor(Math.random() * 2) + 3); // 3 o 4 barre
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
      
      // Se ci sono altre fermate, passa alla successiva
      if (index < ROUTE_INFO.stops.length - 1) {
        setCurrentStopIndex(index + 1);
      } else {
        // Percorso completato
        setRouteStatus('completed');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <DriverHeader battery={battery} signal={signal} />

      <main className="flex-1 p-4 md:p-6 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <DriverProfileSummary 
            name="Giovanni Autista" 
            busNumber="42" 
            routeStatus={routeStatus}
          />
        </Motion>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Motion className="animate-fade-in order-2 md:order-1">
            <div className="flex flex-col gap-6 h-full">
              <RouteDetails
                routeInfo={ROUTE_INFO}
                routeStatus={routeStatus}
                currentStopIndex={currentStopIndex}
                stopProgress={stopProgress}
                onCompleteStop={markStopAsCompleted}
              />

              <LocationSharing
                isSharingLocation={isSharingLocation}
                onToggleLocationSharing={toggleLocationSharing}
              />
            </div>
          </Motion>

          <Motion className="animate-fade-in delay-75 order-1 md:order-2 aspect-square md:aspect-auto h-[300px] md:h-auto">
            <MapboxMap isDriver={true} />
          </Motion>
        </div>
      </main>
    </div>
  );
};

export default DriverApp;
