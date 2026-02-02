#!/usr/bin/env bash
set -euo pipefail

# Compaction guard + WhatsApp notification.
# - Finds main session (agent:main:main)
# - Records token usage before
# - Runs /compact in that session
# - Records token usage after
# - Sends a WhatsApp message to the admin number

ADMIN_TARGET="${ADMIN_TARGET:-+27765864469}"
KEY="${SESSION_KEY:-agent:main:main}"
OPENCLAW_BIN="${OPENCLAW_BIN:-openclaw}"

sessions_json="$($OPENCLAW_BIN sessions --json)"

session_id="$(echo "$sessions_json" | jq -r --arg key "$KEY" '.sessions[]? | select(.key==$key) | .sessionId' | head -n 1)"
if [[ -z "$session_id" || "$session_id" == "null" ]]; then
  echo "Could not find sessionId for $KEY" >&2
  exit 1
fi

before_total="$(echo "$sessions_json" | jq -r --arg key "$KEY" '.sessions[]? | select(.key==$key) | .totalTokens' | head -n 1)"
before_ctx="$(echo "$sessions_json" | jq -r --arg key "$KEY" '.sessions[]? | select(.key==$key) | .contextTokens' | head -n 1)"

# Fallbacks
before_total="${before_total:-0}"
before_ctx="${before_ctx:-0}"

before_pct="0"
if [[ "$before_ctx" != "0" && "$before_ctx" != "null" ]]; then
  before_pct="$(python3 - <<PY
bt=int(${before_total:-0} or 0)
ctx=int(${before_ctx:-0} or 0)
print(int(round((bt/ctx)*100)) if ctx>0 else 0)
PY
)"
fi

# Run compaction inside the session. Use gateway-based agent invocation.
$OPENCLAW_BIN agent --session-id "$session_id" --message "/compact" >/dev/null

# Re-read token usage
sessions_json_2="$($OPENCLAW_BIN sessions --json)"
after_total="$(echo "$sessions_json_2" | jq -r --arg key "$KEY" '.sessions[]? | select(.key==$key) | .totalTokens' | head -n 1)"
after_ctx="$(echo "$sessions_json_2" | jq -r --arg key "$KEY" '.sessions[]? | select(.key==$key) | .contextTokens' | head -n 1)"
after_total="${after_total:-0}"
after_ctx="${after_ctx:-0}"

after_pct="0"
if [[ "$after_ctx" != "0" && "$after_ctx" != "null" ]]; then
  after_pct="$(python3 - <<PY
at=int(${after_total:-0} or 0)
ctx=int(${after_ctx:-0} or 0)
print(int(round((at/ctx)*100)) if ctx>0 else 0)
PY
)"
fi

msg="[openclaw] Compacted context: ${before_total}→${after_total} tokens (${before_pct}%→${after_pct}%)."

# Send WhatsApp notification
$OPENCLAW_BIN message send --target "$ADMIN_TARGET" --message "$msg" >/dev/null

echo "$msg"
