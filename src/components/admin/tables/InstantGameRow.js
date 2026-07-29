'use client';

const tdStyle = { padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)' };

/**
 * InstantGameRow — single row for Instant Games table
 * Props: row, onEdit, onDelete
 */
export default function InstantGameRow({ row, onEdit, onDelete }) {
  return (
    <tr
      style={{ transition: 'background 0.2s ease' }}
      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Thumbnail */}
      <td style={tdStyle}>
        {row.image_url ? (
          <div style={{ width: '80px', height: '45px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={row.image_url} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{ width: '80px', height: '45px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            No Image
          </div>
        )}
      </td>

      {/* Title */}
      <td style={tdStyle}>
        <strong style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '600' }}>{row.title}</strong>
      </td>

      {/* Category */}
      <td style={tdStyle}>
        <span style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
          {row.category || 'Uncategorized'}
        </span>
      </td>

      {/* Link */}
      <td style={tdStyle}>
        <a href={row.embed_url} target="_blank" title="Play Game"
          style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', background: 'rgba(255,255,255,0.02)' }}
          onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </td>

      {/* Actions */}
      <td className="text-center" style={tdStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <button onClick={() => onEdit(row)} title="Edit"
            style={{ color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(16,185,129,0.05)'}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={() => onDelete(row.id)} title="Delete"
            style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,0.05)'}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
