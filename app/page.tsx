"use client";

/**
 * Badge row palette (HANDOFF §6.2): cyan = thesis/fit signal; slate = metadata & simulated CRM;
 * amber = decision/MCP state (single "state" accent for scanability).
 */

import {
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
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

type ThesisKey = keyof ThesisInput;

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

/** Match `.thesis-field--flash` animation duration in `globals.css` (+ small buffer before unmounting class). */
const THESIS_FIELD_FLASH_CLEAR_MS = 1600;

const selectClass =
  "w-full rounded-md border border-slate-700 bg-slate-950 p-2 text-sm text-slate-200 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/40";

/** Outline “info in circle” — same visual language as Linear, Notion, etc. (no boxed button chrome) */
function InfoGlyph() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

/** Match Tailwind w-[min(calc(100vw-2rem),…rem)] using root rem (viewport-safe). */
function infoPopoverWidthPx(wide: boolean | undefined) {
  if (typeof window === "undefined") return wide ? 608 : 352;
  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const capRem = wide ? 38 : 22;
  return Math.min(window.innerWidth - rootPx * 2, capRem * rootPx);
}

function InfoPopover({
  ariaLabel,
  title,
  subtitle,
  wide,
  children
}: {
  ariaLabel: string;
  title: string;
  subtitle?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  const panelDomId = useId().replace(/:/g, "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [panelBox, setPanelBox] = useState({ top: 0, left: 0, width: 352 });
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelScheduledClose();
    leaveTimerRef.current = setTimeout(() => setOpen(false), 200);
  }, [cancelScheduledClose]);

  useEffect(() => () => cancelScheduledClose(), [cancelScheduledClose]);

  const updatePanelPosition = useCallback(() => {
    const trigger = wrapRef.current;
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const width = infoPopoverWidthPx(wide);
    const overlap = 10;
    let left = r.right - width;
    const margin = 16;
    left = Math.max(margin, Math.min(left, window.innerWidth - margin - width));
    setPanelBox({
      top: r.bottom - overlap,
      left,
      width
    });
  }, [wide]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePanelPosition();
    window.addEventListener("scroll", updatePanelPosition, true);
    window.addEventListener("resize", updatePanelPosition);
    return () => {
      window.removeEventListener("scroll", updatePanelPosition, true);
      window.removeEventListener("resize", updatePanelPosition);
    };
  }, [open, updatePanelPosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || panelWrapRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const panel =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={panelWrapRef}
            className="pointer-events-auto fixed z-[300] flex flex-col pt-2"
            style={{
              top: panelBox.top,
              left: panelBox.left,
              width: panelBox.width
            }}
            onMouseEnter={cancelScheduledClose}
            onMouseLeave={scheduleClose}
          >
            <div
              id={panelDomId}
              role="tooltip"
              className="info-popover-panel w-full overflow-hidden rounded-xl border border-slate-600/70 bg-slate-950/95 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(34,211,238,0.08)] backdrop-blur-md"
            >
              <div className="border-b border-slate-700/70 bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-slate-950/80 px-4 py-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-400/95">{title}</p>
                {subtitle ? <p className="mt-1 text-xs leading-snug text-slate-500">{subtitle}</p> : null}
              </div>
              <div className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain px-4 py-3">
                {children}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div
      ref={wrapRef}
      className="inline-flex shrink-0 align-middle"
      onMouseEnter={() => {
        cancelScheduledClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={panelDomId}
        onClick={() => setOpen((o) => !o)}
        className="group -m-1 inline-flex rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-800/60 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        <InfoGlyph />
      </button>
      {panel}
    </div>
  );
}

function PresetMetricTable({ t, id, labelledBy }: { t: ThesisInput; id: string; labelledBy: string }) {
  const rows: { k: string; v: string }[] = [
    { k: "Industry", v: t.target_industry },
    { k: "Revenue band", v: t.revenue_range },
    { k: "Geography", v: t.geography_preference },
    { k: "Growth", v: t.growth_preference },
    { k: "Profitability", v: t.profitability_preference },
    { k: "Fit threshold", v: String(t.minimum_fit_threshold) }
  ];
  return (
    <article
      id={id}
      className="rounded-lg border border-slate-700/70 bg-slate-900/60 p-3 shadow-inner shadow-black/20"
      aria-labelledby={labelledBy}
    >
      <dl className="space-y-2 text-xs">
        {rows.map((row) => (
          <div key={row.k} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
            <dt className="shrink-0 text-slate-500">{row.k}</dt>
            <dd className="text-right font-medium leading-snug text-slate-200 sm:max-w-[65%]">{row.v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function PresetHelpBody() {
  return (
    <>
      <p className="text-xs leading-relaxed text-slate-500">
        Presets load a full thesis in one tap. Values below are exactly what gets sent on Analyze.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <p
            id="preset-help-summit"
            className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-cyan-400/80"
          >
            Summit default
          </p>
          <p className="mb-2 text-xs text-slate-400">
            Demo mandate: US-oriented B2B SaaS, lower mid-market revenue band, growth-weighted.
          </p>
          <PresetMetricTable
            t={SUMMIT_DEFAULT_THESIS}
            id="preset-table-summit"
            labelledBy="preset-help-summit"
          />
        </div>
        <div>
          <p
            id="preset-help-industrials"
            className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-cyan-400/80"
          >
            Industrials tilt
          </p>
          <p className="mb-2 text-xs text-slate-400">
            Contrasts SaaS: industrial sector, larger band, stability-first growth and profit posture.
          </p>
          <PresetMetricTable
            t={INDUSTRIALS_PRESET}
            id="preset-table-industrials"
            labelledBy="preset-help-industrials"
          />
        </div>
      </div>
    </>
  );
}

function ThesisConfigHelpBody() {
  return (
    <ul className="space-y-3 text-xs leading-relaxed text-slate-400">
      <li>
        <span className="font-semibold text-slate-300">Target industry</span>
        <span className="ml-1.5 rounded border border-cyan-900/60 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-400/90">
          Affects score
        </span>
        <p className="mt-1 text-slate-500">
          Compared to the company&apos;s industry in the normalized profile. Mismatch reduces the industry fit
          component of the weighted score.
        </p>
      </li>
      <li>
        <span className="font-semibold text-slate-300">Target revenue band</span>
        <span className="ml-1.5 rounded border border-cyan-900/60 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-400/90">
          Affects score
        </span>
        <p className="mt-1 text-slate-500">
          Company revenue band is checked against this thesis range for the size-fit component.
        </p>
      </li>
      <li>
        <span className="font-semibold text-slate-300">Geography preference</span>
        <span className="ml-1.5 rounded border border-cyan-900/60 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-400/90">
          Affects score
        </span>
        <p className="mt-1 text-slate-500">
          HQ / region signals are matched to your mandate (e.g. US, North America).
        </p>
      </li>
      <li>
        <span className="font-semibold text-slate-300">Growth & profitability preferences</span>
        <span className="ml-1.5 rounded border border-slate-600 bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Context
        </span>
        <p className="mt-1 text-slate-500">
          Shown in the tool trace and intake narrative. The numeric score uses the company&apos;s actual growth
          and profitability indicators from the profile, not these text preferences.
        </p>
      </li>
      <li>
        <span className="font-semibold text-slate-300">Fit threshold (Advanced)</span>
        <span className="ml-1.5 rounded border border-cyan-900/60 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-400/90">
          Affects score
        </span>
        <p className="mt-1 text-slate-500">
          Minimum weighted score for a <strong className="text-slate-400">Go</strong>; bands near the line
          surface as <strong className="text-slate-400">Review</strong> per policy.
        </p>
      </li>
    </ul>
  );
}

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

function changedThesisKeys(before: ThesisInput, after: ThesisInput): ThesisKey[] {
  const keys: ThesisKey[] = [
    "target_industry",
    "revenue_range",
    "growth_preference",
    "profitability_preference",
    "geography_preference",
    "minimum_fit_threshold"
  ];
  return keys.filter((k) => before[k] !== after[k]);
}

/** Same glow as thesis preset updates (`globals.css` `.thesis-field--flash`). */
function FieldFlashWrap({
  highlight,
  children,
  ...rest
}: {
  highlight: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`-mx-1 rounded-lg px-1 py-0.5 ${highlight ? "thesis-field--flash" : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

function ThesisFieldWrap({
  fieldKey,
  highlight,
  children
}: {
  fieldKey: ThesisKey;
  highlight: boolean;
  children: ReactNode;
}) {
  return (
    <FieldFlashWrap highlight={highlight} data-thesis-field={fieldKey}>
      {children}
    </FieldFlashWrap>
  );
}

function AnalyzeLoadingOverlay() {
  return (
    <div
      className="analyze-loading-backdrop fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Generating deal analysis"
    >
      <div className="analyze-loading-card w-full max-w-md rounded-3xl border border-slate-500/35 bg-slate-950/92 px-8 py-9 text-center backdrop-blur-xl">
        <p className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
          Generating your deal score
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
          Running the policy engine and intake path. With Claude+MCP enabled, this can take up to about a
          minute.
        </p>
        <div className="analyze-progress-track mt-8" aria-hidden>
          <div className="analyze-progress-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [companyName, setCompanyName] = useState(SCENARIO_OPTIONS[0].value);
  const [website, setWebsite] = useState(defaultWebsites[SCENARIO_OPTIONS[0].value] ?? "");
  const [thesis, setThesis] = useState<ThesisInput>(DEFAULT_THESIS);
  const [result, setResult] = useState<AnalyzeDealResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState<Set<string>>(new Set());
  const [presetToast, setPresetToast] = useState<{ label: string; changed: number } | null>(null);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Invalidates pending field-flash timeouts so a stale scenario timer cannot outlive a newer preset flash. */
  const fieldFlashEpochRef = useRef(0);

  const scheduleFieldFlashClear = useCallback(() => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
    fieldFlashEpochRef.current += 1;
    const epoch = fieldFlashEpochRef.current;
    highlightTimerRef.current = setTimeout(() => {
      if (fieldFlashEpochRef.current !== epoch) return;
      setHighlightedFields(new Set());
      highlightTimerRef.current = null;
    }, THESIS_FIELD_FLASH_CLEAR_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
      fieldFlashEpochRef.current += 1;
    };
  }, []);

  const scenarioValueSet = useMemo(() => new Set(SCENARIO_OPTIONS.map((s) => s.value)), []);
  const scenarioSelectValue = scenarioValueSet.has(companyName) ? companyName : SCENARIO_CUSTOM;

  const isHighlighted = (k: ThesisKey) => highlightedFields.has(k);

  function applyPreset(preset: ThesisInput, displayLabel: string) {
    const before = { ...thesis };
    const next = { ...preset };
    const changed = changedThesisKeys(before, next);

    setThesis(next);
    setHighlightedFields(new Set(changed));

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);

    setPresetToast({ label: displayLabel, changed: changed.length });

    highlightTimerRef.current = setTimeout(() => {
      setHighlightedFields(new Set());
      highlightTimerRef.current = null;
    }, THESIS_FIELD_FLASH_CLEAR_MS);

    toastTimerRef.current = setTimeout(() => {
      setPresetToast(null);
      toastTimerRef.current = null;
    }, 4000);
  }

  function onScenarioChange(value: string) {
    if (value === SCENARIO_CUSTOM) return;
    const nextName = value;
    const nextWebsite = defaultWebsites[value] ?? "";
    const changed = new Set<string>();
    if (companyName !== nextName) changed.add("company_name");
    if (website !== nextWebsite) changed.add("website");

    setCompanyName(nextName);
    setWebsite(nextWebsite);

    if (changed.size === 0) return;

    setHighlightedFields(changed);
    scheduleFieldFlashClear();
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
    <>
    <main className="relative z-[1] mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-4 sm:p-6">
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
        <form className="panel space-y-4" onSubmit={onAnalyze} noValidate>
          <div aria-live="polite" aria-atomic className="min-h-0">
            {presetToast ? (
              <div
                role="status"
                className="preset-toast mb-4 flex items-start gap-3 rounded-lg border border-cyan-500/35 bg-gradient-to-br from-cyan-950/50 to-slate-900/90 px-3 py-2.5 shadow-lg shadow-cyan-950/20"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium text-cyan-100">
                    {presetToast.changed > 0 ? "Thesis updated" : "Already on this thesis"}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    <span className="text-slate-300">{presetToast.label}</span>
                    {presetToast.changed > 0 ? (
                      <>
                        {" "}
                        · <span className="text-cyan-400/80">{presetToast.changed} field(s) changed</span>
                      </>
                    ) : (
                      <> — no fields needed updating.</>
                    )}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <h2 className="text-lg font-medium text-slate-100">Deal Intake</h2>

          <div>
            <label className="mb-1 block text-sm text-slate-300" htmlFor="scenario-select">
              Scenario
            </label>
            <select
              id="scenario-select"
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

          <FieldFlashWrap highlight={highlightedFields.has("company_name")}>
            <label className="mb-1 block text-sm text-slate-300" htmlFor="company-name">
              Company name
            </label>
            <input
              id="company-name"
              className={selectClass}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              autoComplete="organization"
            />
          </FieldFlashWrap>

          <FieldFlashWrap highlight={highlightedFields.has("website")}>
            <label className="mb-1 block text-sm text-slate-300" htmlFor="website">
              Website (optional)
            </label>
            <input
              id="website"
              className={selectClass}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="domain.com"
              autoComplete="url"
            />
            <p className="mt-1 text-xs text-slate-500">
              Passed through company profile tool; merged with scenario mock data.
            </p>
          </FieldFlashWrap>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p id="thesis-presets-heading" className="text-sm font-medium text-slate-300">
                Thesis presets
              </p>
              <InfoPopover
                ariaLabel="Thesis presets: values inside Summit default and Industrials tilt"
                title="Thesis presets"
                subtitle="Hover or tap the icon. Each preset fills every thesis field in one action."
                wide
              >
                <PresetHelpBody />
              </InfoPopover>
            </div>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-labelledby="thesis-presets-heading"
            >
              <button
                type="button"
                className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-500/60 hover:bg-slate-800 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 active:scale-[0.98]"
                onClick={() => applyPreset({ ...SUMMIT_DEFAULT_THESIS }, "Summit default")}
              >
                Summit default
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-500/60 hover:bg-slate-800 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 active:scale-[0.98]"
                onClick={() => applyPreset({ ...INDUSTRIALS_PRESET }, "Industrials tilt")}
              >
                Industrials tilt
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-700/50 pt-4">
            <h3 id="thesis-config-heading" className="text-base font-medium text-slate-100">
              Thesis configuration
            </h3>
            <InfoPopover
              ariaLabel="Thesis configuration: how each field affects scoring"
              title="Thesis fields"
              subtitle="What moves the weighted score vs what is context for the memo and tools."
            >
              <ThesisConfigHelpBody />
            </InfoPopover>
          </div>

          <div className="space-y-4" role="group" aria-labelledby="thesis-config-heading">
            <ThesisFieldWrap fieldKey="target_industry" highlight={isHighlighted("target_industry")}>
              <div>
                <label className="mb-1 block text-sm text-slate-300" htmlFor="thesis-target-industry">
                  Target industry
                </label>
                <select
                  id="thesis-target-industry"
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
            </ThesisFieldWrap>

            <ThesisFieldWrap fieldKey="revenue_range" highlight={isHighlighted("revenue_range")}>
              <div>
                <label className="mb-1 block text-sm text-slate-300" htmlFor="thesis-revenue">
                  Target revenue band
                </label>
                <select
                  id="thesis-revenue"
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
            </ThesisFieldWrap>

            <ThesisFieldWrap fieldKey="growth_preference" highlight={isHighlighted("growth_preference")}>
              <div>
                <label className="mb-1 block text-sm text-slate-300" htmlFor="thesis-growth">
                  Growth preference
                </label>
                <select
                  id="thesis-growth"
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
            </ThesisFieldWrap>

            <ThesisFieldWrap
              fieldKey="profitability_preference"
              highlight={isHighlighted("profitability_preference")}
            >
              <div>
                <label className="mb-1 block text-sm text-slate-300" htmlFor="thesis-profit">
                  Profitability preference
                </label>
                <select
                  id="thesis-profit"
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
            </ThesisFieldWrap>

            <ThesisFieldWrap fieldKey="geography_preference" highlight={isHighlighted("geography_preference")}>
              <div>
                <label className="mb-1 block text-sm text-slate-300" htmlFor="thesis-geo">
                  Geography preference
                </label>
                <select
                  id="thesis-geo"
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
            </ThesisFieldWrap>

            <details className="rounded-lg border border-slate-700/80 bg-slate-950/40 p-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40">
                Advanced
              </summary>
              <ThesisFieldWrap
                fieldKey="minimum_fit_threshold"
                highlight={isHighlighted("minimum_fit_threshold")}
              >
                <div className="mt-3">
                  <label className="mb-1 block text-sm text-slate-300" htmlFor="thesis-threshold">
                    Fit threshold (0–100)
                  </label>
                  <select
                    id="thesis-threshold"
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
              </ThesisFieldWrap>
            </details>
          </div>

          <ActiveThesisStrip thesis={thesis} />

          <button
            type="submit"
            className="btn-analyze-deal relative isolate w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 px-4 py-2.5 font-semibold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628] disabled:opacity-55"
            disabled={loading}
          >
            {loading ? "Analyzing…" : "Analyze deal"}
          </button>
          <p className="text-xs text-slate-500">
            With Claude+MCP enabled, the first run may take up to ~60s. Deterministic path is instant without
            an API key.
          </p>
          {error ? (
            <p className="text-sm text-rose-300" role="alert">
              {error}
            </p>
          ) : null}
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
                    <summary className="cursor-pointer font-medium text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40">
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
                  <summary className="cursor-pointer font-medium text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40">
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
    {loading ? <AnalyzeLoadingOverlay /> : null}
    </>
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
