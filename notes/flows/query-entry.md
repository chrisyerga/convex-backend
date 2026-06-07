# Query entry

Most traffic goes through `execute_public_query` — the main entry point for queries, used by the sync worker and HTTP API.

## Signature

From <CodeLink file="crates/application/src/api.rs" line="98">crates/application/src/api.rs</CodeLink>:

```rust
/// Execute a public query on the root app. This method is used by the sync
/// worker and HTTP API for the majority of traffic as the main entry point
/// for queries.
async fn execute_public_query(
    &self,
    host: &ResolvedHostname,
    request_context: RequestContext,
    identity: Identity,
    path: ExportPath,
    args: SerializedArgs,
    caller: FunctionCaller,
    ts: ExecuteQueryTimestamp,
    journal: Option<SerializedQueryJournal>,
) -> anyhow::Result<RedactedQueryReturn>;
```

## Callers

- <CodeLink file="crates/sync/src/worker.rs" line="999">sync worker</CodeLink> — WebSocket subscription traffic
- <CodeLink file="crates/local_backend/src/public_api.rs" line="418">local_backend public API</CodeLink> — HTTP API

## Query flow (high level)

```mermaid
sequenceDiagram
  participant Client
  participant SyncOrHTTP as sync worker / HTTP API
  participant App as Application
  participant FnRunner as function_runner
  participant Isolate as IsolateClient

  Client->>SyncOrHTTP: query request
  SyncOrHTTP->>App: execute_public_query
  App->>FnRunner: run_function
  FnRunner->>Isolate: execute_udf
  Isolate-->>FnRunner: FunctionOutcome
  FnRunner-->>App: result
  App-->>SyncOrHTTP: RedactedQueryReturn
  SyncOrHTTP-->>Client: response
```

## Related

- [UDF execution](/flows/udf-execution)
- [Function runner](/execution/function-runner)
