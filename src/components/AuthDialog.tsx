
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { User, UserCircle, Mail, Lock, LogIn, UserPlus, Key } from 'lucide-react';
import { driverDemoAccount, parentDemoAccount } from '@/lib/demoAccounts';

type UserType = 'driver' | 'parent';
type AuthMode = 'login' | 'register';

const AuthDialog = ({ 
  isOpen, 
  onOpenChange, 
  initialUserType = 'parent',
  initialMode = 'login' 
}: { 
  isOpen: boolean; 
  onOpenChange: (open: boolean) => void;
  initialUserType?: UserType;
  initialMode?: AuthMode;
}) => {
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setSurname('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione base
    if (!email || !password || (mode === 'register' && (!name || !surname))) {
      toast({
        title: "Errore di validazione",
        description: "Tutti i campi sono obbligatori",
        variant: "destructive"
      });
      return;
    }

    // In un'applicazione reale, qui ci sarebbe la chiamata all'API di autenticazione
    // Per ora simuliamo un login/registrazione di successo
    const successMessage = mode === 'login' 
      ? "Login effettuato con successo"
      : "Registrazione completata con successo";
      
    toast({
      title: "Operazione completata",
      description: successMessage
    });

    // Redirect alla pagina appropriata in base al tipo di utente
    const redirectPath = userType === 'driver' ? '/driver' : '/parent';
    
    // Per la registrazione, indirizza alla compilazione del profilo
    if (mode === 'register') {
      if (userType === 'driver') {
        navigate('/driver-profile');
      } else {
        navigate('/child-profile');
      }
    } else {
      navigate(redirectPath);
    }
    
    onOpenChange(false);
    resetForm();
  };

  const loginWithDemo = (type: UserType) => {
    const account = type === 'driver' ? driverDemoAccount : parentDemoAccount;
    
    toast({
      title: "Account demo",
      description: `Accesso con account ${type === 'driver' ? 'autista' : 'genitore'} demo`
    });
    
    const redirectPath = type === 'driver' ? '/driver' : '/parent';
    navigate(redirectPath);
    onOpenChange(false);
    resetForm();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Accedi al tuo account' : 'Crea un nuovo account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' 
              ? 'Inserisci le tue credenziali per accedere.' 
              : 'Compila il modulo per creare un nuovo account.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue={userType} 
          onValueChange={(value) => setUserType(value as UserType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parent" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Genitore
            </TabsTrigger>
            <TabsTrigger value="driver" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Autista
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parent" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent-name">Nome</Label>
                    <Input
                      id="parent-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent-surname">Cognome</Label>
                    <Input
                      id="parent-surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Rossi"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="parent-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="parent-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tuo@email.it"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parent-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="parent-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                {mode === 'login' ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Accedi
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrati
                  </>
                )}
              </Button>
              
              {mode === 'login' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => loginWithDemo('parent')}
                >
                  <Key className="mr-2 h-4 w-4" />
                  Accedi come Genitore Demo
                </Button>
              )}
            </form>
          </TabsContent>

          <TabsContent value="driver" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver-name">Nome</Label>
                    <Input
                      id="driver-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-surname">Cognome</Label>
                    <Input
                      id="driver-surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Rossi"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="driver-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="driver-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tuo@email.it"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driver-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="driver-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                {mode === 'login' ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Accedi
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrati
                  </>
                )}
              </Button>
              
              {mode === 'login' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => loginWithDemo('driver')}
                >
                  <Key className="mr-2 h-4 w-4" />
                  Accedi come Autista Demo
                </Button>
              )}
            </form>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col items-center sm:items-end pt-4">
          <Button variant="link" onClick={toggleMode} className="text-sm">
            {mode === 'login' 
              ? 'Non hai un account? Registrati' 
              : 'Hai già un account? Accedi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
