# Config

Inside <CrateRef crate="local_backend" file="config.rs" path="crates/local_backend/src/config.rs" /> — lots of interesting stuff.

## Config interface

Has db driver, deployment URL, etc.

| Setting | Notes |
|---------|-------|
| `db_spec` / driver | Defaults to SQLite3 |
| interface/port | Port to bind to |
| port 3210 | "daemon" |
| port 3211 | "Convex HTTP Actions" |
| `convex_origin` | Convex server (`localhost:3210` or cloud deployment URL) |
| `convex_site` | HTTP actions — site URL is for actions |
| `instance_name` / `instance_secret` | From keybroker dev files |
| `local_storage` | Dir for local storage (`convex_local_storage`) |
| `s3_storage` | Bool to use S3 instead |
| `do_not_require_ssl` | For DB connections |
| beacon stuff | Telemetry? |
| `local_log_sink` | FS logs / datadog |

## Dev keys location

Hard-coded dev keys for local backend: <CrateRef crate="keybroker" file="admin_key.txt" path="crates/keybroker/dev/admin_key.txt" />

Used by `just run-local-backend` via `instance_name.txt` and `secret.txt`.

## Related

- [Ports & env](/dev/ports-and-env)
- [make_app()](/startup/make-app)
