# UB03 – Landingpage urbown.com: Seitentexte und Aufbau

Stand: 18.11.2026 · Projekt «urbown.com 2.0» · Ergebnis UB03
Grundlage: Master-Datei Version 8.2, `claude/UB01-architektur.md`, `claude/UB02-design.md`, freigegebener Prototyp `claude/prototyp/landing.html`.
Zielgruppe: **Claude Code** (Umsetzung in `ixio-ag/urbown`, Arbeitsauftrag `claude/UB03-claude-code-block1.md`) und die folgenden Projekt-Chats (UB04 überarbeitet die Seite «Für Städte & Ämter»).

**Regel für die Umsetzung:** Alle Texte unten werden **wörtlich** übernommen. Schreibweise Schweiz («ss», kein «ß»), Sie-Form, Anführungszeichen «». Wo der Prototyp und diese Datei abweichen, gilt diese Datei.

---

## 1. Änderungen gegenüber dem Prototyp

| # | Prototyp | Umsetzung | Grund |
|---|---|---|---|
| 1 | Hosting «Deutschland oder Schweiz» / «Hosting in DE oder CH – Sie wählen den Standort» | **«Hosting in der Schweiz»**, DSGVO- und DSG-konform (Städte-Seite, Preis-Block) | Entscheid UB01 |
| 2 | Leiste «Prototyp der neuen urbown.com …» | entfällt | Live-Seite |
| 3 | Seiten als `#anker` in einer Datei | eigene Routen, statisch gerendert: `/`, `/eigentuemer`, `/staedte`, `/funktionen`, `/preise`, `/netzwerke`, `/kontakt`, dazu `/impressum`, `/datenschutz`, `/agb` | SEO, Ladezeit |
| 4 | Links auf claude.ai-Artefakte | Login → `https://app.urbown.com`, Demo → `https://demo.urbown.com` (über Umgebungsvariablen) | Live-Adressen |
| 5 | Kontaktformular simuliert | echter Versand an info@urbown.com (Server Action, Turnstile, Resend), Fehler am Feld | Master 3.17 |
| 6 | Logo als PNG mit Text-Rückfall | **Logo als SVG** (`urbown-logo-web.svg`, Kopf 30 px, Footer 32 px) | UB02 Abschnitt 5 |
| 7 | Menü-Knopf unter 960 px | unter **900 px** (Breakpoint `lg`) | UB02 Abschnitt 3.6 |
| 8 | Felder 46 px, Rahmen `#C9C9C3` | Bausteine aus UB02 (44/48 px, Rahmen `field`, Schrift 16 px) | UB02 Abschnitt 2 |
| 9 | Hervorhebung erster Preis-Kasten mit `box-shadow` | 3-px-Innenrahmen als `outline` (keine Schatten) | UB02 Abschnitt 3.5 |
| 10 | Schrittnummern 26 px als Kontur auf dem Handy | Handy **30 px** (Konturschrift erst ab 30 px) | UB02 Abschnitt 3.3 |
| 11 | keine Fotos | **5 Fotos in Graustufen** als ruhige Bildbänder (Abschnitt 4) | Bilder Projektinhaber 18.11.2026 |
| 12 | keine Bildschirmfotos der App | **neuer Bereich «Einblick»** auf Start und Funktionen (Abschnitt 5) | Frage Projektinhaber 18.11.2026 |
| 13 | Preis-Block «Inklusive: alle Funktionen, Hosting, …» | «Inklusive: alle Funktionen, **Hosting in der Schweiz**, …» | Entscheid UB01 |
| 14 | Icons `feed` und `phone` nur in der Landing | in `icons.tsx` aufnehmen (Pfade aus dem Prototyp) | UB02 Abschnitt 6 |

Pricing geprüft gegen Master Abschnitt 2: keine Paketnamen, keine Beträge, keine Formulierung «Die Stadt zahlt», «6 Monate kostenlos testen», danach individuelles Angebot als fester Jahrespreis in EUR oder CHF, für Mitglieder immer kostenlos. ✓

---

## 2. Gemeinsame Elemente

### 2.1 Adressen (Konstanten `web/src/lib/site.ts`)
| Name | Wert | Umgebungsvariable |
|---|---|---|
| Website | `https://urbown.com` | `NEXT_PUBLIC_SITE_URL` |
| Login | `https://app.urbown.com` | `NEXT_PUBLIC_APP_URL` |
| Demo | `https://demo.urbown.com` | `NEXT_PUBLIC_DEMO_URL` |
| E-Mail | `info@urbown.com` | – |
| Firma | IXIO AG, Bahnhofplatz, 6300 Zug, Schweiz | – |

Links auf Login und Demo öffnen **im selben Fenster** (eigene Domain).

### 2.2 Kopfzeile
- Logo (Link «urbown Startseite» → `/`)
- Navigation `aria-label="Hauptnavigation"`: **Für Eigentümer** (`/eigentuemer`) · **Für Städte & Ämter** (`/staedte`) · **Funktionen** (`/funktionen`) · **Preise** (`/preise`) · **Login** (`/netzwerke`) · Button **Demo anfragen** (`/kontakt`)
- Aktiver Link: `aria-current="page"` + Unterstreichung.
- Unter 900 px: Button **«Menü»** (`aria-expanded`, `aria-controls`), Liste: Start · Für Eigentümer · Für Städte & Ämter · Funktionen · Preise · Netzwerke & Login · Demo anfragen. Menü schliesst bei Seitenwechsel und mit `Esc`.
- Sprunglink «Zum Inhalt springen» als erstes Element.

