import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Find game to get the folder path
    const game = await prisma.game.findUnique({ where: { id: parseInt(id) } });
    if (game && game.cover_image && game.cover_image.startsWith('/uploads/games/')) {
        const folderName = game.cover_image.split('/')[3];
        if (folderName) {
            const dirPath = path.join(process.cwd(), 'public', 'uploads', 'games', folderName);
            if (fs.existsSync(dirPath)) {
                fs.rmSync(dirPath, { recursive: true, force: true });
            }
        }
    }

    // Delete game from database
    await prisma.game.delete({
      where: { id: parseInt(id) }
    });

    await logActivity('deleted_game', `Deleted game ID: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting game:', error);
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}
