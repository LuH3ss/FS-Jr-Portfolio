'use client';
import { authService } from '@/services/auth.service';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await authService.logout();
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = '/login';
    } catch (e) {
      console.error(e);
    } finally {
      // ESTO ES LO MÁS IMPORTANTE:
      // Forzamos al navegador a ir al login y recargar TODO.
      window.location.href = '/login';
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-red-100 transition-colors"
    >
      Cerrar Sesión
    </button>
  );
}