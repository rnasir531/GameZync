import { inputStyle, hrStyle } from './styles';

export default function GameRequirements({ game = {} }) {
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
        <i className="fa-solid fa-microchip" style={{ color: '#8b5cf6' }}></i> System Requirements
      </h5>
      
      {/* ROW 1: OPERATING SYSTEM, PROCESSOR, GRAPHICS CARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={labelStyleTheme}>Operating System <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            name="os" 
            placeholder="e.g., Windows 10/11 64-bit" 
            defaultValue={game.os || ''} 
            required 
            style={inputStyleTheme} 
            onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'} 
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} 
          />
        </div>

        <div>
          <label style={labelStyleTheme}>Processor <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            name="processor" 
            placeholder="e.g., Intel Core i5-8400 / AMD Ryzen 5 2600" 
            defaultValue={game.processor || ''} 
            required 
            style={inputStyleTheme} 
            onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'} 
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} 
          />
        </div>

        <div>
          <label style={labelStyleTheme}>Graphics Card <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            name="graphics_card" 
            placeholder="e.g., NVIDIA GeForce GTX 1060 / AMD Radeon RX 580" 
            defaultValue={game.graphics_card || ''} 
            required 
            style={inputStyleTheme} 
            onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'} 
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} 
          />
        </div>
      </div>

      {/* ROW 2: DIRECTX, RAM, STORAGE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div>
          <label style={labelStyleTheme}>DirectX <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            name="directx" 
            placeholder="e.g., Version 11 / Version 12" 
            defaultValue={game.directx || ''} 
            required 
            style={inputStyleTheme} 
            onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'} 
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} 
          />
        </div>

        <div>
          <label style={labelStyleTheme}>RAM (GB) <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            name="ram" 
            placeholder="e.g., 8 GB / 16 GB" 
            defaultValue={game.ram || ''} 
            required 
            style={inputStyleTheme} 
            onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'} 
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} 
          />
        </div>

        <div>
          <label style={labelStyleTheme}>Storage (GB) <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            name="storage" 
            placeholder="e.g., 50 GB available space" 
            defaultValue={game.storage || ''} 
            required 
            style={inputStyleTheme} 
            onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'} 
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} 
          />
        </div>
      </div>
    </div>
  );
}
