export default function SEOSettingsForm({ settings, handleChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Google Analytics ID</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Your Measurement ID (e.g., G-XXXXXXXXXX) to track website traffic.</p>
        <input type="text" className="form-control bg-dark text-white border-secondary" name="google_analytics_id" value={settings?.google_analytics_id || ''} onChange={handleChange} placeholder="G-XXXXXXXXXX" style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
    </div>
  );
}
