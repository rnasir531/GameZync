import Link from 'next/link';

export default function GameRow({ game, row, toggleFeatured, deleteGame, confirmDelete, archiveGame, handleArchiveToggle, isArchivedTab, hideActions }) {
  const item = game || row || {};
  if (!item || !item.id) return null;

  const isArchived = item.status === 'archived';
  const statusBadge = isArchived ? '#64748b' : item.status === 'published' ? '#198754' : '#ffc107';
  
  const imgCount = item.images ? String(item.images).split(',').filter(Boolean).length : 0;
  const isIncompleteImgs = imgCount < 6;
  const hasDirect = !!(item.direct_download_link && item.direct_download_link.trim());
  const hasTorrent = !!(item.torrent_link && item.torrent_link.trim());
  const hasTrailer = !!(item.trailer_url && item.trailer_url.trim());
  const isBroken = item.is_broken === 1 || item.is_broken === true;

  const onArchiveClick = handleArchiveToggle || archiveGame;
  const onDeleteClick = confirmDelete || deleteGame;

  return (
    <tr style={{ transition: 'background 0.2s ease', opacity: isArchived ? 0.85 : 1 }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
      <td style={{ padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '600' }}>{item.name}</strong> 
            <span style={{ background: statusBadge, color: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.5px', padding: '2px 8px', borderRadius: '16px', boxShadow: `0 2px 8px ${statusBadge}40` }}>
              {isArchived ? 'Archived' : (item.status || 'published').charAt(0).toUpperCase() + (item.status || 'published').slice(1)}
            </span>

            {/* BROKEN / DEAD LINK BADGE */}
            {isBroken && (
              <span style={{ 
                background: 'rgba(239, 68, 68, 0.2)', 
                color: '#ef4444', 
                border: '1px solid #ef4444', 
                fontSize: '10.5px', 
                fontWeight: '800', 
                padding: '2px 8px', 
                borderRadius: '16px', 
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <i className="fa-solid fa-circle-exclamation"></i> Dead Link
              </span>
            )}
          </div>

          {/* BADGES ROW: SCREENSHOTS + DIRECT LINK + TORRENT LINK + YOUTUBE LINK */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
            {/* Screenshot Count Badge */}
            <span style={{ 
              background: isIncompleteImgs ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)', 
              color: isIncompleteImgs ? '#ef4444' : '#10b981', 
              border: `1px solid ${isIncompleteImgs ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`, 
              fontSize: '10.5px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="fa-solid fa-camera"></i> {imgCount}/6 Pics
            </span>

            {/* Direct Download Badge */}
            <span style={{ 
              background: hasDirect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)', 
              color: hasDirect ? '#10b981' : '#f59e0b', 
              border: `1px solid ${hasDirect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`, 
              fontSize: '10.5px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="fa-solid fa-bolt"></i> {hasDirect ? 'Direct' : 'No Direct'}
            </span>

            {/* Torrent Link Badge */}
            <span style={{ 
              background: hasTorrent ? 'rgba(16, 185, 129, 0.12)' : 'rgba(6, 182, 212, 0.12)', 
              color: hasTorrent ? '#10b981' : '#06b6d4', 
              border: `1px solid ${hasTorrent ? 'rgba(16, 185, 129, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`, 
              fontSize: '10.5px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="fa-solid fa-magnet"></i> {hasTorrent ? 'Torrent' : 'No Torrent'}
            </span>

            {/* YouTube Link Badge */}
            <span style={{ 
              background: hasTrailer ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', 
              color: hasTrailer ? '#10b981' : '#ef4444', 
              border: `1px solid ${hasTrailer ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, 
              fontSize: '10.5px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="fa-brands fa-youtube" style={{ color: hasTrailer ? '#10b981' : '#ff0000' }}></i> {hasTrailer ? 'YouTube' : 'No YouTube'}
            </span>
          </div>

        </div>
      </td>

      <td style={{ padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <span style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
          {item.category || 'Uncategorized'}
        </span>
      </td>

      <td style={{ padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
        Admin
      </td>

      <td style={{ padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <button 
          onClick={() => toggleFeatured && toggleFeatured(item.id, item.is_featured)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: item.is_featured ? '#eab308' : '#334155', transition: 'transform 0.2s' }}
          title={item.is_featured ? "Remove from Featured" : "Mark as Featured"}
        >
          <i className={`fa-${item.is_featured ? 'solid' : 'regular'} fa-star`}></i>
        </button>
      </td>

      {!hideActions && (
        <td className='text-center' style={{ padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
            
            {/* ARCHIVE / RESTORE ACTION BUTTON */}
            {onArchiveClick && (
              <button
                onClick={() => onArchiveClick(item.id, isArchived ? 'published' : 'archived')}
                className="btn btn-sm"
                title={isArchived ? "Restore & Publish to Website" : "Move to Archive Box (Hide from website)"}
                style={{
                  color: isArchived ? '#10b981' : '#f59e0b',
                  border: `1px solid ${isArchived ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                  background: isArchived ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <i className={`fa-solid ${isArchived ? 'fa-box-open' : 'fa-box-archive'}`}></i>
                {isArchived ? 'Publish' : 'Archive'}
              </button>
            )}

            <button
              onClick={async (e) => {
                const btn = e.currentTarget;
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                try {
                  const res = await fetch('/api/admin/rescrape', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ game_id: item.id })
                  });
                  const data = await res.json();
                  if (res.ok) {
                    alert(data.message || 'Links updated!');
                    window.location.reload();
                  } else {
                    alert(data.error || 'Re-scrape failed.');
                  }
                } catch (err) {
                  alert('Re-scrape failed.');
                } finally {
                  btn.disabled = false;
                  btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
                }
              }}
              className="btn btn-sm"
              title="Auto Re-Scrape Fresh Download Links from Source"
              style={{ color: '#06b6d4', border: '1px solid rgba(6, 182, 212, 0.2)', background: 'rgba(6, 182, 212, 0.05)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>

            <Link href={`/admin/games/edit/${item.id}`} className='btn btn-sm' title="Edit Game Specs & Upload Links" style={{ color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.05)', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'; }}>
              <i className='fa-solid fa-pen-to-square'></i>
            </Link>

            {onDeleteClick && (
              <button 
                onClick={() => onDeleteClick(item.id)}
                className='btn btn-sm' 
                title="Delete Game"
                style={{ color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; }}
              >
                <i className='fa-solid fa-trash-can'></i>
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}
