// Preis-Block (UB03 2.5, wörtlich). Keine Paketnamen, keine Beträge (Master 2 «Pricing»).
export type PriceBox = { label: string; title: string; texts: string[]; cta?: { label: string; href: string } };

export const PRICE_BOXES: PriceBox[] = [
  {
    label: "Start",
    title: "6 Monate kostenlos testen",
    texts: [
      "Ihr eigenes Netzwerk, vollständig eingerichtet. Alle Funktionen, Begleitung beim Start, Kick-off mit Eigentümern. Unverbindlich, endet automatisch.",
    ],
    cta: { label: "Pilot anfragen", href: "/kontakt?anliegen=pilot" },
  },
  {
    label: "Danach",
    title: "Ein Angebot, das zu Ihrer Stadt passt",
    texts: [
      "Gegen Ende des Pilots erhalten Sie ein Angebot. Es richtet sich nach der Grösse Ihrer Innenstadt und der gewünschten Begleitung, als fester Jahrespreis in Euro oder Franken. Sie entscheiden dann, ob es weitergeht.",
    ],
  },
  {
    label: "Immer",
    title: "Für Mitglieder kostenlos",
    texts: [
      "Eigentümer, Gewerbe und Partner nutzen urbown ohne Kosten. So machen möglichst viele mit.",
      "Inklusive: alle Funktionen, Hosting in der Schweiz, Updates, Support und Datenschutz-Unterlagen.",
    ],
  },
];
