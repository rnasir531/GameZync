export default function Loading() {
  return (
    <div style={{ padding: '40px 0', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <div style={{ width: '280px', height: '400px', background: 'var(--card-bg)', borderRadius: '16px' }} className="skeleton-pulse"></div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ height: '50px', width: '60%', background: 'var(--card-bg)', borderRadius: '8px', marginBottom: '20px' }} className="skeleton-pulse"></div>
          <div style={{ height: '24px', width: '30%', background: 'var(--card-bg)', borderRadius: '8px', marginBottom: '40px' }} className="skeleton-pulse"></div>
          
          <div style={{ height: '150px', width: '100%', background: 'var(--card-bg)', borderRadius: '12px', marginBottom: '30px' }} className="skeleton-pulse"></div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ height: '50px', width: '200px', background: 'var(--card-bg)', borderRadius: '8px' }} className="skeleton-pulse"></div>
            <div style={{ height: '50px', width: '200px', background: 'var(--card-bg)', borderRadius: '8px' }} className="skeleton-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
