<script setup lang="ts">
import { ref, computed } from "vue";
import Sidebar from "./Sidebar.vue";
import DatabaseArea from "./DatabaseArea.vue";
import RuntimeArea from "./RuntimeArea.vue";

// Estado da aba atual
const currentTab = ref("runtime");

// Função para atualizar a aba vinda do emit da Sidebar
const handleTabChange = (tab: string) => {
  currentTab.value = tab;
};

// Mapeamento de IDs para componentes
const tabs = {
  runtime: RuntimeArea,
  database: DatabaseArea,
};

const activeComponent = computed(() => {
  return tabs[currentTab.value as keyof typeof tabs];
});
</script>

<template>
  <main class="app-container">
    <Sidebar @update:tab="handleTabChange" />
    <KeepAlive>
      <component :is="activeComponent" />
    </KeepAlive>
  </main>
</template>

<style lang="scss" scoped>
@use "sass:color";

$main-background: rgb(30, 35, 40);

.app-container {
  width: 100%;
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  background-color: $main-background;
}
</style>
