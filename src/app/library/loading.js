export default function Loading() {
  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ height: '40px', width: '30%', background: 'var(--card-bg)', borderRadius: '12px', marginBottom: '30px' }} className="skeleton-pulse"></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{ height: '340px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }} className="skeleton-pulse"></div>
        ))}
      </div>
    </section>
  );
}
