# UB04 – Abnahme Block 1 · Seite «Für Städte & Ämter» · Unterlagen für Kommunen

Stand: 26.11.2026 · Projekt «urbown.com 2.0» · Ergebnis UB04
Grundlage: Master-Datei Version 8.3, `claude/UB01-architektur.md`, `claude/UB02-design.md`, `claude/UB03-landingpage-texte.md`, `claude/UB03-claude-code-block1.md`, Bericht von Claude Code zu Block 1 (`docs/claude-code-uebergabe.md`, 20.11.2026), `docs/design-ergaenzungen.md`, 21 Abnahme-Bildschirmfotos, OG-Bild.
Zielgruppe: **Claude Code** (Umsetzung Block 2, Auftrag `claude/UB04-claude-code-block2.md`) und die folgenden Projekt-Chats (UB25 Recht, UB28 Vertrieb).

**Regel für die Umsetzung:** Texte in Abschnitt 4 werden **wörtlich** übernommen. Schreibweise Schweiz («ss»), Sie-Form, Anführungszeichen «». Wo `UB03-landingpage-texte.md` Abschnitt 3.3 und diese Datei abweichen, gilt diese Datei.

---

## 1. Abnahme Block 1

### 1.1 Ergebnis
**Abgenommen mit Korrekturen (26.11.2026).** Teile A–F sind vollständig umgesetzt, alle Seiten tragen die Texte aus UB03, der Hosting-Text lautet überall «Schweiz», Pricing ist neutral (keine Paketnamen, keine Beträge). Die Korrekturen in 1.4 sind klein und kommen in Block 2.

### 1.2 Geprüft
| Prüfpunkt | Ergebnis |
|---|---|
| Lighthouse mobil (7 Seiten) | Performance 94–99, Accessibility 100, Best Practices 100 (Kontakt 96: Meldung aus dem Turnstile-Iframe von Cloudflare, nicht unser Code), SEO 100. Ziel (≥ 90 / ≥ 95 / ≥ 90 / ≥ 90) überall erreicht ✓ |
| axe WCAG 2.2 AA | 0 Verstösse auf 11 Routen, Styleguide und App-Platzhalter ✓ |
| Tests | 31 Playwright-Tests grün (Routen, Tastatur, Adress-Kasten, Kontaktformular inkl. Mailpit und ohne JS, noindex, Kopfzeilen, Sitemap, Überlauf 320/360/640 px) ✓ |
| Bildschirmfotos 360 / 768 / 1280 px | Gestaltung nach Prototyp, Raster, Linien, Fotos in Graustufen, Einblick-Bereich, Footer ✓ – Befunde siehe 1.4 |
| Texte | wörtlich nach UB03, «ss», «» ✓ |
| Hosting-Korrektur (UB01) | Städte-Hero «Hosting: Schweiz», Datenschutz-Kachel, Preis-Block ✓ |
| Barrierefreiheit Bausteine | 44-px-Trefferflächen (Footer-Links sichtbar höher), Fokus, `aria-current` in der Navigation ✓ |
| OG-Bild | Logo Original, Claim Archivo 800, Mono-Zeile «urbown.com» auf Weiss ✓ freigegeben |
| Im Bericht fehlend | letzter Commit; Ladezeit (FCP/LCP) für die Master-Vorgabe «< 1,5 s mobil» → K9 |

### 1.3 Abweichungen von UB02/UB03 (Bericht Abschnitt 3) – Entscheid
| Abweichung | Entscheid |
|---|---|
| Archivo 900 als eigene Instanz nur im Landing-Layout | ✓ angenommen (entspricht UB02 11) |
| `tracking-tight` (−0,025 em) statt −0,02 em | ✓ angenommen |
| unsichtbare h2 auf `/funktionen` und `/preise`, Hero-Kasten «Nur auf Einladung» als h2 im h3-Aussehen | ✓ angenommen (Überschriften ohne Sprünge) |
| Silbentrennung `hyphens-auto` bei h1/h2 | ✗ **ersetzen** durch gezielte Trennung → K1 |
| Fusszeilen-Links höher wegen 44-px-Trefferfläche | ✓ angenommen |
| `?anliegen=` ohne JavaScript über `/kontakt/[anliegen]` | ✓ angenommen |
| Einblick: Prototyp-Leiste ausgeblendet, Viewport-Meta, Graustufen | ✓ angenommen, ergänzt durch K3/K4 |
| Technische Entscheide 1–13 (Übergabe-Dokument) | ✓ alle angenommen. Hinweis zu Nr. 8 (CSP mit `'unsafe-inline'`): für statische Seiten in Ordnung, in UB25 prüfen, ob Hashes möglich sind |
| Node 26 auf dem PC, `.nvmrc` und CI auf 24 LTS | ✓ so lassen. Wechsel auf Node 26 gemeinsam mit drivers.one, nicht einzeln |

