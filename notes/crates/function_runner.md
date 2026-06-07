# function_runner

Bridges `Application` to `IsolateClient` via `InProcessFunctionRunner`.

See [Function runner](/execution/function-runner) for startup notes.

## Key files

| File | Role |
|------|------|
| `lib.rs` | `FunctionRunner` trait |
| `server.rs` | `InProcessFunctionRunner` implementation |

## Related

- [application](/crates/application)
- [isolate](/crates/isolate)
