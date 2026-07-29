import TorrentDashboardView from '../../components/dashboards/TorrentDashboardView';
import db from '@/lib/db';

export const metadata = {
  title: 'PC Games Torrent Downloads',
  description: 'Download full PC games for free via direct high-speed torrent links. Fast, secure, and updated daily.',
  alternates: {
    canonical: '/torrent-games',
  }
};

export default async function TorrentGames() {
  const { rows: games } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    WHERE g.status = 'published' AND g.torrent_link IS NOT NULL AND g.torrent_link != ''
    GROUP BY g.id
    ORDER BY g.views DESC
  `);

  return (
    <div style={{ padding: '20px 0' }}>
      <TorrentDashboardView allGames={games} />
    </div>
  );
}
