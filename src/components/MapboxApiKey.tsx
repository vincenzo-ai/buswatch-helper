
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { MapPin } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'mapbox-api-key';

const MapboxApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Controlla se esiste già una chiave API salvata
    const savedApiKey = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedApiKey) {
      setIsOpen(true);
    } else {
      // Imposta la chiave API globalmente
      if (window.mapboxgl) {
        window.mapboxgl.accessToken = savedApiKey;
      }
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey) {
      toast({
        title: "Chiave API richiesta",
        description: "Per favore inserisci la tua chiave API di Mapbox",
        variant: "destructive"
      });
      return;
    }

    // Salva la chiave API nel localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, apiKey);
    
    // Imposta la chiave API globalmente
    if (window.mapboxgl) {
      window.mapboxgl.accessToken = apiKey;
    }
    
    setIsOpen(false);
    
    toast({
      title: "Chiave API salvata",
      description: "La tua chiave API di Mapbox è stata salvata"
    });
    
    // Ricarica la pagina per applicare la chiave API
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inserisci la tua chiave API Mapbox</DialogTitle>
          <DialogDescription>
            Per utilizzare le mappe, è necessaria una chiave API di Mapbox.
            Puoi ottenere una chiave API gratuita registrandoti su <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">mapbox.com</a>.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ..."
            className="w-full"
          />
          <Button onClick={handleSaveApiKey} className="w-full">
            <MapPin className="mr-2 h-4 w-4" />
            Salva chiave API
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapboxApiKey;
