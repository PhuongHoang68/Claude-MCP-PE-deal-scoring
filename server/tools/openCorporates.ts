interface OpenCorporatesResult {
  enriched: boolean;
  sourceLabel?: string;
  headquartersHint?: string;
}

function normalizeCountryCode(code?: string): string | undefined {
  if (!code) return undefined;
  const map: Record<string, string> = {
    us: "US",
    ca: "Canada",
    gb: "United Kingdom"
  };
  return map[code.toLowerCase()] ?? code.toUpperCase();
}

export async function fetchOpenCorporatesEnrichment(
  companyName: string
): Promise<OpenCorporatesResult> {
  const enabled = process.env.REAL_DATA_SOURCE_ENABLED === "true";
  console.log("OC enabled?", enabled, JSON.stringify(process.env.REAL_DATA_SOURCE_ENABLED));
  if (!enabled) return { enriched: false };

  try {
    const query = encodeURIComponent(companyName);
    const res = await fetch(
      `https://api.opencorporates.com/v0.4/companies/search?q=${query}&per_page=1`,
      { method: "GET", cache: "no-store" }
    );
    console.log("OpenCorporates HTTP", res.status, res.ok);
    if (!res.ok) return { enriched: false };

    const json = (await res.json()) as {
      results?: {
        companies?: Array<{ company?: { jurisdiction_code?: string } }>;
      };
    };
    const jurisdiction = json.results?.companies?.[0]?.company?.jurisdiction_code;
    const country = normalizeCountryCode(jurisdiction);

    return {
      enriched: true,
      sourceLabel: "opencorporates_public",
      headquartersHint: country
    };
  } catch {
    return { enriched: false };
  }
}
