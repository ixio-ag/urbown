# urbown 2.0 – Master-Datei

Stand: 26.11.2026 (Version 8.4) · Projekt «urbown.com 2.0» · Betreiber: IXIO AG, Zug

Diese Datei ist die gemeinsame Arbeitsgrundlage für alle Projekt-Chats. **Ein Chat = eine Teilaufgabe.** Jeder Chat:
1. liest zuerst diese Datei (Projektwissen: `claude/urbown-master.md`) und die Ergebnisse der Vor-Chats,
2. setzt genau sein Arbeitspaket um,
3. legt die Ergebnisse im Projektwissen ab (Ordner `claude/UBxx-…`) und hakt das Paket in Abschnitt 6 ab,
4. endet **immer** mit drei Blöcken:
   - **Startnachricht für den nächsten Chat** (in einem Codeblock, zum Kopieren),
   - **Im nächsten Chat hochladen:** (Dateien/Screenshots, die der Projektinhaber mitgeben muss),
   - **Im Projektwissen ablegen:** (welche Dateien dort neu oder aktualisiert sind).

---

## 0. Ablauf und aktueller Stand

**Reihenfolge (verbindlich, nichts parallel):**
1. **UB00 – Prototypen prüfen** ✅ **Prototypen freigegeben am 13.11.2026** (Landingpage, mannheim, demo). Referenz Mannheim: 35 Mitglieder, 53 Immobilien (Zähler der Landingpage).
2. **UB01 – Neustart** ✅ **abgeschlossen 13.11.2026.** Plattform festgelegt: **gleicher Stack wie drivers.one** (Next.js + Supabase self-hosted auf Exoscale Zürich, Cloudflare, Resend, GitHub `ixio-ag`). Hosting nur in der Schweiz. Ergebnis: `claude/UB01-architektur.md` (Architektur, Datenmodell, Hosting-/Staging-/Backup-Plan).
3. **UB02 – Design-System** ✅ **abgeschlossen 18.11.2026.** Ergebnis: `claude/UB02-design.md` (Tokens für Tailwind CSS 4, Komponenten mit Zuständen, Barrierefreiheit WCAG 2.2 AA, Zuordnung Prototyp → Seiten), `claude/UB02-styleguide.html` (visuelle Übersicht aller Bausteine), Logos als SVG in `claude/UB02-logo/`.
4. **UB03 – Landingpage** ✅ **Spezifikation abgeschlossen 18.11.2026.** Ergebnis: `claude/UB03-landingpage-texte.md` (alle Seitentexte, Fotos, Bereich «Einblick», Kontaktformular, SEO) und `claude/UB03-claude-code-block1.md` (erster Arbeitsauftrag an Claude Code). **Claude Code Block 1 umgesetzt 20.11.2026, abgenommen mit Korrekturen 26.11.2026 (UB04).**
5. **UB04 – Städte & Ämter** ✅ **abgeschlossen 26.11.2026.** Ergebnis: `claude/UB04-kommunen.md` (Abnahme Block 1, Korrekturliste K1–K11, Förderprogramme geprüft, neue Seite `/staedte`, Downloads, Design-Ergänzungen), `claude/UB04-claude-code-block2.md` (Auftrag Block 2), 3 Downloads (Infopaket-PDF, Muster-Beschlussvorlage, AV-Vertrag-Entwurf). **Umsetzung: Claude Code, Block 2.**
6. **UB05 – Netzwerke in einer App** ⏳ *als Nächstes*, sobald Claude Code Block 2 abgeschlossen hat (UB05 beginnt mit der Abnahme von Block 2). Danach UB06, UB07 … der Reihe nach, immer nur ein Chat gleichzeitig.

Die Prototypen sind nach der Freigabe die verbindliche Vorlage für Design, Texte, Seiten, Module und Datenfelder. Die Umsetzung erfolgt auf der in UB01 festgelegten Plattform (Abschnitt 4.1) mit den Bausteinen aus UB02.

| Prototyp | Link | Quelle im Projektwissen |
|---|---|---|
| Landingpage urbown.com (inkl. «Für Städte & Ämter», Preise EUR/CHF, Netzwerke & Login, Kontakt) | https://claude.ai/artifact/CUchYLePMjf5sEAHDbEozb | `claude/prototyp/landing.html` |
| mannheim.urbown.com (alle Module, Stadt-Admin, Superadmin, Login inkl. «Passwort beim ersten Login», 2FA) | https://claude.ai/artifact/BBQNmARF7Ju9sBTM1T6wPq | `claude/prototyp/netzwerk-app.html` |
| demo.urbown.com (Kopie mit Demodaten) | https://claude.ai/artifact/Mqg6uTqmFB8NfoyxMxVFNH | gleiche Quelle, `CITY.demo = true` |
| Vision-Präsentation | https://claude.ai/artifact/Hj59PpbCuYVGnMq9kGG2pe | – |

Hinweise zu den Prototypen: Daten liegen nur im Browser (Beispieldaten). Die Karte ist eine echte OpenStreetMap-Karte; in der Vorschau von claude.ai werden die Kartenkacheln blockiert (Markierungen sind trotzdem richtig platziert), im Browser geöffnet erscheint die Strassenkarte. Adressen in den Quadraten sind im Prototyp näherungsweise platziert. Das Logo wird als Datei «logo.png» neben der Seite erwartet. E-Mails, Import per URL und Downloads sind simuliert. Die Links sind privat, bis sie über «Teilen» freigegeben werden. Schriften: Archivo (Titel), Inter (Text), IBM Plex Mono (Daten/Labels).

**Korrektur Prototyp → Umsetzung (UB01):** Die Landingpage sagt «Hosting in DE oder CH, Sie wählen den Standort». Verbindlich ist **«Hosting in der Schweiz, DSGVO- und DSG-konform»** (in UB03 umgesetzt, Texte in `claude/UB03-landingpage-texte.md`).

**Korrekturen Prototyp → Umsetzung (UB02):** Kleine Anpassungen für Barrierefreiheit und Touch (Kontrast Tertiärtext und Feldrahmen, 44-px-Bedienflächen, 16-px-Eingabefelder, Kartenkacheln in Graustufen, Logo immer als SVG). Liste: `claude/UB02-design.md` Abschnitt 2.

**Ergänzungen Prototyp → Umsetzung (UB03):** Landingpage mit **5 Fotos in Graustufen** (ruhige Bildbänder, kein Text auf Fotos) und neuem Bereich **«Einblick»** mit Bildschirmfotos der App auf Start und Funktionen, damit Interessierte die App ohne Demo sehen (bis UB24 aus dem Prototyp erzeugt, danach aus demo.urbown.com). Liste aller Änderungen: `claude/UB03-landingpage-texte.md` Abschnitt 1.

**Ergänzungen UB04:** Seite «Für Städte & Ämter» überarbeitet (Aufgabenteilung, Referenz Mannheim, Förderung Stand 11/2026, Datenschutz & Sicherheit, Unterlagen zum Download, 11 FAQ). **Hosting-Formulierung präzisiert:** «Daten in der Schweiz» bzw. «Datenbank, Dateien und Backups in der Schweiz»; die Dienstleister Cloudflare (Schutz, DNS) und Resend (E-Mail-Versand) mit Sitz in den USA werden offen genannt (AV-Vertrag, FAQ). Nicht mehr verwenden: «alle Daten ausschliesslich in der Schweiz». Design-Ergänzungen aus Block 1 sind in `claude/UB04-kommunen.md` Abschnitt 6 angenommen (bis zum nächsten UB02-Update).

## 1. Ziel

urbown.com (Landingpage), mannheim.urbown.com (erstes Stadtnetzwerk) und demo.urbown.com (exakte Kopie mit Demodaten) werden neu aufgebaut: schwarz/weiss, schnell, fürs Handy optimiert, einfach – mit Superadmin-Bereich für alle Städte, Admin-Bereich je Stadt, Newsletter und Übernahme der bestehenden Mannheimer Mitglieder.

## 2. Verbindliche Vorgaben

