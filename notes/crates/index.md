# Crates

Notes organized by Rust crate. Click a crate pill's **left half** in any page to jump here.

| Crate | Focus |
|-------|-------|
| <CrateRef crate="sync" file="worker.rs" path="crates/sync/src/worker.rs" line="1" /> | WebSocket sync protocol, subscription query refresh |
| <CrateRef crate="application" file="lib.rs" path="crates/application/src/lib.rs" line="1" />  | `Application` type, `execute_public_query` |
| <CrateRef crate="isolate" file="client.rs" path="crates/isolate/src/client.rs" line="1" /> | V8 sandbox, `execute_udf`, workers |
| <CrateRef crate="local_backend" file="main.rs" path="crates/local_backend/src/main.rs" line="1" /> | Dev server binary, HTTP routes |
| <CrateRef crate="function_runner" file="lib.rs" path="crates/function_runner/src/lib.rs" line="1" /> | `InProcessFunctionRunner` |

## Adding a crate

1. Create `notes/crates/{name}.md`
2. Add an entry to [`crateRegistry`](/.vitepress/crates.ts) with a color
3. Add to this table and the sidebar
4. Reference in notes: `<CrateRef crate="sync" file="worker.rs" path="crates/sync/src/worker.rs" />`
