'use client';

import React from 'react';
import { getCategoryData } from '@/lib/categoryData';
import CategoryCardItem from './CategoryCardItem';

export default function CategoriesView({ categories }) {
  return (
    <section className="categories-view-section" id="categories-selection-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="games-view-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <span className="subtitle">Browse Genres</span>
          <h2 className="section-title">Game Categories</h2>
        </div>
      </div>
      
      <div className="categories-grid">
        {categories.length === 0 ? (
          <div className="text-muted w-100 p-4 text-center" style={{ gridColumn: '1 / -1' }}>
            No categories found.
          </div>
        ) : (
          categories.map(cat => {
            const data = getCategoryData(cat.name);
            const keyName = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            return (
              <CategoryCardItem key={cat.id} cat={cat} data={data} keyName={keyName} />
            );
          })
        )}
      </div>
    </section>
  );
}
