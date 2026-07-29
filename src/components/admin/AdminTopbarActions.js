'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AdminTopbarActions({ displayName, avatarUrl, notifs }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    // Force dark mode for admin panel
    document.body.classList.add('dark-theme');
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifCount = notifs.length;

  return (
    <div className="topbar-actions d-flex align-items-center gap-2">
      {/* Profile Dropdown */}
      <div className="dropdown d-flex" ref={profileRef} style={{ position: 'relative' }}>
        <div 
            className="profile-pill" 
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            style={{ cursor: 'pointer', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
            <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={avatarUrl} alt="Profile" className="profile-pill-img" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
            <span className="profile-pill-name d-none d-md-inline" style={{ fontSize: '13px', fontWeight: '600' }}>
                {displayName}
            </span>
            <i className="fa-solid fa-chevron-down profile-pill-icon" style={{ fontSize: '11px' }}></i>
        </div>
        
        {profileOpen && (
            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 show" style={{ position: 'absolute', right: 0, top: '100%', marginTop: '8px', borderRadius: '12px', background: 'var(--card-bg)', padding: '8px', minWidth: '140px', zIndex: 1005 }}>
                <li>
                    <a className="dropdown-item text-danger fw-bold confirm-logout-btn" href="/api/auth/logout" style={{ borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
                    </a>
                </li>
            </ul>
        )}
      </div>

      {/* Notifications Dropdown */}
      <div className="dropdown" ref={notifRef} style={{ position: 'relative' }}>
          <button 
              className="icon-btn position-relative theme-toggle-btn border-0" 
              type="button" 
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
              <i className="fa-solid fa-bell"></i>
              {notifCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                      {notifCount}
                  </span>
              )}
          </button>

          {notifOpen && (
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 show" style={{ position: 'absolute', right: 0, top: '100%', marginTop: '8px', width: '280px', maxHeight: '360px', overflowY: 'auto', borderRadius: '12px', background: 'var(--card-bg)', zIndex: 1005 }}>
                  <li><h6 className="dropdown-header d-flex justify-content-between align-items-center text-light">Notifications</h6></li>
                  <li><hr className="dropdown-divider border-secondary" /></li>
                  {notifs.length === 0 ? (
                      <li><span className="dropdown-item text-center text-muted">No new notifications</span></li>
                  ) : (
                      notifs.map((n, i) => (
                          <li key={i}><Link href={n.link} className="dropdown-item" style={{ color: 'var(--text-color)' }}><i className="fa-solid fa-circle-exclamation text-warning me-2"></i> {n.text}</Link></li>
                      ))
                  )}
              </ul>
          )}
      </div>
    </div>
  );
}
