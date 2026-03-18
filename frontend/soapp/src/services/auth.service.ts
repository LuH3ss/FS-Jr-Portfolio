import { apiFetch } from "@/lib/api";
import { User } from "@/lib/definitions";
import Cookies from 'js-cookie';

export const authService = {
  login: async (credentials: Record<string, string>) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
  const data = await res.json();
  localStorage.setItem("token", data.token);
  
  // Guardamos la cookie para que el Middleware la vea
  Cookies.set('token', data.token, { expires: 1 }); // Expira en 1 día
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
    Cookies.remove('token'); // <--- AGREGÁ ESTO
    return await apiFetch("/auth/logout", { method: "POST" });
  }
};