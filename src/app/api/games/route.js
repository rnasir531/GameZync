import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
export const dynamic = 'force-dynamic';


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const isFeatured = searchParams.get('featured') === 'true';

    let sql = 'SELECT * FROM games WHERE status = $1 ORDER BY created_at DESC LIMIT $2';
    let params = ['published', limit];

    if (isFeatured) {
      sql = 'SELECT * FROM games WHERE status = $1 AND is_featured = 1 ORDER BY created_at DESC LIMIT $2';
    }

    const res = await query(sql, params);
    return NextResponse.json({ success: true, data: res.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
