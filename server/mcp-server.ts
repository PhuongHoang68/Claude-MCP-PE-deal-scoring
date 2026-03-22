#!/usr/bin/env npx tsx
/**
 * MCP stdio server exposing the four deal-intake tools (mock-first, deterministic).
 * Run: npm run mcp
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod";
import { getCompanyProfileTool } from "./tools/getCompanyProfile";
import { getFinancialSignalsTool } from "./tools/getFinancialSignals";
import { getRiskFlagsTool } from "./tools/getRiskFlags";
import { getThesisContextTool } from "./tools/getThesisContext";
import { getScenarioByName } from "./mockData/scenarios";
import type { ThesisInput } from "../shared/types";

const thesisSchema = z.object({
  target_industry: z.string(),
  revenue_range: z.string(),
  growth_preference: z.string(),
  profitability_preference: z.string(),
  geography_preference: z.string(),
  minimum_fit_threshold: z.number()
});

const mcpServer = new McpServer({
  name: "pe-deal-intake-tools",
  version: "0.1.0"
});

mcpServer.registerTool(
  "get_company_profile",
  {
    description: "Return normalized company firmographics for the target name and domain.",
    inputSchema: {
      company_name: z.string(),
      website: z.string().optional().default("")
    }
  },
  async ({ company_name, website }) => {
    const tool = getCompanyProfileTool({ company_name, website: website ?? "" });
    return { content: [{ type: "text" as const, text: JSON.stringify(tool) }] };
  }
);

mcpServer.registerTool(
  "get_financial_signals",
  {
    description: "Return revenue, growth, profitability, and confidence signals.",
    inputSchema: {
      company_name: z.string()
    }
  },
  async ({ company_name }) => {
    const scenario = getScenarioByName(company_name);
    const base = { ...scenario.profile };
    const fin = getFinancialSignalsTool(base);
    return { content: [{ type: "text" as const, text: JSON.stringify(fin) }] };
  }
);

mcpServer.registerTool(
  "get_risk_flags",
  {
    description: "Return structured risk flags and completeness for the target company.",
    inputSchema: {
      company_name: z.string()
    }
  },
  async ({ company_name }) => {
    const scenario = getScenarioByName(company_name);
    const base = { ...scenario.profile };
    const rf = getRiskFlagsTool(base);
    return { content: [{ type: "text" as const, text: JSON.stringify(rf) }] };
  }
);

mcpServer.registerTool(
  "get_thesis_context",
  {
    description: "Return the fund thesis criteria used for scoring.",
    inputSchema: {
      thesis: thesisSchema
    }
  },
  async ({ thesis }) => {
    const t = getThesisContextTool(thesis as ThesisInput);
    return { content: [{ type: "text" as const, text: JSON.stringify(t) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
