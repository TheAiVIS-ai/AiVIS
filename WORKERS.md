# Worker Agent Guide

**Purpose:** Specialized worker agents for maximum token efficiency.

---

## Architecture Philosophy

**YOU (Main/Codex) are the orchestrator.** You have:

- ✅ Direct read access to system files (SOUL.md, USER.md, IDENTITY.md, etc.)
- ✅ Memory and messaging capabilities
- ✅ Session orchestration (spawn/send)
- ❌ NO write/edit access (delegate to file-scribe)
- ❌ NO exec access (delegate to executor)

**Why?** Token efficiency through specialization and delegation.

---

## 🗂️ PROJECT WORKSPACE CONTEXT

**IMPORTANT:** The project codebase is located at: `/home/grafe/.openclaw/workspace/`

When workers ask "where is the project?" or "what repo?" → It's already in the workspace!

**Tell workers:** "Work in the current workspace" or "The code is in /home/grafe/.openclaw/workspace/"

---

## ⚠️ CRITICAL: Worker Retry Protocol

**OpenClaw does NOT auto-retry failed workers.** YOU must implement manual retry logic.

### When Workers Fail/Timeout:

1. **Check status:** Use `session_status` to verify if worker completed
2. **Retry pattern:** Re-spawn with same task (up to 3 attempts)
3. **Inform user:** "Worker timed out, retrying (attempt 2/3)..."
4. **Escalate:** After 3 failures, report to user

### Retry Example:

```javascript
// Attempt 1
sessions_spawn({
  agentId: "file-scribe",
  task: "Write endpoint...",
  label: "write_v1",
  runTimeoutSeconds: 900,
});

// If timeout/failure → Attempt 2
sessions_spawn({
  agentId: "file-scribe",
  task: "Write endpoint...",
  label: "write_v2",
  runTimeoutSeconds: 900,
});

// If timeout/failure → Attempt 3
sessions_spawn({
  agentId: "file-scribe",
  task: "Write endpoint...",
  label: "write_v3",
  runTimeoutSeconds: 900,
});

// After 3 failures → Report to user
message({ content: "file-scribe failed after 3 attempts. Free tier may be rate-limited." });
```

**Why 15-minute timeout?** Free tier APIs may have rate limits causing delays. 900 seconds gives workers time to complete despite pauses.

---

## Your 5 Specialized Workers

All workers use Kimi model (`nvidia/moonshotai/kimi-k2.5`) for free tier compatibility.

### 1. code-reader (Analyzer)

**Purpose:** Read and analyze code, find patterns, summarize files
**Tools:** `read`, `grep`, `list`, `search`
**Use when:** Need to understand existing code or find files

### 2. file-scribe (Writer)

**Purpose:** Write and edit files
**Tools:** `write`, `edit`, `apply_patch`
**Use when:** Need to create or modify code

### 3. executor (Runner)

**Purpose:** Run commands, tests, scripts
**Tools:** `exec`, `process`
**Use when:** Need to execute code or verify functionality

### 4. researcher (Web/Docs)

**Purpose:** Search web, fetch documentation
**Tools:** `web_search`, `web_fetch`, `read`
**Use when:** Need external information or documentation

### 5. general-worker (Fallback)

**Purpose:** Complex tasks requiring multiple tool types
**Tools:** Full coding profile
**Use when:** Task requires reading + writing + executing

---

## Token Efficiency Strategy

### 🎯 Goal: 90%+ Token Reduction

**Before (no workers):**

- Main reads 10k lines of code
- Main writes implementation
- Main runs tests
- Total: ~15,000 tokens

**After (with workers):**

- Main: "code-reader, summarize X" (50 tokens)
- code-reader: Returns 200-token summary
- Main: "file-scribe, implement Y" (100 tokens)
- file-scribe: Returns "Done ✓" (10 tokens)
- Main: "executor, test Z" (50 tokens)
- executor: Returns "Pass ✓" (10 tokens)
- Total: ~500 tokens (97% savings!)

### How to Achieve This

**ALWAYS request concise responses:**

```javascript
// ❌ BAD
task: "Analyze the codebase";

// ✅ GOOD
task: "Find API routes. Reply with: list of paths (max 200 tokens)";
```

**Request summaries, not full content:**

```javascript
// ❌ BAD
task: "Read config.json and tell me everything";

// ✅ GOOD
task: "Read config.json. Summarize key settings in 3 bullet points.";
```

---

## Quick Reference

**Spawn Pattern (use for ALL workers):**

```javascript
sessions_spawn({
  agentId: "code-reader", // or: file-scribe, executor, researcher, general-worker
  task: "Do X in /home/grafe/.openclaw/workspace/. Reply: <concise>",
  label: "descriptive_label",
  runTimeoutSeconds: 900, // 15 min for free tier
});
```

**Common Patterns:**

```javascript
// Read & analyze
sessions_spawn({
  agentId: "code-reader",
  task: "Find all TODO comments. List file paths.",
  label: "find_todos",
  runTimeoutSeconds: 900,
});

// Write/edit
sessions_spawn({
  agentId: "file-scribe",
  task: "Add function X to src/utils.ts. Reply: Done",
  label: "add_fn",
  runTimeoutSeconds: 900,
});

// Execute
sessions_spawn({
  agentId: "executor",
  task: "Run npm test. Reply: pass/fail + error count",
  label: "test",
  runTimeoutSeconds: 900,
});

// Research
sessions_spawn({
  agentId: "researcher",
  task: "Search MDN for Array.map. Summarize in 50 words.",
  label: "research",
  runTimeoutSeconds: 900,
});

// Complex
sessions_spawn({
  agentId: "general-worker",
  task: "Implement feature X end-to-end. Report: done",
  label: "feature_x",
  runTimeoutSeconds: 900,
});
```

**Remember:**

- Include workspace path in task
- Set 900s timeout for free tier
- Request concise responses
- Retry 3x on failure

---

_For detailed examples: `.archive/WORKERS_FULL.md`_
