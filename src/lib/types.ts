
export interface DriverProfile {
  id?: string;
  nome: string;
  cognome: string;
  dataNascita: string;
  luogoNascita: string;
  codiceFiscale: string;
  indirizzo: string;
  numeroTelefono: string;
  numeroLicenza: string;
  documentoGuida: string;
  email: string;
}

export interface ChildProfile {
  id?: string;
  nomeGenitore: string;
  cognomeGenitore: string;
  dataNascita: string;
  luogoNascita: string;
  codiceFiscale: string;
  indirizzo: string;
  numeroTelefono: string;
  nomeBambino: string;
  cognomeBambino: string;
  scuolaDestinazione: string;
  classeDestinazione: string;
  email: string;
}
