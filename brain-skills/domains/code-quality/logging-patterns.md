# Logging Patterns (Operational)

Practical logging patterns for production debugging, auditability, and developer ergonomics.

## Principles

- **Structured logs** over free-form strings.
- **Stable fields**: keep field names consistent.
- **No secrets**: never log tokens/passwords.

## Recommended fields

- `timestamp` (or rely on logger)
- `level`
- `service`/`module`
- `operation`
- `request_id` / `run_id`
- `user_id` / `account_id` (if applicable, non-sensitive)
- `error_type` / `error_code`

## Patterns

### 1) Correlation IDs everywhere

Propagate a `request_id` across HTTP calls and async work.

### 2) Log at boundaries

- Incoming request
- Outgoing dependency call
- State transitions

### 3) Log errors with context

Include structured context, not giant stack traces for expected errors.

## Related skills

- `skills/domains/infrastructure/observability-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/backend/retry-patterns.md`
