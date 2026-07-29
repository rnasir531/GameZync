'use client';

export default function SubmitContactEmail() {
  return (
    <div style={{ background: 'var(--search-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i className="fa-solid fa-envelope" style={{ color: 'var(--primary-color)' }}></i> Submitter Contact Email <span style={{ color: '#ef4444' }}>*</span>
      </h4>
      <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Please enter your valid email address. Our admin team will review your game submission in the Admin Panel and notify you upon publication.
      </p>
      <input 
        type="email" 
        name="submitter_email" 
        required 
        placeholder="Enter your email address (e.g. uploader@gmail.com)" 
        style={{ 
          width: '100%', 
          padding: '14px 18px', 
          borderRadius: '12px', 
          background: 'var(--card-bg)', 
          border: '1px solid var(--border-color)', 
          color: 'var(--text-color)',
          outline: 'none',
          fontSize: '14.5px',
          fontWeight: '600'
        }} 
      />
    </div>
  );
}
