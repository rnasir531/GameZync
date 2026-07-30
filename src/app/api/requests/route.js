import { NextResponse } from 'next/server';
import { submitGameRequest, getGameRequests } from '@/services/requestService';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const data = await req.json();
    const result = await submitGameRequest(data);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Request Game Error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await getGameRequests();
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
