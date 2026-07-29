import GamesRowSection from '../common/GamesRowSection';
import { query } from '@/lib/db';

export default async function InstantGames() {
  try {
    const { rows: instantGames } = await query(`
      SELECT ig.*, COALESCE(STRING_AGG(c.name, ', '), ig.category) as category
      FROM instant_games ig
      LEFT JOIN instant_game_categories igc ON ig.id = igc.game_id
      LEFT JOIN categories c ON igc.category_id = c.id
      GROUP BY ig.id
      ORDER BY ig.created_at DESC
      LIMIT 10
    `);

    if (!instantGames || instantGames.length === 0) return null;

    return (
      <GamesRowSection 
        title="Instant Play Games"
        subtitle="Play Directly in Browser"
        icon="fa-solid fa-bolt-lightning"
        games={instantGames}
        showSwitcher={false}
        viewAllLink="/instant"
      />
    );
  } catch (err) {
    console.error("InstantGames error:", err);
    return null;
  }
}
