# ENV.md

## Environment Variables

Use environment variables for configuration. Do not commit real secrets.

### Required

- `NODE_ENV`
  - sample: `development`
- `PORT`
  - sample: `3000`
- `SCORING_MODE`
  - sample: `deterministic`
- `USE_MOCK_DATA`
  - sample: `true`
- `REAL_DATA_SOURCE_ENABLED`
  - sample: `false` — set `true` to call OpenCorporates public search for light enrichment (jurisdiction hint, source label).

### Claude + MCP orchestration (job-posting path; score stays deterministic)

- `ANTHROPIC_API_KEY`
  - required for Claude to drive MCP tools via `anthropic.beta.messages.toolRunner` + `mcpTools()`.
- `USE_CLAUDE_MCP_ORCHESTRATION`
  - sample: `true` (implicit when key is present). Set `false` to skip spawning MCP subprocess + Claude loop (instant deterministic path).
- `CLAUDE_MCP_TIMEOUT_MS`
  - sample: `55000` — abort orchestration and fall back with reason if exceeded.
- `MCP_SERVER_LOG_STDERR`
  - sample: `false` — set `true` to surface MCP server stderr in the parent process.
- `ANTHROPIC_MODEL`
  - sample: `claude-haiku-4-5-20251001` (default in code if unset)
- `ANTHROPIC_MODEL_PRIMARY` (optional)
  - if set and `ANTHROPIC_MODEL` is empty, used as the model id
- `ANTHROPIC_MODEL_FALLBACK` (optional)
  - if set and neither `ANTHROPIC_MODEL` nor `ANTHROPIC_MODEL_PRIMARY` is set, used as the model id

### Optional (Claude narrative only — when MCP orchestration is off)

- `ENABLE_CLAUDE_NARRATIVE`
  - sample: `false`. When MCP orchestration fails or is disabled, set `true` to polish deterministic `reasons` via a separate LLM call.

## Rules

- Default to mock mode for reliability and speed.
- Enable at most one real external source for demo.
- Keep scoring deterministic regardless of data source.
