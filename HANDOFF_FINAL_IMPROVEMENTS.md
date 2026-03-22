# HANDOFF_FINAL_IMPROVEMENTS.md

**Executable specification** for UI/UX and copy improvements aligned with `final-improvements.md`.

This document is written for implementers operating as **senior engineers** (correctness, contracts, deterministic behavior, tests) and **senior product designers** (hierarchy, scanability, PE-appropriate language). It is intentionally detailed enough that **no further product input** is required unless a conflict appears in source-of-truth docs listed below.

---

## How to execute this work (review ↔ improvements loop)

**Do not “build straight through” without gates.**

Follow the mandatory loop in **`SKILLS_AND_REVIEW_LOOP.md`**:

1. Complete a **substantive implementation unit** (e.g. thesis controls, memo layout, scenario polish).
2. **Senior Engineer Review** → implement fixes → **re-review**.
3. When UI changes: **Senior Design Engineer Review** → implement fixes → **re-review**.
4. **Acceptance alignment** against `DEMO_ACCEPTANCE.md` and the checklist in **§10** below.

Repeat until gates are green. That file also defines **blocker handling** (5-minute rule), **scope guardrails**, and **definition of done** for the demo.

**Conflict resolution order** (when this handoff disagrees with another doc):  
`initial_instructions.md` → `DEMO_ACCEPTANCE.md` → `SCOPE.md` → `AGENTS.md` → `ENV.md` → `README.md` → `SKILLS_AND_REVIEW_LOOP.md` → **this file**.

---

## 1. Product intent

- **Audience:** PE / corp dev–style intake demo in **under 30 seconds** of scanning.
- **Promise:** Deterministic **score + decision** are policy-driven; **Claude + MCP** is an **intake/agent trace**, not the decision engine.
- **Non-goals for this pass:** new external integrations, auth, multi-page flows, replacing deterministic scoring with LLM judgment, or real CRM writes.

**Related goals doc:** `final-improvements.md` (numbered items 1–5 map to sections below).

---

## 2. Thesis UX (final-improvements §1)

### 2.1 Fields shown (five primary + threshold)

| # | Schema field | UI label (PE language) | Control |
|---|----------------|------------------------|---------|
| 1 | `target_industry` | Target industry | Select |
| 2 | `revenue_range` | Target revenue band | Select |
| 3 | `growth_preference` | Growth preference | Select |
| 4 | `profitability_preference` | Profitability preference | Select |
| 5 | `geography_preference` | Geography preference | Select |
| — | `minimum_fit_threshold` | Fit threshold (0–100) | **Collapsed** under “Advanced” `<details>` default **closed** |

**Rationale:** The five fields match the product ask; threshold stays in the contract and scoring but must not clutter the “five knobs” story.

### 2.2 Dropdown option lists (exact string values)

Values **must** match `ThesisInput` strings so existing `analyzeDeterministic` behavior is unchanged unless §7 explicitly allows policy edits.

**`target_industry`**

- `B2B SaaS`
- `Industrial Services`
- `B2B Fintech`
- `Healthcare IT`

**`revenue_range`** (thesis side — must remain compatible with `revenueBandInThesis` in `server/utils/scoring.ts`, especially the `5-50m` branch)

- `5-50M`
- `1-5M`
- `20-50M`
- `50M+`
- `<1M`

**`growth_preference`**

- `15-30%+`
- `10-20%`
- `Stable / <10%`

**`profitability_preference`**

- `EBITDA-positive preferred (15%+)`
- `EBITDA-positive preferred`
- `Growth-first; profitability flexible`

**`geography_preference`**

- `US`
- `North America`
- `Europe`

**`minimum_fit_threshold` (Advanced):** numeric stepper or select: `60`, `65`, `70` (default **70** to match `DEFAULT_THESIS` / `SUMMIT_DEFAULT_THESIS`).

### 2.3 Thesis presets (optional speed control)

Add two **chips or a small select** “Apply preset”:

