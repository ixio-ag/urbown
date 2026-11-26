import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { DEMO_URL } from "@/lib/site";
import { PriceBlock } from "./blocks";
import { ScreenShowcase } from "./screen-showcase";
import { Lead, Section, SectionTitle, Split } from "./section";

/** Bereich «Einblick» (UB03 5): Start = 3 Bildschirmfotos + Demo-Button, Funktionen = 5 Bildschirmfotos. */
export function EinblickSection({ variant, background }: { variant: "start" | "funktionen"; background: "white" | "paper" }) {
  return (
    <Section variant={background} labelledBy="einblick">
      <SectionTitle label="Einblick" title="So sieht Ihr Netzwerk aus." id="einblick">
        <Lead>Ein Blick ins Demo-Netzwerk, auf dem Handy und am Computer. Alle Namen und Inhalte sind Beispieldaten.</Lead>
      </SectionTitle>
      <ScreenShowcase variant={variant} />
      {variant === "start" ? (
        <ButtonLink href={DEMO_URL} variant="secondary" size="lg" lift className="self-start">
          Demo selbst testen
        </ButtonLink>
      ) : null}
    </Section>
  );
}

/** Preis-Sektion mit Split-Titel und Lead (Start «Preise», Städte «Kosten»). */
export function PriceSection({
  id,
  label,
  title,
  lead,
  background,
  children,
}: {
  id: string;
  label: string;
  title: string;
  lead: string;
  background: "white" | "paper";
  /** Zusatz unter dem Preis-Block (z. B. Hinweis «Budget» auf /staedte). */
  children?: ReactNode;
}) {
  return (
    <Section variant={background} labelledBy={id} innerClassName="gap-7">
      <Split aside={<SectionTitle label={label} title={title} id={id} />}>
        <Lead>{lead}</Lead>
      </Split>
      <PriceBlock />
      {children}
    </Section>
  );
}
