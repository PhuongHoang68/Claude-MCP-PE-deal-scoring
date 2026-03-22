import { describe, expect, it } from "vitest";
import { analyzeDeterministic } from "../server/utils/scoring";
import { DEFAULT_THESIS, SCENARIOS } from "../server/mockData/scenarios";

describe("four scenario checks", () => {
  it("Strong fit maps to Go", () => {
    const output = analyzeDeterministic(SCENARIOS.strong_fit.profile, DEFAULT_THESIS);
    expect(output.decision).toBe("Go");
    expect(output.thesis_match).toMatch(/Strong|Moderate/);
  });

  it("Weak fit maps to No-Go", () => {
    const output = analyzeDeterministic(SCENARIOS.weak_fit.profile, DEFAULT_THESIS);
    expect(output.decision).toBe("No-Go");
  });

  it("Incomplete maps to Review with explicit missing data", () => {
    const output = analyzeDeterministic(SCENARIOS.incomplete.profile, DEFAULT_THESIS);
    expect(output.decision).toBe("Review");
    expect(output.missing_data.length).toBeGreaterThan(0);
  });

  it("Risky but interesting does not auto-upgrade to Go", () => {
    const output = analyzeDeterministic(SCENARIOS.risky_but_interesting.profile, DEFAULT_THESIS);
    expect(output.decision).not.toBe("Go");
  });
});
