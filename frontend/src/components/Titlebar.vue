<script setup lang="ts">
// Importações de icones
import CloseWindowIcon from "../assets/Icons/CloseWindowIcon.vue";
import MinimizeWindowIcon from "../assets/Icons/MinimizeWindowIcon.vue";
import DataBaseIcon from "../assets/Icons/DataBaseIcon.vue";

// Importações do tauri
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

const minimizeWindow = () => appWindow.minimize();
const closeWindow = () => appWindow.close();
</script>

<template>
  <header
    class="titlebar"
    data-tauri-drag-region
  >
    <!-- App Brand -->
    <div class="titlebar-brand" data-tauri-drag-region>
      <div class="titlebar-brand__icon-wrapper">
        <DataBaseIcon class="titlebar-brand__icon" />
      </div>
      <span class="titlebar-brand__name">DBInit</span>
      <span class="titlebar-brand__version">v1.0.0</span>
    </div>

    <!-- Window Controls -->
    <nav class="window-controls">
      <button
        class="window-controls__btn window-controls__btn--minimize"
        @click="minimizeWindow"
        title="Minimizar"
      >
        <MinimizeWindowIcon class="window-controls__icon" />
      </button>

      <button
        class="window-controls__btn window-controls__btn--close"
        @click="closeWindow"
        title="Fechar"
      >
        <CloseWindowIcon class="window-controls__icon" />
      </button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
$slate-100: #f1f5f9;
$slate-300: #cbd5e1;
$slate-400: #94a3b8;
$slate-600: #475569;
$slate-700: #334155;
$slate-800: #1e293b;
$slate-900: #0f172a;
$indigo-400: #818cf8;
$indigo-500: #6366f1;
$rose-500: #f43f5e;
$rose-600: #e11d48;

.titlebar {
  width: 100%;
  height: 3rem; // h-12
  flex-shrink: 0;
  background-color: rgba($slate-900, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 0.75rem; // pr-3
  user-select: none;
  border-bottom: 1px solid rgba($slate-700, 0.5);
  backdrop-filter: blur(12px);
  position: relative;
  z-index: 50;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.titlebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem; // gap-3
  pointer-events: none;

  &__icon-wrapper {
    padding: 0.375rem; // p-1.5
    background-color: rgba($indigo-500, 0.15);
    border-radius: 0.5rem; // rounded-lg
    border: 1px solid rgba($indigo-400, 0.2);
    box-shadow: 0 0 12px rgba($indigo-500, 0.15);
  }

  &__icon {
    width: 18px;
    height: 18px;
    color: $indigo-400;
    fill: currentColor;
  }

  &__name {
    font-size: 0.875rem; // text-sm
    line-height: 1.25rem;
    font-weight: 600; // font-semibold
    letter-spacing: 0.025em; // tracking-wide
    color: $slate-100;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
  }

  &__version {
    font-size: 9px;
    font-weight: 700; // font-bold
    text-transform: uppercase;
    letter-spacing: 0.05em; // tracking-wider
    background-color: rgba($slate-800, 0.8);
    border: 1px solid rgba($slate-600, 0.5);
    color: $slate-300;
    padding: 0.125rem 0.375rem; // py-0.5 px-1.5
    border-radius: 0.25rem; // rounded
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
}

.window-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 0.375rem; // gap-1.5
  padding: 0.375rem 0; // py-1.5

  &__btn {
    width: 2.5rem; // w-10
    height: 100%;
    border-radius: 0.375rem; // rounded-md
    display: flex;
    align-items: center;
    justify-content: center;
    color: $slate-400;
    transition: all 0.2s ease;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;

    &--minimize {
      &:hover {
        color: $slate-100;
        background-color: rgba($slate-700, 0.5);
      }

      &:active {
        background-color: rgba($slate-700, 0.8);
      }
    }

    &--close {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

      &:hover {
        color: #ffffff;
        background-color: rgba($rose-500, 0.9);
        box-shadow: 0 0 12px rgba($rose-500, 0.4);
      }

      &:active {
        background-color: $rose-600;
      }
    }
  }

  &__icon {
    width: 0.875rem; // w-3.5
    height: 0.875rem; // h-3.5
    fill: currentColor;
  }
}
</style>
