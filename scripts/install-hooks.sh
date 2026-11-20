#!/bin/sh
# Setzt den Gitleaks-Pre-Commit-Hook (.git/hooks/pre-commit).
# Einmal nach dem Klonen ausführen: sh scripts/install-hooks.sh
set -e
ROOT="$(git rev-parse --show-toplevel)"
HOOK_DIR="$(git rev-parse --git-path hooks)"
mkdir -p "$HOOK_DIR"
cp "$ROOT/scripts/hooks/pre-commit" "$HOOK_DIR/pre-commit"
chmod +x "$HOOK_DIR/pre-commit"
echo "Gitleaks-Pre-Commit-Hook installiert: $HOOK_DIR/pre-commit"
