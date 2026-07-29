export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const isFeatured = searchParams.get('featured') === 'true';

    const games = await prisma.game.findMany({
      where: isFeatured ? { is_featured: 1, status: 'published' } : { status: 'published' },
      orderBy: { created_at: 'desc' },
      take: limit,
    });

    return NextResponse.json({ success: true, data: games });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