| Thema | Vorgabe |
|---|---|
| Design | Nur Schwarz und Weiss (plus Grautöne für Linien/Sekundärtext). **Keine dunklen Hintergründe.** Design-System: `claude/UB02-design.md` (verbindlich für alle Module), Nachtrag `claude/UB04-kommunen.md` Abschnitt 6. Logo: «urb» gefüllt, «own» als Kontur (Helvetica Bold). **SVG-Dateien aus UB02** in `claude/UB02-logo/` (mit den Original-PNGs deckungsgleich geprüft): `urbown-logo.svg` ab 40 px Höhe, **`urbown-logo-web.svg` mit kräftigerer Kontur bei «own» unter 40 px** (Kopfzeile, Sidebar, Handy), dazu Quadrat- und App-Icons. Liegt die Vektordatei des Originals vor, werden die Pfade daraus übernommen (Abschnitt 9, Punkt 1). **Fotos nur in Graustufen**, ohne Text und ohne Abdunkelung darauf (UB03). **Titel ohne automatische Silbentrennung**, «urbown» wird nie getrennt (UB04, K1). |
| Handy | Mobile first. Jede Funktion muss auf dem Smartphone voll bedienbar sein. Installierbar als Web-App (PWA). |
| Speed | Ladezeit < 1,5 s mobil, Lighthouse > 90, keine Slider-/Pagebuilder-Plugins. |
| Struktur | **Eine Web-App für alle Netzwerke** (entschieden 12.11.2026). Login zentral unter `app.urbown.com`, das System leitet nach dem Login automatisch ins eigene Netzwerk (`app.urbown.com/mannheim`). Wer in mehreren Netzwerken ist, wählt nach dem Login und wechselt oben links. `stadt.urbown.com` bleibt nur als **Kurzadresse** (Weiterleitung) für Flyer und Briefe. Jedes Netzwerk ist geschlossen (nur mit Login). Neue Features gelten sofort für alle Netzwerke und die Demo. |
| Sichtbarkeit | **Standard immer: nur im eigenen Netzwerk.** Jedes Mitglied kann sein Profil, Direktnachrichten und jeden einzelnen Inhalt (Post, Umfrage, Fläche, Inserat, Event, City News, Forenthema) für **alle urbown-Mitglieder** freigeben, unabhängig vom Netzwerk. |
| Zugang | Nur auf Einladung durch bestehende Mitglieder oder den Superadmin. |
| Sicherheit | 2-Faktor-Anmeldung (2FA) wird angeboten, ist aber **kein Muss**. Pflicht für den Superadmin; für Stadt-Admins je Netzwerk aktivierbar. |
| Superadmin | Heisst «urbown.com». Sieht und verwaltet **alles** über alle Netzwerke, kann jede Stadt als Admin betreten, versendet Newsletter. |
| Stadt-Admin | Verwaltet das eigene Netzwerk (Mitglieder, Einladungen, Moderation, Inhalte, Einstellungen). |
| Sprache | **Nur Deutsch** (Sie-Form). Keine Mehrsprachigkeit nötig. Ausnahme: Muster-Beschlussvorlage für deutsche Gemeinderäte in deutscher Rechtschreibung (UB04). |
| Migration | Bestehende Mannheimer Mitglieder werden **vor dem Livegang** per Sammelimport übernommen (Export aus dem alten WordPress: **nur Vorname, Name, E-Mail**; kein Abtippen). **Inhalte werden nicht importiert**, der Projektinhaber erfasst sie manuell; Dokumente erhalten dabei ihr ursprüngliches Datum (Feld «hochgeladen am», nur Admins). Jedes Konto erhält den Vermerk «aus altem System übernommen». **Erster Login:** Das Mitglied gibt wie gewohnt seine E-Mail ein → das System erkennt das übernommene Konto → **es erhält automatisch eine E-Mail mit einem 6-stelligen Code** (15 Minuten gültig, erneut anforderbar) → Code eingeben → neues Passwort festlegen → optional 2FA → Netzwerk. Der Hinweis «Wir haben Ihnen eine E-Mail geschickt» wird ausdrücklich angezeigt. Ohne Code-Bestätigung kein neues Passwort (Schutz vor Kontoübernahme). Zusätzlich Launch-Newsletter. Alte Passwörter werden nicht übernommen. |
| Recht | DSGVO + Schweizer DSG, **Hosting nur in der Schweiz** (Exoscale Zürich/Genf, entschieden 13.11.2026; für deutsche Städte zulässig, da die Schweiz von der EU als angemessen anerkannt ist), Barrierefreiheit nach **WCAG 2.2 AA** (Prüfliste `claude/UB02-design.md` Abschnitt 9). Unterauftragsverarbeiter offen nennen (Exoscale, Cloudflare, Resend, Kartenanbieter); AV-Vertrag-Entwurf aus UB04, Endfassung UB25. Schweizer Gemeinden unterstehen dem kantonalen Datenschutzrecht. |
| Märkte | Deutschland und Schweiz. |
| Pricing | **Öffentlich neutral, ohne Paketnamen:** «6 Monate kostenlos testen» (unverbindlich, endet automatisch) und danach ein **individuelles Angebot** als fester Jahrespreis in EUR oder CHF; für Mitglieder immer kostenlos. Keine Formulierungen wie «Die Stadt zahlt». **Intern (nur für Angebote):** Richtwerte pro Jahr klein ca. 4.800 € / CHF 5.900, mittel ca. 9.600 € / CHF 11.900, gross ab 18.000 € / CHF 21.900. Angebot früh im Pilot senden, damit die Stadt es im Haushalt einplanen kann. |

## 3. Funktionsumfang urbown 2.0 (verbindlich)

Grundlage: Feature-Liste des Projektinhabers vom 11.11.2026, ergänzt um bestehende Funktionen der öffentlichen Seiten (urbown.com, /funktionen, AGB). Erkannt im Bestand: WordPress, Qode-Theme + Slider Revolution (Landingpage), BuddyBoss (Netzwerk). **Datenfelder:** exakt nach Prototyp; Felder, die nur hier im Master stehen, sind optional und im Formular unter «Weitere Angaben» eingeklappt (Entscheid UB01). Datenmodell: `claude/UB01-architektur.md` Abschnitt 4.

### 3.1 Grundlagen
- **Optimiert fürs Handy** (mobile first, PWA).
- **Geschlossenes Netzwerk je Stadt** unter `app.urbown.com/[netzwerk]` mit Kurzadresse `[stadt].urbown.com`, nur mit Login.
- **Login in zwei Schritten:** zuerst E-Mail, dann Passwort (bzw. bei übernommenen Konten der 6-stellige Code per E-Mail, siehe Abschnitt 2 «Migration»); «Angemeldet bleiben», «Passwort vergessen» ebenfalls per 6-stelligem Code per E-Mail, **2FA optional** (App-Code, z. B. Google Authenticator; Hinweis beim ersten Login, kein Zwang).

### 3.2 Dashboard (Startseite nach dem Login)
- Bereiche: **Aktuelle Themen**, **Vakante Flächen**, **Immobilien-Inserate**, **Newsfeed** mit wichtigen aktuellen Infos.
- Im Feed direkt erstellen: **Post (Text), Bild, Video, Status, Umfrage**.
- **Umfrage wie bei WhatsApp:** Frage + Antwortoptionen, Einfach- oder Mehrfachauswahl, Live-Ergebnis in Prozent, sehen wer abgestimmt hat (optional anonym), optional Enddatum.
- **Netzwerk-Logo und Website-Button** oben im Dashboard: Ist das Netzwerk von einer Stadt, einem Verein oder einer Organisation getragen, erscheinen deren Name, Logo (Upload) und ein Button zur Website (Adresse und Button-Text einstellbar). Pflege im Admin-Bereich der Stadt und im Superadmin.
- Feed chronologisch über alle Inhaltstypen (Blog, Forum, Kommentar, Event, Umfrage, vakante Fläche, Inserat, Kartenpunkt, Dokument, Gruppe, neues Mitglied), Filter nach Typ, Markierung «neu seit letztem Besuch».

### 3.3 Mitglieder
- **Mitgliederliste** mit Suche und Filter.
- **Badge = User-Rolle**, sichtbar an Profil und Beiträgen: **Eigentümer**, **Mitarbeiter Stadt**, **Gewerbe**, **Partner** (Rollen in UB06 final bestätigen).

### 3.4 Forum
- Themen eröffnen, eigene Themen verwalten (bearbeiten, schliessen, löschen), diskutieren (Antworten, Zitieren, @Erwähnung), Kategorien.

### 3.5 City News (Blog)
- Jedes Mitglied kann Blog-Posts schreiben und verwalten.
- Felder: Titel, Text, **Titelbild**, **Quellenangabe** (Text + Link) **mit Datum**, Kategorie.

### 3.6 Events mit Kalender
- Mitglieder erstellen und verwalten Events (Titel, Datum/Zeit, Ort mit Karte, Beschreibung, Anmeldung optional; Ende und Bild optional unter «Weitere Angaben»).
- **Kalender-Ansicht** (Monat/Liste), Teilnehmerliste, Export in den eigenen Kalender (.ics).

### 3.7 Dokumente
- Hinzufügen, ändern, löschen; **Ordner** und Unterordner; **sehr übersichtlich** (Ordneransicht wie im Explorer, Suche, Dateityp-Icons, Vorschau für PDF/Bilder).
- Rechte: wer darf hochladen, ändern, löschen.
- Feld **«hochgeladen am»**: Standard heute, **nur Admins** können es zurückdatieren (für Dokumente aus dem alten WordPress).

### 3.8 Gruppen
- Arbeitsgruppen, Nachbarschaften usw. – offen oder geschlossen.
- Jede Gruppe hat **eigene Themen (Forum), Posts, Dokumente** und Mitgliederliste.

### 3.9 Karte
- Mitglieder tragen **Locations** ein: Lage (Adresse oder Klick), **Titel**, **kurze Beschreibung**, Thema.
- Aus allen Einträgen entsteht eine Gesamtkarte, **filterbar** nach Thema/Typ (inkl. vakante Flächen, Inserate, Events).
- **Echte Strassenkarte** (OpenStreetMap über Leaflet) mit realen Adressen: Adresssuche (Geocoding) beim Erfassen und Ort per Klick auf die Karte setzen. Gilt auch für vakante Flächen, Immobilien und Events.

### 3.10 Vakante Flächen (Leerstände)
Klassisches Inserat, kurz gehalten. Mitglieder erstellen, verwalten, löschen selbst.
- **Felder:** Titel, Adresse/Lage (Karte), Fläche (m²), **Schaufensterfront (m)**, **verfügbar ab**, Nutzungsart (Einzelhandel, Gastronomie, Büro, Praxis, Dienstleistung, Pop-up/Zwischennutzung), Etage, Miete (Betrag oder «auf Anfrage»), Nebenkosten, Fotos, Grundriss, Kurzbeschreibung, Status (verfügbar / reserviert / vermietet), Zwischennutzung möglich (ja/nein), barrierefrei, «anstehender Leerstand» (heute noch vermietet).
- **Optional (eingeklappt):** Lager/Nebenflächen, Raumhöhe, Lieferzone.
- Kontakt: **Anfrage per Direktnachricht** an den Inserenten.
- **Listenansicht und Kartenansicht**, Filter (Fläche, Nutzungsart, verfügbar ab).

### 3.11 Immobilien-Inserate (Verkauf)
Wie vakante Flächen, aber für den Verkauf einer Immobilie.
- **Felder:** Titel, Objektart (Wohn- und Geschäftshaus, Geschäftshaus, Gewerbe, Wohnung, Grundstück, Mehrfamilienhaus), Lage (genau oder nur Strasse/Quadrat – diskret wählbar), Grundstück (m²), Wohn-/Nutzfläche (m²), Baujahr, Kaufpreis (oder «auf Anfrage»), Mieteinnahmen p. a., Fotos, **Exposé (PDF)**, Beschreibung, Status (verfügbar / reserviert / verkauft). **Optional (eingeklappt):** Rendite.
- Anfrage per Direktnachricht. **Listenansicht und Kartenansicht.**
- **Import per URL:** teilweise möglich – siehe Abschnitt 4.3.

