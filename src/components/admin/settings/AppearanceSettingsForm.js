'use client';
import { useState } from 'react';

export default function AppearanceSettingsForm({ settings, handleChange }) {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === 'appearance_logo') setUploadingLogo(true);
    if (fieldName === 'appearance_favicon') setUploadingFavicon(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        // Create a synthetic event to pass to handleChange
        const syntheticEvent = {
          target: { name: fieldName, value: data.url, type: 'text' }
        };
        handleChange(syntheticEvent);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during upload.');
    } finally {
      if (fieldName === 'appearance_logo') setUploadingLogo(false);
      if (fieldName === 'appearance_favicon') setUploadingFavicon(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Site Logo</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Upload your main website logo (PNG, JPG, SVG).</p>
        
        <div className="d-flex align-items-center gap-3">
          {settings?.appearance_logo && (
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.appearance_logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <div className="flex-grow-1">
            <input 
              type="file" 
              className="form-control bg-dark text-white border-secondary" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'appearance_logo')} 
              style={{ padding: '8px', borderRadius: '8px' }} 
            />
            {uploadingLogo && <div className="text-primary mt-2" style={{ fontSize: '13px' }}><span className="spinner-border spinner-border-sm me-1"></span> Uploading...</div>}
            <input type="hidden" name="appearance_logo" value={settings?.appearance_logo || ''} />
          </div>
        </div>
      </div>
      
      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Favicon</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Upload the small icon displayed in the browser tab (ICO, PNG).</p>
        
        <div className="d-flex align-items-center gap-3">
          {settings?.appearance_favicon && (
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={settings.appearance_favicon} alt="Favicon" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <div className="flex-grow-1">
            <input 
              type="file" 
              className="form-control bg-dark text-white border-secondary" 
              accept="image/x-icon,image/png"
              onChange={(e) => handleFileUpload(e, 'appearance_favicon')} 
              style={{ padding: '8px', borderRadius: '8px' }} 
            />
            {uploadingFavicon && <div className="text-primary mt-2" style={{ fontSize: '13px' }}><span className="spinner-border spinner-border-sm me-1"></span> Uploading...</div>}
            <input type="hidden" name="appearance_favicon" value={settings?.appearance_favicon || ''} />
          </div>
        </div>
      </div>

      <div className="form-group p-4" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <label className="form-label fw-bold text-white mb-1">Primary Theme Color</label>
        <p className="text-muted" style={{ fontSize: '13px', marginBottom: '12px' }}>Hex color code for primary buttons and accents.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <input type="color" className="form-control form-control-color bg-dark border-secondary" name="appearance_primary_color" value={settings?.appearance_primary_color || '#10b981'} onChange={handleChange} style={{ width: '60px', height: '40px', padding: '5px', cursor: 'pointer' }} />
          <input type="text" className="form-control bg-dark text-white border-secondary" value={settings?.appearance_primary_color || '#10b981'} readOnly style={{ padding: '8px 12px', width: '120px', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
}
