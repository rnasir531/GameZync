import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
export const dynamic = 'force-dynamic';


export async function GET(req) {
  try {
    const res = await query('SELECT * FROM categories ORDER BY name ASC');
    return NextResponse.json({ success: true, data: res.rows });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
