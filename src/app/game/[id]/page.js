import { notFound } from 'next/navigation';
import db from '@/lib/db';
import GameDetailsView from '@/components/game/GameDetailsView';

export async function generateMetadata({ params }) {
  const p = await params;
  const { rows } = await db.query(`SELECT name, cover_image, description FROM games WHERE id = $1 LIMIT 1`, [parseInt(p.id)]);
  if (!rows[0]) return { title: 'Game Not Found' };
  
  const game = rows[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const desc = game.description ? game.description.substring(0, 155) + '...' : `Download ${game.name} for free on GameZync.`;
  
  return {
    title: `${game.name} - GameZync`,
    description: desc,
    openGraph: {
      title: `${game.name} - Free PC Download`,
      description: desc,
      url: `${siteUrl}/game/${p.id}`,
      images: game.cover_image ? [{ url: game.cover_image }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} - Free PC Download`,
      description: desc,
      images: game.cover_image ? [game.cover_image] : [],
    },
    alternates: {
      canonical: `/game/${p.id}`,
    }
  };
}

export default async function GameDetails({ params }) {
  const p = await params;
  const gameId = parseInt(p.id);

  // Single query: game + joined categories
  const { rows } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) AS category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    WHERE g.id = $1
    GROUP BY g.id
  `, [gameId]);

  const game = rows[0];
  if (!game) notFound();

  // Fetch category icons from categories database table + getCategoryData fallback
  let catDbMap = {};
  try {
    const { rows: dbCats } = await db.query(`SELECT * FROM categories`);
    dbCats.forEach(c => {
      if (c.name) {
        catDbMap[c.name.trim().toLowerCase()] = c.icon || c.icon_class;
      }
    });
  } catch (err) {
    // Fallback gracefully
  }

  const { getCategoryData } = await import('@/lib/categoryData');
  const categoryNames = game.category ? game.category.split(',').map(c => c.trim()).filter(Boolean) : [];
  const categoryList = categoryNames.map(name => {
    const dbIcon = catDbMap[name.toLowerCase()];
    const defaultData = getCategoryData(name);
    return {
      name,
      icon_class: dbIcon || defaultData.icon || 'fa-solid fa-tags'
    };
  });

  const gameData = {
    ...game,
    categoryList
  };

  // Increment view count fire-and-forget (non-blocking — page loads instantly)
  db.query(`UPDATE games SET views = views + 1 WHERE id = $1`, [gameId]).catch(() => {});

  // Suggested games — fetch 5 games for laptop 5-column layout
  const { rows: suggestedGamesData } = await db.query(`
    SELECT id, name, cover_image, category, release_year
    FROM games
    WHERE id != $1 AND status = 'published'
    ORDER BY created_at DESC
    LIMIT 5
  `, [gameId]);

  const suggestedGames = suggestedGamesData.map(g => ({
    ...g,
    img: g.cover_image
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.name,
    "description": game.description || `Download ${game.name}`,
    "image": game.cover_image || "",
    "gamePlatform": game.os || "PC",
    "applicationCategory": "Game",
    "genre": game.category,
    "datePublished": game.release_year ? `${game.release_year}` : undefined,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GameDetailsView game={gameData} suggestedGames={suggestedGames} />
    </>
  );
}