### 1.4 Korrekturliste (für Block 2)
| # | Ort | Befund (Bildschirmfoto) | Korrektur | Gewicht |
|---|---|---|---|---|
| **K1** | alle Seiten, h1/h2 | Automatische Silbentrennung trennt Titel: «Innen-stadt» (Start 1280), «spre-chen.» (Kontakt 1280), «gemein-sam» (Start 360) und den Markennamen **«ur-bown»** (Städte 360, h2 Förderung) | `hyphens-auto` entfernen, Standard `hyphens: manual`. Weiche Trennstriche (`&shy;`) nur gezielt dort, wo ein Wort bei 320 px sonst nicht passt (z. B. «weiter­machen.» auf `/preise`). «urbown» wird nie getrennt (Hilfskomponente `<Brand>` bzw. `hyphens-none` + `whitespace-nowrap`). | hoch |
| **K2** | `/kontakt` ab 900 px | h1 läuft in der schmalen Spalte über 6 Zeilen | Neues Token `--text-display-1-form: clamp(2.5rem, 5vw, 4.5rem)` (max. 72 px) für Heros mit Formular. Ziel: höchstens 4 Zeilen bei 1280 px | mittel |
| **K3** | Einblick «Karte» (`/funktionen`) | Prototyp-Hinweis «Echte Karte (OpenStreetMap). Im Prototyp werden Adressen … näherungsweise platziert» ist im Bild sichtbar | Im Screenshot-Skript ausblenden (wie die Prototyp-Leiste) | mittel |
| **K4** | alle 5 Einblick-Bilder | Beispieldaten mit «ß» («Außenbereich») und Dezimalpunkt («11.5 m», «4.2 m») | Antwort Frage 4: **im Skript ersetzen** (vor der Aufnahme per DOM: «ß» → «ss», Dezimalpunkt → Komma bei Zahlen mit Einheit). Prototyp-Datei bleibt unverändert. Bilder neu erzeugen und auf weitere «ß» prüfen | mittel |
| **K5** | `/kontakt` ohne JavaScript | Meldung «Die Sicherheitsprüfung hat nicht geklappt … Seite neu laden» führt in die Irre | Antwort Fragen 1+2: Turnstile bleibt **interaction-only**. Über dem Formular ein `<noscript>`-Hinweis (Text 4.13); fehlt das Token bei einem Formular-POST ohne JS, zeigt der Server denselben Hinweis statt der Turnstile-Meldung | mittel |
| **K6** | Netzwerke Handy u. a. | «6-/stelligen» bricht am Bindestrich um | Kurze Bindestrich-Wörter mit Zahl («6-stelligen», «2-Faktor») in `whitespace-nowrap` setzen (Content-Hilfsfunktion) | klein |
| **K7** | `/funktionen` ab 680 px | 13 Kacheln: letzte Zeile mit 1 Kachel lässt 1–2 Felder offen, das Raster wirkt unfertig | Allein stehende letzte Kachel spannt über die restlichen Spalten (`RuleGrid`-Option `fillLast`) | klein |
| **K8** | Styleguide | Antwort Frage 3: neue Icons **vorläufig freigegeben** | Icon-Tafel als Bild erzeugen (alle Icons, 24 px und 48 px, mit Namen) → `tests/output/abnahme/icons.png`; Abnahme durch Marc in UB05 | klein |
| **K9** | Bericht | letzter Commit und Ladezeit fehlen | Bericht nennt den letzten Commit; Lighthouse-Tabelle zusätzlich mit FCP, LCP, TBT, CLS (mobil) je Seite | klein |
| **K10** | `/kontakt` | Button «Demo anfragen» in der Kopfzeile hat auf `/kontakt` kein `aria-current` | `aria-current="page"` setzen (Aussehen bleibt) | klein |
| **K11** | `CLAUDE.md` | Abgleich mit drivers.one nicht gemacht (Vorlage fehlte) | Antwort Frage 7: Marc legt die Vorlage vor Block 2 unter `docs/vorlagen/drivers-one-CLAUDE.md` ab (optional). Liegt sie da, gleicht Claude Code ab und nennt Abweichungen; sonst entfällt der Punkt | klein |

### 1.5 Antworten auf die offenen Fragen von Claude Code
| Frage | Antwort (Marc, 26.11.2026) |
|---|---|
| 1 Turnstile ohne JavaScript | Versand ohne JS bleibt nicht möglich (Spamschutz). Ein klarer Hinweis ersetzt die irreführende Meldung → K5 |
| 2 Turnstile sichtbar/unsichtbar | **interaction-only** bleibt |
| 3 Neu gezeichnete Icons | **vorläufig freigegeben**, Abnahme über Icon-Tafel in UB05 → K8 |
| 4 Beispieldaten «ß» / «11.5 m» | **im Skript ersetzen** → K4 |
| 5 OG-Bild | **freigegeben**, bleibt so |
| 6 `MAIL_FROM` | vorläufig «urbown <no-reply@urbown.com>» bestätigt, endgültig in UB07 |
| 7 drivers.one-`CLAUDE.md` | Marc legt sie optional ab → K11 |

---

## 2. Förderprogramme – Prüfung per Websuche (26.11.2026)

Ergebnis: Die Liste aus UB03 war teilweise veraltet. Geändert: «Handlungsstrategie Leerstandsaktivierung» ist eine Strategie und kein Programm, das zugehörige Bundesprogramm «Gemeinsam gegen Leerstand» vergibt 2026 keine neuen Mittel; die Modellvorhaben Nachhaltige Raumentwicklung 2025–2030 sind bereits vergeben. Beide stehen nicht mehr auf der Seite.

