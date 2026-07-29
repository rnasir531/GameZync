import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
