import { ButtonLink } from "@/components/ui/button";
import { AddressCard } from "@/components/site/address-card";
import { Steps } from "@/components/site/blocks";
import { AudienceGrid, FeatureGrid, RefStats } from "@/components/site/grids";
import { ImageBand, PHOTOS } from "@/components/site/photos";
import { Hero, Lead, Outline, Section, SectionTitle, Split } from "@/components/site/section";
import { EinblickSection, PriceSection } from "@/components/site/shared-sections";
import { FEATURES } from "@/content/features";
import { pageMetadata } from "@/lib/metadata";
import { COMPANY, CONTACT_EMAIL, DEMO_URL, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  absoluteTitle: "urbown – das geschlossene Netzwerk für Ihre Innenstadt",
  description:
    "urbown verbindet Eigentümer, Gewerbe und Stadtverwaltung in einem geschlossenen Netzwerk pro Stadt. Leerstände früh sehen, Flächen schneller vermitteln. 6 Monate kostenlos testen.",
});

// Strukturierte Daten (UB03 2.4), nur Startseite
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "urbown",
  legalName: COMPANY.name,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  logo: `${SITE_URL}/brand/urbown-quadrat.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.city,
    addressCountry: COMPANY.countryCode,
  },
};

export default function StartPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />

      <Hero
        label="Das geschlossene Netzwerk für Ihre Innenstadt"
        title={
          <>
            Die Innenstadt gehört denen, die sie <Outline>gemeinsam</Outline> gestalten.
          </>
        }
        lead="urbown verbindet Eigentümer, Gewerbe und Stadtverwaltung in einem eigenen, geschlossenen Netzwerk pro Stadt. Leerstände werden früh sichtbar, Flächen finden schneller neue Nutzer, Entscheidungen fallen gemeinsam."
        actions={
          <>
            <ButtonLink href="/kontakt" size="lg" lift>
              Demo anfragen
            </ButtonLink>
            <ButtonLink href={DEMO_URL} variant="secondary" size="lg" lift>
              Demo selbst testen
            </ButtonLink>
          </>
        }
        aside={<AddressCard />}
      />

      <AudienceGrid
        items={[
          { label: "Für Eigentümer", text: "Früh wissen, was in der Nachbarschaft passiert. Flächen diskret vermarkten.", href: "/eigentuemer" },
          { label: "Für Gewerbe", text: "Passende Flächen finden, bevor sie öffentlich inseriert werden.", href: "/eigentuemer" },
          { label: "Für Städte & Ämter", text: "Ein direkter Draht zu allen Eigentümern. Ein Frühwarnsystem für Leerstand.", href: "/staedte" },
        ]}
      />

      <ImageBand photo={PHOTOS.startSchaufenster} background="white" />

      <Section variant="paper" labelledBy="problem" innerClassName="gap-10">
        <Split aside={<SectionTitle label="Das Problem" title="Leerstand kündigt sich an. Nur hört es niemand." id="problem" />}>
          <Lead>
            Ein Mieter zieht in sechs Monaten aus, ein Erbe will verkaufen, ein Händler sucht 100 m² in bester Lage. Diese
            Informationen gibt es in jeder Stadt. Sie laufen nur nirgends zusammen. urbown ist der Ort, an dem sie sich treffen:
            geschlossen, vertraulich und mit der Stadt am Tisch.
          </Lead>
        </Split>
        <FeatureGrid features={FEATURES.slice(0, 4)} cols={4} />
        <ButtonLink href="/funktionen" variant="secondary" size="lg" lift className="self-start">
          Alle Funktionen
        </ButtonLink>
      </Section>

      <EinblickSection variant="start" background="white" />

      <Section variant="paper" labelledBy="start-schritte">
        <Split
          aside={
            <SectionTitle label="So startet Ihre Stadt" title="In fünf Schritten zum eigenen Netzwerk." id="start-schritte">
              <ButtonLink href="/staedte" size="lg" lift className="self-start">
                Informationen für Städte
              </ButtonLink>
            </SectionTitle>
          }
        >
          <Steps />
        </Split>
      </Section>

      <Section variant="white" labelledBy="referenz">
        <SectionTitle label="Referenz" title="Mannheim ist seit 2022 dabei." id="referenz" />
        <RefStats
          items={[
            { value: "2022", text: "Start des Netzwerks Mannheim" },
            { value: "35", text: "Mitglieder: Eigentümer, Gewerbe, Stadt" },
            { value: "53", text: "Immobilien im Netzwerk" },
          ]}
        />
      </Section>

      <PriceSection
        id="preise"
        label="Preise"
        title="Kostenlos starten."
        lead="Testen Sie urbown sechs Monate mit Ihrer Innenstadt. Danach erhalten Sie ein Angebot, das zu Ihrer Stadt passt."
        background="paper"
      />
    </>
  );
}
