import GamesRowSection from '../common/GamesRowSection';
import { query } from '@/lib/db';

export default async function HighEndGames() {
  try {
    const { rows: highEndGames } = await query(`
      SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
      FROM games g
      LEFT JOIN game_categories gc ON g.id = gc.game_id
      LEFT JOIN categories c ON gc.category_id = c.id
      WHERE g.status = 'published' AND (
        LOWER(g.ram) LIKE '%8%gb%' OR LOWER(g.ram) LIKE '%12%gb%' OR LOWER(g.ram) LIKE '%16%gb%' OR LOWER(g.ram) LIKE '%32%gb%'
      )
      GROUP BY g.id
      ORDER BY g.created_at DESC
      LIMIT 10
    `);

    if (!highEndGames || highEndGames.length === 0) return null;

    return (
      <GamesRowSection 
        title="High PC Specs Games"
        subtitle="Requires 8GB+ RAM & Dedicated GPU"
        icon="fa-solid fa-desktop"
        games={highEndGames}
        showSwitcher={true}
        viewAllLink="/high-end"
      />
    );
  } catch (err) {
    console.error("HighEndGames error:", err);
    return null;
  }
}
