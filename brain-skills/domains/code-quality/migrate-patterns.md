# Migrate Patterns

Patterns for migrating systems safely (schemas, directory structures, APIs, and dependencies).

## Migration types

- DB/schema migrations
- File/directory layout migrations
- API contract migrations
- Dependency/runtime migrations

## Migration checklist

- [ ] Define the “before” and “after” states
- [ ] Provide a compatibility window if needed
- [ ] Make the migration reversible when possible
- [ ] Add validation checks
- [ ] Update docs and references

## Patterns

### 1) Dual-read / dual-write (when needed)

Temporarily support both old and new formats to reduce cutover risk.

### 2) Backfill + verify

- Backfill data/structure
- Verify counts/hashes/spot checks
- Only then switch consumers

## Related skills

- `skills/domains/backend/database-patterns.md`
- `skills/domains/backend/validation-patterns.md`
- `skills/domains/code-quality/testing-patterns.md`
