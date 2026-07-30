import { notFound } from 'next/navigation';
import db from '@/lib/db';
import GameDetailsView from '@/components/game/GameDetailsView';
import { slugify } from '@/lib/slug';

async function fetchGame(paramId) {
  const numericId = parseInt(paramId, 10);
  
  if (!isNaN(numericId) && numericId > 0) {
    const { rows } = await db.query(`
      SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) AS category
      FROM games g
      LEFT JOIN game_categories gc ON g.id = gc.game_id
      LEFT JOIN categories c ON gc.category_id = c.id
      WHERE g.id = $1
      GROUP BY g.id
    `, [numericId]);
    if (rows[0]) return rows[0];
  }

  // Fallback slug match
  const cleanParam = decodeURIComponent(paramId).toLowerCase();
  const { rows: allGames } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) AS category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    GROUP BY g.id
  `);

  return allGames.find(g => {
    const s = slugify(g.name);
    return s === cleanParam || String(g.id) === cleanParam || `${g.id}-${s}` === cleanParam;
  });
}

export async function generateMetadata({ params }) {
  const p = await params;
  const game = await fetchGame(p.id);
  if (!game) return { title: 'Game Not Found' };
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://game-zync.vercel.app';
  const desc = game.description ? game.description.substring(0, 155) + '...' : `Download ${game.name} for free on Gamer's Cafe.`;
  
  return {
    title: `${game.name} - Gamer's Cafe`,
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
  const game = await fetchGame(p.id);
  if (!game) notFound();

  const gameId = game.id;

  let catDbMap = {};
  try {
    const { rows: dbCats } = await db.query(`SELECT * FROM categories`);
    dbCats.forEach(c => {
      if (c.name) {
        catDbMap[c.name.trim().toLowerCase()] = c.icon || c.icon_class;
      }
    });
  } catch (err) {}

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

  db.query(`UPDATE games SET views = views + 1 WHERE id = $1`, [gameId]).catch(() => {});

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
