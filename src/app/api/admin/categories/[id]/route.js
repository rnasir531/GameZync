import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.gameCategory.deleteMany({ where: { category_id: parseInt(id) } });
    await prisma.category.delete({ where: { id: parseInt(id) } });

    await logActivity('deleted_category', `Deleted category ID: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, icon, image_url, description } = body;
    const updated = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, icon, image_url: image_url || null, description: description || null }
    });

    await logActivity('edited_category', `Edited category: ${name}`);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}
