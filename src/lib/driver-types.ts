
import { type ReactNode } from 'react';

export type RouteStatus = 'idle' | 'active' | 'completed';

export interface RouteStop {
  name: string;
  time: string;
  completed: boolean;
}

export interface RouteInfo {
  name: string;
  stops: RouteStop[];
}

export interface StopItemProps {
  stop: RouteStop;
  index: number;
  currentStopIndex: number;
  routeStatus: RouteStatus;
  stopProgress: boolean[];
  onComplete: (index: number) => void;
}

export interface RouteDetailsProps {
  routeInfo: RouteInfo;
  routeStatus: RouteStatus;
  currentStopIndex: number;
  stopProgress: boolean[];
  onCompleteStop: (index: number) => void;
}

export interface LocationSharingProps {
  isSharingLocation: boolean;
  onToggleLocationSharing: () => void;
}

export interface DriverHeaderProps {
  battery: number;
  signal: number;
}
