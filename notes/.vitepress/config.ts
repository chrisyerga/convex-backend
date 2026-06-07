import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = resolve(__dirname, "../..");

export default defineConfig({
  title: "Convex Backend Exploration",
  description: "Personal notes from stepping through the convex-backend codebase",
  ignoreDeadLinks: [/^http:\/\/localhost/],
  markdown: {
    mermaid: true,
  },
  vite: {
    server: {
      port: 5173,
    },
  },
  themeConfig: {
    workspaceRoot,
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Goals", link: "/goals/v8-inspector" },
    ],
    sidebar: [
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
});
