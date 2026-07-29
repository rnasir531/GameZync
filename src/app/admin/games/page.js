import GamesTabsClient from '@/components/admin/views/GamesTabsClient';
import pool from '@/lib/db';

export const metadata = { title: 'Manage Games - Admin Panel' };
export const revalidate = 0;

export default async function AdminGamesPage() {
  const [{ rows: games }, { rows: categories }] = await Promise.all([
    pool.query(`SELECT * FROM games ORDER BY created_at DESC`),
    pool.query(`
      SELECT c.*, COUNT(gc.game_id) as game_count 
      FROM categories c 
      LEFT JOIN game_categories gc ON c.id = gc.category_id 
      GROUP BY c.id
      ORDER BY c.name ASC
    `),
  ]);

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

  return (
    <GamesTabsClient
      games={games}
      instantGames={instantGames}
      categories={categories}
      allCategories={categories}
    />
  );
}
