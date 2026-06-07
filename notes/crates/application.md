# application

Core `Application` type — dispatches queries, mutations, and actions to the function runner.

## Key files

| File | Role |
|------|------|
| `api.rs` | `execute_public_query` and related API methods |
| `lib.rs` | Main Application implementation |

## Notes

### `execute_public_query()` {#execute-public-query}

<CrateRef crate="application" file="api.rs" path="crates/application/src/api.rs" line="98" /> — main entry point for public queries. Used by sync worker and HTTP API.

Receives `ExportPath` (e.g. `pets:listMine`), identity, args, timestamp. Dispatches to function_runner.

## Related

- [sync](/crates/sync)
- [function_runner](/crates/function_runner)
- [Query entry](/flows/query-entry)
