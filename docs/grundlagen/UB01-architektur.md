# UB01 – Bestandsaufnahme & Architektur (final)

Stand: 13.11.2026 · Projekt «urbown.com 2.0» · Ergebnis des neuen UB01 (ersetzt den Entwurf vom 11.11.2026)
Grundlage: Master-Datei Version 7 («Prototypen freigegeben»), Prototypen `claude/prototyp/landing.html` und `claude/prototyp/netzwerk-app.html`, Vorarbeit UB01, Stack-Steckbrief und MASTER von drivers.one (13.11.2026).

**Kernentscheide (Marc, 13.11.2026)**
1. **Gleicher Stack wie drivers.one:** Next.js + Supabase self-hosted (PostgreSQL 17) auf **Exoscale Zürich**, Cloudflare, Caddy, Tailscale, restic → Object Storage Genf, Uptime Kuma, Resend, GitHub-Organisation `ixio-ag`, Proton Pass. Kein WordPress, kein Laravel (der Laravel-Vorschlag der Vorarbeit ist verworfen).
2. **Hosting nur in der Schweiz** für alle Städte (DE und CH). Die Landingpage sagt künftig «Hosting in der Schweiz, DSGVO- und DSG-konform» statt «Sie wählen den Standort».
3. **Migration:** Übernommen werden nur die Mannheimer Mitglieder (Vorname, Name, E-Mail). Inhalte erfasst Marc selbst. Die Zahlen «35 Mitglieder / 53 Immobilien» sind nur die Zähler auf der Landingpage.
4. **Datenfelder:** exakt nach Prototyp. Zusatzfelder aus dem Master (Nebenfläche, Raumhöhe, Lieferzone, Rendite, Event-Ende, Event-Bild) sind **optional**, im Formular eingeklappt unter «Weitere Angaben».
5. **Dokumente rückdatierbar:** Feld «hochgeladen am». Nur Stadt-Admin und Superadmin dürfen es ändern, für die nachträgliche Erfassung alter Dokumente aus WordPress.

---

## 1. Bestandsaufnahme

Übernommen aus der Vorarbeit (Website-Zustand-Bericht mannheim.urbown.com vom 11.11.2026), geprüft gegen die Prototypen.

### 1.1 mannheim.urbown.com (heute)
| Bereich | Befund |
|---|---|
| CMS | WordPress 6.9.1, keine Multisite, de_DE_formal, Registrierung geschlossen |
| Theme/Community | BuddyBoss Theme 2.18.0 + Child-Theme, BuddyBoss Platform 2.14.4 + Pro 2.11.0 (Aktivität, Mitglieder, Gruppen, Foren, Nachrichten, Dokumente) |
| Datenstruktur | ACF PRO 6.7 mit 19 eigenen Inhaltstypen und 13 Taxonomien |
| Pagebuilder | Elementor + Pro 3.34.3 (veraltet) |
| Weitere Plugins | Complianz, WPS Hide Login, Loco Translate, Disable Gutenberg, Yoast Duplicate Post, All-in-One WP Migration (veraltet); inaktiv: WP Rocket, pCloud Backup, **WP File Manager (löschen)** |
| Server | Hostpoint Smart Webhosting, FreeBSD, Apache, PHP 8.5, MariaDB 10.11, kein Seiten-Cache |
| Auffälligkeiten | Zeitzone UTC, WP_DEBUG_DISPLAY true, Hostinger-MU-Plugin als Überbleibsel |
| Mitglieder | 34 WordPress-Konten laut Bericht (inkl. Admin-/Testkonten); Landingpage-Zähler zeigt 35 |

**Sofortmassnahmen bis zur Ablösung (optional, 15 Min.):** WP File Manager löschen, Elementor/Complianz/All-in-One WP Migration/WPS Hide Login aktualisieren, Hostinger-MU-Plugin entfernen, Vollbackup bei Hostpoint prüfen.

### 1.2 urbown.com (heute)
WordPress mit Qode-Theme und Slider Revolution (Master Abschnitt 3). Wird komplett ersetzt, nichts wird übernommen.

### 1.3 Abgleich Bestand ↔ urbown 2.0
Keine Funktion des Bestands muss technisch erhalten bleiben. Alle Module werden nach den freigegebenen Prototypen neu gebaut. Übernommen werden nur Daten: Vorname, Name und E-Mail der Mitglieder (Sammelimport, UB23). Dokumente, Inserate und Beiträge erfasst Marc manuell neu, Dokumente mit dem ursprünglichen Datum (Feld «hochgeladen am»).

### 1.4 Korrekturen gegenüber der Vorarbeit (Prüfung gegen Prototypen)
| Vorarbeit | Verbindlich (Prototyp/Master) |
|---|---|
| Stadt wird über Subdomain erkannt (`mannheim.urbown.com`) | Eine Web-App: `app.urbown.com/[netzwerk]`; `[stadt].urbown.com` ist nur Weiterleitung |
| Erster Login per Link (14 Tage gültig) | 6-stelliger Code per E-Mail, 15 Min. gültig, erneut anforderbar |
| Keine Sichtbarkeit je Inhalt | «Nur Netzwerk» (Standard) / «Alle urbown-Mitglieder» je Inhalt, Profil und Direktnachrichten |
| Branding nur Logo | Organisation, Logo, Website-Adresse, Button-Text je Netzwerk |
| Keine Freigabe von Inseraten | Einstellung «Neue Inserate vor Veröffentlichung prüfen» je Netzwerk |
| Superadmin unter `urbown.com/admin`, Stadt-Admin unter `/verwaltung` | `app.urbown.com/superadmin`, `app.urbown.com/[netzwerk]/admin` |
| Laravel, MariaDB, Hostpoint | drivers.one-Stack (Abschnitt 2) |
| Staging per eigener Testdomain | Abschnitt 6.3 |

