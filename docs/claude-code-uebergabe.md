# Claude Code – Übergabe

Laufend gepflegt von Claude Code. Stand, Befehle, Entscheide und offene Fragen an Marc.

## Stand

**Block 1 (UB03) abgeschlossen am 20.11.2026** – Bericht unten im Abschnitt «Bericht Block 1».

| Teil | Inhalt | Status |
|---|---|---|
| A | Repository-Grundgerüst | ✅ |
| B | Lokaler Docker-Stack | ✅ geprüft (Studio, Mailpit, Web-Container `prod`) |
| C | Next.js-Projekt und Grundlagen | ✅ |
| D | Design-System | ✅ |
| E | Landingpage | ✅ |
| F | Tests und Abnahme-Material | ✅ 31 Tests grün, Lighthouse ≥ Ziel |

## Bericht Block 1

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

## Offene Fragen an Marc

Siehe «Bericht Block 1», Punkt 4.

## Nächster Block

UB04 – Abnahme Block 1 + Seite «Für Städte & Ämter» + Infopaket (Master Abschnitt 6).
