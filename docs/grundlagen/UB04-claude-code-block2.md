# UB04 – Arbeitsauftrag Claude Code, Block 2: Korrekturen, Seite «Für Städte & Ämter», Downloads

Stand: 26.11.2026 · Projekt «urbown.com 2.0» · Repository `ixio-ag/urbown`
Teil 1 ist für Marc (Vorbereitung), Teil 2 die Nachricht an Claude Code, Teil 3 der Auftrag (Claude Code liest ihn im Repository).

---

## Teil 1 – Vorbereitung durch Marc (ca. 10 Min.)

1. **Grundlagen aktualisieren** in `docs/grundlagen/` (aus dem Projektwissen herunterladen, alte Fassungen ersetzen):
   - `urbown-master.md` (Version 8.4), `UB04-kommunen.md`, `UB04-claude-code-block2.md` (diese Datei)
2. **Downloads ablegen** im neuen Ordner `docs/grundlagen/downloads/` (Dateien aus diesem Chat):
   - `urbown-infopaket-staedte.pdf`
   - `urbown-muster-beschlussvorlage.docx` und `.pdf`
   - `urbown-av-vertrag-entwurf.docx` und `.pdf`
   - Ordner `infopaket-quelle/` (HTML, `fonts/`, `make-infopaket.mjs`)
3. **Optional:** `CLAUDE.md` von drivers.one als `docs/vorlagen/drivers-one-CLAUDE.md` (vorher prüfen: keine Zugangsdaten, IPs, Schlüssel).
4. Claude Code im Repository starten (`cd C:\dev\urbown`, `claude`) und die Nachricht aus Teil 2 einfügen.

---

## Teil 2 – Nachricht an Claude Code (kopieren)

```
Block 2 – urbown 2.0 (UB04): Korrekturen aus der Abnahme von Block 1, Seite «Für Städte & Ämter», Downloads.
Lies zuerst docs/grundlagen/UB04-claude-code-block2.md (dein Auftrag), dann docs/grundlagen/UB04-kommunen.md (Abnahme, Korrekturliste K1–K11, Texte der Seite /staedte), Abschnitt 6 (Design-Ergänzungen) und den aktualisierten urbown-master.md.
Arbeite die Teile A bis E der Reihe nach ab, je Teil mindestens ein Commit (Autor Marc Klein <info@ixio.ch>, Präfix «UB04:»). Push auf main ist erlaubt. Kein Deployment, keine Änderungen an Servern, DNS oder Konten (HALT-Regel).
Lies nie Dateien mit Zugangsdaten. Texte aus UB04-kommunen.md Abschnitt 4 wörtlich übernehmen. Produktfragen sammeln und am Ende stellen, technische Kleinentscheide in docs/claude-code-uebergabe.md festhalten.
Am Ende: Bericht nach Teil 3, Abschnitt «Abschluss».
```

---

## Teil 3 – Auftrag Block 2

### Ziel
- Alle Korrekturen K1–K11 aus der Abnahme von Block 1 sind umgesetzt.
- `/staedte` ist nach `UB04-kommunen.md` Abschnitt 4 überarbeitet (Referenz, Aufgabenteilung, Förderung neu, Datenschutz & Sicherheit, Unterlagen, FAQ, Abschluss).
- Infopaket, Muster-Beschlussvorlage und AV-Vertrag sind unter `urbown.com/downloads/…` abrufbar.
- Tests, Lighthouse und Abnahme-Bildschirmfotos sind aktualisiert.

### Quellen und Vorrang
1. dieser Auftrag · 2. `UB04-kommunen.md` · 3. `UB04-kommunen.md` Abschnitt 6 und `UB02-design.md` · 4. `UB03-landingpage-texte.md` (für alles, was UB04 nicht ändert) · 5. Prototyp.

