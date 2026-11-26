# Claude Code – Übergabe

Laufend gepflegt von Claude Code. Stand, Befehle, Entscheide und offene Fragen an Marc.

## Stand

**Block 2 (UB04) abgeschlossen am 26.11.2026** – Bericht unten im Abschnitt «Bericht Block 2». Block 1 (UB03) abgeschlossen am 20.11.2026, abgenommen mit Korrekturen am 26.11.2026.

| Teil | Inhalt | Status |
|---|---|---|
| A | Korrekturen K1–K11 aus der Abnahme von Block 1 | ✅ (K11 entfällt, keine Vorlage) |
| B | Seite «Für Städte & Ämter» nach UB04 Abschnitt 4 | ✅ |
| C | Downloads mit Metadaten und Kopfzeilen | ✅ |
| D | Design-Ergänzungen nachgeführt | ✅ |
| E | Tests, Lighthouse, Abnahme-Bildschirmfotos | ✅ 41 Tests grün, Lighthouse ≥ Ziel |

## Bericht Block 2

### 1. Was gebaut ist
Letzter Code-Commit: **`02c10cd`** (danach nur noch dieser Bericht; dessen Hash steht in der Nachricht an Marc).
- **A:** Silbentrennung in Titeln aus (`hyphens: manual`), `<Brand>`/`<Nowrap>`/`typo()` für alle Inhaltstexte, Kontakt-h1 mit `--text-display-1-form` (4 Zeilen bei 1280 px), Hinweis «Bitte JavaScript aktivieren» im `<noscript>` und als Server-Antwort, `RuleGrid fillLast` auf `/funktionen`, Icon-Tafel, 5 Einblick-Bilder neu (ohne Prototyp-Hinweis, ohne «ß», mit Dezimalkomma).
- **B:** `/staedte` neu nach 4.1–4.11 in der vorgegebenen Reihenfolge, Texte wörtlich; Inhalte als Daten in `funding.ts` (mit `stand`), `downloads.ts`, `faq-staedte.ts`, `reference.ts`; neue Bausteine `DownloadCard`, `CtaBand`, `TaskSplit`, `SquareList`, `DownloadLink`. Keine zusätzlichen Client-Komponenten.
- **C:** 5 Dateien in `web/public/downloads/`, `scripts/download-meta.mjs` (pdf-lib) als `prebuild` → `downloads.meta.json` («PDF · 8 Seiten · 206 KB»), Kopfzeilen nach C3. **CSP:** Downloads kommen aus eigener Quelle (`default-src 'self'`), keine Änderung nötig – bestätigt. Kein Sitemap-Eintrag.
- **D:** `docs/design-ergaenzungen.md`: Block 1 als «angenommen in UB04 6.1» markiert, Einträge aus Block 2 ergänzt.
- **E:** neuer Test `staedte.spec.ts` (axe, eine h1, Reihenfolge der h2, 11 FAQ per Tastatur, Hero-Button, Unterlagen, 5 Downloads mit 200/Content-Type/Kopfzeilen), Tests für K1 (hyphens, «urbown» in Titeln), K5 und K10; Überlauf-Test jetzt 320/360/640/768/1280 px; Tastatur-Durchgang auch auf `/staedte`; Lighthouse mit FCP/LCP/TBT/CLS; Abnahme-Bildschirmfotos 7 × 3 + `icons.png`.

### 2. Lighthouse (mobil, `next start`, `SITE_INDEXABLE=true`) und axe

| Seite | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| / | 99 | 100 | 100 | 100 | 1,1 s | 1,1 s | 95 ms | 0,00 |
| /eigentuemer | 98 | 100 | 100 | 100 | 0,9 s | 0,9 s | 175 ms | 0,00 |
| /staedte | 99 | 100 | 100 | 100 | 1,1 s | 1,1 s | 94 ms | 0,00 |
| /funktionen | 99 | 100 | 100 | 100 | 1,1 s | 1,1 s | 129 ms | 0,00 |
| /preise | 94 | 100 | 100 | 100 | 0,9 s | 0,9 s | 288 ms | 0,00 |
| /netzwerke | 97 | 100 | 100 | 100 | 0,9 s | 0,9 s | 208 ms | 0,00 |
| /kontakt | 99 | 100 | 96 | 100 | 0,9 s | 0,9 s | 108 ms | 0,00 |

