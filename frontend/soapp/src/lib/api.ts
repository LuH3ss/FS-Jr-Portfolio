// src/lib/api.ts

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = "http://localhost:4000";
  const dynamicHeaders: Record<string, string> = {};

  // Verificamos si estamos en el SERVIDOR
  if (typeof window === "undefined") {
    try {
      // Importación dinámica para evitar que el cliente intente cargar esto
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (token) {
        dynamicHeaders["Cookie"] = `token=${token}`;
      }
    } catch (error) {
      console.error("Error accediendo a cookies en servidor:", error);
    }
  }

  const defaultOptions: RequestInit = {
    ...options,
    // Importante para componentes de cliente:
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...dynamicHeaders,
      ...options.headers,
    },
  };

  return fetch(`${baseUrl}${endpoint}`, defaultOptions);
}