| Preset name | Maps to |
|-------------|---------|
| Summit default | `SUMMIT_DEFAULT_THESIS` from `server/mockData/scenarios.ts` |
| Industrials tilt | `target_industry: Industrial Services`, `revenue_range: 20-50M`, `growth_preference: Stable / <10%`, `profitability_preference: EBITDA-positive preferred`, `geography_preference: US`, `minimum_fit_threshold: 70` |

Presets only **set form state**; server remains source of truth for types.

### 2.4 “Thesis visibly affects the result”

Above **Analyze Deal**, render a **read-only “Active thesis” summary** (one or two lines of text + optional chips) built from current form values. After analysis, **repeat the same summary** at the top of the memo panel so cause → effect is obvious.

**Do not** claim in copy that `growth_preference` / `profitability_preference` change numeric weights unless scoring is updated (today they flow to `tool_trace.thesis_context` only). If needed, footnote: *“Preferences inform context; score uses company facts vs thesis industry, size, and geography.”*

---

## 3. Analyst memo layout (final-improvements §2)

### 3.1 Right panel vertical order (top → bottom)

1. **Memo header** — “Analysis” or “Intake memo”; include **Active thesis** strip.
2. **Primary outcomes** (decision-forward):
   - **Thesis fit** (`thesis_match`: Strong / Moderate / Weak) — **largest type** in this block.
   - **Decision** (`decision`: Go / Review / No-Go) — second emphasis; if `decision === "Review"`, show sublabel **“Needs review”** (title case) under or beside it for demo language.
   - **Score** and **confidence** on **one secondary line** (smaller typography than thesis fit; never the visual hero).
3. **Status badges row** — compact, single palette (see §6): Claude+MCP, CRM (simulated), optional data source hint if present in `source_labels`.
4. **Reasons** — short bullets (see §7).
5. **Risk flags** — list from `risks`.
6. **Missing data** — list from `missing_data`.
7. **Next step** — `next_step`.
8. **CRM handoff** — simulated card (§5).
9. **Claude intake (MCP)** — indigo-tinted panel **below** memo core (agent trace, not above decision).
10. **Deal overview** — company facts grid (current fields).
11. **Collapsible technical depth** — Claude tool invocations; deterministic `tool_trace` JSON.

### 3.2 Information design rules

- **One column** memo on mobile; same order.
- **No duplicate** giant score badges: at most **one** score treatment in the hero block; remove redundant score pill if it competes with thesis fit.
- Loading: disable submit + show **Analyzing…**; preserve layout skeleton if low effort.

---

## 4. Incomplete-data scenario (final-improvements §3)

### 4.1 Current codebase fact

`server/mockData/scenarios.ts` already defines **`incomplete`** (`Aster Analytics`) with missing revenue, unknown HQ, unknown profitability, **low `data_confidence` (41)**. `missingKeyFields` in `scoring.ts` forces **`decision: "Review"`** for that profile shape.

### 4.2 Required implementation

- **Do not add a fifth scenario key** unless `DEMO_ACCEPTANCE.md` / tests are updated to require five; prefer **strengthening the existing incomplete archetype** and **UI storytelling**.
- In the scenario dropdown, label this option clearly: e.g. **“Aster Analytics (incomplete data)”**.
- Ensure the memo path makes **low confidence** and **Review / Needs review** obvious (§3).
- Optional demo enhancement: with `REAL_DATA_SOURCE_ENABLED=true`, Aster’s HQ **Unknown** allows OpenCorporates to fill a jurisdiction hint when search returns a hit — **do not** depend on it for acceptance (network flaky).

---

## 5. CRM simulation (final-improvements §4)

### 5.1 Contract

Keep using `crm_update` from API (`status`, `stage`, `note`). Stage remains **“Preliminary Review”**.

### 5.2 UI requirements

- **Badge:** `CRM · Simulated` or `CRM updated (simulated)` — must read as **internal demo**, not Salesforce.
- **Card:** small bordered block: stage, one-line note, disclaimer: **“Demo only — no external CRM contacted.”**
- Placement: immediately after **Next step** (§3.1).

---

## 6. Visual system (final-improvements §5)

### 6.1 Baseline

- Keep **dark theme**: `body` background `#0b1220`, light text; retain `.panel` pattern from `app/globals.css`.
- **Spacing scale:** 24px (`gap-6`) between major sections; consistent `space-y-4` inside panels.

