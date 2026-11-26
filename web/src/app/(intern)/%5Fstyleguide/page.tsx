import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Avatar, Person } from "@/components/ui/avatar";
import { Badge, BadgeAusgeblendet, BadgeRole, BadgeUrbownWeit, BadgeWartet } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";
import { Card, CardHeader, EmptyState, Kv, List, ListItem, LoadingNote, Skeleton, Stat, StatGrid } from "@/components/ui/card";
import { Chip, ChipGroup } from "@/components/ui/chip";
import {
  Checkbox,
  CodeInput,
  Disclosure,
  Field,
  FieldError,
  Input,
  Radio,
  Select,
  Textarea,
  VisibilityField,
  describedBy,
} from "@/components/ui/form";
import { Icon, ICON_NAMES, ICONS_REDRAWN } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { Segment } from "@/components/ui/segment";
import { SkipLink } from "@/components/ui/skip-link";
import { Switch } from "@/components/ui/switch";
import { Table, type Column } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { ToastProvider } from "@/components/ui/toast";
import { LoadingButtonDemo, OverlayDemos } from "./demos";

export const metadata: Metadata = {
  title: { absolute: "Styleguide – urbown (intern)" },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  ["farben", "Farben"],
  ["schrift", "Schrift"],
  ["logo", "Logo"],
  ["icons", "Icons"],
  ["icon-tafel", "Icon-Tafel"],
  ["buttons", "Buttons"],
  ["felder", "Formularfelder"],
  ["auswahl", "Chips, Segment, Tabs"],
  ["cards", "Cards, Badges, Personen"],
  ["tabelle", "Tabelle"],
  ["overlays", "Modal, Sheet, Toast"],
  ["zustaende", "Leer und Laden"],
] as const;

const COLORS = [
  ["white", "#FFFFFF", "Flächen, Text auf Schwarz", "bg-white"],
  ["paper", "#F6F6F4", "Seitenhintergrund App", "bg-paper"],
  ["muted", "#EFEFEC", "Hover-Fläche", "bg-muted"],
  ["hover", "#FAFAF8", "Hover Listenzeilen", "bg-hover"],
  ["fill", "#DADAD5", "gewählte Umfrage-Option", "bg-fill"],
  ["line", "#E2E2DD", "Trennlinien (dekorativ)", "bg-line"],
  ["field", "#8A8A84", "Rahmen Felder · 3,5 : 1", "bg-field"],
  ["ink-3", "#6B6B65", "Tertiärtext · 5,4 : 1", "bg-ink-3"],
  ["ink-2", "#55554F", "Sekundärtext · 7,5 : 1", "bg-ink-2"],
  ["ink-hover", "#33332F", "Hover schwarze Buttons", "bg-ink-hover"],
  ["ink", "#111111", "Text, Primär · 18,9 : 1", "bg-ink"],
] as const;

