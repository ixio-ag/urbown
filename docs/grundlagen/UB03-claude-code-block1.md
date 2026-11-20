# UB03 – Arbeitsauftrag Claude Code, Block 1: Grundgerüst, Design-System, Landingpage

Stand: 18.11.2026 · Projekt «urbown.com 2.0» · Repository `ixio-ag/urbown`
Teil 1 ist für Marc (Vorbereitung), Teil 2 ist die Nachricht an Claude Code, Teil 3 der eigentliche Auftrag (Claude Code liest ihn im Repository), Anhang A der Inhalt der `CLAUDE.md`.

---

## Teil 1 – Vorbereitung durch Marc (ca. 20 Min.)

1. **Repository klonen** (z. B. `C:\dev\urbown` bzw. `~/dev/urbown`). Git-Autor im Repository setzen:
   `git config user.name "Marc Klein"` und `git config user.email "info@ixio.ch"`.
2. **Grundlagen ablegen** im Ordner `docs/grundlagen/` (aus dem Projektwissen herunterladen):
   - `urbown-master.md`, `UB01-architektur.md`, `UB02-design.md`, `UB02-styleguide.html`
   - `UB03-landingpage-texte.md`, `UB03-claude-code-block1.md` (diese Datei)
   - Ordner `UB02-logo/` mit den 5 SVG-Dateien
   - Ordner `prototyp/` mit `landing.html` und `netzwerk-app.html`, daneben `logo.png` (= «urbown logo normal 500.png», wird vom Prototyp erwartet)
3. **Fotos:** `urbown-fotos-landing.zip` entpacken nach `docs/grundlagen/fotos/` (Claude Code kopiert sie an den richtigen Ort).
4. **Optional:** `CLAUDE.md` von drivers.one als `docs/vorlagen/drivers-one-CLAUDE.md` ablegen (Claude Code gleicht Aufbau und Regeln damit ab). Vorher kurz prüfen, dass darin keine Zugangsdaten, Server-IPs oder Schlüssel stehen.
5. **Programme auf dem PC:** Docker Desktop läuft, Node.js 24 LTS, Git. Claude Code im Repository-Ordner starten. Der PC kann derselbe wie bei drivers.one sein: Der urbown-Stack hat einen eigenen Docker-Projektnamen und eigene Ports (Teil B, Punkt 1a), beide Stacks können nebeneinander laufen.
6. **Lokale Geheimwerte** erzeugt nicht Claude Code, sondern ein Skript, das Claude Code in Schritt A anlegt (`docker/scripts/gen-local-env.sh`); Marc führt es einmal aus. Resend- und Turnstile-Schlüssel werden **lokal nicht gebraucht** (Mail geht in die Konsole bzw. an Mailpit, Turnstile nutzt die öffentlichen Testschlüssel).

---

## Teil 2 – Nachricht an Claude Code (kopieren)

```
Block 1 – urbown 2.0 (UB03): Grundgerüst, Design-System, Landingpage.
Lies zuerst docs/grundlagen/UB03-claude-code-block1.md (dein Auftrag), dann docs/grundlagen/urbown-master.md, UB01-architektur.md, UB02-design.md, UB03-landingpage-texte.md und sieh dir UB02-styleguide.html sowie prototyp/landing.html an.
Arbeite die Teile A bis F der Reihe nach ab, je Teil mindestens ein Commit (Autor Marc Klein <info@ixio.ch>, Präfix «UB03:»). Push auf main ist erlaubt. Kein Deployment, keine Änderungen an Servern, DNS oder Konten (HALT-Regel).
Lies nie Dateien mit Zugangsdaten (.env, .env.local, docker/.env, *.pem, *.key). Brauchst du einen Wert, frag mich.
Bei Produktfragen (Texte, Gestaltung, Abläufe) nicht raten: sammle sie und frag am Ende. Technische Kleinentscheide triffst du selbst und hältst sie in docs/claude-code-uebergabe.md fest.
Am Ende: Bericht nach Teil 3, Abschnitt «Abschluss».
```

---

## Teil 3 – Auftrag Block 1

