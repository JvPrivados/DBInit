export interface Service {
  id: string;
  name: string;
  category: "languages" | "databases";
  port: number;
  status: "stopped" | "running";
  pid: number | null;
}

export interface LogEntry {
  timestamp: string;
  service: string;
  type: "info" | "success" | "error";
  message: string;
}