### 6.2 Badge discipline (design debt control)

- **Max three semantic colors** in the badge row:
  - **Accent (cyan):** thesis fit / primary fit signal.
  - **Neutral (slate):** metadata (score+confidence line, model id).
  - **State (amber or violet):** decision or MCP on/off — pick **one** mapping and document in a one-line comment in `page.tsx`.

Avoid rainbow rows (indigo + emerald + violet + amber at equal weight). **Claude block** keeps subtle **indigo** tint as the single “agent” accent.

### 6.3 Typography

- Page title: existing weight.
- Memo **Thesis fit:** `text-xl`–`text-2xl` range; **Decision:** `text-lg`–`text-xl`; **Score:** `text-sm`–`text-base` muted.

---

## 7. Reasons copy (engineering + design)

Today `analyzeDeterministic` emits one long weighted breakdown plus two factual lines. Replace with **3–6 short bullets** aligned to policy outcomes, e.g.:

- Industry vs thesis (match / mismatch).
- Revenue band vs thesis band (fit / unknown / gap).
- Growth and profitability **from company profile** (not thesis preference text unless scoring changes).
- Geography vs thesis.
- Data completeness / confidence one-liner.
- Risk penalty summary **one short line** if penalty &gt; 0.

**Rules:**

- Bullets ≤ **120 characters** where possible.
- No chatbot tone; PE memo voice.
- Preserve **deterministic** generation (template from `computeScoreBreakdown` outputs, not LLM).

**Claude summary:** When `claude_mcp.enabled` and `assistant_summary` present, keep as **separate** subsection (already separate panel) or single prefixed bullet **after** deterministic bullets — do not bury structured bullets under prose.

---

## 8. OpenCorporates & Claude+MCP (behavioral contract)

- **OpenCorporates:** no UI toggle required; behavior remains env-driven (`REAL_DATA_SOURCE_ENABLED`). If `opencorporates_public` appears in `source_labels`, optional subtle text under **Sources** is enough.
- **Claude+MCP:** no change to orchestration contract; continue to expose `claude_mcp` payload as today. Do not use model output for `decision` or `score`.

---

## 9. Allowed files to touch

Implementer may modify:

- `app/page.tsx`, `app/globals.css`, `app/layout.tsx` (only if needed for typography)
- `server/mockData/scenarios.ts` (incomplete labeling / copy-safe profile tweaks only if tests updated)
- `server/utils/scoring.ts` (**reason strings only** unless a bug blocks §4; policy changes require test updates)
- `tests/scenario-checks.test.ts`, `tests/smoke.test.ts` (if expectations change)
- `README.md` / `DEMO_ACCEPTANCE.md` — only if user-facing behavior or checklist changes

Do **not** change `shared/schemas.ts` unless the API contract must change (out of scope unless broken).

---

## 10. Acceptance checklist (definition of done for this handoff)

- [ ] Thesis: five selects + Advanced threshold; values match §2.2 strings.
- [ ] Active thesis visible before and after analyze (§2.4).
- [ ] Memo order matches §3.1; thesis fit + decision dominate; score secondary.
- [ ] Incomplete scenario clearly labeled; shows **Review** + **Needs review** sublabel + low confidence.
- [ ] CRM simulated badge + disclaimer + stage **Preliminary Review** (§5).
- [ ] Visual: reduced badge noise; consistent spacing (§6).
- [ ] Reasons: short deterministic bullets (§7).
- [ ] `npm run sprint:ready` passes.
- [ ] Engineer + design review loops in **`SKILLS_AND_REVIEW_LOOP.md`** completed for this change set.

---

## 11. Verification commands

```bash
npm run sprint:ready
npm run build
```

---

## 12. Handoff summary template (for the agent / PR)

When finished, report:

1. What changed (file-level bullets).
2. What was verified (commands + manual scenario notes).
3. Pending user inputs (should be **none** if this spec was sufficient).
4. Demo script delta (if any).

---

*Document version: 1.0 — aligned with repo state as of creation; scenarios and scoring references: `server/mockData/scenarios.ts`, `server/utils/scoring.ts`.*
