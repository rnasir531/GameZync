export default function AnalyticsStats({ stats }) {
  const statCards = [
    { title: 'Est. Daily Earning', value: `$${stats.dailyEarning.toFixed(2)}`, icon: 'bi-currency-dollar', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { title: 'Total Est. Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: 'bi-bank', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    { title: 'Total Game Views', value: stats.totalViews.toLocaleString(), icon: 'bi-eye', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { title: 'Total Downloads', value: stats.totalDownloads.toLocaleString(), icon: 'bi-download', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
  ];

  return (
    <div className="row g-4 mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
      {statCards.map((item, idx) => (
        <div key={idx} className="dashboard-panel d-flex align-items-center gap-3" style={{ padding: '24px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', background: item.bg, color: item.color, flexShrink: 0 }}>
            <i className={`bi ${item.icon}`}></i>
          </div>
          <div>
            <h3 className="mb-1 fw-bold text-white" style={{ fontSize: '28px' }}>{item.value}</h3>
            <p className="mb-0 fw-medium" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
