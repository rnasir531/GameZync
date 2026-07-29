import InstantGamesView from '../../components/instant/InstantGamesView';
import db from '@/lib/db';

export const metadata = {
  title: 'Instant Play Games',
  description: 'Play premium mini-games instantly in your browser without any downloads. Best casual gaming experience.',
  alternates: {
    canonical: '/instant',
  }
};

export default async function InstantGamesPage() {
  // 1. Fetch all instant games
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

  return (
    <InstantGamesView allGames={allGames} />
  );
}