### 3.12 Mein Portfolio (eigenes Profil)
- Profil verwalten (Foto, Name, Unternehmen, Rolle/Badge, Lage/Objekt, Kontakt optional, 2FA ein/aus, Passwort).
- **Alle eigenen Inhalte an einem Ort steuern:** Posts, Blog-Beiträge, Forenthemen, Events, Umfragen, Dokumente, Kartenpunkte, vakante Flächen, Immobilien-Inserate, Gruppen – bearbeiten, Status ändern, löschen.
- **E-Mail-Benachrichtigungen detailliert:** Der User wählt **je Inhaltstyp** (z. B. neue vakante Fläche ja, Forum nein) und **Takt** (sofort / täglich / wöchentlich / nie). Standard laut Prototyp: Flächen, Immobilien, Events, City News sofort; neue Mitglieder nie; Übriges wöchentlich. Zusätzlich «nur meine Gruppen» und «Antworten auf meine Beiträge».

### 3.13 Personen einladen
- Einfaches Formular: **Vorname, Name, Unternehmen, E-Mail, User-Rolle**.
- Der **Netzwerk-Admin erhält eine Mail** mit den Angaben und dem Namen des einladenden Mitglieds.
- Einladung erscheint im **Admin-Dashboard** (Status: offen / freigegeben / angenommen / abgelehnt). Ablauf (in UB07 festlegen): Admin gibt frei → eingeladene Person erhält Einladungslink.

### 3.14 Nachrichten & Kommentare
- Direktnachrichten 1:1 (Pflicht für Anfragen zu Inseraten), Kommentare auf allen Inhalten, Melden-Funktion.

### 3.15 Superadmin-Dashboard (urbown.com) – alles im Detail
- **Netzwerke:** Liste aller Netzwerke mit Adresse `app.urbown.com/…` und Kurzadresse mit Kennzahlen (Mitglieder, aktiv in 30 Tagen, neue Inhalte), anlegen, klonen, sperren, **«Als Admin betreten»**, **Logo und Website-Button je Netzwerk pflegen**.
- **Alle User** aller Netzwerke (Suche, Filter nach Stadt/Rolle/Status, letzter Login, sperren, Rolle ändern, Passwort-Reset auslösen).
- **Alle Einladungen** (wer hat wen eingeladen, Status).
- **Alle Inhalte** über alle Netzwerke: vakante Flächen, Immobilien-Inserate, Events, Blog, Forum, Umfragen, Dokumente, Kartenpunkte, Gruppen – filtern, öffnen, ausblenden, löschen.
- **Sammelimport** von Mitgliedern, **Newsletter** (an alle, je Stadt, je Rolle; Vorschau, Testversand, Abmeldelink), **Export** (CSV/Excel), Statistiken.

### 3.16 Admin-Bereich je Stadt
- Gleiche Ansichten wie Superadmin, aber nur für die eigene Stadt: Mitglieder, Einladungen (inkl. Freigabe), Moderation, Kategorien/Themen der Karte, Branding (Stadtname, Titelbild, **Logo von Netzwerk/Verein, Website-Adresse und Button-Text**), «Neue Inserate vor Veröffentlichung prüfen», «2FA für alle Admins verpflichtend», Statistik, Export.

### 3.18 Netzwerkübergreifend (freiwillig)
- **Netzwerk-Wechsel** oben links; Auswahl nach dem Login bei mehreren Mitgliedschaften. Die Login-Seite verrät vor der Anmeldung nicht, in welchem Netzwerk eine E-Mail-Adresse Mitglied ist.
- **Sichtbarkeit je Inhalt:** Auswahl beim Erstellen «Nur Netzwerk [Stadt] (Standard)» oder «Alle urbown-Mitglieder». Freigegebene Inhalte tragen die Kennzeichnung «urbown-weit».
- **Dashboard:** Umschalter «Netzwerk [Stadt]» (Standard) / «urbown-weit» (alle freigegebenen Beiträge aller Netzwerke).
- **Mitglieder:** Umschalter «Netzwerk [Stadt]» / «Alle Netzwerke»; andere Netzwerke zeigen nur Mitglieder, die sich freigegeben haben.
- **Mein Portfolio → Sichtbarkeit:** Profil sichtbar für (nur Netzwerk / alle urbown-Mitglieder), Direktnachrichten annehmen von (nur Netzwerk / alle). Standard: nur Netzwerk.
- Stadt-Admins sehen und moderieren freigegebene Inhalte ihres Netzwerks; der Superadmin sieht alles.

### 3.17 Landingpage & Demo
- urbown.com neu: Startseite, Funktionen, Für Eigentümer, **Für Städte & Ämter** (eigene Seite, überarbeitet in UB04: `claude/UB04-kommunen.md` Abschnitt 4), Preise, Netzwerke & Login, Demo anfragen, Kontakt. Texte: `claude/UB03-landingpage-texte.md`, für `/staedte` `claude/UB04-kommunen.md`.
- **Downloads für Kommunen** unter `urbown.com/downloads/`: Infopaket (PDF, 8 Seiten), Muster-Beschlussvorlage (Word + PDF), AV-Vertrag-Entwurf (Word + PDF). Quelle des Infopakets im Repository unter `docs/grundlagen/downloads/infopaket-quelle/`; Förderstand halbjährlich prüfen.
- **Bereich «Einblick»** auf Start und Funktionen: Bildschirmfotos der App (Computer und Handy) aus dem Demo-Netzwerk, erzeugt per Skript `npm run screenshots` (bis UB24 aus dem Prototyp, ab UB24 aus demo.urbown.com).
- Demo: Netzwerk `demo` (`app.urbown.com/demo`, Kurzadresse demo.urbown.com), exakte Kopie eines Netzwerks mit Demodaten, nächtlicher Reset.

## 4. Technische Leitentscheidung (entschieden in UB01, 13.11.2026)

Details, Datenmodell und Pläne: `claude/UB01-architektur.md`. Gestaltung und Bausteine: `claude/UB02-design.md`.

### 4.1 Plattform
> **Entschieden: gleicher Stack wie drivers.one.** Kein WordPress, kein Laravel.

| Teil | Lösung |
|---|---|
| Web + Landingpage | **Next.js 16** (TypeScript, Tailwind CSS 4 mit Design-Tokens aus UB02) in einem Projekt; Auslieferung nach Hostname: `urbown.com` = Landingpage (statisch), `app.urbown.com` = Netzwerk-App |
| Backend | **Supabase self-hosted** (PostgreSQL 17, Auth/GoTrue, Storage, Edge Functions, `pg_cron`), Row Level Security |
| Mandanten | eine Datenbank, `network_id` in allen Inhaltstabellen, Rechte per RLS; Adressen `app.urbown.com/[netzwerk]` |
| Kurzadressen | Cloudflare Wildcard `*.urbown.com` + Weiterleitungsregel auf `app.urbown.com/[stadt]` (neue Stadt ohne Handarbeit) |
| Login | E-Mail → Passwort bzw. 6-stelliger E-Mail-Code (GoTrue-OTP, 15 Min.), 2FA per TOTP |
| Karte | Leaflet + OpenStreetMap, Kacheln (Graustufen) und Adresssuche über Vertragsanbieter (Vorschlag MapTiler, Zug; Entscheid UB19) |
| PWA | Manifest, Service Worker, Web-Push (VAPID); Icons aus `claude/UB02-logo/` |
| Hosting | **Exoscale Zürich**, eigene Instanz `urbown-prod` (Medium), Backups Object Storage **Genf**; nur Schweiz |
| Netz | Cloudflare (DNS, Proxy, WAF), Caddy mit Origin-Zertifikat, Serverzugang nur über Tailscale |
| Code | GitHub `ixio-ag/urbown` (privat), Gitleaks, Dependabot; Deployment manuell nach Freigabe (wie drivers.one) |
| Staging | bis Go-Live: Produktionsserver mit Basic-Auth unter `app.urbown.com`/`staging.urbown.com`; ab Go-Live eigene Small-Instanz nach Bedarf |
| Backups | restic verschlüsselt nach Genf, 30 Tage täglich + 12 Wochen wöchentlich, vor jeder Migration, Restore-Test monatlich; Uptime Kuma (bestehende Instanz von drivers.one) |

### 4.2 E-Mail
- **Resend** (wie drivers.one), Absender-Domain urbown.com mit SPF/DKIM/DMARC, eigene Vorlagen, Warteschlange mit Wiederholung. Newsletter als eigene Lösung mit Einzelversand, Testversand und Abmeldelink. Pro-Plan nötig (Newsletter-Volumen). Das Kontaktformular der Landingpage (UB03) sendet über Resend an info@urbown.com; die Absender-Domain muss vor dem Staging-Test bei Resend bestätigt sein (Einrichtung in UB05 zusammen mit den Cloudflare-Einträgen). **Sende-Region: Irland (`eu-west-1`)** beim Anlegen der Domain wählen (UB04). Hinweis UB04: Die Region bestimmt nur den Versandort; Konto- und Versanddaten speichert Resend in den USA (30 Tage), abgesichert über EU-U.S. Data Privacy Framework und Standardvertragsklauseln. In UB25 prüfen: Swiss-U.S.-DPF und eine Alternative mit Speicherung in CH/EU. Absender vorläufig «urbown <no-reply@urbown.com>» (endgültig UB07).

### 4.3 Inserat-Import per URL – Einschätzung
- **Gut machbar:** Import von Seiten, die strukturierte Daten liefern (eigene Website des Eigentümers/Maklers mit Schema.org- oder OpenGraph-Daten → Titel, Text, Bilder, Preis).
- **Sehr gut machbar:** Import im Branchenformat **OpenImmo (XML)**, das fast jede Makler-Software exportiert.
- **Nicht zuverlässig:** Grossportale (z. B. ImmoScout24, Immowelt) sperren automatisches Auslesen technisch und in ihren Nutzungsbedingungen. Hier: Link als Quelle speichern + **Exposé-PDF hochladen**.
- Vorgehen: Formular «Per URL importieren» → Vorschau → User ergänzt/korrigiert → speichern. Bilder nur übernehmen, wenn der User die Rechte bestätigt.

