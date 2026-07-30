import { NextResponse } from 'next/server';
import { getMatchingGames } from '@/lib/db/queries';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ram     = parseInt(searchParams.get('ram') || '0');
    const storage = parseInt(searchParams.get('storage') || '0');
    const os      = searchParams.get('os') || '';

    const { rows: games } = await getMatchingGames(ram, storage, os);
    return NextResponse.json({ games: games || [] });
  } catch (error) {
    console.error('Matcher error:', error);
    return NextResponse.json({ games: [] }, { status: 500 });
  }
}
