'use client';
import { authService } from '@/services/auth.service';
import { Button } from '../ui/button';

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
    <Button 
      onClick={handleLogout}
       variant="outline" size="sm" className="gap-2"
     >
      Cerrar Sesión
    </Button>
  );
}