import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, embed_url, image_url, description, categoryIds } = body;
    
    let mainCategory = 'Uncategorized';
    if (categoryIds && categoryIds.length > 0) {
      const catObj = await prisma.category.findUnique({ where: { id: parseInt(categoryIds[0]) } });
      if (catObj) mainCategory = catObj.name;
    }

    await prisma.instantGame.update({
      where: { id: parseInt(id) },
      data: {
        title,
        embed_url,
        image_url: image_url || '',
        description: description || '',
        category: mainCategory
      }
    });

    // Update categories
    await prisma.instantGameCategory.deleteMany({ where: { game_id: parseInt(id) } });
    if (categoryIds && categoryIds.length > 0) {
      for (const catId of categoryIds) {
        await prisma.instantGameCategory.create({
          data: { game_id: parseInt(id), category_id: parseInt(catId) }
        });
      }
    }

    const updatedGame = await prisma.instantGame.findUnique({
      where: { id: parseInt(id) },
      include: { instantGameCategories: true }
    });
    await logActivity('edited_instant_game', `Edited instant game: ${title}`);

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error('Error updating instant game:', error);
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.instantGame.delete({
      where: { id: parseInt(id) }
    });
    await logActivity('deleted_instant_game', `Deleted instant game ID: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting instant game:', error);
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}
