<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { crateNotesPath, getCrateStyle } from "../../crates";

const props = defineProps<{
  /** Crate directory name, e.g. "sync" */
  crate: string;
  /** Filename shown on the pill, e.g. "worker.rs" */
  file: string;
  /** Repo-relative path for cursor:// link, e.g. "crates/sync/src/worker.rs" */
  path: string;
  line?: string | number;
}>();

const { theme } = useData();

const style = computed(() => getCrateStyle(props.crate));
const notesHref = computed(() => crateNotesPath(props.crate));
const fileHref = computed(() => {
  const root = theme.value.workspaceRoot as string;
  const fullPath = `${root}/${props.path.replace(/^\//, "")}`;
  return props.line !== undefined
    ? `cursor://file/${fullPath}:${props.line}`
    : `cursor://file/${fullPath}`;
});
</script>

<template>
  <span class="crate-ref" :title="`${crate} → ${path}${line !== undefined ? `:${line}` : ''}`">
    <a
      :href="notesHref"
      class="crate-ref__crate"
      :style="{ backgroundColor: style.color }"
    >{{ crate }}</a><!--
    --><a
      :href="fileHref"
      class="crate-ref__file"
      :style="{ borderColor: style.color, color: style.color }"
    >{{ file }}</a>
  </span>
</template>

<style scoped>
.crate-ref {
  display: inline-flex;
  align-items: stretch;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82em;
  line-height: 1.4;
  vertical-align: middle;
  margin: 0 0.12em;
  white-space: nowrap;
}

.crate-ref__crate,
.crate-ref__file {
  padding: 0.12em 0.55em;
  text-decoration: none;
  transition: filter 0.15s, background 0.15s;
}

.crate-ref__crate {
  color: #fff;
  font-weight: 600;
  border-radius: 999px 0 0 999px;
}

.crate-ref__crate:hover {
  filter: brightness(1.12);
}

.crate-ref__file {
  background: var(--vp-c-bg);
  border: 1.5px solid;
  border-left: none;
  border-radius: 0 999px 999px 0;
  font-weight: 500;
}

.crate-ref__file:hover {
  background: color-mix(in srgb, currentColor 8%, var(--vp-c-bg));
}
</style>
