
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Motion } from '@/components/AnimatePresence';
import { ArrowLeft, Search, Filter, Inbox, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Logo from '@/components/Logo';
import GlassCard from '@/components/GlassCard';

// Dati di esempio per i messaggi di contatto
const SAMPLE_MESSAGES = [
  { id: 1, name: 'Marco Rossi', email: 'marco@example.com', date: '12/05/2023', message: 'Vorrei informazioni sul servizio di trasporto scolastico nella zona di Milano.' },
  { id: 2, name: 'Laura Bianchi', email: 'laura@example.com', date: '10/05/2023', message: 'Salve, come posso registrare mio figlio per utilizzare l\'app?' },
  { id: 3, name: 'Giovanni Verdi', email: 'giovanni@example.com', date: '08/05/2023', message: 'Buongiorno, sono un autista e vorrei unirmi al vostro servizio. Potete fornirmi maggiori informazioni?' },
];

// Dati di esempio per i log utenti
const SAMPLE_USER_LOGS = [
  { id: 1, type: 'Registrazione', user: 'Anna Neri', email: 'anna@example.com', date: '15/05/2023', role: 'Genitore' },
  { id: 2, type: 'Registrazione', user: 'Paolo Verdi', email: 'paolo@example.com', date: '14/05/2023', role: 'Autista' },
  { id: 3, type: 'Aggiunta Bambino', user: 'Anna Neri', email: 'anna@example.com', date: '15/05/2023', details: 'Bambino: Luca Neri' },
  { id: 4, type: 'Login', user: 'Paolo Verdi', email: 'paolo@example.com', date: '15/05/2023', role: 'Autista' },
];

const ContactMessage = ({ message }: { message: typeof SAMPLE_MESSAGES[0] }) => (
  <GlassCard className="mb-4">
    <div className="flex justify-between mb-3">
      <div>
        <h4 className="font-medium">{message.name}</h4>
        <p className="text-sm text-muted-foreground">{message.email}</p>
      </div>
      <span className="text-sm text-muted-foreground">{message.date}</span>
    </div>
    <p className="text-sm border-t border-border pt-3">{message.message}</p>
    <div className="mt-3 flex justify-end gap-2">
      <Button variant="outline" size="sm">Archivia</Button>
      <Button size="sm">Rispondi</Button>
    </div>
  </GlassCard>
);

const UserLogItem = ({ log }: { log: typeof SAMPLE_USER_LOGS[0] }) => (
  <div className="flex items-center p-3 border-b border-border last:border-b-0">
    <div className="w-24 flex-shrink-0">
      <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{log.type}</span>
    </div>
    <div className="flex-1 ml-3">
      <p className="font-medium">{log.user}</p>
      <p className="text-xs text-muted-foreground">{log.email}</p>
    </div>
    <div className="flex-shrink-0 text-right">
      <p className="text-sm">{log.role || log.details || ''}</p>
      <p className="text-xs text-muted-foreground">{log.date}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Indietro</span>
        </Link>
        <Logo size="sm" />
        <div className="w-8"></div> {/* Spacer */}
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard Amministrazione</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Cerca messaggi, utenti..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2 items-center">
              <Filter size={16} />
              Filtra
            </Button>
          </div>

          <Tabs defaultValue="messages">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="messages" className="flex gap-2 items-center">
                <Inbox size={16} />
                Messaggi
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex gap-2 items-center">
                <UserPlus size={16} />
                Log Utenti
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages" className="focus-visible:outline-none focus-visible:ring-0">
              <div>
                {SAMPLE_MESSAGES.map(message => (
                  <ContactMessage key={message.id} message={message} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="logs" className="focus-visible:outline-none focus-visible:ring-0">
              <GlassCard className="p-0 overflow-hidden">
                <div className="bg-muted/50 p-3 border-b border-border">
                  <div className="flex items-center">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-medium">Tipo</span>
                    </div>
                    <div className="flex-1 ml-3">
                      <span className="text-sm font-medium">Utente</span>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-sm font-medium">Dettagli</span>
                    </div>
                  </div>
                </div>
                <div>
                  {SAMPLE_USER_LOGS.map(log => (
                    <UserLogItem key={log.id} log={log} />
                  ))}
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </Motion>
      </main>
    </div>
  );
};

export default AdminDashboard;
