<script setup lang="ts">
import { onMounted } from "vue";
import { useServices } from "../composables/useService.ts";
import type { Service } from "../composables/types.ts";

import PhpIcon from "../assets/Icons/PhpIcon.vue";
import PostgresqlIcon from "../assets/Icons/PostgresqlIcon.vue";
import MariadbIcon from "../assets/Icons/MariadbIcon.vue";

const {
  services,
  logs,
  isLogsExpanded,
  terminalContainer,
  toggleService,
  openConfig,
  clearLogs,
  toggleLogsPanel,
  fetchServicesStatus,
} = useServices();

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
            <div
              v-if="service.category === 'languages'"
              class="service-card"
              :class="{ running: service.status === 'running' }"
            >
              <div class="service-info">
                <div
                  class="icon-wrapper"
                  :class="{ running: service.status === 'running' }"
                >
                  <PhpIcon v-if="service.id === 'php'" class="service-icon" />
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
                        service.status === "running"
                          ? `PID: ${service.pid}`
                          : "Offline"
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

                <button
                  @click="openConfig(service)"
                  title="Configurar"
                  class="config-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="config-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>

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
        </div>
      </section>

      <section class="service-section">
        <div class="section-header">
          <div class="section-accent-bar"></div>
          <h2 class="section-label">Database</h2>
        </div>

        <div class="service-grid">
          <template v-for="service in services" :key="service.id">
            <div
              v-if="service.category === 'databases'"
              class="service-card"
              :class="{ running: service.status === 'running' }"
            >
              <div class="service-info">
                <div
                  class="icon-wrapper"
                  :class="{ running: service.status === 'running' }"
                >
                  <PostgresqlIcon
                    v-if="service.id === 'postgresql'"
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
                        service.status === "running"
                          ? `PID: ${service.pid}`
                          : "Offline"
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

                <button
                  @click="openConfig(service)"
                  title="Configurar"
                  class="config-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="config-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>

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
        </div>
      </section>
    </div>

    <div class="logs-panel" :class="{ expanded: isLogsExpanded }">
      <div class="logs-header" @click="toggleLogsPanel">
        <div class="logs-header-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="terminal-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="logs-title">Activity Logs</span>
        </div>
        <div class="logs-header-right">
          <button @click.stop="clearLogs" class="clear-btn">CLEAR</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="chevron-icon"
            :class="{ rotated: isLogsExpanded }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div
        v-show="isLogsExpanded"
        ref="terminalContainer"
        class="terminal-body"
      >
        <div v-if="logs.length === 0" class="terminal-empty">
          No logs available.
        </div>
        <div v-for="(log, idx) in logs" :key="idx" class="log-entry">
          <span class="log-timestamp">[{{ log.timestamp }}]</span>
          <span
            class="log-service"
            :class="{
              'log-service--indigo':
                log.type === 'info' && log.service !== 'System',
              'log-service--system': log.service === 'System',
              'log-service--success': log.type === 'success',
              'log-service--error': log.type === 'error',
            }"
            >[{{ log.service }}]</span
          >
          <span
            class="log-message"
            :class="{
              'log-message--info': log.type === 'info',
              'log-message--success': log.type === 'success',
              'log-message--error': log.type === 'error',
            }"
            >{{ log.message }}</span
          >
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
// ─── Color Variables ───────────────────────────────────────────────
$slate-100: #f1f5f9;
$slate-200: #e2e8f0;
$slate-300: #cbd5e1;
$slate-400: #94a3b8;
$slate-500: #64748b;
$slate-600: #475569;
$slate-700: #334155;
$slate-800: #1e293b;
$slate-900: #0f172a;

$indigo-400: #818cf8;
$indigo-500: #6366f1;
$indigo-600: #4f46e5;

$emerald-300: #6ee7b7;
$emerald-400: #34d399;
$emerald-500: #10b981;

$rose-300: #fda4af;
$rose-400: #fb7185;
$rose-500: #f43f5e;
$rose-600: #e11d48;

// ─── Keyframes ─────────────────────────────────────────────────────
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

// ─── Main Container ────────────────────────────────────────────────
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

// ─── Background Glows ──────────────────────────────────────────────
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

// ─── Scrollable Content ────────────────────────────────────────────
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

// ─── Service Section ───────────────────────────────────────────────
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

