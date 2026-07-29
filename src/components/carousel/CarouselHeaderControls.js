'use client';

export default function CarouselHeaderControls({ onPrev, onNext }) {
  return (
    <div className="carousel-header">
      <div>
        <span className="subtitle"><i className="fa-solid fa-fire text-warning me-1"></i> TOP SELECTIONS</span>
        <h2 className="carousel-title">Featured Spotlights</h2>
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn prev-btn" onClick={onPrev} title="Previous Slide">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-btn next-btn" onClick={onNext} title="Next Slide">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
