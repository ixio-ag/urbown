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
