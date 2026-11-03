/**
 * DevSparks DeployCheck — Synthetic Monitoring & Uptime Engine
 * Manages health check probes, consecutive failure state transitions, and alert dispatching.
 */

import {
  MonitorAlertNotification,
  MonitorCheckResult,
  MonitorTarget,
  MonitorUptimeSummary,
} from "./types";

export class SyntheticMonitorEngine {
  private targets: Map<string, MonitorTarget> = new Map();
  private checkHistory: Map<string, MonitorCheckResult[]> = new Map();
  private alerts: MonitorAlertNotification[] = [];

  public registerTarget(target: MonitorTarget): MonitorTarget {
    this.targets.set(target.id, target);
    if (!this.checkHistory.has(target.id)) {
      this.checkHistory.set(target.id, []);
    }
    return target;
  }

  public getTarget(id: string): MonitorTarget | null {
    return this.targets.get(id) || null;
  }

  public listTargets(workspaceId?: string): MonitorTarget[] {
    const list = Array.from(this.targets.values());
    return workspaceId ? list.filter((t) => t.workspaceId === workspaceId) : list;
  }

  /**
   * Processes a synthetic probe check result and transitions target health state.
   */
  public recordCheck(check: MonitorCheckResult): {
    target: MonitorTarget;
    alert?: MonitorAlertNotification;
  } {
    const target = this.targets.get(check.monitorId);
    if (!target) {
      throw new Error(`Monitor target '${check.monitorId}' not found.`);
    }

    const history = this.checkHistory.get(check.monitorId) || [];
    history.push(check);
    this.checkHistory.set(check.monitorId, history);

    target.lastCheckedAt = check.timestamp;
    let generatedAlert: MonitorAlertNotification | undefined;

    if (check.isUp) {
      const wasDown = target.status === "DOWN" || target.consecutiveFailures >= target.failureThreshold;
      target.consecutiveFailures = 0;
      target.status = "HEALTHY";

      if (wasDown) {
        generatedAlert = {
          id: `alert-${Date.now()}`,
          monitorId: target.id,
          workspaceId: target.workspaceId,
          type: "RECOVERED",
          message: `Service '${target.name}' has recovered. Endpoint is responding with HTTP ${check.statusCode} (${check.latencyMs}ms).`,
          timestamp: check.timestamp,
          consecutiveFailures: 0,
          dispatched: true,
        };
        this.alerts.push(generatedAlert);
      }
    } else {
      target.consecutiveFailures += 1;

      if (target.consecutiveFailures >= target.failureThreshold) {
        target.status = "DOWN";
        generatedAlert = {
          id: `alert-${Date.now()}`,
          monitorId: target.id,
          workspaceId: target.workspaceId,
          type: "DOWN",
          message: `Service '${target.name}' is DOWN: ${target.consecutiveFailures} consecutive failed probes. Reason: ${check.errorMessage || "HTTP Check Failed"}`,
          timestamp: check.timestamp,
          consecutiveFailures: target.consecutiveFailures,
          dispatched: true,
        };
        this.alerts.push(generatedAlert);
      } else {
        target.status = "DEGRADED";
      }
    }

    return { target, alert: generatedAlert };
  }

  /**
   * Calculates uptime percentage and latency metrics over historical probes.
   */
  public calculateUptimeSummary(monitorId: string): MonitorUptimeSummary {
    const history = this.checkHistory.get(monitorId) || [];
    if (history.length === 0) {
      return {
        monitorId,
        totalChecks: 0,
        successfulChecks: 0,
        uptimePercentage: 100.0,
        averageLatencyMs: 0,
        p95LatencyMs: 0,
      };
    }

    const successfulChecks = history.filter((c) => c.isUp).length;
    const uptimePercentage = Number(((successfulChecks / history.length) * 100).toFixed(2));

    const latencies = history.map((c) => c.latencyMs).sort((a, b) => a - b);
    const sumLatency = latencies.reduce((acc, curr) => acc + curr, 0);
    const averageLatencyMs = Math.round(sumLatency / latencies.length);

    const p95Index = Math.min(Math.floor(latencies.length * 0.95), latencies.length - 1);
    const p95LatencyMs = latencies[p95Index] || averageLatencyMs;

    return {
      monitorId,
      totalChecks: history.length,
      successfulChecks,
      uptimePercentage,
      averageLatencyMs,
      p95LatencyMs,
    };
  }

  public getAlerts(workspaceId?: string): MonitorAlertNotification[] {
    return workspaceId ? this.alerts.filter((a) => a.workspaceId === workspaceId) : this.alerts;
  }
}

export const monitorEngine = new SyntheticMonitorEngine();