### 2.3 Footer
- Spalte 1: Logo · «Geschlossene Netzwerke für Innenstädte. Für Eigentümer, Gewerbe und Stadt.» · `info@urbown.com` (Mono, `mailto:`-Link)
- **Für wen:** Eigentümer (`/eigentuemer`) · Gewerbe (`/eigentuemer`) · Städte & Ämter (`/staedte`)
- **urbown:** Funktionen · Preise · Netzwerke & Login · Kontakt
- **Rechtliches:** Impressum (`/impressum`) · Datenschutz (`/datenschutz`) · AGB (`/agb`) · «IXIO AG, Zug»
- `nav aria-label="Fusszeile"`.

### 2.4 Seitentitel und Beschreibungen (SEO)
Vorlage Titel: `%s – urbown`. Canonical je Seite, `lang="de"`, Open-Graph-Bild `og-image.png` (UB02 5.4).

| Route | `<title>` | Meta-Beschreibung |
|---|---|---|
| `/` | urbown – das geschlossene Netzwerk für Ihre Innenstadt | urbown verbindet Eigentümer, Gewerbe und Stadtverwaltung in einem geschlossenen Netzwerk pro Stadt. Leerstände früh sehen, Flächen schneller vermitteln. 6 Monate kostenlos testen. |
| `/eigentuemer` | Für Eigentümer und Gewerbe – urbown | Früh wissen, welche Flächen frei werden, Immobilien diskret vermarkten und direkt mit der Stadt sprechen. Für Mitglieder kostenlos. |
| `/staedte` | Für Städte & Ämter – urbown | Ein vertraulicher Kanal zu den Eigentümern Ihrer Innenstadt und ein Frühwarnsystem für Leerstand. Start in rund zwei Wochen, Hosting in der Schweiz. |
| `/funktionen` | Funktionen – urbown | Vakante Flächen, Immobilien, Dashboard, Umfragen, Forum, City News, Events, Dokumente, Gruppen und Karte. Fürs Handy gemacht. |
| `/preise` | Preise – urbown | 6 Monate kostenlos testen, danach ein individuelles Angebot als fester Jahrespreis in Euro oder Franken. Für Mitglieder immer kostenlos. |
| `/netzwerke` | Netzwerke & Login – urbown | Ein Login für alle urbown-Netzwerke unter app.urbown.com. Jede Stadt mit eigener Kurzadresse. |
| `/kontakt` | Kontakt – urbown | Demo-Termin, Infopaket für den Gemeinderat oder Pilotanfrage. Wir melden uns innerhalb von zwei Werktagen. |
| `/impressum`, `/datenschutz`, `/agb` | Impressum / Datenschutz / AGB – urbown | – (bis UB25 `noindex`) |

Strukturierte Daten (JSON-LD, nur Startseite): `Organization` mit `name` «urbown», `legalName` «IXIO AG», `url`, `email`, `logo` (`/brand/urbown-quadrat.svg` als PNG), `address` (Bahnhofplatz, 6300 Zug, CH).
`robots.txt` und `sitemap.xml` aus Next (`robots.ts`, `sitemap.ts`). Solange `SITE_INDEXABLE` nicht `true` ist (lokal, Staging): `Disallow: /` und Kopfzeile `X-Robots-Tag: noindex`.

### 2.5 Gemeinsame Blöcke (auf mehreren Seiten)

**Funktionsliste (FEATURES)** – Icon · Titel · Text
1. `store` · **Vakante Flächen** · Leerstände kurz inserieren: Fläche, Schaufensterfront, verfügbar ab. In Liste und Karte.
2. `building` · **Diskrete Immobilien** · Verkaufsinserate nur für Mitglieder. Import per Link oder OpenImmo.
3. `feed` · **Dashboard** · Nach dem Login alles Neue auf einen Blick: Themen, Flächen, Inserate, News.
4. `poll` · **Umfragen** · So einfach wie im Messenger. Ergebnisse live.
5. `forum` · **Forum** · Themen eröffnen, diskutieren, Erfahrungen teilen.
6. `news` · **City News** · Jedes Mitglied schreibt Beiträge, mit Bild und Quelle.
7. `cal` · **Events & Kalender** · Stammtische, Workshops, Aktionen. Mit Anmeldung.
8. `folder` · **Dokumente** · Übersichtliche Ordner für Verträge, Protokolle, Förderinfos.
9. `group` · **Gruppen** · Arbeitsgruppen und Nachbarschaften mit eigenen Themen.
10. `map` · **Karte** · Orte mit Titel und Kurzbeschreibung markieren, nach Themen filtern.
11. `msg` · **Direktnachrichten** · Anfragen zu Flächen und Inseraten direkt an den Eigentümer.
12. `invite` · **Netzwerkübergreifend** · Freiwillig: Profil oder einzelne Beiträge für Mitglieder aller Städte freigeben. Standard bleibt das eigene Netzwerk.
13. `user` · **Mein Portfolio** · Alle eigenen Inhalte an einem Ort. Sie bestimmen, wofür Sie E-Mails erhalten.

**Preis-Block (PriceBlock)** – drei Kästen, Rahmen 1,5 px, der erste mit 3-px-Innenrahmen hervorgehoben
1. Label **Start** · Titel **6 Monate kostenlos testen** · «Ihr eigenes Netzwerk, vollständig eingerichtet. Alle Funktionen, Begleitung beim Start, Kick-off mit Eigentümern. Unverbindlich, endet automatisch.» · Button **Pilot anfragen** (`/kontakt?anliegen=pilot`)
2. Label **Danach** · Titel **Ein Angebot, das zu Ihrer Stadt passt** · «Gegen Ende des Pilots erhalten Sie ein Angebot. Es richtet sich nach der Grösse Ihrer Innenstadt und der gewünschten Begleitung, als fester Jahrespreis in Euro oder Franken. Sie entscheiden dann, ob es weitergeht.»
3. Label **Immer** · Titel **Für Mitglieder kostenlos** · «Eigentümer, Gewerbe und Partner nutzen urbown ohne Kosten. So machen möglichst viele mit.» · «Inklusive: alle Funktionen, Hosting in der Schweiz, Updates, Support und Datenschutz-Unterlagen.»

