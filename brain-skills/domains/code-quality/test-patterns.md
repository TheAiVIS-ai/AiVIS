# Test Patterns (Operational)

This page complements `skills/domains/code-quality/testing-patterns.md` with practical patterns for adding and maintaining tests during day-to-day development.

## Principles

- Prefer **fast unit tests** for logic.
- Add **integration tests** for critical boundaries (DB, HTTP, queue).
- Avoid flaky tests; treat flakiness as a bug.

## Patterns

### 1) Name tests by behavior

Prefer “what it does” over “how it does it”.

### 2) Use fixtures/fakes, not ad-hoc mocks

Fakes make behavior clearer and reduce brittle expectations.

### 3) Test the failure modes

For each public boundary, test:

- Invalid input
- External failures (timeouts, 5xx)
- Authorization/permission failures (if applicable)

## Coverage guidance

Use coverage to find untested areas, not as a vanity metric.

See also:

- `skills/domains/code-quality/test-coverage-patterns.md`

## Related skills

- `skills/domains/code-quality/testing-patterns.md`
- `skills/domains/code-quality/test-coverage-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
