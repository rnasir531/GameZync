'use client';
import { useState } from 'react';

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [openIdx, setOpenIdx] = useState(null);

  const faqData = {
    general: [
      { q: 'Is PlayFusion completely free to use?', a: 'Yes! PlayFusion is 100% free with zero subscription fees, paywalls, or hidden charges.' },
      { q: 'Are all game downloads safe and virus-free?', a: 'Yes. Every game repack and mirror link on PlayFusion is thoroughly scanned for malware and verified clean before publishing.' },
      { q: 'Do I need an account to play or download?', a: 'No registration is required. You can browse, play Instant Games, and download PC games freely.' }
    ],
    downloads: [
      { q: 'What is the difference between Direct Link and Torrent?', a: 'Direct Links download files directly through your web browser or download manager (IDM). Torrent links use P2P sharing via qBittorrent for resilient downloads.' },
      { q: 'Why is my download speed slow?', a: 'Try using a dedicated download manager like Internet Download Manager (IDM) or select an alternate mirror link.' },
      { q: 'What is the archive extraction password?', a: 'If an archive asks for a password, check the game description page. Standard password is usually playfusion or specified on the page.' }
    ],
    matcher: [
      { q: 'How accurate is the System Matcher?', a: 'Our System Matcher uses real-world GPU, CPU, and VRAM benchmark benchmarks to ensure you get strict, accurate compatibility results.' },
      { q: 'Why did my game get a "Cannot Run" rating?', a: 'If your GPU is integrated (Intel HD/UHD) and the game demands a heavy dedicated GPU (GTX/RTX/RX), our strict gatekeeper filters it out to prevent lag and crashes.' }
    ]
  };

  return (
    <section className="static-page-view" id="faq-page-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-4">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary-color)' }}>
          <i className="fa-solid fa-circle-question"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>Frequently Asked Questions</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Explore answers grouped by topic or search for your specific questions.
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => { setActiveTab('general'); setOpenIdx(null); }}
          className={`btn ${activeTab === 'general' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', border: '1px solid var(--border-color)', background: activeTab === 'general' ? 'var(--accent-gradient)' : 'var(--card-bg)', color: '#fff', cursor: 'pointer' }}
        >
          <i className="fa-solid fa-compass me-2"></i> General
        </button>
        <button 
          onClick={() => { setActiveTab('downloads'); setOpenIdx(null); }}
          className={`btn ${activeTab === 'downloads' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', border: '1px solid var(--border-color)', background: activeTab === 'downloads' ? 'var(--accent-gradient)' : 'var(--card-bg)', color: '#fff', cursor: 'pointer' }}
        >
          <i className="fa-solid fa-download me-2"></i> Downloads
        </button>
        <button 
          onClick={() => { setActiveTab('matcher'); setOpenIdx(null); }}
          className={`btn ${activeTab === 'matcher' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', border: '1px solid var(--border-color)', background: activeTab === 'matcher' ? 'var(--accent-gradient)' : 'var(--card-bg)', color: '#fff', cursor: 'pointer' }}
        >
          <i className="fa-solid fa-microchip me-2"></i> System Matcher
        </button>
      </div>

      {/* FAQ ITEMS ACCORDION */}
      <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        {faqData[activeTab].map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden', backdropFilter: 'blur(12px)', transition: 'all 0.25s ease' }}
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                style={{ width: '100%', padding: '18px 24px', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-color)', fontWeight: '700', fontSize: '15px', cursor: 'pointer', textAlign: 'left' }}
              >
                <span>{faq.q}</span>
                <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: 'var(--primary-color)' }}></i>
              </button>

              {isOpen && (
                <div style={{ padding: '0 24px 20px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SUPPORT FOOTER CARD */}
      <div className="text-center" style={{ maxWidth: '640px', margin: '0 auto', padding: '28px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 12px' }}>Have a question not listed here?</p>
        <a href="/contact" className="btn" style={{ padding: '10px 20px', borderRadius: '12px', background: 'var(--accent-gradient)', color: '#fff', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-headset"></i> Contact Support
        </a>
      </div>
    </section>
  );
}
