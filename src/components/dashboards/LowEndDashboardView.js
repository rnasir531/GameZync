'use client';

import { useState, useMemo } from 'react';
import DashboardHeader from './common/DashboardHeader';
import DashboardRamSection from './common/DashboardRamSection';

export default function LowEndDashboardView({ allGames }) {
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const sortedGames = useMemo(() => {
    return [...allGames].sort((a, b) => {
      const aTitle = (a.name || a.title || '').toLowerCase();
      const bTitle = (b.name || b.title || '').toLowerCase();
      
      if (sortOrder === 'asc') {
        return aTitle < bTitle ? -1 : (aTitle > bTitle ? 1 : 0);
      } else {
        return aTitle > bTitle ? -1 : (aTitle < bTitle ? 1 : 0);
      }
    });
  }, [allGames, sortOrder]);

  const parseRam = (ramStr) => {
    if (!ramStr) return 0;
    const str = String(ramStr).toLowerCase();
    const val = parseFloat(str);
    if (isNaN(val)) return 0;
    if (str.includes('mb')) return val / 1024;
    return val;
  };

  const games2GB = sortedGames.filter(g => g.ram && parseRam(g.ram) <= 2).slice(0, 10);
  const games4GB = sortedGames.filter(g => g.ram && parseRam(g.ram) > 2 && parseRam(g.ram) <= 4).slice(0, 10);

  const gridClass = viewMode === 'list' ? 'games-grid view-list-active' : 'games-grid view-cards-active';

  return (
    <section className="home-section" id="low-end-dashboard" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <DashboardHeader 
        title="Low End Games"
        subtitle="Games optimized for systems with lower specifications."
        icon="fa-laptop-code"
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <DashboardRamSection 
        tag="Entry Level"
        title="2GB RAM Games"
        ramValue="2"
        games={games2GB}
        gridClass={gridClass}
        sectionId="low-end-2gb-grid"
      />

      <DashboardRamSection 
        tag="Standard"
        title="4GB RAM Games"
        ramValue="4"
        games={games4GB}
        gridClass={gridClass}
        sectionId="low-end-4gb-grid"
        marginTop={true}
      />

      {allGames.length === 0 && (
        <div className="text-muted w-100 p-4 text-center">No low-end games found.</div>
      )}
    </section>
  );
}
