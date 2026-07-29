'use client';

export default function LogsTable({ logs }) {
  if (logs.length === 0) {
    return <div className="text-center p-3">No activity logs found.</div>;
  }

  return (
    <table className="table table-hover align-middle mb-0">
      <thead>
        <tr>
          <th>Admin</th>
          <th>Action</th>
          <th>Details</th>
          <th>Date & Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((row) => (
          <tr key={row.id}>
            <td className="fw-bold">
              {row.admin?.first_name ? `${row.admin.first_name} ${row.admin.last_name || ''}` : (row.admin?.username || 'System')}
            </td>
            <td>
              <span className="badge bg-secondary" style={{ background: '#475569', padding: '5px 10px', borderRadius: '6px' }}>{row.action}</span>
            </td>
            <td style={{ color: '#94a3b8' }}>{row.details}</td>
            <td>
              {new Date(row.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
