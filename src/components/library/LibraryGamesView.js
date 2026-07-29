'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GameCard from '../common/GameCard';
import ExplorerHeaderControls from './ExplorerHeaderControls';
import ExplorerPagination from './ExplorerPagination';

export default function LibraryGamesView({ initialGames, initialSort, initialView, initialCategory, initialYear, initialQ, currentPage, totalPages }) {
  const router = useRouter();
  const [pageInput, setPageInput] = useState('');

  const buildPageUrl = (pageNumber) => {
    return `/library?page=${pageNumber}&sort=${initialSort}&view=${initialView}${initialCategory ? `&category=${initialCategory}` : ''}${initialYear ? `&year=${initialYear}` : ''}${initialQ ? `&q=${initialQ}` : ''}`;
  };

  const handleGoToPage = (e) => {
    e.preventDefault();
    const targetPage = parseInt(pageInput, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      router.push(buildPageUrl(targetPage));
      setPageInput('');
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return (
    <section className="explorer-section" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      {/* 1. HEADER CONTROLS (SORTING & VIEW SWITCHER) */}
      <ExplorerHeaderControls 
        initialCategory={initialCategory} 
        initialYear={initialYear} 
        initialSort={initialSort} 
        initialView={initialView} 
        initialQ={initialQ} 
      />
      
      {/* 2. GAMES DIRECTORY GRID */}
      <div className={`games-grid ${initialView === 'list' ? 'view-list-active' : 'view-cards-active'}`} id="explorer-games-grid">
        {initialGames.length > 0 ? (
          initialGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="text-muted w-100 p-4 text-center">No games found.</div>
        )}
      </div>

      {/* 3. DIRECTORY PAGINATION */}
      <ExplorerPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        buildPageUrl={buildPageUrl} 
        handleGoToPage={handleGoToPage} 
        pageInput={pageInput} 
        setPageInput={setPageInput} 
      />
    </section>
  );
}
