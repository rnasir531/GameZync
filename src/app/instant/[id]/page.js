import { notFound, redirect } from 'next/navigation';
import InstantGameDetailView from '@/components/instant/InstantGameDetailView';
import { slugify } from '@/lib/slug';
import { fetchInstantGameByParam, fetchAllInstantGames } from '@/services/instantGameService';
import { SITE_NAME } from '@/config/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const game = await fetchInstantGameByParam(id);
  if (!game) return { title: 'Game Not Found' };

  return {
    title: `${game.title} - Play Instant Online Game | ${SITE_NAME}`,
    description: game.description || `Play ${game.title} online for free instantly on ${SITE_NAME}.`,
  };
}

export default async function InstantGameDetailPage({ params }) {
  const { id } = await params;

  const [activeGame, allGames] = await Promise.all([
    fetchInstantGameByParam(id),
    fetchAllInstantGames(),
  ]);

  if (!activeGame) notFound();

  const cleanSlug = slugify(activeGame.title);
  const cleanParam = decodeURIComponent(id).toLowerCase().trim();
  if (cleanSlug && cleanParam !== cleanSlug) {
    redirect(`/instant/${cleanSlug}`);
  }

  return <InstantGameDetailView activeGame={activeGame} allGames={allGames} />;
}
