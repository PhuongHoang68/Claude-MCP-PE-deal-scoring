# PE Deal Intake Copilot - Sprint Starter

This repo is prepared for a tight, deterministic demo sprint.

## Run Instructions

1. Install dependencies:
   - `npm install`
2. Start browser app (http://localhost:3000):
   - `npm run dev`
3. Run smoke test:
   - `npm run test:smoke`
4. Run four scenario checks:
   - `npm run test:scenarios`
5. Run full sprint readiness check:
   - `npm run sprint:ready`
6. Run production build verification:
   - `npm run build`
7. (Optional) Run MCP stdio server for Claude Desktop / MCP clients:
   - `npm run mcp`

## Optional Real Source Enrichment

- Set `REAL_DATA_SOURCE_ENABLED=true` to use OpenCorporates public endpoint enrichment.
- Leave `REAL_DATA_SOURCE_ENABLED=false` for deterministic mock-only mode.
- Scoring remains deterministic and mock-first even when enrichment is enabled.

## Claude + MCP orchestration (primary job path)

1. Set `ANTHROPIC_API_KEY` in `.env` (see `.env.example`).
2. Ensure `USE_CLAUDE_MCP_ORCHESTRATION` is not `false` (default: on).
3. `POST /api/analyze-deal` spawns the MCP stdio server (`server/mcp-server.ts`, same as `npm run mcp`), connects an MCP `Client`, and runs **Claude** with tools via Anthropic’s **`mcpTools()`** + **`toolRunner`** bridge.
4. **Scores and decisions** are still computed by **deterministic policy code** (`server/utils/scoring.ts`); Claude gathers context and produces the intake summary only.

If orchestration fails or no key is set, the API falls back to deterministic tool execution only (see `claude_mcp` in the JSON response).

## Optional Claude narrative (fallback path)

- When MCP orchestration is off or errors, set `ENABLE_CLAUDE_NARRATIVE=true` to polish **reason text only** via a separate call. Score and decision remain rule-based.

## Demo Script (3-5 minutes)

1. Open with positioning: "We accelerate PE intake and triage, not IC judgment replacement."
2. Enter company + thesis and run analysis.
3. Show **Deal overview** (normalized brief) then **Thesis Fit**, **Reasons**, **Risk Flags**, **Missing Data**, **Next Step**, **CRM Updated**, and **confidence**.
4. Expand **MCP tool trace** to show the four tools feeding the brief.
5. Highlight deterministic decision policy: `Go`, `Review`, `No-Go`.
6. Show CRM update payload and handoff to preliminary review.
7. Close with next-phase integrations after pilot approval.

## Current Baseline

- Shared contracts: `shared/types.ts`, `shared/schemas.ts`
- Deterministic mock scenarios: `server/mockData/scenarios.ts`
- MCP-equivalent tools: `server/tools/*`, orchestrator `server/orchestrator/buildNormalizedProfile.ts`
- MCP stdio server: `server/mcp-server.ts` (`npm run mcp`)
- Deterministic scoring policy: `server/utils/scoring.ts`
- Analyze route: `app/api/analyze-deal/route.ts`
- One-screen UI: `app/page.tsx`
- Acceptance tests: `tests/smoke.test.ts`, `tests/scenario-checks.test.ts`
