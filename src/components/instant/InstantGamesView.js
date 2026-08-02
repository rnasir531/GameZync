'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import GameCard from '../common/GameCard';
import PaginationControls from '../common/PaginationControls';
import InstantGameDetailView from './InstantGameDetailView';
import InstantGamesHeader from './InstantGamesHeader';
import InstantCategoryFilterBar from './InstantCategoryFilterBar';
import { getInstantGameUrl } from '@/lib/slug';

export default function InstantGamesView({ allGames = [], initialActiveGame = null }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playId = searchParams.get('play');
  
  const [activeGame, setActiveGame] = useState(initialActiveGame);

  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sync activeGame with play URL search param or initialActiveGame
  useEffect(() => {
    if (initialActiveGame) {
      setActiveGame(initialActiveGame);
    } else if (playId && allGames.length > 0) {
      const found = allGames.find(g => String(g.id) === String(playId));
      if (found) {
        setActiveGame(found);
      }
    } else {
      setActiveGame(null);
    }
  }, [playId, initialActiveGame, allGames]);

  // Extract unique categories dynamically
  const catsSet = new Set(['All']);
  allGames.forEach(g => {
    if (g.category) {
      g.category.split(',').forEach(c => {
        const catName = c.trim();
        if (catName) catsSet.add(catName);
      });
    }
  });
  const cats = Array.from(catsSet);

  const handleSelectGame = (game) => {
    router.push(getInstantGameUrl(game));
  };

  // Filter games based on selected category
  let processedGames = [...allGames];
  if (categoryFilter !== 'All') {
    processedGames = processedGames.filter(g => g.category && g.category.toLowerCase().includes(categoryFilter.toLowerCase()));
  }

  const totalPages = Math.ceil(processedGames.length / itemsPerPage);
  const currentGames = processedGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const elem = document.getElementById('instant-games-grid-title');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // If a game is active, render ONLY the dedicated detail view (Player + 2 rows suggested games)
  if (activeGame) {
    return <InstantGameDetailView activeGame={activeGame} allGames={allGames} />;
  }

  return (
    <section className="instant-games-view" id="instant-games-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      
      {/* MODULAR HEADER SECTION WITH VIEW SWITCHER */}
      <InstantGamesHeader 
        activeGame={activeGame} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />

      {/* MODULAR CATEGORY FILTER BAR */}
      <InstantCategoryFilterBar 
        categories={cats} 
        categoryFilter={categoryFilter} 
        setCategoryFilter={setCategoryFilter} 
        onResetPage={() => setCurrentPage(1)} 
      />
      
      {/* GAMES GRID / LIST */}
      <div className={`games-grid ${viewMode === 'list' ? 'view-list-active' : 'view-cards-active'} instant-games-grid-mobile`} id="instant-games-grid">
        {currentGames.map(game => (
          <div key={game.id} onClick={() => handleSelectGame(game)}>
            <GameCard 
              game={game} 
              isInstantSection={true} 
            />
          </div>
        ))}
        {currentGames.length === 0 && (
          <div className="text-muted w-100 p-4 text-center" style={{ gridColumn: '1 / -1' }}>No games found.</div>
        )}
      </div>

      {/* REUSABLE PAGINATION CONTROLS */}
      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
