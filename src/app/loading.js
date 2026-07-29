export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--primary-color)', flexDirection: 'column', gap: '20px' }}>
      <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
      <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Loading content...</p>
    </div>
  );
}
