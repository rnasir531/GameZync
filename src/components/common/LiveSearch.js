'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsMobileExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Focus input when mobile search is expanded
  useEffect(() => {
    if (isMobileExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileExpanded]);

  // Debounced Search API call
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          .then(res => {
            if (!res.ok) return { results: [] };
            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) return { results: [] };
            return res.json();
          })
          .then(data => {
            setSearchResults(data.results || []);
            setShowDropdown(true);
            setIsSearching(false);
          })
          .catch(err => {
            console.error('Search error:', err);
            setIsSearching(false);
          });
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleResultClick = (e, result) => {
    e.preventDefault();
    setShowDropdown(false);
    setIsMobileExpanded(false);
    setSearchQuery('');
    
    const targetUrl = result.type === 'instant' ? `/instant/${result.id}` : (result.url || `/game/${result.id}`);
    
    if (targetUrl.startsWith('http')) {
      window.open(targetUrl, '_blank');
    } else {
      router.push(targetUrl);
    }
  };

  return (
    <div 
      className={`topbar-search-wrapper ${isMobileExpanded ? 'mobile-expanded' : ''}`} 
      style={{ position: 'relative' }} 
      ref={dropdownRef}
    >
      {/* 1. MOBILE SEARCH TRIGGER ICON BUTTON */}
      <button 
        type="button"
        className="icon-btn mobile-search-trigger" 
        onClick={() => setIsMobileExpanded(prev => !prev)}
        title="Search Games"
      >
        <i className={`fas ${isMobileExpanded ? 'fa-times' : 'fa-search'}`}></i>
      </button>

      {/* 2. MAIN SEARCH FORM CONTAINER */}
      <form action="/library" method="GET" className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input 
          ref={inputRef}
          type="text" 
          name="q" 
          placeholder="Search games..." 
          autoComplete="off" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => { if(searchResults.length > 0) setShowDropdown(true); }}
        />
        {isSearching ? (
          <i className="fas fa-spinner fa-spin search-status-icon"></i>
        ) : (
          isMobileExpanded && (
            <button 
              type="button" 
              className="search-close-btn"
              onClick={() => { setIsMobileExpanded(false); setSearchQuery(''); }}
            >
              <i className="fas fa-times"></i>
            </button>
          )
        )}
      </form>
      
      {/* 3. LIVE SEARCH RESULTS DROPDOWN */}
      {showDropdown && searchQuery.trim().length >= 2 && (
        <div className="search-dropdown">
          {searchResults.length > 0 ? (
            <ul className="search-results-list">
              {searchResults.map((result, idx) => (
                <li key={`${result.type}-${result.id}-${idx}`}>
                  <a href={result.type === 'instant' ? `/instant/${result.id}` : result.url} className="search-result-item" onClick={(e) => handleResultClick(e, result)}>
                    <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={result.image || `https://placehold.co/60x60/1a1d25/555?text=${result.title.charAt(0)}`} alt={result.title} />
                    <div className="result-info">
                      <span className="result-title">{result.title}</span>
                      <span className={`result-badge badge-${result.type}`}>
                        {result.type === 'game' ? 'Game' : result.type === 'instant' ? 'Instant' : 'Upcoming'}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-no-results">
              No games found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
