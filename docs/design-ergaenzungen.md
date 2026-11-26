# Design-Ergänzungen (für das nächste UB02-Update)

Neue Tokens und Bausteine, die beim Bauen gefehlt haben. Claude Code ergänzt zuerst das Token in
`web/src/app/globals.css` (Blöcke «Ergänzungen Block 1/2» am Dateiende) und trägt es hier ein.
Der nächste Projekt-Chat übernimmt die Liste in `UB02-design.md`.

**Status:** Alle Einträge aus Block 1 sind **angenommen in UB04 Abschnitt 6.1** (26.11.2026). Einträge aus Block 2 (unten, «Block 2») warten auf die Abnahme in UB05.

## Tokens

| Token / Utility | Wert | Grund | Seit |
|---|---|---|---|
| `--text-step` | 30 px, Zeilenhöhe 1 | Konturziffern der Schritte auf dem Handy (UB03 1 #10) | Block 1 · angenommen in UB04 6.1 |
| `--text-step-lg` | 34 px, Zeilenhöhe 1 | Konturziffern der Schritte ab 680 px (UB03 6 «Steps») | Block 1 · angenommen in UB04 6.1 |
| `--text-stat-lg` | clamp(34 px, 4 vw, 52 px) | Zahlen im Referenz-Kasten (Prototyp `.ref b`) | Block 1 · angenommen in UB04 6.1 |
| `--text-addr` | clamp(18 px, 2 vw, 22 px) | Adresse im Adress-Kasten (Prototyp `.sub-card .addr`) | Block 1 · angenommen in UB04 6.1 |
| `--text-faq` | 19 px, Zeilenhöhe 1,3 | FAQ-Titel Archivo 700 (UB03 6 «Faq») | Block 1 · angenommen in UB04 6.1 |
| `--font-display-black` / `font-display-black` | Archivo 900 (Instanz `archivoBlack`), Rückfall Archivo | Archivo 900 nur im Landing-Layout (UB02 11); h1, Konturziffern, Referenzzahlen | Block 1 · angenommen in UB04 6.1 |
| `--animate-sheet-in` / `animate-sheet-in` | 200 ms, von unten einblenden | Modal/Sheet (UB02 3.7, 8.11) | Block 1 · angenommen in UB04 6.1 |
| Basis: `html { scroll-padding-top: 5.5rem }` | – | Fokus nicht hinter der Sticky-Kopfzeile (UB02 9.2) | Block 1 · angenommen in UB04 6.1 |
| Basis: `dialog::backdrop` = `scrim`, Scroll-Sperre bei offenem Dialog | – | UB02 8.11 | Block 1 · angenommen in UB04 6.1 |
| `--text-display-1-form` | clamp(2,5 rem, 5 vw, 4,5 rem), Zeilenhöhe 1,05 | h1 in Heros mit Formular (Kontakt), höchstens 4 Zeilen bei 1280 px (K2, UB04 6.2) | Block 2 |
| Basis: `h1, h2, h3 { hyphens: manual }` | – | keine automatische Silbentrennung in Titeln; weiche Trennstriche nur gezielt (K1) | Block 2 |

## Bausteine

| Baustein | Ort | Inhalt / Regeln | Seit |
|---|---|---|---|
| `ButtonLink` | `components/ui/button.tsx` | Link mit Button-Aussehen (gleiche Varianten wie `Button`), Option `lift` für Landing-Hover −1 px | Block 1 · angenommen in UB04 6.1 |
| `CardHeader`, `StatGrid`, `LoadingNote` | `components/ui/card.tsx` | Titelzeile einer Card; Raster aus Stat-Kacheln mit gemeinsamen Linien; unsichtbarer Text «Wird geladen» | Block 1 · angenommen in UB04 6.1 |
| `BadgeUrbownWeit`, `BadgeWartet`, `BadgeAusgeblendet`, `BadgeRole` | `components/ui/badge.tsx` | Feste Badge-Varianten aus UB02 8.8 | Block 1 · angenommen in UB04 6.1 |
| `FieldError` | `components/ui/form.tsx` | Fehlermeldung mit `alert`-Icon, auch allein nutzbar | Block 1 · angenommen in UB04 6.1 |
| Landing-Bausteine | `components/site/` | nach UB03 Abschnitt 6 | Block 1 · angenommen in UB04 6.1 |
| `Brand`, `Nowrap`, `typo()` | `components/ui/typo.tsx` | «urbown» mit `whitespace-nowrap` + `hyphens: none`; kurze Bindestrich-Wörter mit Zahl zusammenhalten; `typo()` wendet beides auf Inhaltstexte an (in Lead, H2, H3, h1, FeatureTile, Faq, Steps, PriceBlock, RefStats, GlanceList, Fusszeile) und hält «z. B.», «u. a.», «d. h.» mit geschütztem Leerzeichen zusammen (K1, K6, UB04 6.2) | Block 2 |
| `RuleGrid` Option `fillLast` | `components/site/grids.tsx` | allein stehende letzte Zelle spannt über die restlichen Spalten, nur ab 680 px (K7, UB04 6.2) | Block 2 |
| `DownloadCard` | `components/site/download-card.tsx` | nach UB04 6.2; Mono-Zeile direkt unter dem Titel (UB04 4.9); bei «PDF ansehen» ohne `download`-Attribut (siehe offene Frage) | Block 2 |
| `CtaBand` | `components/site/cta-band.tsx` | nach UB04 6.2 | Block 2 |
| `DownloadLink` | `components/ui/button.tsx` | Datei-Link im Button-Aussehen: normales `<a>` (kein next/link), `download`-Attribut, optional Icon | Block 2 |
| `SquareList` | `components/site/blocks.tsx` | Liste mit quadratischem Aufzählungszeichen 8 px in ink (UB04 4.4), auch für die Förderlisten verwendet | Block 2 |
| `TaskSplit` | `components/site/blocks.tsx` | Aufgabenteilung: Raster g2 mit Rahmen 1,5 px wie Preis-Block, ohne Hervorhebung; Spaltentitel als h3 im Label-Aussehen | Block 2 |
| `RefStats` Option `note` | `components/site/grids.tsx` | Zusatz `text-sm text-ink-2` unter den Zahlen (nur /staedte) | Block 2 |
| `PriceSection` mit `children` | `components/site/shared-sections.tsx` | Zusatz unter dem Preis-Block (Hinweis «Budget») | Block 2 |
| `NoJsNote` | `components/site/no-js-note.tsx` | Hinweis «Bitte JavaScript aktivieren» (UB04 4.13) im `<noscript>` und als Server-Antwort (K5) | Block 2 |
| `Icon` Grösse 48 | `components/ui/icons.tsx` | nur für die Icon-Tafel; Liste `ICONS_REDRAWN` | Block 2 |
| Styleguide-Abschnitt «Icon-Tafel» | `/_styleguide#icon-tafel` | alle Icons 24 + 48 px mit Namen, neu gezeichnete mit Badge «neu»; Vorlage für `icons.png` (K8) | Block 2 |

## Icons (neu gezeichnet, nicht im Styleguide vorhanden)

`download`, `edit`, `trash`, `filter`, `location`, `calendar-plus`, `lock`, `external`, `crosshair` – im Stil des
Prototyps (24er-Raster, Linie 1,7, runde Enden). Vorläufig freigegeben (UB04 6.1); Abnahme über die Icon-Tafel `tests/output/abnahme/icons.png` in UB05.
