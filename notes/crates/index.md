# Crates

Notes organized by Rust crate. Click a crate pill's **left half** in any page to jump here.

| Crate | Focus |
|-------|-------|
| [sync](/crates/sync) | WebSocket sync protocol, subscription query refresh |
| [application](/crates/application) | `Application` type, `execute_public_query` |
| [isolate](/crates/isolate) | V8 sandbox, `execute_udf`, workers |
| [local_backend](/crates/local_backend) | Dev server binary, HTTP routes |
| [function_runner](/crates/function_runner) | `InProcessFunctionRunner` |

## Adding a crate

1. Create `notes/crates/{name}.md`
2. Add an entry to [`crateRegistry`](/.vitepress/crates.ts) with a color
3. Add to this table and the sidebar
4. Reference in notes: `<CrateRef crate="sync" file="worker.rs" path="crates/sync/src/worker.rs" />`
