
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserCheck } from 'lucide-react';
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
import { DriverProfile as DriverProfileType } from '@/lib/types';

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Il nome deve contenere almeno 2 caratteri",
  }),
  cognome: z.string().min(2, {
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
  numeroLicenza: z.string().min(5, {
    message: "Inserisci un numero di licenza valido",
  }),
  documentoGuida: z.string().min(5, {
    message: "Inserisci gli estremi del documento di guida",
  }),
  email: z.string().email({
    message: "Inserisci un'email valida",
  }),
});

const DriverProfile = () => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm<DriverProfileType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      dataNascita: "",
      luogoNascita: "",
      codiceFiscale: "",
      indirizzo: "",
      numeroTelefono: "",
      numeroLicenza: "",
      documentoGuida: "",
      email: "",
    },
  });

  const onSubmit = async (data: DriverProfileType) => {
    setLoading(true);
    try {
      // Qui inseriremo la logica per salvare i dati su Supabase
      console.log("Dati da salvare:", data);
      toast.success("Profilo salvato con successo!");
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
        <Link to="/driver" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
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
                <UserCheck size={20} className="text-primary" />
              </div>
              <h1 className="text-2xl font-semibold">Profilo Autista</h1>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Inserisci il nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cognome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cognome</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="numeroLicenza"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numero di licenza</FormLabel>
                        <FormControl>
                          <Input placeholder="Inserisci il numero di licenza" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentoGuida"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Documento di guida</FormLabel>
                        <FormControl>
                          <Input placeholder="Inserisci gli estremi del documento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

export default DriverProfile;
