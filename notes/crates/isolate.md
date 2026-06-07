# isolate

V8 sandbox runner — `IsolateClient`, scheduler, workers, `execute_udf`.

See [Isolate client](/execution/isolate-client) for startup notes.

## Key files

| File | Role |
|------|------|
| `client.rs` | `IsolateClient::new`, `execute_udf`, worker pool |
| `isolate_worker.rs` | Per-worker request servicing |

## Related

- [function_runner](/crates/function_runner)
- [UDF execution](/flows/udf-execution)
