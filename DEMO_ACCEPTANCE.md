# DEMO_ACCEPTANCE.md

## Definition of Done (Demo)

The demo is accepted only when all criteria below are met.

## Core Flow

- One-screen interface is accessible and usable.
- One end-to-end workflow completes from fragmented input to normalized brief, thesis-aware score, and recommendation draft.
- End-to-end run completes in under 10 seconds with mock data.
- Score output and decision are deterministic and repeatable for identical inputs.
- Output is strict JSON matching schema with no missing required fields.

## Reliability and Constraints

- Mock-first mode works without live external dependencies.
- If a real source is used, only one external source is enabled.
- Fallback behavior exists when external source fails.
- Blockers >=5 minutes are handled by fallback with continued progress.

## Verification

- Smoke tests run successfully.
- Four scenario checks pass:
  - Strong fit
  - Weak fit
  - Incomplete
  - Risky but interesting
- UI shows all required sections:
  - Thesis Fit
  - Reasons
  - Risk Flags
  - Missing Data
  - Next Step
  - CRM Updated
- Language remains PE workflow language, not chatbot language.

## Delivery Output

- Final handoff includes:
  - run instructions
  - demo script (short presenter steps)
