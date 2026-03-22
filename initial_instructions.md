# PE Deal Intake Copilot (Claude MCP Demo)

## Goal

Build a **high-conviction demo** for a private equity firm in about **10 hours with assisted AI in Cursor**.

The demo should help you **land the client**, not prove production readiness.

## Tight executable plan (client-ready)

This section is the operating plan. If anything conflicts with later detail, this section wins.

### Demo objective (business outcome)

In one screen and one flow, prove that we can:

1. take fragmented deal inputs
2. normalize them into a consistent deal brief
3. score against a configurable fund thesis
4. produce a defensible recommendation draft with reasons, risks, and uncertainty
5. simulate CRM write-back

### Non-negotiable acceptance criteria

The demo is ready only if all are true:

* End-to-end run completes in under 10 seconds with mock data.
* Output is strict JSON matching schema with no missing required fields.
* Decision is deterministic from the scoring policy (no free-form drift).
* At least 4 scenarios work: Strong fit, Weak fit, Incomplete, Risky but interesting.
* UI shows: Thesis Fit, Reasons, Risk Flags, Missing Data, Next Step, CRM Updated.
* Language is PE workflow language, not chatbot language.

### 10-hour build plan (time-boxed)

**Hour 0.0-0.5: lock scope**

* freeze one workflow only
* freeze schema and scoring policy
* freeze 4 mock scenarios

**Hour 0.5-2.0: shared contracts first**

* implement `shared/types` + `shared/schemas`
* validate all tool responses and final output against schema
* add one contract test per schema

**Hour 2.0-4.0: deterministic data + tools**

* implement mock scenario generator
* implement 4 MCP tools with stable response shapes
* add fixture tests for each scenario

**Hour 4.0-6.0: orchestration and scoring**

* implement analyze endpoint
* call MCP tools and build normalized profile
* run deterministic scoring + decision policy
* generate concise PE-style recommendation text

**Hour 6.0-8.0: UI and workflow proof**

* build one-screen UI (input, thesis editor, results)
* render structured sections and badges
* show CRM write-back simulation state

**Hour 8.0-9.0: quality pass**

* run through all 4 scenarios
* verify output consistency and threshold behavior
* tighten copy to PE wording

**Hour 9.0-10.0: demo polish**

* create narrative script (3-5 min)
* record one clean run + one fallback run
* prep FAQ on limitations and next phase

### Live demo script (what to say)

1. "We are not replacing IC judgment; we are accelerating intake and triage."
2. Enter company + thesis and run analysis.
3. Show normalized profile and thesis-fit rationale.
4. Show why decision is `Go`, `Review`, or `No-Go` from explicit policy.
5. Show CRM update payload and explain handoff to analyst workflow.
6. Close with phased roadmap (integration hardening after pilot approval).

### Phase-2 roadmap (only if asked)

* real CRM connector and auth
* source-level provenance and audit trail
* thesis versioning by partner/fund
* benchmark calibration against historical deals

### Core positioning

Do **not** present the AI as a universal judge of whether a deal is good.
Private equity firms score deals based on their **own fund thesis, buying criteria, and relationships**, so a generic score can easily be wrong.

Instead, position the product as a:

> **Deal Intake Copilot**

It helps the team:

* ingest fragmented data
* normalize it into a structured deal brief
* highlight thesis fit, red flags, and missing information
* draft a recommendation for human review
* simulate writing the result back to CRM / deal platform

This is safer, more believable, and more likely to win the client.

---

## Why this is the right demo

This approach is better than a generic "deal scoring engine" because it:

* respects that every PE firm has different criteria
* avoids overclaiming that AI knows their investment style
* shows workflow acceleration rather than replacement of judgment
* maps directly to the client's language around fragmented data, CRM integration, and deal scoring
* creates a more credible sales conversation

The goal is not to say:

* "our AI decides the deal"

The goal is to say:

* "our AI helps your team structure messy deal data and draft a thesis-aware recommendation faster"

