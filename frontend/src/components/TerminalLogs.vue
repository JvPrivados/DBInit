<script setup lang="ts">
import { useServices } from "../composables/useService";

// Resgata o estado global de logs do Composable
const { logs, isLogsExpanded, terminalContainer, clearLogs, toggleLogsPanel } =
  useServices();
</script>

<template>
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

    <div v-show="isLogsExpanded" ref="terminalContainer" class="terminal-body">
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
</template>

<style lang="scss" scoped>
$slate-300: #cbd5e1;
$slate-400: #94a3b8;
$slate-500: #64748b;
$slate-600: #475569;
$slate-700: #334155;
$slate-800: #1e293b;
$slate-900: #0f172a;
$indigo-400: #818cf8;
$emerald-300: #6ee7b7;
$emerald-400: #34d399;
$rose-300: #fda4af;
$rose-400: #fb7185;

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
  cursor: pointer;
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
  cursor: pointer;
  border: 1px solid rgba($slate-600, 0.5);
  transition: all 0.2s ease;
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
  background: rgba(#070a11, 0.5);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.terminal-empty {
  color: $slate-600;
  font-style: italic;
}
.log-entry {
  line-height: 1.625;
  white-space: pre-wrap;
  display: flex;
}
.log-timestamp {
  color: rgba($slate-500, 0.8);
  margin-right: 8px;
}
.log-service {
  font-weight: 700;
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
