export default function SocialSettingsForm({ settings, handleChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-3 d-flex align-items-center"><i className="fa-brands fa-facebook text-primary fs-5 me-2"></i> Facebook URL</label>
        <input type="url" className="form-control bg-dark text-white border-secondary" name="social_facebook" value={settings?.social_facebook || ''} onChange={handleChange} placeholder="https://facebook.com/..." style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-3 d-flex align-items-center"><i className="fa-brands fa-youtube text-danger fs-5 me-2"></i> YouTube Channel</label>
        <input type="url" className="form-control bg-dark text-white border-secondary" name="social_youtube" value={settings?.social_youtube || ''} onChange={handleChange} placeholder="https://youtube.com/..." style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-3 d-flex align-items-center"><i className="fa-brands fa-tiktok text-white fs-5 me-2"></i> TikTok Profile</label>
        <input type="url" className="form-control bg-dark text-white border-secondary" name="social_tiktok" value={settings?.social_tiktok || ''} onChange={handleChange} placeholder="https://tiktok.com/@..." style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-3 d-flex align-items-center"><i className="fa-brands fa-github text-white fs-5 me-2"></i> GitHub Profile</label>
        <input type="url" className="form-control bg-dark text-white border-secondary" name="social_github" value={settings?.social_github || ''} onChange={handleChange} placeholder="https://github.com/..." style={{ padding: '12px 16px', borderRadius: '8px' }} />
      </div>
    </div>
  );
}
