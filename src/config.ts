// Centralized app configuration
// API base URL resolves in this order: Vite env at build time -> window runtime override -> hardcoded default

// Allow runtime override if someone sets window.__API_BASE_URL__ before the app loads (useful on static hosts)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runtimeApiBase: string | undefined = (globalThis as any)?.__API_BASE_URL__;

export const API_BASE_URL: string =
  import.meta?.env?.VITE_API_BASE_URL?.trim() ||
  (runtimeApiBase ? String(runtimeApiBase).trim() : "") ||
  "https://meditrack-backend-murex.vercel.app";

export function buildApiUrl(path: string): string {
  const normalizedBase = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}


