import type { ThesisInput } from "../../shared/types";
import type { ThesisContextToolOutput } from "./toolTypes";

/**
 * MCP tool: get_thesis_context — returns the fund thesis criteria for scoring and prompts.
 */
export function getThesisContextTool(thesis: ThesisInput): ThesisContextToolOutput {
  return {
    target_industry: thesis.target_industry,
    preferred_revenue_band: thesis.revenue_range,
    geography_preference: thesis.geography_preference,
    growth_preference: thesis.growth_preference,
    profitability_preference: thesis.profitability_preference,
    minimum_fit_threshold: thesis.minimum_fit_threshold
  };
}
