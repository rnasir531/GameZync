'use client';
import { useState } from 'react';
import { ConfirmModal, DetailModal, TableHeader } from '@/components/admin/ui';

export default function MessagesTableClient({ messages = [], unreadCount = 0 }) {
  const [msgList, setMsgList] = useState(messages);
  const [filter, setFilter] = useState('all');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  // ── Filtering ────────────────────────────────────────────────────
  const filteredMessages = msgList.filter(msg => {
    if (filter === 'unread') return msg.status === 'unread';
    if (filter === 'read') return msg.status === 'read';
    return true;
  });

  // ── API Actions ──────────────────────────────────────────────────
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}/read`, { method: 'POST' });
      if (res.ok) setMsgList(msgList.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (err) { console.error(err); }
  };

  const executeDelete = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMsgList(msgList.filter(m => m.id !== id));
        if (selectedMsg?.id === id) setSelectedMsg(null);
      }
    } catch (err) { console.error(err); }
  };

  // ── Handlers ─────────────────────────────────────────────────────
  const openModal = (msg) => {
    setSelectedMsg(msg);
    if (msg.status === 'unread') markAsRead(msg.id);
  };

  const requestDelete = (id, e) => {
    e?.stopPropagation();
    setSelectedMsg(null);
    setConfirmModal({ isOpen: true, id });
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="dashboard-panel" style={{ color: '#cbd5e1', padding: '24px' }}>
      <TableHeader
        title="Contact Messages"
        icon="fa-solid fa-envelope-open-text"
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
            <option value="all">All Messages</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        }
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Email Address</th>
              <th className="text-center">Message</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-3">No messages found.</td></tr>
            ) : filteredMessages.map(row => (
              <tr
                key={row.id}
                onClick={() => openModal(row)}
                style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.email}</td>
                <td className="text-center text-truncate" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.message}</td>
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
        isOpen={!!selectedMsg}
        onClose={() => setSelectedMsg(null)}
        onDelete={() => requestDelete(selectedMsg?.id)}
        title="Contact Message Details"
        icon="fa-envelope-open-text"
        fields={[
          { label: 'Name', value: selectedMsg?.name, type: 'text' },
          { label: 'Email Address', value: selectedMsg?.email, type: 'email' },
          { label: 'Message', value: selectedMsg?.message, type: 'textarea', rows: 6 },
        ]}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
        onConfirm={executeDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this message? This action cannot be undone."
      />
    </div>
  );
}