### 2.1 Deutschland
| Programm | Stand November 2026 | Bezug zu urbown | Auf der Seite |
|---|---|---|---|
| **Städtebauförderung, «Lebendige Zentren»** | Verwaltungsvereinbarung 2026/2027 seit April 2026 in Kraft; Bund 2026 erstmals 1 Mrd. €, davon 380 Mio. € für «Lebendige Zentren» (vorher 300 Mio.); schrittweise Erhöhung auf rund 1,6 Mrd. € geplant. Antragsberechtigt: Städte und Gemeinden, über die Länder, für Gesamtmassnahmen in Fördergebieten | urbown als Baustein eines Citymanagements oder Verfügungsfonds in einem Fördergebiet; Entscheid der Bewilligungsstelle im Einzelfall | ✓ |
| **Landesprogramme** (Beispiele) | NRW: «Zukunftsfähige Innenstädte und Ortszentren» (Nachfolger Sofortprogramm Innenstadt). Baden-Württemberg: «Sofortprogramm Einzelhandel/Innenstadt», Förderlinie «Stadtmarketing» bis 60 %, max. 50 000 €, externe Dienstleister inkl. Entwicklung/Programmierung förderfähig, läuft spätestens bis 31.12.2026; «Flächen gewinnen durch Innenentwicklung» (u. a. kommunale Flächenmanager); regionale Innenstadtberater bis Ende 2026. Rheinland-Pfalz: Modellvorhaben «Innenstadt-Impulse 2026». Bayern: «Leerstand jetzt WOHNEN» (Wohnen in leeren Gewerbebauten) | je Land unterschiedlich; BW-Sofortprogramm ist für Mannheim und BW-Städte kurzfristig interessant (Frist!) | ✓ (NRW, BW als Beispiele) |
| **Bundesförderung «Gewerbe zu Wohnen»** (KfW 266) | seit 1. Juli 2026; Zuschuss bis 30 % von max. 100 000 € förderfähigen Ausgaben, also bis 30 000 € je neuer Wohneinheit; 300 Mio. € für 2026; für Eigentümer/Investoren, nicht für Kommunen als Lizenz | Kein Geld für die Lizenz, aber ein Thema, das die Stadt im Netzwerk an die Eigentümer bringt (City News, Event) | ✓ als «für Eigentümer im Netzwerk» |
| Handlungsstrategie Leerstandsaktivierung (BMWSB, Jan. 2025) / Förderaufruf «Gemeinsam gegen Leerstand» | Strategie; der Förderaufruf erhält 2026 keine neuen Verpflichtungsermächtigungen | – | ✗ entfernt |

### 2.2 Schweiz
| Programm | Stand November 2026 | Bezug zu urbown | Auf der Seite |
|---|---|---|---|
| **Neue Regionalpolitik (NRP)**, SECO und Kantone | Mehrjahresprogramm 2024–2031; für Berggebiete, ländlichen Raum und Grenzregionen; Schwerpunkte Innovation, Tourismus, Digitalisierung, ergänzend lokale Wirtschaft | für Gemeinden im NRP-Gebiet, über die kantonale NRP-Fachstelle | ✓ mit Einschränkung «ländlicher Raum, Berggebiete, Grenzregionen» |
| **Kantonale Wirtschafts- und Standortförderung** | je Kanton | Zentrumsentwicklung, Gewerbe | ✓ |
| **EspaceSuisse** (Beratung, kein Förderprogramm) | Stadt- und Ortsanalyse, Nutzungsstrategie, «Gassenclub» (Eigentümer einbinden) aus dem früheren Netzwerk Altstadt | urbown als Werkzeug für die Umsetzung einer Nutzungsstrategie (Eigentümer erreichen, Erdgeschosse vermitteln) | ✓ als «Beratung, an die urbown anknüpft» |
| Modellvorhaben Nachhaltige Raumentwicklung 2025–2030 (ARE u. a.) | Eingabe bis Juni 2025, im November 2025 33 Projekte ausgewählt (total 4,274 Mio. CHF); keine neue Eingabe in dieser Generation | – | ✗ entfernt (für UB28 vormerken: nächste Generation) |

**Wichtig für Vertrieb (UB28):** Das BW-Sofortprogramm endet am 31.12.2026 und verlangt den Antrag mindestens 10 Wochen vor Vorhabenbeginn. Für Städte, die 2027 starten, ist es nicht mehr nutzbar.

Quellen (abgerufen 26.11.2026): bundesregierung.de (Städtebauförderung 2026, «Gewerbe zu Wohnen»), bundestag.de (hib 244/2026), berlin.de (Mittelverteilung 2026), KfW Merkblatt 266 (Stand 07/2026), Bayerischer Landtag (Drs. 19/8829, «Gemeinsam gegen Leerstand»), wm.baden-wuerttemberg.de (Merkblatt Sofortprogramm EH/I, Stand 27.11.2025), baden-wuerttemberg.de (Innenstadtberater, Flächen gewinnen), bra.nrw.de (ZIO), add.rlp.de (Innenstadt-Impulse 2026), admin.ch / astra.admin.ch (Modellvorhaben, Medienmitteilung 27.11.2025), seco.admin.ch (NRP 2024–2031), espacesuisse.ch.

