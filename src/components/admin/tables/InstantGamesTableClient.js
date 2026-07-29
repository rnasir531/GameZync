'use client';
import { useState, useEffect } from 'react';
import InstantGameModal from '@/components/admin/modals/InstantGameModal';
import InstantGameRow from '@/components/admin/tables/InstantGameRow';
import { ConfirmModal } from '@/components/admin/ui';

const thStyle = {
  background: 'transparent', color: '#94a3b8', fontSize: '12px',
  textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', padding: '16px'
};

export default function InstantGamesTableClient({ instantGames = [], categories = [] }) {
  const [gamesList, setGamesList] = useState(instantGames);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Dynamic Sources and Categories for filter dropdowns
  const availableSources = Array.from(new Set(gamesList.map(g => g.source).filter(Boolean))).sort();
  const availableCategories = Array.from(new Set(gamesList.map(g => g.category).filter(Boolean))).sort();

  // ── Form State ───────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    id: '', title: '', embed_url: '', image_url: '', description: '', categoryIds: []
  });

  const resetForm = () => setFormData({ id: '', title: '', embed_url: '', image_url: '', description: '', categoryIds: [] });

  const handleCheckbox = (id) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter(c => c !== id)
        : [...prev.categoryIds, id]
    }));
  };

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSource, selectedCategory, sortBy]);

  // ── Filtering ────────────────────────────────────────────────────
  const filteredGames = gamesList.filter(game => {
    const matchesSearch = (game.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (game.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'ALL' || (game.source || 'Other').toLowerCase() === selectedSource.toLowerCase();
    const matchesCategory = selectedCategory === 'ALL' || (game.category || 'Arcade').toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesSource && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    if (sortBy === 'oldest') return new Date(a.created_at || 0) - new Date(b.created_at || 0);
    if (sortBy === 'title_asc') return (a.title || '').localeCompare(b.title || '');
    if (sortBy === 'title_desc') return (b.title || '').localeCompare(a.title || '');
    return 0;
  });

  const hasActiveFilters = searchTerm !== '' || selectedSource !== 'ALL' || selectedCategory !== 'ALL' || sortBy !== 'newest';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSource('ALL');
    setSelectedCategory('ALL');
    setSortBy('newest');
  };

  // ── Pagination Math ──────────────────────────────────────────────
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredGames.length);
  const currentGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const tableElem = document.getElementById('adminInstantGamesTableContainer');
      if (tableElem) {
        tableElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ── API Actions ──────────────────────────────────────────────────
  const executeDelete = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    try {
      const res = await fetch(`/api/admin/instant-games/${id}`, { method: 'DELETE' });
      if (res.ok) setGamesList(gamesList.filter(g => g.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/instant-games', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newGame = await res.json();
        setGamesList([newGame, ...gamesList]);
        setIsAddOpen(false);
        resetForm();
      } else { const err = await res.json(); alert(err.error || 'Failed to add game'); }
    } catch (err) { console.error(err); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/instant-games/${formData.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (res.ok) {
        const updatedGame = await res.json();
        setGamesList(gamesList.map(g => g.id === formData.id ? updatedGame : g));
        setIsEditOpen(false);
        resetForm();
      } else { const err = await res.json(); alert(err.error || 'Failed to update game'); }
    } catch (err) { console.error(err); }
  };

  const openEdit = (game) => {
    setFormData({
      id: game.id, title: game.title, embed_url: game.embed_url,
      image_url: game.image_url, description: game.description || '',
      categoryIds: game.instantGameCategories ? game.instantGameCategories.map(c => c.category_id) : []
    });
    setIsEditOpen(true);
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div id="adminInstantGamesTableContainer" className="dashboard-panel p-0">
      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <i className="fa-solid fa-bolt-lightning"></i>
          </div>
          Instant Games List ({filteredGames.length} / {gamesList.length})
        </h4>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }}
          style={{ borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', boxShadow: '0 4px 10px rgba(16,185,129,0.3)', cursor: 'pointer' }}>
          <i className="fa-solid fa-plus"></i> Add Instant Game
        </button>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* Filters Controls Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
          
          {/* Live Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', overflow: 'hidden', padding: '2px 10px' }}>
            <i className="fa-solid fa-search" style={{ color: '#94a3b8', fontSize: '13px' }}></i>
            <input
              type="text"
              placeholder="Search instant games..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ flexGrow: 1, background: 'transparent', border: 'none', color: '#fff', padding: '8px 10px', outline: 'none', fontSize: '13px' }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Filter by Source Portal */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '2px 10px' }}>
            <i className="fa-solid fa-globe" style={{ color: '#10b981', fontSize: '13px', marginRight: '6px' }}></i>
            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              style={{ flexGrow: 1, background: 'transparent', border: 'none', color: '#fff', padding: '8px 4px', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ background: '#111' }}>🌐 All Sources ({gamesList.length})</option>
              {availableSources.map(src => (
                <option key={src} value={src} style={{ background: '#111' }}>
                  {src} ({gamesList.filter(g => (g.source || '').toLowerCase() === src.toLowerCase()).length})
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Category */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '2px 10px' }}>
            <i className="fa-solid fa-layer-group" style={{ color: '#f59e0b', fontSize: '13px', marginRight: '6px' }}></i>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ flexGrow: 1, background: 'transparent', border: 'none', color: '#fff', padding: '8px 4px', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ background: '#111' }}>🏷️ All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat} style={{ background: '#111' }}>
                  {cat} ({gamesList.filter(g => (g.category || '').toLowerCase() === cat.toLowerCase()).length})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '2px 10px' }}>
            <i className="fa-solid fa-arrow-down-short-wide" style={{ color: '#3b82f6', fontSize: '13px', marginRight: '6px' }}></i>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ flexGrow: 1, background: 'transparent', border: 'none', color: '#fff', padding: '8px 4px', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value="newest" style={{ background: '#111' }}>📅 Newest First</option>
              <option value="oldest" style={{ background: '#111' }}>⏳ Oldest First</option>
              <option value="title_asc" style={{ background: '#111' }}>🔤 Title A-Z</option>
              <option value="title_desc" style={{ background: '#111' }}>🔤 Title Z-A</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              <i className="fa-solid fa-rotate-left"></i> Clear Filters
            </button>
          )}

        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ color: '#cbd5e1' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.05)' }}>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Link</th>
                <th className="text-center" style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentGames.length === 0 ? (
                <tr><td colSpan="5" className="text-center" style={{ padding: '40px', color: '#64748b' }}>
                  <i className="fa-solid fa-inbox fs-1 mb-3 opacity-50 d-block"></i> No instant games found.
                </td></tr>
              ) : currentGames.map(row => (
                <InstantGameRow
                  key={row.id}
                  row={row}
                  onEdit={openEdit}
                  onDelete={(id) => setConfirmModal({ isOpen: true, id })}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* INSTANT GAMES PAGINATION BAR */}
        {filteredGames.length > 0 && (
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            
            {/* Left: Entry Counts & Per Page Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#94a3b8' }}>
              <span>
                Showing <strong style={{ color: '#f8fafc' }}>{startIndex + 1}</strong> to <strong style={{ color: '#f8fafc' }}>{endIndex}</strong> of <strong style={{ color: '#f8fafc' }}>{filteredGames.length}</strong> games
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label htmlFor="instantPerPageSelect" style={{ margin: 0 }}>Per Page:</label>
                <select
                  id="instantPerPageSelect"
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', padding: '4px 8px', fontSize: '12.5px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value={15} style={{ background: '#111' }}>15</option>
                  <option value={30} style={{ background: '#111' }}>30</option>
                  <option value={50} style={{ background: '#111' }}>50</option>
                </select>
              </div>
            </div>

            {/* Right: Page Navigation Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: currentPage === 1 ? '#64748b' : '#f8fafc', padding: '6px 14px', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600' }}
              >
                <i className="fa-solid fa-chevron-left me-1"></i> Prev
              </button>

              {/* Dynamic Page Buttons */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (currentPage > 3) pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                }
                if (pageNum <= 0) pageNum = i + 1;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className="btn btn-sm"
                    style={{
                      background: currentPage === pageNum ? '#10b981' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${currentPage === pageNum ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '700',
                      minWidth: '34px',
                      boxShadow: currentPage === pageNum ? '0 2px 10px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: currentPage === totalPages ? '#64748b' : '#f8fafc', padding: '6px 14px', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600' }}
              >
                Next <i className="fa-solid fa-chevron-right ms-1"></i>
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <InstantGameModal
        isOpen={isAddOpen || isEditOpen}
        isEdit={isEditOpen}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        handleCheckbox={handleCheckbox}
        onSubmit={isEditOpen ? handleEditSubmit : handleAddSubmit}
        onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }}
      />

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
        onConfirm={executeDelete}
        title="Delete Instant Game?"
        message="Are you sure you want to delete this instant game? This action cannot be undone."
      />
    </div>
  );
}
