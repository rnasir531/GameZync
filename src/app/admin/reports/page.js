import { query } from '@/lib/db';
import ReportsView from '@/components/admin/ReportsView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminReportsPage() {
  let reports = [];
  try {
    const { rows } = await query(`
      SELECT r.id, r.game_id, r.user_ip, r.report_date, r.status, COALESCE(g.name, 'Unknown Game') as game_name
      FROM dead_link_reports r
      LEFT JOIN games g ON r.game_id = g.id
      ORDER BY r.report_date DESC
    `);
    reports = rows || [];
  } catch (err) {
    console.error("AdminReportsPage Error:", err);
  }

  return <ReportsView initialReports={reports} />;
}
