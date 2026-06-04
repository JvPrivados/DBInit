<script setup lang="ts">
import type { Service } from "../composables/types";
import { useServices } from "../composables/useService";

import PhpIcon from "../assets/Icons/PhpIcon.vue";
import PostgresqlIcon from "../assets/Icons/PostgresqlIcon.vue";
import MariadbIcon from "../assets/Icons/MariadbIcon.vue";

// Define a prop que o componente precisa receber
defineProps<{
  service: Service;
}>();

// Extrai apenas as funções necessárias para o card operar
const { toggleService } = useServices();
</script>

<template>
  <div class="service-card" :class="{ running: service.status === 'running' }">
    <div class="service-info">
      <div
        class="icon-wrapper"
        :class="{ running: service.status === 'running' }"
      >
        <PhpIcon v-if="service.id === 'php'" class="service-icon" />
        <PostgresqlIcon
          v-else-if="service.id === 'postgresql'"
          class="service-icon"
        />
        <MariadbIcon
          v-else-if="service.id === 'mariadb'"
          class="service-icon"
        />
      </div>

      <div class="service-details">
        <h3 class="service-name">{{ service.name }}</h3>

        <div class="status-row">
          <span class="status-dot-wrapper">
            <span
              v-if="service.status === 'running'"
              class="status-ping"
            ></span>
            <span
              class="status-dot"
              :class="{ running: service.status === 'running' }"
            ></span>
          </span>
          <span
            class="status-text"
            :class="{ running: service.status === 'running' }"
          >
            {{
              service.status === "running" ? `PID: ${service.pid}` : "Offline"
            }}
          </span>
        </div>
      </div>
    </div>

    <div class="service-controls">
      <div class="port-group">
        <label class="port-label">Port</label>
        <input
          type="number"
          v-model.number="service.port"
          :disabled="service.status === 'running'"
          min="1"
          max="65535"
          class="port-input"
          :class="{ disabled: service.status === 'running' }"
        />
      </div>

      <button @click="toggleService(service)" class="toggle-btn">
        <div
          class="toggle-btn-bg"
          :class="{ running: service.status === 'running' }"
        ></div>
        <span
          class="toggle-btn-content"
          :class="{ running: service.status === 'running' }"
        >
          <span v-if="service.status === 'running'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="btn-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="btn-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {{ service.status === "running" ? "Stop" : "Start" }}
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$slate-100: #f1f5f9;
$slate-200: #e2e8f0;
$slate-400: #94a3b8;
$slate-500: #64748b;
$slate-600: #475569;
$slate-700: #334155;
$slate-850: rgba(#1e293b, 0.3);
$slate-900: #0f172a;
$indigo-500: #6366f1;
$indigo-600: #4f46e5;
$emerald-400: #34d399;
$emerald-500: #10b981;
$rose-400: #fb7185;
$rose-500: #f43f5e;

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $slate-850;
  border: 1px solid rgba($slate-700, 0.5);
  backdrop-filter: blur(24px);
  border-radius: 16px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  height: 60px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba($slate-700, 0.3);
    transform: translateY(-2px);
    border-color: rgba($slate-600, 0.8);
  }
  &.running {
    border-color: rgba($emerald-500, 0.3);
    box-shadow: 0 0 20px rgba($emerald-500, 0.15);
  }
}
.service-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.icon-wrapper {
  border-radius: 12px;
  border: 1px solid rgba($slate-600, 0.5);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba($slate-700, 0.4);
  color: $slate-400;
  width: 35px;
  height: 35px;
  .service-card:hover & {
    color: $slate-200;
  }
  &.running {
    background: rgba($emerald-500, 0.15);
    border-color: rgba($emerald-500, 0.3);
    color: $emerald-400;
    box-shadow: 0 0 12px rgba($emerald-500, 0.25);
  }
}
.service-icon {
  width: 35px;
  height: 35px;
}
.service-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.service-name {
  font-weight: 700;
  font-size: 15px;
  color: $slate-100;
  letter-spacing: 0.025em;
}
.status-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.status-dot-wrapper {
  display: flex;
  height: 10px;
  width: 10px;
  position: relative;
}
.status-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  position: absolute;
  display: inline-flex;
  height: 100%;
  width: 100%;
  border-radius: 9999px;
  background: $emerald-400;
  opacity: 0.75;
}
.status-dot {
  position: relative;
  display: inline-flex;
  border-radius: 9999px;
  height: 10px;
  width: 10px;
  background: $slate-600;
  &.running {
    background: $emerald-500;
    box-shadow: 0 0 6px rgba($emerald-500, 0.9);
  }
}
.status-text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $slate-500;
  &.running {
    color: $emerald-400;
  }
}
.service-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}
.port-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba($slate-900, 0.6);
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba($slate-700, 0.5);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  .service-card:hover & {
    border-color: rgba($slate-600, 0.6);
  }
}
.port-label {
  font-size: 10px;
  color: $slate-500;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.port-input {
  width: 80px;
  text-align: center;
  font-family: monospace;
  font-size: 14px;
  background: transparent;
  border: none;
  outline: none;
  color: $slate-200;
  &:focus {
    color: #ffffff;
    transform: scale(1.05);
  }
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: $slate-500;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
}
.config-btn {
  padding: 10px;
  color: $slate-400;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  &:hover {
    color: $slate-100;
    background: rgba($slate-700, 0.5);
    border-color: rgba($slate-600, 0.5);
  }
  &:active {
    transform: scale(0.95);
  }
}
.config-icon {
  width: 18px;
  height: 18px;
}
.toggle-btn {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
  border: none;
  background: transparent;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  &:active {
    transform: scale(0.95);
  }
}
.toggle-btn-bg {
  position: absolute;
  inset: 0;
  transition: all 0.3s ease;
  background: rgba($indigo-600, 0.9);
  box-shadow: 0 0 15px rgba($indigo-600, 0.4);
  .toggle-btn:hover & {
    background: $indigo-500;
  }
  &.running {
    background: rgba($rose-500, 0.15);
    box-shadow: none;
    .toggle-btn:hover & {
      background: rgba($rose-500, 0.25);
    }
  }
}
.toggle-btn-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  &.running {
    color: $rose-400;
  }
}
.btn-icon {
  width: 16px;
  height: 16px;
}
</style>
