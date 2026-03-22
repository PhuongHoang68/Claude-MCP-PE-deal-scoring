# AGENTS.md

## Execution Contract

This repository is operated under a speed-first demo contract.

- objective: ship demo in <= 10 hours equivalent; prioritize working flow
- hard constraints: one-screen, one-workflow, deterministic scoring
- allowed changes: all files in repo except secrets/config outside repo
- allowed installs: yes
- allowed external APIs: mock-first, max one real source
- stop conditions: if blocked >=5 min, use fallback, log blocker, and continue
- test requirement: run smoke tests + 4 scenario checks
- output requirement: end with run instructions + demo script

## Operator Permissions

The following permissions are explicitly granted by the user:

- You may edit files and run terminal commands for 60 minutes continuously.
- You may install dependencies.
- You may use network.
- Do not ask for confirmation unless destructive/risky.
- Do not commit unless I explicitly ask.

## Working Mode

- Default behavior is autonomous implementation.
- Prefer the smallest change that preserves deterministic demo behavior.
- If a tool, API, or integration fails, switch to a mocked fallback and keep the flow operational.
- Keep documentation and setup instructions up to date with actual runnable steps.
- If blocked for 5 minutes or more on user input/dependency, switch immediately to highest-priority unblocked work.
- Maintain a "Pending User Inputs" list in status updates with: blocker, what is needed, fallback used, and impact.
- If build + required checks finish early, stop work early and return final verification and handoff output (no filler tasks).
