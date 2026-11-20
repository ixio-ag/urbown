# UB02 – Design-System urbown 2.0

Stand: 18.11.2026 · Projekt «urbown.com 2.0» · Ergebnis UB02
Grundlage: Master-Datei Version 8.1, `claude/UB01-architektur.md`, freigegebene Prototypen `claude/prototyp/landing.html` und `claude/prototyp/netzwerk-app.html`, Logo-Dateien «urbown logo normal 500.png» und «urbown logo quadrat schwarz.png».
Zielgruppe dieses Dokuments: **Claude Code** (Umsetzung in `ixio-ag/urbown`, Next.js 16 + Tailwind CSS 4) und alle folgenden Projekt-Chats.

**Kernentscheide UB02**
1. Die freigegebenen Prototypen sind die Mockups. Jede Seite wird nach dem Prototyp gebaut (Zuordnung in Abschnitt 10). Dieses Dokument legt die Bausteine, Masse und Zustände fest, damit alle Module gleich aussehen und gleich funktionieren.
2. Farben, Schriften, Radien und Abstände kommen **nur** aus den Tokens in `web/src/app/globals.css` (Abschnitt 4). Keine Hex-Werte und keine `[…]`-Sonderwerte im Komponentencode.
3. Barrierefreiheit nach **WCAG 2.2 AA** (Grundlage für BITV 2.0 / EN 301 549 bei deutschen Städten). Dafür wurden einige Prototyp-Werte leicht angepasst (Abschnitt 2).
4. Logo als SVG aus der Schriftgeometrie neu gezeichnet und mit der Originaldatei deckungsgleich geprüft (Abschnitt 5). Für Kopfzeile und Handy gilt die Web-Variante mit kräftigerer Kontur bei «own».

---

## 1. Grundsätze

| Grundsatz | Regel |
|---|---|
| **Stadtplan-Raster** | Inhalte liegen als weisse Flächen auf hellem Grund, getrennt durch feine Linien wie Strassen zwischen Quadraten. Auf der Landingpage sind die Rasterlinien schwarz (1 px bzw. 1,5 px), in der App hellgrau. |
| **Nur Schwarz/Weiss** | Schwarz `#111111`, Weiss, wenige warme Grautöne. Keine Akzentfarbe, keine Statusfarben (kein Rot/Grün). Zustände werden über Füllung, Kontur, Strichstärke, Symbol und Text unterschieden. |
| **Keine dunklen Hintergründe** | Seiten-, Bereichs- und Kartenhintergründe sind immer hell (`white`, `paper`). Schwarze Flächen nur für **kleine** Elemente: Primär-Button, aktiver Navigationseintrag, gefüllte Chips/Segmente, Solid-Badge, Toast, Kalender-Event, Kartenmarker, Erstellen-Knopf. Kein Dark Mode (`color-scheme: light`). Ausnahme: die halbtransparente Abdunkelung hinter einem Modal. |
| **Mobile first** | Jede Ansicht wird zuerst für 360–430 px gebaut und dann erweitert. Jede Funktion ist auf dem Handy vollständig bedienbar (Master 2). |
| **Grosse Touch-Flächen** | Jede bedienbare Fläche ist mindestens **44 × 44 px** gross (bzw. hat eine unsichtbar vergrösserte Trefferfläche, Utility `hit`). Abstand zwischen Zielen mindestens 8 px. |
| **Lesbarkeit** | Fliesstext 16 px auf dem Handy, 15 px in der App ab 900 px, 16 px auf der Landingpage. Zeilenlänge max. ca. 70 Zeichen. Mindestgrösse 11 px nur für Mono-Labels in Grossbuchstaben. |
| **Typografie mit Rollen** | Archivo = Titel und grosse Zahlen. Inter = Text und Bedienelemente. IBM Plex Mono = Daten, Labels, Adressen, Badges. |
| **Ruhe** | Keine Schatten, keine Verläufe, keine Slider, keine Effekte. Bewegung nur kurz (≤ 200 ms) und abschaltbar (`prefers-reduced-motion`). |
| **Sprache** | Deutsch, Sie-Form, Schreibweise wie Master und Prototyp («ss», Anführungszeichen «»). Texte aus dem Prototyp übernehmen. Buttons benennen die Handlung («Fläche inserieren», nicht «OK»). |

---

## 2. Anpassungen gegenüber dem Prototyp (Barrierefreiheit, Touch)

Optik und Aufbau bleiben wie freigegeben. Diese Werte ändern sich, weil der Prototyp sonst WCAG 2.2 AA nicht erfüllt oder auf dem Handy zu klein ist:

| Element | Prototyp | Verbindlich | Grund |
|---|---|---|---|
| Tertiärtext (`ink-3`) | `#8A8A84` (3,5 : 1 auf Weiss) | **`#6B6B65`** (5,4 : 1) | Textkontrast ≥ 4,5 : 1 |
| Rahmen von Eingabefeldern, Chips, Checkboxen | `#C9C9C3` / `#E2E2DD` (1,3–1,7 : 1) | **`#8A8A84`** (`field`, 3,5 : 1) | Kontrast von Bedienelementen ≥ 3 : 1 |
| Button-Höhe App | 38 px, klein 30 px | **44 px**, klein 36 px sichtbar + 44 px Trefferfläche | Touch |
| Eingabefelder App | 40 px, 15 px Schrift | **44 px**, **16 px** Schrift (verhindert Zoom auf iOS) | Touch, iOS |
| Chips | ca. 26 px hoch | **36 px** sichtbar + 44 px Trefferfläche | Touch |
| Segment-Umschalter | ca. 32 px | **44 px** | Touch |
| Tab-Leiste Handy: Beschriftung | 10,5 px | **12 px** | Lesbarkeit |
| Badges | 10,5 px | **11 px** | Lesbarkeit |
| Aktiver Tab / aktiver Eintrag | nur Farbe/Linie | zusätzlich `font-semibold` und `aria-current` / `aria-selected` | Nicht nur über Farbe |
| Neu-Punkt im Feed | nur `title` | zusätzlich unsichtbarer Text «Neu» | Screenreader |
| Toast | 2,6 s | **5 s**, pausiert bei Hover/Fokus | Lesezeit |
| Heute im Kalender | fett + unterstrichen | Tageszahl in schwarzem Kreis, `aria-current="date"` | Sichtbarkeit |
| Logo-Rückfall | Text mit `-webkit-text-stroke`, «own» in Normalschnitt | **immer SVG** (Abschnitt 5) | Formtreue |
| Kartenkacheln | farbige OSM-Kacheln | **Graustufen** | Schwarz/Weiss-Vorgabe |
| Breakpoints | 560 / 680 / 760 / 900 / 960 px | **560 / 680 / 900 / 1200 px** (Abschnitt 3.6) | Vereinheitlicht |

---

## 3. Design-Tokens

### 3.1 Farben

| Token | Wert | Verwendung | Kontrast auf Weiss / paper |
|---|---|---|---|
| `white` | `#FFFFFF` | Flächen (Cards, Sidebar, Modal, Felder), Text auf Schwarz | – |
| `paper` | `#F6F6F4` | Seitenhintergrund App, «paper»-Sektionen Landingpage, Nur-Lesen-Felder | – |
| `muted` | `#EFEFEC` | Hover-Fläche, Kopfzeile Kalender, Ordner-Symbol, Ergebnisbalken Umfrage | – |
| `hover` | `#FAFAF8` | Hover auf klickbaren Listenzeilen/Cards | – |
| `fill` | `#DADAD5` | gewählte Umfrage-Option (Balken), Fortschrittsbalken-Hintergrund | – |
| `line` | `#E2E2DD` | Trennlinien, Card-Rahmen, Tabellenzeilen (rein dekorativ) | 1,3 : 1 |
| `field` | `#8A8A84` | Rahmen von Feldern, Chips, Checkboxen, Dropzone | 3,5 / 3,2 : 1 ✓ (≥ 3) |
| `ink-3` | `#6B6B65` | Tertiärtext: Gruppentitel Navigation, Tage ausserhalb des Monats, Platzhalter | 5,4 / 5,0 : 1 ✓ |
| `ink-2` | `#55554F` | Sekundärtext, Metazeilen, Labels | 7,5 / 6,9 : 1 ✓ |
| `ink-hover` | `#33332F` | Hover auf schwarzen Buttons | 12,7 : 1 (Weiss darauf) |
| `ink` | `#111111` | Text, Linien Landingpage, Primär-Button, aktive Zustände, Fokusrahmen | 18,9 / 17,5 : 1 ✓ |
| Abdunkelung | `rgb(17 17 17 / 0.45)` | nur hinter Modal/Sheet | – |

