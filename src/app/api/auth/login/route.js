import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

import prisma from '@/lib/prisma';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (!admin) {
      return NextResponse.json({ error: 'Username Or Password Not Matched' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Username Or Password Not Matched' }, { status: 401 });
    }

    // Create session token
    const token = await new SignJWT({ 
      id: admin.id, 
      username: admin.username, 
      role: admin.role,
      fname: admin.first_name,
      lname: admin.last_name
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
