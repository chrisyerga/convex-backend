# Debugger quirks

## LLDB + Rust

Right now LLDB is stepping object code with symbols, but has no knowledge of Rust. The Debug Console gives you the LLDB command line. In there you can enter `language` but it only knows `cplusplus` and `objc`.

TODO: look into plugins or other options for Rust-aware debugging.

## launch.json setup

Set up `launch.json` for LLDB that attaches to `cargo run -p local_backend ...` from `just run-local-backend`.

- Works, but kinda ugly — starts multiple shells, gets errors, etc.
- Maybe pull the Cargo build bit out and just run the bin?

## Async breakpoints

Setting a breakpoint in the wrong place in async code causes havoc and you need to kill the debugger. This leaves a process with open db files etc.

Clean up with:

```bash
pkill convex-local-backend
```

## Useful breakpoint candidates

After stepping through startup, the rest is highly async. Good places to re-enter:

- <CodeLink file="crates/isolate/src/client.rs" line="631">execute_udf()</CodeLink>
- <CodeLink file="crates/isolate/src/client.rs" line="1449">IsolateWorker::service_requests</CodeLink>

See [UDF execution](/flows/udf-execution) for the async flow.
