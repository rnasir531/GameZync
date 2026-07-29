import AnalyticsStats from '@/components/admin/analytics/AnalyticsStats';
import AnalyticsTopGamesTable from '@/components/admin/analytics/AnalyticsTopGamesTable';

import prisma from '@/lib/prisma';

export const metadata = { title: 'Website Analytics - Admin Panel' };

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  // Aggregate total views and downloads for games
  const aggregations = await prisma.game.aggregate({
    _sum: {
      views: true,
      downloads: true,
    }
  });

  const totalViews = aggregations._sum.views || 0;
  const totalDownloads = aggregations._sum.downloads || 0;

  // Fetch all other counts
  const totalGames = await prisma.game.count();
  const totalInstantGames = await prisma.instantGame.count();
  const totalUpcomingGames = await prisma.upcomingGame.count();
  const totalCategories = await prisma.category.count();
  const totalUsers = await prisma.adminUser.count();
  const totalRequests = await prisma.requestGame.count();
  const totalReviews = await prisma.reviewGame.count();
  const totalMessages = await prisma.contactMessage.count();

  // Revenue Calculation (Google AdSense Formula Estimation)
  const oldestGame = await prisma.game.findFirst({
    orderBy: { created_at: 'asc' },
  });

  let activeDays = 1;
  if (oldestGame && oldestGame.created_at) {
    const msDiff = new Date() - new Date(oldestGame.created_at);
    const daysDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    if (daysDiff > 0) activeDays = daysDiff;
  }

  const RPM = 3.50; // Average gaming niche RPM = $3.50 per 1000 impressions (views)
  const totalRevenue = (totalViews / 1000) * RPM;
  const avgDailyViews = totalViews / activeDays;
  const dailyEarning = (avgDailyViews / 1000) * RPM;

  const stats = {
    totalViews,
    totalDownloads,
    totalGames,
    totalInstantGames,
    totalUpcomingGames,
    totalCategories,
    totalUsers,
    totalRequests,
    totalReviews,
    totalMessages,
    totalRevenue,
    dailyEarning,
    RPM
  };

  // Fetch top 50 games by views (or downloads)
  const topGames = await prisma.game.findMany({
    take: 50,
    orderBy: { views: 'desc' },
    select: {
      id: true,
      name: true,
      category: true,
      views: true,
      downloads: true
    }
  });

  return (
    <div className="container-fluid" style={{ padding: '20px', color: '#cbd5e1' }}>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
        <h2 className="h3 fw-bold mb-0" style={{ fontSize: '24px' }}>Website Analytics</h2>
      </div>

      <AnalyticsStats stats={stats} />
      
      <AnalyticsTopGamesTable topGames={topGames} />
    </div>
  );
}