---

## 2. Plattform (verbindlich, ersetzt Master 4.1)

### 2.1 Warum der drivers.one-Stack
- Gleiche Werkzeuge, gleicher Betrieb, gleiche Arbeitsweise mit Claude Code: Runbooks, Backup, Monitoring, Sicherheitsregeln und Konten sind bereits erprobt.
- Hosting in der Schweiz (Exoscale Zürich/Genf), passend zum Entscheid «alles in der Schweiz».
- Supabase bringt Login, E-Mail-Code (OTP), 2FA (TOTP), Rollen über Row Level Security, Dateiablage und Hintergrundjobs (`pg_cron`) mit. Diese sicherheitskritischen Teile müssen nicht selbst gebaut werden.
- Später ist eine native App über Expo möglich, ohne dass sich das Backend ändert. Das ist nicht im Umfang, nur offen gehalten.

### 2.2 Stack urbown
| Teil | Lösung (Versionen wie drivers.one, beim Projektstart auf aktuellem Stand) |
|---|---|
| Web | **Next.js 16** (App Router, Server Components, Server Actions), React 19, TypeScript, **Tailwind CSS 4** mit Design-Tokens aus UB02. Docker-Container (Standalone-Build) |
| Landingpage | **Im selben Next.js-Projekt**, statisch gerendert (SSG), eigenes Layout. Auslieferung je nach Hostname: `urbown.com` → Landingpage, `app.urbown.com` → Netzwerk-App. Ziel Lighthouse > 90, Ladezeit < 1,5 s mobil |
| Backend | **Supabase self-hosted** (Docker Compose): PostgreSQL 17, GoTrue (Auth), PostgREST, Storage-API, Edge Functions (Deno), Kong, Supavisor, imgproxy. Realtime nur bei Bedarf (Umfragen: zuerst Nachladen per Polling) |
| Geschäftslogik | Postgres-Funktionen, Trigger und RLS sowie Edge Functions, wie drivers.one |
| Datenbank | PostgreSQL 17 mit `pg_cron`, `pg_net`, `pg_trgm`, `unaccent`. Kein ORM: nummerierte SQL-Migrationen |
| Dateien | Supabase Storage auf Block-Storage-Volume, Auslieferung nur nach Rechteprüfung (signierte URLs), Bilder über imgproxy (WebP, Grössen) |
| Karte | **Leaflet + OpenStreetMap-Daten.** Kacheln und Adresssuche über einen Anbieter mit Vertrag, Vorschlag **MapTiler (Zug)**; Entscheid in UB19. Kein Google |
| PWA | **Vollständige PWA** (neu gegenüber drivers.one): Web-App-Manifest, Service Worker (Offline-Seite, Asset-Cache), **Web-Push** (VAPID) aus Edge Functions |
| E-Mail | **Resend**, eigene Absender-Domain `urbown.com` (SPF/DKIM/DMARC), eigene Vorlagen über den GoTrue-Send-Email-Hook + Warteschlange mit Wiederholung. Newsletter als eigene Lösung wie drivers.one (Kampagnen-Tabellen, Einzelversand per `pg_cron`, Probeversand, Abmeldelink) |
| Bot-Schutz | Cloudflare Turnstile (Kontaktformular Landingpage, Login nach Fehlversuchen) |
| Analytics | keine (wie drivers.one). Für Städte gibt es die anonymisierte Auswertung im Admin-Bereich |
| Nicht nötig | Expo/EAS, RevenueCat, Stripe, Anthropic API (keine KI-Funktionen im Pflichtumfang) |

### 2.3 Adressen und Netzwerke (eine App, Mandanten)
| Adresse | Inhalt |
|---|---|
| `urbown.com` | Landingpage (öffentlich), Kontakt, Rechtstexte |
| `app.urbown.com` | zentraler Login; danach Weiterleitung ins eigene Netzwerk bzw. Auswahl bei mehreren |
| `app.urbown.com/[netzwerk]/…` | Netzwerk, z. B. `/mannheim`, `/mannheim/flaechen`, `/mannheim/admin` |
| `app.urbown.com/superadmin` | Superadmin «urbown.com» |
| `app.urbown.com/demo` | Demo-Netzwerk (Kurzadresse `demo.urbown.com`), nächtlicher Reset |
| `[stadt].urbown.com` | **nur Weiterleitung** auf `app.urbown.com/[stadt]` (Flyer, Briefe) |
| `api.urbown.com` | Supabase-API (Kong) |

**Kurzadressen ohne Handarbeit pro Stadt:** DNS-Zone `urbown.com` bei Cloudflare (wie drivers.one). Ein Wildcard-Eintrag `*.urbown.com` (proxied) plus eine Cloudflare-Weiterleitungsregel `https://*.urbown.com/*` → `https://app.urbown.com/${1}` (301). Ausnahmen für `app`, `api`, `www`, `staging` und Mail-Einträge. Konkrete Einträge haben bei Cloudflare Vorrang vor dem Wildcard. Das Zertifikat deckt Cloudflare (Universal SSL `*.urbown.com`) ab. Eine neue Stadt ist damit sofort unter ihrer Kurzadresse erreichbar. Unbekannte Kürzel landen auf dem Login. Beim Einrichten (UB05) testen.

