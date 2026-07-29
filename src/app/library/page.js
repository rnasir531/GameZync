import LibraryGamesView from '../../components/library/LibraryGamesView';
import db from '@/lib/db';

export const metadata = {
  title: 'All Games Library',
  description: 'Browse our complete directory of PC games. Filter by category, release year, RAM, and search for your favorite titles.',
  alternates: {
    canonical: '/library',
  }
};

const parseRam = (ramStr) => {
  if (!ramStr) return 0;
  const str = String(ramStr).toLowerCase();
  const val = parseFloat(str);
  if (isNaN(val)) return 0;
  if (str.includes('mb')) return val / 1024;
  return val;
};

export default async function Library({ searchParams }) {
  const params = await searchParams;
  let sort = params?.sort || 'recent';
  if (sort === 'latest') sort = 'recent';
  const view = params?.view || 'cards';
  const q = params?.q || '';
  const category = params?.category || '';
  const year = params?.year || '';
  const ramFilter = params?.ram || '';
  const page = parseInt(params?.page || '1', 10);
  const limit = 20;
  const offset = (page - 1) * limit;
  
  let orderClause = 'ORDER BY g.id DESC';
  if (sort === 'asc') orderClause = 'ORDER BY g.name ASC';
  if (sort === 'desc') orderClause = 'ORDER BY g.name DESC';
  if (sort === 'recent') orderClause = 'ORDER BY g.id DESC';

  let whereClause = "WHERE g.status = 'published'";
  const values = [];
  
  if (q) {
    values.push(`%${q}%`);
    whereClause += ` AND g.name ILIKE $${values.length}`;
  }

  if (category) {
    values.push(`%${category}%`);
    whereClause += ` AND EXISTS (
      SELECT 1 FROM game_categories gc_inner
      JOIN categories c_inner ON gc_inner.category_id = c_inner.id
      WHERE gc_inner.game_id = g.id AND c_inner.name ILIKE $${values.length}
    )`;
  }

  if (year) {
    values.push(year.toString());
    whereClause += ` AND (g.release_year::text = $${values.length})`;
  }

  const { rows: allGames } = await db.query(`
    SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) as category
    FROM games g
    LEFT JOIN game_categories gc ON g.id = gc.game_id
    LEFT JOIN categories c ON gc.category_id = c.id
    ${whereClause}
    GROUP BY g.id
    ${orderClause}
  `, values);

  let filteredGames = allGames;
  if (ramFilter) {
    filteredGames = filteredGames.filter(g => {
      const ram = parseRam(g.ram);
      if (ramFilter === '2') return ram > 0 && ram <= 2;
      if (ramFilter === '4') return ram > 2 && ram <= 4;
      if (ramFilter === '8') return ram > 4 && ram <= 8;
      if (ramFilter === '16') return ram >= 16 && ram < 32;
      if (ramFilter === '32') return ram >= 32;
      return true;
    });
  }

  const totalGames = filteredGames.length;
  const totalPages = Math.max(1, Math.ceil(totalGames / limit));
  const paginatedGames = filteredGames.slice(offset, offset + limit);

  return (
    <LibraryGamesView 
      initialGames={paginatedGames} 
      initialSort={sort} 
      initialView={view} 
      initialCategory={category} 
      initialYear={year}
      initialQ={q} 
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
