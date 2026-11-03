/**
 * DevSparks DeployCheck — Monitoring & Health Check Types
 * Adheres to ARD Section 8 (Component 9: Monitoring & Health Probes).
 */

export type MonitorType = "HTTP" | "TCP" | "CERTIFICATE";

export type MonitorStatus = "HEALTHY" | "DEGRADED" | "DOWN" | "PAUSED";

export type AlertType = "DOWN" | "RECOVERED" | "DEGRADED";

export interface MonitorTarget {
  id: string;
  workspaceId: string;
  projectId: string;
  name: string;
  type: MonitorType;
  endpointUrl: string;
  intervalSeconds: number;
  timeoutMs: number;
  expectedStatusCode: number;
  failureThreshold: number; // Consecutive failures before triggering alert (e.g. 3)
  status: MonitorStatus;
  consecutiveFailures: number;
  lastCheckedAt?: string;
  createdAt: string;
}

export interface MonitorCheckResult {
  id: string;
  monitorId: string;
  timestamp: string;
  isUp: boolean;
  statusCode?: number;
  latencyMs: number;
  errorMessage?: string;
}

export interface MonitorAlertNotification {
  id: string;
  monitorId: string;
  workspaceId: string;
  type: AlertType;
  message: string;
  timestamp: string;
  consecutiveFailures: number;
  dispatched: boolean;
}

export interface MonitorUptimeSummary {
  monitorId: string;
  totalChecks: number;
  successfulChecks: number;
  uptimePercentage: number;
  averageLatencyMs: number;
  p95LatencyMs: number;
}

