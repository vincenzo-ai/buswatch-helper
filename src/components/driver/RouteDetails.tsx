
import { Bus } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import RouteStopItem from './RouteStopItem';
import { type RouteDetailsProps } from '@/lib/driver-types';

const RouteDetails = ({ 
  routeInfo, 
  routeStatus, 
  currentStopIndex, 
  stopProgress, 
  onCompleteStop 
}: RouteDetailsProps) => {
  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-4">
        <Bus size={20} className="text-primary" />
        <h2 className="font-medium">Dettagli Percorso</h2>
      </div>
      <div className="mb-4">
        <h3 className="font-medium">{routeInfo.name}</h3>
        <p className="text-sm text-muted-foreground">
          {routeInfo.stops.length} fermate · Circa 40 min
        </p>
      </div>
      <div className="space-y-4">
        {routeInfo.stops.map((stop, index) => (
          <RouteStopItem
            key={index}
            stop={stop}
            index={index}
            currentStopIndex={currentStopIndex}
            routeStatus={routeStatus}
            stopProgress={stopProgress}
            onComplete={onCompleteStop}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default RouteDetails;
