# Coverage Patterns

This page complements `skills/domains/code-quality/test-coverage-patterns.md` with operational guidance for using coverage effectively.

## Principles

- Coverage is a **signal**, not a goal.
- Focus on **critical logic** and **risk areas**.
- Avoid writing meaningless tests just to increase numbers.

## Patterns

### 1) Use coverage to find missing tests

- New modules with 0% coverage
- Error branches not covered
- Edge cases (empty input, null, limits)

### 2) Gate coverage carefully

If you enforce coverage thresholds:

- Start with non-blocking reporting
- Then enforce only on changed files
- Avoid global thresholds that block refactors

## Related skills

- `skills/domains/code-quality/test-coverage-patterns.md`
- `skills/domains/code-quality/testing-patterns.md`
