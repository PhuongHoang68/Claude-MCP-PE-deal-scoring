import type { NormalizedDealProfile } from "../../shared/types";
import type { FinancialSignalsToolOutput } from "./toolTypes";

/**
 * MCP tool: get_financial_signals — deterministic signals from normalized scenario profile.
 */
export function getFinancialSignalsTool(base: Omit<NormalizedDealProfile, "thesis_fit">): FinancialSignalsToolOutput {
  return {
    revenue_range: base.revenue_range,
    growth_indicator: base.growth_indicator,
    profitability_indicator: base.profitability_indicator,
    employee_range: base.employee_range,
    confidence_level: base.data_confidence
  };
}
