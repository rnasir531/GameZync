'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteDraftButton({ gameId }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/games/${gameId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setShowModal(false);
        router.refresh();
      } else {
        alert('Failed to delete game');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        disabled={loading}
        style={{ background: '#f44336', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}
        title="Delete Draft"
      >
        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}
      </button>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'var(--card-bg, #1e1e2d)', 
            padding: '24px', borderRadius: '8px', width: '400px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            border: '1px solid var(--border-color, #2b2b40)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--text-color, #fff)' }}>
              <i className="fa-solid fa-triangle-exclamation text-danger me-2"></i> Confirm Deletion
            </h3>
            <p style={{ color: 'var(--text-muted, #a1a5b7)', marginBottom: '24px' }}>
              Are you sure you want to delete this draft? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setShowModal(false)}
                disabled={loading}
                style={{ background: 'transparent', color: 'var(--text-color, #fff)', border: '1px solid var(--border-color, #2b2b40)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={loading}
                style={{ background: '#f44336', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
              >
                {loading ? 'Deleting...' : 'Yes, Delete!'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