**Mandanten-Trennung:** Jede Inhaltstabelle hat `network_id`. RLS erlaubt Lesen, wenn
(a) die Person aktives Mitglied dieses Netzwerks ist, oder
(b) der Inhalt `visibility = 'all'` hat und die Person in irgendeinem Netzwerk aktiv ist, oder
(c) die Person Superadmin ist.
Schreiben: Autor:in selbst, Admin/Moderator des Netzwerks, Superadmin. Hilfsfunktionen nach drivers.one-Muster (`has_permission`): `is_member(network_id)`, `is_network_admin(network_id)`, `is_superadmin()`. Das Muster entspricht der `club_id`-Lösung von drivers.one.

### 2.4 Login (Master Abschnitt 2 «Migration», 3.1)
Ablauf wie im Prototyp:
1. **E-Mail eingeben** → Server Action prüft serverseitig:
   - Konto mit Vermerk «erster Login ausstehend» → Schritt **Code**: `signInWithOtp` (ohne Neuanlage von Konten) verschickt automatisch eine E-Mail mit **6-stelligem Code**. Hinweis «Wir haben Ihnen eine E-Mail an j•••@… geschickt».
   - sonst → Schritt **Passwort** (auch bei unbekannter Adresse, damit die Seite nichts über Mitgliedschaften verrät).
2. **Code bestätigen** (`verifyOtp`, 15 Min. gültig, «E-Mail erneut senden» mit Rate-Limit) → **neues Passwort** (mind. 10 Zeichen, zweimal) → Vermerk gelöscht → **2FA optional** («Einrichten» / «Später») → Netzwerk bzw. Auswahl.
3. **Passwort vergessen** → ebenfalls 6-stelliger Code per E-Mail (Recovery-OTP), dann neues Passwort.
4. **Angemeldet bleiben:** Sitzung max. 30 Tage ab Passwort-Anmeldung (`GOTRUE_SESSIONS_TIMEBOX=720h`), ohne Häkchen endet die Sitzung mit dem Browser.
5. **2FA:** TOTP über Supabase MFA, freiwillig für Mitglieder. Pflicht für Admins, wenn das Netzwerk «2FA für alle Admins verpflichtend» aktiviert; für den Superadmin immer Pflicht. Kein Backup-Code: Reset durch Superadmin mit Protokoll und Info-Mail (wie drivers.one).

GoTrue-Einstellungen: OTP-Länge 6, OTP-Gültigkeit 900 s, Mail über Send-Email-Hook mit eigenen Vorlagen (Resend). Achtung: Bei drivers.one ist E-Mail-OTP ungetestet. In UB06 zuerst mit Testkonten prüfen.

### 2.5 Verworfen
- WordPress (Multisite, BuddyBoss): nicht gewünscht, plugin-abhängig, Speed-Ziel kaum erreichbar.
- Laravel bei Hostpoint (Vorarbeit): technisch möglich, aber zweiter Stack neben drivers.one mit doppeltem Betrieb.
- Eigenes PHP ohne Framework (wie reaview.com): Login, 2FA, Jobs und Rechte selbst zu bauen ist zu viel Aufwand und Risiko.
- Zweite Instanz in Deutschland: entfällt mit dem Entscheid «alles in der Schweiz».

---

## 3. Anwendungsarchitektur

### 3.1 Module (nach Prototyp-Navigation)
Netzwerk: Dashboard · Vakante Flächen · Immobilien · Forum · City News · Events · Dokumente · Gruppen · Karte · Mitglieder
Persönlich: Nachrichten · Mein Portfolio · Personen einladen
Verwaltung: Admin [Stadt] (Übersicht, Einladungen, Mitglieder, Moderation, Sammelimport, Einstellungen) · urbown.com (Netzwerke, Alle User, Einladungen, Alle Inhalte, Newsletter)
Handy: Tab-Leiste Start · Flächen · **Erstellen** (Post, Bild, Umfrage, Vakante Fläche, Immobilie, Event, City News, Forenthema, Kartenpunkt) · Nachrichten · Menü.

### 3.2 Gemeinsame Bausteine (Modul-Registry)
Jeder Inhaltstyp meldet sich in einer zentralen Registry (TypeScript-Konfiguration plus SQL-View) mit: Typ-Schlüssel und Bezeichnung (Prototyp `TYPES`), Feed-Darstellung, Spalten für «Alle Inhalte» (Superadmin) und Moderation, Eintrag in «Mein Portfolio», Benachrichtigungstyp, Kartenpunkt ja/nein.
Gemeinsam für alle Module: Kommentare, Gefällt mir, Melden, Medien, Kartenposition, Sichtbarkeit, Feed-Eintrag, Moderation (ausblenden), Papierkorb (weiches Löschen).

### 3.3 Typ-Schlüssel (aus Prototyp, für Feed, Benachrichtigungen, Portfolio)
`post` Post · `bild` Bild · `video` Video · `status` Status · `umfrage` Umfrage · `flaeche` Vakante Fläche · `immo` Immobilie · `thema` Forum · `news` City News · `event` Event · `doc` Dokument · `punkt` Kartenpunkt · `mitglied` Neues Mitglied · `gruppe` Gruppe

### 3.4 Rollen
| Ebene | Werte | Wo |
|---|---|---|
| Plattform | Superadmin «urbown.com» | `profiles.is_superadmin` |
| Netzwerk-Rolle | `admin`, `moderator`, `member` | `memberships.role` |
| Badge (sichtbar) | `eigentuemer` Eigentümer · `mitarbeiter_stadt` Mitarbeiter Stadt (gefülltes Badge) · `gewerbe` Gewerbe · `partner` Partner | `memberships.badge` (je Netzwerk) |

«Als Admin betreten»: Der Superadmin hat per RLS ohnehin alle Rechte. Die Oberfläche wechselt in die Admin-Ansicht des Netzwerks, mit Vermerk «Als urbown.com in [Stadt]» und einem Eintrag im Audit-Log.

