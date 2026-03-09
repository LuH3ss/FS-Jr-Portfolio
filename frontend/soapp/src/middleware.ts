import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // LOG PARA DEBUG - Mira tu terminal de VS Code
  console.log(`RUTA: ${pathname} | TOKEN: ${!!token}`);

  // 1. Si NO hay token y quiere ir a DASHBOARD -> Login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Si SI hay token y quiere ir a LOGIN, dejamos que pase 
  // pero NO lo redirijas a dashboard todavía para evitar el bucle infinito
  // Comenta esta lógica temporalmente si el bucle sigue:
  
  // if (token && pathname === '/login') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};