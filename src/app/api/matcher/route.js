import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ram = parseInt(searchParams.get('ram') || '0');
  const storage = parseInt(searchParams.get('storage') || '0');
  const os = searchParams.get('os') || '';

  // Return games that require less or equal RAM/Storage than provided
  const games = await prisma.game.findMany({
    where: {
      status: 'published',
      ram: { lte: ram },
      storage: { lte: storage },
      os: { contains: os === 'Windows 11' || os === 'Windows 10' ? 'Windows' : os }
    },
    take: 20
  });

  return NextResponse.json({ games });
}
