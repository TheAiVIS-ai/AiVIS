#!/usr/bin/env bash
set -euo pipefail

# OpenClaw maintenance snapshot
# Safe: read-only checks + writes a small JSON snapshot under workspace/monitoring/snapshots.
# Intentionally does NOT send messages and does NOT run /compact.

WORKSPACE_DIR="${WORKSPACE_DIR:-${OPENCLAW_WORKSPACE:-$HOME/.openclaw/workspace}}"
OPENCLAW_BIN="${OPENCLAW_BIN:-openclaw}"
OUT_DIR="$WORKSPACE_DIR/monitoring/snapshots"
mkdir -p "$OUT_DIR"

stamp="$(date -Iseconds)"
out="$OUT_DIR/snapshot-$stamp.json"

git_commit=""
if git -C "$WORKSPACE_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git_commit="$(git -C "$WORKSPACE_DIR" rev-parse --short HEAD 2>/dev/null || true)"
fi

# Avoid HEAD~1 usage (can fail on shallow/single-commit repos)

echo "== Maintenance snapshot ($stamp) ==" >&2

echo "{" > "$out"
printf "  \"timestamp\": %s,\n" "\"$stamp\"" >> "$out"
printf "  \"workspace\": %s,\n" "\"$WORKSPACE_DIR\"" >> "$out"
printf "  \"gitCommit\": %s,\n" "\"$git_commit\"" >> "$out"

# Basic sizes
ws_kb="$(du -sk "$WORKSPACE_DIR" 2>/dev/null | awk '{print $1}' || echo 0)"
printf "  \"workspaceSizeKb\": %s,\n" "$ws_kb" >> "$out"

# Health (best-effort; do not fail snapshot if gateway is down)
health_json="$($OPENCLAW_BIN health --json 2>/dev/null || true)"
if [[ -n "$health_json" ]]; then
  printf "  \"health\": %s\n" "$health_json" >> "$out"
else
  printf "  \"health\": null\n" >> "$out"
fi

echo "}" >> "$out"

echo "$out"
