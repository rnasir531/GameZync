'use client';
import { useState } from 'react';
import GameBasicInfo from '@/components/admin/forms/GameBasicInfo';
import GameRequirements from '@/components/admin/forms/GameRequirements';
import GameLinks from '@/components/admin/forms/GameLinks';
import GameMedia from '@/components/admin/forms/GameMedia';
import SubmitContactEmail from '@/components/admin/forms/SubmitContactEmail';
import SubmitSuccessBanner from '@/components/admin/forms/SubmitSuccessBanner';

export default function SubmitGameForm({ categories = [] }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [formKey, setFormKey] = useState(0);

  const [compressedCover, setCompressedCover] = useState(null);
  const [compressedImages, setCompressedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    const formData = new FormData(e.target);

    // Ensure email is provided
    const email = formData.get('submitter_email');
    if (!email) {
      setMsg({ text: 'Please enter your email address.', type: 'danger' });
      setLoading(false);
      return;
    }

    // OVERRIDE RAW FILE INPUTS WITH COMPRESSED LIGHTWEIGHT BLOBS TO PREVENT HTTP 413
    if (compressedCover) {
      formData.delete('cover_image');
      formData.append('cover_image', compressedCover);
    }

    if (compressedImages && compressedImages.length > 0) {
      formData.delete('images');
      formData.delete('images[]');
      compressedImages.forEach(file => {
        formData.append('images[]', file);
      });
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      
      if (res.ok) {
        setMsg({ text: '🎉 Your game has been submitted successfully! It has been sent to the Admin Panel for review.', type: 'success' });
        setFormKey(prev => prev + 1);
        setCompressedCover(null);
        setCompressedImages([]);
        setTimeout(() => {
          const bannerElem = document.getElementById('submitSuccessBanner');
          if (bannerElem) {
            bannerElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        setMsg({ text: result.error || 'Failed to submit game for review.', type: 'danger' });
      }
    } catch (err) {
      console.error(err);
      setMsg({ text: 'An unexpected error occurred while submitting.', type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <div>
      {/* PROMINENT TOP SUCCESS / ERROR BANNER */}
      <SubmitSuccessBanner msg={msg} />

      <form 
        key={formKey}
        className="submit-game-form" 
        id="public-submit-game-form" 
        onSubmit={handleSubmit} 
        encType="multipart/form-data"
      >
        {/* SUBMITTER EMAIL REQUIRED SECTION */}
        <SubmitContactEmail />

        {/* FULL ADMIN ADD GAME FORM SECTIONS (HIDE STATUS FOR PUBLIC USERS) */}
        <GameBasicInfo game={{}} categories={categories} selectedCategoryIds={[]} hideStatus={true} />
        
        <GameRequirements game={{}} />
        
        <GameLinks game={{}} />
        
        <GameMedia 
          game={{}} 
          isEdit={false} 
          onCoverCompressed={(file) => setCompressedCover(file)}
          onImagesCompressed={(files) => setCompressedImages(files)}
        />

        <div className="form-submit-row" style={{ marginTop: '32px' }}>
          <p className="form-disclaimer" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            By submitting, you confirm that you have the right to distribute or promote this game. It will be sent directly to the Admin Panel for review.
          </p>
          <button type="submit" disabled={loading} className="submit-action-btn" style={{ background: '#10b981', color: '#fff', padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-paper-plane"></i> {loading ? 'Submitting for Review...' : 'Submit Game for Admin Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