Nicht erlaubt: reines `#000000`, Farben ausserhalb dieser Liste, Transparenz-Varianten von `ink` für Text (Grau immer über `ink-2`/`ink-3`).

### 3.2 Schriften

| Rolle | Familie | Schnitte | Einsatz |
|---|---|---|---|
| `display` | **Archivo** | 500, 700, 800, 900 | Überschriften, grosse Zahlen (Kennzahlen, Preise, Schrittnummern), Status-Post, Monatstitel |
| `sans` | **Inter** | 400, 500, 600 | Fliesstext, Buttons, Felder, Navigation |
| `mono` | **IBM Plex Mono** | 400, 500 | Labels (Grossbuchstaben), Badges, Adressen (`app.urbown.com/…`), Quadrate («P7, 14»), m², Daten, Dateitypen, Tabellenköpfe |

Laden über `next/font/google` (wird beim Build selbst gehostet, kein Aufruf zu Google im Browser → DSGVO), `display: swap`, nur Untergruppe `latin` (enthält ä, ö, ü, ß, «»). Rückfall: `"Helvetica Neue", Arial, sans-serif` bzw. `ui-monospace, Menlo, monospace`.

### 3.3 Schriftgrössen

| Token | Grösse | Zeilenhöhe | Typischer Einsatz |
|---|---|---|---|
| `text-micro` | 11 px | 1,35 | Mono-Label (`lbl`), Badge, Tabellenkopf, Kalender-Wochentag |
| `text-xs` | 12 px | 1,4 | Mono-Daten klein, Tab-Leiste Handy, Kalender-Event |
| `text-sm` | 13 px | 1,45 | Metazeile, Hilfetext, Feldlabel |
| `text-ui` | 15 px | 1,5 | App-Fliesstext ab 900 px, Buttons |
| `text-base` | 16 px | 1,6 | Fliesstext Handy und Landingpage, Eingabefelder (immer) |
| `text-lg` | 18 px | 1,5 | Untertitel, Mono-Adresse Landingpage |
| `text-xl` | 20 px | 1,2 | App h2, Landing h3 |
| `text-2xl` | 22 px | 1,25 | Status-Post im Feed |
| `text-3xl` | 26 px | 1,1 | Kennzahl (Stat-Kachel) |
| `text-4xl` | 28 px | 1,15 | App h1 (Handy unter 560 px: 24 px = `text-h1-sm`) |
| `text-5xl` | 44 px | 1,02 | Login-Titel (Handy 34 px = `text-login-sm`) |
| `text-lead` | clamp(18 px, 1,7 vw, 21 px) | 1,5 | Lead-Absatz Landingpage |
| `text-display-2` | clamp(30 px, 4,2 vw, 52 px) | 1,05 | Landing h2 |
| `text-display-1` | clamp(40 px, 7,2 vw, 96 px) | 1,05 | Landing h1 |

Überschriften: `font-display`, `tracking-tight` (-0,01 em App, -0,02 em Landing), `text-wrap: balance`. h1 App 800, h2 700, h3 700; Landing h1 900, h2 800.
Konturschrift (`text-outline`, «gemeinsam», «Ihr Netzwerk.»): nur ab 30 px Schriftgrösse, Kontur 1,5 px (ab 900 px: 2 px). Der Satz muss auch ohne Konturwirkung verständlich sein.

### 3.4 Abstände und Raster

- Basis **4 px** (Tailwind-Standard `--spacing: 0.25rem`). Übliche Werte: 4, 8, 12, 16, 20, 24, 32, 48.
- App-Inhalt: max. **1120 px** (`max-w-app`), seitlich 16 px (+ Safe-Area). Abstand zwischen Blöcken 20 px, zwischen Cards 16 px, Innenabstand Card 16 px.
- Landingpage: max. **1200 px** (`max-w-site`), Sektionen `py-[clamp(56px,8vw,112px)]` als Utility `section-y`, Sektionsgrenze `border-t border-ink`.
- Dashboard: zwei Spalten 1,6 : 1 ab 900 px, darunter eine Spalte.
- Formulare: zwei Spalten ab 560 px, darunter eine; lange Felder `col-span-full`.

### 3.5 Radien, Linien, Schatten, Ebenen

| Token | Wert | Einsatz |
|---|---|---|
| `rounded-xs` | 3 px | Badge, Dateityp-Symbol, Kalender-Event |
| `rounded-sm` | 4 px | Landingpage: Buttons, Felder; Bild-Vorschau |
| `rounded-md` | 6 px | App: Buttons, Felder, Cards, Segment, Toast |
| `rounded-lg` | 10 px | Modal / Sheet |
| `rounded-full` | – | Chips, Avatar, Kartenmarker rund, Erstellen-Knopf |

Linien: 1 px Standard; 1,5 px Landingpage-Kästen (Preise, Referenz, Hinweis); 2 px Fokus, aktiver Tab, Fehlerfeld. **Keine Schatten** (Tailwind-Schatten sind deaktiviert).

Ebenen (`z-index`, als CSS-Variablen): Sidebar 30 · Kopfzeile Handy 40 · Tab-Leiste 45 · Kopfzeile Landing 50 · Safe-Area-Abdeckung 60 · Modal 70 · Toast 80.

### 3.6 Breakpoints

| Token | ab | Wirkung |
|---|---|---|
| `sm` | 560 px | Formulare zweispaltig, h1 28 px |
| `md` | 680 px | Landing-Raster mehrspaltig, Modal mittig statt Sheet, Tabellen als Tabelle statt Kartenliste |
| `lg` | 900 px | **App: Sidebar statt Tab-Leiste**, Dashboard zweispaltig, Fliesstext 15 px; Landing: Navigation statt Menü-Knopf |
| `xl` | 1200 px | volle Containerbreite |

### 3.7 Bewegung
`duration-150` für Hover/Fokus, 200 ms für Sheet/Modal (von unten bzw. Einblenden), Toast 150 ms. Easing `cubic-bezier(.2,.8,.2,1)`. Bei `prefers-reduced-motion: reduce` alles ohne Bewegung. Hover-Anheben der Landing-Buttons (−1 px) entfällt dann.

---

## 4. Umsetzung in Tailwind CSS 4

### 4.1 Schriften (`web/src/app/fonts.ts`)
```ts
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
export const archivo = Archivo({ subsets: ["latin"], weight: ["500","700","800","900"], variable: "--font-archivo", display: "swap" });
export const inter = Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-inter", display: "swap" });
export const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-plex-mono", display: "swap" });
// layout.tsx: <html lang="de" className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}>
```

