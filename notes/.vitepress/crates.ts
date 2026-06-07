export type CrateEntry = {
  /** CSS color for the pill fill / outline */
  color: string;
  /** Optional one-line description on the crates index */
  blurb?: string;
  /** Top-12 query-flow crate (shown prominently on index) */
  core?: boolean;
};

/**
 * Registry of crates we've written notes for.
 * `core: true` = top dozen for tracing app/query flow.
 */
export const crateRegistry: Record<string, CrateEntry> = {
  local_backend: {
    color: "#10b981",
    blurb: "Dev server binary — startup, HTTP routes, wires everything together",
    core: true,
  },
  sync: {
    color: "#0ea5e9",
    blurb: "WebSocket sync protocol — subscriptions and query refresh",
    core: true,
  },
  authentication: {
    color: "#ec4899",
    blurb: "JWT/OIDC validation — Bearer token → Identity",
    core: true,
  },
  application: {
    color: "#8b5cf6",
    blurb: "Application type — execute_public_query, caching, redaction",
    core: true,
  },
  function_runner: {
    color: "#ef4444",
    blurb: "InProcessFunctionRunner — opens DB txn, calls IsolateClient",
    core: true,
  },
  isolate: {
    color: "#f59e0b",
    blurb: "V8 sandbox — execute_udf, syscalls, module loading",
    core: true,
  },
  database: {
    color: "#14b8a6",
    blurb: "Transactional storage — DeveloperQuery, ReadSet, reactive tokens",
    core: true,
  },
  model: {
    color: "#a855f7",
    blurb: "System tables — _auth, _modules, _schemas metadata",
    core: true,
  },
  udf: {
    color: "#f97316",
    blurb: "UDF outcomes and pre-run validation",
    core: true,
  },
  value: {
    color: "#84cc16",
    blurb: "Convex values — documents, IDs, JsonPackedValue for wire format",
    core: true,
  },
  common: {
    color: "#6366f1",
    blurb: "Shared types — ExportPath, Query AST, Identity, Runtime trait",
    core: true,
  },
  runtime: {
    color: "#64748b",
    blurb: "ProdRuntime — Tokio, clocks, RNG for Database and UDF runs",
    core: true,
  },
  keybroker: {
    color: "#78716c",
    blurb: "Dev instance keys and secrets for local backend",
  },
  search: {
    color: "#06b6d4",
    blurb: "Search indexing — in_process_searcher setup at startup",
  },
  backend_harness: {
    color: "#94a3b8",
    blurb: "Test harness — hosted deployment port sniffing",
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

/** Core dozen in query-flow order */
export const coreCrates = Object.entries(crateRegistry)
  .filter(([, e]) => e.core)
  .map(([name]) => name);