**Schritte (Steps)** – nummeriert 01–05 als Konturziffern
1. **Demo ansehen** – Wir zeigen das Netzwerk in 30 Minuten online, Sie testen danach selbst auf demo.urbown.com.
2. **Netzwerk einrichten** – Ihre Stadt erhält ein eigenes, geschlossenes Netzwerk unter app.urbown.com/ihrestadt und die Kurzadresse ihrestadt.urbown.com für Flyer und Briefe. Startklar in rund zwei Wochen.
3. **Kick-off mit Eigentümern** – Die Stadt lädt 20 bis 50 Eigentümer der Innenstadt ein. Wir moderieren den Start.
4. **Netzwerk wächst** – Mitglieder laden weitere Eigentümer, Gewerbe und Partner ein. Die Stadt gibt jede Einladung frei.
5. **Quartalsbericht** – Die Stadt erhält eine anonymisierte Auswertung: Beteiligung, Themen, gemeldete und vermittelte Flächen.

---

## 3. Seiten

Aufbau-Kürzel: **Hero** = Abschnitt mit Text links (1,5) und Kasten rechts (1); **Sektion weiss/paper** mit schwarzer Linie oben; **Raster g2/g3/g4** = Kästen mit gemeinsamen schwarzen Linien; **Split** = Titel links (1), Inhalt rechts (1,4).

### 3.1 Start `/`

**Hero**
- Label: Das geschlossene Netzwerk für Ihre Innenstadt
- h1: Die Innenstadt gehört denen, die sie *gemeinsam* gestalten. (*Kontur*)
- Lead: urbown verbindet Eigentümer, Gewerbe und Stadtverwaltung in einem eigenen, geschlossenen Netzwerk pro Stadt. Leerstände werden früh sichtbar, Flächen finden schneller neue Nutzer, Entscheidungen fallen gemeinsam.
- Buttons: **Demo anfragen** (primär, `/kontakt`) · **Demo selbst testen** (sekundär, Demo-Adresse)
- Kasten rechts «Ihre Stadt bei urbown» (Adress-Kasten, interaktiv):
  - Label: Jede Stadt ihr eigenes Netzwerk
  - Adresse (Mono, gross): `app.urbown.com/`**`ihrestadt`** (Stadtteil schwarz hinterlegt) – `aria-live="polite"`
  - Mono klein: Kurzadresse `ihrestadt.urbown.com`
  - Feld: Label «Wie heisst Ihre Stadt?», Platzhalter «z. B. Heidelberg oder Winterthur». Eingabe wird live zum Kürzel (klein, Umlaute ohne Punkte: ä→a, ö→o, ü→u, ß→ss, Leer- und Sonderzeichen → «-»). Leer = «ihrestadt».
  - Text: Geschlossen, nur mit Login und nur auf Einladung. Ein Login für alle Netzwerke.

**Zielgruppen-Raster** (3 Felder, ganze Fläche verlinkt, Pfeil «→»)
- Für Eigentümer – Früh wissen, was in der Nachbarschaft passiert. Flächen diskret vermarkten. → `/eigentuemer`
- Für Gewerbe – Passende Flächen finden, bevor sie öffentlich inseriert werden. → `/eigentuemer`
- Für Städte & Ämter – Ein direkter Draht zu allen Eigentümern. Ein Frühwarnsystem für Leerstand. → `/staedte`

**Bildband** `start-schaufenster.jpg` (Abschnitt 4)

**Sektion paper – Das Problem** (Split)
- Label: Das Problem · h2: Leerstand kündigt sich an. Nur hört es niemand.
- Lead: Ein Mieter zieht in sechs Monaten aus, ein Erbe will verkaufen, ein Händler sucht 100 m² in bester Lage. Diese Informationen gibt es in jeder Stadt. Sie laufen nur nirgends zusammen. urbown ist der Ort, an dem sie sich treffen: geschlossen, vertraulich und mit der Stadt am Tisch.
- Raster g4: FEATURES 1–4
- Button sekundär: **Alle Funktionen** → `/funktionen`

**Sektion weiss – Einblick** (neu, Abschnitt 5, Variante «Start»: 3 Bildschirmfotos)

**Sektion paper – So startet Ihre Stadt** (Split)
- Label: So startet Ihre Stadt · h2: In fünf Schritten zum eigenen Netzwerk.
- Button primär: **Informationen für Städte** → `/staedte`
- rechts: Schritte 01–05

**Sektion weiss – Referenz**
- Label: Referenz · h2: Mannheim ist seit 2022 dabei.
- Kennzahlen (Kasten 1,5 px, drei Felder): **2022** Start des Netzwerks Mannheim · **35** Mitglieder: Eigentümer, Gewerbe, Stadt · **53** Immobilien im Netzwerk

**Sektion paper – Preise** (Split + Block)
- Label: Preise · h2: Kostenlos starten.
- Lead: Testen Sie urbown sechs Monate mit Ihrer Innenstadt. Danach erhalten Sie ein Angebot, das zu Ihrer Stadt passt.
- Preis-Block

> Hintergrundwechsel: Durch den neuen Einblick-Bereich verschiebt sich die Folge weiss/paper. Massgebend ist: Sektionen wechseln sich ab, Hero und Zielgruppen weiss, Bildband ohne eigenen Hintergrund.

### 3.2 Für Eigentümer `/eigentuemer`

