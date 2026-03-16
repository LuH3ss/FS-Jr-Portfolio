import { apiFetch } from "@/lib/api";
import { User } from "@/lib/definitions";

export const authService = {
  login: async (credentials: Record<string, string>) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      const data = await res.json();
      // Guardamos el token en localStorage
      localStorage.setItem("token", data.token);
    }
    return res;
  },

  getMe: async (): Promise<User | null> => {
    try {
      const res = await apiFetch("/auth/me");
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    return await apiFetch("/auth/logout", { method: "POST" });
  }
};