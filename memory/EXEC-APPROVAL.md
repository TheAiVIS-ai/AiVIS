# Exec Approval Commands (2026-02-03)

## Set Auto-Approve

```
openclaw config set tools.exec.ask off
openclaw gateway config apply  # or restart
```

## Verify

```
openclaw config get tools.exec.ask  # \"off\"
openclaw status
```

## Revert

```
openclaw config set tools.exec.ask on-miss
openclaw gateway config apply
```

**Note**: Schema under `tools.exec.ask` (enum: off|on-miss|always).
