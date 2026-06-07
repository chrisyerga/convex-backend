# local_backend

Local dev server binary — `convex-local-backend` on port 3210.

See [startup notes](/startup/entrypoint) for the `main()` walkthrough.

## Key files

| File | Role |
|------|------|
| `main.rs` | Entrypoint |
| `lib.rs` | `run_server`, `make_app` |
| `public_api.rs` | HTTP query/mutation endpoints |

## Related

- [Config](/startup/config)
- [Query entry](/flows/query-entry)