---

## 3. Erkenntnis Datenschutz: «Hosting in der Schweiz» ehrlich formulieren

Datenbank, Dateien und Backups liegen in der Schweiz (Exoscale Zürich/Genf). Zwei Dienstleister verarbeiten aber Daten ausserhalb der Schweiz:
- **Cloudflare** (USA): DNS, Schutz vor Angriffen, Proxy (sieht den Verkehr), Turnstile. Zertifiziert unter EU-U.S. und **Swiss-U.S.** Data Privacy Framework, zusätzlich Standardvertragsklauseln.
- **Resend** (USA): Versand der E-Mails. Die Region «Irland» bestimmt nur, **woher** gesendet wird; Konto- und Maildaten liegen laut Resend in den USA (30 Tage). Zertifiziert unter EU-U.S. DPF, zusätzlich Standardvertragsklauseln. Ein Swiss-U.S.-DPF-Eintrag ist in den Unterlagen von Resend nicht genannt (in UB25 prüfen).

**Folge für Texte:** Die Seite sagt «Daten in der Schweiz» bzw. «Datenbank, Dateien und Backups in der Schweiz» und nennt die Dienstleister offen (FAQ, AV-Vertrag). Nicht mehr verwenden: «alle Daten ausschliesslich in der Schweiz». Der Entwurf des Launch-Newsletters (Master 7, «Daten ausschliesslich in der Schweiz gespeichert») wird in UB27 angepasst.
**Für UB25:** Prüfen, ob ein E-Mail-Dienst mit Datenspeicherung in der Schweiz oder EU sinnvoll ist (Gemeinden mit strengen kantonalen Vorgaben), und ob gemeinsame Verantwortlichkeit (Art. 26 DSGVO) für zentrales Konto und urbown-weite Funktionen vorliegt (siehe AV-Vertrag § 11).

---

## 4. Seite «Für Städte & Ämter» `/staedte` (neu)

Ersetzt `UB03-landingpage-texte.md` Abschnitt 3.3. Bausteine aus UB02/UB03 Abschnitt 6; neu sind `DownloadCard` und `CtaBand` (Abschnitt 6). Hintergrund wechselt ab: Hero weiss · Bildband · paper · weiss · paper …

### 4.1 Metadaten
| | |
|---|---|
| `<title>` | Für Städte & Ämter – urbown |
| Meta-Beschreibung | Vertraulicher Kanal zu den Eigentümern Ihrer Innenstadt, Frühwarnsystem für Leerstand. Start in zwei Wochen, Daten in der Schweiz, Unterlagen zum Download. |

### 4.2 Hero (weiss)
- Label: Für Städte, Gemeinden und Ämter
- h1: Ein Netzwerk für alle, die Ihre *Innenstadt* besitzen. (*Kontur*)
- Lead: Die meisten Flächen in der Innenstadt gehören privaten Eigentümern. urbown gibt Ihrer Verwaltung einen direkten, vertraulichen Kanal zu ihnen und ein Frühwarnsystem für Leerstand. Sie starten in rund zwei Wochen, ohne eigene IT-Projekte.
- Buttons: **Demo-Termin vereinbaren** (primär, `/kontakt?anliegen=demo`) · **Infopaket herunterladen** (sekundär, Icon `download`, Link auf `/downloads/urbown-infopaket-staedte.pdf`, zugänglicher Name «Infopaket herunterladen (PDF, {Grösse})»)
- Kasten rechts «Auf einen Blick» (Zeilen mit Linie):
  - Start – **ca. 2 Wochen**
  - Aufwand Verwaltung – **ca. 2–4 Std./Woche**
  - Pilot – **6 Monate kostenlos**
  - Danach – **individuelles Angebot**
  - Datenspeicherung – **Schweiz**
  - Barrierefreiheit – **WCAG 2.2 AA**

**Bildband** `staedte-fussgaengerzone.jpg` (unverändert)

### 4.3 Sektion paper – Nutzen für die Stadt
- Label: Nutzen für die Stadt · h2: Was Ihre Verwaltung gewinnt.
- Raster g3 (Icons wie bisher):
  - `store` **Frühwarnsystem Leerstand** – Eigentümer melden anstehende Auszüge, bevor Flächen leer stehen. Sie sehen, wo Handlungsbedarf entsteht.
  - `msg` **Direkter Draht zu Eigentümern** – Viele Eigentümer sind für die Verwaltung schwer erreichbar. Im Netzwerk erreichen Sie sie mit einem Beitrag.
  - `poll` **Beteiligung, die funktioniert** – Umfragen zu Öffnungszeiten, Baustellen oder Gestaltung. Ergebnisse in Echtzeit, ohne Papier.
  - `map` **Lagebild auf der Karte** – Leerstände, Problemstellen und Ideen der Mitglieder auf einer Karte, nach Themen gefiltert.
  - `news` **Informationen gezielt verbreiten** – Förderprogramme, Baustellen, Termine: Sie informieren die richtigen Menschen direkt.
  - `shield` **Volle Kontrolle** – Die Stadt verwaltet ihr Netzwerk selbst: Einladungen freigeben, Inhalte moderieren, Auswertungen abrufen.