type Row = { name: string; netz: string; rolle: string; mitglieder: number; status: string };
const ROWS: Row[] = [
  { name: "Mannheim", netz: "app.urbown.com/mannheim", rolle: "Lizenz", mitglieder: 35, status: "aktiv" },
  { name: "Heidelberg", netz: "app.urbown.com/heidelberg", rolle: "Pilot", mitglieder: 46, status: "aktiv" },
  { name: "Zug", netz: "app.urbown.com/zug", rolle: "Pilot", mitglieder: 0, status: "in Vorbereitung" },
];
const COLUMNS: Column<Row>[] = [
  { key: "name", header: "Netzwerk", cell: (r) => <span className="font-semibold">{r.name}</span> },
  { key: "netz", header: "Adresse", cell: (r) => <span className="font-mono text-xs">{r.netz}</span> },
  { key: "rolle", header: "Vertrag", cell: (r) => r.rolle },
  { key: "mitglieder", header: "Mitglieder", cell: (r) => r.mitglieder, numeric: true },
  {
    key: "status",
    header: "Status",
    cell: (r) => <Badge variant={r.status === "aktiv" ? "solid" : "soft"}>{r.status}</Badge>,
  },
];

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titel`} className="flex scroll-mt-20 flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h2 id={`${id}-titel`} className="text-xl font-bold">
          {title}
        </h2>
        {intro ? <p className="text-sm text-ink-2">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

function State({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="lbl text-ink-3">{label}</span>
      {children}
    </div>
  );
}

const FOCUS_DEMO = "outline-2 outline-offset-2 outline-ink";

export default function StyleguidePage() {
  return (
    <ToastProvider>
      <div className="min-h-dvh bg-paper text-ink lg:text-ui">
        <SkipLink />
        <header className="band sticky top-0 z-(--z-header) border-b border-ink bg-white py-3">
          <div className="mx-auto flex max-w-app items-center justify-between gap-4">
            <Logo variant="web" height={26} />
            <nav aria-label="Abschnitte" className="hidden flex-wrap gap-1 lg:flex">
              {SECTIONS.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-sm px-2 py-1.5 text-sm text-ink-2 no-underline hover:bg-muted hover:text-ink"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main id="main" className="band mx-auto flex max-w-app flex-col gap-10 pt-6 pb-24">
          <div className="flex flex-col gap-1">
            <span className="lbl">Intern · nur lokal und Staging</span>
            <h1 className="text-h1-sm font-extrabold sm:text-4xl">urbown 2.0 – Bausteine und Zustände</h1>
            <p className="max-w-[60ch] text-ink-2">
              Grundbausteine aus web/src/components/ui nach UB02-design.md. Hover- und Fokus-Zustände sind zusätzlich
              statisch nachgestellt.
            </p>
          </div>

          <Section id="farben" title="Farben" intro="Nur diese Tokens. Kontrast jeweils auf Weiss.">
            <div className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-4">
              {COLORS.map(([name, hex, use, cls]) => (
                <div key={name} className="border-r border-b border-line bg-white">
                  <div className={`h-14 border-b border-line ${cls}`} />
                  <div className="flex flex-col px-2.5 py-2 font-mono text-xs">
                    <span className="font-medium">{name}</span>
                    <span className="text-ink-2">{hex}</span>
                    <span className="font-sans text-ink-2">{use}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="schrift" title="Schrift" intro="Archivo = Titel und Zahlen · Inter = Text · IBM Plex Mono = Daten und Labels.">
            <Card className="flex flex-col gap-3 p-4">
              <p className="font-display text-5xl font-extrabold tracking-tight">
                Willkommen <span className="text-outline">zurück</span>
              </p>
              <p className="font-display text-4xl font-extrabold tracking-tight">Vakante Flächen (h1 App, 28 px)</p>
              <p className="font-display text-xl font-bold">Aktuelle Themen (h2 App, 20 px)</p>
              <p className="font-display text-2xl font-bold">Status-Post im Feed (22 px)</p>
              <p className="text-base">Fliesstext Inter 16 px, auf dem Handy und der Landingpage.</p>
              <p className="text-ui">Fliesstext Inter 15 px in der App ab 900 px.</p>
              <p className="text-sm text-ink-2">Metazeile 13 px · Vakante Fläche · vor 2 Std.</p>
              <p className="lbl">Mono-Label 11 px</p>
              <p className="num font-mono text-sm">142 m² · Front 11,5 m · ab 01.02.2027</p>
              <p className="num font-display text-3xl font-extrabold">2 400 €</p>
            </Card>
          </Section>

          <Section id="logo" title="Logo" intro="Web-Variante unter 40 px, Original ab 40 px. Immer SVG.">
            <Card className="flex flex-wrap items-end gap-8 p-4">
              <State label="Original 48 px">
                <Logo variant="original" height={48} />
              </State>
              <State label="Web 32 px (Footer)">
                <Logo variant="web" height={32} />
              </State>
              <State label="Web 30 px (Kopf Landing)">
                <Logo variant="web" height={30} />
              </State>
              <State label="Web 26 px (Sidebar)">
                <Logo variant="web" height={26} />
              </State>
              <State label="Web 24 px (Handy)">
                <Logo variant="web" height={24} />
              </State>
            </Card>
          </Section>

          <Section id="icons" title="Icons" intro="24er-Raster, Linie 1,7 px, runde Enden, currentColor.">
            <Card className="grid grid-cols-3 gap-px bg-line p-px sm:grid-cols-6 lg:grid-cols-8">
              {ICON_NAMES.map((name) => (
                <div key={name} className="flex flex-col items-center gap-1.5 bg-white px-1 py-3">
                  <Icon name={name} size={24} />
                  <span className="font-mono text-micro text-ink-2">{name}</span>
                </div>
              ))}
            </Card>
          </Section>

          <Section id="icon-tafel" title="Icon-Tafel" intro="Alle Icons in 24 und 48 px. «neu» = in Block 1 neu gezeichnet, Abnahme in UB05 (K8).">
            <Card className="grid grid-cols-2 gap-px bg-line p-px sm:grid-cols-4 lg:grid-cols-6">
              {ICON_NAMES.map((name) => {
                const redrawn = ICONS_REDRAWN.includes(name);
                return (
                  <div key={name} className="flex flex-col items-center gap-2 bg-white px-2 py-4">
                    <div className="flex items-end gap-4">
                      <Icon name={name} size={24} />
                      <Icon name={name} size={48} />
                    </div>
                    <span className="font-mono text-xs">{name}</span>
                    {redrawn ? <Badge variant="solid">neu</Badge> : <span className="h-5" aria-hidden="true" />}
                  </div>
                );
              })}
            </Card>
          </Section>

          <Section id="buttons" title="Buttons" intro="Pro Ansicht nur ein Primär-Button im sichtbaren Bereich.">
            <Card className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <State label="Primär · Standard">
                <Button>Fläche inserieren</Button>
              </State>
              <State label="Primär · Hover">
                <Button className="bg-ink-hover">Fläche inserieren</Button>
              </State>
              <State label="Primär · Fokus">
                <Button className={FOCUS_DEMO}>Fläche inserieren</Button>
              </State>
              <State label="Primär · Deaktiviert">
                <Button disabled>Fläche inserieren</Button>
              </State>
              <State label="Primär · Laden (klicken)">
                <LoadingButtonDemo />
              </State>
              <State label="Mit Icon">
                <Button icon="plus">Erstellen</Button>
              </State>
              <State label="Sekundär · Standard">
                <Button variant="secondary">Abbrechen</Button>
              </State>
              <State label="Sekundär · Hover">
                <Button variant="secondary" className="bg-muted">
                  Abbrechen
                </Button>
              </State>
              <State label="Sekundär · Deaktiviert">
                <Button variant="secondary" disabled>
                  Abbrechen
                </Button>
              </State>
              <State label="Link">
                <Button variant="link">Alle anzeigen</Button>
              </State>
              <State label="Link · Hover">
                <Button variant="link" className="decoration-2">
                  Alle anzeigen
                </Button>
              </State>
              <State label="Icon-Button (44 × 44)">
                <div className="flex gap-1">
                  <IconButton icon="more" label="Weitere Aktionen" />
                  <IconButton icon="close" label="Schliessen" />
                  <IconButton icon="edit" label="Bearbeiten" className="bg-muted" />
                </div>
              </State>
              <State label="Klein (36 px + Trefferfläche)">
                <Button size="sm" variant="secondary">
                  Heute
                </Button>
              </State>
              <State label="Gross (Landing, 48 px)">
                <Button size="lg" lift>
                  Demo anfragen
                </Button>
              </State>
              <State label="Inverse (auf Schwarz)">
                <div className="rounded-md bg-ink px-2">
                  <Button variant="inverse">Rückgängig</Button>
                </div>
              </State>
            </Card>
          </Section>

          <Section id="felder" title="Formularfelder" intro="Label immer sichtbar, Fehler am Feld, 16 px Schrift in Feldern.">
            <Card className="grid gap-5 p-4 sm:grid-cols-2">
              <Field id="sg-standard" label="Titel" hint="Kurz und klar, z. B. «Laden mit Schaufenster».">
                <Input id="sg-standard" placeholder="z. B. Ladenfläche P7" aria-describedby={describedBy("sg-standard", { hint: true })} />
              </Field>
              <Field id="sg-hover" label="Hover">
                <Input id="sg-hover" defaultValue="Rahmen ink-2" className="border-ink-2" />
              </Field>
              <Field id="sg-fokus" label="Fokus">
                <Input id="sg-fokus" defaultValue="Rahmen wirkt 2 px" className="border-ink outline-2 -outline-offset-1 outline-ink" />
              </Field>
              <Field id="sg-fehler" label="Fläche (m²)" error="Bitte geben Sie die Fläche in m² ein.">
                <Input id="sg-fehler" inputMode="decimal" aria-invalid="true" aria-describedby={describedBy("sg-fehler", { error: true })} unit="m²" />
              </Field>
              <Field id="sg-disabled" label="Deaktiviert">
                <Input id="sg-disabled" defaultValue="Nicht änderbar" disabled />
              </Field>
              <Field id="sg-readonly" label="Nur lesen">
                <Input id="sg-readonly" defaultValue="app.urbown.com/mannheim" readOnly />
              </Field>
              <Field id="sg-betrag" label="Miete pro Monat" optional hint="Leer lassen = «auf Anfrage».">
                <Input id="sg-betrag" inputMode="decimal" unit="EUR" aria-describedby={describedBy("sg-betrag", { hint: true })} />
              </Field>
              <Field id="sg-select" label="Nutzungsart">
                <Select id="sg-select" defaultValue="Einzelhandel">
                  <option>Einzelhandel</option>
                  <option>Gastronomie</option>
                  <option>Büro</option>
                  <option>Praxis</option>
                  <option>Dienstleistung</option>
                  <option>Pop-up/Zwischennutzung</option>
                </Select>
              </Field>
              <Field id="sg-textarea" label="Kurzbeschreibung" optional className="sm:col-span-full">
                <Textarea id="sg-textarea" placeholder="Was zeichnet die Fläche aus?" />
              </Field>
              <Field id="sg-code" label="Code aus der E-Mail">
                <CodeInput id="sg-code" placeholder="123456" />
              </Field>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Ankreuzfelder</span>
                <Checkbox id="sg-cb1" label="Zwischennutzung möglich" defaultChecked />
                <Checkbox id="sg-cb2" label="Barrierefrei" />
                <Checkbox id="sg-cb3" label="Deaktiviert" disabled />
              </div>
              <fieldset className="flex flex-col gap-1">
                <legend className="text-sm font-semibold">Status</legend>
                <Radio id="sg-r1" name="sg-status" value="verfuegbar" label="verfügbar" defaultChecked />
                <Radio id="sg-r2" name="sg-status" value="reserviert" label="reserviert" />
                <Radio id="sg-r3" name="sg-status" value="vermietet" label="vermietet" />
              </fieldset>
              <VisibilityField name="sg-sichtbarkeit" network="Mannheim" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Schalter</span>
                <Switch id="sg-sw1" label="2FA für alle Admins verpflichtend" />
                <Switch id="sg-sw2" label="Neue Inserate vor Veröffentlichung prüfen" defaultChecked />
              </div>
              <div className="sm:col-span-full">
                <Disclosure>
                  <Field id="sg-lager" label="Lager/Nebenflächen (m²)" optional>
                    <Input id="sg-lager" inputMode="decimal" unit="m²" />
                  </Field>
                  <Field id="sg-hoehe" label="Raumhöhe (m)" optional>
                    <Input id="sg-hoehe" inputMode="decimal" unit="m" />
                  </Field>
                </Disclosure>
              </div>
              <div className="sm:col-span-full">
                <FieldError id="sg-fehler-allein">Fehlermeldung allein (mit Icon, Text trägt die Bedeutung).</FieldError>
              </div>
            </Card>
          </Section>

          <Section id="auswahl" title="Chips, Segment, Tabs" intro="Gewählt immer zusätzlich über aria-pressed, aria-checked oder aria-selected.">
            <Card className="flex flex-col gap-5 p-4">
              <State label="Chips (Filter)">
                <ChipGroup label="Inhaltstyp filtern" className="max-w-full">
                  <Chip defaultPressed>Alles</Chip>
                  <Chip>Beiträge</Chip>
                  <Chip>Flächen</Chip>
                  <Chip>Immobilien</Chip>
                  <Chip>City News</Chip>
                  <Chip>Forum</Chip>
                  <Chip>Events</Chip>
                  <Chip disabled>Deaktiviert</Chip>
                </ChipGroup>
              </State>
              <State label="Segment">
                <Segment
                  label="Ansicht"
                  options={[
                    { value: "netz", label: "Netzwerk Mannheim" },
                    { value: "alle", label: "urbown-weit" },
                  ]}
                />
              </State>
              <State label="Segment Liste/Karte">
                <Segment
                  label="Darstellung"
                  options={[
                    { value: "liste", label: "Liste" },
                    { value: "karte", label: "Karte" },
                  ]}
                />
              </State>
              <div className="w-full">
                <Tabs
                  label="Gruppe"
                  tabs={[
                    { id: "beitraege", label: "Beiträge", content: <p className="text-ink-2">Beiträge der Gruppe.</p> },
                    { id: "themen", label: "Themen", content: <p className="text-ink-2">Forenthemen der Gruppe.</p> },
                    { id: "dokumente", label: "Dokumente", content: <p className="text-ink-2">Dokumente der Gruppe.</p> },
                    { id: "mitglieder", label: "Mitglieder", content: <p className="text-ink-2">Mitglieder der Gruppe.</p> },
                  ]}
                />
              </div>
            </Card>
          </Section>

          <Section id="cards" title="Cards, Badges, Personen">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader title="Vakante Flächen" action={<Button variant="link" size="sm">Alle anzeigen</Button>} />
                <List>
                  <ListItem
                    href="#cards"
                    title="Ladenfläche mit Eckschaufenster"
                    meta={<span className="num font-mono">P7, 14 · 142 m² · ab 01.02.2027</span>}
                    trailing={<Badge variant="solid">verfügbar</Badge>}
                  />
                  <ListItem
                    href="#cards"
                    title="Bürofläche 1. OG"
                    meta={<span className="num font-mono">Q1, 5 · 260 m²</span>}
                    trailing={<Badge variant="soft">reserviert</Badge>}
                  />
                  <ListItem title="Ohne Link" meta="Nicht klickbarer Eintrag" />
                </List>
              </Card>
              <Card className="flex flex-col gap-4 p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Gewerbe</Badge>
                  <Badge variant="solid">verfügbar</Badge>
                  <Badge variant="soft">vermietet</Badge>
                  <BadgeUrbownWeit />
                  <BadgeWartet />
                  <BadgeAusgeblendet />
                  <Badge variant="soft">Admin</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <BadgeRole role="eigentuemer" />
                  <BadgeRole role="mitarbeiter_stadt" />
                  <BadgeRole role="gewerbe" />
                  <BadgeRole role="partner" />
                </div>
                <Person name="Julia Brandt" role="eigentuemer" company="Brandt Grundbesitz" href="#cards" />
                <Person name="Sabine Hoffmann" role="mitarbeiter_stadt" company="Innenstadtbüro" />
                <div className="flex items-center gap-2">
                  <Avatar name="Ali Yilmaz" />
                  <Avatar name="Nina Wolf" size="sm" />
                </div>
                <Kv
                  items={[
                    { term: "Fläche", value: <span className="num font-mono">142 m²</span> },
                    { term: "Schaufensterfront", value: <span className="num font-mono">11,5 m</span> },
                    { term: "Verfügbar ab", value: <span className="num font-mono">01.02.2027</span> },
                    { term: "Miete", value: "auf Anfrage" },
                  ]}
                />
              </Card>
            </div>
            <StatGrid>
              <Stat label="Mitglieder" value="35" />
              <Stat label="Aktiv in 30 Tagen" value="21" />
              <Stat label="Neue Inhalte" value="14" />
              <Stat label="Offene Einladungen" value="3" />
            </StatGrid>
          </Section>

          <Section id="tabelle" title="Tabelle" intro="Unter 680 px als Kartenliste (Admin/Superadmin).">
            <Card className="p-4">
              <Table
                label="Netzwerke"
                columns={COLUMNS}
                rows={ROWS}
                rowKey={(r) => r.name}
                mobile="cards"
                actions={() => (
                  <Button variant="link" size="sm">
                    Öffnen
                  </Button>
                )}
              />
            </Card>
          </Section>

          <Section id="overlays" title="Modal, Sheet, Toast" intro="Natives dialog: Esc schliesst, Fokus kehrt zurück. Unter 680 px Sheet von unten.">
            <Card className="p-4">
              <OverlayDemos />
            </Card>
          </Section>

          <Section id="zustaende" title="Leer und Laden">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <EmptyState action={<Button>Fläche inserieren</Button>}>Noch keine Flächen.</EmptyState>
              </Card>
              <Card className="flex flex-col gap-3 p-4">
                <LoadingNote />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="aspect-video w-full" />
              </Card>
            </div>
            <p className="text-sm text-ink-2">
              Sprunglink: oben auf dieser Seite, mit der Tabulatortaste sichtbar. Fokus-Rahmen 2 px:{" "}
              <span className={`inline-block rounded-xs px-1 ${FOCUS_DEMO}`}>Beispiel</span>
            </p>
          </Section>
        </main>
      </div>
    </ToastProvider>
  );
}
