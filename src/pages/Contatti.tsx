
import { useState } from 'react';
import { Motion } from '@/components/AnimatePresence';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contatti = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliamo l'invio del form
    setTimeout(() => {
      toast({
        title: "Messaggio inviato",
        description: "Grazie per averci contattato. Ti risponderemo al più presto.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Indietro</span>
        </Link>
        <Logo size="sm" />
        <div className="w-8"></div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Contattaci</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-6">
                Hai domande, suggerimenti o hai bisogno di assistenza? Non esitare a contattarci. 
                Il nostro team di supporto è qui per aiutarti.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">supporto@bustracker-italia.it</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefono</p>
                    <p className="font-medium">+39 02 1234 5678</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Indirizzo</p>
                    <p className="font-medium">Via Roma 123, 20100 Milano</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium mb-2">Orari di supporto</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Lunedì - Venerdì:</strong> 8:30 - 18:30<br />
                  <strong>Sabato:</strong> 9:00 - 13:00<br />
                  <strong>Domenica:</strong> Chiuso
                </p>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-6 border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Inviaci un messaggio</h2>
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome e Cognome</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario.rossi@email.it"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Messaggio</label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Scrivi qui il tuo messaggio..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>Invio in corso...</>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Invia messaggio
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </Motion>
      </main>
    </div>
  );
};

export default Contatti;
