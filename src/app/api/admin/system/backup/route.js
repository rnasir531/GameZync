import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Quick JSON dump of major tables
    const data = {
      games: await prisma.game.findMany(),
      categories: await prisma.category.findMany(),
      adminUsers: await prisma.adminUser.findMany({
        select: { id: true, username: true, role: true } // Omit passwords
      }),
      contactMessages: await prisma.contactMessage.findMany(),
      requestGames: await prisma.requestGame.findMany(),
      reviewGames: await prisma.reviewGame.findMany(),
      instantGames: await prisma.instantGame.findMany(),
      upcomingGames: await prisma.upcomingGame.findMany()
    };

    const date = new Date().toISOString().split('T')[0];
    const filename = `db-backup-${date}.json`;

    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error('Error generating backup:', error);
    return NextResponse.json({ error: 'Failed to generate backup' }, { status: 500 });
  }
}
