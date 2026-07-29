import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { first_name, last_name, username, password, role } = body;

    const data = {
      first_name: first_name || null,
      last_name: last_name || null,
      username,
      role: parseInt(role) || 1
    };

    // If password is provided, hash it
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.adminUser.update({
      where: { id: parseInt(id) },
      data
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    await logActivity('edited_admin', `Edited admin user: ${username}`);

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.adminUser.delete({
      where: { id: parseInt(id) }
    });

    await logActivity('deleted_admin', `Deleted admin user ID: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
