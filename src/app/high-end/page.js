import HighEndDashboardView from '../../components/dashboards/HighEndDashboardView';
import db from '@/lib/db';
import { isHighEndGame } from '@/lib/gameTierUtils';

export const metadata = {
  title: 'High-End PC Games (Above 8 GB RAM)',
  description: 'Discover the best graphics-intensive, high-end PC games requiring more than 8 GB RAM.',
  alternates: {
    canonical: '/high-end',
  }
};

export default async function HighEndGames() {
  const { rows: games } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    WHERE g.status = 'published'
    GROUP BY g.id
    ORDER BY g.views DESC
  `);

  const highEndGames = games.filter(isHighEndGame);

  return (
    <div style={{ padding: '20px 0' }}>
      <HighEndDashboardView allGames={highEndGames} />
    </div>
  );
}