Lokal gemessen (Lighthouse-Drosselung «mobil»); Performance schwankt je Lauf um einige Punkte. FCP und LCP liegen überall unter 1,5 s (Master-Vorgabe). Best Practices 96 auf `/kontakt` wie in Block 1: Meldung aus dem Turnstile-Iframe von Cloudflare.
**axe:** 0 Verstösse (WCAG 2.2 AA) auf allen 11 Routen, `/_styleguide` und dem App-Platzhalter. **Tests:** 41 Playwright-Tests grün (Block 1: 31).

### 3. Korrekturliste K1–K11

| # | Status | Umsetzung |
|---|---|---|
| K1 | ✅ erledigt | `hyphens-auto` entfernt, Basis `h1–h3 { hyphens: manual }`; `<Brand>` über `typo()` in allen Landing-Texten (Lead, Titel, Kacheln, FAQ, Listen, Fusszeile, Impressum); weicher Trennstrich nur in «weiter&shy;machen.» (`/preise`). Test: h1/h2 auf allen Routen nicht `auto`, «urbown» in Titeln `nowrap`; Überlauf 320/360/640/768/1280 px grün. |
| K2 | ✅ erledigt | `--text-display-1-form`; Kontakt-h1 bei 1280 px: 4 Zeilen. |
| K3 | ✅ erledigt | Prototyp-Hinweis unter der Karte im Skript ausgeblendet. |
| K4 | ✅ erledigt | Textknoten vor jeder Aufnahme korrigiert («ß» → «ss», «11.5 m» → «11,5 m», «4.2 m» → «4,2 m»; Daten TT.MM.JJJJ unberührt). Das Skript bricht ab, falls danach noch «ß» oder ein Dezimalpunkt mit Einheit im Seitentext steht. Alle 5 Bilder neu erzeugt: **im Text kein «ß» und kein Dezimalpunkt mehr.** Ausnahme: Strassennamen *in den OpenStreetMap-Kacheln* von `karte.png` (z. B. «Kunststraße») sind Teil des Kartenbilds und per DOM nicht änderbar (Frage 3). |
| K5 | ✅ erledigt | `<noscript>`-Hinweis (Text 4.13, Baustein `Note`) über dem Formular; ohne JS (kein Token und kein Feld `js`, das nur das hydrierte Formular sendet) antwortet der Server mit demselben Hinweis. Mit JS und fehlgeschlagener Prüfung bleibt die Turnstile-Meldung. Turnstile bleibt `interaction-only`. |
| K6 | ✅ erledigt | `<Nowrap>` für «6-stelligen», «2-Faktor» u. ä. über `typo()`. |
| K7 | ✅ erledigt | `RuleGrid fillLast`; auf `/funktionen` spannt Kachel 13 über drei Spalten, Linien geschlossen. |
| K8 | ✅ erledigt | Styleguide-Abschnitt «Icon-Tafel» (24 + 48 px, Namen, Badge «neu» für die 9 neu gezeichneten); `npm run abnahme` speichert `tests/output/abnahme/icons.png`. |
| K9 | ✅ erledigt | Letzter Commit und FCP/LCP/TBT/CLS im Bericht. |
| K10 | ✅ erledigt | `aria-current="page"` war bereits seit Block 1 gesetzt (auch für `?anliegen=` und `/kontakt/[anliegen]`, im ausgelieferten HTML geprüft); jetzt durch einen Test abgesichert. |
| K11 | – entfällt | `docs/vorlagen/drivers-one-CLAUDE.md` liegt nicht vor. |

