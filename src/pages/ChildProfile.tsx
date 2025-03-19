
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Motion } from '@/components/AnimatePresence';
import Logo from '@/components/Logo';
import GlassCard from '@/components/GlassCard';
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChildProfile as ChildProfileType } from '@/lib/types';

const formSchema = z.object({
  nomeGenitore: z.string().min(2, {
    message: "Il nome deve contenere almeno 2 caratteri",
  }),
  cognomeGenitore: z.string().min(2, {
    message: "Il cognome deve contenere almeno 2 caratteri",
  }),
  dataNascita: z.string().min(1, {
    message: "Inserisci una data di nascita valida",
  }),
  luogoNascita: z.string().min(2, {
    message: "Inserisci un luogo di nascita valido",
  }),
  codiceFiscale: z.string().length(16, {
    message: "Il codice fiscale deve contenere 16 caratteri",
  }),
  indirizzo: z.string().min(5, {
    message: "Inserisci un indirizzo valido",
  }),
  numeroTelefono: z.string().min(5, {
    message: "Inserisci un numero di telefono valido",
  }),
  nomeBambino: z.string().min(2, {
    message: "Il nome del bambino deve contenere almeno 2 caratteri",
  }),
  cognomeBambino: z.string().min(2, {
    message: "Il cognome del bambino deve contenere almeno 2 caratteri",
  }),
  scuolaDestinazione: z.string().min(2, {
    message: "Inserisci una scuola di destinazione valida",
  }),
  classeDestinazione: z.string().min(1, {
    message: "Inserisci una classe di destinazione valida",
  }),
  email: z.string().email({
    message: "Inserisci un'email valida",
  }),
});

const ChildProfile = () => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm<ChildProfileType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeGenitore: "",
      cognomeGenitore: "",
      dataNascita: "",
      luogoNascita: "",
      codiceFiscale: "",
      indirizzo: "",
      numeroTelefono: "",
      nomeBambino: "",
      cognomeBambino: "",
      scuolaDestinazione: "",
      classeDestinazione: "",
      email: "",
    },
  });

  const onSubmit = async (data: ChildProfileType) => {
    setLoading(true);
    try {
      // Qui inseriremo la logica per salvare i dati su Supabase
      console.log("Dati da salvare:", data);
      toast.success("Profilo bambino salvato con successo!");
    } catch (error) {
      toast.error("Errore durante il salvataggio del profilo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="p-4 flex items-center justify-between border-b border-border">
        <Link to="/parent" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Indietro</span>
        </Link>
        <Logo size="sm" />
        <div className="w-9"></div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
        <Motion className="animate-fade-in">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Users size={20} className="text-primary" />
              </div>
              <h1 className="text-2xl font-semibold">Profilo Bambino</h1>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="border-b border-border pb-6 mb-6">
                  <h2 className="text-lg font-medium mb-4">Informazioni Genitore</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nomeGenitore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Genitore</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cognomeGenitore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cognome Genitore</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il cognome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataNascita"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data di nascita</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="luogoNascita"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Luogo di nascita</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il luogo di nascita" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="codiceFiscale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Codice Fiscale</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il codice fiscale" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Inserisci l'email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numeroTelefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero di telefono</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il numero di telefono" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="indirizzo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Indirizzo</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci l'indirizzo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-4">Informazioni Bambino</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nomeBambino"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Bambino</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il nome del bambino" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cognomeBambino"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cognome Bambino</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il cognome del bambino" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scuolaDestinazione"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scuola di destinazione</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci la scuola" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="classeDestinazione"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classe</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci la classe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Salvataggio in corso..." : "Salva profilo"}
                </Button>
              </form>
            </Form>
          </GlassCard>
        </Motion>
      </main>
    </div>
  );
};

export default ChildProfile;
