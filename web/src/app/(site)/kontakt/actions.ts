"use server";

import { headers } from "next/headers";
import { anliegenLabel, isAnliegen } from "@/content/contact";
import { MSG, readContactForm, validateContact, type ContactField, type FieldErrors } from "@/lib/contact-schema";
import { sendMail } from "@/lib/server/mail";
import { takeRateLimit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";

export type ContactState = {
  status: "idle" | "error" | "success";
  /** Fehler je Feld (am Feld angezeigt). */
  fieldErrors?: FieldErrors;
  /** Meldung über dem Button (Sicherheitsprüfung, Rate-Limit, Versand). */
  formError?: string;
  /** Formular ohne JavaScript gesendet (kein Turnstile-Token möglich): Hinweis aus UB04 4.13 statt formError (K5). */
  noJs?: boolean;
  /** Eingaben zum Wiederbefüllen (auch ohne JavaScript). */
  values?: Partial<Record<ContactField, string>>;
  /** Wechselt bei jeder Antwort (Turnstile neu laden, Fokus setzen). */
  nonce?: number;
};

function clientIp(h: Headers): string {
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return h.get("x-real-ip") ?? "";
}

function formatZurich(date: Date): string {
  const parts = new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const p = (t: string) => parts.find((x) => x.type === t)?.value ?? "";
  return `${p("day")}.${p("month")}.${p("year")} ${p("hour")}:${p("minute")}`;
}

/** Kontaktformular senden (UB03 3.7). Keine Speicherung der Anfrage, keine IP in der Mail. */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readContactForm(formData);
  const nonce = Date.now();

  // Honigtopf: Bots füllen das versteckte Feld – still verwerfen, Erfolg anzeigen
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", nonce };
  }

  const checked = validateContact(values);
  if (!checked.ok) {
    return { status: "error", fieldErrors: checked.errors, values, nonce };
  }

  const rawToken = formData.get("cf-turnstile-response");
  const token = typeof rawToken === "string" && rawToken !== "" ? rawToken : null;

  // Ohne JavaScript gibt es kein Token und kein Feld «js» (setzt nur das hydrierte Formular): Hinweis statt Turnstile-Meldung (K5)
  if (!token && formData.get("js") !== "1") {
    return { status: "error", noJs: true, values, nonce };
  }

  const h = await headers();
  const ip = clientIp(h);
  if (!takeRateLimit(ip)) {
    return { status: "error", formError: MSG.rateLimit, values, nonce };
  }

  const human = await verifyTurnstile(token, ip || undefined);
  if (!human) {
    return { status: "error", formError: MSG.turnstile, values, nonce };
  }

  const d = checked.data;
  const anliegen = isAnliegen(d.anliegen) ? anliegenLabel(d.anliegen) : d.anliegen;
  const orDash = (v: string) => (v ? v : "–");
  const text = [
    "Neue Anfrage über urbown.com/kontakt",
    "",
    `Anliegen:      ${anliegen}`,
    `Vorname:       ${d.vorname}`,
    `Name:          ${d.name}`,
    `Organisation:  ${orDash(d.organisation)}`,
    `Funktion:      ${orDash(d.funktion)}`,
    `E-Mail:        ${d.email}`,
    "",
    "Nachricht:",
    orDash(d.nachricht),
    "",
    "–",
    `Gesendet am ${formatZurich(new Date())} (Europe/Zurich). Antworten Sie direkt auf diese E-Mail.`,
  ].join("\n");

  try {
    await sendMail({
      to: process.env.MAIL_TO_CONTACT?.trim() || "info@urbown.com",
      replyTo: d.email,
      subject: `Anfrage urbown.com: ${anliegen} – ${d.organisation || "ohne Organisation"}`,
      text,
    });
  } catch (err) {
    console.error("Kontaktformular: Versand fehlgeschlagen", err instanceof Error ? err.message : err);
    return { status: "error", formError: MSG.versand, values, nonce };
  }

  return { status: "success", nonce };
}
