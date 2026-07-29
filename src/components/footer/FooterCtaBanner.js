'use client';
import Link from 'next/link';

export default function FooterCtaBanner() {
  return (
    <div className="footer-top-cta-banner">
      <div className="cta-banner-info">
        <span className="cta-badge">
          <i className="fa-solid fa-fire"></i> NEXT-GEN GAMING PORTAL
        </span>
        <h3 className="cta-title">Discover, Play &amp; Download Premium PC Games</h3>
        <p className="cta-desc">
          High-speed direct links, verified clean repacks, and instant browser games updated daily.
        </p>
      </div>
      <div className="cta-banner-actions">
        <Link href="/library" className="cta-btn primary-cta">
          <i className="fa-solid fa-gamepad"></i> Explore All Games
        </Link>
      </div>
    </div>
  );
}
