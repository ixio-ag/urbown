#!/bin/sh
# Spielt alle Migrationen aus supabase/migrations/ in den LOKALEN Stack ein (der Reihe nach).
# Nur lokal. Migrationen auf Servern nur nach Freigabe (HALT-Regel).
#   sh docker/scripts/migrate-local.sh
set -eu
DIR="$(cd "$(dirname "$0")/.." && pwd)"
for f in $(ls "$DIR/../supabase/migrations" | grep -E '^[0-9]{4}_.*\.sql$' | sort); do
  echo "→ $f"
  MSYS_NO_PATHCONV=1 docker compose -f "$DIR/compose.yml" exec -T db \
    psql -v ON_ERROR_STOP=1 -U supabase_admin -d postgres -f "/urbown/migrations/$f"
done
echo "Migrationen eingespielt."
