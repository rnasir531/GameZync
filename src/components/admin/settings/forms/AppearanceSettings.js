export default function AppearanceSettings({ 
  settings, 
  handleChange, 
  handleFileUpload, 
  uploadingFavicon, 
  uploadingLogo,
  gridContainerStyle,
  leftPanelStyle,
  rightPanelStyle
}) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', background: 'var(--panel-bg, #111)' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
        <h5 className="m-0 text-white" style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '0.3px' }}><i className="fa-solid fa-magnifying-glass text-primary me-3"></i> Website Identity & Search Appearance</h5>
      </div>
      
      <div style={gridContainerStyle}>
        {/* Inputs Panel */}
        <div style={leftPanelStyle}>
          <div>
            <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Favicon</label>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>Upload the small icon displayed in the browser tab (ICO, PNG).</p>
            <div className="d-flex align-items-center gap-4">
              {settings?.appearance_favicon ? (
                <div style={{ width: '60px', height: '60px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.appearance_favicon} alt="Favicon" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-globe text-muted fs-5"></i>
                </div>
              )}
              <div className="flex-grow-1">
                <input type="file" className="form-control bg-dark text-white border-secondary" accept="image/*,.ico" onChange={(e) => handleFileUpload(e, 'appearance_favicon')} style={{ padding: '10px', borderRadius: '10px', width: '100%' }} />
                {uploadingFavicon && <div className="text-primary mt-2" style={{ fontSize: '14px' }}><span className="spinner-border spinner-border-sm me-2"></span> Uploading favicon...</div>}
                <input type="hidden" name="appearance_favicon" value={settings?.appearance_favicon || ''} />
              </div>
            </div>
          </div>

          <div>
            <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Website Name</label>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>This name appears in the browser tab and throughout the platform.</p>
            <input type="text" className="form-control bg-dark text-white border-secondary" name="site_name" value={settings?.site_name || ''} onChange={handleChange} required style={{ padding: '14px 18px', borderRadius: '10px', fontSize: '15px', width: '100%' }} />
          </div>
          <div>
            <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Website Description</label>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>A short description used for Search Engine Optimization (SEO) meta tags.</p>
            <textarea className="form-control bg-dark text-white border-secondary" name="site_description" rows="4" value={settings?.site_description || ''} onChange={handleChange} style={{ padding: '14px 18px', borderRadius: '10px', resize: 'none', fontSize: '15px', width: '100%' }}></textarea>
          </div>
          
          <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '10px 0' }} />
          
          <div>
            <label className="form-label fw-bold text-white mb-2" style={{ fontSize: '15px' }}>Site Logo</label>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>Upload your main website logo (PNG, JPG, SVG).</p>
            <div className="d-flex align-items-center gap-4">
              {settings?.appearance_logo ? (
                <div style={{ width: '80px', height: '80px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.appearance_logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-image text-muted fs-4"></i>
                </div>
              )}
              <div className="flex-grow-1">
                <input type="file" className="form-control bg-dark text-white border-secondary" accept="image/*" onChange={(e) => handleFileUpload(e, 'appearance_logo')} style={{ padding: '10px', borderRadius: '10px', width: '100%' }} />
                {uploadingLogo && <div className="text-primary mt-2" style={{ fontSize: '14px' }}><span className="spinner-border spinner-border-sm me-2"></span> Uploading logo...</div>}
                <input type="hidden" name="appearance_logo" value={settings?.appearance_logo || ''} />
              </div>
            </div>
          </div>

        </div>
        
        {/* Previews Panel */}
        <div style={rightPanelStyle}>
          {/* Header Preview Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label className="text-muted m-0" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>Site Logo & Navbar</label>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '6px 12px', fontWeight: '600', borderRadius: '20px' }}>Desktop</span>
            </div>
            <div style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 1), rgba(30, 41, 59, 1))', padding: '18px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {settings?.appearance_logo ? (
                  <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.appearance_logo} alt="Logo" style={{ height: '32px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ width: '32px', height: '32px', background: 'var(--primary-gradient)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', color: '#fff', boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)' }}>
                    {settings?.site_name ? settings.site_name.substring(0, 2).toUpperCase() : 'NS'}
                  </div>
                )}
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.5px' }}>{settings?.site_name || 'PlayFusion Pro'}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '48px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}></div>
                <div style={{ width: '48px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}></div>
              </div>
            </div>
          </div>

          {/* Google Search Preview Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label className="text-muted m-0" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>Google Search Result</label>
              <span className="badge" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)', padding: '6px 12px', fontWeight: '600', borderRadius: '20px' }}>Mobile</span>
            </div>
            <div style={{ background: '#202124', padding: '24px', borderRadius: '12px', border: '1px solid #3c4043', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#303134', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #3c4043' }}>
                  {settings?.appearance_favicon ? (
                    <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.appearance_favicon} alt="Favicon" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                  ) : (
                    <i className="fa-solid fa-globe text-secondary" style={{ fontSize: '16px' }}></i>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', color: '#dadce0', lineHeight: '1.2' }}>{settings?.site_name || 'PlayFusion Pro'}</div>
                  <div style={{ fontSize: '13px', color: '#bdc1c6' }}>https://yoursite.com</div>
                </div>
                <i className="fa-solid fa-ellipsis-vertical text-secondary" style={{ fontSize: '18px' }}></i>
              </div>
              <div style={{ fontSize: '22px', color: '#8ab4f8', cursor: 'pointer', marginBottom: '8px', lineHeight: '1.3', fontFamily: 'arial, sans-serif' }}>
                {settings?.site_name || 'PlayFusion Pro'} - Download Free PC Games
              </div>
              <div style={{ fontSize: '15px', color: '#bdc1c6', lineHeight: '1.58', fontFamily: 'arial, sans-serif', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {settings?.site_description || 'The ultimate platform for gaming. Discover, explore and download premium PC games for free.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
