import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, embed_url, image_url, description, categoryIds } = body;

    // Default category logic (similar to PHP)
    let mainCategory = 'Uncategorized';
    if (categoryIds && categoryIds.length > 0) {
      const catObj = await prisma.category.findUnique({ where: { id: parseInt(categoryIds[0]) } });
      if (catObj) mainCategory = catObj.name;
    }

    const newGame = await prisma.instantGame.create({
      data: {
        title,
        embed_url,
        image_url: image_url || '',
        description: description || '',
        category: mainCategory
      }
    });

    if (categoryIds && categoryIds.length > 0) {
      for (const catId of categoryIds) {
        await prisma.instantGameCategory.create({
          data: {
            game_id: newGame.id,
            category_id: parseInt(catId)
          }
        });
      }
    }

    const fetchedGame = await prisma.instantGame.findUnique({
      where: { id: newGame.id },
      include: { instantGameCategories: true }
    });
    await logActivity('added_instant_game', `Added instant game: ${title}`);

    return NextResponse.json(fetchedGame);
  } catch (error) {
    console.error('Error adding instant game:', error);
    return NextResponse.json({ error: 'Failed to add game' }, { status: 500 });
  }
}
