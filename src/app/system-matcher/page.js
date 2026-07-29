import SystemMatcherView from '../../components/dashboards/SystemMatcherView';
import db from '@/lib/db';

export const metadata = {
  title: 'Can I Run It? System Matcher - NS Games',
};

export default async function SystemMatcher() {
  const { rows: games } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    WHERE g.status = 'published'
    GROUP BY g.id
    ORDER BY g.views DESC
  `);

  return (
    <div style={{ padding: '20px 0' }}>
      <SystemMatcherView allGames={games} />
    </div>
  );
}
