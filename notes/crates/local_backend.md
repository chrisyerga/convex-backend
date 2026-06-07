# local_backend

Local dev server binary — `convex-local-backend` on port 3210.

See [startup notes](/startup/entrypoint) for the `main()` walkthrough.

## Key files

| File | Role |
|------|------|
| <CrateRef crate="local_backend" file="main.rs" path="crates/local_backend/src/main.rs" /> | Entrypoint |
| <CrateRef crate="local_backend" file="lib.rs" path="crates/local_backend/src/lib.rs" /> | `run_server`, `make_app` |
| <CrateRef crate="local_backend" file="config.rs" path="crates/local_backend/src/config.rs" /> | Local dev configuration |
| <CrateRef crate="local_backend" file="public_api.rs" path="crates/local_backend/src/public_api.rs" /> | HTTP query/mutation endpoints |

## Related

- [Config](/startup/config)
- [Query entry](/flows/query-entry)
