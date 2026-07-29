import GamesRowSection from '../common/GamesRowSection';
import { query } from '@/lib/db';

export default async function LowEndGames() {
  try {
    const { rows: lowEndGames } = await query(`
      SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
      FROM games g
      LEFT JOIN game_categories gc ON g.id = gc.game_id
      LEFT JOIN categories c ON gc.category_id = c.id
      WHERE g.status = 'published' AND (
        LOWER(g.ram) LIKE '%2%gb%' OR LOWER(g.ram) LIKE '%4%gb%' OR LOWER(g.ram) LIKE '%6%gb%'
      )
      GROUP BY g.id
      ORDER BY g.created_at DESC
      LIMIT 10
    `);

    if (!lowEndGames || lowEndGames.length === 0) return null;

    return (
      <GamesRowSection 
        title="Low PC Specs Games"
        subtitle="Runs Smoothly on 2GB - 6GB RAM"
        icon="fa-solid fa-laptop"
        games={lowEndGames}
        showSwitcher={true}
        viewAllLink="/low-end"
      />
    );
  } catch (err) {
    console.error("LowEndGames error:", err);
    return null;
  }
}