---

## What the client is actually buying

The client is not buying a generic AI score.
They are evaluating whether you understand their workflow and can make their team faster without breaking their process.

The demo must therefore show:

* fragmented data becoming structured data
* a thesis-aware recommendation draft
* reason codes and risk flags
* simulated CRM write-back
* simple but realistic workflow design

---

## Strict scope

### Included

* One workflow only: **Deal intake + structuring + draft recommendation**
* 3–4 MCP tools
* Claude reasoning through MCP
* Minimal UI or CLI
* Mock data with optional lightweight real enrichment
* Simulated CRM update
* Thesis configuration that can be edited in the demo

### Excluded

* Real CRM auth or full integrations
* Production-grade auth
* Multi-workflow orchestration
* Complex RAG
* Real underwriting or valuation models
* Real-time financial modeling
* Fancy dashboards

If something is going to take more than about 1 hour, cut it.

---

## Recommended demo narrative

When presenting, say something like:

> I did not build a generic deal-scoring model, because every fund evaluates deals differently. Instead, I built a workflow where AI helps structure fragmented deal data and generate a thesis-aligned draft recommendation that your team can quickly validate and act on.

This framing is the point of the demo.

---

## Architecture

### Components

Frontend

* simple form with company name and optional website
* thesis configuration panel
* results panel

Backend

* API route or small server
* MCP server
* Claude integration
* mock CRM write-back

Claude / MCP

* Claude orchestrates the flow
* MCP exposes tools for data retrieval and normalization
* Claude produces the final recommendation draft

---

## Flow

User enters a target company and optional thesis settings.

Backend sends request to Claude.

Claude uses MCP tools to gather fragmented data:

* company profile
* financial signals
* risk flags

Claude then:

* normalizes the inputs
* applies thesis-aware reasoning
* returns a structured deal brief
* generates a draft recommendation
* simulates writing back to CRM

---

## Where the MCP server sits

The MCP server sits between Claude and the data/tools.

It should expose narrow, simple tools that Claude can call.

Do not overbuild it.

The server's job is only to:

* fetch or generate data
* normalize the shape of the data
* provide facts to Claude

Claude does the reasoning.

---

## MCP tools

Create 3 or 4 tools only.

### 1. get_company_profile

Returns:

* company name
* domain
* industry
* short description
* headquarters
* founding year if known

### 2. get_financial_signals

Returns:

* revenue range
* growth indicator
* profitability indicator
* employee range if known
* confidence level

### 3. get_risk_flags

Returns:

* customer concentration risk
* missing data flags
* geography risk if relevant
* business model concerns
* overall data completeness score

### 4. get_thesis_context

Returns the fund's working criteria:

* target industry
* preferred revenue band
* geography preference
* growth preference
* profitability preference
* minimum fit threshold

This is important because it makes the demo thesis-aware instead of generic.

---

## Input data structure

```json
{
  "company_name": "string",
  "website": "string (optional)",
  "thesis": {
    "target_industry": "string",
    "revenue_range": "string",
    "growth_preference": "string",
    "profitability_preference": "string",
    "geography_preference": "string",
    "minimum_fit_threshold": 70
  }
}
```

---

## Internal normalized deal profile

This is the shape Claude should reason over.

```json
{
  "company_name": "string",
  "website": "string",
  "industry": "string",
  "headquarters": "string",
  "revenue_range": "unknown | <1M | 1-5M | 5-20M | 20-50M | 50M+",
  "growth_indicator": "low | medium | high | unknown",
  "profitability_indicator": "yes | no | unknown",
  "employee_range": "string",
  "risk_flags": ["string"],
  "data_confidence": "integer 0-100",
  "thesis_fit": "integer 0-100",
  "source_labels": ["string"]
}
```

---

## Final output structure

The final output should feel like a PE analyst summary, not a chatbot answer.

