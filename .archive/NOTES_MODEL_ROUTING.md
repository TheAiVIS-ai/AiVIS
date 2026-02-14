# Model Routing Notes

## Critical Discovery: Cron Payload Model Overrides

**Date:** 2026-02-13  
**Issue:** file_scribe subagents were attempting to use Anthropic/Claude despite correct config

### Root Cause

Cron jobs in `/home/grafe/.openclaw/cron/jobs.json` had hardcoded model overrides in their `payload.model` field:

```json
{
  "payload": {
    "model": "openai-codex/gpt-5.2-codex" // ❌ WRONG
  }
}
```

### Model Resolution Hierarchy

When a subagent is spawned via `sessions_spawn` tool, the model is resolved in this order:

1. **Tool parameter** (`model=...`) ← Cron `payload.model` goes here
2. **Per-agent config** (`agents.list[].subagents.model`)
3. **Global defaults** (`agents.defaults.subagents.model`)
4. **Hardcoded fallback** (`anthropic/claude-opus-4-6` in `src/agents/defaults.ts`)

If cron jobs specify a model override, it bypasses all config and jumps to #1.

### The Cascade Failure

1. Cron passes `payload.model = "openai-codex/gpt-5.2-codex"` (wrong version)
2. Model doesn't exist in registry
3. Fallback to hardcoded default: `anthropic/claude-opus-4-6`
4. No Anthropic API key configured
5. Error: `FailoverError: No API key found for provider "anthropic"`

### Solution

**Fixed:** Updated all cron jobs to use `nvidia/moonshotai/kimi-k2.5`

**Better approach:** Remove `payload.model` entirely and rely on agent config:

- Main config already has: `agents.defaults.subagents.model = "nvidia/moonshotai/kimi-k2.5"`
- Per-agent override: `agents.list[0].subagents.model = "nvidia/moonshotai/kimi-k2.5"`

### Prevention

1. **Lint script:** `scripts/lint_cron_models.py` checks for:
   - Forbidden patterns (anthropic/, claude, openai-codex/gpt-5.2-codex)
   - Allowlist enforcement (only nvidia/moonshotai/kimi-k2.5 or None)
   - Exit codes: 0=pass, 2=forbidden, 3=not in allowlist

2. **Git pre-commit hook:** `.git/hooks/pre-commit`
   - Runs lint before every commit
   - Blocks commits with invalid cron models

3. **Pre-commit framework:** `.pre-commit-config.yaml`
   - Shareable, portable configuration
   - Install: `pip install pre-commit && pre-commit install`

4. **CI/CD:** `.github/workflows/lint-cron-models.yml`
   - Runs on every PR and push
   - Catches issues that slip through local checks

5. **Best practice:** Do NOT set `payload.model` in cron jobs unless absolutely necessary

6. **Centralized config:** Set model once in `openclaw.json`, not in every cron job

### Debugging Checklist

If you see "No API key for provider 'anthropic'" error:

1. ✅ Check `cron/jobs.json` for `payload.model` overrides
2. ✅ Check `openclaw.json` for `agents.defaults.subagents.model`
3. ✅ Verify model is in `agents.defaults.models` allowlist
4. ✅ Verify auth profile exists in `agents/main/agent/auth-profiles.json`
5. ✅ Run `python3 scripts/lint_cron_models.py`

### Current Configuration

**Subagent Model:** `nvidia/moonshotai/kimi-k2.5`  
**Provider:** nvidia  
**API Endpoint:** https://integrate.api.nvidia.com/v1  
**Auth Profile:** `nvidia` (API key configured)

**Cron Jobs Using Kimi:**

- AiVIS maintenance snapshot
- AiVIS workspace audit
- AiVIS session compaction guard

**Cron Jobs Using Agent Default (no override):**

- Nightly Build reminder
- Nightly Build auto-scan

### Files Modified

- `/home/grafe/.openclaw/cron/jobs.json` - Updated model overrides
- `/home/grafe/.openclaw/openclaw.json` - Removed invalid keys (maxQueued, timeoutSeconds, retryLimit)
- Backups: `jobs.json.backup.before_kimi_fix`, `openclaw.json.backup.before_doctor_fix`

### References

- Model resolution code: `src/agents/tools/sessions-spawn-tool.ts` (lines 170-173)
- Hardcoded defaults: `src/agents/defaults.ts`
- Config hot-reload: `src/gateway/config-reload.ts` (agents config marked as "none" - no auto-reload)
