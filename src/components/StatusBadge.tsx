
import { Circle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/AnimatePresence';

type StatusType = 'idle' | 'active' | 'arriving' | 'completed' | 'delayed' | 'unknown';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const StatusBadge = ({ status, className, size = 'md', showLabel = true }: StatusBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-3',
    lg: 'text-base py-1.5 px-4',
  };

  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'idle':
        return {
          label: 'Idle',
          icon: Circle,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-400',
        };
      case 'active':
        return {
          label: 'Active',
          icon: Circle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-500',
          animation: 'animate-pulse',
        };
      case 'arriving':
        return {
          label: 'Arriving',
          icon: Clock,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-500',
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-500',
        };
      case 'delayed':
        return {
          label: 'Delayed',
          icon: AlertTriangle,
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          iconColor: 'text-amber-500',
        };
      case 'unknown':
      default:
        return {
          label: 'Unknown',
          icon: AlertTriangle,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-400',
        };
    }
  };

  const { label, icon: Icon, bgColor, textColor, iconColor, animation } = getStatusConfig(status);

  return (
    <Motion className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      bgColor,
      textColor,
      sizeClasses[size],
      className
    )}>
      <Icon size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} className={cn(iconColor, animation)} />
      {showLabel && <span>{label}</span>}
    </Motion>
  );
};

export default StatusBadge;
