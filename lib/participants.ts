export interface Participant {
  nombre: string;
  email: string;
  id: number;
}

const RAW_PARTICIPANTS: Participant[] = [
  { nombre: "Daniela Liberatoscioli", email: "dani.libe02@gmail.com", id: 5 },
  { nombre: "Carlos Carrasquero", email: "catatocarrasquero@gmail.com", id: 6 },
  { nombre: "Ultima Prueba", email: "catatocarrasquero@gmail.com", id: 7 },
  { nombre: "Fernando Gutierrez Labrador", email: "fernando.gutierrez.L@gmail.com", id: 8 },
  { nombre: "Hortensia Orsini", email: "orsini@ipecampus.com", id: 9 },
  { nombre: "Edgar Frias", email: "edgar.afs@gmail.com", id: 10 },
  { nombre: "Fernando Gutierrez Labrador", email: "fernando.gutierrez.L@gmail.com", id: 11 },
  { nombre: "Adriana Garcia", email: "adrianagarcia.bienestar@gmail.com", id: 12 },
  { nombre: "Valentina Betancourt", email: "valenbetancourt@gmail.com", id: 13 },
  { nombre: "Susana dos Santos", email: "sdossantos@elavila.org", id: 14 },
  { nombre: "Milagros Briceno", email: "mbriceno@unimet.edu.ve", id: 15 },
  { nombre: "Antonieta Martinis", email: "antonietamartinis@gmail.com", id: 16 },
  { nombre: "Daniel F Moros", email: "moors81@gmail.com", id: 17 },
  { nombre: "Lupe Medina", email: "lupemedina@elavila.org", id: 18 },
  { nombre: "Jorge Jaua", email: "jorge.jaua.c@gmail.com", id: 19 },
  { nombre: "Yura Aliendres", email: "yuraaliendres@gmail.com", id: 20 },
  { nombre: "Graciela Azpurua", email: "graciela_azpurua@yahoo.com", id: 21 },
  { nombre: "Yura Aliendres", email: "yuraaliendres@gmail.com", id: 22 },
  { nombre: "Luis Alberto Arias", email: "ariasluisalbertog@gmail.com", id: 23 },
  { nombre: "Thomas", email: "thmghm07@gmail.com", id: 24 },
  { nombre: "Cristina Navarro Colmenares", email: "navarrocristina@yahoo.com", id: 25 },
  { nombre: "Valentina Vera", email: "valentinaverac94@gmail.com", id: 26 },
  { nombre: "Danny Pierri", email: "danny08111996@gmail.com", id: 27 },
  { nombre: "Antonio Bracho", email: "abracho@unimet.edu.ve", id: 28 },
  { nombre: "Mariale Arreaza", email: "marialearreaza1@gmail.com", id: 29 },
  { nombre: "Doris Baptista", email: "baptista.legald@gmail.com", id: 30 },
  { nombre: "Mariannie Del Alcazar", email: "marianniedap@gmail.com", id: 31 },
  { nombre: "Maria Eugenia Velasquez", email: "mvelasquez@elavila.org", id: 32 },
  { nombre: "Andres Zeberio", email: "azeberio66@gmail.com", id: 33 },
  { nombre: "Karen", email: "leyrekar@gmail.com", id: 34 },
  { nombre: "Andres Zeberio", email: "azeberio66@gmail.com", id: 35 },
  { nombre: "Carmen Espinoza", email: "espinozadiazcarmen@gmail.com", id: 36 },
  { nombre: "Hugo Daniel Patruyo Chirinos", email: "hugopatruyo4@gmail.com", id: 37 },
  { nombre: "Luis Humberto Mejias", email: "lmejias@unimet.edu.ve", id: 38 },
  { nombre: "Susana Pamplona", email: "agape38@gmail.com", id: 39 },
  { nombre: "Suger Sleiman", email: "sugeramses@gmail.com", id: 40 },
  { nombre: "Hernando Mujica Golding", email: "inversionesmgml@gmail.com", id: 41 },
  { nombre: "Carolina Cardenas", email: "ccardenas@elavila.org", id: 42 },
  { nombre: "Catherine Silva", email: "cathysil262@gmail.com", id: 43 },
  { nombre: "Mauricio Subero Mujica", email: "msuberom@gmail.com", id: 44 },
  { nombre: "Josefina Lucena", email: "lucejo@gmail.com", id: 45 },
  { nombre: "Raquel Delgado", email: "radelca3@gmail.com", id: 46 },
  { nombre: "Stefania Carleo", email: "stefaniacarleo@gmail.com", id: 47 },
  { nombre: "Giuseppe Dirani", email: "gpdirani@gmail.com", id: 48 },
  { nombre: "Karen Salazar", email: "karenbanchs1980@yahoo.com", id: 49 },
  { nombre: "Cesar Zurita", email: "cazuritap@gmail.com", id: 50 },
  { nombre: "Amelia Carrasquero", email: "ameliacarrasquero@gmail.com", id: 51 },
  { nombre: "Omar Vera", email: "omarvera70@gmail.com", id: 52 },
  { nombre: "Jose Angel Celayaran", email: "jcelarayancorpobienes@gmail.com", id: 53 },
  { nombre: "Cecilia Hoffman", email: "cehomi1907@gmail.com", id: 54 },
  { nombre: "Carlos Machado", email: "carlosmachado05@gmail.com", id: 55 },
  { nombre: "Salvador Itriago", email: "salvadoritriagos@mail.com", id: 56 },
  { nombre: "Idana Ravelo", email: "idana.angelica@gmail.com", id: 57 },
  { nombre: "Maria Christiansen", email: "fjauachr@gmail.com", id: 58 },
  { nombre: "Maria Angelina Vargas", email: "maangelina73@gmail.com", id: 59 },
  { nombre: "Geraldine Farfan", email: "geraldinefarfan26@gmail.com", id: 60 },
  { nombre: "Juan Roman Vargas Gutierrez", email: "vgjroman@gmail.com", id: 61 },
  { nombre: "Miryam Sosa Herrera", email: "angelibert@gmail.com", id: 62 },
  { nombre: "Maria Christiansen", email: "fjauachr@gmail.com", id: 63 },
  { nombre: "Jenny Navarro", email: "Jen23navarro@gmail.com", id: 64 },
  { nombre: "Nadelys Martinez", email: "Nadelysmartinez@colegiomadison.com", id: 65 },
  { nombre: "Cristal Delgado", email: "cristal.delgados06@gmail.com", id: 66 },
  { nombre: "Karen Ortega", email: "Kortega@trust-ex.com", id: 67 },
  { nombre: "Gianny Lopez", email: "giannylopez240@gmail.com", id: 68 },
  { nombre: "Killian Camacho", email: "camachokillian.kc@gmail.com", id: 69 },
  { nombre: "Stephan", email: "fafan261001@gmail.com", id: 70 },
];

export function getUniqueParticipants(): Participant[] {
  const seen = new Set<string>();
  return RAW_PARTICIPANTS.filter((p) => {
    const key = p.email.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const GUARANTEED_EMAILS = new Set([
  "jen23navarro@gmail.com",
  "nadelysmartinez@colegiomadison.com",
  "cristal.delgados06@gmail.com",
  "sdossantos@elavila.org",
  "marianniedap@gmail.com",
  "kortega@trust-ex.com",
  "giannylopez240@gmail.com",
  "camachokillian.kc@gmail.com",
  "fafan261001@gmail.com",
]);

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectRandomWinners(
  participants: Participant[],
  count: number
): Participant[] {
  return shuffle(participants).slice(0, count);
}

export function selectRiggedWinners(
  participants: Participant[],
  totalCount: number
): Participant[] {
  const guaranteed = participants.filter((p) =>
    GUARANTEED_EMAILS.has(p.email.toLowerCase().trim())
  );
  const pool = participants.filter(
    (p) => !GUARANTEED_EMAILS.has(p.email.toLowerCase().trim())
  );
  const randomCount = totalCount - guaranteed.length;
  const randomWinners = shuffle(pool).slice(0, randomCount);
  return shuffle([...guaranteed, ...randomWinners]);
}
