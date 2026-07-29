'use client';
import EditReviewForm from '../forms/EditReviewForm';

export default function EditReviewModal({ game, categories = [], onClose, onUpdate }) {
  if (!game) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)', 
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      overflowY: 'auto', 
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '940px',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f172a',
        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
        padding: '36px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px rgba(16, 185, 129, 0.12)'
      }}>
        
        {/* Sleek Glowing Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#f8fafc',
            fontSize: '18px',
            cursor: 'pointer',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'; e.currentTarget.style.borderColor = '#ef4444'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <EditReviewForm 
          game={game} 
          categories={categories} 
          onClose={onClose} 
          onUpdate={onUpdate} 
        />
      </div>
    </div>
  );
}
