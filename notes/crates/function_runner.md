# function_runner

Bridges `Application` to `IsolateClient` via `InProcessFunctionRunner`.

See [Function runner](/execution/function-runner) for startup notes.

## Key files

| File | Role |
|------|------|
| <CrateRef crate="function_runner" file="lib.rs" path="crates/function_runner/src/lib.rs" /> | `FunctionRunner` trait |
| <CrateRef crate="function_runner" file="server.rs" path="crates/function_runner/src/server.rs" /> | `InProcessFunctionRunner` implementation |

## Related

- [application](/crates/application)
- [isolate](/crates/isolate)
