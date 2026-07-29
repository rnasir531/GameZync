'use client';
import Link from 'next/link';
import { useState } from 'react';
import AddGameModal from '@/components/admin/modals/AddGameModal';

export default function DashboardQuickActions({ actionNeeded = [], categories = [] }) {
  const [showAddGame, setShowAddGame] = useState(false);

  return (
    <>
      <div className="dashboard-panel" style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setShowAddGame(true)} 
          className="add-game-btn" 
        >
          <i className="fa-solid fa-plus-circle"></i> Add New Game
        </button>
        
        {actionNeeded.map((action, idx) => (
          <Link key={idx} href={action.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <i className={`fa-solid ${action.icon}`}></i> {action.text}
          </Link>
        ))}

        <Link href="/" target="_blank" className="btn" style={{ padding: '8px 16px', fontSize: '14px', background: 'var(--search-bg)', color: 'var(--text-color)', marginLeft: 'auto' }}>
          <i className="fa-solid fa-external-link-alt"></i> Visit Site
        </Link>
      </div>

      {showAddGame && (
        <AddGameModal 
          categories={categories} 
          onClose={() => setShowAddGame(false)} 
        />
      )}
    </>
  );
}