### 4.2 `web/src/app/globals.css`
```css
@import "tailwindcss";

/* Nur diese Werte sind erlaubt: Standardfarben, Schatten, Radien und Breakpoints von Tailwind werden entfernt. */
@theme {
  --color-*: initial;
  --color-white: #FFFFFF;
  --color-paper: #F6F6F4;
  --color-muted: #EFEFEC;
  --color-hover: #FAFAF8;
  --color-fill: #DADAD5;
  --color-line: #E2E2DD;
  --color-field: #8A8A84;
  --color-ink-3: #6B6B65;
  --color-ink-2: #55554F;
  --color-ink-hover: #33332F;
  --color-ink: #111111;
  --color-scrim: rgb(17 17 17 / 0.45);

  --text-*: initial;
  --text-micro: 0.6875rem;   --text-micro--line-height: 1.35;
  --text-xs: 0.75rem;        --text-xs--line-height: 1.4;
  --text-sm: 0.8125rem;      --text-sm--line-height: 1.45;
  --text-ui: 0.9375rem;      --text-ui--line-height: 1.5;
  --text-base: 1rem;         --text-base--line-height: 1.6;
  --text-lg: 1.125rem;       --text-lg--line-height: 1.5;
  --text-xl: 1.25rem;        --text-xl--line-height: 1.2;
  --text-2xl: 1.375rem;      --text-2xl--line-height: 1.25;
  --text-3xl: 1.625rem;      --text-3xl--line-height: 1.1;
  --text-h1-sm: 1.5rem;      --text-h1-sm--line-height: 1.15;
  --text-4xl: 1.75rem;       --text-4xl--line-height: 1.15;
  --text-login-sm: 2.125rem; --text-login-sm--line-height: 1.02;
  --text-5xl: 2.75rem;       --text-5xl--line-height: 1.02;
  --text-lead: clamp(1.125rem, 1.7vw, 1.3125rem);     --text-lead--line-height: 1.5;
  --text-display-2: clamp(1.875rem, 4.2vw, 3.25rem);  --text-display-2--line-height: 1.05;
  --text-display-1: clamp(2.5rem, 7.2vw, 6rem);       --text-display-1--line-height: 1.05;

  --radius-*: initial;
  --radius-xs: 3px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-full: 9999px;

  --shadow-*: initial;
  --inset-shadow-*: initial;
  --drop-shadow-*: initial;

  --breakpoint-*: initial;
  --breakpoint-sm: 35rem;     /* 560 px */
  --breakpoint-md: 42.5rem;   /* 680 px */
  --breakpoint-lg: 56.25rem;  /* 900 px */
  --breakpoint-xl: 75rem;     /* 1200 px */

  --container-login: 23.75rem; /* 380 px */
  --container-modal: 40rem;    /* 640 px */
  --container-modal-wide: 52rem; /* 832 px, lange Formulare */
  --container-app: 70rem;      /* 1120 px */
  --container-site: 75rem;     /* 1200 px */

  --ease-out: cubic-bezier(.2, .8, .2, 1);
  --tracking-label: 0.08em;
  --tracking-badge: 0.05em;
  --tracking-code: 0.5em;
  --text-nano: 0.625rem;     --text-nano--line-height: 1; /* nur Dateityp-Kürzel im Symbol */
}

/* Schriften aus next/font (Variablen werden erst zur Laufzeit gesetzt) */
@theme inline {
  --font-display: var(--font-archivo), "Helvetica Neue", Arial, sans-serif;
  --font-sans: var(--font-inter), "Helvetica Neue", Arial, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, Menlo, monospace;
}

:root {
  color-scheme: light;
  --z-side: 30; --z-mobtop: 40; --z-tabbar: 45; --z-header: 50; --z-safe: 60; --z-modal: 70; --z-toast: 80;
  --tabbar-h: 3.5rem; /* 56 px + Safe-Area */
}

@layer base {
  html { -webkit-text-size-adjust: 100%; }
  body { @apply bg-paper text-ink font-sans text-base antialiased lg:text-ui; }
  body.site { @apply bg-white lg:text-base; }                  /* Landingpage */
  h1, h2, h3 { @apply font-display text-balance tracking-tight; margin: 0; }
  :focus-visible { outline: 2px solid var(--color-ink); outline-offset: 2px; }
  ::selection { background: var(--color-ink); color: var(--color-white); }
  [hidden] { display: none !important; }
  button, input, select, textarea { font: inherit; color: inherit; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
  }
}

/* Mono-Label in Grossbuchstaben */
@utility lbl { @apply font-mono text-micro uppercase text-ink-2; letter-spacing: var(--tracking-label); }
/* Tabellarische Ziffern für Beträge, m², Zähler */
@utility num { font-variant-numeric: tabular-nums; }
/* Konturschrift für Titel ab 30 px */
@utility text-outline {
  color: transparent; -webkit-text-stroke: 1.5px var(--color-ink);
  @media (width >= 56.25rem) { -webkit-text-stroke-width: 2px; }
}
/* Trefferfläche mindestens 44 × 44 px, ohne die sichtbare Grösse zu ändern */
@utility hit {
  position: relative;
  &::after { content: ""; position: absolute; inset: min(0px, calc((100% - 44px) / 2)); }
}
/* Seitenränder inkl. Safe-Area (iPhone) */
@utility band {
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
}
@utility section-y { padding-block: clamp(3.5rem, 8vw, 7rem); }
/* Platz unter dem Inhalt für die Tab-Leiste (Handy) */
@utility pb-tabbar {
  padding-bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom) + 2.5rem);
  @media (width >= 56.25rem) { padding-bottom: 6rem; }
}
/* Platzhalter-Bild (Streifen) */
@utility thumb-empty { background: repeating-linear-gradient(135deg, var(--color-muted) 0 10px, var(--color-white) 10px 20px); }
```

**Regeln für Claude Code**
- Keine Hex-Werte, keine Sonderfarben (`bg-[#…]`), keine Sonder-Schriftgrössen (`text-[…]`), keine Schatten in Komponenten. Sonderwerte in eckigen Klammern sind nur für Layout-Masse erlaubt (z. B. `min-h-[5.5rem]`, `calc(…)` mit `env()`/Variablen). Fehlt eine Farbe oder Schriftgrösse, wird zuerst ein Token ergänzt und in diesem Dokument nachgetragen.
- Klassen über eine kleine Hilfsfunktion `cn()` (clsx + tailwind-merge) und Varianten-Objekte je Komponente (z. B. `class-variance-authority`). Keine UI-Bibliothek mit eigenem Stil (kein shadcn-Theme, kein MUI). Für zugängliche Muster (Dialog, Menü, Tabs, Listbox) sind native Elemente erste Wahl (`<dialog>`, `<details>`, `<select>`); wo nötig **Radix Primitives** ohne Stil.
- Komponenten in `web/src/components/ui/` (Grundbausteine) und `web/src/components/app/` (Feed-Eintrag, Kartenansicht, Kalender, Dokumentliste usw.).

---

## 5. Logo

### 5.1 Aufbau
«urbown» in Helvetica Bold: **«urb» gefüllt, «own» nur als Kontur** (gleicher fetter Schnitt, nicht der Normalschnitt). Die Quadrat-Variante setzt «URB» über «OWN» in Grossbuchstaben.

Die SVG-Dateien wurden aus der Glyphen-Geometrie eines Helvetica-Nachbaus (TeX Gyre Heros, freie Lizenz, als Pfade eingebettet, keine Schrift nötig) gebaut und mit den Original-PNGs überlagert: Form, Abstände und Höhen stimmen auf ±1 px (bei 500 px Breite) überein. Sobald die Vektordatei des Originals vorliegt (Master 9, Punkt 1), werden die Pfade von «urb» und «own» daraus übernommen; Dateinamen und Einsatz bleiben gleich.

### 5.2 Dateien (Projektwissen `claude/UB02-logo/`, im Repository `web/public/brand/`)

| Datei | Kontur «own» | Einsatz |
|---|---|---|
| `urbown-logo.svg` | 17 Einheiten (≈ Original) | Ab **40 px Höhe**: Landingpage-Hero, Login linke Seite, Druck, Präsentationen, E-Mail-Kopf (als PNG 2×) |
| `urbown-logo-web.svg` | **40 Einheiten** (≈ 2,4 × stärker) | **Unter 40 px Höhe**: Kopfzeile Landing (30 px), Sidebar (26 px), Kopfzeile Handy (24 px), Footer (32 px) |
| `urbown-quadrat.svg` | wie Original | Quadrat-Logo transparent (Social Media, Präsentation) |
| `urbown-icon.svg` | kräftig, weisser Grund | Favicon (SVG), Apple-Touch-Icon, PWA-Icon `purpose: any` |
| `urbown-icon-maskable.svg` | kräftig, mit Schutzzone | PWA-Icon `purpose: maskable` (Inhalt in der inneren 62 %-Fläche) |

Alle Dateien: Farbe `#111111`, `role="img"` und `<title>urbown</title>`. Als Link-Logo: `<a href="…" aria-label="urbown Startseite"><img src="/brand/urbown-logo-web.svg" alt="urbown" …></a>` bzw. als React-Komponente `<Logo variant="web" height={24} />`, die das SVG inline ausgibt (spart eine Anfrage, bleibt scharf).

### 5.3 Regeln
- Mindesthöhe 20 px (Web-Variante). Original-Variante nie unter 40 px.
- Schutzzone rundum = Höhe des «u» (x-Höhe).
- Nur Schwarz auf Weiss/paper. Nicht einfärben, nicht verzerren, keine Schatten, nicht nachsetzen in einer anderen Schrift, kein Text-Rückfall mit `-webkit-text-stroke`.
- Grössen: Landing-Kopf 30 px, Footer 32 px, Sidebar 26 px (≈ 118 px breit), Kopfzeile Handy 24 px, Login 40–48 px (Original).
- Netzwerk-Logos (Stadt/Verein, Upload im Admin) erscheinen getrennt im Dashboard-Kopf (Abschnitt 8.13), nie neben dem urbown-Logo in der Navigation.

### 5.4 Abgeleitete Dateien (Claude Code erzeugt sie beim Build einmalig, z. B. mit `sharp`)
`favicon.ico` (32/48 aus `urbown-icon.svg`), `icon.svg`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `og-image.png` (1200 × 630, Logo Original auf Weiss, Claim). Manifest: `name` «urbown», `short_name` «urbown», `theme_color` und `background_color` `#FFFFFF`, `display: standalone`.

---

## 6. Symbole (Icons)

