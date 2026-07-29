'use client';
import Link from 'next/link';

export default function FooterMainColumns({ settings }) {
  return (
    <div className="footer-inner">
      {/* COL 1: BRAND & BIO */}
      <div className="footer-col footer-brand-col">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div 
            className="footer-logo" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)'
            }}
          >
            <span 
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: '900', 
                letterSpacing: '1.5px', 
                fontFamily: 'var(--font-jakarta), var(--font-inter), sans-serif',
                display: 'inline-flex',
                alignItems: 'center',
                lineHeight: '1'
              }}
            >
              <span style={{ color: 'var(--text-color)' }}>GAME</span>
              <span style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900',
                filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))'
              }}>
                ZYNC
              </span>
            </span>
          </div>
        </Link>
        
        <p className="footer-tagline">
          {settings?.site_description || 'The ultimate platform for PC gaming. Instant downloads, direct links, and browser games with zero bloat.'}
        </p>

        <div className="footer-social-row">
          <a href={settings?.social_facebook || "https://facebook.com"} target="_blank" rel="noreferrer" className="footer-social-btn fb" title="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href={settings?.social_youtube || "https://youtube.com"} target="_blank" rel="noreferrer" className="footer-social-btn yt" title="YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href={settings?.social_tiktok || "https://tiktok.com"} target="_blank" rel="noreferrer" className="footer-social-btn tt" title="TikTok">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href={settings?.social_github || "https://github.com"} target="_blank" rel="noreferrer" className="footer-social-btn gh" title="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>

      {/* COL 2: QUICK LINKS & HELP */}
      <div className="footer-col">
        <h4 className="footer-col-title"><i className="fa-solid fa-compass"></i> Quick Links</h4>
        <ul className="footer-links-list">
          <li><Link href="/about"><i className="fa-solid fa-users"></i> About Us</Link></li>
          <li><Link href="/installation-guide"><i className="fa-solid fa-download"></i> Installation Guide</Link></li>
          <li><Link href="/help"><i className="fa-solid fa-circle-info"></i> Help Center</Link></li>
          <li><Link href="/faq"><i className="fa-solid fa-circle-question"></i> FAQ</Link></li>
        </ul>
      </div>

      {/* COL 3: LEGAL POLICIES */}
      <div className="footer-col">
        <h4 className="footer-col-title"><i className="fa-solid fa-scale-balanced"></i> Legal &amp; Policy</h4>
        <ul className="footer-links-list">
          <li><Link href="/terms"><i className="fa-solid fa-file-contract"></i> Terms of Service</Link></li>
          <li><Link href="/privacy"><i className="fa-solid fa-shield-halved"></i> Privacy Policy</Link></li>
          <li><Link href="/dmca"><i className="fa-solid fa-copyright"></i> DMCA Policy</Link></li>
        </ul>
      </div>
      
      {/* COL 4: SUPPORT & SUBMISSION */}
      <div className="footer-col">
        <h4 className="footer-col-title"><i className="fa-solid fa-headset"></i> Support</h4>
        <ul className="footer-links-list">
          <li>
            <a 
              href={`mailto:${settings?.site_email || 'nasirsajjad531@gmail.com'}?subject=Support%20Inquiry%20-%20GameZync`} 
              target="_top" 
              className="email-link"
              title="Click to send an email to GameZync Support"
            >
              <i className="fa-solid fa-envelope"></i> {settings?.site_email || 'nasirsajjad531@gmail.com'}
            </a>
          </li>
          <li><Link href="/contact"><i className="fa-solid fa-headset"></i> Contact Support</Link></li>
          <li><Link href="/submit-game"><i className="fa-solid fa-upload"></i> Submit a Game</Link></li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openRequestModal')); }}>
              <i className="fa-solid fa-plus-circle"></i> Request a Game
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
