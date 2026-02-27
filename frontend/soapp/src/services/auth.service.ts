import { apiFetch } from "@/lib/api"; // Lo crearemos en el siguiente paso
import { AuthResponse, User } from "@/lib/definitions";

export const authService = {
  // 1. Iniciar sesión
  login: async (credentials: Record<string, string>) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return res;
  },

  // 2. Obtener usuario actual (Persistencia de sesión)
  getMe: async (): Promise<User | null> => {
    try {
      const res = await apiFetch("/auth/me");
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  },

  // 3. Cerrar sesión
  logout: async () => {
    return await apiFetch("/auth/logout", { method: "POST" });
  }
};