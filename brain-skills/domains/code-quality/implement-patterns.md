# Implement Patterns

Patterns for implementing features in a way that is testable, reviewable, and maintainable.

## Key ideas

- **Small PRs**: implement in increments.
- **Clear seams**: define interfaces so you can unit test logic.
- **Explicit edge cases**: list them and test them.

## Implementation flow

1. Write a short design note in the PR description (or issue) describing:
   - What changes
   - What does not change
   - Failure modes
2. Implement a minimal vertical slice.
3. Add tests (unit → integration).
4. Add instrumentation (logs/metrics) for new behavior.

## Patterns

### 1) Dependency injection for test seams

Pass clients/stores as parameters so they can be faked in tests.

### 2) Separate pure logic from I/O

Keep parsing/validation and business logic pure when possible.

## Related skills

- `skills/domains/code-quality/testing-patterns.md`
- `skills/domains/backend/validation-patterns.md`
- `skills/domains/code-quality/logging-patterns.md`
