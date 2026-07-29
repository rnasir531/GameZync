'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GameBasicInfo from '@/components/admin/forms/GameBasicInfo';
import GameRequirements from '@/components/admin/forms/GameRequirements';
import GameLinks from '@/components/admin/forms/GameLinks';
import GameMedia from '@/components/admin/forms/GameMedia';

export default function AdminAddGame({ categories = [], game = {} }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute selected categories based on scraped genre string (e.g., "Action, RPG")
  const selectedCategoryIds = [];
  if (game.category) {
    const fetchedCategories = game.category.split(',').map(c => c.trim().toLowerCase());
    categories.forEach(cat => {
      if (fetchedCategories.some(fc => fc === cat.name.toLowerCase() || fc.includes(cat.name.toLowerCase()))) {
        selectedCategoryIds.push(cat.id);
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    // Validate that at least one download link is provided
    const directLink = formData.get('direct_download_link');
    const torrentLink = formData.get('torrent_link');
    if (!directLink && !torrentLink) {
      alert('Please provide at least one download link (Direct Download or Torrent).');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/games', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        window.location.href = '/admin/games';
      } else {
        const resText = await res.text().catch(() => '');
        let errMsg = 'Failed to add game';
        try {
          const data = JSON.parse(resText);
          errMsg = data.error || errMsg;
        } catch (e) {}
        alert(errMsg);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while uploading.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'var(--panel-bg, #111)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
          <i className="fa-solid fa-plus-circle"></i>
        </div>
        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f8fafc' }}>
          Add New Game
        </h4>
      </div>
      
      <form id="gameForm" onSubmit={handleSubmit} encType="multipart/form-data" style={{ padding: '32px' }}>
        
        <GameBasicInfo game={game} categories={categories} selectedCategoryIds={selectedCategoryIds} />
        
        <GameRequirements game={game} />
        
        <GameLinks game={game} />
        
        <GameMedia game={game} isEdit={false} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/admin/games" className="btn" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', borderRadius: '10px', fontWeight: '600', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>Cancel</Link>
          <button type="submit" className="btn" disabled={isSubmitting} style={{ padding: '12px 24px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <i className="fa-solid fa-upload"></i>
            {isSubmitting ? 'Uploading...' : 'Publish Game'}
          </button>
        </div>
      </form>
    </div>
  );
}
