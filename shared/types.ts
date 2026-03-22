export type RevenueRange = "unknown" | "<1M" | "1-5M" | "5-20M" | "20-50M" | "50M+";
export type GrowthIndicator = "low" | "medium" | "high" | "unknown";
export type ProfitabilityIndicator = "yes" | "no" | "unknown";
export type Decision = "Go" | "Review" | "No-Go";
export type ThesisMatch = "Strong" | "Moderate" | "Weak";

export interface ThesisInput {
  target_industry: string;
  revenue_range: string;
  growth_preference: string;
  profitability_preference: string;
  geography_preference: string;
  minimum_fit_threshold: number;
}

export interface AnalyzeDealInput {
  company_name: string;
  website?: string;
  thesis: ThesisInput;
}

export interface NormalizedDealProfile {
  company_name: string;
  website: string;
  industry: string;
  headquarters: string;
  revenue_range: RevenueRange;
  growth_indicator: GrowthIndicator;
  profitability_indicator: ProfitabilityIndicator;
  employee_range: string;
  risk_flags: string[];
  data_confidence: number;
  thesis_fit: number;
  source_labels: string[];
}

export interface DealAnalysisOutput {
  company_name: string;
  thesis_match: ThesisMatch;
  score: number;
  decision: Decision;
  reasons: string[];
  risks: string[];
  missing_data: string[];
  confidence: number;
  next_step: string;
  crm_update: {
    status: "updated";
    stage: "Preliminary Review";
    note: string;
  };
}

/** MCP tool trace returned with API for transparency / demo narrative */
export interface ToolTracePayload {
  company_profile: {
    company_name: string;
    domain: string;
    industry: string;
    short_description: string;
    headquarters: string;
    founding_year?: number;
  };
  financial_signals: {
    revenue_range: string;
    growth_indicator: string;
    profitability_indicator: string;
    employee_range: string;
    confidence_level: number;
  };
  risk_flags: {
    customer_concentration_risk: boolean;
    missing_data_flags: string[];
    geography_risk: boolean;
    business_model_concerns: string[];
    data_completeness_score: number;
    risk_flags: string[];
  };
  thesis_context: {
    target_industry: string;
    preferred_revenue_band: string;
    geography_preference: string;
    growth_preference: string;
    profitability_preference: string;
    minimum_fit_threshold: number;
  };
}

/** Claude + MCP orchestration metadata (job-posting path). Scoring remains deterministic. */
export interface ClaudeMcpPayload {
  enabled: boolean;
  used_mcp_subprocess: boolean;
  assistant_summary?: string;
  tool_invocations: Array<{
    name: string;
    arguments: Record<string, unknown>;
    result_preview: string;
  }>;
  model?: string;
  fallback_reason?: string;
}

/** Full API response: recommendation + normalized brief + tool trace */
export interface AnalyzeDealResponse extends DealAnalysisOutput {
  normalized_profile: NormalizedDealProfile;
  tool_trace: ToolTracePayload;
  claude_mcp: ClaudeMcpPayload;
}

export const SCORING_WEIGHTS = {
  industryFit: 25,
  sizeFit: 20,
  growthFit: 15,
  profitabilityFit: 10,
  geographyFit: 10,
  dataCompleteness: 10,
  maxRiskPenalty: 30
} as const;
