// src/lib/api.ts

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tu-api-predeterminada.com';
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  // 1. Obtenemos el token del localStorage (solo funciona en el cliente)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      // 2. Lo inyectamos como Header de Autorización
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const defaultOptions: RequestInit = {
    ...options,
    // Ya no necesitamos credentials: "include" porque no usamos cookies
    headers,
  };

  return fetch(`${baseUrl}${endpoint}`, defaultOptions);
}