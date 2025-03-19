
import { Link } from 'react-router-dom';
import { User, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import StatusBadge from '@/components/StatusBadge';
import { type RouteStatus } from '@/lib/driver-types';

interface DriverProfileSummaryProps {
  name: string;
  busNumber: string;
  routeStatus: RouteStatus;
}

const DriverProfileSummary = ({ name, busNumber, routeStatus }: DriverProfileSummaryProps) => {
  return (
    <GlassCard className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <User size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="font-medium">{name}</h2>
          <p className="text-sm text-muted-foreground">Bus #{busNumber}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={routeStatus} />
        <Link 
          to="/driver-profile" 
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <UserPlus size={18} />
        </Link>
      </div>
    </GlassCard>
  );
};

export default DriverProfileSummary;
