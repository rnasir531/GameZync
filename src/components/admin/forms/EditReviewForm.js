'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GameBasicInfo from '@/components/admin/forms/GameBasicInfo';
import GameRequirements from '@/components/admin/forms/GameRequirements';
import GameLinks from '@/components/admin/forms/GameLinks';
import GameMedia from '@/components/admin/forms/GameMedia';

export default function EditReviewForm({ game, categories = [], onClose, onUpdate }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Convert categories string/array to array of IDs so ALL user-selected categories are checked
  let selectedCategoryIds = [];
  try {
    if (game.reviewGameCategories && Array.isArray(game.reviewGameCategories) && game.reviewGameCategories.length > 0) {
      selectedCategoryIds = game.reviewGameCategories.map(c => c.category_id);
    }
    if (selectedCategoryIds.length === 0 && game.category) {
      const names = game.category.split(',').map(s => s.trim().toLowerCase());
      categories.forEach(cat => {
        if (names.includes(cat.name.toLowerCase()) || names.some(n => n === cat.name.toLowerCase())) {
          selectedCategoryIds.push(cat.id);
        }
      });
    }
  } catch(e) {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg({ text: '', type: '' });
    
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`/api/admin/reviews/${game.id}`, {
        method: 'PUT',
        body: formData
      });
      const result = await res.json();
      
      if (res.ok) {
        window.location.reload();
      } else {
        setMsg({ text: result.error || 'Failed to update game', type: 'danger' });
      }
    } catch (err) {
      console.error(err);
      setMsg({ text: 'An unexpected error occurred.', type: 'danger' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${game.name}" from review submissions?`)) {
      return;
    }
    setIsSubmitting(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await fetch(`/api/admin/reviews/${game.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const result = await res.json().catch(() => ({}));
        setMsg({ text: result.error || 'Failed to delete submission.', type: 'danger' });
      }
    } catch (err) {
      console.error(err);
      setMsg({ text: 'An error occurred while deleting.', type: 'danger' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="card-header d-flex align-items-center pb-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h4 className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-pen-to-square text-primary"></i> Edit Review Game
        </h4>
      </div>

      {/* Read-only Submitter Email */}
      <div style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.1)', marginBottom: '10px', marginTop: '20px' }}>
        <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '4px' }}>
          Submitter Contact Email
        </label>
        <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)' }}>
          {game.submitter_email || 'No email provided'}
        </span>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ padding: '20px 0' }}>
        
        {msg.text && (
          <div className={`alert alert-${msg.type} mb-4`} role="alert">
            {msg.text}
          </div>
        )}

        <GameBasicInfo game={game} categories={categories} selectedCategoryIds={selectedCategoryIds} hideStatus={false} />
        
        <GameRequirements game={game} />
        
        <GameLinks game={game} />
        
        <GameMedia game={game} isEdit={true} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
          <button 
            type="button" 
            onClick={handleDelete} 
            disabled={isSubmitting} 
            style={{ 
              padding: '12px 20px', 
              borderRadius: '10px', 
              fontWeight: '700', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              border: '1px solid rgba(239, 68, 68, 0.5)', 
              color: '#ef4444', 
              background: 'rgba(239, 68, 68, 0.1)', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <i className="fa-solid fa-trash-can"></i> Delete Submission
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '12px 24px', borderRadius: '10px', fontWeight: '600' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-check"></i>
              {isSubmitting ? 'Saving Changes...' : 'Save Review Changes'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
