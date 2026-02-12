# Retry Patterns

Patterns for retrying operations safely (especially across network boundaries).

## When retries are appropriate

- Transient network errors
- 5xx responses from dependencies
- Rate limiting (429) when safe to retry

## When retries are dangerous

- Non-idempotent operations without idempotency keys
- Operations with side effects that can duplicate (payments, emails)

## Patterns

### 1) Timeouts first, then retries

A retry without a timeout just amplifies hanging calls.

### 2) Exponential backoff + jitter

Avoid synchronized retry storms.

### 3) Bounded retries

Use a small maximum attempt count, and surface failure clearly.

### 4) Idempotency keys

For POST-like actions, use an idempotency key so retries don’t duplicate side effects.

## Pseudocode

```text
attempts = 0
while attempts < max_attempts:
  try:
    return do_request(timeout=...)
  except TransientError:
    sleep(backoff_with_jitter(attempts))
    attempts += 1
raise FinalError
```

## Related skills

- `skills/domains/backend/api-design-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/code-quality/monitoring-patterns.md`
