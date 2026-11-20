#!/bin/sh
# Setzt den LOKALEN Stack zurück: stoppt alle Container und löscht die lokalen Volumes
# (Datenbank, Storage, Mailpit). Nur lokal verwenden.
#   sh docker/scripts/reset-local.sh
set -eu
DIR="$(cd "$(dirname "$0")/.." && pwd)"
printf "Lokale Datenbank, Dateien und Mails von «urbown» löschen? (ja/nein) "
read -r answer
[ "$answer" = "ja" ] || { echo "Abgebrochen."; exit 0; }
docker compose -f "$DIR/compose.yml" --profile prod down -v --remove-orphans
echo "Zurückgesetzt. Neu starten: docker compose -f docker/compose.yml up -d"