### 4.4 Sektion weiss – Ablauf
- Split: Label «Ablauf» · h2 «So arbeiten wir mit Ihrer Verwaltung.» · rechts Schritte 01–05 (gemeinsamer Inhalt, unverändert)
- Darunter, volle Breite, Raster g2 (Rahmen 1,5 px wie Preis-Block, ohne Hervorhebung):
  - Label **Das übernehmen wir** · Liste:
    - Netzwerk einrichten: Adresse, Kurzadresse, Logo, Kategorien
    - Vorlagen für Einladungsbrief und E-Mail an die Eigentümer
    - Kick-off vorbereiten und moderieren
    - Einführung für Ihre Administration (rund eine Stunde, online)
    - Betrieb, Updates, Backups und Support
    - Quartalsbericht mit anonymisierter Auswertung
  - Label **Das übernimmt die Stadt** · Liste:
    - eine oder zwei Personen für die Administration benennen
    - Eigentümer der Innenstadt per Brief zum Kick-off einladen
    - Teilnehmende im Netzwerk erfassen, einzeln oder per Sammelimport
    - Einladungen freigeben und eigene Beiträge schreiben
    - Ergebnisse des Pilots auswerten und entscheiden
- Text darunter (`text-sm text-ink-2`): Die Einladung zum Kick-off kommt von der Stadt. Adressen der Eigentümer geben Sie dafür nicht an uns weiter.

### 4.5 Sektion paper – Referenz (neu auf dieser Seite)
- Label: Referenz · h2: Mannheim ist seit 2022 dabei.
- Lead: In Mannheim tauschen sich Eigentümer, Gewerbe und Stadt seit 2022 in einem eigenen, geschlossenen Netzwerk aus: zu Leerständen, Immobilien, Baustellen und gemeinsamen Aktionen in der Innenstadt.
- `RefStats` (gemeinsamer Inhalt wie Startseite): **2022** Start des Netzwerks Mannheim · **35** Mitglieder: Eigentümer, Gewerbe, Stadt · **53** Immobilien im Netzwerk
- Text darunter (`text-sm text-ink-2`): Stand November 2026.
- *Zitat und Rolle der Ansprechperson folgen, sobald Marc sie liefert (Master 9). Kein Platzhalter auf der Seite.*

### 4.6 Sektion weiss – Kosten
- Split + Block: Label «Kosten» · h2 «Erst testen, dann entscheiden.» · Lead «Der Pilot ist kostenlos und unverbindlich. Für die Zeit danach erhalten Sie ein Angebot und alle Unterlagen für Ihre Vergabestelle.» · Preis-Block (gemeinsam)
- Darunter `Note` (Kasten 1,5 px): **Budget rechtzeitig einplanen** – Auf Wunsch senden wir das Angebot schon zu Beginn des Pilots. So können Sie es in den Haushalt des nächsten Jahres aufnehmen, bevor der Pilot endet.

### 4.7 Sektion paper – Förderung (aktualisiert)
- Label: Förderung · h2: Programme, an die urbown anknüpfen kann.
- Lead: urbown kann Teil eines geförderten Innenstadt-, Citymanagement- oder Leerstandsprojekts sein. Ob die Kosten förderfähig sind, entscheidet die zuständige Bewilligungsstelle im Einzelfall. Für Ihren Antrag liefern wir Projektbeschreibung und Kostenangaben.
- Raster g2:
  - Tag solid **Deutschland** · h3 **Bund und Länder** · Liste:
    - Städtebauförderung, Programm «Lebendige Zentren» (über die Länder), z. B. für Citymanagement oder Verfügungsfonds in einem Fördergebiet
    - Landesprogramme für Innenstädte und Ortszentren, z. B. «Zukunftsfähige Innenstädte und Ortszentren» in Nordrhein-Westfalen oder das «Sofortprogramm Einzelhandel/Innenstadt» in Baden-Württemberg (bis Ende 2026)
    - Für Eigentümer im Netzwerk: Bundesförderung «Gewerbe zu Wohnen» (KfW, seit Juli 2026) für den Umbau leerer Gewerbeflächen zu Wohnungen
  - Tag solid **Schweiz** · h3 **Bund, Kantone und Beratung** · Liste:
    - Neue Regionalpolitik (SECO und Kantone) für Gemeinden im ländlichen Raum, in Berggebieten und Grenzregionen
    - Kantonale Wirtschafts- und Standortförderung
    - Beratung zur Zentrumsentwicklung von EspaceSuisse (z. B. Nutzungsstrategie), mit urbown als Werkzeug für die Umsetzung
- Text darunter (`text-sm text-ink-2`): Stand November 2026. Programme und Bedingungen ändern sich. Bitte prüfen Sie die aktuellen Regeln bei Ihrer Bewilligungsstelle.
- Inhalt als Daten (`web/src/content/funding.ts`) mit Feld `stand`, damit spätere Chats nur die Daten ändern.

