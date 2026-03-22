import type { NormalizedDealProfile } from "../../shared/types";
import type { CompanyProfileToolOutput } from "./toolTypes";
import { getScenarioByName } from "../mockData/scenarios";

/**
 * MCP tool: get_company_profile — deterministic mock / scenario-backed firmographics.
 */
export function getCompanyProfileTool(input: {
  company_name: string;
  website: string;
}): CompanyProfileToolOutput {
  const scenario = getScenarioByName(input.company_name);
  const p = scenario.profile;
  const domain = input.website?.replace(/^https?:\/\//, "").split("/")[0] || p.website;

  return {
    company_name: p.company_name,
    domain,
    industry: p.industry,
    short_description: `${p.company_name} — ${p.industry} operator (${p.revenue_range} revenue band).`,
    headquarters: p.headquarters,
    founding_year: undefined
  };
}

export function mergeCompanyProfileIntoBase(
  base: Omit<NormalizedDealProfile, "thesis_fit">,
  tool: CompanyProfileToolOutput,
  submittedWebsite: string
): Omit<NormalizedDealProfile, "thesis_fit"> {
  const website = submittedWebsite.trim() || base.website;
  const labels = [...base.source_labels];
  if (submittedWebsite.trim()) {
    labels.push("analyst-submitted domain");
  }
  return {
    ...base,
    company_name: tool.company_name,
    website,
    industry: tool.industry,
    headquarters: tool.headquarters,
    source_labels: labels
  };
}
