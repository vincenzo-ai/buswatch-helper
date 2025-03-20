
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';
import { Clock, Bus, School } from 'lucide-react';

interface TimerCardProps {
  timeRemaining: number;
  nextStop: string;
  finalStop: string;
  isActive: boolean;
  className?: string;
}

const TimerCard = ({ 
  timeRemaining, 
  nextStop, 
  finalStop, 
  isActive, 
  className 
}: TimerCardProps) => {
  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return "Arrivato";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock size={20} className={isActive ? "text-primary animate-pulse" : "text-muted-foreground"} />
          <h3 className="font-medium">Arrivo Stimato</h3>
        </div>
        <StatusBadge status={timeRemaining > 0 ? "active" : "completed"} size="sm" />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-start">
          <span className="text-3xl font-bold mr-1">{formatTimeRemaining(timeRemaining)}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{nextStop}</p>
          <p className="text-xs text-muted-foreground">Prossima fermata</p>
        </div>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full mb-4">
        <div 
          className={cn(
            "absolute h-full left-0 top-0 rounded-full transition-all duration-1000",
            isActive ? "bg-primary" : "bg-green-500",
          )}
          style={{ width: `${100 - (timeRemaining / 12 * 100)}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Bus size={14} />
          <span>Posizione attuale</span>
        </div>
        <div className="flex items-center gap-1">
          <School size={14} />
          <span>{finalStop}</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default TimerCard;
