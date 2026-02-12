# Validation Patterns

Patterns for validating inputs and state at system boundaries.

## What to validate

- External input (HTTP requests, webhooks, CLI args)
- Internal messages (queue/job payloads)
- Config/environment
- Database invariants

## Principles

- Validate **early** (at boundaries)
- Fail **loudly and consistently**
- Provide **actionable** error messages (but avoid leaking sensitive details)

## Patterns

### 1) Schema-based validation

Use a schema/struct/model validation system rather than manual checks.

### 2) Normalize then validate

Normalize casing/whitespace and parse types before validating ranges/constraints.

### 3) Separate validation from business logic

Keep “is this input well-formed?” separate from “is this action allowed?”.

## Related skills

- `skills/domains/backend/error-handling-patterns.md`
- `skills/domains/backend/api-design-patterns.md`
- `skills/domains/backend/auth-patterns.md`
