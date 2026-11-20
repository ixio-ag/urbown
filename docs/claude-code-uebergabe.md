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

## Offene Fragen an Marc

(werden am Ende des Blocks gesammelt)

## Nächster Block

UB04 – Abnahme Block 1 + Seite «Für Städte & Ämter» + Infopaket (Master Abschnitt 6).
