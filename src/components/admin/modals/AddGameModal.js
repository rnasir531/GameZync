'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GameBasicInfo from '@/components/admin/forms/GameBasicInfo';
import GameRequirements from '@/components/admin/forms/GameRequirements';
import GameLinks from '@/components/admin/forms/GameLinks';
import GameMedia from '@/components/admin/forms/GameMedia';

export default function AddGameModal({ categories = [], onClose }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/admin/games', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        router.refresh(); // Refresh dashboard data
        onClose(); // Close modal on success
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add game');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while uploading.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--bg-color)', /* Remove black overlay, make it look like a page */
      zIndex: 9999,
      overflowY: 'auto', /* Native full-screen scroll */
      padding: '40px' /* Proper padding */
    }}>
      <div style={{
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px', /* Proper gap */
        backgroundColor: 'var(--card-bg)',
        padding: '40px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'none' /* Remove extra shadow */
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          <i className="fa-solid fa-times"></i>
        </button>

        <div className="card-header d-flex align-items-center pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h4 className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <i className="fa-solid fa-plus-circle text-primary me-2"></i> Add New Game
          </h4>
        </div>
        
        <form id="gameForm" onSubmit={handleSubmit} encType="multipart/form-data" className="ajax-form">
          <GameBasicInfo categories={categories} />
          <GameRequirements />
          <GameLinks />
          <GameMedia isEdit={false} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '12px 24px', background: '#475569', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '12px 24px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Uploading...' : 'Upload Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
