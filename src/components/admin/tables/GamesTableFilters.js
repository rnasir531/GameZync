'use client';

export default function GamesTableFilters({
  searchTerm,
  setSearchTerm,
  filterNoLink,
  setFilterNoLink,
  filterIncompletePics,
  setFilterIncompletePics,
  filterNoDirect,
  setFilterNoDirect,
  filterNoTorrent,
  setFilterNoTorrent,
  filterNoYoutube,
  setFilterNoYoutube,
  filterBrokenLink,
  setFilterBrokenLink,
  counts: { noLinkCount, incompletePicsCount, noDirectCount, noTorrentCount, noYoutubeCount, brokenLinkCount }
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
      
      {/* PERFECT LIVE SEARCH INPUT BAR */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
        <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '15px', pointerEvents: 'none' }}></i>
        <input
          type="text"
          placeholder="Live search games by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px 12px 46px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            color: '#ffffff',
            outline: 'none',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
          onFocus={(e) => { e.target.style.borderColor = '#10b981'; e.target.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.25)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)'; }}
        />
      </div>

      {/* SINGLE ROW RADIO BUTTON FILTER PILLS (NO QUICK FILTERS TEXT LABEL, CIRCULAR RADIOS) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        width: '100%',
        background: 'rgba(255, 255, 255, 0.02)', 
        border: '1px solid rgba(255, 255, 255, 0.07)', 
        padding: '12px 14px', 
        borderRadius: '14px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        boxSizing: 'border-box'
      }}>

        {/* Filter 1: No Link (Both Direct & Torrent Missing) */}
        <label style={{ 
          flex: 1,
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px', 
          cursor: 'pointer', 
          fontSize: '12px', 
          fontWeight: '700', 
          padding: '7px 8px',
          borderRadius: '9px',
          background: filterNoLink ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
          border: `1.5px solid ${filterNoLink ? '#ef4444' : 'rgba(255, 255, 255, 0.09)'}`,
          color: filterNoLink ? '#ef4444' : '#cbd5e1',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          <input 
            type="radio" 
            name="gameFilterRadio"
            checked={filterNoLink} 
            onClick={() => setFilterNoLink(!filterNoLink)} 
            onChange={() => {}}
            style={{ width: '15px', height: '15px', accentColor: '#ef4444', cursor: 'pointer' }}
          />
          <i className="fa-solid fa-link-slash" style={{ color: '#ef4444', fontSize: '13px' }}></i> No Link ({noLinkCount})
        </label>

        {/* Filter 2: Incomplete Pics (< 6) */}
        <label style={{ 
          flex: 1,
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px', 
          cursor: 'pointer', 
          fontSize: '12px', 
          fontWeight: '700', 
          padding: '7px 8px',
          borderRadius: '9px',
          background: filterIncompletePics ? 'rgba(239, 68, 68, 0.18)' : 'rgba(255, 255, 255, 0.04)',
          border: `1.5px solid ${filterIncompletePics ? '#ef4444' : 'rgba(255, 255, 255, 0.09)'}`,
          color: filterIncompletePics ? '#ef4444' : '#cbd5e1',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          <input 
            type="radio" 
            name="gameFilterRadio"
            checked={filterIncompletePics} 
            onClick={() => setFilterIncompletePics(!filterIncompletePics)} 
            onChange={() => {}}
            style={{ width: '15px', height: '15px', accentColor: '#ef4444', cursor: 'pointer' }}
          />
          <i className="fa-solid fa-camera" style={{ color: '#ef4444', fontSize: '13px' }}></i> Pics &lt; 6 ({incompletePicsCount})
        </label>

        {/* Filter 3: No Direct Link */}
        <label style={{ 
          flex: 1,
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px', 
          cursor: 'pointer', 
          fontSize: '12px', 
          fontWeight: '700', 
          padding: '7px 8px',
          borderRadius: '9px',
          background: filterNoDirect ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.04)',
          border: `1.5px solid ${filterNoDirect ? '#f59e0b' : 'rgba(255, 255, 255, 0.09)'}`,
          color: filterNoDirect ? '#f59e0b' : '#cbd5e1',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          <input 
            type="radio" 
            name="gameFilterRadio"
            checked={filterNoDirect} 
            onClick={() => setFilterNoDirect(!filterNoDirect)} 
            onChange={() => {}}
            style={{ width: '15px', height: '15px', accentColor: '#f59e0b', cursor: 'pointer' }}
          />
          <i className="fa-solid fa-bolt" style={{ color: '#f59e0b', fontSize: '13px' }}></i> No Direct ({noDirectCount})
        </label>

        {/* Filter 4: No Torrent Link */}
        <label style={{ 
          flex: 1,
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px', 
          cursor: 'pointer', 
          fontSize: '12px', 
          fontWeight: '700', 
          padding: '7px 8px',
          borderRadius: '9px',
          background: filterNoTorrent ? 'rgba(6, 182, 212, 0.18)' : 'rgba(255, 255, 255, 0.04)',
          border: `1.5px solid ${filterNoTorrent ? '#06b6d4' : 'rgba(255, 255, 255, 0.09)'}`,
          color: filterNoTorrent ? '#06b6d4' : '#cbd5e1',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          <input 
            type="radio" 
            name="gameFilterRadio"
            checked={filterNoTorrent} 
            onClick={() => setFilterNoTorrent(!filterNoTorrent)} 
            onChange={() => {}}
            style={{ width: '15px', height: '15px', accentColor: '#06b6d4', cursor: 'pointer' }}
          />
          <i className="fa-solid fa-magnet" style={{ color: '#06b6d4', fontSize: '13px' }}></i> No Torrent ({noTorrentCount})
        </label>

        {/* Filter 5: No YouTube Link */}
        <label style={{ 
          flex: 1,
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px', 
          cursor: 'pointer', 
          fontSize: '12px', 
          fontWeight: '700', 
          padding: '7px 8px',
          borderRadius: '9px',
          background: filterNoYoutube ? 'rgba(239, 68, 68, 0.18)' : 'rgba(255, 255, 255, 0.04)',
          border: `1.5px solid ${filterNoYoutube ? '#ef4444' : 'rgba(255, 255, 255, 0.09)'}`,
          color: filterNoYoutube ? '#ef4444' : '#cbd5e1',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          <input 
            type="radio" 
            name="gameFilterRadio"
            checked={filterNoYoutube} 
            onClick={() => setFilterNoYoutube(!filterNoYoutube)} 
            onChange={() => {}}
            style={{ width: '15px', height: '15px', accentColor: '#ef4444', cursor: 'pointer' }}
          />
          <i className="fa-brands fa-youtube" style={{ color: '#ff0000', fontSize: '14px' }}></i> No YouTube ({noYoutubeCount})
        </label>

        {/* Filter 6: Broken Links */}
        <label style={{ 
          flex: 1,
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px', 
          cursor: 'pointer', 
          fontSize: '12px', 
          fontWeight: '800', 
          padding: '7px 8px',
          borderRadius: '9px',
          background: filterBrokenLink ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.1)',
          border: `1.5px solid ${filterBrokenLink ? '#ef4444' : 'rgba(239, 68, 68, 0.3)'}`,
          color: '#ef4444',
          transition: 'all 0.2s ease',
          boxShadow: filterBrokenLink ? '0 0 14px rgba(239, 68, 68, 0.3)' : 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          <input 
            type="radio" 
            name="gameFilterRadio"
            checked={filterBrokenLink} 
            onClick={() => setFilterBrokenLink(!filterBrokenLink)} 
            onChange={() => {}}
            style={{ width: '15px', height: '15px', accentColor: '#ef4444', cursor: 'pointer' }}
          />
          <i className="fa-solid fa-circle-exclamation" style={{ color: '#ef4444', fontSize: '13px' }}></i> Broken Links ({brokenLinkCount})
        </label>
      </div>

    </div>
  );
}
