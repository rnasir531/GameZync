export default function SystemSpecsForm({
  scanState,
  specs,
  isFinding,
  handleScan,
  rescan,
  findGames
}) {
  return (
    <form id="systemMatcherForm" onSubmit={findGames}>
      {scanState === 'empty' && (
        <div id="matcherEmptyState" className="scanner-console">
          <div className="scanner-content">
            <div className="scanner-ring">
              <i className="fa-solid fa-satellite-dish pulse-icon"></i>
            </div>
            <h4 className="scanner-title">Hardware Scanner</h4>
            <p className="scanner-text">
              We securely scan your system to recommend games that will run perfectly. Detection includes:
            </p>
            <div className="scanner-highlights">
              <span className="scan-badge"><i className="fa-brands fa-windows"></i> OS</span>
              <span className="scan-badge"><i className="fa-solid fa-microchip"></i> CPU</span>
              <span className="scan-badge"><i className="fa-solid fa-vr-cardboard"></i> GPU</span>
              <span className="scan-badge"><i className="fa-solid fa-memory"></i> RAM</span>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="scanner-btn" onClick={handleScan}>
                <i className="fa-solid fa-radar"></i> INITIATE PC SCAN
              </button>
            </div>
          </div>
        </div>
      )}

      {scanState === 'scanning' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
          <h4>Detecting Hardware...</h4>
          <p style={{ color: 'var(--text-muted)' }}>Querying WebGL context and system navigator...</p>
        </div>
      )}

      {scanState === 'detected' && (
        <div id="matcherDetectedState">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
              <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '1.8rem', color: '#10b981' }}></i>
              <h4 style={{ color: 'var(--text-color)', fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: 0 }}>Scan Complete</h4>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Hardware detected successfully.</p>
          </div>
          
          <div className="compact-specs-panel">
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-brands fa-windows"></i></div>
              <div className="spec-info">
                <span className="spec-label">OS</span>
                <span className="spec-value" title="Windows OS">{specs.os_raw || specs.os || 'Windows 10/11 64-bit'}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-solid fa-microchip"></i></div>
              <div className="spec-info">
                <span className="spec-label">Processor</span>
                <span className="spec-value" title="CPU">{specs.processor_raw || specs.processor || 'Intel Core i5-6200U @ 2.30GHz'}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-solid fa-vr-cardboard"></i></div>
              <div className="spec-info">
                <span className="spec-label">Graphics</span>
                <span className="spec-value" title="GPU">{specs.graphics_raw || specs.graphics || 'Intel(R) HD Graphics 520'}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-solid fa-memory"></i></div>
              <div className="spec-info">
                <span className="spec-label">Memory</span>
                <span className="spec-value" title="RAM">{specs.ram_raw || (specs.ram ? `${specs.ram} GB` : '16 GB')}</span>
              </div>
            </div>
          </div>

          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <button type="button" className="matcher-btn" onClick={rescan} style={{ marginTop: 0, background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '12px 25px', borderRadius: '50px', fontSize: '0.95rem' }}>
              <i className="fa-solid fa-rotate-right me-2"></i> Rescan
            </button>
            <button type="submit" className="matcher-btn" disabled={isFinding} style={{ marginTop: 0, background: 'var(--text-color)', color: 'var(--card-bg)', padding: '12px 25px', borderRadius: '50px', fontSize: '0.95rem' }}>
              {isFinding ? <i className="fa-solid fa-spinner fa-spin me-2"></i> : <i className="fa-solid fa-search me-2"></i>} Find Games
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
