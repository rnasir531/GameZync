export default function SeoSettings({
  settings,
  handleChange,
  handleFileUpload,
  uploadingOgImage,
  gridContainerStyle,
  leftPanelStyle,
  rightPanelStyle
}) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', background: 'var(--panel-bg, #111)' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
        <h5 className="m-0 text-white" style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '0.3px' }}><i className="fa-solid fa-share-nodes text-info me-3"></i> Social Media Sharing & Meta</h5>
      </div>
      
      <div style={gridContainerStyle}>
        {/* Inputs Panel */}
        <div style={leftPanelStyle}>
          <div>
            <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Global Meta Keywords</label>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>Comma-separated keywords for SEO (e.g., pc games, download, free games).</p>
            <textarea className="form-control bg-dark text-white border-secondary" name="seo_keywords" rows="3" value={settings?.seo_keywords || ''} onChange={handleChange} placeholder="pc games, download games, free games..." style={{ padding: '14px 18px', borderRadius: '10px', resize: 'none', fontSize: '15px', width: '100%' }}></textarea>
          </div>
          <div>
            <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Default Social Image (OG Image)</label>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>Upload the image shown when sharing the website link on WhatsApp, Discord, or Facebook.</p>
            <div className="d-flex align-items-center gap-4">
              {settings?.seo_og_image && (
                <div style={{ width: '100px', height: '75px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.seo_og_image} alt="OG Image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div className="flex-grow-1">
                <input type="file" className="form-control bg-dark text-white border-secondary" accept="image/*" onChange={(e) => handleFileUpload(e, 'seo_og_image')} style={{ padding: '10px', borderRadius: '10px', width: '100%' }} />
                {uploadingOgImage && <div className="text-primary mt-2" style={{ fontSize: '14px' }}><span className="spinner-border spinner-border-sm me-2"></span> Uploading image...</div>}
                <input type="hidden" name="seo_og_image" value={settings?.seo_og_image || ''} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Previews Panel */}
        <div style={rightPanelStyle}>
          {/* Social Share Preview Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label className="text-muted m-0" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>Social Share (OG)</label>
              <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '6px 12px', fontWeight: '600', borderRadius: '20px' }}>App / Messenger</span>
            </div>
            <div style={{ background: '#2f3136', borderRadius: '12px', borderLeft: '6px solid #10b981', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '13px', color: '#10b981', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{settings?.site_name || 'PlayFusion Pro'}</div>
                <div style={{ fontSize: '18px', color: '#00b0f4', fontWeight: 'bold', marginBottom: '8px', cursor: 'pointer', lineHeight: '1.3' }}>
                  {settings?.site_name || 'PlayFusion Pro'} - The Ultimate Gaming Platform
                </div>
                <div style={{ fontSize: '15px', color: '#dcddde', lineHeight: '1.5', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {settings?.site_description || 'The ultimate platform for gaming. Discover, explore and download premium PC games for free.'}
                </div>
                {settings?.seo_og_image ? (
                  <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', background: '#202225', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.seo_og_image} alt="OG Image" style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', display: 'block' }} />
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '140px', borderRadius: '8px', background: '#202225', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#72767d', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <i className="fa-solid fa-image fs-2 mb-3"></i>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>No image uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
