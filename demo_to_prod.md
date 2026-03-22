# demo_to_prod.md

Bridge notes from the **PE Deal Intake Copilot demo** toward **production-grade** behavior, maintainability, and process. This captures gaps called out after the `HANDOFF_FINAL_IMPROVEMENTS.md` implementation pass.

---

## 1. What the demo already does well

- **Deterministic policy** (`server/utils/scoring.ts`) remains the authority for **score, decision, thesis_match**; Claude+MCP is **intake/narrative**, not decisioning.
- **Contracts** stay in `shared/types.ts` / `shared/schemas.ts`; mock scenarios and tools are isolated.
- **Regression signal**: `npm run sprint:ready` and `npm run build` validate core behavior after changes.
- **UX handoff items** (thesis selects, memo layout, simulated CRM, short reason bullets) align with `DEMO_ACCEPTANCE.md` and `HANDOFF_FINAL_IMPROVEMENTS.md` for demo purposes.

---

## 2. Known demo limitations (fix before “prod”)

### 2.1 Reason bullets can omit the risk line

`buildDeterministicReasonBullets` in `server/utils/scoring.ts` can build **more than six** lines before truncation; `slice(0, 6)` may **drop the risk penalty bullet** when many lines are present.

**Prod direction:** Cap at six **intentionally** (merge lines, or always include risk when `risk_penalty > 0` and drop a lower-priority line), and add a **unit test** that asserts risk appears when expected.

### 2.2 DEMO copy vs UI labels

`DEMO_ACCEPTANCE.md` still lists a section concept **“CRM Updated”**; the UI emphasizes **simulated** CRM (“CRM · Simulated”, disclaimer). Semantics match; **exact presenter wording** may differ.

**Prod direction:** Align `DEMO_ACCEPTANCE.md` / demo script with visible headings, or add a single **“CRM (simulated)”** line item in acceptance.

### 2.3 Claude reason deduplication is string-based

The UI filters `reasons[]` with a **prefix check** for `Claude intake summary (via MCP tools):`. If that string changes in `app/api/analyze-deal/route.ts`, the UI can **duplicate or hide** content incorrectly.

**Prod direction:** Prefer a **structured response**: e.g. `deterministic_reasons: string[]` and `claude_intake_summary?: string` (or keep one `reasons` array but add an explicit `claude_narrative` field). Update `shared/schemas.ts` and consumers together.

### 2.4 Thesis dropdown options only exist on the client

Thesis option lists live in `app/page.tsx`. If `DEFAULT_THESIS` / server defaults ever use a value **not** in those arrays, the `<select>` can show **inconsistent** state.

**Prod direction:** Single source of truth, e.g. `shared/thesisOptions.ts` (or constants exported from server mock config) **imported by both** UI and any validation layer.

---

## 3. Process: tests vs full review loop

`SKILLS_AND_REVIEW_LOOP.md` describes **iterative** engineer + design gates per chunk of work. A typical agent sprint may **substitute** that with:

- one implementation pass,
- `npm run sprint:ready` + `npm run build`,
- an informal self-review.

That is **not equivalent** to documented multi-pass review if you need **auditability** (e.g. regulated or enterprise delivery).

**Prod direction:** For meaningful releases, run the **checklists** in `SKILLS_AND_REVIEW_LOOP.md` explicitly (or your team’s PR template) and keep a short **change log** per milestone.

---

## 4. Engineering best practices (recommended refactors)

| Area | Demo state | Production-oriented step |
|------|------------|---------------------------|
| **UI file size** | Large `app/page.tsx` | Split into `components/` (form, memo, CRM card, Claude panel, traces). Easier review and testing. |
| **Thesis options** | Duplicated / client-only | Shared module + optional runtime validation of `ThesisInput` against allowed enums. |
| **API shape** | Reasons mix deterministic + Claude string | Separate fields or typed discriminated unions; version API if external clients exist. |
| **Copy / i18n** | English hard-coded in `scoring.ts` | Centralize templates; add i18n if needed; snapshot tests for tone and length. |
| **E2E** | Vitest on pure scoring | Add Playwright/Cypress for **critical paths** (analyze, scenario switch, error state). |
| **Observability** | Minimal | Structured logs for analyze route, latency, MCP spawn failures, redact secrets. |
| **Rate limits / auth** | None | Authn/z, rate limiting, and API keys per tenant if exposed beyond demo. |
| **Env validation** | Ad hoc | Startup or Zod validation for required env in production deployments. |

---

## 5. Product / governance (if score ever becomes “AI-assisted”)

Today **decision and score are deterministic**. If you later let a model **propose** a score:

- Require **schema-valid JSON**, **bounds checks**, and **fallback to deterministic** on parse/validation failure.
- Keep **audit fields**: model id, prompt hash/version, and tool trace IDs.
- Update **legal/compliance** copy in the UI.

This repo intentionally **does not** do that in the demo path.

---

## 6. Quick reference commands

```bash
npm run sprint:ready   # smoke + four scenarios
npm run build          # Next.js production build + TypeScript
```

---

## 7. Related docs

- `HANDOFF_FINAL_IMPROVEMENTS.md` — demo UI/UX spec (completed for sprint).
- `DEMO_ACCEPTANCE.md` — definition of done for the demo.
- `SKILLS_AND_REVIEW_LOOP.md` — quality and review playbook.
- `ENV.md` — environment variables and constraints.

---

*Last updated: reflects post–final-improvements review; use this as a backlog for hardening, not as blocking criteria for the demo itself.*