### 4. Abweichungen von UB04/UB02 und neue Bausteine
- **«PDF ansehen» ohne `download`-Attribut** (UB04 6.2 verlangt es für alle Links): Mit dem Attribut würde der Browser die Datei speichern statt sie anzuzeigen – das widerspricht der Beschriftung und `Content-Disposition: inline`. Die Links «… herunterladen» und der Hero-Button tragen `download`. → Frage 1.
- **Datenschutz & Sicherheit ohne Split:** Titel oben, Raster g3 über die volle Breite (wie «Nutzen»). Drei Spalten in der rechten Split-Spalte wären bei 1280 px nur rund 225 px breit. → Frage 2.
- **Mono-Zeile der Download-Kachel direkt unter dem Titel** (UB04 4.9) statt unter dem Text (Reihenfolge in 6.2). Bei Kacheln mit zwei Dateien zeigt sie die erste Datei (Word); Typ und Grösse jeder Datei stehen im zugänglichen Namen des jeweiligen Buttons.
- **Förderlisten** mit demselben quadratischen Aufzählungszeichen wie die Aufgabenteilung (`SquareList`).
- **Aufgabenteilung:** Spaltentitel als h3 im Label-Aussehen (Navigation mit Screenreader; Aussehen wie Label).
- **«z. B.», «u. a.», «d. h.»** werden mit geschütztem Leerzeichen zusammengehalten (Text unverändert).
- Neue Tokens und Bausteine: siehe [`design-ergaenzungen.md`](design-ergaenzungen.md), Einträge «Block 2».

### 5. Offene Fragen an Marc
1. **«PDF ansehen»:** im Browser öffnen (so umgesetzt) oder wie in UB04 6.2 ebenfalls herunterladen?
2. **Datenschutz & Sicherheit:** volle Breite mit drei Spalten (so umgesetzt) statt Split mit Titelspalte – in Ordnung?
3. **Karte im Einblick:** Die Strassennamen in den OSM-Kacheln zeigen «ß» (deutsche Kartendaten). Bis zu den Demo-Bildern (UB24) so lassen, oder Ausschnitt/Zoom ändern?
4. **Referenz Mannheim (UB04 7, Punkt 2):** Der Lead «… zu Leerständen, Immobilien, Baustellen und gemeinsamen Aktionen …» ist wörtlich eingebaut – bitte bestätigen, sonst streiche ich ihn.

### 6. Lokal prüfen
```sh
cd C:\dev\urbown
npm run build                                   # erzeugt auch downloads.meta.json
npm run dev                                     # http://localhost:3100
```
- http://localhost:3100/staedte – neue Seite; Hero-Button «Infopaket herunterladen» und die 5 Links unter «Unterlagen» öffnen
- http://localhost:3100/kontakt mit ausgeschaltetem JavaScript: Hinweis über dem Formular, nach «Anfrage senden» derselbe Hinweis
- http://localhost:3100/_styleguide#icon-tafel (mit `ENABLE_STYLEGUIDE=true`) und `tests/output/abnahme/icons.png`
- `tests/output/abnahme/` – 21 Seitenbilder + `icons.png` (nicht eingecheckt); `tests/output/lighthouse/ergebnis.md`
- `web/src/assets/screens/` – 5 neue Einblick-Bilder (eingecheckt)

## Bericht Block 1

*(Abgenommen mit Korrekturen in UB04 am 26.11.2026; Antworten auf die Fragen in `UB04-kommunen.md` 1.5.)*

