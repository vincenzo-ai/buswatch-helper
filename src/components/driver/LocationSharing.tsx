
import { RadioTower } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import { type LocationSharingProps } from '@/lib/driver-types';

const LocationSharing = ({ isSharingLocation, onToggleLocationSharing }: LocationSharingProps) => {
  return (
    <GlassCard className="mt-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RadioTower size={20} className={isSharingLocation ? "text-primary animate-pulse" : "text-muted-foreground"} />
          <h3 className="font-medium">Condivisione Posizione</h3>
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          isSharingLocation ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        )}>
          {isSharingLocation ? "Attiva" : "Inattiva"}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {isSharingLocation 
          ? "La tua posizione è condivisa con i genitori in tempo reale." 
          : "Attiva la condivisione della posizione per consentire ai genitori di monitorare il bus."
        }
      </p>
      <button
        onClick={onToggleLocationSharing}
        className={cn(
          "w-full py-3 rounded-lg font-medium transition-all",
          isSharingLocation
            ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
            : "bg-primary text-white hover:bg-primary/90"
        )}
      >
        {isSharingLocation ? "Interrompi Condivisione" : "Inizia Condivisione"}
      </button>
    </GlassCard>
  );
};

export default LocationSharing;