**Hero**
- Label: Für Eigentümer und Gewerbe
- h1: Ihr Haus. Ihre Strasse. *Ihr Netzwerk.* (*Kontur*)
- Lead: Als Eigentümer oder Gewerbetreibender sind Sie Teil eines geschlossenen Kreises: Sie sehen früh, welche Flächen frei werden, vermarkten diskret und haben einen direkten Draht zur Stadt. Für Mitglieder ist urbown kostenlos.
- Buttons: **Zum Login** (primär, `/netzwerke`) · **Demo testen** (sekundär, Demo-Adresse)
- Kasten rechts: Label «Zugang» · h3 «Nur auf Einladung» · «Sie werden von einem Mitglied oder der Stadt eingeladen. So bleibt das Netzwerk vertraulich und jedes Profil echt.» · «Noch keine Einladung? Schreiben Sie uns, wir stellen den Kontakt zum Netzwerk Ihrer Stadt her.» · Button sekundär **Kontakt aufnehmen** (`/kontakt?anliegen=zugang`)

**Bildband** `eigentuemer-passanten.jpg`

**Sektion paper – Ihr Nutzen**
- Label: Ihr Nutzen · h2: Was Sie als Mitglied davon haben.
- Raster g3:
  - **Leerstand vermeiden** – Melden Sie einen anstehenden Auszug früh. Gewerbe und Partner im Netzwerk sehen die Fläche, bevor sie leer steht.
  - **Diskret verkaufen** – Inserieren Sie eine Immobilie nur im geschlossenen Kreis. Die genaue Adresse geben Sie erst auf Anfrage heraus.
  - **Mitreden** – Baustellen, Beleuchtung, Lieferzonen, verkaufsoffene Sonntage: Sie diskutieren mit und stimmen in Umfragen ab.
  - **Direkter Draht zur Stadt** – Innenstadtbüro und Wirtschaftsförderung sind Mitglieder. Fragen landen bei den richtigen Personen.
  - **Fürs Handy gemacht** – Inserat in zwei Minuten vom Smartphone. Installierbar wie eine App.
  - **Sie behalten die Kontrolle** – In «Mein Portfolio» verwalten Sie alle eigenen Inhalte und bestimmen genau, wofür Sie E-Mails erhalten.

**Sektion weiss – Vakante Fläche inserieren** (Split)
- links: Label «Vakante Fläche inserieren» · h2 «Kurz und klar. Diese Angaben genügen.» · darunter Foto `eigentuemer-ladenflaeche.jpg` (4 : 3, ab 900 px sichtbar; auf dem Handy nach der Tabelle)
- rechts: Tabelle (ohne Kopf, `dt`/`dd`-Semantik oder `th scope="row"`):
  | | |
  |---|---|
  | **Fläche** | `142 m²` |
  | **Schaufensterfront** | `11,5 m` |
  | **Verfügbar ab** | `01.02.2027` |
  | **Nutzung** | Einzelhandel, Gastronomie, Büro, Praxis, Pop-up |
  | **Miete** | Betrag oder «auf Anfrage» |
  | **Kontakt** | Anfragen per Direktnachricht an Sie |

### 3.3 Für Städte & Ämter `/staedte`
In UB03 **1:1 nach Prototyp mit Hosting-Korrektur** bauen, damit Navigation und Links funktionieren. UB04 überarbeitet die Seite (Förderprogramme prüfen, Downloads, ggf. FAQ ergänzen).

**Hero**
- Label: Für Städte, Gemeinden und Ämter
- h1: Ein Netzwerk für alle, die Ihre *Innenstadt* besitzen. (*Kontur*)
- Lead: Die meisten Flächen in der Innenstadt gehören privaten Eigentümern. urbown gibt Ihrer Verwaltung einen direkten, vertraulichen Kanal zu ihnen und ein Frühwarnsystem für Leerstand. Sie starten in rund zwei Wochen, ohne eigene IT-Projekte.
- Buttons: **Demo-Termin vereinbaren** (primär, `/kontakt?anliegen=demo`) · **Infopaket anfordern** (sekundär, `/kontakt?anliegen=infopaket`)
- Kasten rechts «Auf einen Blick» (Zeilen mit Linie):
  - Start – **ca. 2 Wochen**
  - Aufwand Verwaltung – **ca. 2–4 Std./Woche**
  - Hosting – **Schweiz** ← *geändert*
  - Danach – **individuelles Angebot**
  - Pilot – **6 Monate kostenlos**

**Bildband** `staedte-fussgaengerzone.jpg`

**Sektion paper – Nutzen für die Stadt**
- Label: Nutzen für die Stadt · h2: Was Ihre Verwaltung gewinnt.
- Raster g3 (mit Icons):
  - `store` **Frühwarnsystem Leerstand** – Eigentümer melden anstehende Auszüge, bevor Flächen leer stehen. Sie sehen, wo Handlungsbedarf entsteht.
  - `msg` **Direkter Draht zu Eigentümern** – Viele Eigentümer sind für die Verwaltung schwer erreichbar. Im Netzwerk erreichen Sie sie mit einem Beitrag.
  - `poll` **Beteiligung, die funktioniert** – Umfragen zu Öffnungszeiten, Baustellen oder Gestaltung. Ergebnisse in Echtzeit, ohne Papier.
  - `map` **Lagebild auf der Karte** – Leerstände, Problemstellen und Ideen der Mitglieder auf einer Karte, nach Themen gefiltert.
  - `news` **Informationen gezielt verbreiten** – Förderprogramme, Baustellen, Termine: Sie informieren die richtigen Menschen direkt.
  - `shield` **Volle Kontrolle** – Die Stadt verwaltet ihr Netzwerk selbst: Einladungen freigeben, Inhalte moderieren, Auswertungen abrufen.

**Sektion weiss – Ablauf** (Split): Label «Ablauf» · h2 «So arbeiten wir mit Ihrer Verwaltung.» · Schritte 01–05

**Sektion paper – Kosten** (Split + Block): Label «Kosten» · h2 «Erst testen, dann entscheiden.» · Lead «Der Pilot ist kostenlos und unverbindlich. Für die Zeit danach erhalten Sie ein Angebot und alle Unterlagen für Ihre Vergabestelle.» · Preis-Block

