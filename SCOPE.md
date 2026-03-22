# SCOPE.md

## Must-Have (Demo Scope)

- Single-screen demo UI that supports one complete deal-scoring workflow.
- One workflow only: deal intake + structuring + draft recommendation.
- Deterministic scoring logic (same input always yields same score and rationale).
- Strict schema-valid JSON output with no missing required fields.
- Visible PE-style output sections: Thesis Fit, Reasons, Risk Flags, Missing Data, Next Step, CRM Updated.
- Mock-first data path that works offline or with minimal dependencies.
- Runnable smoke test plus 4 scenario checks (Strong fit, Weak fit, Incomplete, Risky but interesting).
- Clear run instructions and short demo script.

## Out of Scope (For This Demo)

- Multi-screen navigation or complex app architecture changes.
- Multi-workflow support in one release.
- Non-deterministic scoring (randomness, unstable ranking).
- Production-grade auth, RBAC, multi-tenant support.
- Complex observability stacks and enterprise hardening.
- Multiple live external data providers.
- Long-running optimization/refactor work not required for demo flow.

## Tradeoff Rule

When speed and completeness conflict, ship the smallest deterministic working flow that satisfies demo acceptance.
