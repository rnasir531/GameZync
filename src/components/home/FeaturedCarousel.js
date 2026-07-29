import Carousel from '../Carousel';
import { query } from '@/lib/db';

export default async function FeaturedCarousel() {
  try {
    const { rows: featuredGames } = await query(`
      SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
      FROM games g
      LEFT JOIN game_categories gc ON g.id = gc.game_id
      LEFT JOIN categories c ON gc.category_id = c.id
      WHERE g.status = 'published' AND g.is_featured = 1
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `);

    if (!featuredGames || featuredGames.length === 0) return null;

    return <Carousel games={featuredGames} />;
  } catch (err) {
    console.error("FeaturedCarousel error:", err);
    return null;
  }
}
