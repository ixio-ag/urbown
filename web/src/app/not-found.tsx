import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { SkipLink } from "@/components/ui/skip-link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Eyebrow, Lead } from "@/components/site/section";
import { archivoBlack } from "./fonts";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

/** 404 (UB03 3.9): Kopf und Footer wie überall. */
export default function NotFound() {
  return (
    <div className={`${archivoBlack.variable} flex min-h-dvh flex-col`}>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="band flex-1 bg-white pt-[clamp(3rem,8vw,6.5rem)] pb-[clamp(3.5rem,8vw,7rem)] outline-none">
        <div className="mx-auto flex max-w-site flex-col items-start gap-7">
          <Eyebrow>Fehler 404</Eyebrow>
          <h1 className="font-display-black text-display-1 font-black">Diese Seite gibt es nicht.</h1>
          <Lead>Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie alles Wichtige.</Lead>
          <ButtonLink href="/" size="lg" lift>
            Zur Startseite
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
