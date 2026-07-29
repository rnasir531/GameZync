'use client';
import { useState } from 'react';

export default function GameScreenshots({ images }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="details-info-card">
        <h3 className="details-card-title"><i className="fa-solid fa-images"></i> Gameplay Gallery</h3>
        <div className="gameplay-screenshots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ aspectRatio: '16/9', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }} onClick={() => setLightboxImg(img)}>
              <img src={img} alt={`Screenshot ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x225/1a1d25/555?text=Screenshot'; }} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="gallery-lightbox" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, justifyContent: 'center', alignItems: 'center' }}>
          <div className="lightbox-backdrop" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)' }} onClick={() => setLightboxImg(null)}></div>
          <div className="lightbox-container" style={{ position: 'relative', zIndex: 10000, maxWidth: '90%', maxHeight: '90%' }}>
            <button style={{ position: 'absolute', top: '-40px', right: '0', background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }} onClick={() => setLightboxImg(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img src={lightboxImg} alt="Enlarged screenshot" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      )}
    </>
  );
}
