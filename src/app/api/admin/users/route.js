import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function POST(request) {
  try {
    const body = await request.json();
    const { first_name, last_name, username, password, role } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.adminUser.create({
      data: {
        first_name: first_name || null,
        last_name: last_name || null,
        username,
        password: hashedPassword,
        role: parseInt(role) || 1
      }
    });

    // Remove password before sending to client
    const { password: _, ...userWithoutPassword } = newUser;

    await logActivity('added_admin', `Added admin user: ${username}`);

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
