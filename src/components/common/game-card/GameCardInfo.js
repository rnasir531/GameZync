'use client';

export default function GameCardInfo({ game, isInstantSection, isUpcomingSection, releaseYear }) {
  const title = game.name || game.title || 'Game';

  return (
    <div className="game-details">
      <h3>{title}</h3>
      <p>
        {!isInstantSection && !isUpcomingSection && (
          <span className="list-only-size"><i className="fa-regular fa-calendar"></i> {releaseYear} &bull; </span>
        )}
        {isUpcomingSection && (
          <span className="list-only-size" style={{ color: 'var(--primary-color)' }}><i className="fa-solid fa-rocket"></i> {releaseYear} &bull; </span>
        )}
        {game.category}
      </p>
      {isInstantSection ? (
        <button className="play-btn" suppressHydrationWarning><i className="fa-solid fa-play" suppressHydrationWarning></i> Play Now</button>
      ) : isUpcomingSection ? (
        <button className="play-btn" style={{ background: '#ff0000', color: '#fff' }} suppressHydrationWarning><i className="fa-brands fa-youtube" suppressHydrationWarning></i> Trailer</button>
      ) : (
        <button className="play-btn" suppressHydrationWarning><i className="fa-solid fa-eye" suppressHydrationWarning></i> View Now</button>
      )}
    </div>
  );
}
