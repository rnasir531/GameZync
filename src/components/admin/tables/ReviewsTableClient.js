'use client';
import { useState } from 'react';
import EditReviewModal from '@/components/admin/modals/EditReviewModal';
import { ConfirmModal, TableHeader } from '@/components/admin/ui';

export default function ReviewsTableClient({ reviews = [], categories = [] }) {
  const [reviewList, setReviewList] = useState(reviews);
  const [selectedGame, setSelectedGame] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, action: null });

  // ── Handlers ─────────────────────────────────────────────────────
  const confirmAction = (id, action) => setConfirmModal({ isOpen: true, id, action });

  const handleUpdate = (updatedGame) => {
    if (!updatedGame || !updatedGame.id) {
      window.location.reload();
      return;
    }
    setReviewList(reviewList.map(r => (r && r.id === updatedGame.id) ? updatedGame : r));
  };

  // ── API Actions ──────────────────────────────────────────────────
  const executeAction = async () => {
    const { id, action } = confirmModal;
    setConfirmModal({ isOpen: false, id: null, action: null });

    if (action === 'delete') {
      try {
        const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
        if (res.ok) setReviewList(reviewList.filter(r => r.id !== id));
      } catch (err) { console.error(err); }
    } else if (action === 'approve') {
      try {
        const res = await fetch(`/api/admin/reviews/${id}/approve`, { method: 'POST' });
        if (res.ok) {
          setReviewList(reviewList.filter(r => r.id !== id));
          setSuccessMsg('Game approved and published! It is now live on the website.');
          setTimeout(() => setSuccessMsg(''), 4000);
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to approve game.');
        }
      } catch (err) { console.error(err); }
    }
  };

  // ── Render ───────────────────────────────────────────────────────
  const isApprove = confirmModal.action === 'approve';

  return (
    <div className="dashboard-panel" style={{ color: '#cbd5e1', padding: '24px' }}>
      <TableHeader
        title="Review Pending Games"
        icon="fa-solid fa-check-to-slot"
        center={successMsg && (
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-circle-check"></i> {successMsg}
          </div>
        )}
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="text-center">Game Name</th>
              <th className="text-center">Submitter Email</th>
              <th className="text-center">Date Added</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviewList.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-3">No games found.</td></tr>
            ) : reviewList.map(row => (
              <tr key={row.id}>
                <td className="text-center">
                  <strong>{row.name}</strong>
                  <span style={{ fontSize: '10px', marginLeft: '10px', background: '#ffc107', color: '#000', padding: '3px 8px', borderRadius: '12px' }}>Pending Review</span>
                </td>
                <td className="text-center">{row.submitter_email}</td>
                <td className="text-center">
                  {new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="text-center">
                  <button onClick={() => confirmAction(row.id, 'approve')} title="Approve & Publish"
                    style={{ color: '#198754', border: '1px solid #198754', background: 'transparent', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}>
                    <i className="fa-solid fa-check-circle"></i>
                  </button>
                  <button onClick={() => setSelectedGame(row)} title="Edit"
                    style={{ color: '#3b82f6', border: '1px solid #3b82f6', background: 'transparent', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}>
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button onClick={() => confirmAction(row.id, 'delete')} title="Delete"
                    style={{ color: '#dc3545', border: '1px solid #dc3545', background: 'transparent', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer' }}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedGame && (
        <EditReviewModal
          game={selectedGame}
          categories={categories}
          onClose={() => setSelectedGame(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Confirm Modal — approve or delete */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null, action: null })}
        onConfirm={executeAction}
        title={isApprove ? 'Approve & Publish Game?' : 'Delete Game Review?'}
        message={isApprove
          ? 'This game will be moved to the main database and will become visible to all users on the website.'
          : 'Are you sure you want to delete this game review? This action cannot be undone.'}
        confirmLabel={isApprove ? 'Yes, Publish Game' : 'Yes, Delete'}
        confirmColor={isApprove ? 'var(--primary-color)' : '#ef4444'}
        confirmShadow={isApprove ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}
        icon={isApprove ? 'fa-check' : 'fa-triangle-exclamation'}
        iconBg={isApprove ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}
        iconColor={isApprove ? '#10b981' : '#ef4444'}
      />
    </div>
  );
}
