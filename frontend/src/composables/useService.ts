import { ref, nextTick } from "vue";
import { invoke } from "@tauri-apps/api/core";
import type { Service, LogEntry } from "./types.ts";
import { INITIAL_SERVICES } from "../utils/constants.ts";

const services = ref<Service[]>([...INITIAL_SERVICES]);
const logs = ref<LogEntry[]>([]);
const isLogsExpanded = ref(false);
const terminalContainer = ref<HTMLLinkElement | null>(null);

export function useServices() {
  const addLog = (
    serviceName: string,
    type: "info" | "success" | "error",
    message: string,
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("pt-BR", { hour12: false });

    logs.value.push({
      timestamp: timeStr,
      service: serviceName,
      type,
      message,
    });

    nextTick(() => {
      if (terminalContainer.value) {
        terminalContainer.value.scrollTop =
          terminalContainer.value.scrollHeight;
      }
    });
  };

  // Carrega o estado atual (portas e PIDs reais) lidos pelo Rust na inicialização
  const fetchServicesStatus = async () => {
    try {
      // No Tauri v2, passamos o nome do comando exatamente como definido no Rust
      const backendServices = await invoke<Service[]>("get_services_status");
      services.value = backendServices;
    } catch (error) {
      addLog(
        "Sistema",
        "error",
        `Falha ao sincronizar com o backend Tauri: ${error}`,
      );
    }
  };

  const toggleService = async (service: Service) => {
    if (service.status === "stopped") {
      addLog(
        service.name,
        "info",
        `Solicitando inicialização ao backend Rust...`,
      );

      try {
        // Tauri v2 usa a convenção de camelCase para passar argumentos para o Rust (snake_case)
        const updatedService = await invoke<Service>("start_service", {
          serviceId: service.id,
        });

        // Atualiza a lista reativa do Vue com a porta e o PID que o Rust descobriu/gerou
        const index = services.value.findIndex(
          (s: Service) => s.id === service.id,
        );
        if (index !== -1) {
          services.value[index] = updatedService;
        }

        addLog(
          service.name,
          "success",
          `Serviço iniciado (PID: ${updatedService.pid} | Porta: ${updatedService.port}).`,
        );
      } catch (error) {
        // Se o Rust retornar um Err("mensagem"), ele cai direto neste catch como uma string/objeto
        addLog(service.name, "error", `Erro ao iniciar serviço: ${error}`);
      }
    } else {
      addLog(
        service.name,
        "info",
        `Solicitando parada do serviço (PID: ${service.pid})...`,
      );

      try {
        const updatedService = await invoke<Service>("stop_service", {
          serviceId: service.id,
        });

        const index = services.value.findIndex(
          (s: Service) => s.id === service.id,
        );
        if (index !== -1) {
          services.value[index] = updatedService;
        }

        addLog(service.name, "info", `Serviço parado com sucesso.`);
      } catch (error) {
        addLog(service.name, "error", `Erro ao parar serviço: ${error}`);
      }
    }
  };

  const openConfig = async (service: Service) => {
    addLog(service.name, "info", `Abrindo arquivo de configuração nativo...`);
    try {
      await invoke("open_service_config", { serviceId: service.id });
    } catch (error) {
      addLog(
        service.name,
        "error",
        `Não foi possível abrir o arquivo: ${error}`,
      );
    }
  };

  const clearLogs = () => {
    logs.value = [];
  };
  const toggleLogsPanel = () => {
    isLogsExpanded.value = !isLogsExpanded.value;
  };

  return {
    services,
    logs,
    isLogsExpanded,
    terminalContainer,
    addLog,
    fetchServicesStatus,
    toggleService,
    openConfig,
    clearLogs,
    toggleLogsPanel,
  };
}
