# Error Patterns (Operational)

This page complements `skills/domains/backend/error-handling-patterns.md` with day-to-day patterns for surfacing, classifying, and acting on errors.

## Patterns

### 1) Classify errors

Use a small set of categories:

- **User/input**: 4xx / validation errors
- **Dependency**: timeouts, 5xx, third-party failures
- **Internal**: bugs, invariant violations

### 2) Attach context

Include:

- Correlation/request ID
- Operation name
- Key identifiers (non-sensitive)

### 3) Prefer explicit error mapping at boundaries

Map internal errors to API/UI responses in one place.

## Related skills

- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/code-quality/logging-patterns.md`
- `skills/domains/backend/retry-patterns.md`
