# Fix Patterns

Patterns for making “fix”-type changes safely and efficiently.

## When to use

Use these patterns when:

- You are addressing a bug/regression
- A dependency or security update requires a corrective change
- You need to restore broken CI/tests

## Core workflow

1. **Reproduce** the issue (or add a failing test).
2. **Minimize scope**: fix the smallest surface area possible.
3. **Prevent regressions**: add/adjust tests.
4. **Validate locally**: run the narrowest relevant test/lint set.
5. **Document** any non-obvious behavior and add links to related skills.

## Fix checklist

- [ ] Can you reproduce the bug deterministically?
- [ ] Do you understand the expected behavior?
- [ ] Is there an automated test that fails before the fix and passes after?
- [ ] Did you confirm no unrelated refactors snuck in?
- [ ] Did you run the smallest relevant test suite (unit/integration/e2e)?
- [ ] Did you update docs or comments if the fix changes behavior?

## Patterns

### 1) Add a “bug-revealing” test first

A good bug test:

- Fails for the right reason
- Doesn’t depend on timing/network unless the bug is about timing/network
- Uses a minimal fixture

### 2) Fix at the boundary, not the symptom

Prefer fixing the root cause at the boundary where invalid state is introduced (input validation, parsing, mapping).

### 3) Use structured errors

If the fix involves error handling, prefer typed/structured errors and consistent mapping to API/UI.

- See: `skills/domains/backend/error-handling-patterns.md`

## Example: “test-first” bug fix (Python)

```python
def test_parse_int_rejects_empty_string():
    with pytest.raises(ValueError):
        parse_int("")
```

## Related skills

- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/backend/validation-patterns.md`
- `skills/domains/code-quality/testing-patterns.md`