- Eigener Satz aus dem Prototyp (Objekt `P`), 24 × 24-Raster, **Linie 1,7 px**, runde Enden, ohne Füllung, `currentColor`. Datei `web/src/components/ui/icons.tsx`, eine Komponente `<Icon name="store" />`, `aria-hidden="true"`. Kein Icon-Font.
- Bestand: `home store building forum news cal folder users group map msg user plus invite shield globe menu logout poll img video text status search mail link` (Pfade 1:1 aus dem Prototyp).
- Ergänzen im gleichen Stil: `close` (×), `chevron-left/right/down`, `more` (⋯), `check`, `alert` (Dreieck mit !), `upload`, `download`, `edit`, `trash`, `filter`, `location` (Pin), `clock`, `calendar-plus` (.ics), `eye-off` (ausgeblendet), `lock` (geschlossene Gruppe), `external` (Website-Button), `crosshair` (Ort setzen).
- Grössen: 18 px (Navigation, Buttons), 20 px (Kopfzeile Handy), 22 px (Tab-Leiste), 24 px (Erstellen-Menü), 28 px (Landing-Funktionen). Ein Icon allein ist nie die einzige Beschriftung – ausser bei Icon-Buttons mit `aria-label`.

---

## 7. Layout

### 7.1 App-Shell
**Desktop (ab 900 px):** zweispaltig, Sidebar **248 px** links (weiss, `border-r border-line`, `sticky top-0 h-dvh overflow-auto`), Inhalt rechts auf `paper`, `max-w-app mx-auto`, `pt-6 pb-24`.
**Handy (unter 900 px):** Kopfzeile oben (sticky), Inhalt, **Tab-Leiste unten** (fixed). Inhalt hat die Utility `pb-tabbar` (Platz für die Tab-Leiste inkl. Safe-Area).
Seitenkopf jeder Ansicht: links `lbl` (Bereich/Netzwerk) + h1, darunter optional Einleitung (`text-ink-2`, max. 60ch); rechts Hauptaktion (Primär-Button, z. B. «Fläche inserieren»). Auf dem Handy rutscht die Hauptaktion unter den Titel (volle Breite) – zusätzlich ist sie über «Erstellen» erreichbar.
Sprunglink «Zum Inhalt springen» als erstes Element (nur bei Fokus sichtbar, schwarzer Button oben links).

### 7.2 Landingpage
Kopfzeile sticky weiss mit `border-b border-ink`, Logo Web 30 px, Navigation rechts (Links `text-ink-2`, aktiv `text-ink underline decoration-2 underline-offset-[6px]`, Button «Demo anfragen»). Unter 900 px: Button «Menü» (`aria-expanded`, `aria-controls`) öffnet Liste mit grossen Archivo-Links (22 px, je ≥ 48 px hoch).
Hero: zweispaltig 1,5 : 1 (Text | Adress-Card), darunter Zielgruppen-Raster mit schwarzen Linien. Sektionen wechseln `white` / `paper`, getrennt durch `border-t border-ink`. Raster `g3`/`g4` = Kästen mit schwarzen Linien (gemeinsame Linien, nicht doppelt: `border-l border-t` am Raster, `border-r border-b` an den Zellen). Footer vierspaltig → zweispaltig → einspaltig.

---

## 8. Komponenten

Für jede Komponente gilt: Zustände **Standard · Hover · Gedrückt · Fokus (Tastatur) · Deaktiviert · ggf. Gewählt/Laden/Fehler**. Fokus ist immer der 2-px-Rahmen in `ink` mit 2 px Abstand (`:focus-visible`), ausser wo anders angegeben. Hover nur bei `@media (hover: hover)` (Tailwind `hover:` macht das in v4 bereits so).

### 8.1 Button
| Variante | Standard | Hover | Gedrückt | Deaktiviert |
|---|---|---|---|---|
| **primary** | `bg-ink text-white border border-ink` | `bg-ink-hover` | `translate-y-px` | `opacity-40 cursor-not-allowed` |
| **secondary** («ghost» im Prototyp) | `bg-white text-ink border border-ink` | `bg-muted` | `translate-y-px` | wie oben |
| **link** | `text-ink underline underline-offset-[3px] font-medium`, kein Rahmen | `decoration-2` | – | wie oben |
| **icon** | 44 × 44, `rounded-md`, Icon 20 px, `aria-label` Pflicht | `bg-muted` | – | wie oben |
| **inverse** (nur auf schwarzem Element, z. B. Toast) | `text-white underline` | `decoration-2` | – | – |

Grössen: **md** `min-h-11 px-4 gap-2 text-ui font-semibold rounded-md` (44 px) · **sm** `min-h-9 px-3 text-sm hit` (36 px sichtbar) · **lg** (Landing) `min-h-12 px-5 text-base rounded-sm` (48 px). Auf dem Handy sind Formular-Hauptbuttons `w-full`.
Laden: Text bleibt sichtbar und wechselt («Wird gespeichert …»), links ein 16-px-Kreis-Spinner, `aria-busy="true"`, Button deaktiviert gegen Doppelklick.
Löschen/Gefährlich: **keine rote Farbe** – immer primary-Button in einem Bestätigungsdialog mit klarer Beschriftung («Fläche endgültig löschen»).
Pro Ansicht nur **ein** primary-Button im sichtbaren Bereich.

### 8.2 Formularfelder
**Aufbau:** Label oben (`text-sm font-semibold`, immer sichtbar, `for`/`id`), Feld, darunter Hilfetext (`text-sm text-ink-2`, `aria-describedby`) bzw. Fehlermeldung. Freiwillige Felder tragen «(optional)» im Label; Pflichtfelder werden nicht markiert, sind aber `required`.

| Zustand | Klassen / Verhalten |
|---|---|
| Standard | `w-full min-h-11 px-3 py-2.5 bg-white border border-field rounded-md text-base` (Landing `rounded-sm`) |
| Hover | `border-ink-2` |
| Fokus | `border-ink outline-2 outline-ink -outline-offset-1` (Rahmen wirkt 2 px) |
| Fehler | `border-2 border-ink` + Meldung darunter mit `alert`-Icon: «Bitte geben Sie die Fläche in m² ein.» (`text-sm font-medium text-ink`, `id` in `aria-describedby`), Feld `aria-invalid="true"`. Bei langen Formularen zusätzlich Fehlerliste oben (`role="alert"`, Links zu den Feldern), Fokus auf die Liste. |
| Deaktiviert | `bg-muted text-ink-2 border-line cursor-not-allowed` |
| Nur lesen | `bg-paper border-line` |
| Platzhalter | `placeholder:text-ink-3` (nur Beispiel, nie als Label-Ersatz) |

**Varianten**
- `textarea`: `min-h-[5.5rem]` (Token-Ausnahme erlaubt: Höhe), `resize-y`.
- `select`: nativ, eigener Pfeil (`chevron-down`), `appearance-none pr-10`.
- **Checkbox / Radio:** natives Element mit `appearance-none size-5 border border-field rounded-xs` (Radio `rounded-full`), gewählt `bg-ink border-ink` mit weissem Haken bzw. weissem Punkt. Ganze Zeile (Label) ist klickbar, `min-h-11 flex items-center gap-3`.
- **Schalter** (Einstellungen, z. B. «2FA für alle Admins verpflichtend», «Zwischennutzung möglich»): `button role="switch" aria-checked`, Spur 44 × 26 px `border border-ink rounded-full`, aus = weiss mit schwarzem Knopf links, ein = `bg-ink` mit weissem Knopf rechts; daneben der Text «Ein»/«Aus» sichtbar.
- **Datei-Upload:** Dropzone `border border-dashed border-field rounded-md bg-white p-6 text-center` mit `upload`-Icon, Text «Dateien hierher ziehen oder auswählen», darunter erlaubte Typen/Grösse (`text-sm text-ink-2`). Drag-over: `border-ink bg-muted`. Fortschritt je Datei: Balken `h-1 bg-fill` mit `bg-ink`, `role="progressbar"`.
- **Code-Eingabe (6 Stellen, Login):** ein Feld, `inputmode="numeric" autocomplete="one-time-code" maxlength="6"`, `font-mono text-2xl tracking-code text-center`, Höhe 56 px. Kein Aufteilen in 6 Felder (Einfügen und Autofill funktionieren so zuverlässig).
- **Passwort:** Feld + Icon-Button «Passwort anzeigen» (`aria-pressed`), Hinweis «mind. 10 Zeichen».
- **Betrag:** Feld + Einheit rechts im Feld (`EUR`/`CHF`, `m²`, `m`) in Mono `text-ink-2`; `inputmode="decimal"`. Leer lassen = «auf Anfrage» (Hilfetext).
- **Weitere Angaben** (optionale Master-Felder, UB01): `<details>` mit `<summary>` als Zeile «Weitere Angaben (optional)» + `chevron-down`, `min-h-11`, `border-t border-line`; geöffnet dreht der Pfeil.
- **Sichtbarkeit** (bei jedem Inhalt, Master 3.18): Radiogruppe als `fieldset` mit `legend` «Sichtbar für»: ◉ «Nur Netzwerk [Stadt]» (Standard) · ○ «Alle urbown-Mitglieder». Hilfetext: «Freigegebene Inhalte tragen die Kennzeichnung urbown-weit.»
- **Adresssuche** (Karte, Flächen, Events): Combobox (`role="combobox"`, Ergebnisliste `role="listbox"`, Pfeiltasten, Enter), daneben Icon-Button `crosshair` «Ort auf der Karte setzen».

