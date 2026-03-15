import Link from 'next/link';
import { authService } from '@/services/auth.service';
import LogoutButton from './LogoutButton';

import { Sparkles, LogOut, LayoutDashboard, Shield } from "lucide-react"
import { Button } from '../ui/button';

export default async function Navbar() {
  // Obtenemos el usuario directamente desde el servidor
  const user = await authService.getMe(
  
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

      <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
           <span className="text-xl font-bold tracking-tight text-foreground">
            MyPortfolio
          </span>
      </Link>
      
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="hidden text-sm text-muted-foreground sm:block">Hola,  Hola, <span className="font-medium text-foreground">{user.email.split('@')[0]}</span> </span>
            <Link href="/dashboard" >
               <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
            </Link>
            {user.role === 'ADMIN' && (
              <Link href="/admin" className="text-sm text-red-600 font-bold">
                 <Button variant="ghost" size="sm" className="gap-2 text-accent">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
              </Link>
            )}
            {/* El botón de logout lo haremos pronto como Client Component */}
            <LogoutButton />
           
          </>
        ) : (
          <Link href="/login" >
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Iniciar Sesión
              </Button>
          </Link>
        )}
      </nav>
            </div>
    </header>
  );
}