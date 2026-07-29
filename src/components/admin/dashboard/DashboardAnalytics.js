export default function DashboardAnalytics({ 
  totalGames, 
  totalInstant, 
  featuredGames, 
  totalRequests, 
  engagementRate 
}) {
  return (
    <div className="dashboard-panel h-100" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-chart-pie" style={{ color: '#ffc107' }}></i> Platform Analytics
        </h4>
      </div>
      <table className="table table-sm mb-0" style={{ fontSize: '14px' }}>
        <tbody>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-gamepad me-2" style={{ color: 'var(--primary-color)' }}></i> Total Games</td>
            <td className="px-3 py-2 text-end fw-bold text-white">{totalGames.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-bolt me-2" style={{ color: 'var(--primary-color)' }}></i> Instant Games</td>
            <td className="px-3 py-2 text-end fw-bold text-white">{totalInstant.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-star me-2" style={{ color: 'var(--primary-color)' }}></i> Featured Games</td>
            <td className="px-3 py-2 text-end fw-bold text-white">{featuredGames.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-bullhorn me-2" style={{ color: 'var(--primary-color)' }}></i> Game Requests</td>
            <td className="px-3 py-2 text-end fw-bold text-white">{totalRequests.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="px-3 py-2 border-bottom-0" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-chart-line me-2" style={{ color: 'var(--primary-color)' }}></i> Engagement Rate</td>
            <td className="px-3 py-2 text-end fw-bold border-bottom-0 text-success">{engagementRate}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
