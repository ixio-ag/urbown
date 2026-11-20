import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Faq, GlanceList, Steps } from "@/components/site/blocks";
import { FeatureTile, RuleCell, RuleGrid } from "@/components/site/grids";
import { ImageBand, PHOTOS } from "@/components/site/photos";
import { H3, Hero, HeroCard, Lead, Outline, Section, SectionTitle, Split } from "@/components/site/section";
import { PriceSection } from "@/components/site/shared-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/staedte",
  title: "Für Städte & Ämter",
  description:
    "Ein vertraulicher Kanal zu den Eigentümern Ihrer Innenstadt und ein Frühwarnsystem für Leerstand. Start in rund zwei Wochen, Hosting in der Schweiz.",
});

const BENEFITS = [
  { icon: "store", title: "Frühwarnsystem Leerstand", text: "Eigentümer melden anstehende Auszüge, bevor Flächen leer stehen. Sie sehen, wo Handlungsbedarf entsteht." },
  { icon: "msg", title: "Direkter Draht zu Eigentümern", text: "Viele Eigentümer sind für die Verwaltung schwer erreichbar. Im Netzwerk erreichen Sie sie mit einem Beitrag." },
  { icon: "poll", title: "Beteiligung, die funktioniert", text: "Umfragen zu Öffnungszeiten, Baustellen oder Gestaltung. Ergebnisse in Echtzeit, ohne Papier." },
  { icon: "map", title: "Lagebild auf der Karte", text: "Leerstände, Problemstellen und Ideen der Mitglieder auf einer Karte, nach Themen gefiltert." },
  { icon: "news", title: "Informationen gezielt verbreiten", text: "Förderprogramme, Baustellen, Termine: Sie informieren die richtigen Menschen direkt." },
  { icon: "shield", title: "Volle Kontrolle", text: "Die Stadt verwaltet ihr Netzwerk selbst: Einladungen freigeben, Inhalte moderieren, Auswertungen abrufen." },
] as const;

const FUNDING = [
  {
    tag: "Deutschland",
    title: "Bund und Länder",
    items: [
      "Städtebauförderung, Programm «Lebendige Zentren» (über die Länder)",
      "Handlungsstrategie Leerstandsaktivierung des Bundesbauministeriums",
      "Bundesprogramm «Gewerbe zu Wohnen» (seit Juli 2026)",
      "Landesprogramme für Innenstädte und Ortskerne",
    ],
  },
  {
    tag: "Schweiz",
    title: "Bund und Kantone",
    items: [
      "Modellvorhaben Nachhaltige Raumentwicklung 2025–2030 (ARE, SECO u. a.), Schwerpunkt Zentrumsfunktionen",
      "Neue Regionalpolitik (SECO und Kantone)",
      "Kantonale Wirtschafts- und Standortförderung",
    ],
  },
];

const PRIVACY = [
  [
    "Geschlossen",
    "Kein Inhalt ist öffentlich sichtbar. Zugang nur mit Login und nur auf Einladung. Standard: Inhalte und Profile sind nur im eigenen Netzwerk sichtbar. Mitglieder können sie freiwillig für alle urbown-Mitglieder freigeben.",
  ],
  ["DSGVO und DSG", "Auftragsverarbeitungsvertrag inklusive. Nur notwendige Cookies, keine Werbetracker."],
  [
    "Hosting in der Schweiz",
    "DSGVO- und DSG-konform. Server in Zürich, verschlüsselte Backups täglich in Genf. Alle Verbindungen verschlüsselt.",
  ],
  ["Ihre Daten bleiben Ihre", "Export jederzeit möglich. Bei Vertragsende erhalten Sie alle Daten und wir löschen sie."],
] as const;

const FAQ = [
  {
    q: "Wer moderiert das Netzwerk?",
    a: "Die Stadt benennt eine oder zwei Personen als Administration, meist aus Innenstadtbüro, Citymanagement oder Wirtschaftsförderung. Wir unterstützen beim Start und bei Bedarf dauerhaft.",
  },
  {
    q: "Wie viel Aufwand entsteht für die Verwaltung?",
    a: "Nach dem Start rechnen Städte mit zwei bis vier Stunden pro Woche: Einladungen freigeben, Beiträge der Stadt, gelegentliche Moderation.",
  },
  {
    q: "Brauchen wir eine Ausschreibung?",
    a: "Für den Pilot nicht, er ist kostenlos. Für die Zeit danach hängt es vom Angebot und den Regeln Ihres Landes bzw. Kantons ab. Bitte prüfen Sie das mit Ihrer Vergabestelle. Wir liefern alle Unterlagen.",
  },
  {
    q: "Was kostet urbown die Mitglieder?",
    a: "Nichts. Eigentümer, Gewerbe und Partner nutzen urbown kostenlos. Das ist wichtig, damit möglichst viele mitmachen.",
  },
  {
    q: "Können mehrere Gemeinden ein Netzwerk teilen?",
    a: "Ja. Für Landkreise, Regionen oder Gemeindeverbünde gibt es ein Regionalangebot mit mehreren Netzwerken unter einem Vertrag.",
  },
  {
    q: "Was passiert nach dem Pilot?",
    a: "Gegen Ende des Pilots besprechen wir die Ergebnisse und Sie erhalten ein Angebot. Ohne Ihre Zusage endet der Pilot automatisch. Damit das Budget rechtzeitig eingeplant werden kann, senden wir das Angebot auf Wunsch schon früher.",
  },
];

