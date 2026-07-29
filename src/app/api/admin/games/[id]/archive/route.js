import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json(); // 'archived' or 'published'

    const targetStatus = status === 'archived' ? 'archived' : 'published';

    await pool.query('UPDATE games SET status = $1 WHERE id = $2', [targetStatus, parseInt(id)]);

    return NextResponse.json({ success: true, id, status: targetStatus });
  } catch (err) {
    console.error('Error toggling archive status:', err);
    return NextResponse.json({ error: 'Failed to update archive status' }, { status: 500 });
  }
}
