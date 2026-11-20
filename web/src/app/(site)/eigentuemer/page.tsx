import { ButtonLink } from "@/components/ui/button";
import { RuleCell, RuleGrid } from "@/components/site/grids";
import { ImageBand, Photo, PHOTOS } from "@/components/site/photos";
import { H3, Hero, HeroCard, Outline, Section, SectionTitle, Split } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";
import { DEMO_URL } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/eigentuemer",
  title: "Für Eigentümer und Gewerbe",
  description:
    "Früh wissen, welche Flächen frei werden, Immobilien diskret vermarkten und direkt mit der Stadt sprechen. Für Mitglieder kostenlos.",
});

const BENEFITS = [
  ["Leerstand vermeiden", "Melden Sie einen anstehenden Auszug früh. Gewerbe und Partner im Netzwerk sehen die Fläche, bevor sie leer steht."],
  ["Diskret verkaufen", "Inserieren Sie eine Immobilie nur im geschlossenen Kreis. Die genaue Adresse geben Sie erst auf Anfrage heraus."],
  ["Mitreden", "Baustellen, Beleuchtung, Lieferzonen, verkaufsoffene Sonntage: Sie diskutieren mit und stimmen in Umfragen ab."],
  ["Direkter Draht zur Stadt", "Innenstadtbüro und Wirtschaftsförderung sind Mitglieder. Fragen landen bei den richtigen Personen."],
  ["Fürs Handy gemacht", "Inserat in zwei Minuten vom Smartphone. Installierbar wie eine App."],
  ["Sie behalten die Kontrolle", "In «Mein Portfolio» verwalten Sie alle eigenen Inhalte und bestimmen genau, wofür Sie E-Mails erhalten."],
] as const;

const LISTING: { term: string; value: string; mono?: boolean }[] = [
  { term: "Fläche", value: "142 m²", mono: true },
  { term: "Schaufensterfront", value: "11,5 m", mono: true },
  { term: "Verfügbar ab", value: "01.02.2027", mono: true },
  { term: "Nutzung", value: "Einzelhandel, Gastronomie, Büro, Praxis, Pop-up" },
  { term: "Miete", value: "Betrag oder «auf Anfrage»" },
  { term: "Kontakt", value: "Anfragen per Direktnachricht an Sie" },
];

const photoSizes = "(min-width: 1232px) 470px, (min-width: 900px) 38vw, calc(100vw - 2rem)";

export default function EigentuemerPage() {
  return (
    <>
      <Hero
        label="Für Eigentümer und Gewerbe"
        title={
          <>
            Ihr Haus. Ihre Strasse. <Outline>Ihr Netzwerk.</Outline>
          </>
        }
        lead="Als Eigentümer oder Gewerbetreibender sind Sie Teil eines geschlossenen Kreises: Sie sehen früh, welche Flächen frei werden, vermarkten diskret und haben einen direkten Draht zur Stadt. Für Mitglieder ist urbown kostenlos."
        actions={
          <>
            <ButtonLink href="/netzwerke" size="lg" lift>
              Zum Login
            </ButtonLink>
            <ButtonLink href={DEMO_URL} variant="secondary" size="lg" lift>
              Demo testen
            </ButtonLink>
          </>
        }
        aside={
          <HeroCard label="Zugang">
            <h2 className="text-xl font-bold">Nur auf Einladung</h2>
            <p className="text-ink-2">
              Sie werden von einem Mitglied oder der Stadt eingeladen. So bleibt das Netzwerk vertraulich und jedes Profil echt.
            </p>
            <p className="text-ink-2">Noch keine Einladung? Schreiben Sie uns, wir stellen den Kontakt zum Netzwerk Ihrer Stadt her.</p>
            <ButtonLink href="/kontakt?anliegen=zugang" variant="secondary" size="lg" lift className="self-start">
              Kontakt aufnehmen
            </ButtonLink>
          </HeroCard>
        }
      />

      <ImageBand photo={PHOTOS.eigentuemerPassanten} background="white" />

      <Section variant="paper" labelledBy="nutzen">
        <SectionTitle label="Ihr Nutzen" title="Was Sie als Mitglied davon haben." id="nutzen" />
        <RuleGrid cols={3}>
          {BENEFITS.map(([title, text]) => (
            <RuleCell key={title}>
              <H3>{title}</H3>
              <p className="text-ink-2">{text}</p>
            </RuleCell>
          ))}
        </RuleGrid>
      </Section>

      <Section variant="white" labelledBy="inserieren">
        <Split
          aside={
            <>
              <SectionTitle label="Vakante Fläche inserieren" title="Kurz und klar. Diese Angaben genügen." id="inserieren" />
              <Photo photo={PHOTOS.eigentuemerLadenflaeche} ratio="4/3" sizes={photoSizes} className="mt-4 hidden lg:block" />
            </>
          }
        >
          <div className="overflow-x-auto border-t-[1.5px] border-ink">
            <table className="w-full border-collapse">
              <caption className="sr-only">Angaben für ein Inserat einer vakanten Fläche</caption>
              <tbody>
                {LISTING.map((row) => (
                  <tr key={row.term}>
                    <th scope="row" className="border-b border-line p-3.5 text-left align-top font-bold">
                      {row.term}
                    </th>
                    <td className={row.mono ? "num border-b border-line p-3.5 align-top font-mono" : "border-b border-line p-3.5 align-top"}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Photo photo={PHOTOS.eigentuemerLadenflaeche} ratio="4/3" sizes={photoSizes} className="mt-8 lg:hidden" />
        </Split>
      </Section>
    </>
  );
}