**Sektion weiss – Förderung**
- Label: Förderung · h2: Programme, an die urbown anknüpfen kann.
- Lead: urbown kann Teil eines geförderten Innenstadt- oder Leerstandsmanagements sein. Ob die Lizenz förderfähig ist, entscheidet die zuständige Bewilligungsstelle im Einzelfall. Wir unterstützen Sie beim Antrag.
- Raster g2:
  - Tag solid **Deutschland** · h3 **Bund und Länder** · Liste: Städtebauförderung, Programm «Lebendige Zentren» (über die Länder) · Handlungsstrategie Leerstandsaktivierung des Bundesbauministeriums · Bundesprogramm «Gewerbe zu Wohnen» (seit Juli 2026) · Landesprogramme für Innenstädte und Ortskerne
  - Tag solid **Schweiz** · h3 **Bund und Kantone** · Liste: Modellvorhaben Nachhaltige Raumentwicklung 2025–2030 (ARE, SECO u. a.), Schwerpunkt Zentrumsfunktionen · Neue Regionalpolitik (SECO und Kantone) · Kantonale Wirtschafts- und Standortförderung
- *Hinweis für UB04: Programme per Websuche prüfen, Liste ggf. anpassen.*

**Sektion paper – Datenschutz & Hosting** (Split): Label «Datenschutz & Hosting» · h2 «Vertraulich von Anfang an.» · Raster g2:
- **Geschlossen** – Kein Inhalt ist öffentlich sichtbar. Zugang nur mit Login und nur auf Einladung. Standard: Inhalte und Profile sind nur im eigenen Netzwerk sichtbar. Mitglieder können sie freiwillig für alle urbown-Mitglieder freigeben.
- **DSGVO und DSG** – Auftragsverarbeitungsvertrag inklusive. Nur notwendige Cookies, keine Werbetracker.
- **Hosting in der Schweiz** ← *geändert* – DSGVO- und DSG-konform. Server in Zürich, verschlüsselte Backups täglich in Genf. Alle Verbindungen verschlüsselt.
- **Ihre Daten bleiben Ihre** – Export jederzeit möglich. Bei Vertragsende erhalten Sie alle Daten und wir löschen sie.

**Sektion weiss – Häufige Fragen** (Split, Akkordeon mit `details`/`summary`, «+»/«–» rechts)
- Label: Häufige Fragen · h2: Fragen aus Verwaltungen.
- **Wer moderiert das Netzwerk?** – Die Stadt benennt eine oder zwei Personen als Administration, meist aus Innenstadtbüro, Citymanagement oder Wirtschaftsförderung. Wir unterstützen beim Start und bei Bedarf dauerhaft.
- **Wie viel Aufwand entsteht für die Verwaltung?** – Nach dem Start rechnen Städte mit zwei bis vier Stunden pro Woche: Einladungen freigeben, Beiträge der Stadt, gelegentliche Moderation.
- **Brauchen wir eine Ausschreibung?** – Für den Pilot nicht, er ist kostenlos. Für die Zeit danach hängt es vom Angebot und den Regeln Ihres Landes bzw. Kantons ab. Bitte prüfen Sie das mit Ihrer Vergabestelle. Wir liefern alle Unterlagen.
- **Was kostet urbown die Mitglieder?** – Nichts. Eigentümer, Gewerbe und Partner nutzen urbown kostenlos. Das ist wichtig, damit möglichst viele mitmachen.
- **Können mehrere Gemeinden ein Netzwerk teilen?** – Ja. Für Landkreise, Regionen oder Gemeindeverbünde gibt es ein Regionalangebot mit mehreren Netzwerken unter einem Vertrag.
- **Was passiert nach dem Pilot?** – Gegen Ende des Pilots besprechen wir die Ergebnisse und Sie erhalten ein Angebot. Ohne Ihre Zusage endet der Pilot automatisch. Damit das Budget rechtzeitig eingeplant werden kann, senden wir das Angebot auf Wunsch schon früher.

### 3.4 Funktionen `/funktionen`

**Hero** (einspaltig): Label «Funktionen» · h1 «Alles, was eine Innenstadt *braucht.*» (*Kontur*) · Lead «Ein Werkzeug für Leerstand, Austausch und Beteiligung. Fürs Handy gemacht, schnell und einfach zu bedienen.»

**Sektion paper:** Raster g3 mit allen 13 FEATURES

**Sektion weiss – Einblick** (Abschnitt 5, Variante «Funktionen»: 5 Bildschirmfotos)

**Sektion paper – Verwaltung**
- Label: Verwaltung · h2: Für die Administration.
- Raster g3:
  - `invite` **Einladungen mit Freigabe** – Mitglieder schlagen Personen vor, die Stadt gibt frei. Jede Einladung mit Rolle: Eigentümer, Mitarbeiter Stadt, Gewerbe, Partner.
  - `shield` **Moderation** – Gemeldete Inhalte prüfen, Inserate freigeben, Mitglieder verwalten.
  - `mail` **Newsletter** – Informationen an alle Mitglieder oder einzelne Rollen, mit Vorschau und Testversand.
  - `phone` **Mobil und sicher** – Als App installierbar. Optional mit 2-Faktor-Anmeldung.
  - `feed` **Auswertungen** – Beteiligung, Themen und Flächen im Überblick. Export als Tabelle.
  - `user` **Sammelimport** – Bestehende Kontakte aus Excel übernehmen. Jede Person legt beim ersten Login ihr Passwort fest.
- Button primär: **Alles in der Demo ausprobieren** (Demo-Adresse)

### 3.5 Preise `/preise`

**Hero** (einspaltig): Label «Preise» · h1 «Kostenlos starten. *Passend weitermachen.*» (*Kontur*) · Lead «Sechs Monate unverbindlich testen. Danach ein Angebot, das zur Grösse Ihrer Innenstadt passt, in Euro oder Franken.»

