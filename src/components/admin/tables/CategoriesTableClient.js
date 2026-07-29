'use client';
import { useState } from 'react';
import { getCategoryData } from '@/lib/categoryData';
import CategoryModal from '@/components/admin/modals/CategoryModal';
import CategoryRow from '@/components/admin/tables/CategoryRow';
import { ConfirmModal } from '@/components/admin/ui';

const thStyle = {
  background: 'transparent', color: '#94a3b8', fontSize: '12px',
  textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', padding: '16px'
};

export default function CategoriesTableClient({ categories: initialCategories = [] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  // ── Form State ───────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: '', icon: 'fa-gamepad', image_url: '', description: ''
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', icon: 'fa-gamepad', image_url: '', description: '' });
  };

  // ── Handlers ─────────────────────────────────────────────────────
  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', icon: 'fa-gamepad', image_url: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (cat) => {
    const data = getCategoryData(cat.name);
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      icon: cat.icon || data.icon || 'fa-gamepad',
      image_url: cat.image_url || data.img || '',
      description: cat.description || data.desc || ''
    });
    setIsModalOpen(true);
  };

  // ── API Actions ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setIsAdding(true);
    try {
      const url = editingId ? `/api/admin/categories/${editingId}` : '/api/admin/categories';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (res.ok) {
        const returnedCat = await res.json();
        if (editingId) {
          setCategories(categories.map(c => c.id === editingId ? { ...returnedCat, game_count: c.game_count } : c));
        } else {
          setCategories([...categories, { ...returnedCat, game_count: 0 }]);
        }
        handleCloseModal();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save category');
      }
    } catch (err) { console.error(err); }
    finally { setIsAdding(false); }
  };

  const executeDelete = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete category');
      }
    } catch (err) { console.error(err); }
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="dashboard-panel p-0">
      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
            <i className="fa-solid fa-tags"></i>
          </div>
          Manage Categories
          <span style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: '1px solid rgba(139,92,246,0.2)', marginLeft: '12px' }}>
            {categories.length} Total
          </span>
        </h4>
        <button onClick={handleAddClick}
          style={{ background: '#8b5cf6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(139,92,246,0.3)', cursor: 'pointer' }}>
          <i className="fa-solid fa-plus"></i> Add Category
        </button>
      </div>

      <div style={{ padding: '32px' }}>
        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ color: '#cbd5e1' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.05)' }}>
                <th style={thStyle}>Category Info</th>
                <th style={thStyle}>Description</th>
                <th className="text-center" style={thStyle}>Total Games</th>
                <th className="text-center" style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan="4" className="text-center" style={{ padding: '40px', color: '#64748b' }}>
                  <i className="fa-solid fa-tags fs-1 mb-3 opacity-50 d-block"></i> No categories found.
                </td></tr>
              ) : categories.map(cat => (
                <CategoryRow
                  key={cat.id}
                  cat={cat}
                  onEdit={handleEditClick}
                  onDelete={(id) => setConfirmModal({ isOpen: true, id })}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        isEdit={!!editingId}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
        isAdding={isAdding}
      />

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
        onConfirm={executeDelete}
        title="Delete Category?"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
}
