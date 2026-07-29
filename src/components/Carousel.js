'use client';
import { useState, useEffect, useRef } from 'react';
import CarouselHeaderControls from './carousel/CarouselHeaderControls';
import CarouselSlideItem from './carousel/CarouselSlideItem';

export default function Carousel({ games }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const totalCards = games ? games.length : 0;

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalCards);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  useEffect(() => {
    if (totalCards > 0) startAutoSlide();
    return stopAutoSlide;
  }, [totalCards]);

  if (!games || totalCards === 0) return null;

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + totalCards) % totalCards);
    resetAutoSlide();
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % totalCards);
    resetAutoSlide();
  };

  const handleSelect = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      resetAutoSlide();
    }
  };

  return (
    <section className="carousel-section" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
      <CarouselHeaderControls onPrev={handlePrev} onNext={handleNext} />
      
      <div className="carousel-container-outer">
        <div className="carousel-track" id="carousel-track">
          {games.map((game, index) => (
            <CarouselSlideItem 
              key={game.id} 
              game={game} 
              index={index} 
              activeIndex={activeIndex} 
              totalCards={totalCards} 
              onSelect={handleSelect} 
            />
          ))}
        </div>
        <div className="carousel-indicators">
          {games.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === activeIndex ? 'active' : ''}`} 
              data-index={index} 
              onClick={() => handleSelect(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
