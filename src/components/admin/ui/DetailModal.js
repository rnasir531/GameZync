'use client';

const labelStyle = {
  display: 'block', color: '#94a3b8', marginBottom: '8px',
  fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'
};
const inputStyle = {
  width: '100%', padding: '14px 16px',
  background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)',
  color: '#fff', borderRadius: '12px', fontSize: '15px'
};

/**
 * DetailModal — Read-only detail view modal
 * Props:
 *   isOpen      {boolean}
 *   onClose     {fn}
 *   onDelete    {fn}      — optional delete button handler
 *   title       {string}
 *   icon        {string}  — FontAwesome icon class
 *   fields      {Array}   — [{ label, value, type: 'text'|'email'|'textarea', rows }]
 */
export default function DetailModal({ isOpen, onClose, onDelete, title, icon, fields = [] }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        position: 'relative', width: '100%', maxWidth: '500px',
        background: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', padding: '35px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.05)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#cbd5e1', cursor: 'pointer', fontSize: '18px',
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Title */}
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '25px', color: '#fff', letterSpacing: '-0.5px' }}>
          {icon && <i className={`fa-solid ${icon}`} style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i>}
          {title}
        </h2>

        {/* Fields */}
        <form onSubmit={e => e.preventDefault()}>
          {fields.map((field, idx) => (
            <div key={idx} style={{ marginBottom: idx === fields.length - 1 ? '25px' : '18px' }}>
              <label style={labelStyle}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={field.rows || 4}
                  readOnly
                  value={field.value || ''}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  readOnly
                  value={field.value || ''}
                  style={inputStyle}
                />
              )}
            </div>
          ))}

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
            <button
              type="button" onClick={onClose}
              style={{
                padding: '12px 25px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              Close
            </button>
            {onDelete && (
              <button
                type="button" onClick={onDelete}
                style={{
                  padding: '12px 25px', borderRadius: '10px', fontWeight: '600',
                  background: '#ef4444', color: '#fff', border: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 4px 15px rgba(239,68,68,0.4)', transition: 'all 0.2s', cursor: 'pointer'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(239,68,68,0.6)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(239,68,68,0.4)'; }}
              >
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