### Ziel
Nach Block 1 gibt es:
- ein sauberes Repository nach drivers.one-Muster (Ordner, `CLAUDE.md`, Übergabe-Dokument, Gitleaks, Dependabot, CI),
- einen lokalen Docker-Stack (Supabase self-hosted als Grundlage für die App ab UB05, Mailpit, Web-Container),
- das Design-System aus UB02 (Tokens, Schriften, Logos, Icons, alle Grundbausteine, Seite `/_styleguide`),
- die vollständige Landingpage urbown.com mit allen Seiten aus `UB03-landingpage-texte.md`, statisch gerendert, mit echtem Kontaktformular,
- Tests (axe für jede Route), Lighthouse-Messung und Bildschirmfotos zur Abnahme.

### Quellen und Vorrang
1. `docs/grundlagen/UB03-landingpage-texte.md` – Texte, Aufbau, Fotos, Einblick-Bereich (wörtlich übernehmen)
2. `docs/grundlagen/UB02-design.md` – Tokens, Bausteine, Zustände, Barrierefreiheit (verbindlich)
3. `docs/grundlagen/UB01-architektur.md` – Stack, Adressen, Ordner
4. `docs/grundlagen/prototyp/landing.html` – Gestaltung und Proportionen im Zweifel
5. `docs/grundlagen/UB02-styleguide.html` – visuelle Referenz der Bausteine
Bei Widerspruch gilt die Reihenfolge oben; Unklares als Frage sammeln.

### Teil A – Repository-Grundgerüst
1. Ordner nach UB01 6.4:
   ```
   urbown/
   ├─ CLAUDE.md                      (Inhalt: Anhang A)
   ├─ README.md                      (Kurzbeschreibung, Start lokal, Verweis auf docs/)
   ├─ .gitignore  .gitattributes  .editorconfig  .nvmrc (24)
   ├─ .gitleaks.toml
   ├─ .github/
   │  ├─ dependabot.yml              (npm in /web, github-actions, docker in /docker; wöchentlich, Gruppen für Minor/Patch)
   │  └─ workflows/
   │     ├─ gitleaks.yml             (bei Push und Pull Request)
   │     └─ ci.yml                   (web: install, lint, typecheck, build, Playwright+axe gegen next start)
   ├─ docker/
   │  ├─ compose.yml
   │  ├─ .env.example                (nur Platzhalter, keine echten Werte)
   │  ├─ scripts/gen-local-env.sh    (erzeugt docker/.env mit Zufallswerten für lokal; führt Marc aus)
   │  └─ supabase/                   (Konfiguration Kong, DB-Init, Volumes laut offiziellem Self-Hosting)
   ├─ supabase/migrations/           (nummerierte SQL-Migrationen)
   ├─ web/                           (Next.js 16)
   ├─ tests/                         (Playwright, axe, Lighthouse-Skript)
   └─ docs/
      ├─ grundlagen/                 (von Marc, nicht verändern)
      ├─ claude-code-uebergabe.md    (Stand, Befehle, Entscheide, offene Fragen – laufend pflegen)
      └─ design-ergaenzungen.md      (neue Bausteine/Tokens für das nächste UB02-Update)
   ```
2. `.gitignore`: u. a. `.env`, `.env.*` (ausser `.env.example`), `docker/.env`, `docker/volumes/`, `node_modules/`, `.next/`, `tests/output/`, `*.pem`, `*.key`.
3. **Gitleaks:** Pre-Commit-Hook (über `pre-commit` oder ein Skript `scripts/install-hooks.sh`, das `.git/hooks/pre-commit` setzt; im README beschreiben) + GitHub-Action. `.gitleaks.toml` mit Standardregeln, `docs/grundlagen/` nicht ausnehmen. Test: einen offensichtlichen Fake-Schlüssel in einer Wegwerf-Datei committen wollen → Hook blockiert (Datei danach löschen, nicht committen).
4. `docs/claude-code-uebergabe.md` anlegen (Gliederung: Stand · Lokal starten · Befehle · Ordner · Entscheide · Offene Fragen an Marc · Nächster Block).
5. Falls `docs/vorlagen/drivers-one-CLAUDE.md` vorhanden: Aufbau und allgemeine Regeln abgleichen, urbown-spezifische Regeln aus Anhang A behalten. Abweichungen im Bericht nennen.

