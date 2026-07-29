'use client';
export default function GameImage({ src, alt, type = 'thumb' }) {
  const fallback = type === 'cover' 
    ? 'https://via.placeholder.com/1200x500?text=No+Cover'
    : 'https://via.placeholder.com/300x160?text=No+Image';
    
  return (
    <img 
      src={src} 
      alt={alt} 
      loading="lazy" 
      onError={(e) => { e.target.onerror = null; e.target.src = fallback; }} 
    />
  );
}
