import { z } from "zod";

const revenueRangeSchema = z.enum(["unknown", "<1M", "1-5M", "5-20M", "20-50M", "50M+"]);
const growthIndicatorSchema = z.enum(["low", "medium", "high", "unknown"]);
const profitabilityIndicatorSchema = z.enum(["yes", "no", "unknown"]);

export const thesisInputSchema = z.object({
  target_industry: z.string().min(1),
  revenue_range: z.string().min(1),
  growth_preference: z.string().min(1),
  profitability_preference: z.string().min(1),
  geography_preference: z.string().min(1),
  minimum_fit_threshold: z.number().int().min(0).max(100)
});

export const analyzeDealInputSchema = z.object({
  company_name: z.string().min(1),
  website: z.string().optional().default(""),
  thesis: thesisInputSchema
});

export const normalizedDealProfileSchema = z.object({
  company_name: z.string().min(1),
  website: z.string(),
  industry: z.string().min(1),
  headquarters: z.string().min(1),
  revenue_range: revenueRangeSchema,
  growth_indicator: growthIndicatorSchema,
  profitability_indicator: profitabilityIndicatorSchema,
  employee_range: z.string().min(1),
  risk_flags: z.array(z.string()),
  data_confidence: z.number().int().min(0).max(100),
  thesis_fit: z.number().int().min(0).max(100),
  source_labels: z.array(z.string())
});

export const dealAnalysisOutputSchema = z.object({
  company_name: z.string().min(1),
  thesis_match: z.enum(["Strong", "Moderate", "Weak"]),
  score: z.number().int().min(0).max(100),
  decision: z.enum(["Go", "Review", "No-Go"]),
  reasons: z.array(z.string()).min(1),
  risks: z.array(z.string()),
  missing_data: z.array(z.string()),
  confidence: z.number().int().min(0).max(100),
  next_step: z.string().min(1),
  crm_update: z.object({
    status: z.literal("updated"),
    stage: z.literal("Preliminary Review"),
    note: z.string().min(1)
  })
});

export const toolTracePayloadSchema = z.object({
  company_profile: z.object({
    company_name: z.string(),
    domain: z.string(),
    industry: z.string(),
    short_description: z.string(),
    headquarters: z.string(),
    founding_year: z.number().optional()
  }),
  financial_signals: z.object({
    revenue_range: z.string(),
    growth_indicator: z.string(),
    profitability_indicator: z.string(),
    employee_range: z.string(),
    confidence_level: z.number()
  }),
  risk_flags: z.object({
    customer_concentration_risk: z.boolean(),
    missing_data_flags: z.array(z.string()),
    geography_risk: z.boolean(),
    business_model_concerns: z.array(z.string()),
    data_completeness_score: z.number(),
    risk_flags: z.array(z.string())
  }),
  thesis_context: z.object({
    target_industry: z.string(),
    preferred_revenue_band: z.string(),
    geography_preference: z.string(),
    growth_preference: z.string(),
    profitability_preference: z.string(),
    minimum_fit_threshold: z.number()
  })
});

export const claudeMcpPayloadSchema = z.object({
  enabled: z.boolean(),
  used_mcp_subprocess: z.boolean(),
  assistant_summary: z.string().optional(),
  tool_invocations: z.array(
    z.object({
      name: z.string(),
      arguments: z.record(z.string(), z.unknown()),
      result_preview: z.string()
    })
  ),
  model: z.string().optional(),
  fallback_reason: z.string().optional()
});

export const analyzeDealResponseSchema = dealAnalysisOutputSchema.extend({
  normalized_profile: normalizedDealProfileSchema,
  tool_trace: toolTracePayloadSchema,
  claude_mcp: claudeMcpPayloadSchema
});