### Teil A – Korrekturen aus der Abnahme (UB04-kommunen.md 1.4)
1. **K1 Silbentrennung:** `hyphens-auto` bei h1/h2 entfernen, Standard `hyphens: manual`. Weiche Trennstriche nur gezielt in den Inhaltsdaten (z. B. «weiter&shy;machen.»). Komponente `<Brand>` für «urbown» in Fliesstext und Titeln (`whitespace-nowrap`, `hyphens: none`); in allen Inhalten der Landingpage einsetzen. Danach alle Seiten bei 320, 360, 768 und 1280 px prüfen: kein automatisch getrennter Titel, kein Überlauf.
2. **K2 Kontakt-h1:** Token `--text-display-1-form` (clamp(2.5rem, 5vw, 4.5rem), Zeilenhöhe 1,05) in `globals.css` (Block «Ergänzungen»), Einsatz im Hero mit Formular. Ziel: höchstens 4 Zeilen bei 1280 px.
3. **K3 + K4 Screenshot-Skript:** Prototyp-Hinweis der Karte ausblenden; vor jeder Aufnahme Textknoten korrigieren: «ß» → «ss», Dezimalpunkt → Komma bei Zahlen mit Einheit oder in Kennzahlen (Regex auf `\d+\.\d+(?=\s?(m|m²|%))` u. ä.; Datumsangaben `TT.MM.JJJJ` nicht anfassen). Prototyp-Datei bleibt unverändert. Alle 5 Bilder mit `--source=prototype` neu erzeugen und einchecken; im Bericht bestätigen, dass kein «ß» und kein Dezimalpunkt mehr sichtbar ist.
4. **K5 Turnstile ohne JS:** `<noscript>`-Hinweis über dem Formular (Text `UB04-kommunen.md` 4.13, Baustein `Note`). Ein Formular-POST ohne Turnstile-Token zeigt serverseitig denselben Hinweis statt «Die Sicherheitsprüfung hat nicht geklappt …». Turnstile bleibt `interaction-only`. Test «Kontakt ohne JS» anpassen.
5. **K6 Bindestrich-Wörter:** Hilfsfunktion für Inhalte, die «6-stelligen», «2-Faktor» u. ä. in `whitespace-nowrap` setzt; auf alle Inhaltsdaten anwenden.
6. **K7 Funktionen-Raster:** `RuleGrid`-Option `fillLast` (allein stehende letzte Zelle spannt über die restlichen Spalten, gemeinsame Linien bleiben korrekt); auf `/funktionen` einsetzen.
7. **K8 Icon-Tafel:** Skript (Teil der Abnahme-Bildschirmfotos) erzeugt `tests/output/abnahme/icons.png`: alle Icons aus `icons.tsx` in 24 und 48 px mit Namen, neu gezeichnete markiert.
8. **K10:** `aria-current="page"` auf dem Kopfzeilen-Button «Demo anfragen», wenn `/kontakt` (inkl. `/kontakt/[anliegen]`) aktiv ist.
9. **K11:** Liegt `docs/vorlagen/drivers-one-CLAUDE.md` vor: Aufbau und allgemeine Regeln abgleichen, urbown-Regeln behalten, Abweichungen im Bericht nennen. Sonst überspringen.

### Teil B – Seite «Für Städte & Ämter» (UB04-kommunen.md Abschnitt 4)
1. Seite nach 4.1–4.11 neu aufbauen, Texte wörtlich. Reihenfolge: Hero · Bildband · Nutzen (paper) · Ablauf mit Aufgabenteilung (weiss) · Referenz (paper) · Kosten mit Hinweis «Budget» (weiss) · Förderung (paper) · Datenschutz & Sicherheit (weiss) · Unterlagen (paper) · Häufige Fragen (weiss) · Abschluss (paper).
2. **Neue Bausteine** nach `UB04-kommunen.md` Abschnitt 6.2: `DownloadCard`, `CtaBand`, `RuleGrid fillLast`, `<Brand>`. Aufgabenteilung als Raster g2 mit 1,5-px-Rahmen (wie Preis-Block, ohne Hervorhebung), Listen mit quadratischem Aufzählungszeichen in `ink` (8 px), als `ul`.
3. **Inhalte als Daten:** `web/src/content/funding.ts` (Förderung mit Feld `stand: "November 2026"`), `web/src/content/downloads.ts` (Titel, Text, Dateien), FAQ der Städte-Seite in `web/src/content/faq-staedte.ts`. `RefStats` erhält optional `note` («Stand November 2026», nur auf `/staedte`).
4. **Hero-Kasten «Auf einen Blick»:** 6 Zeilen nach 4.2 (Reihenfolge beachten).
5. **Button «Infopaket herunterladen»** im Hero: `ButtonLink` sekundär mit Icon `download`, `href` auf das PDF, `download`-Attribut, zugänglicher Name mit Typ und Grösse.
6. Metadaten nach 4.1. Kein neuer Sitemap-Eintrag (Downloads nicht in die Sitemap).
7. Leistung: Lighthouse `/staedte` mobil weiterhin ≥ 90 / ≥ 95 / ≥ 90 / ≥ 90. Keine zusätzlichen Client-Komponenten (Akkordeon bleibt `details`/`summary`).