### 4.4 Arbeitsweise (wie drivers.one)
- **Projekt-Chats (UBxx)** spezifizieren, entscheiden, prüfen und pflegen Master und UB-Dateien; sie schreiben die Arbeitsaufträge an Claude Code (`claude/UBxx-claude-code-blockN.md`).
- **Claude Code** baut auf dem PC im Repository `ixio-ag/urbown` (lokaler Docker-Stack), mit `CLAUDE.md` und `docs/claude-code-uebergabe.md`. Blockarbeit, Deployment nur nach ausdrücklicher Freigabe (HALT-Regel). Claude Code liest nie Dateien mit Zugangsdaten; Secrets nur in Proton Pass (Tresor «urbown Infrastruktur») und auf dem Server.
- **Grundlagen im Repository:** Marc legt Master, UB-Dateien, Logos, Prototypen, Fotos und Downloads unter `docs/grundlagen/` ab (aktuelle Fassung aus dem Projektwissen); Claude Code verändert diesen Ordner nicht.
- **Abnahme:** Jeder Block endet mit einem Bericht von Claude Code (inkl. Lighthouse mit FCP/LCP, axe, Bildschirmfotos unter `tests/output/abnahme/`, letzter Commit). Der nächste Projekt-Chat prüft ihn zuerst und nimmt Korrekturen in den nächsten Block auf.
- **Blöcke bisher:** Block 1 (UB03) Grundgerüst, Design-System, Landingpage ✅ abgenommen 26.11.2026 · Block 2 (UB04) Korrekturen K1–K11, `/staedte`, Downloads ⏳ in Arbeit · Block 3 (UB05) Netzwerke, App-Shell, erstes Staging-Deployment.

## 5. Rollen und Rechte

| Rolle | Wo | Rechte |
|---|---|---|
| urbown.com (Superadmin) | alle | alles (siehe 3.15), 2FA Pflicht |
| Stadt-Admin | eine Stadt | siehe 3.16, Einladungen freigeben |
| Moderator (optional) | eine Stadt | Inhalte freigeben/ausblenden |
| Mitglied mit Badge: Eigentümer · Mitarbeiter Stadt · Gewerbe · Partner | eine Stadt (Badge je Netzwerk) | alle Inhalte erstellen, Personen einladen (mit Freigabe), Nachrichten |

---

## 6. Arbeitspakete – ein Chat pro Teilaufgabe

Legende: ✅ erledigt · ⏳ als Nächstes · ☐ offen

| Chat | Teilaufgabe | Status |
|---|---|---|
| UB00 | Vision, Präsentation, Master-Datei, Prototypen Landingpage + Mannheim + Demo | ✅ freigegeben 13.11.2026 |
| UB01 | Bestandsaufnahme & Architektur (Neustart) | ✅ 13.11.2026 (drivers.one-Stack, Exoscale CH) |
| UB02 | Design-System aus Prototypen ableiten | ✅ 18.11.2026 (Tokens Tailwind 4, Komponenten, Logo-SVGs, Styleguide) |
| UB03 | Landingpage urbown.com umsetzen | ✅ 18.11.2026 Texte + Auftrag Block 1; Block 1 gebaut 20.11.2026, abgenommen 26.11.2026 |
| UB04 | Abnahme Block 1 + Seite Städte & Ämter + Infopaket | ✅ 26.11.2026 (Korrekturliste K1–K11, Förderung geprüft, `/staedte` neu, 3 Downloads, Auftrag Block 2) |
| UB05 | Abnahme Block 2 + Netzwerke in einer App: Adressen, Kurzadressen, Netzwerk-Wechsel, Sichtbarkeit, Stadt-Vorlage, Klonen | ⏳ als Nächstes (nach Abschluss Block 2) |
| UB06 | Login, 2FA, Rollen & Badges | ☐ |
| UB07 | Personen einladen | ☐ |
| UB08 | Superadmin-Dashboard | ☐ |
| UB09 | Newsletter-Modul | ☐ |
| UB10 | Admin-Bereich je Stadt | ☐ |
| UB11 | Dashboard & Newsfeed (Post, Bild, Video, Status) | ☐ |
| UB12 | Umfragen (WhatsApp-Stil) | ☐ |
| UB13 | Mitgliederliste & Nachrichten | ☐ |
| UB14 | Forum | ☐ |
| UB15 | City News (Blog) | ☐ |
| UB16 | Events & Kalender | ☐ |
| UB17 | Dokumente | ☐ |
| UB18 | Gruppen | ☐ |
| UB19 | Karte | ☐ |
| UB20 | Vakante Flächen | ☐ |
| UB21 | Immobilien-Inserate + URL-Import | ☐ |
| UB22 | Mein Portfolio & E-Mail-Benachrichtigungen | ☐ |
| UB23 | Migration Mannheim & Sammelimport | ☐ |
| UB24 | demo.urbown.com live (+ Bildschirmfotos Landingpage neu) | ☐ (Prototyp vorhanden) |
| UB25 | Recht, Datenschutz, Sicherheit | ☐ |
| UB26 | Test & Go-Live | ☐ |
| UB27 | Launch-Newsletter | ☐ |
| UB28 | Vertrieb & Akquise Städte | ☐ |

Jedes Paket unten enthält: Inhalt · Ergebnis · Startnachricht (kopierbar) · Hochladen im Chat · Projektwissen.
**Für alle Bau-Pakete ab UB03 gilt:** Oberfläche nur mit den Bausteinen und Tokens aus `claude/UB02-design.md` (Nachtrag `claude/UB04-kommunen.md` Abschnitt 6); neue Bausteine dort nachtragen (bis zum nächsten UB02-Update sammelt Claude Code sie in `docs/design-ergaenzungen.md`; die Landing-Bausteine stehen in `claude/UB03-landingpage-texte.md` Abschnitt 6).

---

### UB01 – Bestandsaufnahme & Architektur ✅
**Ergebnis (13.11.2026):** `claude/UB01-architektur.md` – Bestandsaufnahme, Plattform (drivers.one-Stack), Adressen und Mandanten, Login-Ablauf, Datenmodell aller Module nach Prototyp, Hosting-/Staging-/Backup-Plan, Arbeitsweise, To-dos.

---

### UB02 – Design-System & Mockups ✅
**Inhalt:** Farben (Schwarz, Weiss, 2–3 Grautöne), Schrift, Raster, Komponenten (Buttons, Formulare, Cards, Feed-Eintrag, Badges, Navigation mobil/desktop, Tabellen, Kartenansicht). Mockups: Landingpage, Kommunen-Seite, Login, Dashboard, vakante Fläche (Liste/Karte/Detail), Inserat, Portfolio, Einladungsformular, Superadmin. Mobile zuerst. Umsetzung als Design-Tokens für **Tailwind CSS 4** (Next.js), Logo als SVG.
**Ergebnis (18.11.2026):**
- `claude/UB02-design.md` – Grundsätze, Anpassungen für Barrierefreiheit, Tokens (Farben mit Kontrastwerten, Schriften, Grössen, Abstände, Radien, Breakpoints), fertige `globals.css` mit `@theme` (mit Tailwind 4 kompiliert und geprüft), Logo-Regeln, Icons, Layout, 17 Komponenten mit Zuständen, Prüfliste WCAG 2.2 AA, Zuordnung Prototyp → Seiten (die freigegebenen Prototypen sind die Mockups), Übergabe an Claude Code.
- `claude/UB02-styleguide.html` – sichtbare Übersicht aller Bausteine und Zustände (Desktop und Handy geprüft).
- `claude/UB02-logo/` – `urbown-logo.svg`, `urbown-logo-web.svg` (kräftigere Kontur «own»), `urbown-quadrat.svg`, `urbown-icon.svg`, `urbown-icon-maskable.svg`. Aus Helvetica-Bold-Geometrie nachgezeichnet und mit den Original-PNGs deckungsgleich geprüft.
- Nachtrag (UB04): Design-Ergänzungen aus Block 1 und Block 2 in `claude/UB04-kommunen.md` Abschnitt 6, beim nächsten UB02-Update übernehmen.

---

### UB03 – Landingpage urbown.com ✅
**Inhalt:** Landingpage im Next.js-Projekt (statisch gerendert, ohne Pagebuilder); Seiten: Startseite, Für Eigentümer, Für Städte & Ämter, Funktionen, Preise, Netzwerke & Login, Kontakt (Formular mit Turnstile, Versand über Resend), Impressum/AGB/Datenschutz (Platzhalter bis UB25). Texte aus dem Prototyp; Hosting-Text «Hosting in der Schweiz». SEO-Grundlagen, Lighthouse > 90. Erster Block für Claude Code inkl. Repository-Grundgerüst (`CLAUDE.md`, Docker-Stack lokal) und Design-System-Grundlage aus UB02.
**Ergebnis (18.11.2026):**
- `claude/UB03-landingpage-texte.md` – Änderungen gegenüber dem Prototyp, Adressen, Kopf/Footer, SEO-Titel und -Beschreibungen, alle Seitentexte, Kontaktformular mit Meldungen und Mailtext, Rechtstext-Platzhalter, 404, Fotos, Bereich «Einblick», Landing-Bausteine. (`/staedte` ersetzt durch UB04 Abschnitt 4.)
- `claude/UB03-claude-code-block1.md` – Vorbereitung für Marc, Nachricht an Claude Code, Auftrag Block 1 (Teile A–F), Inhalt der `CLAUDE.md`.
- Fotopaket `urbown-fotos-landing.zip` (5 Fotos in Graustufen + 3 Reserve), liegt beim Projektinhaber und im Repository unter `docs/grundlagen/fotos/`.
- Entscheide: Fotos in Graustufen als Bildbänder; Bereich «Einblick» mit Bildschirmfotos; Logo-JPG nicht nötig.
- **Block 1 (Claude Code, 20.11.2026):** Repository, Docker-Stack, Next.js 16.4, Design-System (31 Bausteine, 48 Icons, `/_styleguide`), alle Landing-Seiten, Kontaktformular, 31 Tests; Lighthouse 94–100, axe 0 Verstösse. Abgenommen mit Korrekturen in UB04.

---

