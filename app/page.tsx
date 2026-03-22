"use client";

import { FormEvent, useMemo, useState } from "react";
import { DEFAULT_THESIS } from "@/server/mockData/scenarios";
import type { AnalyzeDealResponse, ThesisInput } from "@/shared/types";

const scenarioCompanies = [
  "Northstar Cloud Ops",
  "Riverbend Industrial Services",
  "Aster Analytics",
  "BluePeak Finance Tech"
];

const defaultWebsites: Record<string, string> = {
  "Northstar Cloud Ops": "northstarcloudops.com",
  "Riverbend Industrial Services": "riverbendindustrial.com",
  "Aster Analytics": "asteranalytics.io",
  "BluePeak Finance Tech": "bluepeakfintech.com"
};

export default function HomePage() {
  const [companyName, setCompanyName] = useState(scenarioCompanies[0]);
  const [website, setWebsite] = useState(defaultWebsites[scenarioCompanies[0]] ?? "");
  const [thesis, setThesis] = useState<ThesisInput>(DEFAULT_THESIS);
  const [result, setResult] = useState<AnalyzeDealResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const thesisFields = useMemo(
    () =>
      [
        "target_industry",
        "revenue_range",
        "growth_preference",
        "profitability_preference",
        "geography_preference"
      ] as const,
    []
  );

  function onScenarioChange(name: string) {
    setCompanyName(name);
    setWebsite(defaultWebsites[name] ?? "");
  }

  async function onAnalyze(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          website,
          thesis
        })
      });
      const json = (await res.json()) as AnalyzeDealResponse & { error?: string };
      if (!res.ok) {
        setError((json as { error?: string }).error ?? "Unable to analyze deal");
        setResult(null);
      } else {
        setResult(json as AnalyzeDealResponse);
      }
    } catch {
      setError("Network error while analyzing deal.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6">
      <header className="panel">
        <p className="text-xs uppercase tracking-wider text-cyan-300">Deal Intake Copilot</p>
        <h1 className="mt-1 text-2xl font-semibold">PE Deal Intake and Triage</h1>
        <p className="mt-2 text-sm text-slate-300">
          <strong className="text-slate-200">Claude + MCP (job path):</strong> when{" "}
          <code className="rounded bg-slate-800 px-1">ANTHROPIC_API_KEY</code> is set, the API spawns the same MCP
          server as <code className="rounded bg-slate-800 px-1">npm run mcp</code>, bridges tools via Anthropic&apos;s
          MCP helpers, and runs a Claude tool loop. <strong className="text-slate-200">Scores and decisions</strong>{" "}
          remain deterministic policy output. Optional OpenCorporates enrichment when enabled.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <form className="panel space-y-4" onSubmit={onAnalyze}>
          <h2 className="text-lg font-medium">Deal Intake</h2>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Scenario Quick Select</label>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-950 p-2"
              value={companyName}
              onChange={(e) => onScenarioChange(e.target.value)}
            >
              {scenarioCompanies.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Company Name</label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 p-2"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Website (optional)</label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 p-2"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="domain.com"
            />
            <p className="mt-1 text-xs text-slate-500">
              Passed through company profile tool; merged with scenario mock data.
            </p>
          </div>

          <h3 className="pt-2 text-base font-medium">Thesis Configuration</h3>
          {thesisFields.map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm text-slate-300">{field}</label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-950 p-2"
                value={thesis[field]}
                onChange={(e) => setThesis({ ...thesis, [field]: e.target.value })}
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-sm text-slate-300">minimum_fit_threshold</label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-full rounded-md border border-slate-700 bg-slate-950 p-2"
              value={thesis.minimum_fit_threshold}
              onChange={(e) =>
                setThesis({ ...thesis, minimum_fit_threshold: Number(e.target.value) })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Deal"}
          </button>
          <p className="text-xs text-slate-500">
            With Claude+MCP enabled, the first run may take up to ~60s (spawns MCP + model turns). Deterministic-only
            mode is instant when no API key is configured.
          </p>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </form>

        <section className="space-y-4">
          <div className="panel space-y-4">
            <h2 className="text-lg font-medium">Analysis Output</h2>
            {!result ? (
              <p className="text-sm text-slate-300">
                Run analysis to view deal overview, thesis fit, risks, and next steps.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      result.claude_mcp.enabled ? "bg-indigo-800" : "bg-slate-700"
                    }`}
                  >
                    Claude+MCP: {result.claude_mcp.enabled ? "active" : "fallback"}
                  </span>
                  <span className="rounded-full bg-cyan-900 px-3 py-1">Thesis Fit: {result.thesis_match}</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">Score: {result.score}</span>
                  <span className="rounded-full bg-amber-900 px-3 py-1">
                    Confidence: {result.confidence}
                  </span>
                  <span className="rounded-full bg-violet-900 px-3 py-1">Decision: {result.decision}</span>
                  <span className="rounded-full bg-emerald-900 px-3 py-1">CRM Updated</span>
                </div>

                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                    Claude intake (MCP tools)
                  </p>
                  {result.claude_mcp.enabled && result.claude_mcp.assistant_summary ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">
                      {result.claude_mcp.assistant_summary}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-amber-200/90">
                      {result.claude_mcp.fallback_reason ??
                        "Orchestration skipped — configure ANTHROPIC_API_KEY or check MCP spawn logs."}
                    </p>
                  )}
                  {result.claude_mcp.model ? (
                    <p className="mt-2 text-xs text-slate-500">Model: {result.claude_mcp.model}</p>
                  ) : null}
                </div>

                {result.claude_mcp.tool_invocations.length > 0 ? (
                  <details className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 text-sm">
                    <summary className="cursor-pointer font-medium text-slate-300">
                      Claude tool invocations (live MCP subprocess)
                    </summary>
                    <ul className="mt-2 space-y-2 text-xs text-slate-400">
                      {result.claude_mcp.tool_invocations.map((t) => (
                        <li key={`${t.name}-${JSON.stringify(t.arguments).slice(0, 40)}`}>
                          <span className="font-mono text-cyan-400">{t.name}</span>
                          <p className="mt-0.5 line-clamp-3 text-slate-500">{t.result_preview}</p>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">Deal Overview</p>
                  <p className="mt-1 text-sm text-slate-200">{result.tool_trace.company_profile.short_description}</p>
                  <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-slate-500">Company</dt>
                      <dd>{result.normalized_profile.company_name}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Domain</dt>
                      <dd>{result.normalized_profile.website}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Industry</dt>
                      <dd>{result.normalized_profile.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Headquarters</dt>
                      <dd>{result.normalized_profile.headquarters}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Revenue band</dt>
                      <dd>{result.normalized_profile.revenue_range}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Growth / Profitability</dt>
                      <dd>
                        {result.normalized_profile.growth_indicator} /{" "}
                        {result.normalized_profile.profitability_indicator}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-slate-500">Sources</dt>
                      <dd className="text-slate-300">{result.normalized_profile.source_labels.join(", ")}</dd>
                    </div>
                  </dl>
                </div>

                <PanelList title="Reasons" items={result.reasons} />
                <PanelList title="Risk Flags" items={result.risks} />
                <PanelList title="Missing Data" items={result.missing_data} />
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">Next Step</p>
                  <p className="mt-1 text-sm">{result.next_step}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">CRM Update</p>
                  <p className="mt-1 text-sm">
                    Status: {result.crm_update.status} | Stage: {result.crm_update.stage}
                  </p>
                  <p className="text-sm text-slate-300">{result.crm_update.note}</p>
                </div>

                <details className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 text-sm">
                  <summary className="cursor-pointer font-medium text-slate-300">
                    Deterministic merge trace (same tool outputs used for scoring)
                  </summary>
                  <pre className="mt-2 max-h-64 overflow-auto text-xs text-slate-400">
                    {JSON.stringify(result.tool_trace, null, 2)}
                  </pre>
                </details>
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function PanelList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-wide text-slate-400">{title}</p>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-slate-300">None.</p>
      ) : (
        <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
