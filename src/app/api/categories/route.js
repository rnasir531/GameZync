import { NextResponse } from 'next/server';
import { getCategories } from '@/services/categoryService';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getCategories();
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