### 4.8 Sektion weiss – Datenschutz & Sicherheit (aktualisiert)
- Split: Label «Datenschutz & Sicherheit» · h2 «Vertraulich von Anfang an.»
- Raster g3 (6 Kacheln, ohne Icons):
  - **Geschlossen** – Kein Inhalt ist öffentlich sichtbar. Zugang nur mit Login und nur auf Einladung. Inhalte und Profile sind standardmässig nur im eigenen Netzwerk sichtbar. Mitglieder können sie freiwillig für alle urbown-Mitglieder freigeben.
  - **Daten in der Schweiz** – Datenbank, Dateien und verschlüsselte Backups liegen in Rechenzentren in Zürich und Genf. Das ist auch für deutsche Städte zulässig: Die EU anerkennt den Schweizer Datenschutz als gleichwertig.
  - **DSGVO und DSG** – Vertrag zur Auftragsverarbeitung inklusive. Nur notwendige Cookies, keine Werbetracker, keine Analyse-Dienste. Export jederzeit; bei Vertragsende erhalten Sie alle Daten, danach löschen wir sie.
  - **Offene Liste der Dienstleister** – Für den sicheren Betrieb setzen wir wenige, vertraglich gebundene Dienstleister ein, etwa für den Schutz vor Angriffen und den Versand von E-Mails. Alle stehen im AV-Vertrag.
  - **Sicher angemeldet** – Verschlüsselte Verbindungen, Rechte je Rolle, Zwei-Faktor-Anmeldung für Administratorinnen und Administratoren. Direktnachrichten liest niemand von urbown.
  - **Barrierefrei** – Gebaut nach WCAG 2.2 AA, der Grundlage für BITV 2.0 und EN 301 549. Jede Seite wird automatisch geprüft.

### 4.9 Sektion paper – Unterlagen (neu)
- Label: Unterlagen · h2: Alles für Verwaltung und Gemeinderat.
- Lead: Zum Weitergeben, Ausdrucken und Anpassen. Die Vorlagen sind Entwürfe. Bitte prüfen Sie sie mit Ihrer Rechts- und Datenschutzstelle.
- Raster g3 aus `DownloadCard` (Abschnitt 6):

| Icon | Titel | Text | Dateien (Link-Text · Datei) |
|---|---|---|---|
| `download` | **Infopaket für Städte** | Nutzen, Ablauf, Kosten, Datenschutz und Förderung auf acht Seiten. Zum Weitergeben in der Verwaltung. | «PDF herunterladen» · `urbown-infopaket-staedte.pdf` |
| `download` | **Muster-Beschlussvorlage** | Vorlage für den Beschluss zum kostenlosen Pilot, mit Begründung und Beschlussvorschlag. Zum Anpassen in Word. | «Word herunterladen» · `urbown-muster-beschlussvorlage.docx` · «PDF ansehen» · `urbown-muster-beschlussvorlage.pdf` |
| `download` | **AV-Vertrag (Entwurf)** | Vertrag zur Auftragsverarbeitung nach DSGVO und DSG, mit Sicherheitsmassnahmen und Liste der Dienstleister. | «Word herunterladen» · `urbown-av-vertrag-entwurf.docx` · «PDF ansehen» · `urbown-av-vertrag-entwurf.pdf` |

- Unter jedem Titel eine Mono-Zeile mit Typ, Seitenzahl und Grösse, z. B. «PDF · 8 Seiten · 206 KB» (Werte aus den Dateien zur Build-Zeit, nicht von Hand).
- Text unter dem Raster (`text-sm text-ink-2`): Lieber gedruckt oder persönlich erklärt? Schreiben Sie uns, wir senden das Infopaket und beantworten Ihre Fragen. (Link «Schreiben Sie uns» → `/kontakt?anliegen=infopaket`)

