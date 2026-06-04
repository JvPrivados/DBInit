<script setup lang="ts">
import { onMounted } from "vue";
import { useServices } from "../composables/useService";

import ServiceCard from "./ServiceCard.vue";
import TerminalLogs from "./TerminalLogs.vue";

const { services, fetchServicesStatus } = useServices();

onMounted(() => {
  fetchServicesStatus();
});
</script>

<template>
  <main class="app-main">
    <div class="bg-glow bg-glow--indigo"></div>
    <div class="bg-glow bg-glow--emerald"></div>

    <div class="content-scroll">
      <section class="service-section">
        <div class="section-header">
          <div class="section-accent-bar"></div>
          <h2 class="section-label">Languages</h2>
        </div>

        <div class="service-grid">
          <template v-for="service in services" :key="service.id">
            <ServiceCard
              v-if="service.category === 'languages'"
              :service="service"
            />
          </template>
        </div>
      </section>

      <section class="service-section">
        <div class="section-header">
          <div class="section-accent-bar"></div>
          <h2 class="section-label">Database</h2>
        </div>

        <div class="service-grid">
          <template v-for="service in services" :key="service.id">
            <ServiceCard
              v-if="service.category === 'databases'"
              :service="service"
            />
          </template>
        </div>
      </section>
    </div>

    <TerminalLogs />
  </main>
</template>

<style lang="scss" scoped>
$slate-100: #f1f5f9;
$slate-400: #94a3b8;
$indigo-400: #818cf8;
$indigo-500: #6366f1;
$indigo-600: #4f46e5;
$emerald-500: #10b981;

.app-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
  justify-content: space-between;
  background: transparent;
  color: $slate-100;
  user-select: none;
  padding: 10px;
  gap: 12px;
}
.bg-glow {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  &--indigo {
    top: -15%;
    left: -10%;
    width: 50%;
    height: 50%;
    background: rgba($indigo-500, 0.1);
    filter: blur(120px);
  }
  &--emerald {
    bottom: 20%;
    right: -10%;
    width: 40%;
    height: 40%;
    background: rgba($emerald-500, 0.05);
    filter: blur(100px);
  }
}
.content-scroll {
  flex-grow: 1;
  padding: 8px 0 4px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  min-height: 0;
  gap: 20px;
}
.service-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
}
.section-accent-bar {
  width: 6px;
  height: 16px;
  background: linear-gradient(to bottom, $indigo-400, $indigo-600);
  border-radius: 9999px;
  box-shadow: 0 0 10px rgba($indigo-500, 0.4);
}
.section-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: $slate-400;
}
.service-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
</style>