### Teil B – Lokaler Docker-Stack
1. `docker/compose.yml` nach dem **offiziellen Supabase-Self-Hosting** (Versionen fest gepinnt, aktueller stabiler Stand): `db` (PostgreSQL 17), `auth` (GoTrue), `rest`, `kong`, `storage`, `imgproxy`, `meta`, `studio`, `functions`. `realtime` und `analytics` vorerst aus (UB01 2.2). Dazu `mailpit` (lokale Mails, Weboberfläche) und `web` (Next.js-Standalone-Build, Profil `prod`, zum Testen wie auf dem Server).
1a. **Neben drivers.one lauffähig:** In `compose.yml` `name: urbown` setzen (eigene Container, Netzwerke und Volumes – sonst kollidiert der Projektname «docker» mit drivers.one). Alle Host-Ports über `docker/.env` einstellbar, Standardwerte versetzt zum Supabase-Standard: Kong/API **8100**, Postgres **5433**, Studio **3101**, Mailpit Web **8125** / SMTP **1125**, Web-Container `prod` **3102**. Next.js-Entwicklung auf Port **3100** (`npm run dev -- -p 3100`). Vor dem Start prüfen, ob die Ports frei sind; falls belegt, freie Ports wählen und im Bericht nennen.
2. Erweiterungen in der DB aktivieren: `pg_cron`, `pg_net`, `pg_trgm`, `unaccent` (Init-SQL). Noch **keine** Tabellen – das Datenmodell kommt ab UB05.
3. Ordner `supabase/migrations/` (nummerierte SQL-Dateien, leer bis auf `0001_extensions.sql`) und kurze Anleitung im README.
4. Für die Entwicklung läuft Next.js direkt auf dem PC (`npm run dev` in `web/`), der Stack liefert DB/Auth/Mailpit. Befehle im README: `docker compose -f docker/compose.yml up -d`, Stoppen, Zurücksetzen.
5. Prüfen: Studio erreichbar, Mailpit erreichbar, `web` im Profil `prod` liefert die Landingpage aus.

### Teil C – Next.js-Projekt und Grundlagen
1. `web/`: **Next.js 16** (App Router, TypeScript strikt, React 19), **Tailwind CSS 4**, ESLint, Paketmanager wie drivers.one (sonst npm). `output: "standalone"`. Pakete schlank halten: `clsx`, `tailwind-merge`, `class-variance-authority`, `zod`, `resend`; `sharp` (Icons, Bilder); Radix Primitives nur wo nötig (UB02 4.2). Keine UI-Bibliothek, keine Animations- oder Icon-Bibliothek.
2. **Auslieferung nach Hostname** (`web/src/proxy.ts`, in Next 16 der Nachfolger von `middleware.ts`):
   - Host `app.*` (lokal `app.localhost:3100`) → Umschreiben auf einen internen Bereich mit Platzhalterseite «Die Netzwerk-App folgt.» (`noindex`). Diesen Bereich unter der Landing-Domain nicht erreichbar machen (404).
   - Alle anderen Hosts → Landingpage.
   - Wenn `SITE_INDEXABLE !== "true"`: Kopfzeile `X-Robots-Tag: noindex, nofollow` auf allen Antworten.
