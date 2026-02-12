# Update Patterns

Patterns for safe updates: dependencies, configuration, documentation, and internal APIs.

## Common update types

- Dependency updates (security/compatibility)
- Configuration updates
- Schema/API changes
- Docs and operational updates

## Update checklist

- [ ] Identify what changed upstream (release notes / changelog)
- [ ] Confirm compatibility constraints (language/runtime/framework)
- [ ] Update lockfiles deterministically
- [ ] Run targeted tests
- [ ] Watch for behavior changes (defaults, deprecations)

## Dependency update patterns

### 1) Update incrementally

Prefer smaller version jumps (or staged upgrades) to isolate breakages.

### 2) Pin and verify

- Pin versions where needed
- Verify with CI and, if relevant, a smoke test

### 3) Track breaking changes explicitly

Record any required code changes and why.

## Related skills

- `skills/domains/infrastructure/security-patterns.md`
- `skills/domains/code-quality/security-patterns.md`
- `skills/domains/code-quality/testing-patterns.md`
- `skills/domains/code-quality/code-hygiene.md`
