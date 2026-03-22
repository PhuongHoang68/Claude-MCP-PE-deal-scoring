import type {
  DealAnalysisOutput,
  NormalizedDealProfile,
  ThesisInput,
  ThesisMatch
} from "../../shared/types";
import { SCORING_WEIGHTS } from "../../shared/types";

/** Spec: critical risk flags block Go (e.g. customer concentration). */
function hasCriticalRiskFlag(profile: NormalizedDealProfile): boolean {
  return profile.risk_flags.some((f) => f.toLowerCase().includes("customer concentration"));
}

function industryFitPoints(profile: NormalizedDealProfile, thesis: ThesisInput): number {
  return profile.industry.toLowerCase() === thesis.target_industry.toLowerCase()
    ? SCORING_WEIGHTS.industryFit
    : 0;
}

function revenueBandInThesis(profile: NormalizedDealProfile, thesis: ThesisInput): boolean {
  if (profile.revenue_range === "unknown") return false;
  const tr = thesis.revenue_range.toLowerCase().replace(/\s/g, "");
  const pr = profile.revenue_range.toLowerCase();
  if (tr.includes("5-50m")) {
    return pr === "5-20m" || pr === "20-50m" || pr === "1-5m" || pr === "50m+";
  }
  return tr.includes(pr) || pr.includes(tr.split("-")[0] ?? "");
}

function sizeFitPoints(profile: NormalizedDealProfile, thesis: ThesisInput): number {
  return revenueBandInThesis(profile, thesis) ? SCORING_WEIGHTS.sizeFit : 0;
}

function growthFitPoints(profile: NormalizedDealProfile): number {
  if (profile.growth_indicator === "high") return SCORING_WEIGHTS.growthFit;
  if (profile.growth_indicator === "medium") return Math.round(SCORING_WEIGHTS.growthFit * (2 / 3));
  if (profile.growth_indicator === "low") return Math.round(SCORING_WEIGHTS.growthFit * (1 / 3));
  return 0;
}

function profitabilityFitPoints(profile: NormalizedDealProfile): number {
  if (profile.profitability_indicator === "yes") return SCORING_WEIGHTS.profitabilityFit;
  if (profile.profitability_indicator === "unknown") return Math.round(SCORING_WEIGHTS.profitabilityFit * 0.5);
  return 0;
}

/** North America / US thesis geography match */
function geographyFitPoints(profile: NormalizedDealProfile, thesis: ThesisInput): number {
  const geo = thesis.geography_preference.toLowerCase();
  const hq = profile.headquarters.toLowerCase();
  const naHints =
    hq.includes("us") ||
    hq.includes("usa") ||
    hq.includes("canada") ||
    hq.includes("toronto") ||
    hq.includes("montreal") ||
    hq.includes("vancouver") ||
    /\b(tx|ca|ny|fl|il|wa|co|ga|nc|az|ma|pa|oh|mi)\b/i.test(profile.headquarters) ||
    /,\s*[a-z]{2}\b/i.test(profile.headquarters);
  if (geo.includes("north america") || geo.includes("us") || geo.includes("canada")) {
    return naHints ? SCORING_WEIGHTS.geographyFit : 0;
  }
  return naHints ? SCORING_WEIGHTS.geographyFit : 0;
}

function dataCompletenessPoints(profile: NormalizedDealProfile): number {
  return Math.round((profile.data_confidence / 100) * SCORING_WEIGHTS.dataCompleteness);
}

function riskPenaltyAbs(profile: NormalizedDealProfile): number {
  const total = profile.risk_flags.reduce((sum, flag) => {
    const s = flag.toLowerCase();
    if (s.includes("customer concentration")) return sum + 12;
    if (s.includes("unprofitable")) return sum + 10;
    if (s.includes("sector mismatch")) return sum + 12;
    if (s.includes("missing")) return sum + 4;
    return sum + 3;
  }, 0);
  return Math.min(total, SCORING_WEIGHTS.maxRiskPenalty);
}

function thesisMatch(score: number): ThesisMatch {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Moderate";
  return "Weak";
}

/**
 * Missing diligence items that force Review (Incomplete archetype).
 * Single unknown profitability with otherwise strong data does not alone force Review.
 */
function missingKeyFields(profile: NormalizedDealProfile): boolean {
  if (profile.revenue_range === "unknown") return true;
  if (profile.headquarters.toLowerCase() === "unknown") return true;
  if (profile.profitability_indicator === "unknown" && profile.data_confidence < 55) return true;
  return false;
}