### UB04 – Abnahme Block 1 + Seite für Kommunen + Infopaket ✅
**Inhalt:** Abnahme von Claude Code Block 1 und Korrekturliste; urbown.com/staedte überarbeiten (Nutzen, Ablauf, Kosten + Pilot, Datenschutz & Hosting Schweiz, Förderhinweise per Websuche geprüft, Referenz Mannheim, FAQ Verwaltung, Demo-Termin); Downloads; Arbeitsauftrag Block 2.
**Ergebnis (26.11.2026):**
- `claude/UB04-kommunen.md` – Abnahme Block 1 (Lighthouse, axe, Bildschirmfotos, Abweichungen), **Korrekturliste K1–K11** (u. a. Silbentrennung in Titeln inkl. «ur-bown», Kontakt-h1, Prototyp-Hinweis im Einblick-Bild, «ß»/Dezimalpunkt in Beispieldaten, Hinweis ohne JavaScript), Antworten auf die 7 Fragen von Claude Code, **Förderprogramme Stand 11/2026** (DE: Städtebauförderung «Lebendige Zentren» 2026 mit 380 Mio. € Bundesmitteln, Landesprogramme NRW/BW, «Gewerbe zu Wohnen» KfW 266; CH: NRP, kantonale Standortförderung, EspaceSuisse; entfernt: Handlungsstrategie Leerstandsaktivierung, Modellvorhaben 2025–2030), Erkenntnis «Daten in der Schweiz» vs. US-Dienstleister, **alle Texte der neuen Seite `/staedte`**, Downloads, Design-Ergänzungen (Abschnitt 6), offene Punkte.
- `claude/UB04-claude-code-block2.md` – Vorbereitung für Marc, Nachricht an Claude Code, Auftrag Block 2 (Teile A–E: Korrekturen, Seite Städte, Downloads mit Metadaten und Kopfzeilen, Tests/Lighthouse mit FCP/LCP, Icon-Tafel).
- Downloads (beim Projektinhaber, im Repository unter `docs/grundlagen/downloads/`): `urbown-infopaket-staedte.pdf` (8 Seiten, mit Tags), `urbown-muster-beschlussvorlage.docx/.pdf` (Deutschland, Anhang Schweiz), `urbown-av-vertrag-entwurf.docx/.pdf` (Art. 28 DSGVO / Art. 9 DSG, Anlagen TOM und Unterauftragsverarbeiter), `infopaket-quelle/` (HTML-Quelle).
- Entscheide: Turnstile bleibt interaction-only mit Hinweis ohne JS; neue Icons vorläufig freigegeben (Abnahme UB05); Beispieldaten im Screenshot-Skript korrigieren; OG-Bild freigegeben; Infopaket ohne Formular herunterladbar; Beschlussvorlage in deutscher Rechtschreibung; Resend-Region Irland.

---

### UB05 – Abnahme Block 2 + Netzwerke in einer App
**Inhalt:** Zuerst Abnahme von Claude Code Block 2 (Bericht, K1–K11, `/staedte`, Downloads, Lighthouse mit FCP/LCP, Bildschirmfotos) und **Abnahme der Icon-Tafel** (`icons.png`). Dann: Netzwerke als Mandanten in einer App: Adressen `app.urbown.com/[netzwerk]`, Kurzadressen `[stadt].urbown.com` als Weiterleitung (Cloudflare-Wildcard), zentraler Login mit automatischer Weiterleitung und Netzwerk-Auswahl, Netzwerk-Wechsel, Sichtbarkeit je Inhalt und Profil (Standard nur Netzwerk, RLS), Vorlage-Netzwerk, «Neue Stadt anlegen» (< 5 Min.), «Netzwerk klonen» (für Demo), Branding je Netzwerk (Logo, Website-Button). Cloudflare-Zone urbown.com besteht seit 18.11.2026 (alle Einträge «DNS only»); in UB05 kommen die Einträge für `app`, `api`, `staging` und die Wildcard-Weiterleitung dazu (Altbestand mannheim/demo/www bleibt bis Go-Live auf Hostpoint), dazu die Resend-Domain (SPF/DKIM, **Region Irland**) für Kontaktformular und Systemmails. Exoscale-Instanz Schritt für Schritt einrichten, erstes Deployment der Landingpage auf `staging.urbown.com`. App-Shell (Sidebar, Kopfzeile Handy, Tab-Leiste mit «Erstellen») nach UB02 Abschnitt 8.13. Arbeitsauftrag Block 3 an Claude Code.
**Ergebnis:** Korrekturliste Block 2; `claude/UB05-netzwerke.md` (Anleitung neue Stadt); `claude/UB05-claude-code-block3.md`.

**Startnachricht UB05:**
```
UB05 – Abnahme Block 2 + Netzwerke in einer App.
Lies im Projektwissen «claude/urbown-master.md» (Version 8.4, Abschnitte 2, 3.18, 4), «claude/UB01-architektur.md» (Abschnitte 2.3, 4.1, 6), «claude/UB02-design.md» (Abschnitte 7.1, 8.13), «claude/UB04-kommunen.md» (Abschnitte 1.4, 4, 6) und «claude/UB04-claude-code-block2.md».
Zuerst: Prüfe mit mir den Bericht von Claude Code zu Block 2 (Korrekturen K1–K11, Seite /staedte, Downloads) anhand der Bildschirmfotos, der Icon-Tafel und der Lighthouse-Werte, nimm die neuen Icons ab und erstelle die Korrekturliste.
Aufgabe: Setze die Netzwerke als Mandanten in einer App um: app.urbown.com/[netzwerk], Kurzadressen [stadt].urbown.com als Cloudflare-Weiterleitung, zentraler Login mit automatischer Weiterleitung und Netzwerk-Auswahl, Netzwerk-Wechsel, Sichtbarkeit je Inhalt und Profil (Standard nur Netzwerk, RLS), Vorlage-Netzwerk, «Neue Stadt anlegen», «Netzwerk klonen», Branding je Netzwerk, App-Shell nach UB02. Führe mich durch die Exoscale-Instanz, die neuen Cloudflare-Einträge und die Resend-Domain (Region Irland; Zone urbown.com ist seit 18.11.2026 bei Cloudflare, Altbestand bleibt bis Go-Live unverändert) und plane das erste Deployment der Landingpage auf staging.urbown.com. Schreibe den Arbeitsauftrag Block 3 an Claude Code (Korrekturen aus der Abnahme, Netzwerke, App-Shell, Deployment-Vorbereitung).
Lege die Ergebnisse als «claude/UB05-netzwerke.md» und «claude/UB05-claude-code-block3.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB06 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** Bericht von Claude Code zu Block 2 (`docs/claude-code-uebergabe.md`); Abnahme-Bildschirmfotos aus `tests/output/abnahme/` (je Seite 360 und 1280 px, mindestens `staedte` und `kontakt`, dazu `icons.png`); `docs/design-ergaenzungen.md`; eigene Notizen/Screenshots von Auffälligkeiten; CX19-Runbook von drivers.one (`docs/cx19-produktions-deployment.md`) als Vorlage; aktueller DNS-Export aus Cloudflare (Import and Export → Export).
**Projektwissen:** master, UB01, UB02, UB04.

---

### UB06 – Login, 2FA, Rollen & Badges
**Inhalt:** Login-Seite neu (E-Mail → Passwort bzw. 6-stelliger Code), «Angemeldet bleiben», «Passwort vergessen» per Code, 2FA optional (TOTP), Pflicht-2FA für Superadmin und je Netzwerk für Admins, Rollen/Badges final (Eigentümer, Mitarbeiter Stadt, Gewerbe, Partner), Status «erster Login ausstehend». E-Mail-OTP von GoTrue zuerst mit Testkonten prüfen.
**Ergebnis:** Code; `claude/UB06-login-rollen.md`.

**Startnachricht UB06:**
```
UB06 – Login, 2FA, Rollen & Badges.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitte 3.1, 3.3, 5), «claude/UB01-architektur.md» (Abschnitt 2.4) und «claude/UB02-design.md».
Aufgabe: Baue Login (inkl. Passwort vergessen, angemeldet bleiben), optionale 2FA, Rollen mit Badges und den Login in zwei Schritten mit 6-stelligem Code per E-Mail für übernommene Konten und «Passwort vergessen» (Supabase GoTrue-OTP, eigene Mailvorlagen über Resend). Bestätige mit mir die finalen Rollen.
Lege das Ergebnis als «claude/UB06-login-rollen.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB07 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** gewünschte Rollenbezeichnungen (falls abweichend).
**Projektwissen:** master, UB01, UB02, UB05.

---

### UB07 – Personen einladen
**Inhalt:** Formular (Vorname, Name, Unternehmen, E-Mail, User-Rolle); Mail an Netzwerk-Admin mit Angaben + einladendem Mitglied; Liste im Admin-Dashboard; Freigabe durch Admin → Einladungslink an die Person; Superadmin kann direkt einladen; Ablauf/erneut senden.
**Ergebnis:** Code; E-Mail-Texte; `claude/UB07-einladen.md`.

**Startnachricht UB07:**
```
UB07 – Personen einladen.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.13), «claude/UB01-architektur.md» (Tabelle invitations) und «claude/UB06-login-rollen.md».
Aufgabe: Baue das Einladungsformular, die Admin-Benachrichtigung per Mail, die Einladungsliste mit Freigabe im Admin-Dashboard und den Einladungslink für die eingeladene Person. Schreibe alle E-Mail-Texte.
Lege das Ergebnis als «claude/UB07-einladen.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB08 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** gewünschte Absender-E-Mail-Adresse für Systemmails (Dienst: Resend, entschieden; vorläufig «urbown <no-reply@urbown.com>»).
**Projektwissen:** master, UB01, UB02, UB06.

---

### UB08 – Superadmin-Dashboard
**Inhalt:** alles aus Abschnitt 3.15 ausser Newsletter: Netzwerke, alle User, alle Einladungen, alle Inhalte aller Typen, «Als Admin betreten», Export, Statistiken. (Module, die erst später entstehen, werden über die Modul-Registry angebunden und in den jeweiligen Chats ergänzt.)
**Ergebnis:** Code; `claude/UB08-superadmin.md`.

**Startnachricht UB08:**
```
UB08 – Superadmin-Dashboard.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.15), «claude/UB01-architektur.md» (Abschnitt 3.2 Modul-Registry) sowie UB05–UB07.
Aufgabe: Baue das Superadmin-Dashboard «urbown.com» mit allen Netzwerken, allen Usern, allen Einladungen und einer erweiterbaren Übersicht aller Inhaltstypen (Modul-Registry, damit spätere Module sich selbst eintragen), «Als Admin betreten» mit Audit-Log, Export und Statistiken. Mobile bedienbar.
Lege das Ergebnis als «claude/UB08-superadmin.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB09 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB05, UB06, UB07.

---

