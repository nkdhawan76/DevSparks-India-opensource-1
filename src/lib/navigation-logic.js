/**
 * DevSparks DeployCheck — Navigation State & Routing Logic (.js)
 * Pure JavaScript utility functions for active links, menu triggers, and route parsing.
 */

/**
 * Checks if a route is currently active given the current pathname.
 * @param {string} currentPath
 * @param {string} targetRoute
 * @returns {boolean}
 */
export function isRouteActive(currentPath, targetRoute) {
  if (!currentPath || !targetRoute) return false;
  if (targetRoute === "/") return currentPath === "/";
  return currentPath.startsWith(targetRoute);
}

/**
 * Parses and categorizes external vs internal routes.
 * @param {string} route
 * @returns {{ isExternal: boolean, safeUrl: string }}
 */
export function evaluateRoute(route) {
  if (!route || typeof route !== "string") {
    return { isExternal: false, safeUrl: "#" };
  }

  const isExternal = route.startsWith("http://") || route.startsWith("https://");
  return { isExternal, safeUrl: route };
}
