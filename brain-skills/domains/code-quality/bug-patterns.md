# Bug Patterns

How to diagnose, fix, and prevent bugs in a systematic way.

## Bug triage checklist

- [ ] What is the user-visible symptom?
- [ ] When did it start? (last known good version)
- [ ] Is it reproducible?
- [ ] What inputs/environment are required?
- [ ] Is there a clear expected behavior?

## Common bug classes

### 1) Boundary bugs

- Incorrect parsing/validation
- Bad assumptions about nullability/optional fields

### 2) State bugs

- Cache invalidation errors
- Incorrect persistence/migration

### 3) Concurrency bugs

- Race conditions
- Retry storms

## Prevention patterns

- Add validation at boundaries (see `skills/domains/backend/validation-patterns.md`).
- Use structured error types (see `skills/domains/backend/error-handling-patterns.md`).
- Add regression tests close to the bug.

## Related skills

- `skills/domains/code-quality/fix-patterns.md`
- `skills/domains/backend/validation-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/backend/caching-patterns.md`
