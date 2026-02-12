# Add Patterns

Patterns for adding new functionality without destabilizing the system.

## When to use

Use these patterns when you are:

- Adding a new feature
- Adding a new dependency
- Adding a new endpoint/field/configuration

## Principles

- **Add behind stable interfaces**: prefer extending existing interfaces over deep rewrites.
- **Add observability**: logging/metrics for new paths.
- **Add tests**: validate the behavior and guard against regressions.

## Add checklist

- [ ] Is the addition backward compatible (or versioned)?
- [ ] Are defaults safe?
- [ ] Are errors and edge cases handled?
- [ ] Do we need migrations (db/schema/config)?
- [ ] Do we need docs and examples?

## Patterns

### 1) Start with a thin vertical slice

Implement end-to-end through a small path first (API → service → storage), then expand.

### 2) Prefer feature flags for risky additions

If the change is risky or user-facing, gate it.

### 3) Add telemetry for new behavior

- Logs: include correlation IDs
- Metrics: request/operation counts and errors

See also:

- `skills/domains/code-quality/logging-patterns.md`
- `skills/domains/infrastructure/observability-patterns.md`

## Related skills

- `skills/domains/backend/api-design-patterns.md`
- `skills/domains/backend/validation-patterns.md`
- `skills/domains/code-quality/testing-patterns.md`
