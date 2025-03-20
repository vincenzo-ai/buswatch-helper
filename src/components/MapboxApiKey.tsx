
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const OpenStreetMapNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const SEEN_KEY = 'openstreetmap-notice-seen';

  useEffect(() => {
    // Show notice only if it hasn't been seen before
    const hasSeenNotice = localStorage.getItem(SEEN_KEY);
    if (!hasSeenNotice) {
      setIsOpen(true);
      
      // Display demo accounts info
      toast({
        title: "Account demo disponibili",
        description: "Puoi accedere come Genitore Demo o Autista Demo dalla schermata di login",
        duration: 8000,
      });
    }
  }, []);

  const handleCloseNotice = () => {
    localStorage.setItem(SEEN_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenStreetMap</DialogTitle>
          <DialogDescription>
            Questa applicazione utilizza OpenStreetMap per visualizzare le mappe.
            OpenStreetMap è una mappa del mondo libera e creata da una comunità di mappatori.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div className="text-sm text-blue-700">
                <strong>Account Demo:</strong>
                <ul className="list-disc ml-5 mt-1">
                  <li>Genitore: genitore@demo.it / password123</li>
                  <li>Autista: autista@demo.it / password123</li>
                </ul>
                <p className="mt-1">Usa i pulsanti "Accedi come Demo" nella schermata di login.</p>
              </div>
            </div>
          </div>
          <Button onClick={handleCloseNotice} className="w-full">
            <MapPin className="mr-2 h-4 w-4" />
            Ho capito
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenStreetMapNotice;
