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
    <!-- Styled PostgreSQL Elephant Outline -->
    <path d="M70 80c-25 0-45 20-45 45s20 45 45 45h10M186 80c25 0 45 20 45 45s-20 45-45 45h-10" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M80 170v-60c0-25 20-45 48-45s48 20 48 45v60" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M100 170c0 25 10 35 28 35s28-10 28-35" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M95 140c0 15-15 20-15 20M161 140c0 15 15 20 15 20" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="105" cy="110" r="7" fill="currentColor" />
    <circle cx="151" cy="110" r="7" fill="currentColor" />
  </svg>
</template>
