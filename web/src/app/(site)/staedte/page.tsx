import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ButtonLink, DownloadLink } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { DownloadCard } from "@/components/site/download-card";
import { Faq, GlanceList, SquareList, Steps, TaskSplit } from "@/components/site/blocks";
import { FeatureTile, RefStats, RuleCell, RuleGrid } from "@/components/site/grids";
import { ImageBand, PHOTOS } from "@/components/site/photos";
import { H3, Hero, HeroCard, Lead, Note, Outline, Section, SectionTitle, Split } from "@/components/site/section";
import { PriceSection } from "@/components/site/shared-sections";
import { typo } from "@/components/ui/typo";
import { DOWNLOADS, INFOPAKET_FILE, downloadHref, downloadMeta } from "@/content/downloads";
import { FAQ_STAEDTE } from "@/content/faq-staedte";
import { FUNDING } from "@/content/funding";
import { REFERENCE_NOTE, REFERENCE_STATS } from "@/content/reference";
import { pageMetadata } from "@/lib/metadata";
import { DEMO_URL } from "@/lib/site";

// Texte: UB04-kommunen.md Abschnitt 4 (wörtlich)
export const metadata = pageMetadata({
  path: "/staedte",
  title: "Für Städte & Ämter",
  description:
    "Vertraulicher Kanal zu den Eigentümern Ihrer Innenstadt, Frühwarnsystem für Leerstand. Start in zwei Wochen, Daten in der Schweiz, Unterlagen zum Download.",
});

const BENEFITS = [
  { icon: "store", title: "Frühwarnsystem Leerstand", text: "Eigentümer melden anstehende Auszüge, bevor Flächen leer stehen. Sie sehen, wo Handlungsbedarf entsteht." },
  { icon: "msg", title: "Direkter Draht zu Eigentümern", text: "Viele Eigentümer sind für die Verwaltung schwer erreichbar. Im Netzwerk erreichen Sie sie mit einem Beitrag." },
  { icon: "poll", title: "Beteiligung, die funktioniert", text: "Umfragen zu Öffnungszeiten, Baustellen oder Gestaltung. Ergebnisse in Echtzeit, ohne Papier." },
  { icon: "map", title: "Lagebild auf der Karte", text: "Leerstände, Problemstellen und Ideen der Mitglieder auf einer Karte, nach Themen gefiltert." },
  { icon: "news", title: "Informationen gezielt verbreiten", text: "Förderprogramme, Baustellen, Termine: Sie informieren die richtigen Menschen direkt." },
  { icon: "shield", title: "Volle Kontrolle", text: "Die Stadt verwaltet ihr Netzwerk selbst: Einladungen freigeben, Inhalte moderieren, Auswertungen abrufen." },
] as const;

const TASKS = [
  {
    label: "Das übernehmen wir",
    items: [
      "Netzwerk einrichten: Adresse, Kurzadresse, Logo, Kategorien",
      "Vorlagen für Einladungsbrief und E-Mail an die Eigentümer",
      "Kick-off vorbereiten und moderieren",
      "Einführung für Ihre Administration (rund eine Stunde, online)",
      "Betrieb, Updates, Backups und Support",
      "Quartalsbericht mit anonymisierter Auswertung",
    ],
  },
  {
    label: "Das übernimmt die Stadt",
    items: [
      "eine oder zwei Personen für die Administration benennen",
      "Eigentümer der Innenstadt per Brief zum Kick-off einladen",
      "Teilnehmende im Netzwerk erfassen, einzeln oder per Sammelimport",
      "Einladungen freigeben und eigene Beiträge schreiben",
      "Ergebnisse des Pilots auswerten und entscheiden",
    ],
  },
];

