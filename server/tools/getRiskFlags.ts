import type { NormalizedDealProfile } from "../../shared/types";
import type { RiskFlagsToolOutput } from "./toolTypes";

/**
 * MCP tool: get_risk_flags — derives structured risk view from scenario risk_flags.
 */
export function getRiskFlagsTool(base: Omit<NormalizedDealProfile, "thesis_fit">): RiskFlagsToolOutput {
  const flags = base.risk_flags.map((f) => f.toLowerCase());
  const customer_concentration_risk = flags.some((f) => f.includes("customer concentration"));
  const missing_data_flags: string[] = [];
  if (base.revenue_range === "unknown") missing_data_flags.push("revenue");
  if (base.profitability_indicator === "unknown") missing_data_flags.push("profitability");
  if (base.headquarters.toLowerCase() === "unknown") missing_data_flags.push("headquarters");

  const geography_risk = flags.some((f) => f.includes("geography"));

  const business_model_concerns: string[] = [];
  if (flags.some((f) => f.includes("unprofitable"))) business_model_concerns.push("profitability pressure");
  if (flags.some((f) => f.includes("sector mismatch"))) business_model_concerns.push("thesis sector mismatch");

  const data_completeness_score = base.data_confidence;

  return {
    customer_concentration_risk,
    missing_data_flags,
    geography_risk,
    business_model_concerns,
    data_completeness_score,
    risk_flags: base.risk_flags
  };
}
