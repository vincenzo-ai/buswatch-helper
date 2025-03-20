
import { Motion } from '@/components/AnimatePresence';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

const Privacy = () => {
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
          <h1 className="text-3xl font-bold mb-6">Informativa sulla Privacy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Raccolta dei Dati</h2>
              <p>
                BusTracker Italia raccoglie informazioni personali come nome, indirizzo email, numero di telefono 
                e informazioni relative ai bambini che utilizzano il servizio di trasporto scolastico. 
                Raccogliamo anche dati di geolocalizzazione per gli autisti quando la condivisione della posizione è attiva.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Utilizzo dei Dati</h2>
              <p>
                I dati raccolti vengono utilizzati per:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fornire il servizio di tracciamento dei bus in tempo reale</li>
                <li>Inviare notifiche sull'arrivo del bus</li>
                <li>Gestire gli account utente</li>
                <li>Migliorare il servizio</li>
                <li>Comunicare con gli utenti per assistenza</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Condivisione dei Dati</h2>
              <p>
                Non vendiamo né affittiamo le informazioni personali degli utenti a terzi. 
                Condividiamo le informazioni solo con:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fornitori di servizi che ci aiutano a offrire il servizio</li>
                <li>Autorità scolastiche coinvolte nel servizio di trasporto</li>
                <li>Autorità legali quando richiesto dalla legge</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Sicurezza dei Dati</h2>
              <p>
                Adottiamo misure di sicurezza tecniche e organizzative per proteggere i dati personali 
                da accessi non autorizzati, perdite o modifiche. Tuttavia, nessuna trasmissione via Internet 
                o archiviazione elettronica è completamente sicura, quindi non possiamo garantire la sicurezza assoluta.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Diritti degli Utenti</h2>
              <p>
                Gli utenti hanno il diritto di:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Accedere ai propri dati personali</li>
                <li>Correggere i dati inaccurati</li>
                <li>Richiedere la cancellazione dei dati</li>
                <li>Limitare il trattamento dei dati</li>
                <li>Portabilità dei dati</li>
                <li>Opporsi al trattamento</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Cookie e Tecnologie Simili</h2>
              <p>
                Utilizziamo cookie e tecnologie simili per migliorare l'esperienza dell'utente, 
                analizzare l'utilizzo del servizio e personalizzare i contenuti. 
                Gli utenti possono controllare l'uso dei cookie attraverso le impostazioni del browser.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">7. Modifiche alla Privacy Policy</h2>
              <p>
                Ci riserviamo il diritto di aggiornare questa informativa sulla privacy in qualsiasi momento. 
                Gli utenti saranno informati di eventuali modifiche sostanziali tramite email o notifica sull'applicazione.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">8. Contatti</h2>
              <p>
                Per domande sulla nostra informativa sulla privacy, contattare il nostro 
                <Link to="/contatti" className="text-primary hover:underline"> responsabile della protezione dei dati</Link>.
              </p>
            </section>
          </div>
        </Motion>
      </main>
    </div>
  );
};

export default Privacy;
