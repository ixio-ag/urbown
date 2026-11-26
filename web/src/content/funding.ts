// Förderung auf /staedte (UB04 4.7, Prüfung UB04 Abschnitt 2). Nur diese Daten ändern, wenn der Förderstand nachgeführt wird.
// Förderstand halbjährlich prüfen (UB28), zusammen mit der Quelle des Infopakets.

export type FundingRegion = { tag: string; title: string; items: string[] };

export const FUNDING: { stand: string; regions: FundingRegion[] } = {
  stand: "November 2026",
  regions: [
    {
      tag: "Deutschland",
      title: "Bund und Länder",
      items: [
        "Städtebauförderung, Programm «Lebendige Zentren» (über die Länder), z. B. für Citymanagement oder Verfügungsfonds in einem Fördergebiet",
        "Landesprogramme für Innenstädte und Ortszentren, z. B. «Zukunftsfähige Innenstädte und Ortszentren» in Nordrhein-Westfalen oder das «Sofortprogramm Einzelhandel/Innenstadt» in Baden-Württemberg (bis Ende 2026)",
        "Für Eigentümer im Netzwerk: Bundesförderung «Gewerbe zu Wohnen» (KfW, seit Juli 2026) für den Umbau leerer Gewerbeflächen zu Wohnungen",
      ],
    },
    {
      tag: "Schweiz",
      title: "Bund, Kantone und Beratung",
      items: [
        "Neue Regionalpolitik (SECO und Kantone) für Gemeinden im ländlichen Raum, in Berggebieten und Grenzregionen",
        "Kantonale Wirtschafts- und Standortförderung",
        "Beratung zur Zentrumsentwicklung von EspaceSuisse (z. B. Nutzungsstrategie), mit urbown als Werkzeug für die Umsetzung",
      ],
    },
  ],
};
