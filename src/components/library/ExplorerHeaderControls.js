'use client';
import React from 'react';
import Link from 'next/link';

export default function ExplorerHeaderControls({ initialCategory, initialYear, initialSort, initialView, initialQ }) {
  return (
    <div className="games-view-header">
      <div>
        <span className="subtitle" id="explorer-subtitle">
          {initialYear ? `Release Year: ${initialYear}` : (initialCategory ? `Category: ${initialCategory}` : 'GameZync Directory')}
        </span>
        <h2 className="section-title" id="explorer-title">
          {initialYear ? `Games Released in ${initialYear}` : (initialCategory ? `${initialCategory} Games` : (initialSort === 'recent' ? 'All Recent Games' : 'All Library Games'))}
        </h2>
      </div>
      <div className="explorer-controls-wrapper" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div className="sorting-bar" style={{ display: 'flex', background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
          <Link href={`/library?sort=recent&view=${initialView}${initialCategory ? `&category=${initialCategory}` : ''}${initialYear ? `&year=${initialYear}` : ''}${initialQ ? `&q=${initialQ}` : ''}`} className={`sorting-btn ${initialSort === 'recent' ? 'active' : ''}`} title="Sort Recent" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-clock-rotate-left"></i> Recent
          </Link>
          <Link href={`/library?sort=asc&view=${initialView}${initialCategory ? `&category=${initialCategory}` : ''}${initialYear ? `&year=${initialYear}` : ''}${initialQ ? `&q=${initialQ}` : ''}`} className={`sorting-btn ${initialSort === 'asc' ? 'active' : ''}`} title="Sort A-Z (Ascending)" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-arrow-down-a-z"></i> A-Z
          </Link>
          <Link href={`/library?sort=desc&view=${initialView}${initialCategory ? `&category=${initialCategory}` : ''}${initialYear ? `&year=${initialYear}` : ''}${initialQ ? `&q=${initialQ}` : ''}`} className={`sorting-btn ${initialSort === 'desc' ? 'active' : ''}`} title="Sort Z-A (Descending)" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-arrow-up-z-a"></i> Z-A
          </Link>
        </div>
        <div className="view-switcher-bar">
          <Link href={`/library?sort=${initialSort}&view=cards${initialCategory ? `&category=${initialCategory}` : ''}${initialYear ? `&year=${initialYear}` : ''}${initialQ ? `&q=${initialQ}` : ''}`} className={`view-switcher-btn ${initialView === 'cards' ? 'active' : ''}`} title="Cards View" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-table-cells"></i> Cards
          </Link>
          <Link href={`/library?sort=${initialSort}&view=list${initialCategory ? `&category=${initialCategory}` : ''}${initialYear ? `&year=${initialYear}` : ''}${initialQ ? `&q=${initialQ}` : ''}`} className={`view-switcher-btn ${initialView === 'list' ? 'active' : ''}`} title="List View" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-list"></i> List
          </Link>
        </div>
      </div>
    </div>
  );
}
