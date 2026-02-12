# Bootstrap Patterns

## Why This Exists

New projects require consistent initialization with templates, documentation, and tooling. Manual setup is error-prone and time-consuming. The brain repository provides automated bootstrap infrastructure that generates complete project scaffolding in ~14 seconds using intelligent generators that infer structure from tech stack specifications.

## When to Use It

- **Starting a new project**: Run `new-project.sh` to generate complete project structure
- **Adding new tech stacks**: Extend templates/ and generator logic for new frameworks
- **Maintaining templates**: Update template files when patterns evolve
- **Creating project variants**: Use tech stack parameters to customize bootstrap output

**Triggers for bootstrap:**

- "I need to create a new [backend/python/ralph] project"
- "Set up a new microservice with [tech stack]"
- "Initialize project structure for [goals]"

## Details

### Architecture Overview

```text
new-project.sh (orchestrator)
    ↓

1. Collect inputs (interactive prompts)

    ↓

2. Invoke HIGH INTELLIGENCE generators

    ├── generate-thoughts.sh      (THOUGHTS.md - project goals)
    ├── generate-neurons.sh       (NEURONS.md - codebase map)
    └── generate-implementation-plan.sh (workers/IMPLEMENTATION_PLAN.md - tasks)
    ↓

3. Copy static templates

    ├── templates/AGENTS.project.md
    ├── templates/[stack]/VALIDATION_CRITERIA.project.md
    └── templates/[stack]/NEURONS.project.md (fallback)
    ↓

4. Git initialization (optional)

```text

**Execution time:** ~14 seconds for complete project bootstrap

### HIGH INTELLIGENCE Generators

The three generators use bash to parse tech stack specifications and infer appropriate project structure:

#### 1. generate-thoughts.sh (388 lines)

**Purpose:** Generate project goals, success criteria, and knowledge base references

**Intelligence features:**

- Parses tech stack into structured format (backend, database, auth, etc.)
- Infers relevant KB references (e.g., FastAPI → api-design-patterns.md, PostgreSQL → database-patterns.md)
- Generates Definition of Done categories based on project type
- Creates success metrics from user-provided goals
- Infers source code structure expectations

**Key sections generated:**

```markdown
## Project Definition
## Goals
## Success Criteria
## Relevant Knowledge
## Definition of Done

```text

#### 2. generate-neurons.sh (714 lines)

**Purpose:** Generate codebase map showing directory structure and conventions

**Intelligence features:**

- Infers directory structure from tech stack (backend vs python vs ralph)
- Generates file type conventions (where to find routes, models, tests)
- Creates quick reference commands (test runners, linters, servers)
- Produces validation commands for project health checks
- Builds "I need to..." task mapping table

**Key sections generated:**

```markdown
## Directory Structure
## File Conventions
## Quick Reference
## Validation Commands
### "I need to..."

```text

**Example inference:**

- Input: `backend,fastapi,postgresql`
- Output: FastAPI project structure with `app/`, `tests/`, `alembic/`, PostgreSQL connection patterns

#### 3. generate-implementation-plan.sh (659 lines)

**Purpose:** Generate prioritized task list from project goals

**Intelligence features:**

- Parses goals into structured tasks (setup, features, testing, deployment)
- Generates phase structure based on project type
- Creates feature tasks from goal descriptions
- Adds testing and deployment tasks automatically
- Organizes tasks by priority (High/Medium/Low)

**Key sections generated:**

```markdown
## Current State
## Goal
## Prioritized Tasks
### High Priority
### Medium Priority
### Low Priority

```text

### Template System

Templates provide static baseline content that doesn't require inference:

```text

templates/
├── AGENTS.project.md              # Operational guide (all projects)
├── NEURONS.project.md             # Generic codebase map (fallback)
├── THOUGHTS.project.md            # Project definition (fallback)
├── backend/
│   ├── AGENTS.project.md
│   ├── NEURONS.project.md
│   ├── THOUGHTS.project.md
│   └── VALIDATION_CRITERIA.project.md
├── python/
│   └── [same structure as backend]
└── ralph/
    ├── IMPLEMENTATION_PLAN.project.md
    ├── loop.sh
    ├── PROMPT.project.md
    ├── RALPH.md
    └── VALIDATION_CRITERIA.project.md

```text

