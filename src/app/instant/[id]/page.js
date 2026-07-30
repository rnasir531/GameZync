import InstantGameDetailView from '@/components/instant/InstantGameDetailView';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { slugify } from '@/lib/slug';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const cleanParam = decodeURIComponent(id).toLowerCase().trim();
  const numericId = parseInt(id, 10);

  let game = null;
  if (!isNaN(numericId) && String(numericId) === id) {
    const { rows } = await db.query('SELECT title, description FROM instant_games WHERE id = $1', [numericId]);
    if (rows[0]) game = rows[0];
  }

  if (!game) {
    const { rows } = await db.query('SELECT id, title, description FROM instant_games');
    game = rows.find(g => {
      const s = slugify(g.title);
      return s === cleanParam || String(g.id) === cleanParam || `${g.id}-${s}` === cleanParam;
    });
  }

  if (!game) return { title: 'Game Not Found' };
  
  return {
    title: `${game.title} - Play Instant Online Game | Gamer's Cafe`,
    description: game.description || `Play ${game.title} online for free instantly on Gamer's Cafe.`,
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

  const cleanParam = decodeURIComponent(id).toLowerCase().trim();
  const numericId = parseInt(id, 10);

  let activeGame = null;
  if (!isNaN(numericId) && String(numericId) === id) {
    activeGame = allGames.find(g => Number(g.id) === numericId);
  }

  if (!activeGame) {
    activeGame = allGames.find(g => {
      const s = slugify(g.title);
      return s === cleanParam || String(g.id) === cleanParam || `${g.id}-${s}` === cleanParam;
    });
  }

  if (!activeGame) {
    notFound();
  }

  return (
    <InstantGameDetailView activeGame={activeGame} allGames={allGames} />
  );
}
