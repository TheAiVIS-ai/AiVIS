# Email Patterns

Patterns for sending email reliably and safely.

## Principles

- **Idempotency**: avoid duplicate sends.
- **Observability**: log delivery attempts and provider responses.
- **Deliverability**: validate domains, handle bounces/complaints.

## Patterns

### 1) Use a single “send” boundary

Centralize provider integration behind a small interface.

### 2) Template + variables, not string concatenation

Keep templates separate from business logic.

### 3) Track delivery state

Persist message IDs and outcomes for debugging and user support.

## Failure modes to handle

- Provider timeouts
- 429 rate limits
- Invalid recipient addresses
- DNS/verification issues

## Related skills

- `skills/domains/backend/retry-patterns.md`
- `skills/domains/code-quality/logging-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
