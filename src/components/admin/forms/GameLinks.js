import { inputStyle, hrStyle } from './styles';

export default function GameLinks({ game = {} }) {
  const inputStyleTheme = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#f8fafc',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25)',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  };

  const labelStyleTheme = {
    display: 'block',
    color: '#94a3b8',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: '700'
  };

  return (
      <div style={{ marginBottom: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h5 style={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>
          <i className="fa-solid fa-link" style={{ color: '#10b981' }}></i> Download Links
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div>
            <label style={labelStyleTheme}>Direct Download Link <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 'normal' }}>(Optional)</span></label>
            <input type="url" name="direct_download_link" placeholder="https://cdn.example.com/file.zip" defaultValue={game.direct_download_link} style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
          </div>
          <div>
            <label style={labelStyleTheme}>Torrent Download Link <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 'normal' }}>(Optional)</span></label>
            <input type="url" name="torrent_link" placeholder="magnet:?xt=urn:btih:..." defaultValue={game.torrent_link} style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
          </div>
        </div>
      </div>
  );
}