### 1. Was gebaut ist
- **A:** Repository nach UB01 6.4 mit `CLAUDE.md` (Anhang A), README, Gitleaks als Pre-Commit-Hook (über Docker, Test mit Fake-Schlüssel: blockiert) und GitHub Action, Dependabot (npm web/tests, Actions, Docker; wöchentlich, Minor/Patch gruppiert), CI (install, lint, typecheck, build, Playwright + axe mit Mailpit-Dienst).
- **B:** `docker/compose.yml` (Projekt `urbown`) nach offiziellem Supabase-Self-Hosting, Versionen gepinnt: PostgreSQL 17.6, GoTrue, PostgREST, Kong 3.9, Storage, imgproxy, meta, Studio, Functions, Mailpit, Web-Container (Profil `prod`). Ports 8100/5433/3101/8125/1125/3102, alle frei, nur 127.0.0.1. Erweiterungen `pg_cron`, `pg_net`, `pg_trgm`, `unaccent` über `supabase/migrations/0001_extensions.sql`. Skripte: `gen-local-env.sh`, `migrate-local.sh`, `reset-local.sh`.
- **C:** Next.js 16.4.6, React 19, Tailwind 4, TypeScript strikt, `output: standalone`; `proxy.ts` (App-Host → Platzhalter, `/app-intern` sonst 404, `/_styleguide` nur mit `ENABLE_STYLEGUIDE`, `X-Robots-Tag` ohne `SITE_INDEXABLE`), Sicherheits-Kopfzeilen, `.env.example`, Turnstile-Testschlüssel ausserhalb production, Startabbruch in production ohne Schlüssel.
- **D:** `fonts.ts`/`globals.css` nach UB02 4 (Ergänzungen getrennt am Ende), `<Logo>` inline, 48 Icons, Favicons/PWA-Icons/OG-Bild per `make-icons.mjs`, `manifest.ts`, alle 31 Grundbausteine in `components/ui`, Seite `/_styleguide`.
- **E:** Alle Seiten aus UB03 3 statisch (Start, Eigentümer, Städte & Ämter, Funktionen, Preise, Netzwerke & Login, Kontakt, Impressum, Datenschutz, AGB, 404), Texte wörtlich, 5 Fotos in Graustufen, Bereich «Einblick» mit Bildschirmfotos aus dem Prototyp, Kontaktformular (Server Action, zod, Honigtopf, Turnstile, Rate-Limit 5/h, Mailpit/Resend, Vorauswahl `?anliegen=`, auch ohne JavaScript), Metadaten, Canonical, Open Graph, `robots.ts`, `sitemap.ts`, JSON-LD. JavaScript nur Menü, Adress-Kasten, Kontaktformular (+ Turnstile auf `/kontakt`).
- **F:** Playwright in `tests/` (31 Tests: alle Routen mit axe WCAG 2.2 AA, Menü per Tastatur, Adress-Kasten, Kontaktformular inkl. Mailpit und ohne JS, Styleguide 404/200, `app.localhost`, noindex, Kopfzeilen, Sitemap, Überlaufen 320/360/640 px, Tastatur-Durchgang), Lighthouse-Skript, Abnahme-Bildschirmfotos.

### 2. Lighthouse (mobil, `next start`, `SITE_INDEXABLE=true`) und axe

| Seite | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| / | 94 | 100 | 100 | 100 |
| /eigentuemer | 99 | 100 | 100 | 100 |
| /staedte | 99 | 100 | 100 | 100 |
| /funktionen | 99 | 100 | 100 | 100 |
| /preise | 98 | 100 | 100 | 100 |
| /netzwerke | 98 | 100 | 100 | 100 |
| /kontakt | 98 | 100 | 96 | 100 |

Lokal gemessen, Performance schwankt je Lauf um einige Punkte. Best Practices 96 auf `/kontakt`: Meldung im Chrome-«Issues»-Panel aus dem Turnstile-Iframe von Cloudflare (nicht in unserem Code).
**axe:** 0 Verstösse (WCAG 2.2 AA) auf allen 11 Routen, `/_styleguide` und dem App-Platzhalter.

