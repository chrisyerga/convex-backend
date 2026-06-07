# Ports & env

## Confirmed local ports

| Port | Purpose |
|------|---------|
| `3210` | Convex backend (daemon) |
| `3211` | HTTP actions — `config.site_proxy_port` in <CrateRef crate="local_backend" file="main.rs" path="crates/local_backend/src/main.rs" /> |
| `6790` | Local dashboard app |

## Mythological (hosted / harness)

Sniffed from <CrateRef crate="backend_harness" file="lib.rs" path="crates/backend_harness/src/lib.rs" /> — not confirmed for local dev:

| Port | Guess |
|------|-------|
| `8001` | RPC port for backend functions |
| `8002` | Something called Usher? |
| `8050` | "Big brain" backends |
| `8000` / `7999` | Backend/RPC ports for hosted maybe? |

## Key config URLs

From <CrateRef crate="local_backend" file="config.rs" path="crates/local_backend/src/config.rs" />:

- **convex_origin** — convex server (`localhost:3210` or `brave-nipples.xxx.etc`)
- **convex_site** — HTTP actions site URL (AHA: site url is for actions)

## Local storage paths

- DB: `convex_local_data.sqlite3` (presumably)
- Files: `convex_local_storage/files`, `/modules`, `/search`, etc.
