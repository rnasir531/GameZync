'use client';
import React from 'react';

export default function GameTrailerSection({ trailerUrl, gameName }) {
  if (!trailerUrl) return null;

  let embedUrl = trailerUrl;
  if (embedUrl.includes('youtube.com/watch?v=')) {
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
  } else if (embedUrl.includes('youtu.be/')) {
    embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
  }

  return (
    <div className="details-info-card details-video-card full-width-info-card" style={{ marginBottom: '24px' }}>
      <h2 className="details-card-title"><i className="fa-brands fa-youtube"></i> Official Trailer</h2>
      <div className="details-video-wrapper">
        <iframe
          id="details-video-iframe"
          src={embedUrl}
          title={`${gameName} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', borderRadius: '12px' }}
        ></iframe>
      </div>
    </div>
  );
}