### 8.3 Chips (Filter)
`inline-flex items-center gap-1.5 min-h-9 px-3 rounded-full border border-field bg-white text-sm hit` · Hover `bg-muted` · **Gewählt** `bg-ink text-white border-ink` + `aria-pressed="true"` · Fokus Standard-Rahmen · Deaktiviert `opacity-40`.
Mehrere Chips in einer Zeile mit `gap-2`, auf dem Handy horizontal scrollbar (`overflow-x-auto`, ohne Umbruch, letzter Chip ganz sichtbar erreichbar). Einsatz: Feed-Filter (Alles · Beiträge · Flächen · Immobilien · City News · Forum · Events), Nutzungsart, Karten-Themen, Composer-Typ.

### 8.4 Segment-Umschalter
`inline-flex border border-ink rounded-md overflow-hidden`; Optionen `min-h-11 px-4 text-sm font-medium bg-white`, getrennt durch `border-l border-ink`; **gewählt** `bg-ink text-white font-semibold`; Hover (nicht gewählt) `bg-muted`.
Semantik: `role="radiogroup"` + `role="radio" aria-checked`, Pfeiltasten wechseln. Auf dem Handy bei Bedarf `w-full` mit gleich breiten Optionen.
Einsatz: «Netzwerk [Stadt]» / «urbown-weit» (Dashboard), «Netzwerk [Stadt]» / «Alle Netzwerke» (Mitglieder), «Liste» / «Karte» (Flächen, Immobilien), «Monat» / «Liste» (Events), Einfach-/Mehrfachauswahl (Umfrage).

### 8.5 Tabs
Leiste `flex gap-1 border-b border-line overflow-x-auto`; Tab `min-h-11 px-3 text-ink-2 font-medium border-b-2 border-transparent -mb-px whitespace-nowrap`; Hover `text-ink`; **gewählt** `text-ink font-semibold border-ink` + `aria-selected="true"`. Semantik `role="tablist"`/`tab`/`tabpanel`, Pfeiltasten, nur der gewählte Tab ist im Tab-Fokus (`tabindex` roving). Bei Seitenwechsel statt Panel: Links mit `aria-current="page"`.
Einsatz: Gruppen (Beiträge · Themen · Dokumente · Mitglieder), Admin (Übersicht · Einladungen · Mitglieder · Moderation · Sammelimport · Einstellungen), Superadmin, Mein Portfolio.

### 8.6 Cards und Listen
- **Card:** `bg-white border border-line rounded-md`; Innenabstand `p-4`; Titelzeile `flex justify-between items-center` mit h2 und Link-Button rechts.
- **Liste in Card:** Einträge `px-4 py-3.5 flex gap-3 items-start`, getrennt `divide-y divide-line`.
- **Klickbarer Eintrag / Card:** ganzer Eintrag ist ein Link (Titel-Link mit `after:absolute after:inset-0`), Hover `bg-hover`, Fokus-Rahmen um den ganzen Eintrag; weitere Buttons darin liegen darüber (`relative z-10`).
- **Inserat-Card** (Fläche, Immobilie): Bild 16 : 9 oben (`rounded-sm border border-line`, ohne Bild `thumb-empty` mit Mono-Text «Kein Foto»), darunter Badges (Status, Nutzungsart/Objektart, ggf. «urbown-weit», «anstehender Leerstand»), Titel h3, Lage in Mono (`P7, 14`), Kennzahlen in einer Mono-Zeile mit `num`: «142 m² · Front 11,5 m · ab 01.02.2027», Preis «2 400 € / Monat» bzw. «auf Anfrage». Raster: 1 Spalte Handy, 2 ab 680 px, 3 ab 1200 px.
- **Kennwerte (kv):** `dl` zweispaltig `grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm`, `dt text-ink-2`, `dd font-medium`.
- **Stat-Kachel:** `lbl` + Zahl `font-display text-3xl font-extrabold num`; im Admin/Superadmin als Raster mit Linien.
- **Leerer Zustand:** zentriert `py-7 text-ink-2`, ein Satz + Hauptaktion («Noch keine Flächen. Fläche inserieren»).
- **Laden:** Platzhalterblöcke `bg-muted rounded-xs` in Grösse der späteren Inhalte, ohne Animation; bei Ladezeiten > 1 s zusätzlich unsichtbarer Text «Wird geladen» (`aria-live="polite"`).

### 8.7 Feed-Eintrag
Aufbau (`article`, `p-4 flex flex-col gap-2.5`, in einer Card-Liste):
1. **Kopf:** Avatar 36 px (Kreis, `border border-ink`, Initialen `font-display font-bold text-sm`, bzw. Foto), Name `font-semibold` + **Rollen-Badge**; darunter Metazeile `text-sm text-ink-2`: «Vakante Fläche · Netzwerk Heidelberg · vor 2 Std.» (Netzwerk nur bei urbown-weiten Beiträgen aus anderen Netzwerken). Rechts: Badge «urbown-weit» (falls freigegeben) und **Neu-Punkt** (8 px schwarzer Kreis + `sr-only` «Neu») sowie Menü `more` (Bearbeiten, Löschen, Melden; 44 px).
2. **Inhalt je Typ:** Post = Text (max. 8 Zeilen, dann «Mehr anzeigen»); Bild = Bild 16 : 9 bzw. Originalformat max. 480 px hoch, `alt` Pflicht beim Hochladen; Video = Vorschaubild mit Play-Symbol (YouTube/Vimeo erst nach Klick laden, Datenschutz); **Status** = `font-display text-2xl font-bold`; **Umfrage** = Abschnitt 8.7.1; Inhalte anderer Module = kompakte Vorschau (Titel als Link, 1–2 Kennzahlen in Mono, Badge).
3. **Aktionen:** Link-Buttons «Gefällt mir · 3» (`aria-pressed`), «Kommentieren · 2», jeweils `min-h-11`.
4. **Kommentare:** eingerückt mit `border-l-2 border-line pl-3`, Avatar 28 px, Name + Text + Zeit; Eingabefeld «Kommentar schreiben» + Button «Senden».

**Composer** (oben im Dashboard, Card): Typ-Chips «Post · Bild · Video · Status · Umfrage», Textfeld ohne Rahmen (`min-h-14`, Fokus-Rahmen um die ganze Card via `focus-within`), Sichtbarkeit (Abschnitt 8.2) eingeklappt als Zeile «Sichtbar für: Nur Netzwerk Mannheim ▾», Button «Veröffentlichen» rechts (Handy volle Breite).

#### 8.7.1 Umfrage
Frage `font-semibold`; Optionen als Buttons `w-full min-h-11 px-3 border border-ink rounded-md text-left flex justify-between`, vor der Stimmabgabe Hover `bg-muted`. Nach der Stimmabgabe/Ende: Ergebnisbalken hinter dem Text (`bg-muted`, eigene Wahl `bg-fill` + `font-semibold` + `check`-Icon), Prozent rechts in Mono `num`. Einfachauswahl `role="radio"`, Mehrfachauswahl `role="checkbox"`, `aria-checked`. Fusszeile `text-sm text-ink-2`: «12 Stimmen · Mehrfachauswahl · anonym · endet 25.11.2026» bzw. «Beendet». «Wer hat abgestimmt?» als Link-Button (nicht bei anonym).

### 8.8 Badges
Basis: `inline-flex items-center gap-1 font-mono text-micro uppercase tracking-badge px-1.5 py-px rounded-xs border whitespace-nowrap`.

