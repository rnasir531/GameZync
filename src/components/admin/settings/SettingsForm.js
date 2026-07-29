'use client';

export default function SettingsForm({ settings, updateAction }) {
  const getVal = (k, def) => {
    const s = settings.find(x => x.setting_key === k);
    return s ? s.setting_value : def;
  };

  return (
    <div style={{ background: '#1e293b', padding: '30px', borderRadius: '12px', maxWidth: '600px' }}>
      <form action={updateAction} style={{ marginBottom: '20px' }}>
        <input type="hidden" name="key" value="site_title" />
        <label style={{ display: 'block', marginBottom: '8px' }}>Site Title</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" name="value" defaultValue={getVal('site_title', 'NS Games')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
          <button type="submit" style={{ background: '#00b359', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
        </div>
      </form>

      <form action={updateAction} style={{ marginBottom: '20px' }}>
        <input type="hidden" name="key" value="site_desc" />
        <label style={{ display: 'block', marginBottom: '8px' }}>Site Description</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <textarea name="value" defaultValue={getVal('site_desc', 'Best games directory')} rows={3} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
          <button type="submit" style={{ background: '#00b359', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
        </div>
      </form>

      <form action={updateAction} style={{ marginBottom: '20px' }}>
        <input type="hidden" name="key" value="maintenance_mode" />
        <label style={{ display: 'block', marginBottom: '8px' }}>Maintenance Mode</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select name="value" defaultValue={getVal('maintenance_mode', 'off')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}>
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
          <button type="submit" style={{ background: '#00b359', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
        </div>
      </form>

      <form action={updateAction}>
        <input type="hidden" name="key" value="nav_sidebar_splitter" />
        <label style={{ display: 'block', marginBottom: '8px' }}>Nav Sidebar Splitter (Appearance)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select name="value" defaultValue={getVal('nav_sidebar_splitter', 'off')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}>
            <option value="off">Off (Unified Look)</option>
            <option value="on">On (Show Line & Shadow)</option>
          </select>
          <button type="submit" style={{ background: '#00b359', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
        </div>
      </form>
    </div>
  );
}
