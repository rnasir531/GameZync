export default function EmailSettingsForm({ settings, handleChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">SMTP Host</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>The hostname of your outgoing email server (e.g., smtp.gmail.com).</p>
        <input type="text" className="form-control bg-dark text-white border-secondary" name="smtp_host" value={settings?.smtp_host || ''} onChange={handleChange} placeholder="smtp.gmail.com" style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">SMTP Port</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>The port used by your SMTP server (usually 587 or 465).</p>
        <input type="number" className="form-control bg-dark text-white border-secondary" name="smtp_port" value={settings?.smtp_port || ''} onChange={handleChange} placeholder="587" style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">SMTP Username</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>The email address or username used to authenticate.</p>
        <input type="text" className="form-control bg-dark text-white border-secondary" name="smtp_user" value={settings?.smtp_user || ''} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">SMTP Password</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Your email password or App Password.</p>
        <input type="password" className="form-control bg-dark text-white border-secondary" name="smtp_pass" value={settings?.smtp_pass || ''} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
    </div>
  );
}
