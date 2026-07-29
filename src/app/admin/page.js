import nextDynamic from 'next/dynamic';
import os from 'os';
import { query } from '@/lib/db';

const DashboardQuickActions = nextDynamic(() => import('@/components/admin/dashboard/DashboardQuickActions'), { loading: () => <div className="p-4 text-center">Loading Actions...</div> });
const DashboardSystemHealth = nextDynamic(() => import('@/components/admin/dashboard/DashboardSystemHealth'), { loading: () => <div className="p-4 text-center">Loading System...</div> });
const DashboardAnalytics = nextDynamic(() => import('@/components/admin/dashboard/DashboardAnalytics'), { loading: () => <div className="p-4 text-center">Loading Analytics...</div> });

export const metadata = { title: 'Dashboard - Admin Panel' };
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let totalGames = 0;
  let totalInstant = 0;
  let totalRequests = 0;
  let totalMessages = 0;
  let featuredGames = 0;
  let categories = [];

  try {
    const { rows } = await query(`SELECT COUNT(*) as count FROM games`);
    totalGames = parseInt(rows[0]?.count || 0);
  } catch (e) {}

  try {
    const { rows } = await query(`SELECT COUNT(*) as count FROM instant_games`);
    totalInstant = parseInt(rows[0]?.count || 0);
  } catch (e) {}

  try {
    const { rows } = await query(`SELECT COUNT(*) as count FROM game_requests`);
    totalRequests = parseInt(rows[0]?.count || 0);
  } catch (e) {}

  try {
    const { rows } = await query(`SELECT COUNT(*) as count FROM contact_messages`);
    totalMessages = parseInt(rows[0]?.count || 0);
  } catch (e) {}

  try {
    const { rows } = await query(`SELECT COUNT(*) as count FROM games WHERE is_featured = 1`);
    featuredGames = parseInt(rows[0]?.count || 0);
  } catch (e) {}

  try {
    const { rows } = await query(`SELECT id, name FROM categories ORDER BY name ASC`);
    categories = rows || [];
  } catch (e) {}

  let totalViews = 0;
  let totalDownloads = 0;
  try {
    const { rows } = await query(`SELECT SUM(views) as total_views, SUM(downloads) as total_downloads FROM games`);
    totalViews = parseInt(rows[0]?.total_views || 0);
    totalDownloads = parseInt(rows[0]?.total_downloads || 0);
  } catch (e) {}

  const engagementRate = totalViews > 0 ? parseFloat(((totalDownloads / totalViews) * 100).toFixed(1)) : 0;

  let dbSize = 'Cloud Database (Neon)';
  try {
    const { rows } = await query(`SELECT pg_size_pretty(pg_database_size(current_database())) as size`);
    dbSize = rows[0]?.size || 'Cloud Database';
  } catch(e) {}

  const actionNeeded = [];
  try {
    const { rows: pendingReviews } = await query(`SELECT COUNT(*) as count FROM review_games`);
    const prCount = parseInt(pendingReviews[0]?.count || 0);
    if (prCount > 0) actionNeeded.push({ icon: 'fa-shield-halved', text: `${prCount} Games Pending Review`, link: '/admin/reviews' });

    const { rows: unreadMsgs } = await query(`SELECT COUNT(*) as count FROM contact_messages WHERE status IS NULL OR status = 'unread'`);
    const umCount = parseInt(unreadMsgs[0]?.count || 0);
    if (umCount > 0) actionNeeded.push({ icon: 'fa-envelope', text: `${umCount} Unread Messages`, link: '/admin/reviews' });

    const { rows: unreadReqs } = await query(`SELECT COUNT(*) as count FROM game_requests WHERE status IS NULL OR status = 'unread'`);
    const urCount = parseInt(unreadReqs[0]?.count || 0);
    if (urCount > 0) actionNeeded.push({ icon: 'fa-bullhorn', text: `${urCount} Unread Game Requests`, link: '/admin/reviews' });
  } catch(e) {}

  return (
    <div className="container-fluid" style={{ padding: '20px', color: '#cbd5e1' }}>
      <DashboardQuickActions actionNeeded={actionNeeded} categories={categories} />

      <div className="row g-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <DashboardAnalytics 
          totalGames={totalGames}
          totalInstant={totalInstant}
          featuredGames={featuredGames}
          totalRequests={totalRequests}
          engagementRate={engagementRate}
        />
        <DashboardSystemHealth dbSize={dbSize} />
      </div>
    </div>
  );
}
