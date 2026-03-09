import Link from 'next/link';
import { authService } from '@/services/auth.service';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  // Obtenemos el usuario directamente desde el servidor
  const user = await authService.getMe(
  
  );

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <Link href="/" className="text-xl font-bold text-blue-600">
        MyPortfolio
      </Link>
      
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hola, <strong>{user.email.split('@')[0]}</strong></span>
            <Link href="/dashboard" className="text-sm hover:underline">Dashboard</Link>
            {user.role === 'ADMIN' && (
              <Link href="/admin" className="text-sm text-red-600 font-bold">Admin</Link>
            )}
            {/* El botón de logout lo haremos pronto como Client Component */}
            <LogoutButton />
           
          </>
        ) : (
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}