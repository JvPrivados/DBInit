<script setup lang="ts">
// Importações de icones
import RuntimeIcon from "../assets/Icons/RuntimeIcon.vue";
import DataBaseIcon from "../assets/Icons/DataBaseIcon.vue";

// Importações gerais
import { ref } from "vue";

const emit = defineEmits(['update:tab']);

const activeTab = ref('runtime');

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  emit('update:tab', tab);
};
</script>

<template>
  <div class="app-sidebar">
    <button
      class="sidebar-btn"
      :class="{ active: activeTab === 'runtime' }"
      @click="setActiveTab('runtime')">
      <RuntimeIcon />
    </button>
    
    <button
      class="sidebar-btn"
      :class="{ active: activeTab === 'database' }"
      @click="setActiveTab('database')"">
      <DataBaseIcon />
    </button>
  </div>
  <div class="sidebar-separator"></div>
</template>

<style lang="scss" scoped>
@use "sass:color";

$sidebar-background: rgb(20, 25, 30);
$generic-btn-background: rgb(23, 138, 220);

.app-sidebar {
  background-color: $sidebar-background;
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  > button {
    width: 40px;
    height: 40px;
    pointer-events: auto;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    > svg {
      fill: color.adjust(white, $lightness: -20%);
      width: 22px;
      height: 22px;
    }

    &:hover {
      background-color: color.adjust($generic-btn-background, $lightness: 0%);
    }

    &:active {
      background-color: color.adjust($generic-btn-background, $lightness: -10%);
    }
  }
}

.sidebar-separator {
  outline: none;
  border: none;
  width: 2px;
  height: 100%;
  background-color: color.adjust($sidebar-background, $lightness: -3%);
  flex-shrink: 0;
}

.sidebar-btn.active {
  background-color: color.adjust($generic-btn-background, $lightness: -8%);
  > svg { fill: white !important; }
}
</style>