const PRIVACY = [
  [
    "Geschlossen",
    "Kein Inhalt ist öffentlich sichtbar. Zugang nur mit Login und nur auf Einladung. Inhalte und Profile sind standardmässig nur im eigenen Netzwerk sichtbar. Mitglieder können sie freiwillig für alle urbown-Mitglieder freigeben.",
  ],
  [
    "Daten in der Schweiz",
    "Datenbank, Dateien und verschlüsselte Backups liegen in Rechenzentren in Zürich und Genf. Das ist auch für deutsche Städte zulässig: Die EU anerkennt den Schweizer Datenschutz als gleichwertig.",
  ],
  [
    "DSGVO und DSG",
    "Vertrag zur Auftragsverarbeitung inklusive. Nur notwendige Cookies, keine Werbetracker, keine Analyse-Dienste. Export jederzeit; bei Vertragsende erhalten Sie alle Daten, danach löschen wir sie.",
  ],
  [
    "Offene Liste der Dienstleister",
    "Für den sicheren Betrieb setzen wir wenige, vertraglich gebundene Dienstleister ein, etwa für den Schutz vor Angriffen und den Versand von E-Mails. Alle stehen im AV-Vertrag.",
  ],
  [
    "Sicher angemeldet",
    "Verschlüsselte Verbindungen, Rechte je Rolle, Zwei-Faktor-Anmeldung für Administratorinnen und Administratoren. Direktnachrichten liest niemand von urbown.",
  ],
  ["Barrierefrei", "Gebaut nach WCAG 2.2 AA, der Grundlage für BITV 2.0 und EN 301 549. Jede Seite wird automatisch geprüft."],
] as const;

