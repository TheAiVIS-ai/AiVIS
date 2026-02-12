# Security Patterns (Engineering Workflow)

Practical patterns for keeping a codebase secure during normal development work.

> Note: This is about *engineering workflow* (dependency hygiene, secure defaults). For authentication/authorization specifics, see backend auth patterns.

## Dependency security

### 1) Prefer automated auditing

- Use dependency scanners (e.g., `npm audit`, `pip-audit`, GitHub Dependabot)
- Treat “high/critical” as urgent

### 2) Upgrade with verification

- Read release notes for breaking changes
- Run targeted tests
- Add a quick smoke test for the updated area

### 3) Lockfile discipline

- Commit lockfile updates
- Avoid hand-editing lockfiles

## Secure defaults

- Deny by default (authz)
- Validate all inputs
- Avoid leaking secrets in logs

## Related skills

- `skills/domains/backend/auth-patterns.md`
- `skills/domains/backend/validation-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