**Template naming convention:** `*.project.md` indicates template files

**Template selection logic:**

1. Check for stack-specific template: `templates/{stack}/FILE.project.md`
2. Fall back to generic template: `templates/FILE.project.md`
3. Skip if neither exists (generator will create it)

### Why Bash for Generators?

**Decision rationale:**

- **Speed:** Bash text processing is fast (~14 seconds for 3 generators)
- **Simplicity:** No dependencies, runs everywhere (WSL2, Linux, macOS)
- **String manipulation:** sed/awk/heredocs are perfect for template generation
- **Portability:** Single file per generator, easy to version control
- **Maintainability:** Inline documentation with `# HIGH INTELLIGENCE` markers

**Trade-offs:**

- More verbose than Python/Node.js for complex logic
- Requires bash knowledge for maintenance
- Limited error handling compared to modern languages

### Template Evolution Strategy

**When to update templates:**

- Pattern discovered in 3+ projects → extract to template
- Convention changes (e.g., testing framework migration)
- New tech stack support (add new templates/ subdirectory)
- Security or performance best practices evolve

**How to update templates:**

1. Modify template file in `templates/` or `templates/{stack}/`
2. Test with `new-project.sh` in scratch directory
3. Update NEURONS.md if new files added
4. Document pattern in relevant `kb/domains/*.md` file
5. Commit with message: "Update {stack} template: {change}"

**Versioning approach:**

- Templates don't have version numbers
- Evolution tracked via git history
- Breaking changes documented in commit messages
- Old projects aren't automatically updated (intentional)

### Bootstrap Workflow

**Interactive mode (default):**

```bash
cd /path/to/brain/ralph
bash new-project.sh
# Prompts for: project name, type, tech stack, goals
# Generates files in ../projects/{project-name}/

```text

**Non-interactive mode (future):**

```bash
bash new-project.sh --name myapp --type backend \
  --stack "fastapi,postgresql,redis" \
  --goals "Build REST API for user management"

```text

### Generator Maintenance

**Adding new tech stack support:**

1. Create template directory: `templates/{new-stack}/`
2. Add stack-specific templates (AGENTS.md, NEURONS.md, etc.)
3. Update generator logic in all three generators:
   - `generate-thoughts.sh`: Add KB references for stack
   - `generate-neurons.sh`: Add directory structure inference
   - `generate-implementation-plan.sh`: Add stack-specific tasks
4. Test bootstrap with new stack
5. Document patterns in relevant KB files

**Testing generators:**

```bash
# Test in scratch directory
mkdir -p /tmp/test-bootstrap
cd /tmp/test-bootstrap

# Run new-project.sh and verify output
bash /path/to/brain/ralph/new-project.sh

# Validate generated files
ls -la
grep "HIGH INTELLIGENCE" ../brain/ralph/generators/*.sh

```text

### Common Patterns

**Heredoc usage for multi-line generation:**

```bash
cat >> "$OUTPUT_FILE" << EOF
# Generated Section
Content with variable expansion: $PROJECT_NAME
EOF

```text

**Conditional generation based on tech stack:**

```bash
if [[ "$TECH_STACK" == *"postgresql"* ]]; then
  echo "- Database migrations (Alembic)" >> "$OUTPUT_FILE"
fi

```text

**Parallel generator execution:**
Currently sequential (new-project.sh calls each generator in order).
Future optimization: Run generators in parallel with `&` and `wait`.

## Anti-Patterns

### ❌ Anti-Pattern: Manual Project Setup

```bash
# BAD: Manually creating project structure
mkdir -p cortex workers/ralph docs skills
touch cortex/AGENTS.md workers/IMPLEMENTATION_PLAN.md
# ... 20 more files, all empty or copy-pasted
```

**Why it's wrong:**

