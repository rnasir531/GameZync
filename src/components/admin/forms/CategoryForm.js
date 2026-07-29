'use client';
import React from 'react';

export default function CategoryForm({
  isEdit,
  isAdding,
  formData,
  setFormData,
  onSubmit,
  onClose
}) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('type', 'categories');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData({ ...formData, image_url: url });
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5 style={{ margin: 0, fontWeight: 'bold', fontSize: '20px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
            <i className={`fa-solid ${isEdit ? 'fa-edit' : 'fa-plus'}`}></i>
          </div>
          {isEdit ? 'Edit Category' : 'Add New Category'}
        </h5>
        <button type="button" onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Category Name <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Action, RPG..."
              required
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>FontAwesome Icon Class</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="text"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="fa-gamepad"
                style={{ flex: 1, padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
              />
              <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fa-solid ${formData.icon || 'fa-gamepad'}`} style={{ fontSize: '20px', color: '#8b5cf6' }}></i>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Category Image</label>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="Enter Image Path or Upload..."
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', marginBottom: '12px' }}
              />
              
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px', fontWeight: '600' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                {isUploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={isUploading} />
              </label>
            </div>

            {formData.image_url && (
              <div style={{ width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={formData.image_url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Short description of this category..."
            rows="3"
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
          />
        </div>
      </div>

      <div style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button type="button" onClick={onClose} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>Cancel</button>
        <button type="submit" disabled={isAdding} className="btn" style={{ background: '#8b5cf6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <i className="fa-solid fa-check"></i>
          {isAdding ? 'Saving...' : (isEdit ? 'Save Changes' : 'Add Category')}
        </button>
      </div>
    </form>
  );
}
