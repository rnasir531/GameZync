'use client';

export default function FooterBottomBar({ settings }) {
  return (
    <div className="footer-bottom-bar">
      <p className="footer-copyright">
        © {new Date().getFullYear()} <strong>{settings?.site_name || 'GameZync'}</strong>. All rights reserved. Built with passion for gamers.
      </p>
      
      <div className="footer-bottom-badges">
        <span className="footer-badge"><i className="fa-solid fa-laptop-code"></i> PC Gaming</span>
        <span className="footer-badge"><i className="fa-solid fa-shield-halved"></i> 100% Safe Downloads</span>
        <span className="footer-badge"><i className="fa-solid fa-bolt"></i> Fast &amp; Free</span>
      </div>
    </div>
  );
}
