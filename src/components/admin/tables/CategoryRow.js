'use client';
import { getCategoryData } from '@/lib/categoryData';

const tdStyle = { padding: '16px', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.05)' };

/**
 * CategoryRow — single row for Categories table
 * Props: cat, onEdit, onDelete
 */
export default function CategoryRow({ cat, onEdit, onDelete }) {
  const data = getCategoryData(cat.name);
  const finalImg = cat.image_url || data.img;
  const finalDesc = cat.description || data.desc;

  return (
    <tr
      style={{ transition: 'background 0.2s ease' }}
      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Category Info */}
      <td style={tdStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className={`fa-solid ${cat.icon || data.icon}`} style={{ fontSize: '18px', color: '#8b5cf6' }}></i>
          </div>
          {finalImg && (
            <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={finalImg} alt={cat.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
          )}
          <div>
            <strong style={{ fontSize: '15px', color: '#f8fafc', fontWeight: '600', display: 'block', marginBottom: '4px' }}>{cat.name}</strong>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>ID: #{cat.id}</span>
          </div>
        </div>
      </td>

      {/* Description */}
      <td style={{ ...tdStyle, color: '#cbd5e1', fontSize: '13px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {finalDesc}
      </td>

      {/* Game Count */}
      <td className="text-center" style={tdStyle}>
        <span style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
          {cat.game_count || 0} Games
        </span>
      </td>

      {/* Actions */}
      <td className="text-center" style={tdStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <button onClick={() => onEdit(cat)} title="Edit Category"
            style={{ color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(16,185,129,0.05)'}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={() => onDelete(cat.id)} title="Delete Category"
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
