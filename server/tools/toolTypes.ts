import type { ThesisInput } from "../../shared/types";

/** Output shape for get_company_profile (MCP tool 1) */
export interface CompanyProfileToolOutput {
  company_name: string;
  domain: string;
  industry: string;
  short_description: string;
  headquarters: string;
  founding_year?: number;
}

/** Output shape for get_financial_signals (MCP tool 2) */
export interface FinancialSignalsToolOutput {
  revenue_range: string;
  growth_indicator: "low" | "medium" | "high" | "unknown";
  profitability_indicator: "yes" | "no" | "unknown";
  employee_range: string;
  confidence_level: number;
}

/** Output shape for get_risk_flags (MCP tool 3) */
export interface RiskFlagsToolOutput {
  customer_concentration_risk: boolean;
  missing_data_flags: string[];
  geography_risk: boolean;
  business_model_concerns: string[];
  data_completeness_score: number;
  /** Flattened list for scoring / UI */
  risk_flags: string[];
}

/** Output shape for get_thesis_context (MCP tool 4) */
export interface ThesisContextToolOutput {
  target_industry: string;
  preferred_revenue_band: string;
  geography_preference: string;
  growth_preference: string;
  profitability_preference: string;
  minimum_fit_threshold: number;
}

export interface ToolCallContext {
  company_name: string;
  website: string;
  thesis: ThesisInput;
}
