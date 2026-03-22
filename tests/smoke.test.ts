import { describe, expect, it } from "vitest";
import { analyzeDeterministic } from "../server/utils/scoring";
import { DEFAULT_THESIS, SCENARIOS } from "../server/mockData/scenarios";
import { dealAnalysisOutputSchema } from "../shared/schemas";

describe("smoke", () => {
  it("produces schema-valid output in under 10 seconds", () => {
    const start = Date.now();
    const output = analyzeDeterministic(SCENARIOS.strong_fit.profile, DEFAULT_THESIS);
    const durationMs = Date.now() - start;
    const parsed = dealAnalysisOutputSchema.safeParse(output);

    expect(parsed.success).toBe(true);
    expect(durationMs).toBeLessThan(10_000);
  });
});
