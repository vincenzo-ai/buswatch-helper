import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash, CheckCheck } from "lucide-react";
import { Motion } from "@/components/AnimatePresence";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Giovanni Rossi", role: "Autista", status: "Attivo" },
    { id: 2, name: "Marco Bianchi", role: "Genitore", status: "Inattivo" },
    { id: 3, name: "Laura Verdi", role: "Genitore", status: "Attivo" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", role: "Genitore", status: "Inattivo" });
  const { toast } = useToast();

  useEffect(() => {
    // Simula il caricamento degli utenti da un'API
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Giovanni Rossi", role: "Autista", status: "Attivo" },
        { id: 2, name: "Marco Bianchi", role: "Genitore", status: "Inattivo" },
        { id: 3, name: "Laura Verdi", role: "Genitore", status: "Attivo" },
      ]);
    }, 500);
  }, []);

  const handleInputChange = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.role) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", role: "Genitore", status: "Inattivo" });
      toast({
        title: "Utente aggiunto",
        description: "L'utente è stato aggiunto con successo.",
      });
    } else {
      toast({
        title: "Errore",
        description: "Per favore, compila tutti i campi.",
        variant: "destructive",
      });
    }
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Utente modificato",
      description: `L'utente con ID ${id} è stato modificato.`,
    });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "Utente eliminato",
      description: `L'utente con ID ${id} è stato eliminato.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Torna alla Home</span>
        </Link>
        <Logo size="sm" />
        <div className="w-9"></div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Motion className="animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard Amministratore</h1>
            <p className="text-muted-foreground">Gestisci utenti e monitora l'attività della piattaforma.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form per aggiungere un nuovo utente */}
            <div className="bg-card rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-semibold mb-4">Aggiungi Nuovo Utente</h2>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" name="name" value={newUser.name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="role">Ruolo</Label>
                <select id="role" name="role" className="bg-muted/40 rounded px-2 py-1" value={newUser.role} onChange={handleInputChange}>
                  <option value="Genitore">Genitore</option>
                  <option value="Autista">Autista</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <Button onClick={handleAddUser} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Aggiungi Utente
              </Button>
            </div>

            {/* Tabella degli utenti esistenti */}
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>Elenco degli utenti registrati.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ruolo</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" size="icon" onClick={() => handleEditUser(user.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Questa azione è irreversibile. Vuoi veramente eliminare questo utente?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Annulla
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                  Elimina
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      Totale utenti: {users.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Statistiche</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-medium mb-2">Utenti Attivi</h3>
                <p className="text-3xl font-bold text-primary">123</p>
              </div>
              <div className="bg-card rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-medium mb-2">Autisti Registrati</h3>
                <p className="text-3xl font-bold text-secondary">32</p>
              </div>
              <div className="bg-card rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-medium mb-2">Genitori Registrati</h3>
                <p className="text-3xl font-bold text-green-500">91</p>
              </div>
            </div>
          </div>
        </Motion>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
