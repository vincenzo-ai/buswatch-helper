import { Motion } from '@/components/AnimatePresence';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Edit, Calendar, GraduationCap, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const ChildProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/parent" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Indietro</span>
        </Link>
        <Logo size="sm" />
        <div className="w-8"></div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Profilo di Emma</h1>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Modifica
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold">
                E
              </div>
              <div>
                <h2 className="text-xl font-semibold">Emma Bianchi</h2>
                <p className="text-muted-foreground">ID: 123456</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground uppercase text-xs font-semibold tracking-wider mb-1">
                  Informazioni Personali
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Data di Nascita</div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      10 Maggio 2015
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Classe</div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      3ª Elementare
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-muted-foreground uppercase text-xs font-semibold tracking-wider mb-1">
                  Informazioni sul Trasporto
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Fermata</div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Quartiere Parkside
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Orario di Ritiro</div>
                    <div className="text-muted-foreground">7:35</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-muted-foreground uppercase text-xs font-semibold tracking-wider mb-1">
                  Contatti di Emergenza
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Genitore 1</div>
                    <div className="text-muted-foreground">
                      <User className="mr-2 h-4 w-4 inline-block" />
                      Mario Bianchi
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Telefono</div>
                    <div className="text-muted-foreground">333 123 4567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChildProfile;
