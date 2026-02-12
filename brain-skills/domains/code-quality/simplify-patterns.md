# Simplify Patterns

Patterns for simplifying systems without breaking behavior.

## Simplification checklist

- [ ] Define what “simpler” means (less state, fewer branches, fewer dependencies)
- [ ] Preserve externally visible behavior (or document changes)
- [ ] Add tests first if behavior is not well specified
- [ ] Remove dead code and update docs

## Patterns

### 1) Delete code aggressively (with tests)

If a path is unused, remove it and rely on tests/CI to catch regressions.

### 2) Prefer data-driven logic

Replace long conditional chains with tables/maps when appropriate.

### 3) Reduce configuration surface area

Fewer knobs generally means fewer failure modes.

## Related skills

- `skills/domains/code-quality/refactor-patterns.md`
- `skills/domains/code-quality/code-hygiene.md`
