import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/activityLogger';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, icon, image_url, description } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const category = await prisma.category.create({
      data: { 
        name, 
        icon: icon || 'fa-gamepad',
        image_url: image_url || null,
        description: description || null
      }
    });
    await logActivity('added_category', `Added category: ${name}`);

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
