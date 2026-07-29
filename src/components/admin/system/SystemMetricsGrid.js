export default function SystemMetricsGrid({ sysInfo, dbVersion, dbSize }) {
  return (
    <div>
      <div className="dashboard-panel h-100" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-hard-drive" style={{ color: '#0d6efd' }}></i> Server & Database
          </h4>
        </div>
        <div style={{ flexGrow: 1 }}>
          <table className="table table-sm mb-0" style={{ fontSize: '14px' }}>
            <tbody>
              <tr>
                <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-desktop me-2"></i>OS</td>
                <td className="px-3 py-2 text-end fw-bold text-white">{sysInfo.os}</td>
              </tr>
              <tr>
                <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-brands fa-node-js me-2 text-success"></i>Node.js</td>
                <td className="px-3 py-2 text-end fw-bold text-white">{sysInfo.node_version}</td>
              </tr>
              <tr>
                <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-memory me-2 text-primary"></i>Memory (Free)</td>
                <td className="px-3 py-2 text-end fw-bold text-white">{sysInfo.memory_free} / {sysInfo.memory_total}</td>
              </tr>
              <tr>
                <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-microchip me-2 text-info"></i>CPUs</td>
                <td className="px-3 py-2 text-end fw-bold text-white">{sysInfo.cpus} Logical Cores</td>
              </tr>
              <tr>
                <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-database me-2 text-warning"></i>PostgreSQL</td>
                <td className="px-3 py-2 text-end fw-bold text-success"><i className="fa-solid fa-check-circle me-1"></i> Connected</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-bottom-0" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-weight-scale me-2 text-secondary"></i>DB Size</td>
                <td className="px-3 py-2 text-end fw-bold border-bottom-0 text-white">{dbSize}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderTop: '1px solid var(--border-color)', padding: '15px 20px', textAlign: 'center' }}>
          <a href="/api/admin/system/backup" className="btn btn-sm btn-success fw-bold px-3 py-2" target="_blank" style={{ borderRadius: '8px', width: '100%' }}>
            <i className="fa-solid fa-download me-2"></i> JSON Backup
          </a>
        </div>
      </div>
    </div>
  );
}
