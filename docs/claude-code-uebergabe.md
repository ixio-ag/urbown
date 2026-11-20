# Claude Code – Übergabe

Laufend gepflegt von Claude Code. Stand, Befehle, Entscheide und offene Fragen an Marc.

## Stand

**Block 1 (UB03) in Arbeit** – Grundgerüst, Docker-Stack, Design-System, Landingpage, Tests.

| Teil | Inhalt | Status |
|---|---|---|
| A | Repository-Grundgerüst | in Arbeit |
| B | Lokaler Docker-Stack | offen |
| C | Next.js-Projekt und Grundlagen | offen |
| D | Design-System | offen |
| E | Landingpage | offen |
| F | Tests und Abnahme-Material | offen |

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

(werden am Ende des Blocks gesammelt)

## Nächster Block

UB04 – Abnahme Block 1 + Seite «Für Städte & Ämter» + Infopaket (Master Abschnitt 6).
