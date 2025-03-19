
import { cn } from '@/lib/utils';

type Status = 'idle' | 'active' | 'completed';
type Size = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  status: Status;
  size?: Size;
  className?: string;
}

const statusConfig = {
  idle: {
    label: 'Inattivo',
    className: 'bg-gray-100 text-gray-700',
  },
  active: {
    label: 'Attivo',
    className: 'bg-blue-100 text-blue-700',
  },
  completed: {
    label: 'Completato',
    className: 'bg-green-100 text-green-700',
  },
};

const sizeConfig = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-sm px-3 py-1',
};

const StatusBadge = ({ status, size = 'md', className }: StatusBadgeProps) => {
  const { label, className: statusClassName } = statusConfig[status];
  const sizeClassName = sizeConfig[size];

  return (
    <span
      className={cn(
        'font-medium rounded-full',
        statusClassName,
        sizeClassName,
        className
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
