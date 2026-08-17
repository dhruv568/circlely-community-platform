import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('circlely_session')?.value;

  const protectedRoutes = ['/onboarding', '/feed', '/messages', '/notifications', '/settings'];
  const adminRoutes = ['/admin'];

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdmin = adminRoutes.some((route) => pathname.startsWith(route));

  if ((isProtected || isAdmin) && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/onboarding/:path*', '/feed/:path*', '/messages/:path*', '/notifications/:path*', '/settings/:path*', '/admin/:path*'],
};
