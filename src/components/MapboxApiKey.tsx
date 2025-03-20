
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const OpenStreetMapNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const SEEN_KEY = 'openstreetmap-notice-seen';

  useEffect(() => {
    // Show notice only if it hasn't been seen before
    const hasSeenNotice = localStorage.getItem(SEEN_KEY);
    if (!hasSeenNotice) {
      setIsOpen(true);
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