3. **Sicherheits-Kopfzeilen** (`next.config`): Content-Security-Policy (eigene Quelle, `challenges.cloudflare.com` für Turnstile-Skript und -Frame, keine Fremdschriften), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (Kamera, Mikrofon, Standort aus), `X-Frame-Options: DENY`. HSTS setzt später Caddy.
4. Umgebungsvariablen in `web/.env.example` dokumentieren (ohne Werte für Geheimnisse): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_DEMO_URL`, `SITE_INDEXABLE`, `ENABLE_STYLEGUIDE`, `MAIL_TRANSPORT` (`console` | `smtp` | `resend`), `SMTP_URL` (lokal Mailpit), `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO_CONTACT` (`info@urbown.com`), `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`. Ohne gesetzte Turnstile-Schlüssel verwendet der Code ausserhalb von `production` die **öffentlichen Testschlüssel von Cloudflare**; in `production` ohne Schlüssel bricht der Start mit klarer Meldung ab.

### Teil D – Design-System (UB02 Abschnitt 12)
1. `web/src/app/fonts.ts` und `web/src/app/globals.css` **exakt** nach UB02 Abschnitt 4. Archivo 900 nur im Landing-Layout laden (UB02 Abschnitt 11); `--font-display` muss überall greifen.
2. **Logos:** SVGs aus `docs/grundlagen/UB02-logo/` nach `web/public/brand/`. Komponente `<Logo variant="web" | "original" height={…} />` gibt das SVG inline aus (`role="img"`, `<title>urbown</title>`). Regeln UB02 5.3.
3. **Favicons/PWA-Icons** nach UB02 5.4 per Skript `web/scripts/make-icons.mjs` (sharp) erzeugen und einchecken: `favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `og-image.png` (1200 × 630: Original-Logo auf Weiss, darunter in Archivo 800 «Das geschlossene Netzwerk für Ihre Innenstadt», Mono-Zeile «urbown.com»). `manifest.ts` nach UB02 5.4. Service Worker kommt erst mit der App (UB22).
4. **Icons** `web/src/components/ui/icons.tsx`: alle Pfade 1:1 aus dem Prototyp (`netzwerk-app.html`, Objekt `P`; `landing.html`, Objekt `I` inkl. `feed` und `phone`) plus die Ergänzungen aus UB02 6 im gleichen Stil (24er-Raster, Linie 1,7, runde Enden).
5. **Grundbausteine** in `web/src/components/ui/` mit allen Zuständen nach UB02 Abschnitt 8: `Button`, `IconButton`, `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `CodeInput`, `Disclosure`, `VisibilityField`, `Chip`, `ChipGroup`, `Segment`, `Tabs`, `Card`, `List`/`ListItem`, `Kv`, `Stat`, `Badge`, `Avatar`, `Person`, `Table` (+ Kartenliste unter 680 px), `Dialog` (Modal/Sheet mit `<dialog>`), `ConfirmDialog`, `Toast` (Provider), `Icon`, `EmptyState`, `Skeleton`, `SkipLink`. Hilfsfunktion `cn()`.
6. **Seite `/_styleguide`** (Ordner `app/%5Fstyleguide/`, weil Ordner mit `_` in Next privat sind): zeigt alle Bausteine in allen Zuständen, Vorlage `UB02-styleguide.html`. Nur erreichbar, wenn `ENABLE_STYLEGUIDE=true` (lokal, Staging), sonst 404; immer `noindex`.
7. Neue Tokens oder Bausteine, die beim Bauen fehlen: zuerst Token ergänzen, dann in `docs/design-ergaenzungen.md` festhalten (für das nächste UB02-Update).

### Teil E – Landingpage
1. Route-Gruppe `app/(site)/` mit eigenem Layout (`body.site`, Kopfzeile, Footer, Sprunglink). Seiten nach `UB03-landingpage-texte.md` Abschnitt 3: `/`, `/eigentuemer`, `/staedte`, `/funktionen`, `/preise`, `/netzwerke`, `/kontakt`, `/impressum`, `/datenschutz`, `/agb`, `not-found`. Alle statisch (SSG); interaktiv nur Menü, Adress-Kasten und Kontaktformular (kleine Client-Komponenten).
2. Texte **wörtlich** aus Abschnitt 3; Inhalte, die mehrfach vorkommen (FEATURES, Preis-Block, Schritte, Netzwerkliste), als Daten in `web/src/content/`.
3. Landing-Bausteine nach Abschnitt 6 in `web/src/components/site/`. Gestaltung nach Prototyp mit den Anpassungen aus Abschnitt 1 (z. B. Breakpoint 900 px, Konturziffern 30 px auf dem Handy, Preis-Hervorhebung als `outline`).
4. **Fotos:** aus `docs/grundlagen/fotos/landing/` nach `web/src/assets/landing/`, Einbau nach Abschnitt 4 (Bildband 4 : 3 / 21 : 9, Fokuspunkte, Alt-Texte). Reserve-Fotos nicht einbauen.
5. **Einblick-Bereich** nach Abschnitt 5:
   - Skript `npm run screenshots` (Playwright, in `web/scripts/` oder `tests/`), Parameter `--source=prototype|demo`. Variante `prototype` öffnet `docs/grundlagen/prototyp/netzwerk-app.html` über einen lokalen statischen Server, schaltet den Demo-Modus ein (`CITY.demo = true`), meldet sich als Mitglied an (Prototyp-Ablauf), setzt die Kartenkacheln per CSS auf Graustufen und speichert die fünf Bilder nach `web/src/assets/screens/`. Variante `demo` (für UB24) nimmt Adresse und Zugang aus Umgebungsvariablen.
   - Bilder jetzt mit `--source=prototype` erzeugen und einchecken.
6. **Kontaktformular** nach Abschnitt 3.7: Server Action, Prüfung mit `zod` (Browser und Server), Honigtopf, Turnstile serverseitig prüfen, Rate-Limit 5/Stunde je gehashter IP (im Speicher), Mail über `MAIL_TRANSPORT` (lokal Mailpit), Vorauswahl über `?anliegen=`, funktioniert auch ohne JavaScript. Keine Speicherung der Anfrage.
7. **SEO:** Metadaten je Seite (Abschnitt 2.4), `robots.ts`, `sitemap.ts` (nur die 7 Hauptseiten), JSON-LD `Organization` auf der Startseite, Canonical, Open Graph.
8. **Leistung:** Ziel Lighthouse (mobil) Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90 auf allen 7 Hauptseiten (mit `SITE_INDEXABLE=true` messen). Kein JavaScript ausser den drei Inseln und Turnstile (nur auf `/kontakt`).

### Teil F – Tests und Abnahme-Material
1. **Playwright** in `tests/`: für jede Route Aufruf, eine `h1`, Titel, keine Konsolenfehler, **axe ohne Verstösse** (`@axe-core/playwright`, Regeln WCAG 2.2 AA). Dazu: Menü per Tastatur (öffnen, `Esc`), Adress-Kasten («Zürich» → `zurich`, «Bad Homburg» → `bad-homburg`), Kontaktformular (Pflichtfelder, ungültige E-Mail, Erfolg mit Mailpit-Prüfung), Styleguide 404 ohne `ENABLE_STYLEGUIDE`, `app.localhost` zeigt Platzhalter, `noindex`-Kopfzeile ohne `SITE_INDEXABLE`.
2. **Bildschirmfotos zur Abnahme:** jede Hauptseite ganzseitig in 360, 768 und 1280 px Breite nach `tests/output/abnahme/` (nicht einchecken) – Marc lädt sie im nächsten Chat hoch.
3. **Lighthouse:** Skript `npm run lighthouse` gegen `next start` (mobil), Ergebnis-Tabelle je Seite in den Bericht.
4. Manuelle Prüfungen laut UB02 9 und 12.6: Tastatur-Durchgang ohne Fallen, 360 px nichts abgeschnitten, Zoom 200 %.

### Abschluss (Bericht an Marc)
Kurz und auf Deutsch, auch in `docs/claude-code-uebergabe.md`:
1. Was gebaut ist (je Teil A–F ein Satz) und letzter Commit.
2. Lighthouse-Tabelle (4 Werte × 7 Seiten) und axe-Ergebnis.
3. Abweichungen von UB02/UB03 mit Grund; neue Tokens/Bausteine (`design-ergaenzungen.md`).
4. Offene Fragen an Marc.
5. Was Marc lokal prüfen soll (Befehle, Adressen: `localhost:3100`, `app.localhost:3100`, `/_styleguide`, Mailpit `localhost:8125`).
6. Hinweis, wo die Abnahme-Bildschirmfotos liegen.

**Nicht in Block 1:** Deployment, Server, Caddy, Cloudflare, Resend-Domain, App-Funktionen, Login, Datenmodell (ab UB05), Service Worker.

---

## Anhang A – Inhalt `CLAUDE.md`

```markdown
# urbown 2.0 – Regeln für Claude Code

