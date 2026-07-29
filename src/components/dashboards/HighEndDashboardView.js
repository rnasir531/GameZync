'use client';

import { useState, useMemo } from 'react';
import DashboardHeader from './common/DashboardHeader';
import DashboardRamSection from './common/DashboardRamSection';

export default function HighEndDashboardView({ allGames }) {
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

  const games8GB = sortedGames.filter(g => g.ram && parseRam(g.ram) > 4 && parseRam(g.ram) <= 8).slice(0, 10);
  const games16GB = sortedGames.filter(g => g.ram && parseRam(g.ram) > 8 && parseRam(g.ram) < 32).slice(0, 10);
  const games32GB = sortedGames.filter(g => g.ram && parseRam(g.ram) >= 32).slice(0, 10);

  const gridClass = viewMode === 'list' ? 'games-grid view-list-active' : 'games-grid view-cards-active';

  return (
    <section className="home-section" id="high-end-dashboard" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <DashboardHeader 
        title="High Specs Games"
        subtitle="Games demanding high-performance hardware and ultimate graphics."
        icon="fa-desktop"
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <DashboardRamSection 
        tag="Performance"
        title="8GB RAM Games"
        ramValue="8"
        games={games8GB}
        gridClass={gridClass}
        sectionId="high-end-8gb-grid"
      />

      <DashboardRamSection 
        tag="Enthusiast"
        title="16GB RAM Games"
        ramValue="16"
        games={games16GB}
        gridClass={gridClass}
        sectionId="high-end-16gb-grid"
        marginTop={true}
      />

      <DashboardRamSection 
        tag="Extreme"
        title="32GB+ RAM Games"
        ramValue="32"
        games={games32GB}
        gridClass={gridClass}
        sectionId="high-end-32gb-grid"
        marginTop={true}
      />

      {allGames.length === 0 && (
        <div className="text-muted w-100 p-4 text-center">No high-end games found.</div>
      )}
    </section>
  );
}
