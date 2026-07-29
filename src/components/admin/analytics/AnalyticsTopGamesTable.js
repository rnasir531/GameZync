'use client'; // Keeping interactivity possibility

export default function AnalyticsTopGamesTable({ topGames }) {
  return (
    <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Top 50 Performing Games</h4>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-hover align-middle mb-0" style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr>
              <th className="px-3 py-2" style={{ color: 'var(--text-muted)' }}>Rank</th>
              <th className="px-3 py-2" style={{ color: 'var(--text-muted)' }}>Game Title</th>
              <th className="px-3 py-2" style={{ color: 'var(--text-muted)' }}>Category</th>
              <th className="px-3 py-2 text-end" style={{ color: 'var(--text-muted)' }}>Views</th>
              <th className="px-3 py-2 text-end" style={{ color: 'var(--text-muted)' }}>Downloads</th>
            </tr>
          </thead>
          <tbody>
            {topGames.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">No data available yet</td>
              </tr>
            ) : (
              topGames.map((game, index) => (
                <tr key={game.id}>
                  <td className="px-3 py-2">
                    <span className="badge bg-secondary" style={{ padding: '4px 8px', borderRadius: '6px' }}>#{index + 1}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-controller text-muted"></i>
                      <span className="fw-bold text-white">{game.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-muted">{game.category}</td>
                  <td className="px-3 py-2 text-end fw-bold text-primary">{game.views.toLocaleString()}</td>
                  <td className="px-3 py-2 text-end fw-bold text-success">{game.downloads.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
