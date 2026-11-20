import { Suspense } from "react";
import { ContactForm } from "@/components/site/contact-form";
import { Photo, PHOTOS } from "@/components/site/photos";
import { Eyebrow, Lead, Note, Outline } from "@/components/site/section";
import { isAnliegen, type Anliegen } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { getTurnstileSiteKey } from "@/lib/server/turnstile";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/kontakt",
  title: "Kontakt",
  description: "Demo-Termin, Infopaket für den Gemeinderat oder Pilotanfrage. Wir melden uns innerhalb von zwei Werktagen.",
});

const photoSizes = "(min-width: 1232px) 350px, (min-width: 900px) 28vw, calc(100vw - 2rem)";

/** Vorauswahl über ?anliegen=… (dynamisch, in Suspense; der Rest der Seite bleibt statisch). */
async function FormWithPreselect({ searchParams }: { searchParams: PageProps<"/kontakt">["searchParams"] }) {
  const params = await searchParams;
  const raw = Array.isArray(params.anliegen) ? params.anliegen[0] : params.anliegen;
  const anliegen: Anliegen = isAnliegen(raw) ? raw : "demo";
  return <ContactForm siteKey={getTurnstileSiteKey()} defaultAnliegen={anliegen} />;
}

export default function KontaktPage({ searchParams }: PageProps<"/kontakt">) {
  return (
    <section aria-labelledby="seitentitel" className="band bg-white pt-[clamp(3rem,8vw,6.5rem)] pb-[clamp(3.5rem,8vw,7rem)]">
      <div className="mx-auto grid max-w-site items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="flex min-w-0 flex-col gap-7">
          <Eyebrow>Kontakt</Eyebrow>
          <h1 id="seitentitel" className="font-display-black text-display-1 font-black">
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
          <Suspense fallback={<ContactForm siteKey={getTurnstileSiteKey()} defaultAnliegen="demo" />}>
            <FormWithPreselect searchParams={searchParams} />
          </Suspense>
          <Photo photo={PHOTOS.kontaktTasche} ratio="2/3" sizes={photoSizes} className="max-w-[22rem] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
