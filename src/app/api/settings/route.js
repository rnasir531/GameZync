import { NextResponse } from 'next/server';
import { getSettings, getPublicSettings } from '@/services/settingsService';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allSettings = await getSettings();
    const publicSettings = getPublicSettings(allSettings);
    return NextResponse.json(publicSettings, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
    });
  } catch (error) {
    console.error('Public Settings API Error:', error);
    return NextResponse.json({});
  }
}
