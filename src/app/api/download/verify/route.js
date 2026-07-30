import { NextResponse } from 'next/server';
import { verifyAndGetDownloadUrl } from '@/services/downloadService';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await verifyAndGetDownloadUrl(body);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status || 400 });
    }
    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error('Download verification error:', error);
    return NextResponse.json({ error: 'Internal server error while verifying download.' }, { status: 500 });
  }
}
