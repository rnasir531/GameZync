export default function Loading() {
  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ height: '80px', width: '40%', background: 'var(--card-bg)', borderRadius: '12px', marginBottom: '40px' }} className="skeleton-pulse"></div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ height: '36px', width: '100px', background: 'var(--card-bg)', borderRadius: '18px' }} className="skeleton-pulse"></div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ height: '300px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }} className="skeleton-pulse"></div>
        ))}
      </div>
    </section>
  );
}
