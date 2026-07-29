export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getCachedSettings } from '@/lib/getSettings';

export async function GET() {
  try {
    const allSettings = await getCachedSettings();
    const publicSettings = {};

    Object.keys(allSettings).forEach(key => {
      if (
        key.startsWith('social_') ||
        key.startsWith('appearance_') ||
        key.startsWith('seo_') ||
        key === 'site_name' ||
        key === 'site_description' ||
        key === 'contact_email'
      ) {
        publicSettings[key] = allSettings[key];
      }
    });

    return NextResponse.json(publicSettings, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Public Settings API Error:', error);
    return NextResponse.json({});
  }
}