```json
{
  "company_name": "string",
  "thesis_match": "Strong | Moderate | Weak",
  "score": "integer 0-100",
  "decision": "Go | Review | No-Go",
  "reasons": ["string"],
  "risks": ["string"],
  "missing_data": ["string"],
  "confidence": "integer 0-100",
  "next_step": "string",
  "crm_update": {
    "status": "updated",
    "stage": "Preliminary Review",
    "note": "string"
  }
}
```

---

## Scoring logic

Do not make the model universal.
Make it thesis-aware.

Use a simple scoring framework like this:

* industry fit
* size fit
* growth fit
* profitability fit
* geography fit
* data completeness
* risk penalty

The AI should not say this is objectively a good deal.
It should say whether the deal appears to fit the **current thesis**.

That is what makes the demo safe and useful.

### Deterministic scoring policy (required)

Use weighted components:

* industry fit: 25
* size fit: 20
* growth fit: 15
* profitability fit: 10
* geography fit: 10
* data completeness: 10
* risk penalty: -30 max

Formula:

* `score = clamp(0, 100, positive_components - risk_penalty_abs)`
* `thesis_fit = score`
* `confidence = data_confidence`

Decision rules:

* `Go` if `score >= minimum_fit_threshold` AND no critical risk flags
* `Review` if `score` is within 10 points below threshold OR missing key fields
* `No-Go` if `score < (minimum_fit_threshold - 10)` OR severe mismatch (industry + size)

Match label:

* `Strong` if `score >= 80`
* `Moderate` if `score >= 60 and < 80`
* `Weak` if `< 60`

---

## Data strategy

### Important principle

The demo data can be simplistic.
That is okay if the workflow feels real.

What matters most is the **shape of the experience**:

* multiple sources
* normalized output
* thoughtful reasoning
* CRM-style write-back

Do not waste time trying to perfectly match their internal data model.
You are demonstrating capability and workflow understanding, not exact integration fidelity.

---

## Mock data strategy

Use deterministic mock data with 4 archetypes.

### Archetype 1: strong fit

* B2B SaaS
* fits revenue band
* high growth
* low risk
* good match to thesis

### Archetype 2: weak fit

* wrong sector
* wrong size
* low growth
* clear mismatch

### Archetype 3: incomplete data

* missing revenue
* missing profitability
* low confidence
* requires human review

### Archetype 4: risky but interesting

* fits some criteria
* has customer concentration or geography risk
* could go either way

This makes the demo feel more realistic without requiring real data complexity.

### Example mock generator logic

```js
if (companyName.toLowerCase().includes("ai") || companyName.toLowerCase().includes("cloud")) {
  return {
    industry: "B2B SaaS",
    revenue_range: "5-20M",
    growth_indicator: "high",
    profitability_indicator: "unknown"
  };
}
```

Use a few branching rules like this to create believable variation quickly.

---

## What PE firms are used to seeing

The output should resemble what a PE team would expect from a quick pre-screen:

* concise recommendation
* reasons tied to the thesis
* risk flags
* missing data notes
* next step suggestion
* stage / CRM update

Use language such as:

* thesis fit
* preliminary review
* target size
* red flags
* missing diligence items
* analyst follow-up

Keep it in the language of deal teams, not generic AI language.

---

## APIs

### Use only if they are fast and helpful

Do not spend the build budget on integration work.

The safest plan is:

* use mock data first
* add one lightweight public source only if it is quick

### Optional sources

1. SEC EDGAR

* useful if you want a real company data source
* good for filings / public-company enrichment

2. OpenCorporates

* useful for company identity / basic firmographic cleanup

3. Crunchbase if you already have access

* useful for firmographic context

### Recommendation

If integration work becomes slow, stop and keep mock data only.
The demo does not need real data to win.

---

## Execution gates (single source of truth)

Use this as the only go/no-go standard.

### Must-have outcomes

