<script setup lang="ts">
// Importações de icones
import CloseWindowIcon from "../assets/Icons/CloseWindowIcon.vue";
import MinimizeWindowIcon from "../assets/Icons/MinimizeWindowIcon.vue";
import AddIcon from "../assets/Icons/AddIcon.vue";

// Importações do tauri
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

const minimizeWindow = () => appWindow.minimize();
const closeWindow = () => appWindow.close();
</script>

<template>
  <header class="app-titlebar">
    <div class="header-content" data-tauri-drag-region>
      <nav class="content-area">
        <button class="add-db-btn">
          <AddIcon />
        </button>
      </nav>
      <nav class="control-window">
        <button class="minimize-btn" @click="minimizeWindow">
          <MinimizeWindowIcon />
        </button>

        <button class="close-btn" @click="closeWindow">
          <CloseWindowIcon />
        </button>
      </nav>
    </div>
  </header>
  <div class="titlebar-separator"></div>
</template>

<style lang="scss" scoped>
@use "sass:color";

$header-background: rgb(20, 25, 30);
$close-btn-background: rgb(243, 32, 32);
$generic-btn-background: rgb(23, 138, 220);

.app-titlebar {
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  background-color: $header-background;

  > .header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    > .content-area {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
      pointer-events: none;
      height: 100%;

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
      }

      .add-db-btn {
        > svg {
          fill: color.adjust(white, $lightness: -20%);
          width: 16px;
          height: 16px;
        }

        &:hover {
          background-color: $generic-btn-background;
        }

        &:active {
          background-color: color.adjust(
            $generic-btn-background,
            $lightness: -10%
          );
        }

        &:hover,
        &:active {
          > svg {
            fill: white;
          }
        }
      }
    }

    > .control-window {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
      pointer-events: none;
      height: 100%;

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
      }

      > .minimize-btn {
        > svg {
          fill: color.adjust(white, $lightness: -20%);
          width: 16px;
          height: 18px;
        }

        &:hover {
          background-color: $generic-btn-background;
        }

        &:active {
          background-color: color.adjust(
            $generic-btn-background,
            $lightness: -10%
          );
        }

        &:hover,
        &:active {
          > svg {
            fill: color.adjust(white, $lightness: -20%);
          }
        }
      }

      > .close-btn {
        > svg {
          fill: color.adjust(white, $lightness: -20%);
          width: 14px;
          height: 14px;
        }

        &:hover {
          background-color: $close-btn-background;
        }

        &:active {
          background-color: color.adjust(
            $close-btn-background,
            $lightness: -10%
          );
        }

        &:hover,
        &:active {
          > svg {
            fill: color.adjust(white, $lightness: -20%);
          }
        }
      }
    }
  }
}

.titlebar-separator {
  outline: none;
  border: none;
  width: 100%;
  height: 2px;
  background-color: color.adjust($header-background, $lightness: -3%);
}
</style>
