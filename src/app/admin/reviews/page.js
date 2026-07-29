import ReviewsTabsClient from '@/components/admin/views/ReviewsTabsClient';
import { query } from '@/lib/db';

export const metadata = { title: 'User Inputs & Reviews - Admin Panel' };

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  let requests = [];
  let messages = [];
  let reviewsRaw = [];
  let categories = [];

  try {
    const reqRes = await query(`SELECT * FROM game_requests ORDER BY created_at DESC`);
    requests = reqRes.rows || [];
  } catch (e) {
    console.error("Error fetching game_requests:", e);
  }

  try {
    const msgRes = await query(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
    messages = msgRes.rows || [];
  } catch (e) {
    console.error("Error fetching contact_messages:", e);
  }

  try {
    const revRes = await query(`
      SELECT rg.*, 
        COALESCE(
          json_agg(json_build_object('category_id', rgc.category_id, 'game_id', rgc.game_id)) 
          FILTER (WHERE rgc.game_id IS NOT NULL), '[]'
        ) as "reviewGameCategories"
      FROM review_games rg
      LEFT JOIN review_game_categories rgc ON rg.id = rgc.game_id
      GROUP BY rg.id
      ORDER BY rg.created_at DESC
    `);
    reviewsRaw = revRes.rows || [];
  } catch (e) {
    console.error("Error fetching review_games:", e);
  }

  try {
    const catRes = await query(`SELECT * FROM categories ORDER BY name ASC`);
    categories = catRes.rows || [];
  } catch (e) {
    console.error("Error fetching categories:", e);
  }

  const unreadRequestsCount = requests.filter(r => r.status === 'unread' || !r.status).length;
  const unreadMessagesCount = messages.filter(m => m.status === 'unread' || !m.status).length;

  return (
    <ReviewsTabsClient 
      requests={requests} 
      messages={messages} 
      reviews={reviewsRaw}
      categories={categories}
      unreadRequestsCount={unreadRequestsCount}
      unreadMessagesCount={unreadMessagesCount}
    />
  );
}