// ─── Service Grid ──────────────────────────────────────────────────
.service-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

// ─── Service Card ──────────────────────────────────────────────────
.service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba($slate-800, 0.3);
  border: 1px solid rgba($slate-700, 0.5);
  backdrop-filter: blur(24px);
  border-radius: 16px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  height: 60px;

  &:hover {
    background: rgba($slate-800, 0.5);
    transform: translateY(-2px);
    border-color: rgba($slate-600, 0.8);
  }

  &.running {
    border-color: rgba($emerald-500, 0.3);
    box-shadow: 0 0 20px rgba($emerald-500, 0.15);

    &:hover {
      border-color: rgba($emerald-500, 0.3);
    }

    .icon-wrapper:not(.running) {
    }
  }
}

// ─── Service Info (left side) ──────────────────────────────────────
.service-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  border-radius: 12px;
  border: 1px solid rgba($slate-600, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba($slate-700, 0.4);
  color: $slate-400;

  .service-card:hover & {
    color: $slate-200;
  }

  &.running {
    background: rgba($emerald-500, 0.15);
    border-color: rgba($emerald-500, 0.3);
    color: $emerald-400;
    box-shadow: 0 0 12px rgba($emerald-500, 0.25);

    .service-card:hover & {
      color: $emerald-400;
    }
  }
}

.service-icon {
  width: 35px;
  height: 35px;
  position: relative;
  z-index: 10;
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

// ─── Status Indicator ──────────────────────────────────────────────
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
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
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

// ─── Controls (right side) ─────────────────────────────────────────
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
  transition: border-color 0.2s ease;
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
  transition: all 0.2s ease;
  color: $slate-200;

  &::placeholder {
    color: $slate-600;
  }

  &:focus {
    color: #ffffff;
    transform: scale(1.05);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: $slate-500;
  }

  // Hide number spinners
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
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;

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

// ─── Toggle (Start/Stop) Button ────────────────────────────────────
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
  user-select: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border: none;
  background: transparent;

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

// ─── Logs Panel ────────────────────────────────────────────────────
.logs-panel {
  background: rgba($slate-900, 0.9);
  backdrop-filter: blur(40px);
  border: 1px solid rgba($slate-700, 0.5);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: all 0.5s ease;
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 20;
  height: 48px;

  &.expanded {
    height: 208px;
  }
}

.logs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: rgba($slate-800, 0.4);
  border-bottom: 1px solid rgba($slate-700, 0.5);
  font-size: 12px;
  font-family: monospace;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $slate-400;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba($slate-800, 0.6);
  }
}

.logs-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.terminal-icon {
  width: 18px;
  height: 18px;
  color: $indigo-400;
}

.logs-title {
  font-weight: 700;
  color: $slate-300;
  letter-spacing: 0.15em;
  font-size: 12px;
}

.logs-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.clear-btn {
  font-size: 10px;
  color: $slate-300;
  font-weight: 700;
  background: rgba($slate-700, 0.5);
  padding: 6px 14px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid rgba($slate-600, 0.5);

  &:hover {
    color: #ffffff;
    background: $slate-600;
  }
}

.chevron-icon {
  width: 18px;
  height: 18px;
  color: $slate-400;
  transition: transform 0.3s ease;

  &.rotated {
    transform: rotate(180deg);
  }
}

// ─── Terminal Body ─────────────────────────────────────────────────
.terminal-body {
  flex-grow: 1;
  padding: 16px 20px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: $slate-300;
  user-select: text;
  background: rgba(#070a11, 0.5);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

.terminal-empty {
  color: $slate-600;
  font-style: italic;
  user-select: none;
}

.log-entry {
  line-height: 1.625;
  white-space: pre-wrap;
  display: flex;
}

.log-timestamp {
  color: rgba($slate-500, 0.8);
  user-select: none;
  margin-right: 8px;
}

.log-service {
  font-weight: 700;
  user-select: none;
  margin-right: 8px;

  &--indigo {
    color: $indigo-400;
  }

  &--system {
    color: $slate-400;
  }

  &--success {
    color: $emerald-400;
  }

  &--error {
    color: $rose-400;
  }
}

.log-message {
  &--info {
    color: $slate-300;
  }

  &--success {
    color: $emerald-300;
  }

  &--error {
    color: $rose-300;
  }
}
</style>
