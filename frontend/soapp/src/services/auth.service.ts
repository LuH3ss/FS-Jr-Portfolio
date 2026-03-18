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
      let token: string | undefined;

      // 1. Detectamos si estamos en el Servidor o en el Cliente
      if (typeof window === "undefined") {
        // Estamos en el Servidor (Next.js Server Component)
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        token = cookieStore.get('token')?.value;
      } else {
        // Estamos en el Cliente (Browser)
        token = localStorage.getItem("token") || Cookies.get('token');
      }

      if (!token) return null;

      // 2. Llamamos a la API. apiFetch ya debería estar configurado 
      // para aceptar el token si se lo pasamos manualmente o por headers
      const res = await apiFetch("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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