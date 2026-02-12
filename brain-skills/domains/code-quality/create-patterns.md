# Create Patterns

Patterns for creating new components (modules, services, endpoints, jobs, CLI commands) with consistent structure.

## When to use

Use when creating:

- A new module/package
- A new API endpoint
- A new background job/worker
- A new CLI tool

## Create checklist

- [ ] Choose a canonical location (match existing project layout)
- [ ] Define interfaces and inputs/outputs
- [ ] Add minimal docs/README for the new component
- [ ] Add tests and fixtures
- [ ] Add logging and error handling

## Patterns

### 1) Start with a README and contract

Document:

- Purpose
- Inputs/outputs
- Failure modes
- How to run/test

### 2) Prefer composition over inheritance

Small, composable units are easier to test and evolve.

## Related skills

- `skills/domains/backend/api-design-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/code-quality/testing-patterns.md`
