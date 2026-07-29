import { query } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamesync.vercel.app';

  const staticRoutes = ['', '/library', '/instant', '/high-end', '/low-end', '/torrent-games', '/system-matcher', '/submit-game'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const { rows: games } = await query(`
      SELECT id, created_at 
      FROM games 
      WHERE status = 'published'
    `);

    const gameUrls = (games || []).map((game) => ({
      url: `${baseUrl}/game/${game.id}`,
      lastModified: game.created_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...gameUrls];
  } catch (error) {
    console.error("Sitemap DB Query Handled:", error.message);
    return staticRoutes;
  }
}
