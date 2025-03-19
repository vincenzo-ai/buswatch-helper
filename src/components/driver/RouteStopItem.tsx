
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type StopItemProps } from '@/lib/driver-types';

const RouteStopItem = ({ 
  stop, 
  index, 
  currentStopIndex, 
  routeStatus, 
  stopProgress, 
  onComplete 
}: StopItemProps) => {
  return (
    <div 
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
          onClick={() => onComplete(index)}
          className="text-sm px-3 py-1 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Completa
        </button>
      )}
      {stopProgress[index] && (
        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
          Completato
        </span>
      )}
    </div>
  );
};

export default RouteStopItem;
