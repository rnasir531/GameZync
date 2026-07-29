'use client';
import { useState, useEffect } from 'react';

export default function RequestGameModal({ isOpen, onClose }) {
  const [reqGameName, setReqGameName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqDetail, setReqDetail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {};
    window.addEventListener('openRequestModal', handleOpenModal);
    return () => window.removeEventListener('openRequestModal', handleOpenModal);
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_name: reqGameName, email: reqEmail, detail: reqDetail })
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setReqGameName('');
        setReqEmail('');
        setReqDetail('');
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 3000);
      } else {
        alert('Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal active premium-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div 
        className="modal-content premium-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '88vh',
          overflowY: 'auto',
          maxWidth: '500px',
          width: '100%',
          margin: 'auto',
          borderRadius: '24px',
          padding: '28px 24px',
          position: 'relative',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          animation: 'scaleUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--search-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title" style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <i className="fa-solid fa-gamepad" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i>
          Request a Game
        </h2>
        
        {submitSuccess ? (
          <div className="success-message" style={{ textAlign: 'center', padding: '30px 10px', color: '#10b981' }}>
            <i className="fa-solid fa-circle-check" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Request Sent Successfully!</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '13.5px' }}>We'll look into adding this game to GameZync.</p>
          </div>
        ) : (
          <form onSubmit={handleRequestSubmit}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>Game Name *</label>
              <input type="text" required className="premium-input" placeholder="e.g. Grand Theft Auto VI" value={reqGameName} onChange={(e) => setReqGameName(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', background: 'var(--search-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '14px', outline: 'none' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>Your Email *</label>
              <input type="email" required className="premium-input" placeholder="To notify you when added" value={reqEmail} onChange={(e) => setReqEmail(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', background: 'var(--search-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '14px', outline: 'none' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>Additional Details</label>
              <textarea rows="3" className="premium-input" placeholder="Any specific version or repack?" value={reqDetail} onChange={(e) => setReqDetail(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', background: 'var(--search-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '14px', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="premium-submit-btn" disabled={isSubmitting} style={{ width: '100%', padding: '13px', borderRadius: '12px', background: 'var(--accent-gradient)', color: '#fff', fontWeight: '800', fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px var(--primary-glow)' }}>
              {isSubmitting ? (
                <><i className="fas fa-spinner fa-spin me-2"></i> Submitting...</>
              ) : (
                <><i className="fa-solid fa-paper-plane me-2"></i> Submit Request</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
