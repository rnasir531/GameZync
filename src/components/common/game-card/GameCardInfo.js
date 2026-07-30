'use client';

export default function GameCardInfo({ game, isInstantSection, isUpcomingSection, releaseYear }) {
  let rawTitle = game.name || game.title || 'Game';
  const title = rawTitle
    .replace(/^GameBay\s*-\s*Play\s+/i, '')
    .replace(/^Play\s+/i, '')
    .replace(/\s*Online$/i, '')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#38;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

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
