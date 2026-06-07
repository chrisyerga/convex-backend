import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = resolve(__dirname, "../..");
const lbbbRoot = resolve(workspaceRoot, "../../lindale/lbbb");

export default withMermaid(
  defineConfig({
    title: "Convex Backend Exploration",
    description: "Personal notes from stepping through the convex-backend codebase",
    ignoreDeadLinks: [/^http:\/\/localhost/],
    vite: {
      server: {
        port: 5173,
      },
      optimizeDeps: {
        include: ["mermaid"],
      },
      ssr: {
        noExternal: ["mermaid"],
      },
    },
    themeConfig: {
      workspaceRoot,
      lbbbRoot,
      search: {
        provider: "local",
      },
    nav: [
      { text: "Home", link: "/" },
      { text: "Today", link: "/today/" },
      { text: "Crates", link: "/crates/" },
      { text: "Goals", link: "/goals/v8-inspector" },
    ],
      sidebar: [
        {
          text: "Today — lbbb trace",
          items: [
            { text: "Overview", link: "/today/" },
            { text: "pets.listMine", link: "/today/list-mine" },
          ],
        },
        {
          text: "Crates",
          items: [
            { text: "sync", link: "/crates/sync" },
            { text: "application", link: "/crates/application" },
            { text: "isolate", link: "/crates/isolate" },
            { text: "function_runner", link: "/crates/function_runner" },
            { text: "local_backend", link: "/crates/local_backend" },
            { text: "keybroker", link: "/crates/keybroker" },
            { text: "search", link: "/crates/search" },
            { text: "backend_harness", link: "/crates/backend_harness" },
            { text: "howto", link: "/crates/" },
          ],
        },
        {
          text: "Getting started",
          items: [
            { text: "Overview", link: "/" },
            { text: "Build & run", link: "/dev/build-and-run" },
            { text: "Ports & env", link: "/dev/ports-and-env" },
            { text: "Debugger quirks", link: "/dev/debugger-quirks" },
          ],
        },
        {
          text: "Startup",
          items: [
            { text: "Entrypoint", link: "/startup/entrypoint" },
            { text: "make_app()", link: "/startup/make-app" },
            { text: "Config", link: "/startup/config" },
          ],
        },
        {
          text: "Execution",
          items: [
            { text: "Function runner", link: "/execution/function-runner" },
            { text: "Isolate client", link: "/execution/isolate-client" },
            { text: "Actions vs runner", link: "/execution/actions-vs-runner" },
          ],
        },
        {
          text: "Flows",
          items: [
            { text: "Query entry", link: "/flows/query-entry" },
            { text: "UDF execution", link: "/flows/udf-execution" },
          ],
        },
        {
          text: "Goals",
          items: [{ text: "V8 inspector", link: "/goals/v8-inspector" }],
        },
      ],
    },
  }),
);