## Projekt
urbown: geschlossene Netzwerke für Innenstädte (Eigentümer, Gewerbe, Stadt). Betreiber IXIO AG, Zug.
- urbown.com = Landingpage (statisch), app.urbown.com = Netzwerk-App (ab UB05), api.urbown.com = Supabase.
- Stack wie drivers.one: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4, Supabase self-hosted (PostgreSQL 17), Resend, Cloudflare, Exoscale Zürich. Hosting nur in der Schweiz.
- Sprache der Oberfläche: nur Deutsch, Sie-Form, Schweizer Schreibweise («ss», kein «ß»), Anführungszeichen «».

## Quellen der Wahrheit (docs/grundlagen/, nicht verändern)
urbown-master.md (Gesamtplan) · UB01-architektur.md (Architektur, Datenmodell) · UB02-design.md (Design-System, verbindlich) · UBxx-Dateien des jeweiligen Pakets (Texte, Abläufe) · prototyp/ (freigegebene Vorlage).
Vorrang bei Widerspruch: Auftrag des aktuellen Blocks > UBxx-Datei des Pakets > UB02 > UB01 > Prototyp. Unklares nicht raten, sondern als Frage sammeln.

## Arbeitsweise
- Ein Auftrag = ein Block. Teile der Reihe nach, je Teil mindestens ein Commit.
- Commits auf main, Autor «Marc Klein <info@ixio.ch>», Nachricht deutsch, kurz, mit Paket-Präfix («UB03: Kontaktformular mit Turnstile»).
- Push auf main ist erlaubt. Kein Force-Push, kein Umschreiben der Historie, keine neuen Branches ohne Grund.
- Technische Kleinentscheide selbst treffen und in docs/claude-code-uebergabe.md unter «Entscheide» festhalten.
- Produktentscheide (Texte, Gestaltung, Abläufe, Rechte) nie selbst treffen: Frage an Marc.
- Am Ende jedes Blocks: Bericht an Marc + docs/claude-code-uebergabe.md aktualisieren.

