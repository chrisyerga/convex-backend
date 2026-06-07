export type CrateEntry = {
  /** CSS color for the pill fill / outline */
  color: string;
  /** Optional one-line description on the crates index */
  blurb?: string;
};

/**
 * Registry of crates we've written notes for.
 * Add entries here as we encounter crates — colors are arbitrary for now.
 */
export const crateRegistry: Record<string, CrateEntry> = {
  sync: {
    color: "#0ea5e9",
    blurb: "Client/server sync protocol — WebSocket subscriptions, query refresh",
  },
  application: {
    color: "#8b5cf6",
    blurb: "Core Application type — execute_public_query and UDF dispatch",
  },
  isolate: {
    color: "#f59e0b",
    blurb: "V8 sandbox — IsolateClient, execute_udf, workers",
  },
  local_backend: {
    color: "#10b981",
    blurb: "Local dev server binary — main, config, public API routes",
  },
  function_runner: {
    color: "#ef4444",
    blurb: "InProcessFunctionRunner — bridges Application to IsolateClient",
  },
};

const FALLBACK_COLORS = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#84cc16",
];

function hashCrate(name: string): number {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export function getCrateStyle(crate: string): { color: string; registered: boolean } {
  const entry = crateRegistry[crate];
  if (entry) return { color: entry.color, registered: true };
  return {
    color: FALLBACK_COLORS[hashCrate(crate) % FALLBACK_COLORS.length],
    registered: false,
  };
}

export function crateNotesPath(crate: string): string {
  return `/crates/${crate}`;
}
