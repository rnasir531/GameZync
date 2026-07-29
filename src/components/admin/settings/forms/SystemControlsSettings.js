export default function SystemControlsSettings({ settings, handleChange }) {
  return (
    <div className="p-4 rounded d-flex align-items-start gap-4" style={{ background: 'rgba(255, 193, 7, 0.05)', border: '1px solid rgba(255, 193, 7, 0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
      <div className="form-check form-switch pt-1">
        <input className="form-check-input" type="checkbox" role="switch" id="maintenanceSwitch" name="maintenance_mode" checked={settings?.maintenance_mode === 'true'} onChange={handleChange} style={{ width: '45px', height: '24px', cursor: 'pointer' }} />
      </div>
      <div>
        <label className="form-check-label fw-bold text-warning fs-5 mb-1" htmlFor="maintenanceSwitch" style={{ cursor: 'pointer' }}>
          Enable Maintenance Mode
        </label>
        <p className="text-muted mb-0" style={{ fontSize: '14px', lineHeight: '1.5' }}>
          When enabled, all public visitors will see a "Down for Maintenance" screen. <br/>
          Admins can still log in and access the dashboard.
        </p>
      </div>
    </div>
  );
}