* one-screen, one-flow demo that runs in under 10 seconds
* strict schema-valid JSON output on every run
* deterministic score and decision from thesis + rules
* clear PE-language recommendation with reasons, risks, and missing data
* CRM write-back simulation visible in the UI

### Explicitly out of scope

* production auth and authorization
* real CRM authentication or bi-directional sync
* complex RAG or deep financial modeling
* multi-workflow productization

### Kill-switch rule (protect the 10-hour timeline)

If any item takes more than 60 minutes without clear progress, cut it and continue with mock-backed deterministic behavior.

### Client-facing promise

> "AI-assisted deal intake and triage for a PE team with fragmented data."

---

## Recommended file structure

Keep the codebase small and easy for Cursor to generate.

```txt
pe-deal-copilot/
├── app/
│   ├── page.tsx or main UI entry
│   ├── api/
│   │   └── analyze-deal/route.ts or equivalent
├── server/
│   ├── mcp-server.ts
│   ├── tools/
│   │   ├── getCompanyProfile.ts
│   │   ├── getFinancialSignals.ts
│   │   ├── getRiskFlags.ts
│   │   └── getThesisContext.ts
│   ├── mockData/
│   │   ├── companies.ts
│   │   ├── theses.ts
│   │   └── scenarios.ts
│   ├── prompts/
│   │   └── dealAnalysisPrompt.ts
│   └── utils/
│       └── scoring.ts
├── shared/
│   ├── schemas.ts
│   └── types.ts
└── README.md
```

If you are using a different stack, keep the same conceptual separation:

* UI
* API route
* MCP server
* tools
* mock data
* scoring logic
* shared schemas

---

## What each file should do

### `shared/schemas.ts`

Define the input, deal profile, and output JSON schemas.

### `server/mcp-server.ts`

Register the MCP tools and expose them to Claude.

### `server/tools/*`

Return mock or lightly enriched data in a predictable structure.

### `server/mockData/*`

Store fake companies, thesis presets, and scenario variations.

### `server/prompts/dealAnalysisPrompt.ts`

Tell Claude how to reason like a PE associate and stay thesis-aware.

### `server/utils/scoring.ts`

Hold a simple deterministic scoring function for fallback or consistency.

### `app/page.tsx`

Minimal form and results view.

### `app/api/analyze-deal/route.ts`

Call Claude, pass thesis + company input, return final structured output.

---

## Exact demo behavior

### On submit

1. User enters company name and optional website.
2. User selects or edits a thesis.
3. App calls the analyze endpoint.
4. Backend loads mock/real company profile.
5. Claude uses MCP tools to fetch structured signals.
6. Claude returns a draft recommendation.
7. UI renders a PE-style summary.
8. UI shows a mock CRM write-back confirmation.

### On results screen

Show these sections:

* Deal overview
* Thesis fit
* Reasons
* Risk flags
* Missing data
* Suggested next step
* CRM update badge

Keep the layout clean and simple.

---

## Example mock records

### Strong fit

```json
{
  "company_name": "Northstar Cloud Ops",
  "website": "northstarcloudops.com",
  "industry": "B2B SaaS",
  "headquarters": "Austin, TX",
  "revenue_range": "5-20M",
  "growth_indicator": "high",
  "profitability_indicator": "unknown",
  "employee_range": "25-75",
  "risk_flags": ["profitability not disclosed"],
  "data_confidence": 82,
  "source_labels": ["website", "mock firmographic enrichment"]
}
```

### Weak fit

```json
{
  "company_name": "Riverbend Industrial Services",
  "website": "riverbendindustrial.com",
  "industry": "Industrial Services",
  "headquarters": "Tulsa, OK",
  "revenue_range": "20-50M",
  "growth_indicator": "low",
  "profitability_indicator": "yes",
  "employee_range": "100-250",
  "risk_flags": ["sector mismatch with thesis"],
  "data_confidence": 76,
  "source_labels": ["mock company registry", "mock web enrichment"]
}
```

### Incomplete data