const infopaket = downloadMeta(INFOPAKET_FILE);

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
            <DownloadLink
              href={downloadHref(INFOPAKET_FILE)}
              variant="secondary"
              size="lg"
              lift
              icon="download"
              aria-label={`Infopaket herunterladen (${infopaket.type}, ${infopaket.size})`}
            >
              Infopaket herunterladen
            </DownloadLink>
          </>
        }
        aside={
          <HeroCard label="Auf einen Blick">
            <GlanceList
              rows={[
                { term: "Start", value: "ca. 2 Wochen" },
                { term: "Aufwand Verwaltung", value: "ca. 2–4 Std./Woche" },
                { term: "Pilot", value: "6 Monate kostenlos" },
                { term: "Danach", value: "individuelles Angebot" },
                { term: "Datenspeicherung", value: "Schweiz" },
                { term: "Barrierefreiheit", value: "WCAG 2.2 AA" },
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

      <Section variant="white" labelledBy="ablauf" innerClassName="gap-10">
        <Split aside={<SectionTitle label="Ablauf" title="So arbeiten wir mit Ihrer Verwaltung." id="ablauf" />}>
          <Steps />
        </Split>
        <div className="flex flex-col gap-4">
          <TaskSplit columns={TASKS} />
          <p className="text-sm text-ink-2">
            Die Einladung zum Kick-off kommt von der Stadt. Adressen der Eigentümer geben Sie dafür nicht an uns weiter.
          </p>
        </div>
      </Section>

      <Section variant="paper" labelledBy="referenz">
        <SectionTitle label="Referenz" title="Mannheim ist seit 2022 dabei." id="referenz">
          <Lead>
            In Mannheim tauschen sich Eigentümer, Gewerbe und Stadt seit 2022 in einem eigenen, geschlossenen Netzwerk aus: zu
            Leerständen, Immobilien, Baustellen und gemeinsamen Aktionen in der Innenstadt.
          </Lead>
        </SectionTitle>
        <RefStats items={REFERENCE_STATS} note={REFERENCE_NOTE} />
      </Section>

      <PriceSection
        id="kosten"
        label="Kosten"
        title="Erst testen, dann entscheiden."
        lead="Der Pilot ist kostenlos und unverbindlich. Für die Zeit danach erhalten Sie ein Angebot und alle Unterlagen für Ihre Vergabestelle."
        background="white"
      >
        <Note>
          <p className="font-bold">Budget rechtzeitig einplanen</p>
          <p className="text-ink-2">
            Auf Wunsch senden wir das Angebot schon zu Beginn des Pilots. So können Sie es in den Haushalt des nächsten Jahres
            aufnehmen, bevor der Pilot endet.
          </p>
        </Note>
      </PriceSection>

      <Section variant="paper" labelledBy="foerderung">
        <SectionTitle label="Förderung" title="Programme, an die urbown anknüpfen kann." id="foerderung">
          <Lead>
            urbown kann Teil eines geförderten Innenstadt-, Citymanagement- oder Leerstandsprojekts sein. Ob die Kosten förderfähig
            sind, entscheidet die zuständige Bewilligungsstelle im Einzelfall. Für Ihren Antrag liefern wir Projektbeschreibung und
            Kostenangaben.
          </Lead>
        </SectionTitle>
        <div className="flex flex-col gap-4">
          <RuleGrid cols={2}>
            {FUNDING.regions.map((f) => (
              <RuleCell key={f.tag}>
                <Badge variant="solid" className="self-start">
                  {f.tag}
                </Badge>
                <H3>{f.title}</H3>
                <SquareList items={f.items} className="text-ink-2" />
              </RuleCell>
            ))}
          </RuleGrid>
          <p className="text-sm text-ink-2">
            Stand {FUNDING.stand}. Programme und Bedingungen ändern sich. Bitte prüfen Sie die aktuellen Regeln bei Ihrer
            Bewilligungsstelle.
          </p>
        </div>
      </Section>

      <Section variant="white" labelledBy="datenschutz-sicherheit">
        <SectionTitle label="Datenschutz & Sicherheit" title="Vertraulich von Anfang an." id="datenschutz-sicherheit" />
        <RuleGrid cols={3}>
          {PRIVACY.map(([title, text]) => (
            <RuleCell key={title}>
              <H3>{title}</H3>
              <p className="text-ink-2">{typo(text)}</p>
            </RuleCell>
          ))}
        </RuleGrid>
      </Section>

      <Section variant="paper" labelledBy="unterlagen">
        <SectionTitle label="Unterlagen" title="Alles für Verwaltung und Gemeinderat." id="unterlagen">
          <Lead>
            Zum Weitergeben, Ausdrucken und Anpassen. Die Vorlagen sind Entwürfe. Bitte prüfen Sie sie mit Ihrer Rechts- und
            Datenschutzstelle.
          </Lead>
        </SectionTitle>
        <div className="flex flex-col gap-4">
          <RuleGrid cols={3}>
            {DOWNLOADS.map((d) => (
              <DownloadCard key={d.title} download={d} />
            ))}
          </RuleGrid>
          <p className="text-sm text-ink-2">
            Lieber gedruckt oder persönlich erklärt?{" "}
            <Link href="/kontakt?anliegen=infopaket" className="text-ink underline underline-offset-[3px] hover:decoration-2">
              Schreiben Sie uns
            </Link>
            , wir senden das Infopaket und beantworten Ihre Fragen.
          </p>
        </div>
      </Section>

      <Section variant="white" labelledBy="fragen">
        <Split aside={<SectionTitle label="Häufige Fragen" title="Fragen aus Verwaltungen." id="fragen" />}>
          <Faq items={FAQ_STAEDTE} />
        </Split>
      </Section>

      <CtaBand
        id="abschluss"
        title="Sehen Sie sich urbown in 30 Minuten an."
        lead="Wir zeigen Ihnen das Netzwerk online und beantworten Ihre Fragen. Danach testen Sie selbst in der Demo."
        actions={
          <>
            <ButtonLink href="/kontakt?anliegen=demo" size="lg" lift>
              Demo-Termin vereinbaren
            </ButtonLink>
            <ButtonLink href={DEMO_URL} variant="secondary" size="lg" lift>
              Demo selbst testen
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
