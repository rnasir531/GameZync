import { inputStyle, hrStyle } from './styles';

export default function GameBasicInfo({ game = {}, categories = [], selectedCategoryIds = [], hideStatus = false }) {
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
      <div style={{ marginBottom: '32px' }}>
        <h5 style={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>
          <i className="fa-solid fa-circle-info" style={{ color: '#10b981' }}></i> Basic Information
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: hideStatus ? 'repeat(auto-fit, minmax(240px, 1fr))' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label style={labelStyleTheme}>Game Name <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="text" name="name" placeholder="e.g., Cyber Sky" defaultValue={game.name} required style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
          </div>
          <div>
            <label style={labelStyleTheme}>Game Version <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="text" name="game_version" placeholder="e.g., v1.0.3" defaultValue={game.game_version} required style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
          </div>
          <div>
            <label style={labelStyleTheme}>Release Year <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="number" name="release_year" placeholder="e.g., 2024" defaultValue={game.release_year} required style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
          </div>
          
          {!hideStatus ? (
            <div>
              <label style={labelStyleTheme}>Status <span style={{ color: '#ef4444' }}>*</span></label>
              <select name="status" defaultValue={game.status === 'archived' ? 'archived' : 'published'} required style={inputStyleTheme}>
                <option value="published" style={{ background: '#1e293b', color: '#f8fafc' }}>Published (Live on Website)</option>
                <option value="archived" style={{ background: '#1e293b', color: '#f8fafc' }}>Archived (Move to Archive Box)</option>
              </select>
            </div>
          ) : (
            <input type="hidden" name="status" value="published" />
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyleTheme}>Description <span style={{ color: '#ef4444' }}>*</span></label>
          <textarea name="description" placeholder="Detailed game description..." defaultValue={game.description} required rows="5" style={{ ...inputStyleTheme, resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label style={labelStyleTheme}>Developer & Publisher <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="text" name="developer_publisher" placeholder="e.g., Luminous Studio" defaultValue={game.developer_publisher} required style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
          </div>
          <div>
            <label style={labelStyleTheme}>Categories (Select at least one) <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '16px', borderRadius: '10px', display: 'flex', gap: '16px', flexWrap: 'wrap', maxHeight: '150px', overflowY: 'auto' }}>
              {categories.length > 0 ? categories.map(cat => (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    name="categories[]" 
                    value={cat.id} 
                    id={`cat_${cat.id}`} 
                    defaultChecked={selectedCategoryIds.includes(cat.id)} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#10b981' }}
                  />
                  <label htmlFor={`cat_${cat.id}`} style={{ color: '#f8fafc', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>{cat.name}</label>
                </div>
              )) : (
                <div style={{ color: '#94a3b8', fontSize: '14px' }}>No categories found in DB.</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="form-check form-switch m-0" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
            <input 
              className="form-check-input" 
              type="checkbox" 
              name="is_featured" 
              id="is_featured" 
              value="1" 
              defaultChecked={game.is_featured === 1}
              style={{ width: '40px', height: '20px', cursor: 'pointer' }} 
            />
          </div>
          <div>
            <label htmlFor="is_featured" style={{ fontWeight: 'bold', fontSize: '16px', color: '#10b981', cursor: 'pointer', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-star"></i> Featured Game
            </label>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Show this game on homepage hero sliders</span>
          </div>
        </div>
      </div>
  );
}
