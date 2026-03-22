import type { NormalizedDealProfile, ThesisInput } from "../../shared/types";
import { getScenarioByName } from "../mockData/scenarios";
import { getCompanyProfileTool, mergeCompanyProfileIntoBase } from "../tools/getCompanyProfile";
import { getFinancialSignalsTool } from "../tools/getFinancialSignals";
import { getRiskFlagsTool } from "../tools/getRiskFlags";
import { getThesisContextTool } from "../tools/getThesisContext";

export interface OrchestratorToolTrace {
  company_profile: ReturnType<typeof getCompanyProfileTool>;
  financial_signals: ReturnType<typeof getFinancialSignalsTool>;
  risk_flags: ReturnType<typeof getRiskFlagsTool>;
  thesis_context: ReturnType<typeof getThesisContextTool>;
}

/**
 * Runs the 4 MCP-equivalent tools in order and returns a normalized deal profile + trace for UI/debug.
 */
export function buildNormalizedProfileFromTools(input: {
  company_name: string;
  website: string;
  thesis: ThesisInput;
}): { profile: Omit<NormalizedDealProfile, "thesis_fit">; trace: OrchestratorToolTrace } {
  const scenario = getScenarioByName(input.company_name);
  const submittedWebsite = input.website?.trim() ?? "";

  const companyProfile = getCompanyProfileTool({
    company_name: input.company_name,
    website: submittedWebsite || scenario.profile.website
  });

  let base: Omit<NormalizedDealProfile, "thesis_fit"> = {
    ...scenario.profile,
    website: scenario.profile.website
  };

  base = mergeCompanyProfileIntoBase(base, companyProfile, submittedWebsite);

  const financialSignals = getFinancialSignalsTool(base);
  const riskView = getRiskFlagsTool(base);
  const thesisContext = getThesisContextTool(input.thesis);

  const profile: Omit<NormalizedDealProfile, "thesis_fit"> = {
    ...base,
    revenue_range: financialSignals.revenue_range as NormalizedDealProfile["revenue_range"],
    growth_indicator: financialSignals.growth_indicator,
    profitability_indicator: financialSignals.profitability_indicator,
    employee_range: financialSignals.employee_range,
    data_confidence: financialSignals.confidence_level,
    risk_flags: riskView.risk_flags
  };

  return {
    profile,
    trace: {
      company_profile: companyProfile,
      financial_signals: financialSignals,
      risk_flags: riskView,
      thesis_context: thesisContext
    }
  };
}