- Inconsistent structure across projects
- Missing required files
- Outdated boilerplate
- High probability of human error

**Correct approach:**

```bash
# GOOD: Use bootstrap generator
bash new-project.sh brain-map backend,python,fastapi
```

### ❌ Anti-Pattern: Copy-Paste from Old Project

```bash
# BAD: Copying from another project
cp -r ../old-project/cortex ./cortex
cp -r ../old-project/workers/ralph ./workers/ralph
# Now manually editing 50 files to remove old project references
```

**Why it's wrong:**

- Old project's context leaks into new project
- Templates may be outdated
- Inherits old project's bugs and hacks
- No guarantee of completeness

**Correct approach:**

```bash
# GOOD: Generate fresh from templates
bash new-project.sh my-project backend,go,postgres
```

### ❌ Anti-Pattern: Skipping NEURONS.md Generation

```bash
# BAD: Creating project without structure map
bash new-project.sh my-project backend
# Delete NEURONS.md because "I'll document it later"
rm cortex/NEURONS.md
```

**Why it's wrong:**

- Ralph wastes tokens exploring structure
- Agents make incorrect assumptions about file locations
- Manual NEURONS.md updates fall out of sync

**Correct approach:**

```bash
# GOOD: Keep generated NEURONS.md and update when structure changes
# (Already generated by new-project.sh)
# Regenerate when structure changes:
tree -L 3 --dirsfirst > cortex/NEURONS.md
```

### ❌ Anti-Pattern: Ignoring Validation Commands

```bash
# BAD: Generating project and immediately pushing
bash new-project.sh my-project backend
git add -A && git commit -m "new project" && git push
# Deployed project with syntax errors
```

**Why it's wrong:**

- Syntax errors in generated files
- Missing required sections
- Invalid cross-references
- Broken verifier checks

**Correct approach:**

```bash
# GOOD: Validate before committing
bash new-project.sh my-project backend
bash workers/ralph/verifier.sh
# Fix any [FAIL] items
git add -A && git commit -m "feat: bootstrap my-project"
```

### Bootstrap Testing (Future)

**Automated test approach:**

```bash
# Test bootstrap creates expected files
for stack in backend python ralph; do
  test_dir="/tmp/test-$stack-$(date +%s)"
  mkdir -p "$test_dir"
  cd "$test_dir"
  
  # Run bootstrap non-interactively
  bash /path/to/brain/ralph/new-project.sh \
    --name "test-$stack" \
    --type "$stack" \
    --non-interactive
  
  # Verify files exist
  [[ -f AGENTS.md ]] || echo "FAIL: AGENTS.md missing"
  [[ -f NEURONS.md ]] || echo "FAIL: NEURONS.md missing"
  [[ -f workers/IMPLEMENTATION_PLAN.md ]] || echo "FAIL: workers/IMPLEMENTATION_PLAN.md missing"
  
  # Verify generators executed
  grep -q "HIGH INTELLIGENCE" NEURONS.md || echo "FAIL: Generator didn't run"
  
  # Cleanup
  rm -rf "$test_dir"
done

```text

### Performance Metrics

**Current bootstrap performance:**

- Generator execution: ~2-3 seconds per generator
- Template copying: <1 second
- Git initialization: ~1 second
- Total time: ~14 seconds

**Optimization opportunities:**

- Parallel generator execution: ~50% time reduction (theoretical)
- Pre-compiled templates: Minimal gain (I/O already fast)
- Caching KB references: Not worth complexity

### Related Patterns

- **Ralph Loop:** Uses bootstrap templates for ralph-type projects
- **Template Inheritance:** Backend/python templates extend generic templates
- **Knowledge Base:** Generators reference KB files for pattern suggestions
- **Validation:** Each stack has validation criteria for quality gates

### See Also

- `new-project.sh` - Bootstrap orchestrator
- `generators/generate-*.sh` - Three HIGH INTELLIGENCE generators
- `templates/` - Static template files
- `kb/domains/ralph-patterns.md` - Ralph loop architecture
- `NEURONS.md` - Brain repository map (self-reference)
