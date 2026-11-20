import { ButtonLink } from "@/components/ui/button";
import { FeatureGrid, FeatureTile, RuleGrid } from "@/components/site/grids";
import { Hero, Outline, Section, SectionTitle } from "@/components/site/section";
import { EinblickSection } from "@/components/site/shared-sections";
import { FEATURES } from "@/content/features";
import { pageMetadata } from "@/lib/metadata";
import { DEMO_URL } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/funktionen",
  title: "Funktionen",
  description:
    "Vakante Flächen, Immobilien, Dashboard, Umfragen, Forum, City News, Events, Dokumente, Gruppen und Karte. Fürs Handy gemacht.",
});

const ADMIN = [
  { icon: "invite", title: "Einladungen mit Freigabe", text: "Mitglieder schlagen Personen vor, die Stadt gibt frei. Jede Einladung mit Rolle: Eigentümer, Mitarbeiter Stadt, Gewerbe, Partner." },
  { icon: "shield", title: "Moderation", text: "Gemeldete Inhalte prüfen, Inserate freigeben, Mitglieder verwalten." },
  { icon: "mail", title: "Newsletter", text: "Informationen an alle Mitglieder oder einzelne Rollen, mit Vorschau und Testversand." },
  { icon: "phone", title: "Mobil und sicher", text: "Als App installierbar. Optional mit 2-Faktor-Anmeldung." },
  { icon: "feed", title: "Auswertungen", text: "Beteiligung, Themen und Flächen im Überblick. Export als Tabelle." },
  { icon: "user", title: "Sammelimport", text: "Bestehende Kontakte aus Excel übernehmen. Jede Person legt beim ersten Login ihr Passwort fest." },
] as const;

export default function FunktionenPage() {
  return (
    <>
      <Hero
        label="Funktionen"
        title={
          <>
            Alles, was eine Innenstadt <Outline>braucht.</Outline>
          </>
        }
        lead="Ein Werkzeug für Leerstand, Austausch und Beteiligung. Fürs Handy gemacht, schnell und einfach zu bedienen."
      />

      <Section variant="paper">
        <h2 className="sr-only">Alle Funktionen</h2>
        <FeatureGrid features={FEATURES} cols={3} />
      </Section>

      <EinblickSection variant="funktionen" background="white" />

      <Section variant="paper" labelledBy="verwaltung" innerClassName="gap-7">
        <SectionTitle label="Verwaltung" title="Für die Administration." id="verwaltung" />
        <RuleGrid cols={3}>
          {ADMIN.map((a) => (
            <FeatureTile key={a.title} icon={a.icon} title={a.title} text={a.text} />
          ))}
        </RuleGrid>
        <ButtonLink href={DEMO_URL} size="lg" lift className="self-start">
          Alles in der Demo ausprobieren
        </ButtonLink>
      </Section>
    </>
  );
}
