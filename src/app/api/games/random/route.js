import { NextResponse } from 'next/server';
import { getRandomGame } from '@/services/gameService';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const exclude = new URL(request.url).searchParams.get('exclude');
    const game = await getRandomGame(exclude);

    if (!game) {
      return NextResponse.json({ success: false, message: 'No games available' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, gameId: game.id },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (error) {
    console.error('Random API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
