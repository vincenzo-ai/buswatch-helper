import { useState } from "react";
import { Motion } from "@/components/AnimatePresence";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Contatti = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast({
        title: "Errore",
        description: "Per favore, compila tutti i campi.",
      });
      return;
    }

    // Qui puoi aggiungere la logica per inviare il messaggio
    console.log("Invio messaggio:", { name, email, message });

    toast({
      title: "Messaggio inviato!",
      description: "Grazie per averci contattato. Ti risponderemo al più presto.",
    });

    // Resetta i campi del form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Torna alla Home</span>
        </Link>
        <Logo size="sm" />
        <div className="w-8"></div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Contattaci</h1>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Hai domande, suggerimenti o hai bisogno di assistenza? Compila il modulo qui sotto e ti risponderemo al più presto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Il tuo nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Il tuo messaggio"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div>
                <Button className="w-full" type="submit">
                  Invia Messaggio <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="text-muted-foreground mt-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">Altre informazioni</h2>
              <p>
                Puoi anche contattarci tramite telefono al numero <span className="font-medium">0123 456789</span> o scriverci direttamente a <span className="font-medium">info@tiaccompagno.it</span>.
              </p>
            </div>
          </div>
        </Motion>
      </main>

      <Footer />
    </div>
  );
};

export default Contatti;