/** Severe mismatch: wrong industry AND revenue band vs thesis (spec). */
function severeMismatch(profile: NormalizedDealProfile, thesis: ThesisInput): boolean {
  const industryMismatch = profile.industry.toLowerCase() !== thesis.target_industry.toLowerCase();
  const sizeMismatch = !revenueBandInThesis(profile, thesis);
  return industryMismatch && sizeMismatch;
}

/**
 * Spec decision rules:
 * - Go if score >= threshold AND no critical risk flags
 * - Review if within 10 points below threshold OR missing key fields
 * - No-Go if score < (threshold - 10) OR severe mismatch (industry + size)
 */
function decisionFromPolicy(
  score: number,
  profile: NormalizedDealProfile,
  thesis: ThesisInput
): DealAnalysisOutput["decision"] {
  const threshold = thesis.minimum_fit_threshold;
  const critical = hasCriticalRiskFlag(profile);

  if (missingKeyFields(profile)) return "Review";
  if (severeMismatch(profile, thesis)) return "No-Go";
  if (score < threshold - 10) return "No-Go";
  if (score >= threshold && !critical) return "Go";
  if (critical) return "Review";
  if (score >= threshold - 10 && score < threshold) return "Review";
  return "No-Go";
}

export interface ScoreBreakdown {
  industry_fit: number;
  size_fit: number;
  growth_fit: number;
  profitability_fit: number;
  geography_fit: number;
  data_completeness: number;
  risk_penalty: number;
  raw_score: number;
}

export function computeScoreBreakdown(
  profile: NormalizedDealProfile,
  thesis: ThesisInput
): ScoreBreakdown {
  const industry_fit = industryFitPoints(profile, thesis);
  const size_fit = sizeFitPoints(profile, thesis);
  const growth_fit = growthFitPoints(profile);
  const profitability_fit = profitabilityFitPoints(profile);
  const geography_fit = geographyFitPoints(profile, thesis);
  const data_completeness = dataCompletenessPoints(profile);
  const risk_penalty = riskPenaltyAbs(profile);
  const positive =
    industry_fit + size_fit + growth_fit + profitability_fit + geography_fit + data_completeness;
  const raw_score = Math.max(0, Math.min(100, positive - risk_penalty));
  return {
    industry_fit,
    size_fit,
    growth_fit,
    profitability_fit,
    geography_fit,
    data_completeness,
    risk_penalty,
    raw_score
  };
}

export function analyzeDeterministic(
  profile: Omit<NormalizedDealProfile, "thesis_fit">,
  thesis: ThesisInput
): DealAnalysisOutput {
  const breakdown = computeScoreBreakdown({ ...profile, thesis_fit: 0 } as NormalizedDealProfile, thesis);
  const score = breakdown.raw_score;

  const normalizedProfile: NormalizedDealProfile = { ...profile, thesis_fit: score };
  const decision = decisionFromPolicy(score, normalizedProfile, thesis);
  const label = thesisMatch(score);

  const missingData: string[] = [];
  if (normalizedProfile.revenue_range === "unknown") missingData.push("revenue data missing");
  if (normalizedProfile.profitability_indicator === "unknown")
    missingData.push("profitability data missing");
  if (normalizedProfile.headquarters.toLowerCase() === "unknown")
    missingData.push("headquarters data missing");

  const reasons = [
    `Weighted intake score ${score}/100 (industry ${breakdown.industry_fit}/${SCORING_WEIGHTS.industryFit}, size ${breakdown.size_fit}/${SCORING_WEIGHTS.sizeFit}, growth ${breakdown.growth_fit}/${SCORING_WEIGHTS.growthFit}, profitability ${breakdown.profitability_fit}/${SCORING_WEIGHTS.profitabilityFit}, geography ${breakdown.geography_fit}/${SCORING_WEIGHTS.geographyFit}, data ${breakdown.data_completeness}/${SCORING_WEIGHTS.dataCompleteness}; risk penalty -${breakdown.risk_penalty}).`,
    `Thesis target industry: ${thesis.target_industry}; company industry: ${normalizedProfile.industry}.`,
    `Data confidence (used as output confidence): ${normalizedProfile.data_confidence}/100.`
  ];

  return {
    company_name: normalizedProfile.company_name,
    thesis_match: label,
    score,
    decision,
    reasons,
    risks: normalizedProfile.risk_flags,
    missing_data: missingData,
    confidence: normalizedProfile.data_confidence,
    next_step:
      decision === "Go"
        ? "Move to preliminary diligence."
        : decision === "Review"
          ? "Assign analyst to validate missing items and risk flags."
          : "Do not advance unless thesis or deal facts change.",
    crm_update: {
      status: "updated",
      stage: "Preliminary Review",
      note: `Decision ${decision}; score ${score}; stage updated for ${normalizedProfile.company_name}.`
    }
  };
}
