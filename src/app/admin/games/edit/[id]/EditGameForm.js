'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GameBasicInfo from '@/components/admin/forms/GameBasicInfo';
import GameRequirements from '@/components/admin/forms/GameRequirements';
import GameLinks from '@/components/admin/forms/GameLinks';
import GameMedia from '@/components/admin/forms/GameMedia';

export default function EditGameForm({ game, categories = [], selectedCategoryIds = [] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`/api/admin/games/${game.id}/edit`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        router.push('/admin/games');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update game');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1000px', margin: '0 auto', color: '#cbd5e1' }}>
      <div className="card-header d-flex align-items-center mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h4 className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <i className="fa-solid fa-pen-to-square text-primary me-2"></i> Edit Game: {game.name}
        </h4>
      </div>
      
      <form id="gameForm" onSubmit={handleSubmit} encType="multipart/form-data" className="ajax-form">
        
        <GameBasicInfo game={game} categories={categories} selectedCategoryIds={selectedCategoryIds} />
        
        <GameRequirements game={game} />
        
        <GameLinks game={game} />
        
        <GameMedia game={game} isEdit={true} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
          <Link href="/admin/games" className="btn btn-secondary" style={{ padding: '10px 20px', background: '#475569', color: '#fff', textDecoration: 'none', borderRadius: '8px' }}>Cancel</Link>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '10px 20px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
