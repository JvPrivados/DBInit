<script setup lang="ts">
defineProps({
  width: { type: [String, Number], default: 24 },
  height: { type: [String, Number], default: 24 },
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Modern PHP Monogram Outline -->
    <ellipse cx="128" cy="128" rx="110" ry="65" stroke="currentColor" stroke-width="14" />
    <path d="M75 105h20c12 0 20 6 20 18s-8 18-20 18H75v20" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M75 105v36" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M125 105v56M155 105v56M125 133h30" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M180 105h20c12 0 20 6 20 18s-8 18-20 18h-20v20" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M180 105v36" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
