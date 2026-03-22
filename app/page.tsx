"use client";

/**
 * Badge row palette (HANDOFF §6.2): cyan = thesis/fit signal; slate = metadata & simulated CRM;
 * amber = decision/MCP state (single "state" accent for scanability).
 */

import { FormEvent, useMemo, useState } from "react";
import { DEFAULT_THESIS, SUMMIT_DEFAULT_THESIS } from "@/server/mockData/scenarios";
import type { AnalyzeDealResponse, ThesisInput } from "@/shared/types";

const THESIS_INDUSTRY = ["B2B SaaS", "Industrial Services", "B2B Fintech", "Healthcare IT"] as const;
const THESIS_REVENUE = ["5-50M", "1-5M", "20-50M", "50M+", "<1M"] as const;
const THESIS_GROWTH = ["15-30%+", "10-20%", "Stable / <10%"] as const;
const THESIS_PROFIT = [
  "EBITDA-positive preferred (15%+)",
  "EBITDA-positive preferred",
  "Growth-first; profitability flexible"
] as const;
const THESIS_GEO = ["US", "North America", "Europe"] as const;
const THESIS_THRESHOLDS = [60, 65, 70] as const;

const INDUSTRIALS_PRESET: ThesisInput = {
  target_industry: "Industrial Services",
  revenue_range: "20-50M",
  growth_preference: "Stable / <10%",
  profitability_preference: "EBITDA-positive preferred",
  geography_preference: "US",
  minimum_fit_threshold: 70
};

const SCENARIO_OPTIONS: { value: string; label: string }[] = [
  { value: "Northstar Cloud Ops", label: "Northstar Cloud Ops (strong fit)" },
  { value: "Riverbend Industrial Services", label: "Riverbend Industrial Services (weak fit)" },
  { value: "Aster Analytics", label: "Aster Analytics (incomplete data)" },
  { value: "BluePeak Finance Tech", label: "BluePeak Finance Tech (risky but interesting)" }
];

const defaultWebsites: Record<string, string> = {
  "Northstar Cloud Ops": "northstarcloudops.com",
  "Riverbend Industrial Services": "riverbendindustrial.com",
  "Aster Analytics": "asteranalytics.io",
  "BluePeak Finance Tech": "bluepeakfintech.com"
};

const SCENARIO_CUSTOM = "__custom__";

const selectClass =
  "w-full rounded-md border border-slate-700 bg-slate-950 p-2 text-sm text-slate-200 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600";

function ActiveThesisStrip({ thesis }: { thesis: ThesisInput }) {
  return (
    <div className="rounded-lg border border-slate-700/80 bg-slate-950/60 p-3 text-sm text-slate-300">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Active thesis</p>
      <p className="mt-1.5 leading-relaxed text-slate-200">
        <span className="text-cyan-400/90">{thesis.target_industry}</span>
        {" · "}
        {thesis.revenue_range} rev · {thesis.geography_preference} · growth {thesis.growth_preference}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Preferences inform context; score uses company facts vs thesis industry, size, and geography.
      </p>
    </div>
  );
}

function coreReasonsOnly(reasons: string[]): string[] {
  return reasons.filter((r) => !r.startsWith("Claude intake summary (via MCP tools):"));
}

