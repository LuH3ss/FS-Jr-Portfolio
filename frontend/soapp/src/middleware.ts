// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('session_cookie_name'); // El nombre que uses en Express
  const { pathname } = request.nextUrl;

  // 1. Si intenta entrar a dashboard sin cookie
  if (!authCookie && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Si ya está logueado e intenta ir a /login
  if (authCookie && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}