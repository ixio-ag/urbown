-- 0001 – Erweiterungen (UB01 2.2). Noch keine Tabellen: das Datenmodell folgt ab UB05.
-- Idempotent: läuft beim ersten Start des lokalen Stacks (Init-SQL) und über docker/scripts/migrate-local.sh.

create schema if not exists extensions;

-- Hintergrundjobs (Demo-Reset, Mail-Warteschlange, Newsletter)
create extension if not exists pg_cron with schema pg_catalog;
grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

-- HTTP-Aufrufe aus der Datenbank (Edge Functions, Webhooks)
create extension if not exists pg_net with schema extensions;

-- Ähnlichkeitssuche (Dateinamen, Mitglieder) und Suche ohne Akzente
create extension if not exists pg_trgm with schema extensions;
create extension if not exists unaccent with schema extensions;
