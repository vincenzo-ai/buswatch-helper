
import { Link } from 'react-router-dom';
import { ArrowLeft, Battery, SignalHigh } from 'lucide-react';
import Logo from '@/components/Logo';
import { type DriverHeaderProps } from '@/lib/driver-types';

const DriverHeader = ({ battery, signal }: DriverHeaderProps) => {
  return (
    <header className="p-4 flex items-center justify-between border-b border-border">
      <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Indietro</span>
      </Link>
      <Logo size="sm" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <SignalHigh size={16} className={signal < 3 ? "text-destructive" : ""} />
          <span>{signal}G</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Battery size={16} className={battery < 20 ? "text-destructive" : ""} />
          <span>{battery}%</span>
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
