import CategoriesView from '../../components/categories/CategoriesView';
import db from '@/lib/db';

export const metadata = {
  title: 'Game Categories - NS Games',
};

export default async function Categories() {
  const { rows: categories } = await db.query(`
    SELECT c.*, COUNT(gc.game_id) as game_count 
    FROM categories c 
    LEFT JOIN game_categories gc ON c.id = gc.category_id 
    GROUP BY c.id
    ORDER BY c.name ASC
  `);

  return (
    <div style={{ padding: '20px 0' }}>
      <CategoriesView categories={categories} />
    </div>
  );
}
