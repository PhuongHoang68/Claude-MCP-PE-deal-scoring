import { NextResponse } from "next/server";
import { analyzeDealInputSchema, analyzeDealResponseSchema } from "@/shared/schemas";
import { DEFAULT_THESIS } from "@/server/mockData/scenarios";
import { analyzeDeterministic } from "@/server/utils/scoring";
import { fetchOpenCorporatesEnrichment } from "@/server/tools/openCorporates";
import { buildNormalizedProfileFromTools } from "@/server/orchestrator/buildNormalizedProfile";
import { maybeEnhanceReasonsWithClaude } from "@/server/claude/enhanceReasons";
import { runClaudeMcpOrchestration } from "@/server/claude/claudeMcpOrchestrator";
import type { AnalyzeDealResponse, ClaudeMcpPayload, ToolTracePayload } from "@/shared/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = analyzeDealInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const thesis = input.thesis ?? DEFAULT_THESIS;

    const orchestration = await runClaudeMcpOrchestration({
      company_name: input.company_name,
      website: input.website ?? "",
      thesis
    });

    const claude_mcp: ClaudeMcpPayload = orchestration.ok
      ? {
          enabled: true,
          used_mcp_subprocess: orchestration.used_mcp_subprocess,
          assistant_summary: orchestration.assistant_summary,
          tool_invocations: orchestration.tool_invocations,
          model: orchestration.model
        }
      : {
          enabled: false,
          used_mcp_subprocess: orchestration.used_mcp_subprocess,
          tool_invocations: orchestration.tool_invocations,
          model: orchestration.model || undefined,
          fallback_reason: orchestration.error
        };

    const { profile: baseProfile, trace } = buildNormalizedProfileFromTools({
      company_name: input.company_name,
      website: input.website ?? "",
      thesis
    });

    let profile = { ...baseProfile };
    const enrichment = await fetchOpenCorporatesEnrichment(input.company_name);
    if (enrichment.enriched) {
      if (enrichment.sourceLabel) profile.source_labels = [...profile.source_labels, enrichment.sourceLabel];
      if (enrichment.headquartersHint && profile.headquarters.toLowerCase() === "unknown") {
        profile.headquarters = enrichment.headquartersHint;
      }
    }

    let analysis = analyzeDeterministic(profile, thesis);

    if (orchestration.ok && orchestration.assistant_summary) {
      analysis = {
        ...analysis,
        reasons: [
          ...analysis.reasons,
          `Claude intake summary (via MCP tools): ${orchestration.assistant_summary}`
        ]
      };
    } else if (!orchestration.ok) {
      analysis = {
        ...analysis,
        reasons: await maybeEnhanceReasonsWithClaude({
          reasons: analysis.reasons,
          analysis,
          profile: { ...profile, thesis_fit: analysis.score },
          thesis
        })
      };
    }

    const normalized_profile = {
      ...profile,
      thesis_fit: analysis.score
    };

    const tool_trace: ToolTracePayload = {
      company_profile: trace.company_profile,
      financial_signals: trace.financial_signals,
      risk_flags: trace.risk_flags,
      thesis_context: trace.thesis_context
    };

    const response: AnalyzeDealResponse = {
      ...analysis,
      normalized_profile,
      tool_trace,
      claude_mcp
    };

    const validated = analyzeDealResponseSchema.safeParse(response);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Output schema validation failed", details: validated.error.flatten() },
        { status: 500 }
      );
    }
    return NextResponse.json(validated.data);
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while analyzing deal" },
      { status: 500 }
    );
  }
}
