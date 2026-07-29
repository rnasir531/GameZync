import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await prisma.game.update({
      where: { id: parseInt(id) },
      data: { is_featured: body.is_featured }
    });
    const actionText = body.is_featured ? 'Featured' : 'Unfeatured';
    await logActivity('toggled_featured', `${actionText} game ID: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error toggling featured:', error);
    return NextResponse.json({ error: 'Failed to toggle featured status' }, { status: 500 });
  }
}
