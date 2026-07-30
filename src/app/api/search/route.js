import { NextResponse } from 'next/server';
import { searchAll } from '@/services/searchService';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const query = new URL(request.url).searchParams.get('q');
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }
    const results = await searchAll(query.trim());
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
