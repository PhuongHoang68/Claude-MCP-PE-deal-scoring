import type { NormalizedDealProfile, ThesisInput } from "../../shared/types";

export interface ScenarioRecord {
  key: "strong_fit" | "weak_fit" | "incomplete" | "risky_but_interesting";
  profile: Omit<NormalizedDealProfile, "thesis_fit">;
}

// App-ready thesis preset aligned to shared schema fields.
export const SUMMIT_DEFAULT_THESIS: ThesisInput = {
  target_industry: "B2B SaaS",
  revenue_range: "5-50M",
  growth_preference: "15-30%+",
  profitability_preference: "EBITDA-positive preferred (15%+)",
  geography_preference: "US",
  minimum_fit_threshold: 70
};

export const DEFAULT_THESIS: ThesisInput = {
  ...SUMMIT_DEFAULT_THESIS
};

export const SCENARIOS: Record<ScenarioRecord["key"], ScenarioRecord> = {
  strong_fit: {
    key: "strong_fit",
    profile: {
      company_name: "Northstar Cloud Ops",
      website: "northstarcloudops.com",
      industry: "B2B SaaS",
      headquarters: "Austin, TX",
      revenue_range: "5-20M",
      growth_indicator: "high",
      profitability_indicator: "unknown",
      employee_range: "25-75",
      risk_flags: ["profitability not disclosed"],
      data_confidence: 82,
      source_labels: ["website", "mock firmographic enrichment"]
    }
  },
  weak_fit: {
    key: "weak_fit",
    profile: {
      company_name: "Riverbend Industrial Services",
      website: "riverbendindustrial.com",
      industry: "Industrial Services",
      headquarters: "Tulsa, OK",
      revenue_range: "20-50M",
      growth_indicator: "low",
      profitability_indicator: "yes",
      employee_range: "100-250",
      risk_flags: ["sector mismatch with thesis"],
      data_confidence: 76,
      source_labels: ["mock company registry", "mock web enrichment"]
    }
  },
  incomplete: {
    key: "incomplete",
    profile: {
      company_name: "Aster Analytics",
      website: "asteranalytics.io",
      industry: "B2B SaaS",
      headquarters: "Unknown",
      revenue_range: "unknown",
      growth_indicator: "medium",
      profitability_indicator: "unknown",
      employee_range: "unknown",
      risk_flags: ["revenue missing", "location missing"],
      data_confidence: 41,
      source_labels: ["website only"]
    }
  },
  risky_but_interesting: {
    key: "risky_but_interesting",
    profile: {
      company_name: "BluePeak Finance Tech",
      website: "bluepeakfintech.com",
      industry: "B2B SaaS",
      headquarters: "New York, NY",
      revenue_range: "20-50M",
      growth_indicator: "high",
      profitability_indicator: "no",
      employee_range: "75-150",
      risk_flags: ["customer concentration risk", "unprofitable"],
      data_confidence: 88,
      source_labels: ["mock company registry", "mock financial enrichment"]
    }
  }
};

export function getScenarioByName(companyName: string): ScenarioRecord {
  const normalized = companyName.toLowerCase();
  if (normalized.includes("northstar")) return SCENARIOS.strong_fit;
  if (normalized.includes("riverbend")) return SCENARIOS.weak_fit;
  if (normalized.includes("aster")) return SCENARIOS.incomplete;
  if (normalized.includes("bluepeak")) return SCENARIOS.risky_but_interesting;
  return SCENARIOS.strong_fit;
}
