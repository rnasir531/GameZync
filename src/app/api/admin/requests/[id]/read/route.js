import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.requestGame.update({
      where: { id: parseInt(id) },
      data: { status: 'read' }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking request as read:', error);
    return NextResponse.json({ error: 'Failed to mark as read' }, { status: 500 });
  }
}
