// Unterlagen zum Download (UB04 4.9, Abschnitt 5). Dateien liegen in web/public/downloads/ (Kopie aus docs/grundlagen/downloads/).
// Typ, Seitenzahl und Grösse kommen aus downloads.meta.json (scripts/download-meta.mjs, vor jedem Build).
import META from "./downloads.meta.json";

export type DownloadMeta = { type: string; bytes: number; size: string; pages?: number };

/** view: Link öffnet die Datei im Browser («PDF ansehen»), ohne download-Attribut. */
export type DownloadFile = { label: string; file: keyof typeof META; view?: boolean };

export type Download = { title: string; text: string; files: DownloadFile[] };

export const DOWNLOADS_PATH = "/downloads";

export const INFOPAKET_FILE = "urbown-infopaket-staedte.pdf" satisfies keyof typeof META;

export const DOWNLOADS: Download[] = [
  {
    title: "Infopaket für Städte",
    text: "Nutzen, Ablauf, Kosten, Datenschutz und Förderung auf acht Seiten. Zum Weitergeben in der Verwaltung.",
    files: [{ label: "PDF herunterladen", file: "urbown-infopaket-staedte.pdf" }],
  },
  {
    title: "Muster-Beschlussvorlage",
    text: "Vorlage für den Beschluss zum kostenlosen Pilot, mit Begründung und Beschlussvorschlag. Zum Anpassen in Word.",
    files: [
      { label: "Word herunterladen", file: "urbown-muster-beschlussvorlage.docx" },
      { label: "PDF ansehen", file: "urbown-muster-beschlussvorlage.pdf", view: true },
    ],
  },
  {
    title: "AV-Vertrag (Entwurf)",
    text: "Vertrag zur Auftragsverarbeitung nach DSGVO und DSG, mit Sicherheitsmassnahmen und Liste der Dienstleister.",
    files: [
      { label: "Word herunterladen", file: "urbown-av-vertrag-entwurf.docx" },
      { label: "PDF ansehen", file: "urbown-av-vertrag-entwurf.pdf", view: true },
    ],
  },
];

export function downloadHref(file: string): string {
  return `${DOWNLOADS_PATH}/${file}`;
}

export function downloadMeta(file: keyof typeof META): DownloadMeta {
  return META[file] as DownloadMeta;
}

/** Mono-Zeile «PDF · 8 Seiten · 206 KB» bzw. «Word · 17 KB». */
export function downloadSummary(file: keyof typeof META): string {
  const m = downloadMeta(file);
  return [m.type, m.pages ? `${m.pages} ${m.pages === 1 ? "Seite" : "Seiten"}` : null, m.size].filter(Boolean).join(" · ");
}