**Sektion paper:** Preis-Block, darunter Raster g3:
- **Region** – Mehrere Gemeinden oder ein Landkreis unter einem Vertrag.
- **Mehrjährig** – Bei längerer Laufzeit wird es günstiger. Das planen wir gern gemeinsam.
- **Partner** – Banken, Verwaltungen und Makler können ein Netzwerk als Partner unterstützen.

### 3.6 Netzwerke & Login `/netzwerke`

**Hero**
- Label: Login · h1: Ein Login für *alle* Netzwerke. (*Kontur*)
- Lead: Melden Sie sich unter app.urbown.com an. Sie landen automatisch in Ihrem Netzwerk. Sind Sie in mehreren Städten Mitglied, wechseln Sie mit einem Klick.
- Buttons: **Anmelden** (primär, Login-Adresse) · **Demo öffnen** (sekundär, Demo-Adresse)
- Kasten rechts: Label «Adresse» · Mono gross `app.urbown.com` · «Jede Stadt hat zusätzlich eine Kurzadresse, z. B. mannheim.urbown.com. Sie führt direkt zum Login.»

**Sektion paper – Netzwerke**
- Label: Netzwerke · h2: Diese Städte sind dabei.
- Tabelle (Kopf: Stadt · Netzwerk · Kurzadresse · Status; auf dem Handy horizontal scrollbar, `role="region"` mit `aria-label="Netzwerke"`):
  | Stadt | Netzwerk | Kurzadresse | Status |
  |---|---|---|---|
  | **Mannheim** | `app.urbown.com/mannheim` | `mannheim.urbown.com` | Badge solid «aktiv» |
  | **Demo** | `app.urbown.com/demo` | `demo.urbown.com` | Badge outline «zum Testen» |
  | **Ihre Stadt** | `app.urbown.com/ihrestadt` | `ihrestadt.urbown.com` | Button sm sekundär «So starten Sie» → `/staedte` |
- Hinweis-Kasten (1,5 px): **Erster Login nach der Umstellung?** – Geben Sie wie gewohnt Ihre E-Mail-Adresse ein. Sie erhalten dann automatisch eine E-Mail mit einem 6-stelligen Code. Damit bestätigen Sie, dass das Konto Ihnen gehört, und legen einmalig ein neues Passwort fest.

Die Netzwerkliste ist in UB03 statisch (Datei `web/src/content/networks.ts`). Ab UB05 kann sie aus der Datenbank kommen (nur Netzwerke mit Status «aktiv»).

### 3.7 Kontakt `/kontakt`

**Hero**
- Label: Kontakt · h1: Lassen Sie uns über Ihre *Stadt* sprechen. (*Kontur*)
- Lead: Demo-Termin, Infopaket für den Gemeinderat oder Pilotanfrage. Wir melden uns innerhalb von zwei Werktagen.
- Hinweis-Kasten: Label «Direkt» · Mono 18 px `info@urbown.com` (`mailto:`) · «urbown.com · IXIO AG · Zug»
- darunter (ab 900 px) Foto `kontakt-tasche.jpg` (2 : 3, max. 520 px hoch); auf dem Handy nach dem Formular

**Formular** (Kasten rechts, zweispaltig ab 560 px)
| Feld | Label | Typ / Regeln | `autocomplete` |
|---|---|---|---|
| anliegen | Ich interessiere mich für | `select`: Demo-Termin für meine Stadt (`demo`) · Infopaket für Verwaltung und Gemeinderat (`infopaket`) · Pilotangebot (`pilot`) · Zugang als Eigentümer oder Gewerbe (`zugang`) · Partnerschaft (`partner`). Vorauswahl über `?anliegen=…` | – |
| vorname | Vorname | Pflicht, max. 80 | `given-name` |
| name | Name | Pflicht, max. 80 | `family-name` |
| organisation | Organisation / Stadt (optional) | max. 120 | `organization` |
| funktion | Funktion (optional) | Platzhalter «z. B. Wirtschaftsförderung», max. 120 | `organization-title` |
| email | E-Mail | Pflicht, E-Mail-Format, max. 200 | `email` |
| nachricht | Nachricht (optional) | `textarea`, max. 4000 | – |
| website | (verstecktes Honigtopf-Feld, `aria-hidden`, `tabindex="-1"`) | muss leer sein | `off` |
| Turnstile | Cloudflare Turnstile (unsichtbar/managed) | Pflicht serverseitig | – |

- Button: **Anfrage senden** (Laden: «Wird gesendet …»)
- Text unter dem Button (`text-sm text-ink-2`): «Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten. Mehr dazu in der Datenschutzerklärung.» («Datenschutzerklärung» → `/datenschutz`)

**Meldungen**
| Fall | Text | Ort |
|---|---|---|
| Vorname fehlt | Bitte geben Sie Ihren Vornamen ein. | am Feld |
| Name fehlt | Bitte geben Sie Ihren Namen ein. | am Feld |
| E-Mail fehlt | Bitte geben Sie Ihre E-Mail-Adresse ein. | am Feld |
| E-Mail ungültig | Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@stadt.de. | am Feld |
| Mehrere Fehler | Bitte prüfen Sie die markierten Felder. (Liste mit Links zu den Feldern, `role="alert"`, Fokus darauf) | über dem Formular |
| Sicherheitsprüfung fehlgeschlagen | Die Sicherheitsprüfung hat nicht geklappt. Bitte laden Sie die Seite neu und versuchen Sie es nochmals. | über dem Button |
| Zu viele Anfragen (Rate-Limit) | Sie haben gerade mehrere Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten nochmals. | über dem Button |
| Versand fehlgeschlagen | Das hat leider nicht geklappt. Bitte versuchen Sie es nochmals oder schreiben Sie direkt an info@urbown.com. | über dem Button |
| Erfolg | **Danke, Ihre Anfrage ist bei uns.** Wir melden uns innerhalb von zwei Werktagen. | ersetzt das Formular, `role="status"`, Fokus auf die Meldung |

