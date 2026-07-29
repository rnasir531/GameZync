import LogsTable from '@/components/admin/logs/LogsTable';
import pool from '@/lib/db';

export const metadata = { title: 'Activity Logs - Admin Panel' };
export const revalidate = 0;

export default async function AdminLogsPage() {
  const { rows: logs } = await pool.query(`
    SELECT al.*, au.username as admin_username
    FROM activity_logs al
    LEFT JOIN admin_users au ON al.admin_id = au.id
    ORDER BY al.created_at DESC
    LIMIT 100
  `);

  // Map to match the expected shape (log.admin.username)
  const logsWithAdmin = logs.map(l => ({
    ...l,
    admin: l.admin_username ? { username: l.admin_username } : null
  }));

  return (
    <div className="container-fluid p-0">
      <div className="dashboard-panel" style={{ color: '#cbd5e1', padding: '24px' }}>
        <div className="card-header mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', width: '100%' }}>
          <h4 className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <i className="fa-solid fa-history me-2"></i> Activity Logs
          </h4>
        </div>
        <div className="table-responsive">
          <LogsTable logs={logsWithAdmin} />
        </div>
      </div>
    </div>
  );
}
