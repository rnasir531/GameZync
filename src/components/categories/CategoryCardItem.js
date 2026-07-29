'use client';
import React from 'react';
import Link from 'next/link';

export default function CategoryCardItem({ cat, data, keyName }) {
  return (
    <Link href={`/library?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none', display: 'contents' }}>
      <div className="category-card" data-key={keyName} data-title={cat.name}>
        <img 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} 
          className="cat-bg-img" 
          src={cat.image_url || data.img} 
          alt={cat.name} 
          loading="lazy" 
        />
        <div className="cat-card-overlay"></div>
        <div className="cat-content">
          <div className="cat-content-top">
            <div className="cat-icon-wrap"><i className={cat.icon || data.icon}></i></div>
            <div className="cat-hover-arrow" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{cat.game_count || 0} Games</span>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="cat-content-bottom">
            <h3>{cat.name}</h3>
            <p>{cat.description || data.desc}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
