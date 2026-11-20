// Kontaktformular: Anliegen (UB03 3.7)
export const ANLIEGEN = [
  { value: "demo", label: "Demo-Termin für meine Stadt" },
  { value: "infopaket", label: "Infopaket für Verwaltung und Gemeinderat" },
  { value: "pilot", label: "Pilotangebot" },
  { value: "zugang", label: "Zugang als Eigentümer oder Gewerbe" },
  { value: "partner", label: "Partnerschaft" },
] as const;

export type Anliegen = (typeof ANLIEGEN)[number]["value"];

export function isAnliegen(v: unknown): v is Anliegen {
  return typeof v === "string" && ANLIEGEN.some((a) => a.value === v);
}

export function anliegenLabel(v: Anliegen): string {
  return ANLIEGEN.find((a) => a.value === v)?.label ?? v;
}
