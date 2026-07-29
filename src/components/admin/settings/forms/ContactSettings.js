export default function ContactSettings({ settings, handleChange }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', background: 'rgba(0,0,0,0.15)' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
        <h5 className="m-0 text-white" style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '0.3px' }}><i className="fa-solid fa-envelope-open-text text-success me-3"></i> Contact Information</h5>
      </div>
      <div style={{ padding: '32px' }}>
        <div style={{ maxWidth: '600px' }}>
          <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Contact Email</label>
          <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>The primary public-facing email address for your users to reach out to.</p>
          <input type="email" className="form-control bg-dark text-white border-secondary" name="contact_email" value={settings?.contact_email || ''} onChange={handleChange} style={{ padding: '14px 18px', borderRadius: '10px', fontSize: '15px', width: '100%' }} />
        </div>
      </div>
    </div>
  );
}
