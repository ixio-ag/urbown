#!/bin/sh
# Erzeugt docker/.env für den LOKALEN Stack mit Zufallswerten (nie für Server verwenden).
# Gibt keine Werte aus. Bestehende docker/.env wird nur mit --force ersetzt.
#   sh docker/scripts/gen-local-env.sh [--force]
set -eu

DIR="$(cd "$(dirname "$0")/.." && pwd)"
EXAMPLE="$DIR/.env.example"
TARGET="$DIR/.env"

if [ -f "$TARGET" ] && [ "${1:-}" != "--force" ]; then
  echo "docker/.env existiert bereits – nichts geändert. Neu erzeugen: sh docker/scripts/gen-local-env.sh --force"
  echo "Hinweis: Nach --force passen die Werte nicht mehr zur bestehenden lokalen Datenbank (dann sh docker/scripts/reset-local.sh)."
  exit 0
fi
command -v openssl >/dev/null 2>&1 || { echo "openssl fehlt (in Git Bash enthalten)."; exit 1; }

b64url() { openssl enc -base64 -A | tr '+/' '-_' | tr -d '='; }
hex() { openssl rand -hex "$1"; }

JWT_SECRET="$(hex 32)"
header='{"alg":"HS256","typ":"JWT"}'
iat=$(date +%s)
exp=$((iat + 5 * 365 * 24 * 3600))
token() {
  h=$(printf %s "$header" | b64url)
  p=$(printf %s "$1" | b64url)
  s=$(printf %s "$h.$p" | openssl dgst -binary -sha256 -hmac "$JWT_SECRET" | b64url)
  printf %s "$h.$p.$s"
}
ANON_KEY="$(token "{\"role\":\"anon\",\"iss\":\"supabase\",\"iat\":$iat,\"exp\":$exp}")"
SERVICE_ROLE_KEY="$(token "{\"role\":\"service_role\",\"iss\":\"supabase\",\"iat\":$iat,\"exp\":$exp}")"

umask 077
tmp="$TARGET.tmp"
: > "$tmp"
while IFS= read -r line || [ -n "$line" ]; do
  case "$line" in
    POSTGRES_PASSWORD=__GENERATE__) echo "POSTGRES_PASSWORD=$(hex 24)" ;;
    JWT_SECRET=__GENERATE__) echo "JWT_SECRET=$JWT_SECRET" ;;
    ANON_KEY=__GENERATE__) echo "ANON_KEY=$ANON_KEY" ;;
    SERVICE_ROLE_KEY=__GENERATE__) echo "SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY" ;;
    DASHBOARD_PASSWORD=__GENERATE__) echo "DASHBOARD_PASSWORD=$(hex 16)" ;;
    PG_META_CRYPTO_KEY=__GENERATE__) echo "PG_META_CRYPTO_KEY=$(hex 24)" ;;
    S3_PROTOCOL_ACCESS_KEY_ID=__GENERATE__) echo "S3_PROTOCOL_ACCESS_KEY_ID=$(hex 16)" ;;
    S3_PROTOCOL_ACCESS_KEY_SECRET=__GENERATE__) echo "S3_PROTOCOL_ACCESS_KEY_SECRET=$(hex 32)" ;;
    *__GENERATE__*) echo "Unbekannter Platzhalter in .env.example: ${line%%=*}" >&2; rm -f "$tmp"; exit 1 ;;
    *) echo "$line" ;;
  esac
done < "$EXAMPLE" >> "$tmp"
mv "$tmp" "$TARGET"
echo "docker/.env erzeugt (Werte nicht angezeigt). Studio-Login: Benutzer «supabase», Passwort in docker/.env (DASHBOARD_PASSWORD)."
