import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.requestGame.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}
