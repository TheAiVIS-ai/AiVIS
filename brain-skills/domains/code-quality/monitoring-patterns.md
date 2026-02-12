# Monitoring Patterns

Patterns for monitoring systems so failures are detected quickly and diagnosed cheaply.

## What to monitor

- **SLIs**: latency, error rate, saturation
- **Business metrics**: events processed, jobs completed
- **Dependencies**: third-party availability, DB health

## Patterns

### 1) Monitor the user journey

Prefer monitoring “can the user do X?” over only internal component health.

### 2) Alert on symptoms, not noise

- Alert on sustained error rate / SLO burn
- Avoid paging on single failures

### 3) Tie alerts to runbooks

Every alert should link to:

- What it means
- Likely causes
- How to verify and mitigate

## Related skills

- `skills/domains/infrastructure/observability-patterns.md`
- `skills/domains/code-quality/logging-patterns.md`
- `skills/domains/backend/error-handling-patterns.md`
