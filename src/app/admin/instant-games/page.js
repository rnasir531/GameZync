import InstantGamesTableClient from '@/components/admin/tables/InstantGamesTableClient';
import pool from '@/lib/db';

export const metadata = { title: 'Manage Instant Games - Admin Panel' };
export const revalidate = 0;

export default async function AdminInstantGamesPage() {
  const { rows: instantGames } = await pool.query(`
    SELECT ig.*, 
      COALESCE(
        json_agg(json_build_object('category_id', igc.category_id, 'game_id', igc.game_id)) 
        FILTER (WHERE igc.game_id IS NOT NULL), '[]'
      ) as "instantGameCategories"
    FROM instant_games ig
    LEFT JOIN instant_game_categories igc ON ig.id = igc.game_id
    GROUP BY ig.id
    ORDER BY ig.created_at DESC
  `);

  const { rows: categories } = await pool.query(`SELECT * FROM categories ORDER BY name ASC`);

  return (
    <div style={{ padding: '20px' }}>
      <InstantGamesTableClient instantGames={instantGames} categories={categories} />
    </div>
  );
}