```json
{
  "company_name": "Aster Analytics",
  "website": "asteranalytics.io",
  "industry": "B2B SaaS",
  "headquarters": "Unknown",
  "revenue_range": "unknown",
  "growth_indicator": "medium",
  "profitability_indicator": "unknown",
  "employee_range": "unknown",
  "risk_flags": ["revenue missing", "location missing"],
  "data_confidence": 41,
  "source_labels": ["website only"]
}
```

### Risky but interesting

```json
{
  "company_name": "BluePeak Finance Tech",
  "website": "bluepeakfintech.com",
  "industry": "B2B SaaS",
  "headquarters": "New York, NY",
  "revenue_range": "20-50M",
  "growth_indicator": "high",
  "profitability_indicator": "no",
  "employee_range": "75-150",
  "risk_flags": ["customer concentration risk", "unprofitable"],
  "data_confidence": 88,
  "source_labels": ["mock company registry", "mock financial enrichment"]
}
```

---

## Example thesis presets

### Thesis A: software buyout

```json
{
  "target_industry": "B2B SaaS",
  "revenue_range": "5-50M",
  "growth_preference": "medium-high",
  "profitability_preference": "preferred",
  "geography_preference": "US",
  "minimum_fit_threshold": 70
}
```

### Thesis B: lower middle market services

```json
{
  "target_industry": "Business Services",
  "revenue_range": "10-75M",
  "growth_preference": "medium",
  "profitability_preference": "required",
  "geography_preference": "US",
  "minimum_fit_threshold": 68
}
```

Use one thesis preset in the demo and make it editable.

---

## Claude prompt requirements

The prompt should instruct Claude to:

* act like a PE associate doing a quick pre-screen
* use the thesis as the reference point
* avoid pretending to know data that is missing
* explicitly call out uncertainty
* separate facts from inference
* give a concise recommendation draft
* produce output in strict JSON

### Suggested reasoning style

Claude should say things like:

* "This appears to fit the current thesis"
* "Revenue is within target band"
* "Confidence is limited by missing profitability data"
* "Recommend moving to preliminary diligence"

It should not say:

* "This is a good company"
* "This deal is objectively strong"
* "The model recommends buying"

---

## Demo UX details

The UI should make the workflow obvious in under 30 seconds.

### Left side or top

* company input
* website input
* thesis selector / editor
* analyze button

### Right side or bottom

* structured results
* score badge
* decision badge
* risk callouts
* CRM update confirmation

### Visual cues

Use simple, familiar labels:

* Deal Intake
* Thesis Fit
* Risk Flags
* Next Step
* CRM Updated

Do not make it look like a generic chatbot.

---

## Cursor build packet (optimized prompts)

Use this exact order and do not skip ahead.

1. Generate `shared/schemas.ts` and `shared/types.ts` with strict validation.
2. Generate mock scenarios + thesis presets with deterministic outputs.
3. Generate MCP tools with fixed response contracts.
4. Generate `scoring.ts` with weighted scoring + deterministic decision mapping.
5. Generate analyze route that orchestrates tools and returns final JSON.
6. Generate one-screen UI and bind to analyze route.
7. Add CRM write-back simulation payload and status UI.
8. Run four scenario tests and fix any schema or threshold drift.

### Prompting constraints for Cursor

* keep implementation minimal and single-screen
* do not add auth, extra pages, or non-essential abstractions
* prefer deterministic mock data over fragile external integrations
* preserve PE wording and structured JSON output

## Final pre-demo checklist

Pass all checks before recording:

1. Strong-fit scenario returns `Go` with thesis-aligned reasons.
2. Weak-fit scenario returns `No-Go` with mismatch reasons.
3. Incomplete-data scenario returns `Review` and explicit uncertainty.
4. Risky scenario applies risk penalty and does not auto-upgrade to `Go`.
5. CRM update payload is present and visible in the UI.
6. Full run (input to rendered output) completes in under 10 seconds.