Prüfung im Browser (sofort) **und** auf dem Server (verbindlich, mit `zod`). Ohne JavaScript funktioniert das Formular ebenfalls (Server Action mit Formular-POST).

**E-Mail an info@urbown.com** (Resend, nur Text, keine Bestätigungsmail an Absender)
- Absender: `MAIL_FROM` (Vorschlag «urbown <no-reply@urbown.com>», endgültig in UB07), `Reply-To`: Adresse der anfragenden Person
- Betreff: `Anfrage urbown.com: {Anliegen} – {Organisation oder «ohne Organisation»}`
- Text:
```
Neue Anfrage über urbown.com/kontakt

Anliegen:      {Anliegen (Klartext)}
Vorname:       {vorname}
Name:          {name}
Organisation:  {organisation oder –}
Funktion:      {funktion oder –}
E-Mail:        {email}

Nachricht:
{nachricht oder –}

–
Gesendet am {TT.MM.JJJJ HH:MM} (Europe/Zurich). Antworten Sie direkt auf diese E-Mail.
```
- Keine Speicherung der Anfrage in einer Datenbank (Datensparsamkeit). Keine IP-Adresse in der Mail. Rate-Limit: 5 Anfragen pro IP und Stunde (im Speicher, IP nur gehasht und nur für das Zeitfenster).

### 3.8 Rechtstexte (Platzhalter bis UB25, `noindex`)
**Impressum `/impressum`** – h1 «Impressum»
```
urbown ist ein Angebot der
IXIO AG
Bahnhofplatz
6300 Zug
Schweiz

E-Mail: info@urbown.com
Handelsregister / UID: [folgt]
Vertretungsberechtigt: [folgt]
```
Darunter `text-ink-2`: «Vollständige Angaben folgen vor dem Go-Live.»

**Datenschutz `/datenschutz`** – h1 «Datenschutzerklärung» · «Die Datenschutzerklärung für die neue urbown.com wird vor dem Go-Live hier veröffentlicht. Fragen beantworten wir gern unter info@urbown.com.»
**AGB `/agb`** – h1 «Allgemeine Geschäftsbedingungen» · «Die AGB für die neue urbown.com werden vor dem Go-Live hier veröffentlicht.»

### 3.9 Fehlerseite (404)
- Label: Fehler 404 · h1: Diese Seite gibt es nicht. · «Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie alles Wichtige.» · Button **Zur Startseite**. Kopf und Footer wie überall.

---

## 4. Fotos

Vom Projektinhaber am 18.11.2026 geliefert, hier in **Graustufen** aufbereitet (max. 2400 px, JPEG). Paket `urbown-fotos-landing.zip` → im Repository `web/src/assets/landing/`.

**Regeln:** nur Graustufen, kein Text auf Fotos, keine Überlagerung/Abdunkelung, keine Animation. Einbindung mit `next/image` (statischer Import, `placeholder="blur"`, `sizes` passend, `loading="lazy"`; keines der Fotos liegt im ersten Bildschirm, darum nie `priority`). **Bildband:** eigene Zeile in der Containerbreite (`max-w-site`), Rahmen 1,5 px `ink`, keine Rundung, Seitenverhältnis **4 : 3 auf dem Handy, 21 : 9 ab 680 px**, `object-cover` mit Fokuspunkt; oben und unten `section-y` halb (ca. 28–56 px), Hintergrund wie die vorherige Sektion.

| Datei | Seite / Ort | Format | Fokuspunkt (`object-position`) | Alt-Text |
|---|---|---|---|---|
| `start-schaufenster.jpg` | Start, Bildband nach dem Zielgruppen-Raster | Band | `70% 35%` | Frau mit Smartphone zeigt lächelnd auf ein Schaufenster in einer Einkaufsstrasse. |
| `eigentuemer-passanten.jpg` | Eigentümer, Bildband nach dem Hero | Band | `45% 50%` | Zwei Personen mit Einkaufstaschen gehen an einem Ladeneingang vorbei. |
| `eigentuemer-ladenflaeche.jpg` | Eigentümer, «Vakante Fläche inserieren», linke Spalte | 4 : 3 | `50% 50%` | Helle Ladenfläche mit Kleiderständern, Regalen und einer Kundin. |
| `staedte-fussgaengerzone.jpg` | Städte, Bildband nach dem Hero | Band | `50% 55%` | Belebte Fussgängerzone mit Altbauten und Strassencafés. |
| `kontakt-tasche.jpg` | Kontakt, linke Spalte unter «Direkt» | 2 : 3 | `50% 30%` | Mann im dunklen Anzug hält eine schwarze Stofftasche mit dem urbown-Logo. |

