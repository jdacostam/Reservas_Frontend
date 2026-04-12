const DEFAULT_API_BASE_URL = "http://localhost:3000";

const env = (import.meta as any).env ?? {};
const rawApiBaseUrl = env.VITE_API_BASE_URL?.trim();

if (!rawApiBaseUrl && env.DEV) {
	console.warn(
		`VITE_API_BASE_URL is not set. Falling back to ${DEFAULT_API_BASE_URL}.`
	);
}

export const API_BASE_URL = (rawApiBaseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
