import { NextResponse } from 'next/server';
import { submitReport } from '@/services/reportService';

export async function POST(request) {
  try {
    const { game_id } = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const result = await submitReport(game_id, ip);
    if (result.error) {
      const status = result.error.includes('already reported') ? 429 : 400;
      return NextResponse.json({ error: result.error }, { status });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
