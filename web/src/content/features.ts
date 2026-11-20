import type { IconName } from "@/components/ui/icons";

export type Feature = { icon: IconName; title: string; text: string };

// Funktionsliste (UB03 2.5, wörtlich)
export const FEATURES: Feature[] = [
  { icon: "store", title: "Vakante Flächen", text: "Leerstände kurz inserieren: Fläche, Schaufensterfront, verfügbar ab. In Liste und Karte." },
  { icon: "building", title: "Diskrete Immobilien", text: "Verkaufsinserate nur für Mitglieder. Import per Link oder OpenImmo." },
  { icon: "feed", title: "Dashboard", text: "Nach dem Login alles Neue auf einen Blick: Themen, Flächen, Inserate, News." },
  { icon: "poll", title: "Umfragen", text: "So einfach wie im Messenger. Ergebnisse live." },
  { icon: "forum", title: "Forum", text: "Themen eröffnen, diskutieren, Erfahrungen teilen." },
  { icon: "news", title: "City News", text: "Jedes Mitglied schreibt Beiträge, mit Bild und Quelle." },
  { icon: "cal", title: "Events & Kalender", text: "Stammtische, Workshops, Aktionen. Mit Anmeldung." },
  { icon: "folder", title: "Dokumente", text: "Übersichtliche Ordner für Verträge, Protokolle, Förderinfos." },
  { icon: "group", title: "Gruppen", text: "Arbeitsgruppen und Nachbarschaften mit eigenen Themen." },
  { icon: "map", title: "Karte", text: "Orte mit Titel und Kurzbeschreibung markieren, nach Themen filtern." },
  { icon: "msg", title: "Direktnachrichten", text: "Anfragen zu Flächen und Inseraten direkt an den Eigentümer." },
  {
    icon: "invite",
    title: "Netzwerkübergreifend",
    text: "Freiwillig: Profil oder einzelne Beiträge für Mitglieder aller Städte freigeben. Standard bleibt das eigene Netzwerk.",
  },
  { icon: "user", title: "Mein Portfolio", text: "Alle eigenen Inhalte an einem Ort. Sie bestimmen, wofür Sie E-Mails erhalten." },
];
