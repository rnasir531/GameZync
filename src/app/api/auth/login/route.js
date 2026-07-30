import { NextResponse } from 'next/server';
import { loginAdmin } from '@/services/authService';
import { SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from '@/config/database';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const result = await loginAdmin(username, password);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
