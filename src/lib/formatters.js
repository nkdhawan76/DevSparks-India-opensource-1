/**
 * DevSparks DeployCheck — Formatting & Calculation Logic (.js)
 * Pure JavaScript utility functions for timestamps, duration, scores, and status formatting.
 */

/**
 * Formats an ISO date string or timestamp into a readable date.
 * @param {string | number | Date} value
 * @param {"full" | "short" | "time"} [format="short"]
 * @returns {string}
 */
export function formatTimestamp(value, format = "short") {
  if (!value) return "—";

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return "—";

    if (format === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (format === "full") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_e) {
    return "—";
  }
}

/**
 * Maps an audit readiness score (0-100) to visual color and label.
 * @param {number} score
 * @returns {{ label: string, badgeVariant: "success" | "warning" | "destructive", colorClass: string }}
 */
export function formatAuditScore(score) {
  const numericScore = typeof score === "number" ? score : 0;

  if (numericScore >= 90) {
    return {
      label: "Excellent",
      badgeVariant: "success",
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-200",
    };
  }

  if (numericScore >= 75) {
    return {
      label: "Passing",
      badgeVariant: "warning",
      colorClass: "text-amber-600 bg-amber-50 border-amber-200",
    };
  }

  return {
    label: "Needs Attention",
    badgeVariant: "destructive",
    colorClass: "text-rose-600 bg-rose-50 border-rose-200",
  };
}

/**
 * Formats milliseconds into human-readable duration (e.g. "42s", "1m 15s").
 * @param {number} ms
 * @returns {string}
 */
export function formatDuration(ms) {
  if (typeof ms !== "number" || isNaN(ms) || ms < 0) return "0s";

  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

