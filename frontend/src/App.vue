<script setup lang="ts">
import Titlebar from "./components/Titlebar.vue";
import AppContainer from "./components/AppContainer.vue";

document.addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();
  },
  false,
);
</script>

<template>
  <Titlebar />
  <AppContainer />
</template>
