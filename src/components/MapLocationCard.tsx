
import GlassCard from '@/components/GlassCard';
import { Navigation2 } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

interface MapLocationCardProps {
  distance: string;
  nextStop: string;
  status: "active" | "completed" | "idle";
  className?: string;
}

const MapLocationCard = ({ distance, nextStop, status, className }: MapLocationCardProps) => {
  return (
    <GlassCard className={className} padding="sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation2 size={18} className="text-primary" />
          <div>
            <p className="font-medium text-sm">{distance} di distanza</p>
            <p className="text-xs text-muted-foreground">Prossima: {nextStop}</p>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>
    </GlassCard>
  );
};

export default MapLocationCard;
