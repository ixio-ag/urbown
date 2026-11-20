# Design-Ergänzungen (für das nächste UB02-Update)

Neue Tokens und Bausteine, die beim Bauen gefehlt haben. Claude Code ergänzt zuerst das Token in
`web/src/app/globals.css` (Block «Ergänzungen Block 1» am Dateiende) und trägt es hier ein.
Der nächste Projekt-Chat übernimmt die Liste in `UB02-design.md`.

## Tokens

| Token / Utility | Wert | Grund | Seit |
|---|---|---|---|
| `--text-step` | 30 px, Zeilenhöhe 1 | Konturziffern der Schritte auf dem Handy (UB03 1 #10) | Block 1 |
| `--text-step-lg` | 34 px, Zeilenhöhe 1 | Konturziffern der Schritte ab 680 px (UB03 6 «Steps») | Block 1 |
| `--text-stat-lg` | clamp(34 px, 4 vw, 52 px) | Zahlen im Referenz-Kasten (Prototyp `.ref b`) | Block 1 |
| `--text-addr` | clamp(18 px, 2 vw, 22 px) | Adresse im Adress-Kasten (Prototyp `.sub-card .addr`) | Block 1 |
| `--text-faq` | 19 px, Zeilenhöhe 1,3 | FAQ-Titel Archivo 700 (UB03 6 «Faq») | Block 1 |
| `--font-display-black` / `font-display-black` | Archivo 900 (Instanz `archivoBlack`), Rückfall Archivo | Archivo 900 nur im Landing-Layout (UB02 11); h1, Konturziffern, Referenzzahlen | Block 1 |
| `--animate-sheet-in` / `animate-sheet-in` | 200 ms, von unten einblenden | Modal/Sheet (UB02 3.7, 8.11) | Block 1 |
| Basis: `html { scroll-padding-top: 5.5rem }` | – | Fokus nicht hinter der Sticky-Kopfzeile (UB02 9.2) | Block 1 |
| Basis: `dialog::backdrop` = `scrim`, Scroll-Sperre bei offenem Dialog | – | UB02 8.11 | Block 1 |

## Bausteine

| Baustein | Ort | Inhalt / Regeln | Seit |
|---|---|---|---|
| `ButtonLink` | `components/ui/button.tsx` | Link mit Button-Aussehen (gleiche Varianten wie `Button`), Option `lift` für Landing-Hover −1 px | Block 1 |
| `CardHeader`, `StatGrid`, `LoadingNote` | `components/ui/card.tsx` | Titelzeile einer Card; Raster aus Stat-Kacheln mit gemeinsamen Linien; unsichtbarer Text «Wird geladen» | Block 1 |
| `BadgeUrbownWeit`, `BadgeWartet`, `BadgeAusgeblendet`, `BadgeRole` | `components/ui/badge.tsx` | Feste Badge-Varianten aus UB02 8.8 | Block 1 |
| `FieldError` | `components/ui/form.tsx` | Fehlermeldung mit `alert`-Icon, auch allein nutzbar | Block 1 |
| Landing-Bausteine | `components/site/` | nach UB03 Abschnitt 6 | Block 1 |

## Icons (neu gezeichnet, nicht im Styleguide vorhanden)

`download`, `edit`, `trash`, `filter`, `location`, `calendar-plus`, `lock`, `external`, `crosshair` – im Stil des
Prototyps (24er-Raster, Linie 1,7, runde Enden). Bitte im nächsten UB02-Update optisch abnehmen.
