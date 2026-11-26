import { CONTACT_EMAIL } from "@/lib/site";
import { Note } from "./section";

/** Hinweis «Bitte JavaScript aktivieren» (UB04 4.13, K5): im <noscript> über dem Formular und als Antwort des Servers. */
export function NoJsNote({ id }: { id?: string }) {
  return (
    <Note className="bg-white">
      <p id={id} className="font-bold">
        Bitte JavaScript aktivieren
      </p>
      <p className="text-ink-2">
        Zum Senden braucht dieses Formular JavaScript (Schutz vor Spam). Sie können uns auch direkt schreiben:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-[3px] hover:decoration-2">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </Note>
  );
}
