export default function DashboardStaffOverview({ totalAdmins, totalMessages, recentLogs }) {
  return (
    <div className="dashboard-panel h-100" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-users-gear" style={{ color: 'var(--primary-color)' }}></i> Administration
        </h4>
      </div>
      
      <table className="table table-sm mb-0" style={{ fontSize: '14px' }}>
        <tbody>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-user-shield me-2"></i> Admin Accounts</td>
            <td className="px-3 py-2 text-end fw-bold text-white">{totalAdmins.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="px-3 py-2 border-bottom-0" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-envelope-open-text me-2"></i> Contact Messages</td>
            <td className="px-3 py-2 text-end fw-bold border-bottom-0 text-white">{totalMessages.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ background: 'rgba(0,0,0,0.1)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: 'var(--text-color)' }}>Recent Activity</h5>
        </div>
        {recentLogs.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', padding: '16px 20px', margin: 0 }}>No recent activity.</p>
        ) : (
          <div style={{ padding: '10px 20px' }}>
            {recentLogs.map((log, idx) => (
              <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: idx !== recentLogs.length - 1 ? '10px' : 0, paddingBottom: idx !== recentLogs.length - 1 ? '10px' : 0, borderBottom: idx !== recentLogs.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none' }}>
                <i className="fa-solid fa-circle-user" style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '14px' }}></i>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-color)', lineHeight: 1.4 }}>
                    <strong className="text-white">{log.admin?.username || 'System'}</strong> {log.action}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {new Date(log.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
