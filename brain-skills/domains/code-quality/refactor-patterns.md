# Refactor Patterns

Patterns for refactoring code safely, with minimal risk and maximal reviewability.

## Refactor checklist

- [ ] Is the refactor behavior-preserving?
- [ ] Are there tests that lock behavior before changes?
- [ ] Is the change split into mechanical vs logical commits?
- [ ] Did you avoid mixing feature work with refactor work?

## Patterns

### 1) The “strangler” approach

Wrap old code with a new interface, migrate callers gradually, then delete the old path.

### 2) Mechanical refactor first

Do renames/moves with no behavior changes first, then functional changes.

### 3) Golden tests for tricky code

For complex behavior, capture “golden” outputs and ensure they remain stable.

## Related skills

- `skills/domains/code-quality/testing-patterns.md`
- `skills/domains/code-quality/code-consistency.md`
- `skills/domains/code-quality/bulk-edit-patterns.md`
