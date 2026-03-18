export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.FRONTEND_URL || 'https://fs-jr-portfolio.vercel.app';
  
  // 1. Preparamos los headers base
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 2. Inyectamos el token si estamos en el cliente (Browser)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // 3. Combinamos con headers que puedan venir en 'options'
  // Usamos un objeto nuevo para no mutar el original
  const finalHeaders = {
    ...headers,
    ...(options.headers as Record<string, string>),
  };

  const defaultOptions: RequestInit = {
    ...options,
    headers: finalHeaders,
  };

  // 4. Ejecutamos el fetch
  const url = `${baseUrl}${endpoint}`;
  
  return fetch(url, defaultOptions);
}