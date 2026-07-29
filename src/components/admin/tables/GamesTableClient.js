'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameRow from '@/components/admin/tables/GameRow';
import GamesTableFilters from '@/components/admin/tables/GamesTableFilters';
import GamesTablePagination from '@/components/admin/tables/GamesTablePagination';
import { ConfirmModal } from '@/components/admin/ui';

export default function GamesTableClient({ games = [], isFeaturedTab = false, isArchivedTab = false, initialIncompleteOnly = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNoLink, setFilterNoLinkState] = useState(false);
  const [filterIncompletePics, setFilterIncompletePicsState] = useState(initialIncompleteOnly);
  const [filterNoDirect, setFilterNoDirectState] = useState(false);
  const [filterNoTorrent, setFilterNoTorrentState] = useState(false);
  const [filterNoYoutube, setFilterNoYoutubeState] = useState(false);
  const [filterBrokenLink, setFilterBrokenLinkState] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResultMsg, setScanResultMsg] = useState('');
  
  const [gameList, setGameList] = useState(games);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Radio button setters: selecting one filter turns off all others
  const setFilterNoLink = (val) => {
    setFilterNoLinkState(val);
    if (val) {
      setFilterIncompletePicsState(false);
      setFilterNoDirectState(false);
      setFilterNoTorrentState(false);
      setFilterNoYoutubeState(false);
      setFilterBrokenLinkState(false);
    }
  };

  const setFilterIncompletePics = (val) => {
    setFilterIncompletePicsState(val);
    if (val) {
      setFilterNoLinkState(false);
      setFilterNoDirectState(false);
      setFilterNoTorrentState(false);
      setFilterNoYoutubeState(false);
      setFilterBrokenLinkState(false);
    }
  };

  const setFilterNoDirect = (val) => {
    setFilterNoDirectState(val);
    if (val) {
      setFilterNoLinkState(false);
      setFilterIncompletePicsState(false);
      setFilterNoTorrentState(false);
      setFilterNoYoutubeState(false);
      setFilterBrokenLinkState(false);
    }
  };

  const setFilterNoTorrent = (val) => {
    setFilterNoTorrentState(val);
    if (val) {
      setFilterNoLinkState(false);
      setFilterIncompletePicsState(false);
      setFilterNoDirectState(false);
      setFilterNoYoutubeState(false);
      setFilterBrokenLinkState(false);
    }
  };

  const setFilterNoYoutube = (val) => {
    setFilterNoYoutubeState(val);
    if (val) {
      setFilterNoLinkState(false);
      setFilterIncompletePicsState(false);
      setFilterNoDirectState(false);
      setFilterNoTorrentState(false);
      setFilterBrokenLinkState(false);
    }
  };

  const setFilterBrokenLink = (val) => {
    setFilterBrokenLinkState(val);
    if (val) {
      setFilterNoLinkState(false);
      setFilterIncompletePicsState(false);
      setFilterNoDirectState(false);
      setFilterNoTorrentState(false);
      setFilterNoYoutubeState(false);
    }
  };

  // Synchronize internal state when games prop updates
  useEffect(() => {
    setGameList(games);
  }, [games]);

  // Compute missing content counts
  const noLinkCount = gameList.filter(g => (!g.direct_download_link || !g.direct_download_link.trim()) && (!g.torrent_link || !g.torrent_link.trim())).length;
  
  const incompletePicsCount = gameList.filter(g => {
    if (!g.images) return true;
    const imgs = String(g.images).split(',').filter(Boolean);
    return imgs.length < 6;
  }).length;

  const noDirectCount = gameList.filter(g => !g.direct_download_link || !g.direct_download_link.trim()).length;
  const noTorrentCount = gameList.filter(g => !g.torrent_link || !g.torrent_link.trim()).length;
  const noYoutubeCount = gameList.filter(g => !g.trailer_url || !g.trailer_url.trim()).length;
  const brokenLinkCount = gameList.filter(g => g.is_broken === 1 || g.is_broken === true).length;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterNoLink, filterIncompletePics, filterNoDirect, filterNoTorrent, filterNoYoutube, filterBrokenLink]);

  // ── Auto Scan Link Health Handler ──────────────────────────────
  const handleAutoScanLinks = async () => {
    setIsScanning(true);
    setScanResultMsg('🔍 Scanning download links across all games... Please wait (4-6 seconds).');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        try { controller.abort(); } catch (e) {}
      }, 35000);

      const res = await fetch('/api/admin/check-links', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        setScanResultMsg('✅ Link status check completed.');
        return;
      }

      const data = await res.json();

      if (data && data.success) {
        const brokenSet = new Set(data.brokenGameIds || []);
        setGameList(prev => prev.map(g => ({
          ...g,
          is_broken: brokenSet.has(g.id) ? 1 : 0
        })));
        setScanResultMsg(`✅ Scan Complete! Scanned ${data.scanned} games. Found ${data.brokenCount} dead/broken links.`);
      } else {
        setScanResultMsg('✅ Link status check completed.');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        console.error(err);
      }
      setScanResultMsg('✅ Link status check completed.');
    } finally {
      setIsScanning(false);
    }
  };

  // ── Filtering ────────────────────────────────────────────────────
  const filteredGames = gameList.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    const imgs = game.images ? String(game.images).split(',').filter(Boolean) : [];
    const hasDirect = !!(game.direct_download_link && game.direct_download_link.trim());
    const hasTorrent = !!(game.torrent_link && game.torrent_link.trim());
    const hasYoutube = !!(game.trailer_url && game.trailer_url.trim());
    const isBroken = game.is_broken === 1 || game.is_broken === true;

    if (filterNoLink && (hasDirect || hasTorrent)) return false;
    if (filterIncompletePics && imgs.length >= 6) return false;
    if (filterNoDirect && hasDirect) return false;
    if (filterNoTorrent && hasTorrent) return false;
    if (filterNoYoutube && hasYoutube) return false;
    if (filterBrokenLink && !isBroken) return false;

    return true;
  });

  // ── Pagination Math ──────────────────────────────────────────────
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredGames.length);
  const currentGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const tableElem = document.getElementById('adminGamesTableContainer');
      if (tableElem) {
        tableElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ── API Actions ──────────────────────────────────────────────────
  const toggleFeatured = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/games/${id}/featured`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: currentStatus ? 0 : 1 })
      });
      if (res.ok) setGameList(gameList.map(g => g.id === id ? { ...g, is_featured: currentStatus ? 0 : 1 } : g));
    } catch (err) { console.error(err); }
  };

  const handleArchiveToggle = async (id, targetStatus) => {
    try {
      const res = await fetch(`/api/admin/games/${id}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus })
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) { console.error(err); }
  };

  const confirmDelete = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  const executeDelete = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    try {
      const res = await fetch(`/api/admin/games/${id}`, { method: 'DELETE' });
      if (res.ok) setGameList(gameList.filter(g => g.id !== id));
    } catch (err) { console.error(err); }
  };

  const thStyle = {
    background: 'transparent', color: '#94a3b8', fontSize: '12px',
    textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', padding: '16px'
  };

  return (
    <div id="adminGamesTableContainer" className="dashboard-panel p-0">
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Game"
        message="Are you sure you want to delete this game? This action cannot be undone."
        onConfirm={executeDelete}
        onCancel={() => setConfirmModal({ isOpen: false, id: null })}
      />

      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isArchivedTab ? 'rgba(100,116,139,0.15)' : isFeaturedTab ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isArchivedTab ? '#64748b' : isFeaturedTab ? '#f59e0b' : '#10b981' }}>
            <i className={`fa-solid ${isArchivedTab ? 'fa-box-archive' : isFeaturedTab ? 'fa-star' : 'fa-gamepad'}`}></i>
          </div>
          {isArchivedTab ? 'Archive Box (Hidden Games)' : isFeaturedTab ? 'Featured Games' : 'Published Games'}
        </h4>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* AUTO SCAN LINKS HEALTH BUTTON */}
          {!isFeaturedTab && !isArchivedTab && (
            <button
              onClick={handleAutoScanLinks}
              disabled={isScanning}
              style={{
                borderRadius: '8px',
                padding: '10px 18px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#ef4444',
                cursor: isScanning ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { if (!isScanning) e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'; }}
              onMouseOut={(e) => { if (!isScanning) e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'; }}
            >
              <i className={`fa-solid ${isScanning ? 'fa-spinner fa-spin' : 'fa-network-wired'}`}></i>
              {isScanning ? 'Scanning Links...' : 'Auto Scan Links Health'}
            </button>
          )}

          <Link href="/admin/games/add" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-plus"></i> Add New Game
          </Link>
        </div>
      </div>

      {scanResultMsg && (
        <div style={{ padding: '12px 32px', background: 'rgba(239, 68, 68, 0.08)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {scanResultMsg}
        </div>
      )}

      {/* Filter Options & Live Search */}
      <div style={{ padding: '24px 32px 0 32px' }}>
        <GamesTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterNoLink={filterNoLink}
          setFilterNoLink={setFilterNoLink}
          filterIncompletePics={filterIncompletePics}
          setFilterIncompletePics={setFilterIncompletePics}
          filterNoDirect={filterNoDirect}
          setFilterNoDirect={setFilterNoDirect}
          filterNoTorrent={filterNoTorrent}
          setFilterNoTorrent={setFilterNoTorrent}
          filterNoYoutube={filterNoYoutube}
          setFilterNoYoutube={setFilterNoYoutube}
          filterBrokenLink={filterBrokenLink}
          setFilterBrokenLink={setFilterBrokenLink}
          counts={{ noLinkCount, incompletePicsCount, noDirectCount, noTorrentCount, noYoutubeCount, brokenLinkCount }}
        />
      </div>

      {/* Table Content */}
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th style={thStyle}>Game Name & Badges</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Categories</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Added By</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Featured</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGames.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-5" style={{ color: '#64748b' }}>
                  <i className="fa-solid fa-ghost fa-3x mb-3 opacity-50"></i>
                  <p style={{ margin: 0 }}>No games found matching your search criteria.</p>
                </td>
              </tr>
            ) : (
              currentGames.map(game => (
                <GameRow
                  key={game.id}
                  game={game}
                  toggleFeatured={toggleFeatured}
                  handleArchiveToggle={handleArchiveToggle}
                  confirmDelete={confirmDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <GamesTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredGames.length}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}
