export default function AdsSettingsForm({ settings, handleChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="alert alert-info d-flex align-items-center" style={{ background: 'rgba(13, 110, 253, 0.1)', border: '1px solid rgba(13, 110, 253, 0.2)', color: '#6ea8fe', padding: '16px 20px', borderRadius: '10px' }}>
        <i className="fa-solid fa-circle-info fs-4 me-3"></i>
        <span>Paste your Google AdSense or other ad network HTML/JS code snippets below. Leave blank to disable ads in that specific location.</span>
      </div>

      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Header Ad Snippet</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Displays at the top of the page, below the navigation bar.</p>
        <textarea className="form-control bg-dark text-white border-secondary text-monospace" name="ad_header" rows="4" value={settings?.ad_header || ''} onChange={handleChange} placeholder="<script>...</script>" style={{ padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}></textarea>
      </div>
      
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Sidebar Ad Snippet</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Displays in the vertical sidebar alongside the games grid or article content.</p>
        <textarea className="form-control bg-dark text-white border-secondary text-monospace" name="ad_sidebar" rows="4" value={settings?.ad_sidebar || ''} onChange={handleChange} placeholder="<script>...</script>" style={{ padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}></textarea>
      </div>

      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Footer Ad Snippet</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Displays at the bottom of the page, just above the site footer.</p>
        <textarea className="form-control bg-dark text-white border-secondary text-monospace" name="ad_footer" rows="4" value={settings?.ad_footer || ''} onChange={handleChange} placeholder="<script>...</script>" style={{ padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}></textarea>
      </div>
    </div>
  );
}