### 3. Abweichungen von UB02/UB03
- Archivo 900 als eigene Instanz nur im Landing-Layout (Entscheid 6); `archivo` lädt 500/700/800.
- Neue Tokens/Utilities und Bausteine: siehe [`design-ergaenzungen.md`](design-ergaenzungen.md) (Schriftgrössen Schritte/Referenz/Adresse/FAQ, `font-display-black`, `animate-sheet-in`, `ButtonLink`, `StatGrid` u. a.; 9 Icons neu gezeichnet).
- Überschriften-Abstand: `tracking-tight` (−0,025 em) statt −0,02 em auf der Landingpage (keine Sonderwerte).
- `/funktionen` und `/preise`: unsichtbare h2 («Alle Funktionen», «Pilot und Angebot»), damit die Überschriften nicht von h1 auf h3 springen. Hero-Kasten «Nur auf Einladung» als h2 im h3-Aussehen.
- Silbentrennung (`hyphens-auto`) bei h1/h2: bei 320 px passte «weitermachen.» sonst nicht.
- Fusszeilen-Links mit 44-px-Trefferfläche, dadurch etwas höher als im Prototyp.
- Vorauswahl `?anliegen=` ohne JavaScript: `proxy.ts` schreibt intern auf `/kontakt/[anliegen]` um (5 statisch vorgerenderte Varianten, Canonical `/kontakt`).
- Bildschirmfotos «Einblick»: Prototyp-Leiste ausgeblendet, Viewport-Meta ergänzt (fehlt im Prototyp), Kacheln und Kartenquelle in Graustufen.

### 4. Offene Fragen an Marc
1. **Turnstile ohne JavaScript:** Das Formular prüft und zeigt Fehler auch ohne JS, der Versand braucht aber das Turnstile-Token (nur mit JS möglich). Ohne JS erscheint «Die Sicherheitsprüfung hat nicht geklappt …». So lassen?
2. **Turnstile sichtbar oder unsichtbar:** umgesetzt als «interaction-only» (erscheint nur, wenn Cloudflare eine Prüfung verlangt). Passt das?
3. **Neu gezeichnete Icons** (`download`, `edit`, `trash`, `filter`, `location`, `calendar-plus`, `lock`, `external`, `crosshair`): bitte im Styleguide ansehen und freigeben.
4. **Beispieldaten im Prototyp** enthalten «ß» («Gastronomiefläche mit Außenbereich») und «11.5 m» statt «11,5 m»; sie erscheinen in den Einblick-Bildschirmfotos. Bis UB24 so lassen oder Prototyp-Daten im Skript ersetzen?
5. **OG-Bild** (`web/public/og-image.png`): Gestaltung so in Ordnung?
6. **Absender `MAIL_FROM`:** vorläufig «urbown <no-reply@urbown.com>» (endgültig UB07).
7. **drivers.one-`CLAUDE.md`:** lag nicht unter `docs/vorlagen/` – Abgleich nicht gemacht. Bei Bedarf ablegen.

### 5. Lokal prüfen
```sh
cd C:\dev\urbown
docker compose -f docker/compose.yml up -d     # Stack (docker/.env ist erzeugt)
cd web && npm run dev                          # http://localhost:3100
```
- http://localhost:3100 – Landingpage · http://app.localhost:3100 – Platzhalter App
- http://localhost:3100/_styleguide – Styleguide (lokal mit `ENABLE_STYLEGUIDE=true` in `web/.env.local`, `next dev` ohne diese Variable zeigt 404)
- http://localhost:8125 – Mailpit (Kontaktformular mit `MAIL_TRANSPORT=smtp` und `SMTP_URL=smtp://localhost:1125`)
- http://localhost:3101 – Supabase Studio · http://localhost:3102 – Web-Container `prod` (`docker compose -f docker/compose.yml --profile prod up -d --build web`)
- Tests: `npm run build` und danach `npm run test:e2e`, `npm run lighthouse`, `npm run abnahme`

Hinweis: Auf dem PC läuft Node 26 (`.nvmrc` und CI: 24 LTS); Build und Tests laufen mit beiden.

