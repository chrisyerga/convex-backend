# sync

Client/server sync protocol — handles WebSocket connections from Convex clients, subscriptions, and query refresh.

## Key files

| File | Role |
|------|------|
| <CrateRef crate="sync" file="worker.rs" path="crates/sync/src/worker.rs" /> | Sync worker — runs subscribed queries, calls into Application |

## Notes

### `run_update_queries()` {#run-update-queries}

<CrateRef crate="sync" file="worker.rs" path="crates/sync/src/worker.rs" line="999" /> — gets a subscription refresh request and calls `execute_public_query` on the Application API.

Sync crate seems to handle a lot of the client/server interface.

## Related

- [application](/crates/application)
- [pets.listMine trace](/today/list-mine)
- [Query entry](/flows/query-entry)
