# Error Log

## 2026-02-04 — Cron model not allowed
**Problem:** Cron jobs are failing with `model not allowed: xai/grok-4-1-fast-reasoning`.
**Impact:** Scheduled maintenance/compaction jobs error out and do not run.
**Cause:** Cron payloads referenced a model not allowed by the runtime.
**Fix:** Updated all cron payloads to use `openai-codex/gpt-5.2-codex`.
**Status:** Resolved (next runs should succeed).