### UB09 – Newsletter-Modul
**Inhalt:** Newsletter im Superadmin: Empfänger (alle / je Stadt / je Rolle), Editor mit schwarz/weiss-Vorlage, Vorschau, Testversand, Versand über Resend (Einzelmails per `pg_cron`, wie drivers.one), Abmeldelink, Statistik (Öffnungen/Klicks nur, wenn datenschutzkonform).
**Ergebnis:** Code; `claude/UB09-newsletter.md`.

**Startnachricht UB09:**
```
UB09 – Newsletter-Modul.
Lies im Projektwissen «claude/urbown-master.md», «claude/UB01-architektur.md» (Abschnitt 4.7) und «claude/UB08-superadmin.md».
Aufgabe: Baue das Newsletter-Modul im Superadmin (Empfängergruppen, Vorlage schwarz/weiss, Vorschau, Testversand, Abmeldelink, Statistik) nach dem Newsletter-Muster von drivers.one.
Lege das Ergebnis als «claude/UB09-newsletter.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB10 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** API-Schlüssel des E-Mail-Dienstes **nicht** in den Chat – direkt auf dem Server bzw. in Proton Pass ablegen.
**Projektwissen:** master, UB01, UB02, UB08.

---

### UB10 – Admin-Bereich je Stadt
**Inhalt:** Abschnitt 3.16 in der App unter `app.urbown.com/[netzwerk]/admin`: Mitglieder, Einladungen mit Freigabe, Moderation/Meldungen, Karten-Themen, Branding, Einstellungen (Inserate prüfen, Admin-2FA), Statistik, Export.
**Ergebnis:** Code; `claude/UB10-stadtadmin.md`.

**Startnachricht UB10:**
```
UB10 – Admin-Bereich je Stadt.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.16) sowie UB01, UB07 und UB08.
Aufgabe: Baue den Stadt-Admin-Bereich unter app.urbown.com/[netzwerk]/admin, wiederverwende die Ansichten aus dem Superadmin, beschränkt auf die eigene Stadt.
Lege das Ergebnis als «claude/UB10-stadtadmin.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB11 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB07, UB08.

---

### UB11 – Dashboard & Newsfeed
**Inhalt:** Startseite mit Bereichen Aktuelle Themen, Vakante Flächen, Immobilien-Inserate, Nächste Events, Newsfeed; Erstellen von Post, Bild, Video (Upload oder YouTube/Vimeo-Link), Status; Kommentare, Gefällt mir; Filter; «neu seit letztem Besuch»; Feed-Index (`activities`), über den alle späteren Module im Feed erscheinen.
**Ergebnis:** Code; `claude/UB11-dashboard.md`.

**Startnachricht UB11:**
```
UB11 – Dashboard & Newsfeed.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.2), «claude/UB01-architektur.md» (Abschnitte 3, 4.2), «claude/UB02-design.md» und «claude/UB08-superadmin.md».
Aufgabe: Baue das Dashboard nach dem Login mit Aktuelle Themen, Vakante Flächen, Immobilien-Inserate (vorerst Platzhalter) und Newsfeed mit Post, Bild, Video, Status, Kommentaren. Definiere die Feed-Schnittstelle für alle späteren Module.
Lege das Ergebnis als «claude/UB11-dashboard.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB12 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB08.

---

### UB12 – Umfragen
**Inhalt:** Umfrage wie WhatsApp direkt im Feed erstellen (Frage, Optionen, Einfach/Mehrfach, Enddatum, anonym optional), Live-Ergebnis, Benachrichtigung bei Ende.
**Ergebnis:** Code; `claude/UB12-umfragen.md`.

**Startnachricht UB12:**
```
UB12 – Umfragen (WhatsApp-Stil).
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.2), «claude/UB01-architektur.md» (Abschnitt 4.2) und «claude/UB11-dashboard.md».
Aufgabe: Baue Umfragen, die man direkt im Feed so einfach wie bei WhatsApp erstellt und beantwortet, inkl. Live-Ergebnis, Enddatum, optional anonym. Melde das Modul im Feed und im Superadmin an.
Lege das Ergebnis als «claude/UB12-umfragen.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB13 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB11.

---

### UB13 – Mitgliederliste & Nachrichten
**Inhalt:** Mitgliederliste mit Badge, Suche, Filter nach Rolle, Umschalter Netzwerk/Alle Netzwerke; Profil (für Mitglieder); Direktnachrichten 1:1 mit Benachrichtigung; Melden/Blockieren.
**Ergebnis:** Code; `claude/UB13-mitglieder.md`.

**Startnachricht UB13:**
```
UB13 – Mitgliederliste & Nachrichten.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitte 3.3, 3.14, 3.18), «claude/UB01-architektur.md» und «claude/UB06-login-rollen.md».
Aufgabe: Baue die Mitgliederliste mit Badges und Filter, das Mitgliederprofil und Direktnachrichten (auch als Anfrage-Kanal für Inserate, mit Prüfung «Direktnachrichten annehmen von»).
Lege das Ergebnis als «claude/UB13-mitglieder.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB14 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB06, UB11.

---

### UB14 – Forum
**Inhalt:** Kategorien, Themen eröffnen/verwalten/schliessen, Antworten, Zitieren, @Erwähnung, Abonnieren, im Feed sichtbar.
**Ergebnis:** Code; `claude/UB14-forum.md`.

**Startnachricht UB14:**
```
UB14 – Forum.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.4), «claude/UB01-architektur.md» (Abschnitt 4.4) und «claude/UB11-dashboard.md».
Aufgabe: Baue das Forum (Themen eröffnen, verwalten, diskutieren), angebunden an Feed und Superadmin.
Lege das Ergebnis als «claude/UB14-forum.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB15 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** gewünschte Kategorien (falls abweichend vom Prototyp).
**Projektwissen:** master, UB01, UB02, UB11.

---

### UB15 – City News (Blog)
**Inhalt:** Jedes Mitglied schreibt/verwaltet Blog-Posts; Titelbild; Quellenangabe (Text, Link, Datum); Kategorie; im Feed.
**Ergebnis:** Code; `claude/UB15-citynews.md`.

**Startnachricht UB15:**
```
UB15 – City News (Blog).
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.5), «claude/UB01-architektur.md» (Abschnitt 4.4) und «claude/UB11-dashboard.md».
Aufgabe: Baue City News, in denen jedes Mitglied Beiträge mit Titelbild und Quellenangabe (Text, Link, Datum) schreibt und verwaltet. Einfacher Editor, mobil bedienbar.
Lege das Ergebnis als «claude/UB15-citynews.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB16 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** gewünschte Kategorien (falls abweichend vom Prototyp).
**Projektwissen:** master, UB01, UB02, UB11.

---

### UB16 – Events & Kalender
**Inhalt:** Events erstellen/verwalten, Kalender (Monat/Liste), Anmeldung optional, Teilnehmerliste, .ics-Export, Ort auf Karte.
**Ergebnis:** Code; `claude/UB16-events.md`.

**Startnachricht UB16:**
```
UB16 – Events & Kalender.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.6), «claude/UB01-architektur.md» (Abschnitt 4.4), «claude/UB02-design.md» (Abschnitt 8.15) und «claude/UB11-dashboard.md».
Aufgabe: Baue Events mit Kalenderansicht, die Mitglieder selbst erstellen und verwalten, inkl. Anmeldung, Teilnehmerliste und Kalender-Export.
Lege das Ergebnis als «claude/UB16-events.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB17 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB11.

---

### UB17 – Dokumente
**Inhalt:** Ordner/Unterordner, hochladen, umbenennen, verschieben, ändern (neue Version), löschen; sehr übersichtliche Ordneransicht; Suche; Vorschau; Rechte; Feld «hochgeladen am» (Rückdatierung nur Admins).
**Ergebnis:** Code; `claude/UB17-dokumente.md`.

**Startnachricht UB17:**
```
UB17 – Dokumente.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.7), «claude/UB01-architektur.md» (Abschnitt 4.5) und «claude/UB02-design.md» (Abschnitt 8.16).
Aufgabe: Baue eine sehr übersichtliche Dokumentenverwaltung mit Ordnern (hinzufügen, ändern, löschen, verschieben, Suche, Vorschau, Rechte), wiederverwendbar für Gruppen. Admins können das Datum «hochgeladen am» zurückdatieren.
Lege das Ergebnis als «claude/UB17-dokumente.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB18 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** gewünschte Start-Ordnerstruktur.
**Projektwissen:** master, UB01, UB02.

---

### UB18 – Gruppen
**Inhalt:** Gruppen (offen/geschlossen) mit eigenem Feed, eigenen Themen, Posts, Dokumenten, Mitgliederliste; Gruppenleitung.
**Ergebnis:** Code; `claude/UB18-gruppen.md`.

**Startnachricht UB18:**
```
UB18 – Gruppen.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.8), «claude/UB01-architektur.md» (Abschnitt 4.5) sowie UB11, UB14 und UB17.
Aufgabe: Baue Gruppen (Arbeitsgruppen, Nachbarschaften) mit eigenem Feed, Forum, Posts und Dokumenten, wiederverwende die bestehenden Module.
Lege das Ergebnis als «claude/UB18-gruppen.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB19 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** Liste heutiger Gruppen in Mannheim.
**Projektwissen:** master, UB01, UB02, UB11, UB14, UB17.

---

### UB19 – Karte
**Inhalt:** Locations eintragen (Adresse/Klick, Titel, Kurzbeschreibung, Thema), Gesamtkarte mit Filtern, Cluster, mobile Bedienung; Karten-Komponente wiederverwendbar für vakante Flächen, Inserate, Events; Entscheid Kartenanbieter (Kacheln in Graustufen + Adresssuche). Danach Anlage 3 des AV-Vertrags (UB04) mit dem gewählten Anbieter nachführen.
**Ergebnis:** Code; `claude/UB19-karte.md`.

