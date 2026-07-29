'use client';
import { useState } from 'react';

// Bulletproof image compressor supporting 8K photos and all image formats
const compressImageFile = async (file, maxWidth = 600, quality = 0.6) => {
  if (!file || !file.type.startsWith('image/')) return file;

  // Yield execution to browser render loop (30ms) for 60 FPS UI
  await new Promise((r) => setTimeout(r, 30));

  // Method 1: Try Native C++ createImageBitmap
  try {
    if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      let width = bitmap.width;
      let height = bitmap.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
      if (blob) {
        return new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      }
    }
  } catch (e) {
    console.warn('createImageBitmap fallback to FileReader:', e);
  }

  // Method 2: Guaranteed FileReader + HTML5 Canvas Fallback
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export default function GameMedia({ game = {}, isEdit = false, onCoverCompressed, onImagesCompressed }) {
  const [coverPreview, setCoverPreview] = useState(game.cover_image || game.image_url || null);
  const [imagesPreview, setImagesPreview] = useState(() => {
    if (game.images) {
      if (Array.isArray(game.images)) return game.images;
      return String(game.images).split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  });

  const [compressStatus, setCompressStatus] = useState('');

  const handleCoverChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0];
      setCompressStatus('⚡ Optimizing cover image...');
      
      const compressedFile = await compressImageFile(originalFile, 600, 0.6);
      
      if (onCoverCompressed) {
        onCoverCompressed(compressedFile);
      }

      setCoverPreview(URL.createObjectURL(compressedFile));
      setCompressStatus('');
    }
  };

  const handleImagesChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const rawFiles = Array.from(e.target.files).slice(0, 6);
      const compressedFiles = [];
      const previews = [];

      for (let i = 0; i < rawFiles.length; i++) {
        setCompressStatus(`⚡ Optimizing screenshot ${i + 1} of ${rawFiles.length}...`);
        const comp = await compressImageFile(rawFiles[i], 600, 0.55);
        compressedFiles.push(comp);
        previews.push(URL.createObjectURL(comp));
      }

      if (onImagesCompressed) {
        onImagesCompressed(compressedFiles);
      }

      setImagesPreview(previews);
      setCompressStatus('');
    }
  };

  const inputStyleTheme = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#f8fafc',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25)',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  };

  const labelStyleTheme = {
    display: 'block',
    color: '#94a3b8',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: '700'
  };

  return (
    <div style={{ marginBottom: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <h5 style={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', flexWrap: 'wrap' }}>
        <i className="fa-solid fa-photo-film" style={{ color: '#eab308' }}></i> Media Assets
        {compressStatus && (
          <span style={{ fontSize: '12.5px', color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '4px 12px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
            <i className="fa-solid fa-circle-notch fa-spin"></i> {compressStatus}
          </span>
        )}
      </h5>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyleTheme}>Trailer URL (YouTube)</label>
        <input type="url" name="trailer_url" placeholder="https://youtube.com/watch?v=..." defaultValue={game.trailer_url} style={inputStyleTheme} onFocus={(e) => e.target.style.borderColor = 'rgba(234, 179, 8, 0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '20px' }}>
          <label style={{ display: 'block', color: '#f8fafc', marginBottom: '12px', fontSize: '14px', fontWeight: 'bold' }}>Cover Image <span style={{ color: '#ef4444' }}>*</span></label>
          <input type="file" name="cover_image" accept="image/*" onChange={handleCoverChange} required={!coverPreview} style={{ width: '100%', padding: '10px', background: '#020617', border: '1px dashed rgba(255,255,255,0.2)', color: '#94a3b8', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }} />
          {coverPreview && <input type="hidden" name="existing_cover" value={coverPreview} />}
          {coverPreview && (
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(234, 179, 8, 0.5)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={coverPreview} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '20px' }}>
          <label style={{ display: 'block', color: '#f8fafc', marginBottom: '12px', fontSize: '14px', fontWeight: 'bold' }}>Screenshots (Up to 6) <span style={{ color: '#ef4444' }}>*</span></label>
          <input type="file" name="images" accept="image/*" multiple onChange={handleImagesChange} required={imagesPreview.length === 0} style={{ width: '100%', padding: '10px', background: '#020617', border: '1px dashed rgba(255,255,255,0.2)', color: '#94a3b8', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }} />
          {imagesPreview.length > 0 && <input type="hidden" name="existing_images" value={imagesPreview.join(',')} />}
          {imagesPreview.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
              {imagesPreview.map((src, index) => (
                <div key={index} style={{ aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={src} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
