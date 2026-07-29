'use client';
import Link from 'next/link';

export default function CarouselSlideItem({ game, index, activeIndex, totalCards, onSelect }) {
  let diff = index - activeIndex;
  if (diff > totalCards / 2) diff -= totalCards;
  if (diff < -totalCards / 2) diff += totalCards;
  
  let className = 'carousel-card ';
  if (diff === 0) className += 'active';
  else if (diff === 1) className += 'next-1';
  else if (diff === 2) className += 'next-2';
  else if (diff === -1) className += 'prev-1';
  else if (diff === -2) className += 'prev-2';
  else className += 'hidden-card';

  return (
    <div 
      className={className} 
      data-index={index}
      onClick={() => onSelect(index)}
      style={{ cursor: index === activeIndex ? 'default' : 'pointer' }}
    >
      <img 
        src={game.cover_image || `/uploads/games/${game.id}/cover.jpg`} 
        alt={game.name || game.title} 
        decoding={index === 0 ? "async" : "auto"} 
        loading={index === 0 ? "eager" : "lazy"} 
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1200x500/1a1d25/555?text=${encodeURIComponent(game.name || game.title || 'Game')}` }}
      />
      <div className="carousel-badge">
        <i className="fa-solid fa-fire" style={{ color: '#f59e0b', marginRight: '6px' }}></i> Featured
      </div>
      <div className="carousel-info">
        <h3>{game.name || game.title}</h3>
        <p>{game.category}</p>
        <Link href={`/game/${game.id}`} style={{ textDecoration: 'none' }}>
          <button className="carousel-play-btn"><i className="fa-solid fa-download"></i> Download Now</button>
        </Link>
      </div>
    </div>
  );
}
