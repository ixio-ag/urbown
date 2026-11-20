import { ContactForm } from "./contact-form";
import { Photo, PHOTOS } from "./photos";
import { Eyebrow, Lead, Note, Outline } from "./section";
import type { Anliegen } from "@/content/contact";
import { getTurnstileSiteKey } from "@/lib/server/turnstile";
import { CONTACT_EMAIL } from "@/lib/site";

const photoSizes = "(min-width: 1232px) 350px, (min-width: 900px) 28vw, calc(100vw - 2rem)";

/** Kontaktseite (UB03 3.7). Statisch je Anliegen vorgerendert, damit die Vorauswahl auch ohne JavaScript greift. */
export function KontaktView({ anliegen }: { anliegen: Anliegen }) {
  return (
    <section aria-labelledby="seitentitel" className="band bg-white pt-[clamp(3rem,8vw,6.5rem)] pb-[clamp(3.5rem,8vw,7rem)]">
      <div className="mx-auto grid max-w-site items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="flex min-w-0 flex-col gap-7">
          <Eyebrow>Kontakt</Eyebrow>
          <h1 id="seitentitel" className="font-display-black text-display-1 font-black hyphens-auto">
            Lassen Sie uns über Ihre <Outline>Stadt</Outline> sprechen.
          </h1>
          <Lead>Demo-Termin, Infopaket für den Gemeinderat oder Pilotanfrage. Wir melden uns innerhalb von zwei Werktagen.</Lead>
          <Note>
            <Eyebrow>Direkt</Eyebrow>
            <a href={`mailto:${CONTACT_EMAIL}`} className="self-start py-1 font-mono text-lg underline-offset-[3px] hover:underline">
              {CONTACT_EMAIL}
            </a>
            <p className="text-ink-2">urbown.com · IXIO AG · Zug</p>
          </Note>
          <Photo photo={PHOTOS.kontaktTasche} ratio="2/3" sizes={photoSizes} className="hidden max-w-[22rem] lg:block" />
        </div>
        <div className="flex min-w-0 flex-col gap-8">
          <ContactForm siteKey={getTurnstileSiteKey()} defaultAnliegen={anliegen} />
          <Photo photo={PHOTOS.kontaktTasche} ratio="2/3" sizes={photoSizes} className="max-w-[22rem] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