### 4.10 Sektion weiss – Häufige Fragen (erweitert)
- Split, Akkordeon wie bisher. Label: Häufige Fragen · h2: Fragen aus Verwaltungen.
1. **Wer moderiert das Netzwerk?** – Die Stadt benennt eine oder zwei Personen als Administration, meist aus Innenstadtbüro, Citymanagement oder Wirtschaftsförderung. Wir unterstützen beim Start und bei Bedarf dauerhaft.
2. **Wie viel Aufwand entsteht für die Verwaltung?** – Nach dem Start rechnen Städte mit zwei bis vier Stunden pro Woche: Einladungen freigeben, Beiträge der Stadt, gelegentliche Moderation.
3. **Wie gewinnen wir die Eigentümer?** – Am besten mit einem Brief der Stadt und einem Kick-off-Abend. Wir liefern Briefvorlage, Ablauf und Moderation. Danach laden Mitglieder weitere Eigentümer, Gewerbe und Partner ein, und die Stadt gibt jede Einladung frei.
4. **Brauchen wir eine Ausschreibung?** – Für den Pilot nicht, er ist kostenlos. Für die Zeit danach hängt es vom Angebot und den Regeln Ihres Landes bzw. Kantons ab. Bitte prüfen Sie das mit Ihrer Vergabestelle. Wir liefern alle Unterlagen.
5. **Braucht es einen Beschluss des Gemeinderats?** – Für den kostenlosen Pilot genügt in vielen Städten ein Entscheid der Verwaltung. Soll ein Gremium entscheiden, hilft unsere Muster-Beschlussvorlage. Für die Zeit danach richtet sich die Zuständigkeit nach Ihrer Gemeindeordnung und der Höhe des Angebots.
6. **Wo liegen unsere Daten?** – In der Schweiz: Datenbank, Dateien und Backups liegen bei Exoscale in Zürich und Genf. Für den Schutz vor Angriffen (Cloudflare) und den Versand von E-Mails (Resend) setzen wir spezialisierte Dienstleister ein, die vertraglich gebunden sind. Alle Dienstleister stehen im AV-Vertrag.
7. **Ist urbown barrierefrei?** – urbown wird nach WCAG 2.2 AA gebaut, der Grundlage für BITV 2.0 und EN 301 549. Jede Seite wird automatisch geprüft. Mitglieder können alles auf dem Handy und mit der Tastatur bedienen.
8. **Was kostet urbown die Mitglieder?** – Nichts. Eigentümer, Gewerbe und Partner nutzen urbown kostenlos. Das ist wichtig, damit möglichst viele mitmachen.
9. **Können mehrere Gemeinden ein Netzwerk teilen?** – Ja. Ein Netzwerk kann eine ganze Region abdecken, oder jede Gemeinde erhält ein eigenes Netzwerk unter einem gemeinsamen Vertrag. Beides ist im Regionalangebot möglich.
10. **Was passiert nach dem Pilot?** – Gegen Ende des Pilots besprechen wir die Ergebnisse und Sie erhalten ein Angebot. Ohne Ihre Zusage endet der Pilot automatisch. Damit das Budget rechtzeitig eingeplant werden kann, senden wir das Angebot auf Wunsch schon früher.
11. **Was passiert mit unseren Daten bei Vertragsende?** – Sie erhalten auf Wunsch einen Export aller Inhalte und Mitgliederdaten. Danach löschen wir das Netzwerk. Verschlüsselte Backups laufen spätestens nach zwölf Wochen aus.

### 4.11 Sektion paper – Abschluss (neu, `CtaBand`)
- h2: Sehen Sie sich urbown in 30 Minuten an.
- Lead: Wir zeigen Ihnen das Netzwerk online und beantworten Ihre Fragen. Danach testen Sie selbst in der Demo.
- Buttons: **Demo-Termin vereinbaren** (primär, `/kontakt?anliegen=demo`) · **Demo selbst testen** (sekundär, Demo-Adresse)

### 4.12 Gemeinsame Inhalte, die sich ändern
- `RefStats` mit Zusatz «Stand November 2026» nur auf `/staedte` (Startseite unverändert).
- Kontakt-Anliegen `infopaket` bleibt («Infopaket für Verwaltung und Gemeinderat»).

### 4.13 Kontakt ohne JavaScript (K5)
`<noscript>`-Hinweis über dem Formular (Kasten `Note`): **Bitte JavaScript aktivieren** – Zum Senden braucht dieses Formular JavaScript (Schutz vor Spam). Sie können uns auch direkt schreiben: info@urbown.com.

---

## 5. Downloads

Erstellt in UB04 als fertige Dateien (Projektinhaber legt sie unter `docs/grundlagen/downloads/` ab, Claude Code kopiert sie nach `web/public/downloads/`). Gestaltung schwarz/weiss nach UB02, Schriften Archivo/Inter/IBM Plex Mono.

| Datei | Inhalt | Format |
|---|---|---|
| `urbown-infopaket-staedte.pdf` | 8 Seiten A4: Titel · Kurz gesagt · Nutzen · Funktionen · Ablauf und Aufgaben · Kosten, Vergabe, Haushalt · Datenschutz, Sicherheit, Barrierefreiheit (mit Dienstleister-Liste) · Förderung (Stand 11/2026), Referenz Mannheim, nächste Schritte | PDF mit Tags (barrierefrei lesbar), Lesezeichen |
| `urbown-infopaket-quelle.html` | Quelle des Infopakets (für spätere Aktualisierung, z. B. Förderstand) | HTML, Schriften in `fonts/` daneben |
| `urbown-muster-beschlussvorlage.docx` / `.pdf` | Beschlussvorlage Deutschland mit Platzhaltern [in eckigen Klammern]: Kopf, Betreff, Beschlussvorschlag (4 Punkte), Sachverhalt (Ausgangslage, Ziel, urbown, Zeitplan, Aufwand, Datenschutz, Barrierefreiheit, Finanzen, Vergabe, Klimaschutz), Anlagen; Anhang «Hinweise für Schweizer Gemeinden» | Word (bearbeitbar) + PDF |
| `urbown-av-vertrag-entwurf.docx` / `.pdf` | AV-Vertrag nach Art. 28 DSGVO / Art. 9 DSG, 13 Paragrafen, Anlage 1 (Gegenstand, Daten, Betroffene), Anlage 2 (technische und organisatorische Massnahmen), Anlage 3 (Unterauftragsverarbeiter: Exoscale/Akenes SA, Cloudflare, Resend, Kartenanbieter vorgesehen) | Word (bearbeitbar) + PDF |

