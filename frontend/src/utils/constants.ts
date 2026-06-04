import type { Service } from "../composables/types.ts";

export const INITIAL_SERVICES: Service[] = [
  {
    id: "php",
    name: "PHP",
    category: "languages",
    port: 0,
    status: "stopped",
    pid: null,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    port: 0,
    status: "stopped",
    pid: null,
  },
  {
    id: "mariadb",
    name: "MariaDB",
    category: "databases",
    port: 0,
    status: "stopped",
    pid: null,
  },
];
