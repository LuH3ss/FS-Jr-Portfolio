import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;

  console.log(`RUTA: ${pathname} | TOKEN EXISTE: ${!!token}`);

  // Si no hay token y quiere entrar al dashboard, redirigimos al login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  } 
  return NextResponse.next();
}

export const config = {
  // Solo aplicamos el middleware a las rutas que queremos proteger
  matcher: ['/dashboard/:path*'],
};