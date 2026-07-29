import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
  try {
    const { report_id } = await request.json();
    if (!report_id) return NextResponse.json({ error: 'Missing report_id' }, { status: 400 });

    await db.query(`UPDATE dead_link_reports SET status = 'resolved' WHERE id = $1`, [report_id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { report_id } = await request.json();
    if (!report_id) return NextResponse.json({ error: 'Missing report_id' }, { status: 400 });

    await db.query(`DELETE FROM dead_link_reports WHERE id = $1`, [report_id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