**Startnachricht UB19:**
```
UB19 – Karte.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.9), «claude/UB01-architektur.md» (Abschnitt 4.5), «claude/UB02-design.md» (Abschnitt 8.14) und «claude/UB11-dashboard.md».
Aufgabe: Entscheide mit mir den Kartenanbieter (Vorschlag MapTiler, Zug; Kacheln in Graustufen) und baue die Karte mit Leaflet/OpenStreetMap: Mitglieder tragen Locations mit Titel und Kurzbeschreibung ein, Gesamtkarte filterbar nach Thema/Typ. Baue die Karte als wiederverwendbare Komponente für vakante Flächen, Inserate und Events. Halte Ort der Datenverarbeitung und Vertragsgrundlage des Anbieters für den AV-Vertrag fest.
Lege das Ergebnis als «claude/UB19-karte.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB20 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** gewünschte Karten-Themen (falls abweichend: Idee, Problemstelle, Baustelle, Leerstand, Treffpunkt).
**Projektwissen:** master, UB01, UB02, UB11.

---

### UB20 – Vakante Flächen
**Inhalt:** Abschnitt 3.10 komplett: Formular kurz (Extras eingeklappt), Listen- und Kartenansicht, Filter, Anfrage per Direktnachricht, Status, selbst verwalten/löschen, Freigabe falls im Netzwerk aktiviert; im Dashboard und Superadmin.
**Ergebnis:** Code; `claude/UB20-vakante-flaechen.md`.

**Startnachricht UB20:**
```
UB20 – Vakante Flächen.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.10), «claude/UB01-architektur.md» (Abschnitt 4.3) sowie UB02, UB13 und UB19.
Aufgabe: Baue vakante Flächen als kurzes klassisches Inserat (Fläche, Schaufensterfront, verfügbar ab usw., Zusatzfelder unter «Weitere Angaben») mit Listen- und Kartenansicht, Filtern, Anfrage per Direktnachricht. Mitglieder erstellen, verwalten und löschen selbst.
Lege das Ergebnis als «claude/UB20-vakante-flaechen.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB21 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB13, UB19.

---

### UB21 – Immobilien-Inserate + URL-Import
**Inhalt:** Abschnitt 3.11 + Import per URL laut 4.3 (Schema.org/OpenGraph, OpenImmo-XML, Exposé-PDF).
**Ergebnis:** Code; `claude/UB21-immobilien.md`.

**Startnachricht UB21:**
```
UB21 – Immobilien-Inserate + URL-Import.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitte 3.11, 4.3), «claude/UB01-architektur.md» (Abschnitt 4.3) und «claude/UB20-vakante-flaechen.md».
Aufgabe: Baue Verkaufsinserate analog zu den vakanten Flächen (Listen- und Kartenansicht, Anfrage per Direktnachricht, diskrete Lage) und den Import per URL bzw. OpenImmo-XML mit Vorschau und Korrektur.
Lege das Ergebnis als «claude/UB21-immobilien.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB22 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** 2–3 Beispiel-URLs echter Inserate und, falls vorhanden, eine OpenImmo-XML-Datei.
**Projektwissen:** master, UB01, UB02, UB20.

---

### UB22 – Mein Portfolio & E-Mail-Benachrichtigungen
**Inhalt:** Abschnitt 3.12: Profil, alle eigenen Inhalte zentral verwalten, Sichtbarkeit, detaillierte Mail-Einstellungen je Inhaltstyp und Takt, Benachrichtigungen im Portal, PWA mit Web-Push.
**Ergebnis:** Code; `claude/UB22-portfolio.md`.

**Startnachricht UB22:**
```
UB22 – Mein Portfolio & E-Mail-Benachrichtigungen.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.12), «claude/UB01-architektur.md» (Abschnitt 4.7) und die Ergebnisse UB11–UB21.
Aufgabe: Baue «Mein Portfolio» (Profil + alle eigenen Inhalte aller Module zentral verwalten, Sichtbarkeit) und die detaillierten E-Mail-Benachrichtigungen je Inhaltstyp und Takt (sofort/täglich/wöchentlich/nie), dazu PWA mit Web-Push.
Lege das Ergebnis als «claude/UB22-portfolio.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB23 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB02, UB11–UB21.

---

### UB23 – Migration Mannheim & Sammelimport
**Inhalt:** Sammelimport im Superadmin und Stadt-Admin (aus Excel einfügen oder CSV: Vorname; Name; E-Mail; Rolle optional), Vorschau, Dubletten-/Fehlerprüfung; alle importierten Konten erhalten beim ersten Login automatisch eine E-Mail mit 6-stelligem Code und setzen danach ein neues Passwort. **Keine Übernahme von Inhalten** (manuelle Erfassung durch den Projektinhaber, Dokumente rückdatiert). Erst 5 Testkonten, dann Echtdaten.
**Ergebnis:** Code; Import-Protokoll; `claude/UB23-migration.md`.

**Startnachricht UB23:**
```
UB23 – Migration Mannheim & Sammelimport.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 2 Migration), «claude/UB01-architektur.md» (Tabelle imports, Abschnitt 2.4) sowie UB06 und UB08.
Aufgabe: Baue den Sammelimport (Einfügen aus Excel oder CSV) mit Vorschau und Fehlerprüfung, setze für alle importierten Konten den Status «erster Login ausstehend» (6-stelliger Code per E-Mail, danach neues Passwort). Test mit 5 Testkonten, dann Plan für den Echtimport vor dem Go-Live.
Lege das Ergebnis als «claude/UB23-migration.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB24 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** Mitgliederliste Mannheim als Excel/CSV (Spalten: Vorname, Name, E-Mail, Rolle optional). **Nicht** ins Projektwissen legen (Personendaten).
**Projektwissen:** master, UB01, UB06, UB08.

---

### UB24 – demo.urbown.com
**Inhalt:** Netzwerk `demo` als Klon ohne echte Personendaten, realistische Demodaten für alle Module (aus Prototyp `seed()`, in Schweizer Schreibweise ohne «ß», Dezimalkomma), Demo-Zugänge (Mitglied, Stadt-Admin), nächtlicher Reset per `pg_cron`. Danach die **Bildschirmfotos der Landingpage** (Bereich «Einblick», UB03 Abschnitt 5) mit `npm run screenshots -- --source=demo` aus der echten Demo neu erzeugen.
**Ergebnis:** Demo live; neue Bildschirmfotos auf der Landingpage; `claude/UB24-demo.md` (Zugänge, Reset).

**Startnachricht UB24:**
```
UB24 – demo.urbown.com.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 3.17), «claude/UB01-architektur.md» (Abschnitt 4.8), «claude/UB03-landingpage-texte.md» (Abschnitt 5) und «claude/UB05-netzwerke.md».
Aufgabe: Erstelle das Demo-Netzwerk (app.urbown.com/demo, Kurzadresse demo.urbown.com) als exakte Kopie eines Netzwerks ohne echte Personendaten, fülle alle Module mit realistischen Demodaten, richte Demo-Zugänge und den nächtlichen Reset ein. Ersetze danach die Bildschirmfotos im Bereich «Einblick» der Landingpage durch Aufnahmen aus der echten Demo.
Lege das Ergebnis als «claude/UB24-demo.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB25 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** —
**Projektwissen:** master, UB01, UB03, UB05.

---

### UB25 – Recht, Datenschutz, Sicherheit
**Inhalt:** Datenschutzerklärung (DSGVO + DSG, nur tatsächlich genutzte Dienste: Exoscale, Cloudflare inkl. Turnstile, Resend, Kartenanbieter), AGB (neue Funktionen, Pricing), Impressum vollständig (ersetzt die Platzhalter aus UB03), Community Guide, **AV-Vertrag: Endfassung aus dem Entwurf UB04** (inkl. Abgrenzung/gemeinsame Verantwortlichkeit § 11, Resend Swiss-U.S. DPF, ggf. E-Mail-Dienst mit Speicherung CH/EU), Muster-Beschlussvorlage prüfen, Cookie-Lösung (nur notwendige Cookies), Sicherheitscheck (Updates, 2FA Admins, Rate-Limits, Backups, CSP-Hashes statt `'unsafe-inline'` prüfen), Barrierefreiheitserklärung.
**Ergebnis:** Texte; `claude/UB25-recht.md`; aktualisierte Downloads.

**Startnachricht UB25:**
```
UB25 – Recht, Datenschutz, Sicherheit.
Lies im Projektwissen «claude/urbown-master.md», «claude/UB01-architektur.md» (Abschnitte 5 und 6), «claude/UB02-design.md» (Abschnitt 9, Barrierefreiheit), «claude/UB03-landingpage-texte.md» (Abschnitte 3.7 und 3.8) und «claude/UB04-kommunen.md» (Abschnitte 3, 5, 7).
Aufgabe: Aktualisiere Datenschutzerklärung, AGB, Impressum, Community Guide, AV-Vertrag (Endfassung aus dem Entwurf UB04), Cookie-Lösung und Barrierefreiheitserklärung für urbown 2.0 und führe einen Sicherheitscheck durch. Nutze die Erkenntnisse aus der Rechtstexte-Prüfung von drivers.one. Hinweis: Entwürfe, juristische Prüfung durch Anwalt empfohlen.
Lege das Ergebnis als «claude/UB25-recht.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB26 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** aktuelle AGB/Datenschutz von urbown (oder Link), Anwaltspaket/Rechtstexte von drivers.one als Vorlage, Handelsregister-/UID-Angaben der IXIO AG, `urbown-av-vertrag-entwurf.docx` und `urbown-muster-beschlussvorlage.docx` aus UB04.
**Projektwissen:** master, UB01, UB02, UB03, UB04.

---

### UB26 – Test & Go-Live
**Inhalt:** Testliste (alle Rollen, alle Module, Handy/Desktop, Ladezeiten, E-Mails, Barrierefreiheit), Go-Live-Plan (DNS-Umstellung urbown.com und Kurzadressen, Basic-Auth entfernen, `SITE_INDEXABLE=true`, WordPress archivieren, Rollback), Monitoring.
**Ergebnis:** Testprotokoll; `claude/UB26-golive.md`.

**Startnachricht UB26:**
```
UB26 – Test & Go-Live.
Lies im Projektwissen «claude/urbown-master.md» und alle Ergebnisse UB01–UB25.
Aufgabe: Erstelle die Testliste für alle Rollen und Module (Handy zuerst, inkl. Barrierefreiheits-Prüfliste aus UB02), werte meine Testergebnisse aus und erstelle den Go-Live-Plan inkl. DNS-Umstellung, Rollback und Monitoring.
Lege das Ergebnis als «claude/UB26-golive.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB27 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** Screenshots/Notizen von Fehlern aus dem eigenen Test.
**Projektwissen:** master, alle UB-Dateien.

---

