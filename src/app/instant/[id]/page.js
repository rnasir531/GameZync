import InstantGameDetailView from '@/components/instant/InstantGameDetailView';
import db from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { rows } = await db.query('SELECT title, description FROM instant_games WHERE id = $1', [id]);
  if (rows.length === 0) return { title: 'Game Not Found' };
  
  return {
    title: `${rows[0].title} - Play Instant Online Game | Gamer's Cafe`,
    description: rows[0].description || `Play ${rows[0].title} online for free instantly on Gamer's Cafe.`,
  };
}

export default async function InstantGameDetailPage({ params }) {
  const { id } = await params;

  // Fetch all instant games for player & suggestions
  const { rows: data } = await db.query(`
    SELECT i.*, COALESCE(STRING_AGG(c.name, ', '), i.category) as category
    FROM instant_games i
    LEFT JOIN instant_game_categories ic ON i.id = ic.game_id
    LEFT JOIN categories c ON ic.category_id = c.id
    GROUP BY i.id
    ORDER BY i.created_at DESC
  `);
  
  const allGames = data.map(g => ({
    ...g,
    isInstant: true,
    url: g.embed_url,
    img: g.image_url,
    name: g.title
  }));

  const activeGame = allGames.find(g => String(g.id) === String(id));
  if (!activeGame) {
    notFound();
  }

  return (
    <InstantGameDetailView activeGame={activeGame} allGames={allGames} />
  );
}
