
import React, { createContext, useContext, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AnimatePresenceContextType = {
  onExitComplete?: () => void;
  register: (key: string) => void;
  deregister: (key: string) => void;
  inHandler: () => void;
  outHandler: () => void;
  mode?: "sync" | "wait";
};

const AnimatePresenceContext = createContext<AnimatePresenceContextType | null>(null);

export const usePresence = () => {
  const context = useContext(AnimatePresenceContext);
  if (!context) {
    throw new Error("usePresence must be used within an AnimatePresence component");
  }
  return context;
};

type AnimatePresenceProps = {
  children: React.ReactNode;
  mode?: "sync" | "wait";
  initial?: boolean;
  onExitComplete?: () => void;
};

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({
  children,
  mode = "sync",
  initial = true,
  onExitComplete,
}) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [status, setStatus] = useState<"entering" | "entered" | "exiting" | "exited">(
    initial ? "entering" : "entered"
  );

  useEffect(() => {
    if (status === "entering") {
      const timeout = setTimeout(() => {
        setStatus("entered");
      }, 500);
      return () => clearTimeout(timeout);
    }
    
    if (status === "exiting") {
      const timeout = setTimeout(() => {
        setStatus("exited");
        if (onExitComplete) onExitComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [status, onExitComplete]);

  const register = (key: string) => {
    setKeys((prevKeys) => [...prevKeys, key]);
  };

  const deregister = (key: string) => {
    setKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  };

  const inHandler = () => {
    setStatus("entering");
  };

  const outHandler = () => {
    setStatus("exiting");
  };

  return (
    <AnimatePresenceContext.Provider
      value={{
        onExitComplete,
        register,
        deregister,
        inHandler,
        outHandler,
        mode,
      }}
    >
      <div
        className={cn(
          "w-full h-full transition-opacity duration-500 ease-in-out",
          status === "entering" && "animate-fade-in",
          status === "exiting" && "animate-fade-out"
        )}
      >
        {children}
      </div>
    </AnimatePresenceContext.Provider>
  );
};

export type MotionProps = {
  children: React.ReactNode;
  className?: string;
  initial?: { [key: string]: string | number };
  animate?: { [key: string]: string | number };
  exit?: { [key: string]: string | number };
  transition?: { [key: string]: string | number };
};

export const Motion: React.FC<MotionProps> = ({
  children,
  className,
  initial,
  animate,
  exit,
  transition,
}) => {
  return (
    <div className={cn("transition-all duration-300 ease-in-out", className)}>
      {children}
    </div>
  );
};
