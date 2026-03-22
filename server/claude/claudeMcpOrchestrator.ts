import Anthropic from "@anthropic-ai/sdk";
import { mcpTools } from "@anthropic-ai/sdk/helpers/beta/mcp";
import type { MCPCallToolResultLike, MCPClientLike } from "@anthropic-ai/sdk/helpers/beta/mcp";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ThesisInput } from "../../shared/types";
import { resolveAnthropicModel } from "./anthropicModel";

export interface ClaudeMcpToolInvocation {
  name: string;
  arguments: Record<string, unknown>;
  result_preview: string;
}

export interface ClaudeMcpOrchestrationResult {
  ok: boolean;
  assistant_summary?: string;
  tool_invocations: ClaudeMcpToolInvocation[];
  model: string;
  used_mcp_subprocess: boolean;
  error?: string;
}

function repoRootFromHere(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // server/claude/*.ts -> repo root is ../..
  return path.resolve(here, "..", "..");
}

function extractAssistantText(message: Anthropic.Beta.Messages.BetaMessage): string {
  const parts: string[] = [];
  for (const block of message.content) {
    if (block.type === "text") parts.push(block.text);
  }
  return parts.join("\n").trim();
}

function createLoggingMcpClient(
  inner: Client,
  log: ClaudeMcpToolInvocation[]
): MCPClientLike {
  return {
    async callTool(params): Promise<MCPCallToolResultLike> {
      const result = await inner.callTool({
        name: params.name,
        arguments: (params.arguments ?? {}) as Record<string, unknown>
      });
      const content = result.content as Array<{ type: string; text?: string }>;
      const preview = content
        .filter((c): c is { type: "text"; text: string } => c.type === "text" && typeof c.text === "string")
        .map((c) => c.text)
        .join(" ")
        .slice(0, 800);
      log.push({
        name: params.name,
        arguments: (params.arguments ?? {}) as Record<string, unknown>,
        result_preview: preview
      });
      return result as MCPCallToolResultLike;
    }
  };
}

/**
 * Spawns the MCP stdio server (same entry as `npm run mcp`), connects an MCP client,
 * and runs Claude with tools bridged via Anthropic's MCP helpers.
 * Deterministic scoring must still be applied afterward in the API route.
 */
export async function runClaudeMcpOrchestration(input: {
  company_name: string;
  website: string;
  thesis: ThesisInput;
}): Promise<ClaudeMcpOrchestrationResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      tool_invocations: [],
      model: resolveAnthropicModel(),
      used_mcp_subprocess: false,
      error: "ANTHROPIC_API_KEY not set"
    };
  }

  if (process.env.USE_CLAUDE_MCP_ORCHESTRATION === "false") {
    return {
      ok: false,
      tool_invocations: [],
      model: resolveAnthropicModel(),
      used_mcp_subprocess: false,
      error: "USE_CLAUDE_MCP_ORCHESTRATION is false"
    };
  }

  const model = resolveAnthropicModel();
  const timeoutMs = Math.min(Math.max(Number(process.env.CLAUDE_MCP_TIMEOUT_MS ?? 55000), 5000), 120000);

  const root = repoRootFromHere();
  const toolLog: ClaudeMcpToolInvocation[] = [];

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "server/mcp-server.ts"],
    cwd: root,
    stderr: process.env.MCP_SERVER_LOG_STDERR === "true" ? "inherit" : "pipe"
  });

  const mcpClient = new Client({ name: "pe-deal-intake-web", version: "0.1.0" });
  const anthropic = new Anthropic({ apiKey });

  const run = async (): Promise<ClaudeMcpOrchestrationResult> => {
    await mcpClient.connect(transport);
    const listed = await mcpClient.listTools();
    const logging = createLoggingMcpClient(mcpClient, toolLog);
    const tools = mcpTools(listed.tools, logging);

    const system = `You are a PE deal intake copilot. You MUST use the available MCP tools to retrieve:
1) company profile, 2) financial signals, 3) risk flags, and 4) thesis context for this intake.
Call each tool at least once with the provided company name and thesis. Use realistic arguments.
After tool results are back, write a concise 2–4 sentence analyst-style summary of findings.
Do NOT invent numeric scores or Go/No-Go decisions — the application computes those deterministically from policy.`;

    const user = `Company name: ${input.company_name}
Website (optional): ${input.website || "(none)"}
Thesis (JSON): ${JSON.stringify(input.thesis)}

Instructions: Run the tools, then summarize key facts (sector fit signals, size band, risk themes, data gaps) in professional PE language.`;

    const runner = anthropic.beta.messages.toolRunner({
      model,
      max_tokens: 4096,
      max_iterations: 12,
      system,
      messages: [{ role: "user", content: user }],
      tools
    });

    const final = await runner.runUntilDone();
    const assistant_summary = extractAssistantText(final);

    return {
      ok: true,
      assistant_summary,
      tool_invocations: toolLog,
      model,
      used_mcp_subprocess: true
    };
  };

  try {
    const result = await Promise.race([
      run(),
      new Promise<ClaudeMcpOrchestrationResult>((_, reject) =>
        setTimeout(() => reject(new Error(`Claude+MCP orchestration timed out after ${timeoutMs}ms`)), timeoutMs)
      )
    ]);
    return result;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      tool_invocations: toolLog,
      model,
      used_mcp_subprocess: true,
      error: msg
    };
  } finally {
    try {
      await mcpClient.close();
    } catch {
      /* ignore */
    }
  }
}
