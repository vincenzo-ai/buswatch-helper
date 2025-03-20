import { Motion } from '@/components/AnimatePresence';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const DriverProfile = () => {
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

      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Profilo Autista</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Informazioni Personali</h2>
              <p>
                <strong>Nome:</strong> Giovanni Rossi
              </p>
              <p>
                <strong>Email:</strong> giovanni.rossi@example.com
              </p>
              <p>
                <strong>Telefono:</strong> 333-123-4567
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Informazioni sul Veicolo</h2>
              <p>
                <strong>Tipo di Veicolo:</strong> Autobus Scolastico
              </p>
              <p>
                <strong>Numero di Targa:</strong> AB123CD
              </p>
              <p>
                <strong>Posti Disponibili:</strong> 30
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Percorso Assegnato</h2>
              <p>
                <strong>Scuola:</strong> Scuola Elementare Lincoln
              </p>
              <p>
                <strong>Orario di Inizio:</strong> 7:30 AM
              </p>
              <p>
                <strong>Orario di Fine:</strong> 4:30 PM
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Documenti</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><a href="#" className="text-primary hover:underline">Patente di Guida</a></li>
                <li><a href="#" className="text-primary hover:underline">Certificato di Idoneità</a></li>
                <li><a href="#" className="text-primary hover:underline">Assicurazione del Veicolo</a></li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Contatti di Emergenza</h2>
              <p>
                <strong>Nome:</strong> Maria Rossi
              </p>
              <p>
                <strong>Telefono:</strong> 333-987-6543
              </p>
              <p>
                <strong>Relazione:</strong> Moglie
              </p>
            </section>
          </div>
        </Motion>
      </main>

      <Footer />
    </div>
  );
};

export default DriverProfile;
