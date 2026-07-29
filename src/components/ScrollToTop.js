'use client';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('.page-wrapper') || window;

    const handleScroll = () => {
      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (scrollContainer === window) {
        scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        clientHeight = document.documentElement.clientHeight || window.innerHeight;
      } else {
        scrollTop = scrollContainer.scrollTop;
        scrollHeight = scrollContainer.scrollHeight;
        clientHeight = scrollContainer.clientHeight;
      }
      
      const scrollableHeight = scrollHeight - clientHeight;
      let percent = 0;
      
      if (scrollableHeight > 0) {
        percent = (scrollTop / scrollableHeight) * 100;
      }
      
      setScrollProgress(Math.min(100, Math.max(0, percent)));
      setIsVisible(scrollTop > 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    handleScroll();
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.page-wrapper') || window;
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  // Make sure scrollProgress is a valid number to prevent NaN
  const safeProgress = Number.isNaN(scrollProgress) ? 0 : scrollProgress;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div 
      className={`scroll-progress-wrap ${isVisible ? 'active' : ''}`}
      onClick={scrollToTop}
      title="Scroll to Top"
    >
      <svg className="scroll-progress-svg" width="50" height="50" viewBox="0 0 50 50">
        <circle 
          className="progress-bg"
          cx="25" cy="25" r={radius} 
        />
        <circle 
          className="progress-bar"
          cx="25" cy="25" r={radius} 
          strokeDasharray={circumference}
          style={{ 
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.1s linear' 
          }}
        />
      </svg>
      <i className="fa-solid fa-arrow-up scroll-up-icon"></i>
    </div>
  );
}
