export default function DashboardTopGames({ topGames }) {
  return (
    <div className="dashboard-panel h-100" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-trophy" style={{ color: '#198754' }}></i> Top Performing Games
        </h4>
      </div>
      {topGames.length === 0 ? (
        <p className="text-muted" style={{ padding: '20px' }}>No game data available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm table-hover align-middle mb-0" style={{ width: '100%', fontSize: '14px' }}>
            <thead>
              <tr>
                <th className="px-3 py-2" style={{ color: 'var(--text-muted)' }}>Game Title</th>
                <th className="px-3 py-2 text-end" style={{ color: 'var(--text-muted)' }}>Downloads</th>
                <th className="px-3 py-2 text-end" style={{ color: 'var(--text-muted)' }}>Views</th>
              </tr>
            </thead>
            <tbody>
              {topGames.map((game, idx) => (
                <tr key={game.id}>
                  <td className="px-3 py-2 fw-bold text-white">{game.name}</td>
                  <td className="px-3 py-2 text-end">
                    <span className="badge bg-success bg-opacity-10 text-success" style={{ padding: '4px 8px', fontSize: '12px' }}>
                      <i className="fa-solid fa-download me-1"></i> {game.downloads.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-end">
                    <span className="badge bg-primary bg-opacity-10 text-primary" style={{ padding: '4px 8px', fontSize: '12px' }}>
                      <i className="fa-solid fa-eye me-1"></i> {game.views.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
