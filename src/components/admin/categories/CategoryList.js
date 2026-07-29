'use client';

export default function CategoryList({ categories, deleteAction }) {
  return (
    <div style={{ flex: '2 1 500px', background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
      <h3>Current Categories</h3>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Icon</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px' }}>{cat.id}</td>
              <td style={{ padding: '10px' }}><i className={`fa-solid ${cat.icon}`}></i></td>
              <td style={{ padding: '10px' }}>{cat.name}</td>
              <td style={{ padding: '10px' }}>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={cat.id} />
                  <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