| Variante | Klassen | Einsatz |
|---|---|---|
| **outline** | `border-ink text-ink` | Rollen Eigentümer · Gewerbe · Partner; Kategorie, Nutzungsart, Objektart, Karten-Thema |
| **solid** | `bg-ink text-white border-ink` | Rolle **Mitarbeiter Stadt**; Status «verfügbar», Netzwerk «aktiv», Einladung «angenommen» |
| **soft** | `border-line text-ink-2` | Status «reserviert», «vermietet», «verkauft», «gesperrt», «abgelehnt», «offen»; Inhaltstyp; «aus altem System übernommen» (nur Admins) |
| **urbown-weit** | soft + `globe`-Icon 12 px; `title` und `sr-only` «Für alle urbown-Mitglieder sichtbar» | jeder Inhalt mit `visibility = 'alle'`, Profil mit Freigabe |
| **wartet** | outline + `clock`-Icon, Text «wartet auf Freigabe» | Moderation (Inserat noch nicht live), nur für Autor:in und Admins sichtbar |
| **ausgeblendet** | soft + `eye-off`-Icon | Moderation |
| **Netzwerk-Rolle** | soft, Text «Admin» / «Moderator» | Mitgliederliste, Admin |

Der Text trägt die Bedeutung (nicht die Füllung allein). Zähler-Badge (ungelesene Nachrichten): Navigation Desktop = Mono-Zahl rechts im Eintrag; Tab-Leiste = schwarzer Kreis min. 18 px mit weisser Zahl oben rechts am Icon; zugänglicher Name «Nachrichten, 3 ungelesen».
Landing-«Tag» (`tag`, `tag solid`) ist dieselbe Komponente mit 11 px.

### 8.9 Avatar und Person
Avatar `size-9` (36 px) bzw. `size-7` (28 px), `rounded-full border border-ink bg-white`, Initialen (Archivo 700) oder Foto (`object-cover`). Person-Zeile: Avatar + Name (Link zum Profil) + Rollen-Badge + optional Unternehmen in `text-ink-2`. Superadmin erscheint als «urbown.com» mit Logo-Avatar (Quadrat-Icon).

### 8.10 Tabellen
Hülle `overflow-x-auto` mit `role="region" aria-label="…" tabindex="0"` (per Tastatur scrollbar). `table w-full border-collapse text-sm`; Kopf `th` `lbl text-left px-3 py-2.5 border-b border-ink whitespace-nowrap`; Zellen `px-3 py-2.5 border-b border-line align-top`; Zahlen rechtsbündig mit `num`; Zeilen-Hover `bg-hover`; klickbare Zeile = Link in der ersten Zelle.
Sortierbar: Kopf als Button mit Pfeil, `aria-sort`. Mehrfachauswahl (Superadmin, Moderation): Checkbox-Spalte links + Leiste «3 ausgewählt · Ausblenden · Exportieren», die über der Tabelle erscheint. Aktionen in der letzten Spalte als Link-Buttons, ab 3 Aktionen Menü `more`.
**Handy (unter 680 px):** Admin- und Superadmin-Tabellen werden als Kartenliste dargestellt (je Zeile ein Eintrag: Titel, darunter 2–4 Kennwerte als `kv`, Aktionen unten). Kurze Vergleichstabellen (Landing «Netzwerke», Inserat-Kennwerte) bleiben Tabellen mit horizontalem Scrollen.
Matrix (Benachrichtigungen je Inhaltstyp × Takt): Radio-Buttons in den Zellen, Spaltenköpfe zentriert, erste Spalte links; auf dem Handy je Inhaltstyp eine Zeile mit `select` (sofort / täglich / wöchentlich / nie).

### 8.11 Modal und Sheet
Umsetzung mit **natives `<dialog>` + `showModal()`** (Fokus bleibt im Dialog, `Esc` schliesst, Fokus kehrt zum Auslöser zurück), Hintergrund-Scrollen gesperrt, `::backdrop` `bg-scrim`.
- **Handy (unter 680 px):** Sheet von unten, `w-full max-h-[92dvh] rounded-t-lg border border-ink bg-white`, Einblenden 200 ms von unten.
- **Ab 680 px:** mittig, `max-w-modal rounded-lg`; breite Variante für lange Formulare `max-w-modal-wide`.
- **Kopf** sticky: h2 + Icon-Button `close` («Schliessen», 44 px), `border-b border-line px-4 py-3.5`.
- **Inhalt:** `p-4 flex flex-col gap-3.5`, unten Safe-Area-Abstand.
- **Fuss** sticky (bei Formularen): Aktionen rechts (`secondary` «Abbrechen», `primary` «Speichern»); auf dem Handy untereinander in voller Breite, primary oben.
- Klick auf den Hintergrund schliesst nur Dialoge ohne Eingaben; bei ungespeicherten Eingaben Rückfrage «Änderungen verwerfen?».
- **Bestätigungsdialog:** Titel als Frage («Fläche löschen?»), ein Satz Folgen («Das Inserat und alle Anfragen werden entfernt.»), Buttons «Abbrechen» / «Endgültig löschen». Fokus startet auf «Abbrechen».

### 8.12 Toast
`fixed left-1/2 -translate-x-1/2 bottom-[calc(var(--tabbar-h)+env(safe-area-inset-bottom)+0.75rem)] lg:bottom-6 z-(--z-toast) max-w-[calc(100%-2rem)] bg-ink text-white rounded-md px-4 py-2.5 font-medium flex gap-3 items-center`.
Erfolg/Info `role="status"` (höflich), Fehler `role="alert"` mit `alert`-Icon. Anzeige **5 s**, pausiert bei Hover und Fokus, schliessbar (Icon-Button weiss). Optional eine Aktion als `inverse`-Link («Rückgängig»). Immer nur ein Toast; ein neuer ersetzt den alten. Texte kurz und konkret: «Fläche gespeichert», «E-Mail mit Code gesendet».
Fehler in Formularen gehören **ans Feld**, nicht in einen Toast.

### 8.13 Navigation
**Desktop-Sidebar (ab 900 px)**
- Oben: Logo Web 26 px (Link zum Dashboard), darunter Netzwerk in Mono `text-sm text-ink-2`; bei mehreren Netzwerken ein `select` «Netzwerk» (`min-h-10`) für den Wechsel.
- Gruppen mit Titel `lbl text-ink-3` (`pt-3 pb-1 px-2.5`): **Netzwerk** (Dashboard, Vakante Flächen, Immobilien, Forum, City News, Events, Dokumente, Gruppen, Karte, Mitglieder) · **Persönlich** (Nachrichten mit Zähler, Mein Portfolio, Personen einladen) · **Verwaltung** (nur Admins: «Admin [Stadt]»; nur Superadmin: «urbown.com»).
- Eintrag: `flex items-center gap-2.5 min-h-10 px-2.5 rounded-md text-ink-2 font-medium`, Icon 18 px; Hover `bg-muted text-ink`; **aktiv** `bg-ink text-white` + `aria-current="page"`.
- Unten: Person (Avatar 28 px + Name → Mein Portfolio) und «Abmelden».
- Beim Superadmin-Besuch eines Netzwerks erscheint über dem Inhalt eine Leiste `bg-paper border-b border-ink font-mono text-sm`: «Als urbown.com in Mannheim» + Link «Verlassen» (kein schwarzer Balken).

**Netzwerk-Kopf im Dashboard** (Branding, Master 3.2): Card mit Netzwerk-Logo (max. 48 px hoch, auf Weiss, `object-contain`), Name der Organisation, Button `secondary` mit `external`-Icon und einstellbarem Text («Zur Website», max. 30 Zeichen), öffnet in neuem Tab mit Hinweis im zugänglichen Namen («Zur Website (öffnet neues Fenster)»).

**Handy – Kopfzeile (unter 900 px):** sticky, `bg-white border-b border-line band py-2.5 flex justify-between items-center`: Logo Web 24 px · Netzwerkname in Mono (bei mehreren Netzwerken als Button mit `chevron-down`, öffnet Sheet zur Auswahl) · Avatar 28 px mit 44-px-Trefferfläche (→ Mein Portfolio).

**Handy – Tab-Leiste:** `fixed inset-x-0 bottom-0 z-(--z-tabbar) bg-white border-t border-ink grid grid-cols-5` mit `pb-[env(safe-area-inset-bottom)]` und seitlicher Safe-Area. Fünf Ziele, je `min-h-14 flex flex-col items-center justify-center gap-0.5 text-xs text-ink-2`, Icon 22 px:
1. **Start** (Dashboard) · 2. **Flächen** · 3. **Erstellen** · 4. **Nachrichten** (Zähler) · 5. **Menü**
- Aktiv: `text-ink font-semibold` + 2-px-Strich oben (`before:` am Eintrag) + `aria-current="page"`.
- **Erstellen:** Icon `plus` weiss in schwarzem Kreis 36 px, Beschriftung «Erstellen» darunter; `aria-haspopup="dialog"`. Öffnet Sheet «Erstellen» mit Raster 3 × 3 (`grid-cols-3 gap-2`), Kacheln `min-h-[5.5rem] border border-line rounded-md flex flex-col items-center justify-center gap-1.5 text-sm`, Icon 24 px: Post · Bild · Umfrage · Vakante Fläche · Immobilie · Event · City News · Forenthema · Kartenpunkt. Hover/Fokus `border-ink`.
- **Menü:** Sheet mit allen übrigen Zielen als Liste (`min-h-12`, Icon + Text, gruppiert wie Sidebar), Netzwerk-Wechsel, «Abmelden».
- Tab-Leiste bleibt auch bei offener Tastatur unten fixiert – Formulare scrollen das aktive Feld über die Leiste (`scroll-margin-bottom` = Leistenhöhe).

