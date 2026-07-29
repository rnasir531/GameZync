'use client';

import { useState } from 'react';

export default function ReportLinkButton({ gameId }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleReport = async () => {
    if (status === 'loading' || status === 'success') return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_id: gameId }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage('Reported successfully!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to report.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (e) {
      setStatus('error');
      setMessage('Network error.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div style={{ marginTop: '12px', textAlign: 'center' }}>
      <button 
        onClick={handleReport}
        disabled={status === 'loading' || status === 'success'}
        style={{
          background: 'transparent',
          border: 'none',
          color: status === 'success' ? 'var(--success-color)' : status === 'error' ? 'var(--danger-color)' : 'var(--text-muted)',
          fontSize: '13px',
          cursor: (status === 'loading' || status === 'success') ? 'default' : 'pointer',
          textDecoration: status === 'idle' ? 'underline' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s'
        }}
      >
        {status === 'idle' && <><i className="fa-solid fa-flag"></i> Report Dead Link</>}
        {status === 'loading' && <><i className="fa-solid fa-spinner fa-spin"></i> Reporting...</>}
        {status === 'success' && <><i className="fa-solid fa-check"></i> {message}</>}
        {status === 'error' && <><i className="fa-solid fa-circle-exclamation"></i> {message}</>}
      </button>
    </div>
  );
}
