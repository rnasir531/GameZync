import { useEffect } from 'react';

export default function AdminUserModal({ isOpen, isEdit, formData, setFormData, onSubmit, onClose }) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, overflowY: 'auto' }}>
      <div style={{ background: '#1e293b', width: '600px', borderRadius: '12px', border: '1px solid #334155', margin: '20px 0' }}>
        <form onSubmit={onSubmit}>
          <div style={{ padding: '20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>
              {isEdit ? <><i className="fa-solid fa-edit"></i> Edit</> : <><i className="fa-solid fa-user-plus"></i> Add</>} Admin User
            </h5>
            <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
          </div>
          
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>First Name *</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>Last Name *</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>Username *</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>Password {isEdit ? '(Optional)' : '*'}</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required={!isEdit} placeholder={isEdit ? "Leave blank to keep unchanged" : ""} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>Role *</label>
              <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}>
                <option value="1" style={{ color: '#000' }}>Admin</option>
                <option value="2" style={{ color: '#000' }}>Moderate</option>
                <option value="3" style={{ color: '#000' }}>Manager</option>
              </select>
            </div>
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
            <button type="submit" style={{ background: '#198754', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
              {isEdit ? 'Update User' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
