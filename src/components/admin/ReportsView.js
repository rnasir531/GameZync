'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ReportsView({ initialReports }) {
  const [reports, setReports] = useState(initialReports);

  const handleResolve = async (id) => {
    await fetch('/api/admin/reports/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report_id: id })
    });
    setReports(reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
  };

  const handleDelete = async (id) => {
    if(!confirm('Are you sure you want to delete this report?')) return;
    await fetch('/api/admin/reports/resolve', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report_id: id })
    });
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2><i className="fa-solid fa-flag"></i> Dead Link Reports</h2>
        <p>Review and resolve user-reported dead links.</p>
      </div>

      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Game</th>
                <th>Reporter IP</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No reports found.</td></tr>
              ) : reports.map(r => (
                <tr key={r.id}>
                  <td>#{r.id}</td>
                  <td><Link href={`/game/${r.game_id}`} target="_blank" style={{color: 'var(--primary-color)'}}>{r.game_name}</Link></td>
                  <td>{r.user_ip}</td>
                  <td>{new Date(r.report_date).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      background: r.status === 'resolved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: r.status === 'resolved' ? 'var(--success-color)' : 'var(--warning-color)'
                    }}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '10px' }}>
                    {r.status !== 'resolved' && (
                      <button onClick={() => handleResolve(r.id)} style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Resolve</button>
                    )}
                    <button onClick={() => handleDelete(r.id)} style={{ background: 'var(--danger-color)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
