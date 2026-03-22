1. Make thesis editable and obvious
Keep only 5 fields: industry, revenue range, growth, profitability, geography.
Use dropdowns/presets, not free-text where possible.
Show the thesis box above the button and make the current thesis visibly affect the result.

2. Make the output feel like a PE analyst memo
Right panel should read: Thesis Fit → Score → Decision → Reasons → Risks → Missing Data → Next Step.
Keep reasons short and specific to the inputs, like “Revenue fits target band” or “Sector mismatch.”
Do not let the score dominate; the memo should feel more important than the number.

3. Add one incomplete-data scenario
One preset should intentionally miss revenue, HQ, or profitability.
The UI should show lower confidence and a “Needs Review” style decision.
This makes the demo feel real because PE data is often incomplete.

4. Simulate CRM write-back cleanly
Show a small badge like CRM Updated even if it is mocked.
Include a fake stage change, like “Preliminary Review.”
Make it look like an internal handoff, not a real integration.

5. Improve visual clarity, not feature count
Keep the dark theme, but make section spacing and headings cleaner.
Make badges consistent and easy to scan.
The page should feel like a tool a PE team could imagine using in 30 seconds.

---

## Implementation

- **Executable spec (dropdown values, memo order, acceptance, allowed files):** `HANDOFF_FINAL_IMPROVEMENTS.md`
- **How to loop engineer/design review → fixes until done:** `SKILLS_AND_REVIEW_LOOP.md` (mandatory gates before handoff)