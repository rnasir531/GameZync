'use client';
import { useRouter } from 'next/navigation';
import GameCardMedia from './game-card/GameCardMedia';
import GameCardInfo from './game-card/GameCardInfo';
import { getGameUrl, getInstantGameUrl } from '@/lib/slug';
import { getOriginalGameImage } from '@/lib/gameImageMap';

export default function GameCard({ game, isInstantSection = false, isUpcomingSection = false, matchPercentage = null }) {
  const router = useRouter();
  
  const coverUrl = getOriginalGameImage(game);
  
  let releaseYear = '';
  if (game.release_year) {
    releaseYear = game.release_year;
  } else if (game.release_date) {
    releaseYear = new Date(game.release_date).getFullYear();
    if (isNaN(releaseYear)) releaseYear = game.release_date;
  } else if (game.created_at) {
    releaseYear = new Date(game.created_at).getFullYear();
  } else {
    releaseYear = new Date().getFullYear().toString();
  }

  const destinationUrl = isInstantSection 
    ? getInstantGameUrl(game) 
    : (isUpcomingSection ? (game.trailer_url || '#') : getGameUrl(game));
  
  const target = isUpcomingSection && game.trailer_url ? '_blank' : '_self';

  const handleClick = (e) => {
    if (target === '_blank') {
      e.preventDefault();
      window.open(destinationUrl, '_blank');
    } else {
      router.push(destinationUrl);
    }
  };

  const title = game.name || game.title || 'Game';

  return (
    <div 
      className={`game-card ${isInstantSection ? 'instant-card' : ''} ${isUpcomingSection ? 'upcoming-card' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      data-tag={game.tag || ''}
    >
      <GameCardMedia 
        coverUrl={coverUrl} 
        title={title} 
        isInstantSection={isInstantSection} 
        isUpcomingSection={isUpcomingSection} 
        releaseYear={releaseYear} 
        matchPercentage={matchPercentage} 
      />
      <GameCardInfo 
        game={game} 
        isInstantSection={isInstantSection} 
        isUpcomingSection={isUpcomingSection} 
        releaseYear={releaseYear} 
      />
    </div>
  );
}