### UB27 – Launch-Newsletter
**Inhalt:** Entwurf Abschnitt 7 mit den tatsächlich umgesetzten Features finalisieren (Datenschutz-Satz nach UB04 Abschnitt 3), im Newsletter-Modul gestalten, Testversand, Versand an Mannheim.
**Ergebnis:** Newsletter versendet; `claude/UB27-newsletter.md`.

**Startnachricht UB27:**
```
UB27 – Launch-Newsletter.
Lies im Projektwissen «claude/urbown-master.md» (Abschnitt 7) sowie UB09, UB23 und UB26.
Aufgabe: Finalisiere den Launch-Newsletter mit allen tatsächlich umgesetzten Features, setze ihn im Newsletter-Modul um, Testversand an mich, dann Versandplan für Mannheim.
Lege das Ergebnis als «claude/UB27-newsletter.md» ab, Status in der Master-Datei aktualisieren.
Am Ende: Startnachricht UB28 im Codeblock, Upload-Liste, Projektwissen-Liste.
```
**Im Chat hochladen:** Screenshot des Testversands.
**Projektwissen:** master, UB09, UB23, UB26.

---

### UB28 – Vertrieb & Akquise Städte
**Inhalt:** 30 Zielstädte mit Ansprechrollen, Akquise-Mail, Telefonleitfaden, Präsentation Erstgespräch, Förderleitfaden je Bundesland (Start Baden-Württemberg) und Schweiz (SECO/NRP, Kantone, EspaceSuisse), Fallstudie Mannheim. Förderstand aus UB04 Abschnitt 2 aktualisieren (Infopaket-Quelle und `funding.ts`), nächste Generation der Modellvorhaben vormerken.
**Ergebnis:** `claude/UB28-vertrieb.md` + Präsentation.

**Startnachricht UB28:**
```
UB28 – Vertrieb & Akquise Städte.
Lies im Projektwissen «claude/urbown-master.md», «claude/UB04-kommunen.md» und die Vision-Präsentation.
Aufgabe: Erstelle Zielstädte-Liste (30, Deutschland und Schweiz), Akquise-Mail, Telefonleitfaden, Präsentation fürs Erstgespräch, Förderleitfaden Baden-Württemberg und Schweiz und Fallstudie Mannheim. Aktuelle Förderprogramme per Websuche prüfen und den Förderstand von Infopaket und Website nachführen.
Lege das Ergebnis als «claude/UB28-vertrieb.md» ab, Status in der Master-Datei aktualisieren.
```
**Im Chat hochladen:** Kennzahlen Mannheim nach Launch (Mitglieder, Aktivität, Leerstände); Infopaket-Quelle (`docs/grundlagen/downloads/infopaket-quelle/`).
**Projektwissen:** master, UB02 (Logo), UB04.

---

## 7. Entwurf Launch-Newsletter (Mannheim)

**Betreff:** Ihr urbown ist neu – bitte einmal Passwort festlegen
**Vorschautext:** Neues Design, fürs Handy gemacht, einfacher – alles Neue auf einen Blick.

---

Guten Tag {Vorname} {Name}

urbown Mannheim hat ein komplettes Update erhalten: klarer, schneller, fürs Handy gemacht und deutlich einfacher zu bedienen.

**So melden Sie sich beim ersten Mal an**
1. Öffnen Sie app.urbown.com (oder wie bisher mannheim.urbown.com) und geben Sie Ihre E-Mail-Adresse ein.
2. Sie erhalten automatisch eine E-Mail mit einem 6-stelligen Code.
3. Code eingeben, neues Passwort festlegen, fertig. Das dauert weniger als eine Minute.

[ Jetzt anmelden ]

**Was ist neu?**
- **Neues Design, fürs Handy optimiert** – und als App auf dem Startbildschirm installierbar.
- **Ihr Dashboard:** Aktuelle Themen, vakante Flächen, Immobilien-Inserate und alle Neuigkeiten direkt nach dem Login.
- **Posten wie gewohnt:** Text, Bild, Video oder Status – und **Umfragen so einfach wie bei WhatsApp**.
- **Vakante Flächen:** kurz und übersichtlich inserieren – mit Fläche, Schaufensterfront und «verfügbar ab», in Liste und Karte.
- **Immobilien diskret verkaufen:** Inserate nur für Mitglieder, Anfragen per Direktnachricht.
- **City News:** Jedes Mitglied kann eigene Beiträge schreiben – mit Bild und Quellenangabe.
- **Events mit Kalender**, **Forum**, **Gruppen** mit eigenen Themen und Dokumenten.
- **Dokumente in Ordnern** – übersichtlich ablegen, ändern, finden.
- **Karte:** Orte mit Titel und Kurzbeschreibung eintragen und nach Themen filtern.
- **Mein Portfolio:** alle Ihre Beiträge, Inserate und Events an einem Ort – und Sie bestimmen genau, wofür Sie E-Mails erhalten.
- **Mehr Sicherheit:** optionale 2-Faktor-Anmeldung, Ihre Daten werden in der Schweiz gespeichert. *(Formulierung UB04: nicht «ausschliesslich»)*
- **Personen einladen:** Eigentümer und Partner mit wenigen Angaben ins Netzwerk einladen.
{in UB27 mit tatsächlich umgesetzten Features abgleichen}

Fragen? Antworten Sie einfach auf diese E-Mail oder schreiben Sie an info@urbown.com.

Herzliche Grüsse
Ihr urbown Team

urbown.com · IXIO AG · Bahnhofplatz · 6300 Zug · Abmelden · Datenschutz

---

## 8. Ideen-Speicher (noch nicht entschieden, nicht im Pflichtumfang)

| Idee | Nutzen |
|---|---|
| Gemeinsam günstiger: Sammelaufträge (Reinigung, Winterdienst, Energie, Versicherung, Sicherheitsdienst) | Direkte Ersparnis für Eigentümer |
| Empfehlungen aus dem Netzwerk (Handwerker, Verwaltungen, Dienstleister; nur Mitglieder bewerten) | Vertrauen, Alltagsnutzen |
| Mitmach-Aktionen mit Zusagen (Betrag oder Mithilfe, Fortschrittsbalken) | Gemeinsame Projekte finanzieren |
| Mängel an die Stadt melden, mit Foto, Kartenpunkt und Status | Sichtbare Reaktion der Stadt |
| Wichtige Mitteilungen der Stadt hervorgehoben + Push | Nichts Wichtiges übersehen |
| Ladeneinrichtungs-Börse | Auszug/Einzug erleichtern |
| «Meine Objekte»: private Ablage pro Gebäude mit Fristen-Erinnerung | Täglicher Nutzen für Eigentümer |
| Event-Widget für Websites von Stadt/Verein | Sichtbarkeit nach aussen |
| Native App (iOS/Android) über Expo, gleicher Backend-Stack wie drivers.one | Präsenz in den App-Stores |
| Kurzes Erklärvideo (60–90 s) auf der Landingpage, aus Bildschirmaufnahmen der Demo | Einstieg ohne Demo-Termin |
| Vorlage Einladungsbrief der Stadt an die Eigentümer (Word) als vierter Download | Start des Pilots erleichtern (UB04 verspricht Briefvorlage im Ablauf; spätestens bis zum ersten Pilot erstellen) |

## 9. Offene Punkte / Input vom Projektinhaber

1. Vektordatei des Logos (SVG, AI, EPS oder PDF), falls vorhanden. **Stand UB03 (18.11.2026):** nicht nötig für den Start – die SVGs in `claude/UB02-logo/` sind aus der Helvetica-Bold-Geometrie nachgezeichnet und mit den PNGs deckungsgleich. **Ein JPG bringt nichts.** Nur eine echte Vektordatei würde die Pfade ersetzen; taucht sie auf, im nächsten Chat hochladen.
2. Mitgliederliste Mannheim, Vorname/Name/E-Mail (für UB23).
3. ~~Entscheid Hosting DE/CH und GitHub-Repository~~ → entschieden in UB01: Schweiz (Exoscale), Repository `ixio-ag/urbown`. **Stand 18.11.2026:** GitHub-Repository `ixio-ag/urbown` angelegt ✅ · Proton-Pass-Tresor «urbown Infrastruktur» ✅ · Cloudflare-Zone urbown.com angelegt ✅ (Konto info@ixio.ch, 57 Einträge 1:1 aus der Hostpoint-Zone inkl. Wildcards, DKIM, DMARC, SPF; alle «DNS only»; DNSSEC aus; Registrar bleibt Hostpoint). Nameserver-Umstellung auf `curt.ns.cloudflare.com` / `nucum.ns.cloudflare.com` durch Marc, danach Test Websites + Mail senden/empfangen. Hinweise: Hostpoint-Zone nicht löschen (Rückweg); falls Hostpoint DKIM-Schlüssel erneuert, in Cloudflare nachtragen; SSL-Erneuerung der WordPress-Seiten in 2–3 Monaten prüfen.
4. Bestätigung Pricing DE/CH + Pilot (6 Monate gratis, erste 10 Städte).
5. Zieltermin Go-Live.
6. **Bildrechte Landingpage (UB03):** Lizenz für die drei Fotolia-/Adobe-Stock-Bilder (Fussgängerzone auf `/staedte`, zwei in Reserve) sowie das Placeit-Mockup mit der urbown-Tasche (eingesetzt auf `/kontakt`) bestätigen. Die übrigen Fotos stammen von Pexels/Unsplash/Pixabay (frei nutzbar).
7. ~~Claude Code Block 1 starten~~ ✅ erledigt (20.11.2026). **Neu: Claude Code Block 2 starten** nach `claude/UB04-claude-code-block2.md` Teil 1 (Grundlagen und Downloads unter `docs/grundlagen/`, optional drivers.one-`CLAUDE.md`), dann Nachricht aus Teil 2.
8. **Referenz Mannheim (UB04):** Zitat und Rolle der Ansprechperson bei der Stadt (mit Einverständnis) für `/staedte` und Infopaket; Text der Referenz (`UB04-kommunen.md` 4.5) bestätigen.
9. **Förderprogramme:** BW-«Sofortprogramm Einzelhandel/Innenstadt» endet am 31.12.2026 (Antrag ≥ 10 Wochen vor Vorhabenbeginn) – für Mannheim nur noch nutzbar, wenn kurzfristig ein Vorhaben ansteht; sonst entfällt es im nächsten Förderstand.
