import { notFound, redirect } from 'next/navigation';
import GameDetailsView from '@/components/game/GameDetailsView';
import { slugify } from '@/lib/slug';
import { fetchGameByParam, getSuggestedGames, getEnrichedGame, trackView } from '@/services/gameService';
import { SITE_NAME, SITE_URL } from '@/config/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const p = await params;
  const game = await fetchGameByParam(p.id);
  if (!game) return { title: 'Game Not Found' };

  const desc = game.description
    ? game.description.substring(0, 155) + '...'
    : `Download ${game.name} for free on ${SITE_NAME}.`;
  const cleanSlug = slugify(game.name);

  return {
    title: `${game.name} - ${SITE_NAME}`,
    description: desc,
    openGraph: {
      title: `${game.name} - Free PC Download`,
      description: desc,
      url: `${SITE_URL}/game/${cleanSlug || game.id}`,
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
      canonical: `/game/${cleanSlug || game.id}`,
    },
  };
}

export default async function GameDetails({ params }) {
  const p = await params;
  const game = await fetchGameByParam(p.id);
  if (!game) notFound();

  const cleanSlug = slugify(game.name);
  if (cleanSlug && decodeURIComponent(p.id).toLowerCase() !== cleanSlug) {
    redirect(`/game/${cleanSlug}`);
  }

  const [gameData, suggestedGames] = await Promise.all([
    getEnrichedGame(game),
    getSuggestedGames(game.id),
  ]);

  trackView(game.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: game.description || `Download ${game.name}`,
    image: game.cover_image || '',
    gamePlatform: game.os || 'PC',
    applicationCategory: 'Game',
    genre: game.category,
    datePublished: game.release_year ? `${game.release_year}` : undefined,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GameDetailsView game={gameData} suggestedGames={suggestedGames} />
    </>
  );
}
