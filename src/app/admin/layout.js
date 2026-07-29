import AdminSidebar from '@/components/admin/AdminSidebar';
import '@/app/css/admin/admin-style.css';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';

import AdminTopbarActions from '@/components/admin/AdminTopbarActions';

export const metadata = {
  title: 'GameZync Admin Panel',
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');
import { query } from '@/lib/db';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  
  let displayName = 'Admin';
  let avatarUrl = "https://ui-avatars.com/api/?name=Admin&background=00ADB5&color=fff&rounded=true&bold=true";
  let userRole = 1;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.fname || payload.lname) {
        displayName = `${payload.fname || ''} ${payload.lname || ''}`.trim();
      } else if (payload.username) {
        displayName = payload.username;
      }
      userRole = payload.role || 1;
      avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=00ADB5&color=fff&rounded=true&bold=true`;
    } catch (e) {
      console.error("Invalid token in layout");
    }
  }

  // Fetch notifications for topbar
  const notifs = [];
  try {
    const { rows: reqRows } = await query(`SELECT COUNT(*) as count FROM game_requests WHERE status IS NULL OR status = 'unread'`);
    const reqCount = parseInt(reqRows[0]?.count || 0);
    if (reqCount > 0) notifs.push({ text: `${reqCount} New Game Requests`, link: '/admin/reviews' });

    const { rows: revRows } = await query(`SELECT COUNT(*) as count FROM review_games`);
    const revCount = parseInt(revRows[0]?.count || 0);
    if (revCount > 0) notifs.push({ text: `${revCount} Games Pending Review`, link: '/admin/reviews' });
    
    const { rows: msgRows } = await query(`SELECT COUNT(*) as count FROM contact_messages WHERE status IS NULL OR status = 'unread'`);
    const msgCount = parseInt(msgRows[0]?.count || 0);
    if (msgCount > 0) notifs.push({ text: `${msgCount} Unread Messages`, link: '/admin/reviews' });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="admin-layout-wrapper">
      <header className="topbar">
        <Link href="/admin" className="logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span className="ns-logo-mark" style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', borderRadius: '12px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: '900' }}>GZ</span>
            </span>
            <span className="ns-logo-text" style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#fff' }}>GAME</span>
              <span style={{ color: '#10b981' }}>ZYNC</span> 
              <span style={{ fontWeight: '700', fontSize: '10.5px', padding: '2px 8px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '8px' }}>ADMIN</span>
            </span>
        </Link>
        <AdminTopbarActions displayName={displayName} avatarUrl={avatarUrl} notifs={notifs} />
      </header>
      
      <AdminSidebar userRole={userRole} />
      
      <main className="main-content" id="spa-content">
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
}
