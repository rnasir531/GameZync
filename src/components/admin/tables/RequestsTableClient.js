'use client';
import { useState } from 'react';
import AddGameModal from '@/components/admin/modals/AddGameModal';
import { ConfirmModal, DetailModal, TableHeader } from '@/components/admin/ui';

export default function RequestsTableClient({ requests = [], categories = [], unreadCount = 0 }) {
  const [reqList, setReqList] = useState(requests);
  const [filter, setFilter] = useState('all');
  const [selectedReq, setSelectedReq] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  // ── Filtering ────────────────────────────────────────────────────
  const filteredRequests = reqList.filter(req => {
    if (filter === 'unread') return req.status === 'unread';
    if (filter === 'read') return req.status === 'read';
    return true;
  });

  // ── API Actions ──────────────────────────────────────────────────
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/admin/requests/${id}/read`, { method: 'POST' });
      if (res.ok) setReqList(reqList.map(r => r.id === id ? { ...r, status: 'read' } : r));
    } catch (err) { console.error(err); }
  };

  const executeDelete = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    try {
      const res = await fetch(`/api/admin/requests/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReqList(reqList.filter(r => r.id !== id));
        if (selectedReq?.id === id) setSelectedReq(null);
      }
    } catch (err) { console.error(err); }
  };

  // ── Handlers ─────────────────────────────────────────────────────
  const openModal = (req) => {
    setSelectedReq(req);
    if (req.status === 'unread') markAsRead(req.id);
  };

  const requestDelete = (id, e) => {
    e?.stopPropagation();
    setSelectedReq(null);
    setConfirmModal({ isOpen: true, id });
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="dashboard-panel" style={{ color: '#cbd5e1', padding: '24px' }}>
      <TableHeader
        title="Requested Games"
        icon="fa-solid fa-gamepad"
        badge={unreadCount > 0 && (
          <span style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', fontSize: '13px', marginLeft: '16px', padding: '5px 10px', borderRadius: '8px', verticalAlign: 'middle' }}>
            {unreadCount} Unread
          </span>
        )}
        center={
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ width: '250px', background: 'var(--search-bg)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 15px' }}
          >
            <option value="all">All Requests</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        }
        right={
          <button onClick={() => setShowAddModal(true)} className="add-game-btn">
            <i className="fa-solid fa-plus-circle"></i> Add New Game
          </button>
        }
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="text-center">Game Name</th>
              <th className="text-center">Email Address</th>
              <th className="text-center">Description</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-3">No requested games found.</td></tr>
            ) : filteredRequests.map(row => (
              <tr
                key={row.id}
                onClick={() => openModal(row)}
                style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td className="text-center">{row.game_name}</td>
                <td className="text-center">{row.email || 'N/A'}</td>
                <td className="text-center" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.detail}</td>
                <td className="text-center fw-bold" style={{ color: row.status === 'read' ? '#198754' : '#dc3545' }}>
                  {row.status === 'read' ? 'Read' : 'Unread'}
                </td>
                <td className="text-center">
                  <button
                    onClick={e => requestDelete(row.id, e)}
                    style={{ color: '#dc3545', border: '1px solid #dc3545', background: 'transparent', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={!!selectedReq}
        onClose={() => setSelectedReq(null)}
        onDelete={() => requestDelete(selectedReq?.id)}
        title="Game Request Details"
        icon="fa-gamepad"
        fields={[
          { label: 'Game Name', value: selectedReq?.game_name, type: 'text' },
          { label: 'Submitter Email', value: selectedReq?.email || 'N/A', type: 'email' },
          { label: 'Additional Details', value: selectedReq?.detail, type: 'textarea', rows: 4 },
        ]}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
        onConfirm={executeDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this request? This action cannot be undone."
      />

      {/* Add Game Modal */}
      {showAddModal && (
        <AddGameModal categories={categories} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