### Teil C – Downloads
1. Dateien aus `docs/grundlagen/downloads/` nach `web/public/downloads/` kopieren (nur die 5 Dateien, nicht `infopaket-quelle/`). Dateinamen unverändert.
2. **Metadaten zur Build-Zeit:** Skript `web/scripts/download-meta.mjs` liest Grösse (KB/MB, deutsch formatiert: «206 KB», «1,2 MB») und bei PDFs die Seitenzahl (z. B. mit `pdf-lib` als devDependency) und schreibt `web/src/content/downloads.meta.json`. `DownloadCard` zeigt «PDF · 8 Seiten · 206 KB» bzw. «Word · 17 KB». Skript in `npm run build` vor `next build` einhängen oder Ergebnis einchecken (Entscheid festhalten).
3. **Kopfzeilen** für `/downloads/*` (in `next.config`): `Content-Disposition: attachment` für `.docx`, `inline` für `.pdf`; `X-Robots-Tag: noindex` für die beiden Vorlagen (Beschlussvorlage, AV-Vertrag) immer, für das Infopaket nur solange `SITE_INDEXABLE` nicht `true` ist; `Cache-Control: public, max-age=3600`.
4. CSP prüfen: Downloads sind eigene Quelle, keine Änderung nötig; im Bericht bestätigen.
5. **Quelle des Infopakets** bleibt in `docs/grundlagen/downloads/infopaket-quelle/`. Neu erzeugen nur auf Anweisung eines Projekt-Chats (`node make-infopaket.mjs …`, Playwright). Nicht in den Build einbauen.

### Teil D – Inhalte ausserhalb von `/staedte`
1. Keine Textänderungen auf anderen Seiten ausser K1/K2/K5/K6/K7/K10.
2. `docs/design-ergaenzungen.md`: Einträge aus Block 1 als «angenommen in UB04 Abschnitt 6.1» markieren; neue Tokens/Bausteine aus Block 2 dort eintragen, auch solche über Abschnitt 6.2 hinaus.

### Teil E – Tests und Abnahme-Material
1. **Playwright:** `/staedte` mit axe (WCAG 2.2 AA), genau eine h1, alle 11 FAQ-Einträge per Tastatur öffnen/schliessen; alle 5 Download-Links liefern HTTP 200 mit passendem `Content-Type` (`application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`) und den Kopfzeilen aus C3; Hero-Button zeigt auf das Infopaket.
2. **Silbentrennung (K1):** Test prüft, dass h1/h2 auf allen Routen `hyphens` ≠ `auto` haben; Überlauf-Test 320/360/640 px bleibt grün.
3. **Kontakt ohne JS (K5):** Test erwartet den Hinweis aus 4.13.
4. **Lighthouse** alle 7 Seiten, Tabelle mit Performance, Accessibility, Best Practices, SEO **und FCP, LCP, TBT, CLS** (K9).
5. **Abnahme-Bildschirmfotos** neu: alle 7 Seiten × 360/768/1280 px nach `tests/output/abnahme/` sowie `icons.png` (K8).
6. Manuell: Tastatur-Durchgang `/staedte`, Zoom 200 %, 320 px.

### Abschluss (Bericht an Marc)
Kurz und auf Deutsch, auch in `docs/claude-code-uebergabe.md`:
1. Was gebaut ist (je Teil A–E ein Satz) und **letzter Commit** (Hash).
2. Lighthouse-Tabelle (8 Werte × 7 Seiten) und axe-Ergebnis.
3. Korrekturliste K1–K11 mit Status (erledigt / offen mit Grund).
4. Abweichungen von UB04/UB02 mit Grund; neue Tokens/Bausteine.
5. Offene Fragen an Marc.
6. Was Marc lokal prüfen soll: `localhost:3100/staedte`, Downloads öffnen, `/kontakt` mit ausgeschaltetem JavaScript, `/_styleguide`, `tests/output/abnahme/icons.png`.

**Nicht in Block 2:** Deployment, Server, Cloudflare, Resend-Domain, App-Funktionen, Datenmodell (alles ab UB05). Inhalte der Downloads nicht ändern (Änderungen nur über einen Projekt-Chat).
