# urbown 2.0

Geschlossene Netzwerke für Innenstädte – Eigentümer, Gewerbe und Stadt an einem Ort.
Betreiber: IXIO AG, Zug. Repository: `ixio-ag/urbown` (privat).

- `urbown.com` – Landingpage (statisch gerendert)
- `app.urbown.com` – Netzwerk-App (ab UB05, in Block 1 nur Platzhalter)
- `api.urbown.com` – Supabase (self-hosted)

Regeln für die Arbeit mit Claude Code: [`CLAUDE.md`](CLAUDE.md).
Stand, Befehle, Entscheide und offene Fragen: [`docs/claude-code-uebergabe.md`](docs/claude-code-uebergabe.md).
Grundlagen (Master, Architektur, Design, Texte, Prototypen): [`docs/grundlagen/`](docs/grundlagen/) – nicht verändern.

## Ordner

| Ordner | Inhalt |
|---|---|
| `web/` | Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS 4) – Landingpage und später die App |
| `docker/` | Lokaler Stack: Supabase self-hosted, Mailpit, Web-Container (`compose.yml`) |
| `supabase/migrations/` | Nummerierte SQL-Migrationen |
| `tests/` | Playwright + axe, Lighthouse, Bildschirmfotos |
| `scripts/` | Git-Hooks (Gitleaks) |
| `docs/` | Grundlagen, Übergabe, Design-Ergänzungen |

## Einmalig einrichten

Voraussetzungen: Docker Desktop, Node.js 24 LTS, Git.

```sh
# 1. Gitleaks-Pre-Commit-Hook setzen (läuft über Docker, falls gitleaks nicht installiert ist)
sh scripts/install-hooks.sh

# 2. Lokale Geheimwerte für den Docker-Stack erzeugen (schreibt docker/.env, gibt keine Werte aus)
sh docker/scripts/gen-local-env.sh

# 3. Abhängigkeiten
npm --prefix web install
npm --prefix tests install
npx --prefix tests playwright install chromium
```

`web/.env.example` zeigt alle Umgebungsvariablen der Web-App. Lokal funktioniert alles ohne eigene Datei
(Mail geht an Mailpit, Turnstile nutzt die öffentlichen Testschlüssel von Cloudflare).
Wer Werte ändern will, legt `web/.env.local` an (wird nicht eingecheckt).

## Lokal starten

```sh
# Stack starten (DB, Auth, REST, Storage, Studio, Functions, Mailpit)
docker compose -f docker/compose.yml up -d

# Next.js direkt auf dem PC
cd web && npm run dev          # http://localhost:3100
```

| Adresse | Inhalt |
|---|---|
| http://localhost:3100 | Landingpage (Entwicklung) |
| http://app.localhost:3100 | Platzhalter Netzwerk-App |
| http://localhost:3100/_styleguide | Styleguide (nur mit `ENABLE_STYLEGUIDE=true`, z. B. in `web/.env.local`) |
| http://localhost:3101 | Supabase Studio |
| http://localhost:8100 | Supabase API (Kong) |
| http://localhost:8125 | Mailpit (lokale E-Mails) |
| localhost:5433 | PostgreSQL 17 |
| http://localhost:3102 | Web-Container im Profil `prod` |

Alle Host-Ports lassen sich in `docker/.env` ändern (siehe `docker/.env.example`).

### Stack bedienen

```sh
docker compose -f docker/compose.yml up -d            # starten
docker compose -f docker/compose.yml down             # stoppen (Daten bleiben)
docker compose -f docker/compose.yml --profile prod up -d --build web   # Web-Container wie auf dem Server
sh docker/scripts/reset-local.sh                      # zurücksetzen: löscht lokale DB- und Storage-Daten
```

### Migrationen

Nummerierte SQL-Dateien in `supabase/migrations/` (`0001_extensions.sql`, `0002_…`).
Lokal einspielen:

```sh
sh docker/scripts/migrate-local.sh                    # alle Dateien der Reihe nach
```

Migrationen ausserhalb des lokalen Stacks nur nach Freigabe (HALT-Regel in `CLAUDE.md`).

## Befehle

```sh
# Web (im Ordner web/)
npm run dev | build | start | lint | typecheck

# Tests (im Stammordner; vorher: npm run build, Mailpit läuft im Stack)
npm run test:e2e        # Playwright + axe gegen next start (Ports 3100 und 3103)
npm run lighthouse      # Lighthouse mobil gegen next start, Tabelle in tests/output/lighthouse/
npm run screenshots     # Bildschirmfotos «Einblick» (-- --source=prototype|demo)
npm run abnahme         # Abnahme-Bildschirmfotos 360/768/1280 px nach tests/output/abnahme/

# Icons, Favicons, OG-Bild neu erzeugen
node web/scripts/make-icons.mjs
```

## Sicherheit

- Gitleaks läuft als Pre-Commit-Hook und in GitHub Actions. Nie mit `--no-verify` umgehen.
- Keine Geheimnisse im Repository. Lokale Werte stehen in `docker/.env` und `web/.env.local` (ignoriert).
- Kein Deployment ohne Freigabe (HALT-Regel).