Reserve (nicht einbauen): `reserve-einkaufstaschen.jpg`, `reserve-zwei-frauen.jpg`, `reserve-paar.jpg`.
Nicht verwendet: Einkaufszentrum mit Fremdmarken (McDonald's), Taschen mit fremdem Markennamen, Restaurant mit Werbeschild und Masken, dunkle Innenaufnahme Aussichtsplattform, dunkles «Holografie»-Mockup (zu klein, dunkler Hintergrund).
**Bildrechte:** Pexels/Unsplash/Pixabay frei nutzbar; die Fotolia-/Adobe-Stock-Bilder und das Placeit-Mockup nur mit gültiger Lizenz der IXIO AG (Projektinhaber bestätigt, Master Abschnitt 9).

---

## 5. Neuer Bereich «Einblick» (Bildschirmfotos der App)

**Zweck:** Interessierte sehen die App, ohne die Demo zu öffnen. Die Demo bleibt als Button daneben.

**Texte**
- Label: Einblick
- h2: So sieht Ihr Netzwerk aus.
- Lead: Ein Blick ins Demo-Netzwerk, auf dem Handy und am Computer. Alle Namen und Inhalte sind Beispieldaten.
- Button sekundär (nur Start): **Demo selbst testen** (Demo-Adresse)

**Bildschirmfotos**
| Kürzel | Gerät | Ansicht | Bildunterschrift (Mono-Label) | Alt-Text | Start | Funktionen |
|---|---|---|---|---|---|---|
| `dashboard` | Computer 1280 × 800 | Dashboard mit Feed, Umfrage, Seitenleiste | Dashboard: alles Neue nach dem Login | Dashboard im Demo-Netzwerk mit Newsfeed, einer Umfrage und rechts den neuesten vakanten Flächen und Events. | ✓ | ✓ |
| `flaechen` | Handy 390 × 844 | Vakante Flächen, Liste | Vakante Flächen | Liste vakanter Flächen auf dem Handy mit Fläche, Schaufensterfront und «verfügbar ab». | ✓ | ✓ |
| `umfrage` | Handy 390 × 844 | Feed mit Umfrage (nach Stimmabgabe) | Umfrage im Feed | Umfrage im Feed auf dem Handy mit Ergebnissen in Prozent. | ✓ | ✓ |
| `karte` | Computer 1280 × 800 | Karte mit allen Typen | Karte mit Flächen, Inseraten und Events | Stadtkarte in Graustufen mit Markierungen für vakante Flächen, Immobilien, Events und Orte. | – | ✓ |
| `dokumente` | Computer 1280 × 800 | Dokumente, Ordneransicht | Dokumente in Ordnern | Dokumentenablage mit Ordnern und Dateien, jeweils mit Datum und Grösse. | – | ✓ |

**Gestaltung**
- **Computer-Rahmen:** Rahmen 1,5 px `ink`, oben Leiste (`border-b border-ink`, `py-2 px-3`) mit Mono `text-xs text-ink-2` «app.urbown.com/demo»; keine Fensterknöpfe, keine Schatten.
- **Handy-Rahmen:** Rahmen 1,5 px `ink`, `rounded-lg`, Innenabstand 6 px, Bild darin `rounded-md`; keine Geräte-Attrappe.
- Darunter jeweils die Bildunterschrift als `lbl` (`figure`/`figcaption`).
- **Anordnung ab 900 px:** Computer links (2/3 Breite), rechts zwei Handys nebeneinander, unten bündig. **Darunter (Funktionen):** zweite Zeile mit den zwei weiteren Computer-Bildern je 1/2. **Handy:** Computer-Bild volle Breite, darunter zwei Handys nebeneinander (je 1/2), keine Slider.
- Bilder mit `next/image` (`sizes` entsprechend), `loading="lazy"`.

**Herkunft der Bildschirmfotos**
- Ein Skript `npm run screenshots` (Playwright) erzeugt alle fünf Bilder in `web/src/assets/screens/` (PNG, Gerätepixel 2×; Handy 3×). Parameter: Quelle-Adresse.
- **Bis UB24 (Zwischenstand):** Quelle ist der freigegebene Prototyp `docs/grundlagen/prototyp/netzwerk-app.html` im Demo-Modus, Kartenkacheln per CSS in Graustufen. Die Bilder sind damit bereits realistisch.
- **Ab UB24:** Skript läuft gegen `https://demo.urbown.com` (Demo-Zugang Mitglied) und ersetzt die Bilder. Danach bei grösseren Änderungen an Dashboard, Flächen, Umfrage, Karte oder Dokumenten neu erzeugen.

---

## 6. Landing-Bausteine (neu, in UB02 nachtragen)

Liegen in `web/src/components/site/`, nutzen nur Tokens und Grundbausteine aus UB02.

| Baustein | Inhalt / Regeln |
|---|---|
| `SiteHeader`, `MobileMenu` | 2.2; Menü als kleine Client-Komponente, sonst Server-Komponenten |
| `SiteFooter` | 2.3 |
| `Section` | `variant: white \| paper`, `border-t border-ink`, `section-y`, `band`, Inhalt `max-w-site mx-auto` |
| `Hero` | Text (Label, h1, Lead, Buttons) + optional Kasten rechts; einspaltig unter 900 px; Variante `single` |
| `AddressCard` | Adress-Kasten mit Live-Eingabe (Client), 3.1 |
| `AudienceGrid` | 3 verlinkte Felder mit Linien, Pfeil «→» (Archivo 800, 22 px) |
| `RuleGrid` | Raster `cols: 2 \| 3 \| 4` mit gemeinsamen schwarzen Linien; Spalten: 1 → 2 ab 680 px (g4) → 3/4 ab 900 px |
| `FeatureTile` | Icon 28 px, h3, Text `text-ink-2` |
| `Split` | Titelspalte (1) und Inhalt (1,4), untereinander unter 900 px |
| `Steps` | geordnete Liste, Konturziffern 34 px (Handy 30 px), Linie oben `ink`, zwischen Schritten `line` |
| `RefStats` | Kasten 1,5 px, drei Zahlen `font-display` 900 |
| `PriceBlock` | 2.5, Kästen 1,5 px, erster mit 3-px-Innenrahmen (`outline`) |
| `Faq` | `details`/`summary`, Titel Archivo 700 19 px, «+»/«–» rechts, `min-h-11` |
| `Note` | Hinweis-Kasten 1,5 px |
| `ImageBand`, `Photo` | Abschnitt 4 |
| `ScreenShowcase`, `DesktopFrame`, `PhoneFrame` | Abschnitt 5 |
| `ContactForm` + Server Action `sendContact` | 3.7 |
| `LegalPlaceholder` | 3.8 |
