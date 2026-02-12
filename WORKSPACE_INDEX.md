# Workspace Index (Root Pointer)

This file is the root pointer for startup context. Use it to find key workspace files, plans, and tools quickly.

## Quick Read Table

| Item | Path | Use When |
| --- | --- | --- |
| Meta Index | workspace_meta/INDEX.md | Primary index for plans and ops docs |
| Plan | workspace_meta/PLAN.md | Atomic task list and execution order |
| Plan Template | workspace_meta/PLAN_TEMPLATE.md | Creating new structured task lists |
| Workflow Checklist | workspace_meta/WORKFLOW.md | Deterministic workflow + safety rules |
| Daily Summary Template | workspace_meta/DAILY_SUMMARY_TEMPLATE.md | Short daily recap template |
| Heartbeat | HEARTBEAT.md | Periodic checks/reminders |
| Soul (persona) | SOUL.md | Tone/voice guidance |
| Tools Notes | TOOLS.md | Environment-specific notes |
| User Profile | USER.md | Human preferences/context |
| Identity | IDENTITY.md | Assistant identity/avatar |
| Host Session Verification | workspace_meta/HOST_LEVEL_SESSION_VERIFICATION.md | Host-level validation steps |
| Memory | memory/ | Durable notes, secrets references |
| Skills | skills/ | Skill folders + SKILL.md files |
| Docs | docs/ | OpenClaw documentation |
| Scripts | scripts/ | Helper scripts and utilities |
| Config | /home/grafe/.openclaw/openclaw.json | Gateway config (do not edit without schema) |

---

## Details & Usage

### Plans & Workflow
- **workspace_meta/PLAN.md**: The current atomic task list. Work through in order.
- **workspace_meta/PLAN_TEMPLATE.md**: Template for new plans.

### Startup Context (Loaded Files)
- **SOUL.md**: Persona and reply style.
- **TOOLS.md**: Environment-specific notes.
- **USER.md**: Human preferences and context.
- **IDENTITY.md**: Assistant identity.
- **HEARTBEAT.md**: Periodic tasks.

### Operations
- **workspace_meta/HOST_LEVEL_SESSION_VERIFICATION.md**: Host-level session checks.
- **memory/**: Durable notes and secrets references.

### Tools & Resources
- **skills/**: Each skill has a `SKILL.md` with usage instructions.
- **docs/**: Product docs (OpenClaw).
- **scripts/**: Helper scripts.

### Config & Safety
- **/home/grafe/.openclaw/openclaw.json**
  - Use `gateway config.schema` before edits.
  - Prefer `gateway config.patch` for changes.
