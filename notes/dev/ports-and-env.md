# Ports & env

## Confirmed local ports

| Port | Purpose |
|------|---------|
| `3210` | Convex backend (daemon) |
| `3211` | HTTP actions — `config.site_proxy_port` in <CodeLink file="crates/local_backend/src/main.rs">main.rs</CodeLink> |
| `6790` | Local dashboard app |

## Mythological (hosted / harness)

Sniffed from <CodeLink file="crates/backend_harness">crates/backend_harness</CodeLink> — not confirmed for local dev:

| Port | Guess |
|------|-------|
| `8001` | RPC port for backend functions |
| `8002` | Something called Usher? |
| `8050` | "Big brain" backends |
| `8000` / `7999` | Backend/RPC ports for hosted maybe? |

## Key config URLs

From <CodeLink file="crates/local_backend/src/config.rs">config.rs</CodeLink>:

- **convex_origin** — convex server (`localhost:3210` or `brave-nipples.xxx.etc`)
- **convex_site** — HTTP actions site URL (AHA: site url is for actions)

## Local storage paths

- DB: `convex_local_data.sqlite3` (presumably)
- Files: `convex_local_storage/files`, `/modules`, `/search`, etc.
