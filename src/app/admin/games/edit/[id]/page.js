import EditGameForm from '@/components/admin/forms/EditGameForm';
import { notFound } from 'next/navigation';
import pool from '@/lib/db';

export const metadata = {
  title: 'Edit Game - NS Games Admin',
};

export default async function AdminEditGamePage({ params }) {
  const { id } = await params;

  const { rows: gameRows } = await pool.query(`SELECT * FROM games WHERE id = $1 LIMIT 1`, [parseInt(id)]);
  const game = gameRows[0];

  if (!game) {
    return notFound();
  }

  const { rows: gameCategories } = await pool.query(`SELECT * FROM game_categories WHERE game_id = $1`, [parseInt(id)]);
  const { rows: categories } = await pool.query(`SELECT * FROM categories ORDER BY name ASC`);

  const selectedCategoryIds = gameCategories.map(gc => gc.category_id);

  return (
    <div style={{ padding: '20px' }}>
      <EditGameForm 
        game={game} 
        categories={categories} 
        selectedCategoryIds={selectedCategoryIds} 
      />
    </div>
  );
}