## HALT-Regel
Ohne ausdrückliche Freigabe von Marc im Chat («Freigabe: …») niemals:
- deployen oder etwas auf Servern ausführen (auch nicht über Tailscale/SSH),
- DNS, Cloudflare, Exoscale, Resend, GitHub-Einstellungen, Secrets oder Konten ändern,
- Datenbank-Migrationen ausserhalb des lokalen Docker-Stacks ausführen,
- Daten löschen ausserhalb des lokalen Stacks.
Vor jedem solchen Schritt: anhalten, Plan und Befehle zeigen, auf Freigabe warten.

## Geheimnisse
- Nie lesen, ausgeben oder öffnen: .env, .env.local, .env.*, docker/.env, *.pem, *.key, secrets/, ~/.ssh, Passwort-Manager-Exporte. Erlaubt sind nur *.env.example mit Platzhaltern.
- Keine Schlüssel, Passwörter, Tokens oder Server-IPs in Code, Commits, Logs, Tests oder Berichten.
- Braucht ein Schritt einen Geheimwert: Marc bitten, ihn selbst zu setzen (Proton Pass, Tresor «urbown Infrastruktur»).
- Gitleaks läuft als Pre-Commit-Hook und in GitHub Actions. Nie mit --no-verify umgehen. Meldet Gitleaks etwas: anhalten und Marc informieren.

## Design und Code
- Nur Tokens aus web/src/app/globals.css (UB02 Abschnitt 4). Keine Hex-Werte, keine bg-[#…], keine text-[…], keine Schatten, keine Verläufe. Sonderwerte in [] nur für Layout-Masse.
- Nur Schwarz/Weiss/Grautöne, keine dunklen Hintergründe, kein Dark Mode.
- Oberfläche nur aus web/src/components/ui (Grundbausteine), components/site (Landing), components/app (App). Fehlt etwas: Token/Baustein ergänzen und in docs/design-ergaenzungen.md eintragen.
- Logo nur als SVG (<Logo>), Icons nur aus icons.tsx.
- Barrierefreiheit WCAG 2.2 AA (UB02 Abschnitt 9): sichtbare Labels, Fokus, 44-px-Trefferflächen, Zustände nie nur über Farbe, eine h1 pro Seite. axe-Test für jede neue Route.
- Mobile first (360 px zuerst). Keine Slider, Karussells, Pagebuilder, Animationsbibliotheken.
- Leistung: Server-Komponenten als Standard, Client-Komponenten nur wo nötig. Lighthouse mobil ≥ 90 (Accessibility ≥ 95).
- Datenschutz: keine Analytics, keine Tracker, keine Fremdschriften (next/font), externe Aufrufe zur Laufzeit nur Turnstile (und ab UB19 Kartenanbieter).
- Datenbank (ab UB05): nummerierte SQL-Migrationen in supabase/migrations, RLS auf jeder Tabelle, kein ORM, interne Tabellen im Schema private.

## Ordner
docker/ (lokaler Stack) · web/ (Next.js) · tests/ (Playwright, axe, Lighthouse) · supabase/migrations/ · docs/ (grundlagen/, claude-code-uebergabe.md, design-ergaenzungen.md)

## Befehle
- Stack: docker compose -f docker/compose.yml up -d (Stoppen: down)
- Web: cd web && npm run dev | build | start | lint | typecheck
- Tests: npm run test:e2e (Playwright + axe) · npm run lighthouse · npm run screenshots
- Icons: node web/scripts/make-icons.mjs
```
