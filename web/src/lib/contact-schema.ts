import { z } from "zod";
import { ANLIEGEN } from "@/content/contact";

// Prüfregeln Kontaktformular (UB03 3.7), gemeinsam für Browser und Server. Meldungen wörtlich.
export const MSG = {
  vorname: "Bitte geben Sie Ihren Vornamen ein.",
  name: "Bitte geben Sie Ihren Namen ein.",
  emailFehlt: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
  emailUngueltig: "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@stadt.de.",
  mehrere: "Bitte prüfen Sie die markierten Felder.",
  turnstile: "Die Sicherheitsprüfung hat nicht geklappt. Bitte laden Sie die Seite neu und versuchen Sie es nochmals.",
  rateLimit: "Sie haben gerade mehrere Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten nochmals.",
  versand: "Das hat leider nicht geklappt. Bitte versuchen Sie es nochmals oder schreiben Sie direkt an info@urbown.com.",
  zuLang: "Bitte kürzen Sie Ihre Eingabe.",
} as const;

const anliegenValues = ANLIEGEN.map((a) => a.value) as [string, ...string[]];

const optionalText = (max: number) => z.string().trim().max(max, MSG.zuLang);

export const contactSchema = z.object({
  anliegen: z.enum(anliegenValues).catch("demo"),
  vorname: z.string().trim().min(1, MSG.vorname).max(80, MSG.zuLang),
  name: z.string().trim().min(1, MSG.name).max(80, MSG.zuLang),
  organisation: optionalText(120),
  funktion: optionalText(120),
  email: z
    .string()
    .trim()
    .min(1, MSG.emailFehlt)
    .max(200, MSG.zuLang)
    .pipe(z.email({ error: MSG.emailUngueltig })),
  nachricht: optionalText(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Reihenfolge der Felder für die Fehlerliste. */
export const FIELD_ORDER: ContactField[] = ["anliegen", "vorname", "name", "organisation", "funktion", "email", "nachricht"];

export const FIELD_LABEL: Record<ContactField, string> = {
  anliegen: "Ich interessiere mich für",
  vorname: "Vorname",
  name: "Name",
  organisation: "Organisation / Stadt",
  funktion: "Funktion",
  email: "E-Mail",
  nachricht: "Nachricht",
};

export type FieldErrors = Partial<Record<ContactField, string>>;

/** Werte aus FormData lesen (nur bekannte Felder, immer Strings). */
export function readContactForm(fd: FormData): Record<ContactField, string> {
  const get = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    anliegen: get("anliegen"),
    vorname: get("vorname"),
    name: get("name"),
    organisation: get("organisation"),
    funktion: get("funktion"),
    email: get("email"),
    nachricht: get("nachricht"),
  };
}

/** Prüfen und Fehler je Feld (erste Meldung) zurückgeben. */
export function validateContact(values: Record<ContactField, string>):
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors } {
  const result = contactSchema.safeParse(values);
  if (result.success) return { ok: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
