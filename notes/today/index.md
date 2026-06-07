# Today: tracing lbbb through the backend

**Date:** Jun 7, 2026  
**App repo:** <CodeLink repo="lbbb" file="package.json">lbbb</CodeLink> at `~/dev/lindale/lbbb`  
**Backend repo:** this repo (`convex-backend`)

## Goal

Pick a real query from the lbbb app and trace it end-to-end: React client → Convex sync protocol → Rust backend → V8 isolate → back to the browser.

Start simple. First target: **the signed-in user's pet list**.

## First trace: `pets.listMine`

| Layer | Where |
|-------|-------|
| UI | <CodeLink repo="lbbb" file="src/routes/app/pets/index.tsx" line="14">`/app/pets/` page</CodeLink> |
| Convex query | <CodeLink repo="lbbb" file="convex/pets.ts" line="65">`pets.listMine`</CodeLink> |
| Backend entry | <CodeLink file="crates/application/src/api.rs" line="98">`execute_public_query`</CodeLink> |
| UDF runner | <CodeLink file="crates/isolate/src/client.rs" line="631">`execute_udf`</CodeLink> |

See [pets.listMine trace](/today/list-mine) for the full walkthrough.

## Trace checklist

- [x] Find the client call site (`useQuery(api.pets.listMine)`)
- [x] Read the query handler in lbbb
- [ ] Set breakpoint at `execute_public_query` and confirm UDF path is `pets:listMine`
- [ ] Step through `execute_udf` with this query loaded
- [ ] Watch what DB reads happen inside the isolate (index scan on `by_owner`)

## Related backend notes

- [Query entry](/flows/query-entry) — how queries enter the backend
- [UDF execution](/flows/udf-execution) — async path after startup
- [Debugger quirks](/dev/debugger-quirks) — cleanup when async breakpoints go wrong
