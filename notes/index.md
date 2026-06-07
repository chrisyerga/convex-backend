# Convex Backend Exploration

Dear diary, for my first open source contribution I've decided on a massive thing that I will never finish. Sleep well.

## Where I am now

**Today (Jun 7):** tracing how <CodeLink repo="lbbb" file="convex/pets.ts" line="65">`pets.listMine`</CodeLink> from the [lbbb app](/today/) flows through the backend. See [today's trace](/today/list-mine).

Previously: stepped through startup through `make_app()` and `InProcessFunctionRunner` / `IsolateClient` creation. Next up after today's trace: higher-level async debugging around UDF execution and figuring out where to plug in `deno_core::v8::inspector`.

See [V8 inspector goal](/goals/v8-inspector) for the north star.

**Crate guides:** [Top 12 for query flow](/crates/) — local_backend → sync → … → runtime.

## Quick reference

| What | Value | Notes |
|------|-------|-------|
| Backend port | `3210` | CONVEX_URL for deployments. localhost:3210 for local-backend | 
| HTTP actions port | `3211` | CONVEX_SITE_URL (so that's what that is) |
| Local dashboard | [http://localhost:6790](http://localhost:6790) | |
| Local backend URL | `http://localhost:3210/` | |
| Admin key (local dev) | `0135..82cd` | Baked in rep files for 'carnitas' backend |
| Run backend | `just run-local-backend` | Runs carnitas backend |
| Run dashboard | `just run-dashboard http://localhost:3210/` | Arg is the backend to talk to. Dashboard at http://localhost:6790 |
| Run notes site | `just notes` → [http://localhost:5173](http://localhost:5173) | |
| Kill stuck backend | `pkill convex-local-backend` | |

## Code links

Click any <span style="font-family: var(--vp-font-family-mono); border-bottom: 1px dashed #8b5cf6">underlined symbol</span> to open the file in Cursor/VS Code.

Example: <CrateRef crate="local_backend" file="main.rs" path="crates/local_backend/src/main.rs" line="1" />

Crate pills: <CrateRef crate="sync" file="worker.rs" path="crates/sync/src/worker.rs" /> — click crate name for notes, file name to open in Cursor.
