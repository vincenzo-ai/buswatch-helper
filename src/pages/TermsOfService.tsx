
import { Motion } from '@/components/AnimatePresence';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold mb-6">Termini di Servizio</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Accettazione dei Termini</h2>
              <p>
                Utilizzando BusTracker Italia, l'utente accetta di essere vincolato dai presenti Termini di Servizio. 
                Se non si accettano tutti i termini e le condizioni, si prega di non utilizzare il servizio.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Descrizione del Servizio</h2>
              <p>
                BusTracker Italia fornisce un servizio di monitoraggio dei bus scolastici in tempo reale, 
                permettendo ai genitori di seguire il percorso del bus dei loro bambini e ricevere notifiche 
                sui tempi di arrivo.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Account Utente</h2>
              <p>
                Per utilizzare il servizio, è necessario creare un account. L'utente è responsabile di mantenere 
                la sicurezza del proprio account e della password e di limitare l'accesso al proprio computer. 
                L'utente accetta di assumersi la responsabilità di tutte le attività che si verificano sotto il proprio account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Privacy</h2>
              <p>
                La nostra <Link to="/privacy" className="text-primary hover:underline">Politica sulla Privacy</Link> descrive come raccogliamo, 
                utilizziamo e proteggiamo i dati personali degli utenti. Utilizzando il nostro servizio, 
                l'utente acconsente alla raccolta e all'uso delle informazioni come descritto nella nostra Politica sulla Privacy.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Limitazioni di Responsabilità</h2>
              <p>
                BusTracker Italia si impegna a fornire un servizio affidabile, ma non può garantire che il servizio 
                sarà sempre disponibile o privo di errori. Non siamo responsabili per ritardi o indisponibilità dovuti 
                a problemi tecnici o altre circostanze al di fuori del nostro controllo.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Modifiche ai Termini</h2>
              <p>
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. La versione aggiornata 
                sarà pubblicata sul nostro sito web. L'utilizzo continuato del servizio dopo tali modifiche costituisce 
                l'accettazione dei nuovi termini.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">7. Contatti</h2>
              <p>
                Per domande sui presenti Termini di Servizio, contattare il nostro 
                <Link to="/contatti" className="text-primary hover:underline"> team di supporto</Link>.
              </p>
            </section>
          </div>
        </Motion>
      </main>
    </div>
  );
};

export default TermsOfService;