export default function HomePage() {
  const [companyName, setCompanyName] = useState(SCENARIO_OPTIONS[0].value);
  const [website, setWebsite] = useState(defaultWebsites[SCENARIO_OPTIONS[0].value] ?? "");
  const [thesis, setThesis] = useState<ThesisInput>(DEFAULT_THESIS);
  const [result, setResult] = useState<AnalyzeDealResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const scenarioValueSet = useMemo(() => new Set(SCENARIO_OPTIONS.map((s) => s.value)), []);
  const scenarioSelectValue = scenarioValueSet.has(companyName) ? companyName : SCENARIO_CUSTOM;

  function onScenarioChange(value: string) {
    if (value === SCENARIO_CUSTOM) return;
    setCompanyName(value);
    setWebsite(defaultWebsites[value] ?? "");
  }

  function applyPreset(preset: ThesisInput) {
    setThesis({ ...preset });
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

  const hasOpenCorp =
    result?.normalized_profile.source_labels.some((l) => l.includes("opencorporates")) ?? false;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6">
      <header className="panel">
        <p className="text-xs uppercase tracking-wider text-cyan-300">Deal Intake Copilot</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-100">PE Deal Intake and Triage</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          <strong className="text-slate-200">Claude + MCP (job path):</strong> when{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">ANTHROPIC_API_KEY</code> is set, the
          API spawns the same MCP server as{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">npm run mcp</code>, bridges tools,
          and runs a Claude tool loop. <strong className="text-slate-200">Scores and decisions</strong> remain
          deterministic policy output. Optional OpenCorporates enrichment when enabled.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <form className="panel space-y-4" onSubmit={onAnalyze}>
          <h2 className="text-lg font-medium text-slate-100">Deal Intake</h2>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Scenario</label>
            <select
              className={selectClass}
              value={scenarioSelectValue}
              onChange={(e) => onScenarioChange(e.target.value)}
            >
              {SCENARIO_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
              <option value={SCENARIO_CUSTOM}>Custom company (edit name below)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Company name</label>
            <input
              className={selectClass}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Website (optional)</label>
            <input
              className={selectClass}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="domain.com"
            />
            <p className="mt-1 text-xs text-slate-500">
              Passed through company profile tool; merged with scenario mock data.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Thesis presets</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-600 hover:text-cyan-200"
                onClick={() => applyPreset({ ...SUMMIT_DEFAULT_THESIS })}
              >
                Summit default
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-600 hover:text-cyan-200"
                onClick={() => applyPreset({ ...INDUSTRIALS_PRESET })}
              >
                Industrials tilt
              </button>
            </div>
          </div>

          <h3 className="pt-1 text-base font-medium text-slate-100">Thesis configuration</h3>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Target industry</label>
            <select
              className={selectClass}
              value={thesis.target_industry}
              onChange={(e) => setThesis({ ...thesis, target_industry: e.target.value })}
            >
              {THESIS_INDUSTRY.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Target revenue band</label>
            <select
              className={selectClass}
              value={thesis.revenue_range}
              onChange={(e) => setThesis({ ...thesis, revenue_range: e.target.value })}
            >
              {THESIS_REVENUE.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Growth preference</label>
            <select
              className={selectClass}
              value={thesis.growth_preference}
              onChange={(e) => setThesis({ ...thesis, growth_preference: e.target.value })}
            >
              {THESIS_GROWTH.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Profitability preference</label>
            <select
              className={selectClass}
              value={thesis.profitability_preference}
              onChange={(e) => setThesis({ ...thesis, profitability_preference: e.target.value })}
            >
              {THESIS_PROFIT.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Geography preference</label>
            <select
              className={selectClass}
              value={thesis.geography_preference}
              onChange={(e) => setThesis({ ...thesis, geography_preference: e.target.value })}
            >
              {THESIS_GEO.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <details className="rounded-lg border border-slate-700/80 bg-slate-950/40 p-3">
            <summary className="cursor-pointer text-sm font-medium text-slate-400">Advanced</summary>
            <div className="mt-3">
              <label className="mb-1 block text-sm text-slate-300">Fit threshold (0–100)</label>
              <select
                className={selectClass}
                value={thesis.minimum_fit_threshold}
                onChange={(e) =>
                  setThesis({ ...thesis, minimum_fit_threshold: Number(e.target.value) })
                }
              >
                {THESIS_THRESHOLDS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </details>

          <ActiveThesisStrip thesis={thesis} />

          <button
            type="submit"
            className="w-full rounded-md bg-cyan-500 px-4 py-2.5 font-medium text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Analyzing…" : "Analyze deal"}
          </button>
          <p className="text-xs text-slate-500">
            With Claude+MCP enabled, the first run may take up to ~60s. Deterministic path is instant without
            an API key.
          </p>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </form>

        <section className="space-y-4">
          <div className="panel space-y-6">
            <h2 className="text-lg font-medium text-slate-100">Intake memo</h2>
            {!result ? (
              <p className="text-sm text-slate-400">
                Run analysis to view thesis fit, decision, reasons, risks, and next steps.
              </p>
            ) : (
              <>
                <ActiveThesisStrip thesis={thesis} />

                <div className="border-b border-slate-700/80 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Thesis fit</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-cyan-400">
                    {result.thesis_match}
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Decision</p>
                    <p className="mt-1 text-xl font-semibold text-slate-100">{result.decision}</p>
                    {result.decision === "Review" ? (
                      <p className="mt-1 text-sm font-medium text-amber-300/90">Needs review</p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm text-slate-500">
                    Score <span className="text-slate-300">{result.score}</span>
                    <span className="mx-2 text-slate-600">·</span>
                    Confidence <span className="text-slate-300">{result.confidence}</span>
                    <span className="mx-2 text-slate-600">·</span>
                    Threshold <span className="text-slate-300">{thesis.minimum_fit_threshold}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      result.claude_mcp.enabled ? "bg-amber-950/80 text-amber-200" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    MCP: {result.claude_mcp.enabled ? "active" : "fallback"}
                  </span>
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 font-medium text-slate-300">
                    CRM · Simulated
                  </span>
                  {hasOpenCorp ? (
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-400">
                      Registry hint (OpenCorporates)
                    </span>
                  ) : null}
                </div>

                <PanelList title="Reasons" items={coreReasonsOnly(result.reasons)} />
                <PanelList title="Risk flags" items={result.risks} />
                <PanelList title="Missing data" items={result.missing_data} />

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Next step</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-200">{result.next_step}</p>
                </div>

                <div className="rounded-xl border border-slate-600/80 bg-slate-950/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    CRM handoff (simulated)
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    Stage: <span className="text-slate-100">{result.crm_update.stage}</span>
                    <span className="mx-2 text-slate-600">·</span>
                    Status: {result.crm_update.status}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{result.crm_update.note}</p>
                  <p className="mt-3 text-xs text-slate-500">Demo only — no external CRM contacted.</p>
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

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Deal overview</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-200">
                    {result.tool_trace.company_profile.short_description}
                  </p>
                  <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-slate-500">Company</dt>
                      <dd className="text-slate-200">{result.normalized_profile.company_name}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Domain</dt>
                      <dd className="text-slate-200">{result.normalized_profile.website}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Industry</dt>
                      <dd className="text-slate-200">{result.normalized_profile.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Headquarters</dt>
                      <dd className="text-slate-200">{result.normalized_profile.headquarters}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Revenue band</dt>
                      <dd className="text-slate-200">{result.normalized_profile.revenue_range}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Growth / Profitability</dt>
                      <dd className="text-slate-200">
                        {result.normalized_profile.growth_indicator} /{" "}
                        {result.normalized_profile.profitability_indicator}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-slate-500">Sources</dt>
                      <dd className="text-slate-300">{result.normalized_profile.source_labels.join(", ")}</dd>
                      {hasOpenCorp ? (
                        <p className="mt-1 text-xs text-slate-500">
                          OpenCorporates added a public-registry jurisdiction hint where enabled.
                        </p>
                      ) : null}
                    </div>
                  </dl>
                </div>

                {result.claude_mcp.tool_invocations.length > 0 ? (
                  <details className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 text-sm">
                    <summary className="cursor-pointer font-medium text-slate-300">
                      Claude tool invocations (live MCP subprocess)
                    </summary>
                    <ul className="mt-2 space-y-2 text-xs text-slate-400">
                      {result.claude_mcp.tool_invocations.map((t, i) => (
                        <li key={`${t.name}-${i}`}>
                          <span className="font-mono text-cyan-400">{t.name}</span>
                          <p className="mt-0.5 line-clamp-3 text-slate-500">{t.result_preview}</p>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                <details className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 text-sm">
                  <summary className="cursor-pointer font-medium text-slate-300">
                    Deterministic merge trace (tool outputs used for scoring)
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
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-slate-400">None.</p>
      ) : (
        <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-slate-200">
          {items.map((item, i) => (
            <li key={`${i}-${item.slice(0, 48)}`}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
