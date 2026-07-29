import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');

export async function proxy(request) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes (except /admin-login)
  if (path.startsWith('/admin') && !path.startsWith('/admin-login')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // If going to /admin-login but already logged in, redirect to /admin
  if (path.startsWith('/admin-login')) {
    const token = request.cookies.get('admin_session')?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (error) {
        // Token invalid, let them stay on login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
};
