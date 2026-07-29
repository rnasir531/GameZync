'use client';

export default function SubmitSuccessBanner({ msg }) {
  if (!msg || !msg.text) return null;

  const isSuccess = msg.type === 'success';

  return (
    <div 
      id="submitSuccessBanner"
      style={{ 
        marginBottom: '28px', 
        textAlign: 'center', 
        fontWeight: '800', 
        padding: '20px 24px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        gap: '12px',
        fontSize: '16px',
        letterSpacing: '0.3px',
        background: isSuccess ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.14)', 
        border: `1.5px solid ${isSuccess ? '#10b981' : '#ef4444'}`,
        color: isSuccess ? '#10b981' : '#ef4444',
        boxShadow: `0 8px 30px ${isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
        animation: 'fadeInUp 0.4s ease-out'
      }}
    >
      <i className={`fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}`} style={{ fontSize: '22px' }}></i>
      {msg.text}
    </div>
  );
}
