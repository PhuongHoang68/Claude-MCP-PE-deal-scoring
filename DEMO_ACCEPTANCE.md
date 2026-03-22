# DEMO_ACCEPTANCE.md

## Definition of Done (Demo)

The demo is accepted only when all criteria below are met.

**Final polish (thesis UX, memo layout, incomplete scenario storytelling, simulated CRM, visual discipline)** is part of done when it satisfies the **outcomes** in [UI / experience (final improvements)](#ui--experience-final-improvements) below. **Exact strings, control types, and layout order** live in `HANDOFF_FINAL_IMPROVEMENTS.md` (checklist §10). Goals summary: `final-improvements.md`. Execute and review using `SKILLS_AND_REVIEW_LOOP.md`.

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

## UI / experience (final improvements)

All of the following must be true in addition to the [Verification](#verification) section.

- **Thesis:** The five primary thesis dimensions use **constrained inputs** (selects and/or presets), not free-text for those fields; **fit threshold** remains available (e.g. under Advanced) without crowding the main story. The active thesis is **visible** before analyze and echoed at the top of the output so cause → effect is obvious.
- **Analyst memo:** The right-hand output reads as a **memo**, not a dashboard led by the score: **thesis fit** and **decision** are visually primary; **score and confidence** are secondary; then **reasons → risk flags → missing data → next step** in that order (supporting detail such as deal overview and Claude/MCP trace may follow without hiding required sections).
- **Reasons:** Bullets are **short and PE-specific** (fit/mismatch/data), not a single long technical paragraph.
- **Incomplete scenario:** The incomplete preset (e.g. Aster Analytics) is **clearly labeled** in the UI; running it shows **lower confidence** and a **Review** decision with **needs-review**-style labeling where specified in the handoff.
- **CRM:** CRM handoff is shown as **simulated** (badge and/or card copy makes clear **no external CRM** was contacted); stage remains **Preliminary Review** (or equivalent per handoff).
- **Visuals:** Dark theme and panel style stay **consistent** with the current app; badges and spacing are **scannable** and not unnecessarily noisy (per handoff badge discipline).

## Verification

- Smoke tests run successfully.
- Four scenario checks pass:
  - Strong fit
  - Weak fit
  - Incomplete
  - Risky but interesting
- UI shows all required sections (they may appear in memo order per [UI / experience](#ui--experience-final-improvements); none removed):
  - Thesis Fit
  - Reasons
  - Risk Flags
  - Missing Data
  - Next Step
  - CRM Updated
- Language remains PE workflow language, not chatbot language.
- Full UX acceptance checklist: `HANDOFF_FINAL_IMPROVEMENTS.md` §10.

## Delivery Output

- Final handoff includes:
  - run instructions
  - demo script (short presenter steps)
