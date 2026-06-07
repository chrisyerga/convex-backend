# Build & run

There seem to be many ways to build the backend:

## Backend

1. `just run-local-backend` is the default way to get stuff going
   - Wrapper around `cargo run` that passes args to set up a dev backend called _carnitas_ with hard-coded keys in <CrateRef crate="keybroker" file="instance_name.txt" path="crates/keybroker/dev/instance_name.txt" />
2. `cargo build` works for just the build step
3. [Rush](https://rushjs.io) is the monorepo JS build tool — invoke with `just rush`

Reset local state:

```bash
just reset-local-backend
```

This removes `convex_local_storage/` and `convex_local_backend.sqlite3`.

## Dashboard

Point a locally-developed dashboard at a deployment:

```bash
just run-dashboard "YOUR_DEPLOYMENT_URL"
```

Options:

- Point at a real Convex cloud deployment
- Point at local backend: `just run-dashboard http://localhost:3210/`

Launch dashboard: [http://localhost:6790](http://localhost:6790)

## Convex CLI against local backend

```bash
just convex dev
```

Uses the default local admin key and `http://127.0.0.1:3210`.

## Common Rush commands

- `just rush build` — build all projects in npm-packages
- `just rush rebuild` — force rebuild when rush doesn't detect changes
- `just rush install` — install JS deps after repo changes
- `just rush update` — update JS deps
