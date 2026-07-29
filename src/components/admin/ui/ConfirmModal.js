'use client';

/**
 * ConfirmModal — Reusable confirmation dialog
 * Props:
 *   isOpen   {boolean}  — show/hide
 *   onClose  {fn}       — cancel handler
 *   onConfirm {fn}      — confirm handler
 *   title    {string}
 *   message  {string}
 *   confirmLabel {string} — default "Yes, Delete"
 *   confirmColor {string} — CSS color for confirm button, default '#ef4444'
 *   icon     {string}   — FontAwesome icon class, default 'fa-triangle-exclamation'
 *   iconColor {string}  — default '#ef4444'
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure? This action cannot be undone.',
  confirmLabel = 'Yes, Delete',
  confirmColor = '#ef4444',
  confirmShadow = 'rgba(239,68,68,0.4)',
  icon = 'fa-triangle-exclamation',
  iconBg = 'rgba(239, 68, 68, 0.1)',
  iconColor = '#ef4444',
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1100, backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', padding: '30px', width: '100%', maxWidth: '400px',
        textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: iconBg, color: iconColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', margin: '0 auto 20px'
        }}>
          <i className={`fa-solid ${icon}`}></i>
        </div>

        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          {title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '25px' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 20px', borderRadius: '10px',
              background: confirmColor, color: '#fff', border: 'none',
              fontWeight: 'bold', cursor: 'pointer',
              boxShadow: `0 4px 15px ${confirmShadow}`
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
