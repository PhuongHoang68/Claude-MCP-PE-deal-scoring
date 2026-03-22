import Anthropic from "@anthropic-ai/sdk";
import type { DealAnalysisOutput, NormalizedDealProfile, ThesisInput } from "../../shared/types";

/**
 * Optional: use Claude to tighten PE-style wording for reasons only.
 * Score/decision remain fully deterministic from policy.
 */
export async function maybeEnhanceReasonsWithClaude(params: {
  reasons: string[];
  analysis: DealAnalysisOutput;
  profile: NormalizedDealProfile;
  thesis: ThesisInput;
}): Promise<string[]> {
  const key = process.env.ANTHROPIC_API_KEY;
  const enabled = process.env.ENABLE_CLAUDE_NARRATIVE === "true";
  if (!key || !enabled) return params.reasons;

  try {
    const client = new Anthropic({ apiKey: key });
    const msg = await client.messages.create({
      model: resolveAnthropicModel(),
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a PE associate. Rewrite the following bullet reasons to be concise, professional, and thesis-aware. Do not change any numbers or the decision. Output JSON only: { "reasons": string[] } with the same count of items as input.\n\nThesis: ${JSON.stringify(params.thesis)}\nDecision: ${params.analysis.decision}\nScore: ${params.analysis.score}\nIndustry: ${params.profile.industry}\n\nInput reasons:\n${params.reasons.map((r, i) => `${i + 1}. ${r}`).join("\n")}`
        }
      ]
    });
    const text =
      msg.content[0].type === "text" ? msg.content[0].text : "";
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    const json = JSON.parse(cleaned) as { reasons?: string[] };
    if (Array.isArray(json.reasons) && json.reasons.length > 0) return json.reasons;
  } catch {
    // fallback silently
  }
  return params.reasons;
}
