'use client';
import React from 'react';

export default function InstantGameForm({
  isEdit,
  formData,
  setFormData,
  categories,
  handleCheckbox,
  onSubmit,
  onClose
}) {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5 style={{ margin: 0, fontWeight: 'bold', fontSize: '20px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <i className={`fa-solid ${isEdit ? 'fa-edit' : 'fa-plus'}`}></i>
          </div>
          {isEdit ? 'Edit Instant Game' : 'Add Instant Game'}
        </h5>
        <button type="button" onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Game Embed Link / URL <span style={{ color: '#ef4444' }}>*</span></label>
          <input type="url" value={formData.embed_url || ''} onChange={e => setFormData({...formData, embed_url: e.target.value})} placeholder="https://..." required style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Title <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Action RPG" required style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Categories <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ maxHeight: '150px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id={`cat_${cat.id}`} checked={formData.categoryIds.includes(cat.id)} onChange={() => handleCheckbox(cat.id)} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#10b981' }} />
                  <label htmlFor={`cat_${cat.id}`} style={{ color: '#e2e8f0', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>{cat.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Cover Image URL</label>
          <input type="url" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
          {formData.image_url && (
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', display: 'inline-block' }}>
              <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={formData.image_url} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Short Description</label>
          <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" placeholder="Brief details..." style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}></textarea>
        </div>
      </div>

      <div style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button type="button" onClick={onClose} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>Cancel</button>
        <button type="submit" className="btn" style={{ background: 'var(--primary-gradient)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <i className="fa-solid fa-check"></i>
          {isEdit ? 'Save Changes' : 'Create Game'}
        </button>
      </div>
    </form>
  );
}
