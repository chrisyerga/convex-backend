# Actions vs function_runner

There are two things that execute Javascript code:

## Actions\<Runtime\>

The "node" execution environment available for certain functions. Takes a `NodeExecutor`, deployment data, but not much else.

I bet this is the first implementation and **function_runner** is the new streamlined cloud worker thingamajig.

Created in `make_app()`:

- `node_process_timeout(5 seconds)`
- `node_executor(takes timeout thing)`
- creates `Actions(takes node exec/timeout)`

## function_runner\<Runtime\>

The main cloud-worker sandbox method. See [Function runner](/execution/function-runner).

Creates a new `IsolateClient`. Not sure if `Actions` does the same.

## Comparison

| | Actions | function_runner |
|---|---------|-----------------|
| Runtime | Node executor | V8 isolate (InProcessFunctionRunner) |
| Use case | Legacy "node" functions? | Main UDF/query/mutation sandbox |
| V8? | Unknown | Yes — IsolateClient |

## Related

- [Function runner](/execution/function-runner)
- [Isolate client](/execution/isolate-client)
