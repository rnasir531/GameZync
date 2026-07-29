'use client';

export default function CategoryForm({ action }) {
  return (
    <div style={{ flex: '1 1 300px', background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
      <h3>Add New Category</h3>
      <form action={action} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input type="text" name="name" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>FontAwesome Icon Class</label>
          <input type="text" name="icon" defaultValue="fa-gamepad" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
        </div>
        <button type="submit" style={{ background: '#00b359', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
          Add Category
        </button>
      </form>
    </div>
  );
}
