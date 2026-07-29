import ScraperClient from '@/components/admin/scraper/ScraperClient';
import pool from '@/lib/db';

export const metadata = {
  title: 'Auto Scraper - NS Games Admin',
};

export default async function ScraperPage() {
  const { rows: categories } = await pool.query('SELECT * FROM categories ORDER BY name ASC');

  return <ScraperClient categories={categories} />;
}