**Entscheide UB04**
- **Infopaket ohne Formular herunterladbar.** Verwaltungen geben Unterlagen intern weiter; ein Formular davor würde bremsen. Wer Kontakt will, nutzt «Infopaket anfordern» im Kontaktformular.
- **Beschlussvorlage in deutscher Rechtschreibung (mit «ß»).** Sie richtet sich an deutsche Gemeinderäte und wird von der Verwaltung in die eigene Vorlage übernommen. Der Anhang für Schweizer Gemeinden und alle übrigen Unterlagen sind in Schweizer Schreibweise.
- **AV-Vertrag als Entwurf** mit sichtbarem Vermerk «Entwurf – vor Verwendung rechtlich prüfen». Endfassung in UB25 (Anwalt).
- **Abgrenzung der Verantwortung** im AV-Vertrag (§ 11): Für das zentrale Konto, urbown-weite Freigaben und den urbown-Newsletter ist die IXIO AG selbst verantwortlich. In UB25 prüfen, ob eine gemeinsame Verantwortlichkeit vorliegt.
- **Schweizer Gemeinden** unterstehen dem kantonalen Datenschutzrecht, nicht dem DSG. Beide Vorlagen weisen darauf hin; einige Kantone verlangen für Bearbeitung im Ausland (USA: Cloudflare, Resend) zusätzliche Abklärungen.

---

## 6. Design-Ergänzungen (Nachtrag zu UB02, gilt verbindlich bis zum nächsten UB02-Update)

### 6.1 Aus Block 1 übernommen (`docs/design-ergaenzungen.md`, 20.11.2026) – geprüft und angenommen
- **Tokens:** `--text-step` (30 px), `--text-step-lg` (34 px), `--text-stat-lg` (clamp 34–52 px), `--text-addr` (clamp 18–22 px), `--text-faq` (19 px / 1,3), `font-display-black` (Archivo 900 nur Landing), `animate-sheet-in` (200 ms), `html { scroll-padding-top: 5.5rem }`, `dialog::backdrop` = `scrim` mit Scroll-Sperre.
- **Bausteine:** `ButtonLink` (Option `lift`), `CardHeader`, `StatGrid`, `LoadingNote`, `BadgeUrbownWeit`, `BadgeWartet`, `BadgeAusgeblendet`, `BadgeRole`, `FieldError`, Landing-Bausteine nach UB03 Abschnitt 6.
- **Icons neu gezeichnet:** `download`, `edit`, `trash`, `filter`, `location`, `calendar-plus`, `lock`, `external`, `crosshair` – vorläufig freigegeben, Abnahme über Icon-Tafel in UB05 (K8).
- Die Übernahme in `UB02-design.md` selbst erfolgt beim nächsten UB02-Update; bis dahin gilt dieser Abschnitt.

### 6.2 Neu in Block 2

| Baustein / Token | Inhalt / Regeln |
|---|---|
| `DownloadCard` (`components/site/`) | Zelle im `RuleGrid`: Icon `download` 28 px, h3, Text `text-ink-2`, Mono-Zeile `text-xs text-ink-2` (Typ · Seiten · Grösse), darunter Links als Button `secondary` sm (je Datei einer, `download`-Attribut, zugänglicher Name mit Dateityp und Grösse). Ganze Kachel ist **nicht** verlinkt (mehrere Ziele) |
| `CtaBand` (`components/site/`) | Sektion mit h2 (`text-display-2`), Lead, Buttons; einspaltig, linksbündig, max. 60ch |
| `RuleGrid`-Option `fillLast` | Allein stehende letzte Zelle spannt über die restlichen Spalten (K7) |
| `--text-display-1-form` | clamp(2.5rem, 5vw, 4.5rem), Zeilenhöhe 1,05 – h1 in Heros mit Formular (K2) |
| `<Brand>` | gibt «urbown» mit `whitespace-nowrap` und `hyphens: none` aus (K1) |
| `Nowrap`-Hilfe für Inhalte | kurze Bindestrich-Wörter mit Zahl zusammenhalten (K6) |

---

## 7. Offene Punkte

| # | Punkt | Wer / wann |
|---|---|---|
| 1 | Zitat und Rolle der Ansprechperson Mannheim für Referenz (Seite, Infopaket) – mit Einverständnis der Person | Marc, vor Go-Live; Einbau im nächsten Landing-Block |
| 2 | Text der Referenz Mannheim (4.5 Lead) bestätigen: stimmen die Themen? | Marc, vor Block 2 (sonst Lead streichen, nur Zahlen) |
| 3 | AV-Vertrag und Beschlussvorlage juristisch prüfen; UID und Vertretung der IXIO AG ergänzen | UB25 |
| 4 | Resend: Swiss-U.S. DPF, Alternative mit Speicherung CH/EU | UB25 |
| 5 | Kartenanbieter (Unterauftragsverarbeiter Nr. 4) festlegen und AV-Vertrag Anlage 3 nachführen | UB19, dann UB25 |
| 6 | Launch-Newsletter (Master 7): «Daten ausschliesslich in der Schweiz» ersetzen | UB27 |
| 7 | Förderstand halbjährlich prüfen (`funding.ts`, Infopaket-Quelle) | UB28 und danach laufend |
| 8 | Bildrechte Fotolia/Adobe Stock (Bildband `/staedte`) und Placeit-Mockup (`/kontakt`) bestätigen | Marc (Master 9, Punkt 6) |
