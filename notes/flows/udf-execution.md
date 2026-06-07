# UDF execution

After stepping through all the setup of the Action and function_runner envs, the rest is highly async. Need a higher-level debugger and maybe instrument the UDF runner.

## Entry points

- <CodeLink file="crates/isolate/src/client.rs" line="631">execute_udf()</CodeLink> — main UDF execution
- <CodeLink file="crates/isolate/src/client.rs" line="1449">IsolateWorker::service_requests</CodeLink> — worker loop servicing requests

## UDF execution flow

```mermaid
flowchart TD
  queryEntry[execute_public_query]
  runFn[FunctionRunner::run_function]
  executeUdf[execute_udf]
  worker[IsolateWorker::service_requests]
  v8[V8 isolate runs JS]

  queryEntry --> runFn --> executeUdf --> worker --> v8
```

## HTTP actions path

`execute_http_action()` can run other UDFs — takes `ActionCallbacks` from the application layer, creating a transient reference cycle.

See note in <CodeLink file="crates/isolate/src/client.rs">client.rs</CodeLink>.

## Breakpoint strategy

Good async re-entry points:

1. `execute_udf` — when a function actually runs
2. `IsolateWorker::service_requests` — worker picking up work
3. `FunctionRunner::run_function` — application layer dispatch

See [Debugger quirks](/dev/debugger-quirks) for cleanup when async breakpoints go wrong.

## Related

- [Query entry](/flows/query-entry)
- [Isolate client](/execution/isolate-client)
- [V8 inspector goal](/goals/v8-inspector)
