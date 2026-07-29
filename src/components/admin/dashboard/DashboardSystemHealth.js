import os from 'os';

export default function DashboardSystemHealth({ dbSize }) {
  return (
    <div className="dashboard-panel h-100" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-layer-group" style={{ color: '#0d6efd' }}></i> Tech Stack
        </h4>
      </div>
      <table className="table table-sm mb-0" style={{ fontSize: '14px' }}>
        <tbody>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-brands fa-node-js me-2" style={{ color: 'var(--primary-color)' }}></i> Backend</td>
            <td className="px-3 py-2 text-end fw-bold text-white">Node.js {process.version}</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-brands fa-react me-2" style={{ color: 'var(--primary-color)' }}></i> Frontend</td>
            <td className="px-3 py-2 text-end fw-bold text-white">Next.js 15 (React)</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-server me-2" style={{ color: 'var(--primary-color)' }}></i> Database</td>
            <td className="px-3 py-2 text-end fw-bold text-white">Neon PostgreSQL (Cloud)</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-microchip me-2" style={{ color: 'var(--primary-color)' }}></i> Server</td>
            <td className="px-3 py-2 text-end fw-bold text-white">{os.type()}</td>
          </tr>
          <tr>
            <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-code-branch me-2" style={{ color: 'var(--primary-color)' }}></i> CMS</td>
            <td className="px-3 py-2 text-end fw-bold text-white">GameZync Pro v2.0</td>
          </tr>
          <tr>
            <td className="px-3 py-2 border-bottom-0" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-shield-halved me-2" style={{ color: 'var(--primary-color)' }}></i> Status</td>
            <td className="px-3 py-2 text-end fw-bold border-bottom-0 text-success"><i className="fa-solid fa-check me-1"></i> Operational</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
