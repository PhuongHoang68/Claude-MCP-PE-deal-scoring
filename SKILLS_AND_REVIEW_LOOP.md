# SKILLS_AND_REVIEW_LOOP.md

## Purpose

This file is the operational quality system for autonomous build and review.
It defines:

- what to build first
- what to review and when
- how to iterate until quality gates pass
- when the app is done for demo

Use this file as the day-to-day execution playbook during sprint work.

## Source of Truth Priority

When instructions conflict, resolve in this order:

1. `initial_instructions.md`
2. `DEMO_ACCEPTANCE.md`
3. `SCOPE.md`
4. `AGENTS.md`
5. `ENV.md`
6. `README.md`
7. `SKILLS_AND_REVIEW_LOOP.md`

If conflict remains after this order, choose the smallest deterministic implementation that preserves demo acceptance.

## Roles and Skill Lenses

### Senior Architect Lens (system-level)

Focus:

- architecture clarity and boundaries
- predictable data contracts
- deterministic behavior under time pressure
- build process that produces shippable increments

Output:

- clear module boundaries
- stable contracts
- repeatable delivery loop

### Senior Engineer Lens (implementation-level)

Focus:

- correctness and stability
- performance and deterministic execution
- low complexity and low redundancy
- maintainable code paths

Output:

- minimal reliable implementation
- clear error handling and fallback behavior
- fast tests and repeatable outcomes

### Senior Design Engineer Lens (experience-level)

Focus:

- modern, premium visual language
- consistency and readability
- user flow clarity in under 30 seconds
- confidence-building UX for a PE audience

Output:

- cohesive one-screen experience
- clear hierarchy and sectioning
- polished, low-friction interaction states

## Architecture Pattern for This Demo

Use a constrained vertical-slice pattern:

- `shared/*`: contracts (types + schemas)
- `server/mockData/*`: deterministic scenario data
- `server/tools/*`: normalized tool outputs
- `server/utils/*`: scoring and decision policy
- `app/api/*` or equivalent: orchestration endpoint
- `app/*`: one-screen UI

Rules:

- keep interfaces narrow and typed
- avoid cross-layer leakage
- keep side effects at boundaries (API/tool layer)
- keep core scoring pure and deterministic

## Build Process (Execution Order)

Follow this exact order:

1. Lock contracts (`shared/types`, `shared/schemas`)
2. Lock deterministic scenarios (Strong, Weak, Incomplete, Risky but interesting)
3. Implement scoring policy and decision mapping
4. Implement orchestration endpoint
5. Implement one-screen UI sections
6. Add/verify CRM write-back simulation
7. Run smoke + scenario tests
8. Run engineer review loop
9. Run design review loop
10. Final acceptance verification

Do not proceed to polishing if deterministic core checks fail.

**Final improvements (`final-improvements.md`):** use **`HANDOFF_FINAL_IMPROVEMENTS.md`** as the executable spec (defaults, layout, acceptance). Still run the **Continuous Review Loop** below for every substantive chunk of work.

## Continuous Review Loop (Mandatory)

After each substantive implementation unit, run:

1. Build step completed
2. Senior Engineer Review
3. Implement improvements
4. Engineer Re-review
5. Senior Design Engineer Review (when UI involved)
6. Implement improvements
7. Design Re-review
8. Acceptance alignment check against docs

Repeat until all relevant gates are green.

## Blocker Handling Protocol (Mandatory)

If any task is blocked for 5 minutes or more:

1. Record blocker details (task, blocker reason, exact missing input/dependency).
2. Apply fallback if available (mock/default/feature flag).
3. Move immediately to highest-priority unblocked task.
4. Add item to a "Pending User Inputs" list for final handoff.
5. Re-attempt blocked task at the next logical checkpoint.

Never wait idle on a blocked task.

## Senior Engineer Review Gate

Run this checklist every loop:

- Correctness:
  - outputs match required schema
  - deterministic score/decision for same input
  - scenario behavior matches acceptance expectations
- Stability:
  - clear fallback behavior for missing data/tool failure
  - no fragile reliance on non-essential external APIs
  - no hidden mutable global state affecting scoring
- Performance:
  - end-to-end mock path remains under 10 seconds
  - no unnecessary repeated computation
  - no obvious hot-path inefficiencies
- Code Quality:
  - no dead branches or duplicated logic
  - simple function boundaries and naming
  - no speculative abstractions outside scope
- Test Safety:
  - smoke test passes
  - 4 scenario checks pass
  - changed behavior covered by tests

If any item fails, improvements are mandatory before continuing.

## Senior Design Engineer Review Gate

Run this checklist for UI changes:

- Modern Premium Presentation:
  - clean visual hierarchy
  - consistent spacing, typography, and component rhythm
  - intentional use of status badges and emphasis
- Workflow Clarity:
  - one-screen path is obvious in under 30 seconds
  - input to output flow has no ambiguity
  - labels match PE language
- Information Design:
  - sections are easy to scan: Thesis Fit, Reasons, Risk Flags, Missing Data, Next Step, CRM Updated
  - critical signals are visually prioritized
  - uncertainty/missing data is explicit
- Interaction Quality:
  - clear loading, success, and error states
  - no confusing control patterns
  - no redundant UI elements
- Performance and Consistency:
  - responsive feel under normal local conditions
  - consistent component behavior across scenarios

If any item fails, apply improvements and re-run the gate.

## Scope Guardrails During Reviews

To stay tightly in scope:

- never add additional workflows
- never add auth/productization features
- never add deep integration work unless explicitly required
- never replace deterministic logic with free-form model behavior for decisioning

If a proposed improvement exceeds ~60 minutes, cut it and choose a smaller fallback.

## Acceptance Gate (Definition of Done)

The app is done for demo only when all are true:

- one-screen, one-workflow flow is complete
- end-to-end run is under 10 seconds with mock data
- strict schema-valid JSON output with no missing required fields
- deterministic score and decision policy is enforced
- all 4 scenarios pass:
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
- language is PE workflow language (not chatbot tone)
- final handoff includes run instructions and demo script

If any criterion fails, status is not done.

## Runbook Commands (Baseline)

- smoke test: `npm run test:smoke`
- scenario checks: `npm run test:scenarios`
- readiness bundle: `npm run sprint:ready`

## PR/Delivery Checklist (Even Without PR)

Before handoff:

- scope changes mapped to `SCOPE.md`
- behavior mapped to `DEMO_ACCEPTANCE.md`
- execution constraints mapped to `AGENTS.md`
- env usage mapped to `ENV.md` and `.env.example`
- README run/demo instructions are current

## Autonomous Working Agreement

When operating autonomously:

- prefer progress with deterministic fallbacks over blocked perfection
- do not pause for confirmation unless action is destructive/risky
- do not commit unless explicitly requested
- if blocked for >=5 minutes, switch tasks and track a pending input item
- if all required build + full reviews + acceptance checks pass before 1 hour, stop early and return final handoff
- always conclude with:
  - what changed
  - what was verified
  - pending user inputs (if any)
  - exact run instructions
  - concise demo script