### 6. Abnahme-Bildschirmfotos
`tests/output/abnahme/` (nicht eingecheckt): 7 Seiten × 360/768/1280 px = 21 Dateien, z. B. `start-360.png`. Für UB04 genügen 360 und 1280 px. Lighthouse-Tabelle und JSON: `tests/output/lighthouse/`.

## Lokal starten

Siehe [`README.md`](../README.md), Abschnitte «Einmalig einrichten» und «Lokal starten».

## Befehle

Siehe [`README.md`](../README.md), Abschnitt «Befehle».

## Ordner

Siehe [`README.md`](../README.md), Abschnitt «Ordner».

## Entscheide

Technische Kleinentscheide von Claude Code (Produktentscheide trifft Marc).

| # | Datum | Entscheid | Grund |
|---|---|---|---|
| 1 | 20.11.2026 | Gitleaks läuft im Hook über Docker (`ghcr.io/gitleaks/gitleaks:v8.30.1`), wenn keine lokale `gitleaks`-Binärdatei da ist. | Keine Installation auf dem PC nötig, Docker läuft ohnehin. |
| 2 | 20.11.2026 | GitHub Action ruft Gitleaks als Container auf statt `gitleaks/gitleaks-action`. | Die Action verlangt für Organisations-Repositories einen Lizenzschlüssel (wäre ein neues Secret, HALT-Regel). |
| 3 | 20.11.2026 | Docker: Kong aus dem offiziellen Override (`docker-compose.kong.yml`) statt des neuen Standard-Gateways Envoy; Supavisor, Realtime, Analytics/Vector aus. Postgres direkt auf Host-Port 5433. Alle Ports nur auf 127.0.0.1. Daten in benannten Volumes (`urbown_db-data` …) statt Bind-Mounts. | Auftrag nennt Kong; Supavisor braucht lokal niemand; benannte Volumes vermeiden Rechteprobleme unter Windows. |
| 4 | 20.11.2026 | GoTrue lokal: `DISABLE_SIGNUP=true`, OTP 6 Stellen / 900 s, Sitzung max. 720 h, Mails an Mailpit. | Vorgaben UB01 2.4 und Master 2 schon im Stack. |
| 5 | 20.11.2026 | Ein Root-Layout (`app/layout.tsx`, `body.site`) statt mehrerer Root-Layouts. App-Platzhalter und `/_styleguide` setzen `bg-paper` selbst. | Mehrere Root-Layouts bräuchten für die 404-Seite das experimentelle `global-not-found`. Ab UB05 neu beurteilen. |
| 6 | 20.11.2026 | Archivo 900 als eigene Instanz `archivoBlack` nur im Landing-Layout, Utility `font-display-black`; `archivo` lädt 500/700/800. | UB02 4.1 lädt 900 global, UB02 11 und Auftrag D1 nur im Landing-Layout – der Auftrag hat Vorrang. |
| 7 | 20.11.2026 | `cacheComponents` und `partialPrefetching` (Standard von create-next-app 16.4) bleiben an. | Next-16-Standard, alle Seiten bleiben statisch. |
| 8 | 20.11.2026 | CSP mit `script-src 'unsafe-inline'`. | Statisch vorgerenderte Seiten können keine Nonces tragen. |
| 9 | 20.11.2026 | `TURNSTILE_ALLOW_TEST_KEYS=true` erlaubt die öffentlichen Testschlüssel auch mit `next start` (production) – nur lokal, CI und Web-Container `prod`. Auf Servern nie setzen. | Startabbruch ohne Schlüssel in production (Auftrag C4), lokale Prüfung trotzdem möglich. |
| 10 | 20.11.2026 | SMTP-Versand (Mailpit) über `nodemailer`. | Resend-SDK kann kein SMTP; Mailpit lokal verlangt SMTP. |
| 11 | 20.11.2026 | `typecheck` = `next typegen && tsc --noEmit`. | Routentypen (`LayoutProps` usw.) existieren sonst vor dem ersten Build nicht. |
| 12 | 20.11.2026 | OG-Bild: Schriften aus `@fontsource` (devDependency), WOFF wird im Skript temporär in TTF umgewandelt. | sharp/Pango liest kein WOFF; keine Fremdschriften zur Laufzeit. |
| 13 | 20.11.2026 | Tests als eigenes npm-Paket in `tests/`, Stamm-`package.json` leitet `test:e2e`, `lighthouse`, `screenshots` weiter. | `web/` bleibt schlank (Docker-Build). |
| 14 | 26.11.2026 | `typo()` wird in den Bausteinen angewendet (Lead, H2, H3, Hero-h1, FeatureTile, Faq, Steps, PriceBlock, RefStats, GlanceList, SquareList, Fusszeile) statt jede Zeichenkette in den Inhaltsdaten umzuschreiben. | Inhaltsdaten bleiben reiner Text (wörtlich aus UB03/UB04); neue Texte werden automatisch richtig gesetzt. |
| 15 | 26.11.2026 | K5: Das hydrierte Formular sendet ein verstecktes Feld `js=1`. Fehlen Token und `js`, antwortet der Server mit dem Hinweis «Bitte JavaScript aktivieren» (vor dem Rate-Limit). | Unterscheidet «ohne JavaScript» sicher von «Turnstile fehlgeschlagen». |
| 16 | 26.11.2026 | Test «ohne JS» prüft das `<noscript>`-Markup (vor dem Formular) statt der Sichtbarkeit. | Playwright schaltet nur die Skriptausführung ab; Chromium rendert `<noscript>` dann nicht. |
| 17 | 26.11.2026 | Testserver Port 3100 mit `ENABLE_STYLEGUIDE=false`. | Eine lokale `web/.env.local` mit `ENABLE_STYLEGUIDE=true` liess den 404-Test scheitern. |
| 18 | 26.11.2026 | Download-Metadaten: `prebuild`-Skript **und** eingecheckte `downloads.meta.json`. KB = 1024 Byte, aufgerundet wie im Datei-Explorer («206 KB», «17 KB»); Dezimalkomma über `de-DE` (`de-CH` liefert einen Punkt), auch in der Lighthouse-Tabelle. | Build ist immer aktuell; `dev` und `typecheck` funktionieren ohne Build. |
| 19 | 26.11.2026 | `pdf-lib` 1.17.1 als devDependency (Seitenzahl). | Kleine, reine JS-Bibliothek; im Docker-Build vorhanden (`npm ci` mit devDependencies). |
| 20 | 26.11.2026 | Download-Links als `DownloadLink` (normales `<a>`), nicht `next/link`. | Kein Prefetch und kein Client-Routing auf Dateien. |
| 21 | 26.11.2026 | Kopfzeilen `/downloads/*` in `next.config` (Content-Disposition, Cache-Control, noindex der Vorlagen); noindex des Infopakets setzt `proxy.ts` zur Laufzeit, solange `SITE_INDEXABLE` nicht `true` ist. | `headers()` wird beim Build ausgewertet, `SITE_INDEXABLE` gilt zur Laufzeit. Geprüft: mit `SITE_INDEXABLE=true` hat das Infopaket kein noindex, die Vorlagen schon. |
| 22 | 26.11.2026 | Icon-Tafel als Abschnitt im Styleguide, Bild über das Playwright-Projekt `abnahme` (Port 3103). | Eine Quelle für Styleguide und Abnahme-Bild, kein eigenes Render-Skript. |
| 23 | 26.11.2026 | Grundlagen von Marc (Master 8.4, UB04-Dateien, Downloads inkl. `infopaket-quelle/`) unverändert eingecheckt (Commit `d02cddd`). | Die Quelle des Infopakets soll im Repository liegen (Master, UB04 C5). |

## Offene Fragen an Marc

Siehe «Bericht Block 2», Punkt 5.

## Nächster Block

UB05 – Abnahme Block 2 + Netzwerke in einer App (Master Abschnitt 6).