---

## 4. Datenmodell (PostgreSQL, exakt nach Prototyp)

**Konventionen**
- Tabellen und Spalten auf Englisch (snake_case), Werte von Aufzählungen deutsch wie im Prototyp.
- Alle Inhaltstabellen haben: `id uuid`, `network_id`, `author_id` (→ profiles), `group_id` (leer = ganzes Netzwerk), `visibility` (`netz` Standard | `alle`), `moderation` (`live` | `wartet` | `ausgeblendet`), `hidden_by`, `hidden_at`, `created_at`, `updated_at`, `deleted_at` (Papierkorb).
- `visibility = 'alle'` erzeugt im Feed und in Detailansichten das Badge «urbown-weit».
- Beträge als `numeric(12,2)` in der Währung des Netzwerks (`networks.currency`: EUR oder CHF). Leer = «auf Anfrage».
- Lage: `location_text` (Adresse/Quadrat wie eingegeben) + `lat`/`lng` (Adresssuche oder Klick auf die Karte).
- **Optional** = Master-Extra, im Formular unter «Weitere Angaben».
- Interne Tabellen (Warteschlangen, Audit) im Schema `private`.

### 4.1 Plattform, Netzwerke, Personen
**`networks`** – Netzwerk (Prototyp `networks`, Formulare «Neue Stadt anlegen», «Logo & Website», Admin «Einstellungen»)
| Spalte | Typ | Prototyp / Hinweis |
|---|---|---|
| slug | text, eindeutig, `[a-z0-9-]` | Kürzel → `app.urbown.com/slug`, Kurzadresse `slug.urbown.com` |
| name | text | Stadt / Name des Netzwerks |
| country | `DE` \| `CH` | Land |
| currency | `EUR` \| `CHF` | aus Land abgeleitet, änderbar |
| contract | `pilot` \| `lizenz` \| `demo` | «Vertrag» |
| status | `in_vorbereitung` \| `aktiv` \| `gesperrt` | Status |
| pilot_ends_at | date | «Pilot: 6 Monate kostenlos, danach Angebot» |
| started_year | int | «seit 2022» |
| org_name | text | Name von Netzwerk, Verein oder Organisation |
| logo_path | text | Logo (PNG, JPG, SVG; max. 1,5 MB) |
| website_url | text | Website (https:// ergänzen) |
| website_label | text(30), Standard «Zur Website» | Text auf dem Button |
| cover_path | text | Titelbild |
| require_listing_review | bool, Standard true | «Neue Inserate vor Veröffentlichung prüfen» |
| require_admin_2fa | bool, Standard false | «2FA für alle Admins verpflichtend» |
| is_demo | bool | Demo-Netzwerk (nächtlicher Reset) |
| cloned_from | → networks | «Netzwerk klonen» |

Kennzahlen (Mitglieder, aktiv in 30 Tagen, neue Inhalte) werden per View berechnet, nicht gespeichert.

**`profiles`** – Person (1:1 zu `auth.users`; E-Mail und Passwort liegen in GoTrue)
| Spalte | Typ | Prototyp / Hinweis |
|---|---|---|
| first_name, last_name | text | Name (Einladung/Import: Vorname, Name) |
| company | text, Standard «Privat» | Unternehmen |
| location_note | text | «Lage / Objekt» (z. B. «P7, 14») |
| avatar_path | text | Profilfoto |
| phone, website | text | **optional** (Master 3.12 «Kontakt») |
| profile_visibility | `netz` \| `alle` | «Mein Profil ist sichtbar für» |
| dm_from | `netz` \| `alle` | «Direktnachrichten annehmen von» |
| is_superadmin | bool | |
| legacy_import | bool | Vermerk «aus altem System übernommen» |
| first_login_pending | bool | Status «Erster Login ausstehend» → Code-Login |
| status | `aktiv` \| `gesperrt` | Sperren (Superadmin) |
| last_login_at | timestamptz | Superadmin «letzter Login» |

**`memberships`** – Mitgliedschaft in einem Netzwerk
| Spalte | Typ | Hinweis |
|---|---|---|
| user_id, network_id | | eindeutig zusammen |
| role | `admin` \| `moderator` \| `member` | |
| badge | `eigentuemer` \| `mitarbeiter_stadt` \| `gewerbe` \| `partner` | Admin «Rolle» änderbar |
| status | `aktiv` \| `gesperrt` | Admin «Sperren/Entsperren» |
| joined_at | timestamptz | «Mitglied seit» |
| last_visit_at, prev_visit_at | timestamptz | «neu seit Ihrem letzten Besuch» |

**`invitations`** – Personen einladen (Prototyp `invites`)
| Spalte | Hinweis |
|---|---|
| network_id, invited_by | einladendes Mitglied (oder Superadmin) |
| first_name, last_name, company, email, badge | Formular: Vorname, Name, Unternehmen («oder Privat»), E-Mail, User-Rolle |
| status | `offen` \| `freigegeben` \| `angenommen` \| `abgelehnt` \| `abgelaufen` |
| decided_by, decided_at | Freigabe/Ablehnung durch Admin |
| token_hash, expires_at | persönlicher Einladungslink nach Freigabe (Gültigkeit in UB07) |
| resent_at | «Erneut senden» |
| accepted_user_id | |

**`imports`** – Sammelimport (Admin-Tab und Superadmin)
`network_id`, `run_by`, `rows_total`, `rows_ok`, `errors jsonb`, `created_at`. Format: `Vorname; Name; E-Mail; Rolle` (Rolle optional, Standard Eigentümer; Trennzeichen `;` oder Tab). Prüfungen wie Prototyp: «Name fehlt», «E-Mail ungültig», «bereits vorhanden». Ergebnis: Konto ohne Passwort, `legacy_import = true`, `first_login_pending = true`, Mitgliedschaft im Netzwerk.

**`private.audit_log`**: actor_id, action, target_type, target_id, network_id, ip, created_at (Superadmin-Eintritt, Rollenwechsel, Sperren, 2FA-Reset, Import, Löschungen durch Admins).

### 4.2 Dashboard, Feed, Umfragen
**`posts`** – Feed-Beitrag (Composer: Post, Bild, Video, Status, Umfrage)
| Spalte | Hinweis |
|---|---|
| type | `post` \| `bild` \| `video` \| `status` \| `umfrage` |
| text | Text bzw. Frage der Umfrage |
| image_path | bei `bild` |
| video_url | bei `video` (Link zu YouTube oder Vimeo) |
| + Standardspalten | `group_id` gesetzt = Beitrag in einer Gruppe |

**`polls`** (1:1 zu `posts` mit Typ `umfrage`): `post_id`, `multiple` («Mehrfachauswahl»), `anonymous` («anonym»), `ends_at` («Endet am», Standard +7 Tage), `end_notified_at`.
**`poll_options`**: `poll_id`, `label`, `position` (mind. 2, «+ Option hinzufügen»).
**`poll_votes`**: `poll_id`, `option_id`, `user_id`; eindeutig je Option und Person; bei Einfachauswahl ersetzt eine neue Stimme die alte (Trigger). Ergebnis in Prozent per View. Bei `anonymous` gibt die View keine Namen aus.

**`activities`** – Feed-Index (per Trigger aus allen Modulen gefüllt)
`network_id`, `group_id`, `actor_id`, `type` (Typ-Schlüssel 3.3), `target_type`, `target_id`, `action` (`erstellt` \| `beantwortet` \| `hochgeladen` \| `beigetreten`), `visibility`, `created_at`.
Feed-Filter aus dem Prototyp: Alles · Beiträge (post, bild, video, status, umfrage) · Flächen · Immobilien · City News · Forum · Events. Umschalter «Netzwerk [Stadt]» / «urbown-weit». Seitenleiste: Aktuelle Themen (offene Themen nach Antworten), Vakante Flächen (nicht vermietet, 3), Immobilien-Inserate (2), Nächste Events (3).

### 4.3 Vakante Flächen und Immobilien
**`vacancies`** – Vakante Fläche (Formular «Vakante Fläche inserieren»)
| Spalte | Formularfeld | Pflicht |
|---|---|---|
| title | Titel | ja |
| location_text, lat, lng | Lage (z. B. «P7, 14») | ja |
| area_m2 | Fläche (m²) | ja |
| frontage_m | Schaufensterfront (m), 0 = keine | |
| available_from | Verfügbar ab | |
| use_type | Nutzungsart: `Einzelhandel` \| `Gastronomie` \| `Büro` \| `Praxis` \| `Dienstleistung` \| `Pop-up/Zwischennutzung` | ja |
| floor | Etage (Text, Standard «EG») | |
| rent_monthly | Miete pro Monat (leer = auf Anfrage) | |
| service_charges | Nebenkosten | |
| status | `verfügbar` \| `reserviert` \| `vermietet` | ja |
| upcoming | Anstehender Leerstand (heute noch vermietet) | |
| interim_use | Zwischennutzung möglich | |
| accessible | barrierefrei | |
| description | Kurzbeschreibung | |
| storage_area_m2 | Lager/Nebenflächen (m²) | **optional** |
| ceiling_height_m | Raumhöhe (m) | **optional** |
| loading_zone | Lieferzone | **optional** |
| + Standardspalten | Sichtbarkeit; `moderation = 'wartet'`, wenn das Netzwerk Prüfung verlangt | |
Medien: `fotos`, `grundriss` (Bilder oder PDF). Filter: Nutzungsart, «ab m²». Liste und Karte. Anfrage per Direktnachricht (Betreff «Anfrage zu «Titel» (Lage)»).

**`properties`** – Immobilien-Inserat (Formular «Immobilie inserieren»)
| Spalte | Formularfeld | Pflicht |
|---|---|---|
| title | Titel | ja |
| property_type | Objektart: `Wohn- und Geschäftshaus` \| `Geschäftshaus` \| `Gewerbe` \| `Wohnung` \| `Grundstück` \| `Mehrfamilienhaus` | ja |
| location_text, lat, lng | Lage | ja |
| location_precision | Lage anzeigen: `ungefähr` («nur Quadrat/Strasse», genaue Adresse auf Anfrage; Koordinaten gerundet gespeichert) \| `genau` | ja |
| plot_m2 | Grundstück (m²) | |
| floor_area_m2 | Wohn-/Nutzfläche (m²) | ja |
| year_built | Baujahr | |
| price | Kaufpreis (leer = auf Anfrage) | |
| rental_income_pa | Mieteinnahmen p. a. | |
| status | `verfügbar` \| `reserviert` \| `verkauft` | ja |
| description | Beschreibung | |
| yield_percent | Rendite (%) | **optional** |
| source_url, import_type (`manuell` \| `url` \| `openimmo`), image_rights_confirmed | Import per URL / OpenImmo-XML (UB21) | |
Medien: `fotos`, `expose` (PDF). Liste (Karten) und Kartenansicht. Anfrage per Direktnachricht.

### 4.4 Forum, City News, Events
**`forum_topics`**: `category_id`, `title`, `closed` («Thema schliessen / Wieder öffnen»), `pinned`, `reply_count`, `last_activity_at`, Standardspalten (mit `group_id` = Gruppenthema).
**`forum_posts`**: `topic_id`, `author_id`, `body` (erster Beitrag = Eröffnungstext), `quote_of` (Zitieren), `mentions uuid[]` (@Erwähnung).
Standard-Kategorien Forum: Leerstand · Verkehr · Sauberkeit & Sicherheit · Veranstaltungen · Allgemein.

**`news_articles`** – City News
| Spalte | Formularfeld | Pflicht |
|---|---|---|
| title | Titel | ja |
| category_id | Kategorie | ja |
| cover_path | Titelbild | |
| body | Text | ja |
| source_text | Quellenangabe (z. B. «Pressemitteilung Stadt») | ja |
| source_date | Datum der Quelle | ja |
| source_url | Link zur Quelle | optional |
Standard-Kategorien News: Allgemein · Förderung · Zahlen · Recht & Steuern · Stadtentwicklung.

**`events`**
| Spalte | Formularfeld | Pflicht |
|---|---|---|
| title | Titel | ja |
| starts_at | Datum und Uhrzeit | ja |
| location_text, lat, lng | Ort (z. B. «Café Quadrat, N2, 3»), per Adresssuche auf der Karte | ja |
| description | Beschreibung | |
| registration_enabled | Anmeldung möglich | |
| ends_at | Ende | **optional** |
| image_path | Bild | **optional** |
**`event_registrations`**: `event_id`, `user_id`, `created_at` (Teilnehmen/Abmelden, Teilnehmerliste). Export `.ics` je Event (Route, keine Tabelle). Ansichten Kalender (Monat) und Liste.

**`categories`**: `network_id`, `area` (`forum` \| `news` \| `karte`), `name`, `position`. Neue Netzwerke erhalten die Standard-Kategorien aus dem Vorlage-Netzwerk.

### 4.5 Dokumente, Gruppen, Karte
**`doc_folders`**: `network_id`, `group_id`, `parent_id`, `name`, `created_by`. Wurzelordner «Netzwerk» je Netzwerk bzw. je Gruppe.
**`documents`**
| Spalte | Hinweis |
|---|---|
| folder_id | |
| name | Dateiname (umbenennbar) |
| file_ext | Dateityp-Symbol (PDF, DOC, XLS …) |
| size_bytes, mime_type, storage_path | |
| uploaded_by | Person |
| **uploaded_at** | **«hochgeladen am»**, Standard jetzt, **nur Admins dürfen es ändern** (Rückdatierung für Dokumente aus WordPress) |
| version | Zähler beim Ersetzen der Datei (UB17) |
Ordner löschen löscht den Inhalt mit (Bestätigung). Suche über Dateinamen (`pg_trgm`). Rechte (wer darf hochladen/ändern/löschen) in UB17; Standard: alle Mitglieder hochladen, eigene Dateien ändern, Admins alles.

**`groups`**: `network_id`, `name`, `description`, `is_open` («Offene Gruppe»), `created_by`, Standardspalten.
**`group_members`**: `group_id`, `user_id`, `role` (`leitung` \| `mitglied`), `status` (`aktiv` \| `angefragt`). Beitreten (offen) bzw. «Beitritt anfragen» (geschlossen), Verlassen. Gruppen-Tabs Beiträge · Themen · Dokumente · Mitglieder nutzen `posts`, `forum_topics` und `doc_folders` mit `group_id`.

**`map_points`** – Kartenpunkt («Ort eintragen»)
| Spalte | Formularfeld | Pflicht |
|---|---|---|
| title | Titel | ja |
| location_text, lat, lng | Ort auf der Karte antippen oder Adresse/Quadrat | ja (eins von beiden) |
| theme_id | Thema (→ `categories` Bereich `karte`); Standard: Idee · Problemstelle · Baustelle · Leerstand · Treffpunkt (Admin «Karten-Themen») | ja |
| description | Kurzbeschreibung, max. 140 Zeichen | |
Gesamtkarte: Filter nach Typ (Kartenpunkte, Vakante Flächen, Immobilien, Events) und Thema.

### 4.6 Gemeinsame Tabellen
| Tabelle | Spalten |
|---|---|
| `media` | target_type, target_id, collection (`fotos` \| `grundriss` \| `expose` \| `titelbild` \| `bild`), storage_path, mime_type, size_bytes, width, height, alt_text, position |
| `comments` | target_type, target_id, author_id, body, created_at, deleted_at |
| `reactions` | target_type, target_id, user_id, kind (`gefällt_mir`); eindeutig |
| `reports` | network_id, target_type, target_id, target_label (z. B. «Kommentar im Forum «Lieferzonen»»), reported_by, reason, note, status (`offen` \| `ausgeblendet` \| `behalten`), handled_by, handled_at |
| `conversations` | network_id (Ursprung), subject_ref_type, subject_ref_id (z. B. Anfrage zu einer Fläche) |
| `conversation_participants` | conversation_id, user_id, last_read_at (Zähler ungelesen) |
| `messages` | conversation_id, author_id, body, created_at |
| `blocks` | user_id, blocked_user_id (UB13) |

Direktnachrichten prüfen `dm_from`: Eine Person aus einem anderen Netzwerk darf nur schreiben, wenn die Empfängerin «alle» erlaubt.

### 4.7 Benachrichtigungen und Newsletter
**`notification_preferences`**: `user_id`, `network_id`, `type` (alle 14 Typ-Schlüssel), `frequency` (`sofort` \| `taeglich` \| `woechentlich` \| `nie`).
Standard laut Prototyp: `flaeche`, `immo`, `event`, `news` = sofort; `mitglied` = nie; alle anderen = wöchentlich. Schnellwahl «Alles sofort / Alles als Wochenüberblick / Alles aus».
**`notification_settings`**: `user_id`, `replies_immediately` (Standard true), `only_my_groups` (Standard true).
**`notifications`**: `user_id`, `network_id`, `type`, `target_type`, `target_id`, `read_at`, `emailed_at`, `pushed_at`.
**`push_subscriptions`**: `user_id`, `endpoint`, `p256dh`, `auth`, `user_agent`, `created_at` (Web-Push).
**`newsletters`**: `subject`, `body`, `audience` (`alle` \| Netzwerk-Slug \| Badge `eigentuemer` / `mitarbeiter_stadt` …), `status` (`entwurf` \| `geplant` \| `versendet`), `test_sent_at`, `scheduled_at`, `sent_at`, `created_by`.
**`newsletter_deliveries`**: `newsletter_id`, `user_id`, `status`, `sent_at`, `error`. Öffnungs- und Klickmessung zuerst aus (UB09/UB25).
**`unsubscribes`**: `email`, `scope` (`newsletter` \| `benachrichtigungen`), `created_at`.
**`private.function_calls`**: Mail- und Push-Warteschlange mit Wiederholung (wie drivers.one).

### 4.8 Demo und Vorlage
- Netzwerk `demo` mit `is_demo = true`. Nächtlicher Reset per `pg_cron`: Daten des Demo-Netzwerks löschen und aus einem Demo-Datensatz (SQL-Seed, wie Prototyp `seed()`) neu einspielen. Betrifft nur dieses Netzwerk.
- Vorlage-Netzwerk: Kategorien, Karten-Themen, Ordnerstruktur und Einstellungen. «Neue Stadt anlegen» und «Netzwerk klonen» kopieren diese, nie Personendaten.

---

## 5. Sicherheit und Datenschutz (Kurzfassung, Details UB25)
- RLS auf allen Tabellen; interne Tabellen im Schema `private`; Dateien nur über signierte URLs.
- Login-Seite verrät keine Mitgliedschaften (unbekannte Adressen gehen in den Passwort-Schritt).
- Rate-Limits in Kong und GoTrue (Login, Code anfordern), Fail2ban → Cloudflare-Regel, Turnstile auf öffentlichen Formularen.
- Admin-2FA: Pflicht für den Superadmin, je Netzwerk aktivierbar für Stadt-Admins.
- Regeln von drivers.one übernommen: Claude Code liest nie Dateien mit Zugangsdaten; Secrets nur in Proton Pass und auf dem Server; Gitleaks als Hook und Action.
- Nachrichteninhalte liest niemand von urbown. Melden nur mit Grund (und freiwilligem Text).
- Auftragsbearbeiter für Rechtstexte: Exoscale (CH), Cloudflare, Resend (Datenregion klären, wie bei drivers.one offen), Kartenanbieter (UB19).

---

## 6. Hosting-, Staging- und Backup-Plan

### 6.1 Hosting (Exoscale Schweiz, eigener Server für urbown)
| Dienst | urbown |
|---|---|
| Compute Zürich `ch-dk-2` | **Eigene Instanz** `urbown-prod`, Ubuntu 24.04, **standard.medium** (4 GB, 2 vCPU, 4 GB Swap), 50-GB-System + **50-GB-Block-Storage** (Datenbank, Dateien). Medium reicht für die erwarteten paar hundert bis wenige tausend Mitglieder; Upgrade auf Large ohne Code-Änderung |
| Object Storage Genf | eigener privater Bucket `urbown-backup` (nur Backups) |
| Monitoring | **bestehende Uptime-Kuma-Instanz von drivers.one in Genf mitbenutzen** (zusätzliche Monitore) |
| Netz | eigene Security Group: öffentlich nur 443 aus Cloudflare-Bereichen, kein öffentlicher SSH |
| Zugang | gleiches Tailnet, eigener Tag `urbown-prod` (Policy ergänzen) |
| IAM | eigener API-Key mit Rolle nur Compute + SOS |

Warum ein eigener Server und nicht der drivers.one-Server: Ausfälle, Updates und Lastspitzen bleiben getrennt; die Datentrennung ist für die AV-Verträge mit Städten klar; Backups und Löschungen bei Vertragsende sind einfacher.

**Kosten (Richtwert):** Medium ca. 34 EUR/Monat + Block Storage und Object Storage wenige EUR → **ca. 40–50 EUR/Monat**. Resend: Gratisplan reicht nicht für Newsletter, daher Pro-Plan (vor drivers.one-Launch ohnehin geplant, gilt für beide Domains im selben Konto).

### 6.2 DNS, TLS, Domains
- Nameserver von `urbown.com` zu **Cloudflare** (Konto info@ixio.ch), wie bei drivers.one. Mail- und WordPress-Einträge bleiben bis zum Go-Live «DNS only» bei Hostpoint.
- Proxied: `app`, `api`, `staging`, ab Go-Live `urbown.com`/`www` und der Wildcard `*` (Kurzadressen, Abschnitt 2.3).
- TLS: Cloudflare «Full (strict)» mit **Cloudflare-Origin-Zertifikat** in Caddy (deckt `urbown.com` und `*.urbown.com`); kein Wildcard-Zertifikat bei Hostpoint nötig.
- Registrar bleibt, wo die Domain heute liegt.

### 6.3 Umgebungen
| Umgebung | Adresse | Zweck / Schutz |
|---|---|---|
| Lokal | Docker-Stack auf dem PC (wie drivers.one) | Entwicklung durch Claude Code |
| **Bis Go-Live** | Produktionsserver unter `staging.urbown.com` (Landing) und `app.urbown.com` | Abnahme aller Teilaufgaben mit Testdaten; Caddy-Basic-Auth + `noindex`, Ausnahmen für Auth-Callbacks und Rechtstexte. Das alte WordPress bleibt unter `urbown.com` und `mannheim.urbown.com` unverändert online |
| **Ab Go-Live: Staging** | `staging.urbown.com` / `staging-app.urbown.com` auf eigener **Small-Instanz**, nur bei Bedarf eingeschaltet | Abnahme neuer Features mit Kopie ohne Personendaten (Demo-Seed), Basic-Auth, `noindex` |
| Produktion | `urbown.com`, `app.urbown.com`, `api.urbown.com`, Kurzadressen | Live nach Abnahme UB26 |

Umstellung am Go-Live (UB26): Testdaten löschen, Echtimport Mannheim (UB23), `urbown.com` und `mannheim.urbown.com` von WordPress auf die neue App bzw. Weiterleitung, Basic-Auth entfernen, WordPress archivieren (Vollbackup, 12 Monate aufbewahren, dann löschen).

### 6.4 Code und Deployment (wie drivers.one)
- **GitHub:** Organisation `ixio-ag`, neues privates Repository **`urbown`** mit den Ordnern `docker/`, `web/`, `docs/`, `tests/` (kein `mobile/`). Gitleaks als Pre-Commit-Hook und Action, Dependabot aktiv, Commit-Autor `Marc Klein <info@ixio.ch>`.
- Arbeit auf `main`, kein automatisches Deployment.
- Ablauf: Commit → Push → **Freigabe Marc (HALT-Regel)** → restic-Backup → `deploy-push.sh` (git bundle über Tailscale) → Migrationen einzeln mit `psql` → Functions neu starten → `build-web.sh` → Rauchtest, Kuma grün.
- Rollback: `git revert` + Deployment; Images per Versionszeile; Daten aus dem restic-Snapshot vor der Migration.
- Runbook: `docs/produktions-deployment.md`, abgeleitet aus dem CX19-Runbook von drivers.one.

### 6.5 Backups und Überwachung
| Ebene | Was | Wie oft / wie lange |
|---|---|---|
| restic → SOS Genf | Datenbank + Storage-Dateien, clientseitig verschlüsselt | täglich 03:45 UTC (versetzt zu drivers.one), **30 Tage täglich + 12 Wochen wöchentlich**; zusätzlich vor jeder Migration |
| Lokal auf dem Server | Dump-Container + WAL-Archiv | 7 Tage |
| Code | GitHub | jede Änderung |
| Restore-Test | automatische Wegwerf-Wiederherstellung, Meldung an Kuma | monatlich am 1. |
| Uptime Kuma | HTTP `urbown.com`, `app.urbown.com`, `api.urbown.com`; Server-Push alle 5 Min. (RAM, Disk, Container, Mail-Warteschlange); Backup- und Restore-Heartbeat | laufend |
| Demo-Reset | `pg_cron`, nur Netzwerk `demo` | nächtlich 03:00 Europe/Zurich |

restic-Schlüssel in Proton Pass (neuer Tresor «urbown Infrastruktur») und als Ausdruck im Firmentresor. Bei Vertragsende einer Stadt: Export, Löschung, Backups laufen nach 12 Wochen aus (im AV-Vertrag so festhalten).

---

## 7. Arbeitsweise ab UB02
- **Planungs- und Begleit-Chats** im Projekt «urbown.com 2.0» (ein Chat pro Teilaufgabe, wie bisher): spezifizieren, entscheiden, Ergebnisse prüfen, Master und UB-Dateien pflegen, Nachrichten an Claude Code schreiben.
- **Claude Code** baut im Repository `ixio-ag/urbown` auf dem PC (lokaler Docker-Stack), mit `CLAUDE.md` und `docs/claude-code-uebergabe.md` nach drivers.one-Vorlage. Blockarbeit, Deployment nur nach Freigabe.
- UB02 (Design-System) braucht noch keinen Code. Das Repository muss spätestens zu UB03 stehen.

---

## 8. Erledigte und offene Punkte

**Erledigt in diesem UB01**
- Plattform: drivers.one-Stack ✓
- Hosting-Standort: nur Schweiz ✓ (Landingpage-Text in UB03 anpassen)
- Staging: Abschnitt 6.3, keine eigene Testdomain nötig ✓
- Wildcard-SSL: über Cloudflare gelöst, keine Abklärung bei Hostpoint nötig ✓
- Migration: nur Mitglieder (Vorname, Name, E-Mail) ✓
- Felder: Prototyp + optionale Master-Extras ✓
- Dokumente rückdatierbar, nur Admins ✓

**To-dos Marc (bis UB03)**
1. GitHub-Repository `ixio-ag/urbown` (privat) anlegen.
2. `urbown.com` als Zone in Cloudflare anlegen. Nameserver erst umstellen, wenn alle bestehenden DNS-Einträge (inkl. Mail) übernommen sind. Ich begleite das Schritt für Schritt in UB05.
3. Proton-Pass-Tresor «urbown Infrastruktur» anlegen.
4. Exoscale-Instanz erst anlegen, wenn Claude Code den ersten Block deployen will (wie drivers.one: Kosten erst ab Bedarf).

**Offen (in späteren Chats)**
- Kartenanbieter für Kacheln und Adresssuche (Vorschlag MapTiler, Zug) → UB19.
- Absenderadresse der Systemmails (z. B. `no-reply@urbown.com`, Antworten an `info@urbown.com`) → UB07.
- Datenregion Resend für die Rechtstexte → UB25.
- E-Mail-OTP von GoTrue mit Testkonten verifizieren → UB06.
