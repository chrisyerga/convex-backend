<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const props = defineProps<{
  file: string;
  line?: string | number;
}>();

const { theme } = useData();

const href = computed(() => {
  const root = theme.value.workspaceRoot as string;
  const path = `${root}/${props.file.replace(/^\//, "")}`;
  return props.line !== undefined
    ? `cursor://file/${path}:${props.line}`
    : `cursor://file/${path}`;
});
</script>

<template>
  <a :href="href" class="code-link" :title="`Open ${file}${line !== undefined ? `:${line}` : ''} in editor`">
    <slot />
  </a>
</template>

<style scoped>
.code-link {
  font-family: var(--vp-font-family-mono);
  font-size: 0.92em;
  border-bottom: 1px dashed var(--vp-c-brand-1);
}
</style>
