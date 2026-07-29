import LowEndDashboardView from '../../components/dashboards/LowEndDashboardView';
import db from '@/lib/db';
import { isLowEndGame } from '@/lib/gameTierUtils';

export const metadata = {
  title: 'Low-End PC Games (8 GB RAM & Under)',
  description: 'Download the best PC games for low-end laptops and computers requiring 8 GB RAM or less.',
  alternates: {
    canonical: '/low-end',
  }
};

export default async function LowEndGames() {
  const { rows: games } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    WHERE g.status = 'published'
    GROUP BY g.id
    ORDER BY g.views DESC
  `);

  const lowEndGames = games.filter(isLowEndGame);

  return (
    <div style={{ padding: '20px 0' }}>
      <LowEndDashboardView allGames={lowEndGames} />
    </div>
  );
}
