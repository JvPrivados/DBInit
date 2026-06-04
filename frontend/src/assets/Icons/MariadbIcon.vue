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
    <!-- Styled MariaDB Seal Outline -->
    <path d="M40 180c40 30 100 20 140-20 20-20 30-50 25-80-3 15-15 30-30 35" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M210 50c-10 10-15 30-10 45" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M110 165c-20 25-50 35-70 35" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M140 160c15 15 30 40 40 50" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="195" cy="80" r="18" stroke="currentColor" stroke-width="14" />
    <path d="M195 85c5 5 15 5 20 0" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
    <path d="M180 82c-5 0-10 2-12 5" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
  </svg>
</template>
