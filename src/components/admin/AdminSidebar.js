'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({ userRole = 1 }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
    <nav className="sidebar">
      <div className="sidebar-section pt-0">
        <ul className="sidebar-links p-0 m-0">
          <li>
            <Link href="/admin" className={`nav-btn ${isActive('/admin') ? 'active' : ''}`}>
              <i className="fa-solid fa-chart-line"></i> <span>Dashboard</span>
            </Link>
          </li>
          

          <li>
            <Link href="/admin/reviews" className={`nav-btn ${isActive('/admin/reviews') ? 'active' : ''}`}>
              <i className="fa-solid fa-comment-dots"></i> <span>Reviews</span>
            </Link>
          </li>
          
          <li>
            <Link href="/admin/reports" className={`nav-btn ${isActive('/admin/reports') ? 'active' : ''}`}>
              <i className="fa-solid fa-flag"></i> <span>Reports</span>
            </Link>
          </li>

          <li>
            <Link href="/admin/scraper" className={`nav-btn ${isActive('/admin/scraper') ? 'active' : ''}`}>
              <i className="fa-solid fa-spider"></i> <span>Auto-Scraper</span>
            </Link>
          </li>


          {(userRole == 2 || userRole == 3) && (
            <>
              <li>
                <Link href="/admin/games" className={`nav-btn ${isActive('/admin/games') ? 'active' : ''}`}>
                  <i className="fa-solid fa-folder-open"></i> <span>Manage Content</span>
                </Link>
              </li>

              {userRole == 3 && (
                <>
                  <li>
                    <Link href="/admin/users" className={`nav-btn ${isActive('/admin/users') ? 'active' : ''}`}>
                      <i className="fa-solid fa-user-shield"></i> <span>Admins</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/admin/logs" className={`nav-btn ${isActive('/admin/logs') ? 'active' : ''}`}>
                      <i className="fa-solid fa-history text-secondary"></i> <span>Activity Logs</span>
                    </Link>
                  </li>




                  <li>
                    <Link href="/admin/analytics" className={`nav-btn ${isActive('/admin/analytics') ? 'active' : ''}`}>
                      <i className="fa-solid fa-chart-line text-info"></i> <span>Analytics</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/settings" className={`nav-btn ${isActive('/admin/settings') ? 'active' : ''}`}>
                      <i className="fa-solid fa-gear text-primary"></i> <span>Settings</span>
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
    <div className="mobile-bottom-nav">

      <Link href="/admin/reviews" className={`mobile-nav-item nav-btn ${isActive('/admin/reviews') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
        <i className="fa-solid fa-comment-dots"></i>
        <span>Reviews</span>
      </Link>
      <Link href="/admin/scraper" className={`mobile-nav-item nav-btn ${isActive('/admin/scraper') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
        <i className="fa-solid fa-spider"></i>
        <span>Scraper</span>
      </Link>

      {(userRole == 2 || userRole == 3) && (
        <>
          <Link href="/admin/games" className={`mobile-nav-item nav-btn ${isActive('/admin/games') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-folder-open"></i>
            <span>Content</span>
          </Link>
          {userRole == 3 && (
            <Link href="/admin/users" className={`mobile-nav-item nav-btn ${isActive('/admin/users') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </Link>
          )}
        </>
      )}
    </div>
    </>
  );
}