export default function StaedtePage() {
  return (
    <>
      <Hero
        label="Für Städte, Gemeinden und Ämter"
        title={
          <>
            Ein Netzwerk für alle, die Ihre <Outline>Innenstadt</Outline> besitzen.
          </>
        }
        lead="Die meisten Flächen in der Innenstadt gehören privaten Eigentümern. urbown gibt Ihrer Verwaltung einen direkten, vertraulichen Kanal zu ihnen und ein Frühwarnsystem für Leerstand. Sie starten in rund zwei Wochen, ohne eigene IT-Projekte."
        actions={
          <>
            <ButtonLink href="/kontakt?anliegen=demo" size="lg" lift>
              Demo-Termin vereinbaren
            </ButtonLink>
            <ButtonLink href="/kontakt?anliegen=infopaket" variant="secondary" size="lg" lift>
              Infopaket anfordern
            </ButtonLink>
          </>
        }
        aside={
          <HeroCard label="Auf einen Blick">
            <GlanceList
              rows={[
                { term: "Start", value: "ca. 2 Wochen" },
                { term: "Aufwand Verwaltung", value: "ca. 2–4 Std./Woche" },
                { term: "Hosting", value: "Schweiz" },
                { term: "Danach", value: "individuelles Angebot" },
                { term: "Pilot", value: "6 Monate kostenlos" },
              ]}
            />
          </HeroCard>
        }
      />

      <ImageBand photo={PHOTOS.staedteFussgaengerzone} background="white" />

      <Section variant="paper" labelledBy="nutzen-stadt">
        <SectionTitle label="Nutzen für die Stadt" title="Was Ihre Verwaltung gewinnt." id="nutzen-stadt" />
        <RuleGrid cols={3}>
          {BENEFITS.map((b) => (
            <FeatureTile key={b.title} icon={b.icon} title={b.title} text={b.text} />
          ))}
        </RuleGrid>
      </Section>

      <Section variant="white" labelledBy="ablauf">
        <Split aside={<SectionTitle label="Ablauf" title="So arbeiten wir mit Ihrer Verwaltung." id="ablauf" />}>
          <Steps />
        </Split>
      </Section>

      <PriceSection
        id="kosten"
        label="Kosten"
        title="Erst testen, dann entscheiden."
        lead="Der Pilot ist kostenlos und unverbindlich. Für die Zeit danach erhalten Sie ein Angebot und alle Unterlagen für Ihre Vergabestelle."
        background="paper"
      />

      <Section variant="white" labelledBy="foerderung">
        <SectionTitle label="Förderung" title="Programme, an die urbown anknüpfen kann." id="foerderung">
          <Lead>
            urbown kann Teil eines geförderten Innenstadt- oder Leerstandsmanagements sein. Ob die Lizenz förderfähig ist, entscheidet
            die zuständige Bewilligungsstelle im Einzelfall. Wir unterstützen Sie beim Antrag.
          </Lead>
        </SectionTitle>
        <RuleGrid cols={2}>
          {FUNDING.map((f) => (
            <RuleCell key={f.tag}>
              <Badge variant="solid">{f.tag}</Badge>
              <H3>{f.title}</H3>
              <ul className="flex list-disc flex-col gap-1.5 pl-4.5 text-ink-2">
                {f.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </RuleCell>
          ))}
        </RuleGrid>
      </Section>

      <Section variant="paper" labelledBy="datenschutz-hosting">
        <Split aside={<SectionTitle label="Datenschutz & Hosting" title="Vertraulich von Anfang an." id="datenschutz-hosting" />}>
          <RuleGrid cols={2}>
            {PRIVACY.map(([title, text]) => (
              <RuleCell key={title}>
                <H3>{title}</H3>
                <p className="text-ink-2">{text}</p>
              </RuleCell>
            ))}
          </RuleGrid>
        </Split>
      </Section>

      <Section variant="white" labelledBy="fragen">
        <Split aside={<SectionTitle label="Häufige Fragen" title="Fragen aus Verwaltungen." id="fragen" />}>
          <Faq items={FAQ} />
        </Split>
      </Section>
    </>
  );
}
