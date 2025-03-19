
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import GlassCard from '@/components/GlassCard';
import { Bus, MapPin, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const [activeOption, setActiveOption] = useState<'driver' | 'parent' | null>(null);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="w-full max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Logo size="md" />
        <nav className="flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col">
        <Motion className="flex flex-col items-center text-center mb-16 animate-fade-in">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Safe transportation monitoring
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Keep track of your child's school bus in real-time
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            BusWatch provides parents with peace of mind by offering real-time tracking of school buses, ensuring children's safety during transportation.
          </p>
        </Motion>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full mb-16">
          <Motion
            className={cn(
              "group cursor-pointer animate-fade-in",
              activeOption === 'driver' ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
            )}
            onClick={() => setActiveOption('driver')}
          >
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Bus size={24} />
                </div>
                <h3 className="font-semibold text-xl">For Drivers</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Easily share your location in real-time with parents while focusing on safe driving. Simple interface designed for minimal distraction.
              </p>
              <div className="mt-auto pt-4">
                <Link
                  to="/driver"
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
                >
                  Continue as driver <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </GlassCard>
          </Motion>

          <Motion
            className={cn(
              "group cursor-pointer animate-fade-in animate-delay-75",
              activeOption === 'parent' ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
            )}
            onClick={() => setActiveOption('parent')}
          >
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin size={24} />
                </div>
                <h3 className="font-semibold text-xl">For Parents</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Track your child's school bus in real-time, receive notifications when the bus is nearby, and ensure they arrive safely.
              </p>
              <div className="mt-auto pt-4">
                <Link
                  to="/parent"
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
                >
                  Continue as parent <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </GlassCard>
          </Motion>
        </div>

        <section id="features" className="py-16">
          <Motion className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything needed for safe and reliable school bus monitoring
            </p>
          </Motion>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Tracking",
                description: "GPS-powered location tracking with live updates on the map.",
                icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              },
              {
                title: "Arrival Notifications",
                description: "Get notified when the bus is approaching your stop.",
                icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              },
              {
                title: "Route Monitoring",
                description: "Track the entire bus route and view estimated arrival times.",
                icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              }
            ].map((feature, index) => (
              <Motion key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <GlassCard>
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </Motion>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-16">
          <Motion className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple process designed for both bus drivers and parents
            </p>
          </Motion>

          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <Motion className="flex-1 order-2 md:order-1 animate-fade-in">
              <ol className="relative border-l border-primary/30 ml-4 space-y-8">
                {[
                  {
                    title: "Driver starts the route",
                    description: "Bus driver activates tracking at the beginning of the route."
                  },
                  {
                    title: "Real-time location sharing",
                    description: "The app securely shares the bus location with registered parents."
                  },
                  {
                    title: "Parents receive notifications",
                    description: "Get alerts when the bus is approaching your designated stop."
                  },
                  {
                    title: "Safe arrival confirmation",
                    description: "Receive confirmation when your child has been safely dropped off."
                  }
                ].map((step, index) => (
                  <li key={index} className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-background">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Motion>
            
            <div className="flex-1 order-1 md:order-2">
              <Motion className="animate-fade-in">
                <GlassCard className="overflow-hidden rounded-xl">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/30 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border-4 border-primary/20 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-4 border-primary/30 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bus size={48} className="text-primary" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                    </div>
                  </div>
                </GlassCard>
              </Motion>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-secondary/50 py-8">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BusWatch. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
