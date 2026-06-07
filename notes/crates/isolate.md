# isolate

V8 sandbox runner — `IsolateClient`, scheduler, workers, `execute_udf`.

See [Isolate client](/execution/isolate-client) for startup notes.

## Key files

| File | Role |
|------|------|
| <CrateRef crate="isolate" file="client.rs" path="crates/isolate/src/client.rs" /> | `IsolateClient::new`, `execute_udf`, worker pool |
| <CrateRef crate="isolate" file="isolate_worker.rs" path="crates/isolate/src/isolate_worker.rs" /> | Per-worker request servicing |
| <CrateRef crate="isolate" file="analyze.rs" path="crates/isolate/src/environment/analyze.rs" /> | Module analysis — finds UDFs, routes, crons |

## Related

- [function_runner](/crates/function_runner)
- [UDF execution](/flows/udf-execution)
