# OpenClaw

AI agent gateway with multi-model support, session management, and extensible tooling.

## Quick Overview

OpenClaw is an AI agent orchestration platform that enables:

- **Multi-model routing** with fallback support (OpenRouter, Groq, Google, etc.)
- **Session management** for persistent conversations and sub-agent spawning
- **Extensible tools** for file operations, command execution, web browsing
- **Memory systems** for context persistence
- **Workspace isolation** for secure code execution

## Architecture

- **Main Agent (Codex)**: Orchestrator with read-only access, delegates to workers
- **Worker Agents (Kimi)**: Specialized agents for code reading, writing, execution, research
- **Gateway**: Node.js service managing sessions, models, and tool execution
- **Extensions**: Plugin system for custom capabilities

## Key Files

- `WORKERS.md` - Worker orchestration guide
- `SOUL.md` - Agent personality and behavior
- `TOOLS.md` - Available tool reference
- `.archive/` - Full documentation and history

## Project Structure

```
workspace/
├── packages/       # Core packages
├── apps/           # Applications
├── extensions/     # Plugin system
├── src/            # Source code
└── .archive/       # Archived docs
```

## Configuration

- **Config**: `~/.openclaw/openclaw.json`
- **Agents**: Main (orchestrator) + 5 specialized workers
- **Models**: Codex (main), Kimi (workers)
- **Timeout**: 900s for free tier compatibility

## Documentation

Full documentation available in `.archive/README_FULL.md`

## Getting Started

Workers operate in `/home/grafe/.openclaw/workspace/` by default.

For detailed setup, architecture, and API documentation, see `.archive/README_FULL.md`
