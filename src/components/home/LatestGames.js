import GamesRowSection from '../common/GamesRowSection';
import { query } from '@/lib/db';

export default async function LatestGames() {
  try {
    const { rows: latestGames } = await query(`
      SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
      FROM games g
      LEFT JOIN game_categories gc ON g.id = gc.game_id
      LEFT JOIN categories c ON gc.category_id = c.id
      WHERE g.status = 'published'
      GROUP BY g.id
      ORDER BY g.created_at DESC
      LIMIT 10
    `);

    if (!latestGames || latestGames.length === 0) return null;

    return (
      <GamesRowSection 
        title="Latest Uploaded Games"
        subtitle="Fresh Arrivals"
        icon="fa-solid fa-fire"
        games={latestGames}
        showSwitcher={true}
        viewAllLink="/library?sort=latest"
      />
    );
  } catch (err) {
    console.error("LatestGames error:", err);
    return null;
  }
}