### 8.14 Karte
- Leaflet + OpenStreetMap, Anbieter in UB19. **Kacheln in Graustufen**: bevorzugt ein heller Graustufen-Stil des Anbieters; sonst `.leaflet-tile-pane { filter: grayscale(1) contrast(1.05) brightness(1.03); }`. Hintergrund vor dem Laden `bg-muted`.
- Behälter: `relative bg-white border border-line rounded-md overflow-hidden`; Höhe Handy `h-[60dvh]` (in der Vollansicht «Karte» bis zur Tab-Leiste), Desktop 560 px.
- **Marker** (`L.divIcon`, sichtbar 18 px, Trefferfläche 44 px): Rahmen 2,5 px `ink` + 2 px weisser Rand aussen.

| Typ | Form |
|---|---|
| Vakante Fläche | Quadrat **schwarz** |
| Immobilie | Quadrat **weiss** |
| Event | Kreis **schwarz** |
| Kartenpunkt | Kreis **weiss** |
| Ort wird gesetzt | Kreis weiss, **gestrichelt** |

  Gewählt/geöffnet: 26 px. Jeder Marker hat einen zugänglichen Namen (`title`/`alt`: «Vakante Fläche: Laden P7, 14»).
- **Cluster** (ab ca. 30 Punkten, UB19): Kreis 36 px weiss, `border-2 border-ink`, Zahl Mono 500; ab 100 Punkten 44 px.
- **Popup:** weiss, `border border-ink rounded-md`, kein Schatten; Inhalt: Typ-Badge, Titel (Link), 1 Kennzeile Mono, Link «Öffnen →»; Schliessen-Knopf 44 px.
- **Bedienelemente:** Zoom + / − je 44 × 44 px, weiss, `border border-ink`, Hover `bg-muted`; Quellenangabe unten rechts `text-xs text-ink-2 bg-white/80` (Pflicht der Kartenlizenz, nicht ausblenden).
- **Über der Karte:** Segment «Liste / Karte» und Filter-Chips (Typ: Kartenpunkte, Vakante Flächen, Immobilien, Events; Thema). **Unter der Karte:** Legende mit den Markerformen.
- **Ort setzen:** Hinweisleiste über der Karte «Tippen Sie auf die Karte, um den Ort zu setzen.» (`bg-paper border-b border-line`), Cursor `crosshair`, Marker verschiebbar; Adresssuche (8.2) als gleichwertige Alternative.
- **Barrierefreiheit:** Jede Kartenansicht hat die gleiche Information auch als **Liste** (Segment «Liste»); Leaflet-Tastatursteuerung bleibt aktiv; Scroll-Zoom nur nach Klick in die Karte (sonst bleibt die Seite beim Scrollen hängen); auf dem Handy Verschieben mit zwei Fingern als Hinweis bei Ein-Finger-Wisch.

### 8.15 Kalender (Events)
- **Kopf:** Monatstitel h2 («November 2026»), Icon-Buttons `chevron-left/right` («Vorheriger Monat»/«Nächster Monat»), Button sm «Heute», Segment «Monat / Liste».
- **Monatsraster** (ab 680 px): `grid grid-cols-7 border-l border-t border-line`, Wochenbeginn **Montag**, Wochentage Mo–So `lbl bg-muted px-1.5 py-1`; Tageszelle `min-h-[4.75rem] p-1.5 border-r border-b border-line text-xs flex flex-col gap-1`; Tage anderer Monate `text-ink-3 bg-paper`; **heute**: Tageszahl in schwarzem Kreis 22 px, weisse Zahl, `aria-current="date"`. Event: Button `bg-ink text-white rounded-xs px-1 text-xs truncate text-left` («18:30 Stammtisch»), ab 3 Events «+2 weitere» als Link.
- **Handy (unter 680 px): Standardansicht «Liste».** Im Monatsraster kompakte Zellen 44 px hoch mit Tageszahl und 6-px-Punkt bei Events; Tipp auf einen Tag zeigt dessen Events darunter.
- **Liste:** nach Monat gruppiert (`lbl` als Zwischentitel); Eintrag = Datumsblock links (Tag `font-display text-3xl font-extrabold num`, Monat `lbl`), rechts Titel (Link), «Mi, 18.11. · 18:30 · Café Quadrat, N2, 3» (`text-sm text-ink-2`), Badge «Anmeldung möglich», Button «Teilnehmen» (`secondary`) → angemeldet «Angemeldet» (`primary` mit `check`), `aria-pressed`.
- **Event-Detail:** Datum/Zeit, Ort mit Mini-Karte, Beschreibung, Teilnehmerliste (Avatare), Buttons «Teilnehmen» und «In Kalender übernehmen (.ics)» (`calendar-plus`).
- Tastatur: Monatsraster als Tabelle (`table` mit `th scope="col"`), Events als Buttons in Tab-Reihenfolge.

### 8.16 Dokumentliste
- **Kopfleiste:** Ordnerpfad als `nav aria-label="Ordnerpfad"` mit Links (unterstrichen) und Trennern «/», aktueller Ordner fett mit `aria-current="page"`; rechts Suche (Feld mit `search`-Icon), Buttons «Neuer Ordner» (`secondary`) und «Hochladen» (`primary`). Auf dem Handy: Pfad horizontal scrollbar, Buttons unter dem Pfad, «Hochladen» volle Breite.
- **Zeile:** `flex items-center gap-3 px-4 py-3 min-h-16`, getrennt `divide-y divide-line`:
  - Typ-Symbol `w-[34px] h-10 border border-ink rounded-xs grid place-items-center font-mono text-nano font-medium uppercase` mit Endung (PDF, DOC, XLS, JPG …; dekorativ, die Endung steht auch im Dateinamen); **Ordner**: gleiche Grösse, `bg-muted`, `folder`-Icon.
  - Name `font-semibold` (max. 2 Zeilen, `break-words`), darunter `text-sm text-ink-2`: Ordner «12 Einträge»; Datei «1,2 MB · Marc Klein · hochgeladen am 14.03.2023».
  - Aktionen: ab 900 px Link-Buttons «Umbenennen · Verschieben · Löschen» (nur mit Recht); darunter `more`-Button 44 px, der ein Sheet mit denselben Aktionen + «Herunterladen» öffnet.
- **Reihenfolge:** Ordner zuerst, dann Dateien; Sortierung per `select` (Name, Datum, Grösse). Klick auf Ordner öffnet ihn, auf Datei die **Vorschau** (Modal breit: PDF/Bild in voller Breite, Kennwerte, «Herunterladen», «Neue Version hochladen»).
- **Hochladen:** Dropzone (8.2) erscheint beim Ziehen über die ganze Liste (`border-dashed border-ink bg-muted`); Fortschritt je Datei in der Liste.
- **Admins:** im Bearbeiten-Dialog Feld «Hochgeladen am» (Datum), Hilfetext «Nur für Dokumente aus dem alten System zurückdatieren.»
- **Leer:** «Dieser Ordner ist leer.» + «Hochladen». **Suche ohne Treffer:** «Keine Dokumente zu «…» gefunden.»

### 8.17 Login (Prototyp «Login»)
Zweiteilig ab 900 px: links weisse Fläche mit Logo (Original 40 px), Netzwerk-Adresse als Mono-Kasten (`app.urbown.com`), grosser Titel `text-5xl` mit Konturwort; rechts `paper` mit Formular `max-w-login` mittig. Handy: Titelbereich oben (`text-login-sm`), Formular darunter.
Schritte als je eine Ansicht mit einem Feld und einer Hauptaktion: E-Mail → Passwort (mit «Angemeldet bleiben», «Passwort vergessen?») bzw. Code (Hinweis «Wir haben Ihnen eine E-Mail an j•••@… geschickt.», Code-Feld 8.2, «E-Mail erneut senden» als Link mit Wartezeit «in 45 s») → neues Passwort → 2FA optional («Einrichten» / «Später») → Netzwerk-Auswahl (Liste der Netzwerke als grosse klickbare Zeilen). Zurück-Link «E-Mail ändern» in jedem Schritt. Statusmeldungen mit `role="status"`.

---

## 9. Barrierefreiheit – Prüfliste für jede Ansicht

1. Kontraste: Text ≥ 4,5 : 1 (nur Tokens `ink`, `ink-2`, `ink-3` auf `white`/`paper`/`muted`), Bedienelement-Rahmen ≥ 3 : 1 (`field`, `ink`).
2. Fokus sichtbar auf allem Bedienbaren, logische Reihenfolge, kein Fokus hinter Sticky-Leisten verdeckt (`scroll-padding-top` = Kopfzeile, `scroll-padding-bottom` = Tab-Leiste).
3. Trefferflächen ≥ 44 px, Abstand ≥ 8 px.
4. Alles per Tastatur bedienbar (inkl. Karte über die Liste, Kalender, Umfrage, Upload per Button).
5. Landmarken: `header`, `nav` (mit `aria-label`: «Hauptnavigation», «Navigation Handy», «Ordnerpfad»), `main id="main"`, `footer`; eine `h1` pro Seite, Überschriften ohne Sprünge.
6. Formulare: sichtbare Labels, `autocomplete` (email, current-password, new-password, one-time-code, given-name, family-name, organization), Fehler am Feld und als Text.
7. Zustände nie nur über Farbe/Füllung: zusätzlich Text, Icon, `aria-pressed`/`aria-selected`/`aria-current`/`aria-checked`.
8. Bilder: `alt` Pflicht beim Hochladen (Feld «Bildbeschreibung», vorbelegt mit dem Titel), dekorative Bilder `alt=""`.
9. Live-Meldungen: Toast `status`/`alert`, neue Feed-Einträge nicht automatisch einschieben (Hinweis «3 neue Beiträge – anzeigen»).
10. Zoom 200 % und Textabstände (WCAG 1.4.12) ohne Abschneiden; keine festen Höhen für Text.
11. `lang="de"`, Seitentitel «Vakante Flächen – urbown Mannheim».
12. `prefers-reduced-motion` respektiert; keine automatischen Karussells.
13. Test: axe (Playwright `@axe-core/playwright`) in der Testsuite für jede Route, Lighthouse Accessibility ≥ 95, Stichprobe mit VoiceOver (iOS) und NVDA.

---

## 10. Mockups = freigegebene Prototypen (Zuordnung)

| Ansicht | Prototyp (Quelle `claude/prototyp/…`) | Route Next.js | Wichtigste Bausteine | Umsetzung in |
|---|---|---|---|---|
| Landingpage Start | `landing.html` `#start` | `urbown.com/` | Header, Hero + Adress-Card, Raster g3/g4, Schritte, Referenz, Preise | UB03 |
| Für Eigentümer · Funktionen · Preise · Netzwerke & Login · Kontakt | `landing.html` `#eigentuemer` … `#kontakt` | `/eigentuemer`, `/funktionen`, `/preise`, `/netzwerke`, `/kontakt` | Raster, Tabelle, Formular, FAQ (`details`) | UB03 |
| Für Städte & Ämter | `landing.html` `#staedte` | `/staedte` | wie oben, Förder-Tags | UB04 |
| Login (alle Schritte) | `netzwerk-app.html` (abgemeldet) | `app.urbown.com/` | 8.17, Code-Feld | UB06 |
| Dashboard + Feed + Umfrage | `#start` | `/[netzwerk]` | Netzwerk-Kopf, Composer, Segment, Chips, Feed-Eintrag, Seitenleiste mit Cards | UB11, UB12 |
| Vakante Flächen Liste / Karte / Detail / Formular | `#flaechen` | `/[netzwerk]/flaechen` | Inserat-Card, Segment Liste/Karte, Karte, kv, Formular mit «Weitere Angaben», Sichtbarkeit | UB20 |
| Immobilien | `#immobilien` | `/[netzwerk]/immobilien` | wie Flächen + Lage «ungefähr/genau», Exposé | UB21 |
| Forum · City News · Events · Dokumente · Gruppen · Karte · Mitglieder · Nachrichten | jeweilige `#…` | `/[netzwerk]/…` | Listen, Tabs, Kalender, Dokumentliste, Karte | UB13–UB19 |
| Mein Portfolio (inkl. Benachrichtigungs-Matrix, Sichtbarkeit) | `#portfolio` | `/[netzwerk]/portfolio` | Tabs, Matrix, Schalter | UB22 |
| Personen einladen | `#einladen` | `/[netzwerk]/einladen` | Formular, Liste eigener Einladungen mit Status-Badges | UB07 |
| Admin [Stadt] | `#admin` (Ansicht als Stadt-Admin) | `/[netzwerk]/admin` | Tabs, Stat-Kacheln, Tabellen/Kartenliste, Schalter | UB10 |
| Superadmin urbown.com | `#superadmin` (Ansicht als Superadmin) | `/superadmin` | Tabs, Tabellen mit Mehrfachauswahl, Newsletter-Editor | UB08, UB09 |

Eine sichtbare Übersicht aller Bausteine mit ihren Zuständen liegt als **`claude/UB02-styleguide.html`** im Projektwissen (im Browser öffnen, Handy-Breite testen). Sie ist die visuelle Referenz zu diesem Dokument; bei Abweichungen gilt dieses Dokument.

---

## 11. Leistung (Design-bezogen)
- Nur die genannten Schriftschnitte laden (9 Dateien, `latin`), Archivo 900 nur auf der Landingpage verwenden (Next lädt pro Route nur Benötigtes, wenn die Schrift-Variable nur im Landing-Layout gesetzt ist – Archivo 900 als eigene Instanz `archivoBlack` im Landing-Layout).
- Logo und Icons inline als SVG, keine Icon-Bibliothek.
- Bilder über imgproxy in WebP, `width`/`height` gesetzt (kein Springen), `loading="lazy"` ausser im sichtbaren Bereich, `sizes` passend zum Raster.
- Leaflet nur auf Seiten mit Karte laden (`dynamic(() => import(...), { ssr: false })`), CSS von Leaflet nur dort.
- Keine Animationsbibliothek; CSS-Übergänge genügen.

---

## 12. Übergabe an Claude Code (erster Block in UB03)

1. `web/src/app/fonts.ts` und `globals.css` exakt nach Abschnitt 4 anlegen.
2. Logos aus `claude/UB02-logo/` nach `web/public/brand/` kopieren, `<Logo>`-Komponente bauen, Favicons/PWA-Icons nach 5.4 erzeugen.
3. Grundbausteine in `web/src/components/ui/`: `Button`, `IconButton`, `Field` (Label, Hilfe, Fehler), `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `CodeInput`, `Disclosure` («Weitere Angaben»), `VisibilityField`, `Chip`, `ChipGroup`, `Segment`, `Tabs`, `Card`, `List`/`ListItem`, `Kv`, `Stat`, `Badge`, `Avatar`, `Person`, `Table` (+ Kartenliste Handy), `Dialog` (Modal/Sheet), `ConfirmDialog`, `Toast` (Provider), `Icon`, `EmptyState`, `Skeleton`, `SkipLink`.
4. Eine interne Seite `/_styleguide` (nur lokal/Staging, `noindex`), die alle Bausteine in allen Zuständen zeigt – Vorlage ist `claude/UB02-styleguide.html`.
5. App-Bausteine (`components/app/`) entstehen in den Modul-Chats, nutzen aber nur diese Grundbausteine: `AppShell` (Sidebar, MobileTop, TabBar, CreateSheet, MenuSheet) in UB05/UB06, `FeedItem`/`Composer`/`Poll` in UB11/UB12, `MapView` in UB19, `Calendar` in UB16, `DocList` in UB17.
6. **Fertig, wenn:** Styleguide-Seite zeigt alle Bausteine; axe ohne Fehler; Tastatur-Durchgang ohne Fallen; auf 360 px Breite nichts abgeschnitten; Lighthouse Accessibility ≥ 95.

---

## 13. Offen
- **Vektordatei des Logos** (SVG/AI/EPS) vom Projektinhaber: wenn vorhanden, Pfade in den SVGs ersetzen (Master 9, Punkt 1). Bis dahin gelten die nachgezeichneten Dateien (deckungsgleich geprüft).
- Kartenanbieter und Graustufen-Stil → UB19.
- Statuswerte «reserviert» künftig als `outline` statt `soft`, falls Tests zeigen, dass «verfügbar/reserviert/vermietet» schwer zu unterscheiden sind → Prüfung in UB20.
