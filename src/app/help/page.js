'use client';
import { useState } from 'react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'How do I download games on PlayFusion?',
      a: 'Simply browse our Library or search for your favorite title. Click on the game card to view details, then click "Download Game" to get verified direct mirror or torrent links.'
    },
    {
      q: 'How does the System Matcher work?',
      a: 'Our System Matcher scans or accepts your PC hardware specs (CPU, GPU, RAM) and calculates realistic compatibility scores so you only download games your PC can run smoothly.'
    },
    {
      q: 'What should I do if Windows Defender blocks a download?',
      a: 'Game cracks and repacks can trigger false positives in antivirus software. Temporarily disable Windows Defender Real-Time Protection during extraction, as all PlayFusion files are pre-tested and safe.'
    },
    {
      q: 'How do Instant Games work?',
      a: 'Instant Games are browser-based HTML5 games that load directly in your web browser with zero installation or downloads required!'
    },
    {
      q: 'Can I request a game if it is not in the library?',
      a: 'Yes! Click the "Request Game" button in the topbar or footer, type your game title, and our admin team will add it to the platform.'
    },
    {
      q: 'How can I report a broken download mirror or bug?',
      a: 'You can email our support team directly at nasirsajjad531@gmail.com with the game name and error details for immediate fixing.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="static-page-view" id="help-center-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-4">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary-color)' }}>
          <i className="fa-solid fa-circle-question"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>Help Center</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Find answers to common questions or reach out to our dedicated support.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div style={{ maxWidth: '640px', margin: '0 auto 36px', position: 'relative' }}>
        <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-color)', fontSize: '16px' }}></i>
        <input 
          type="text" 
          placeholder="Search for help topics, errors, downloads..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '16px 20px 16px 48px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '15px', fontWeight: '500', outline: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)' }}
        />
      </div>

      {/* FAQ ACCORDION LIST */}
      <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        {filteredFaqs.map((faq, idx) => {
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

      {/* DIRECT CONTACT CARD */}
      <div className="text-center" style={{ maxWidth: '640px', margin: '0 auto', padding: '32px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <i className="fa-solid fa-headset mb-3" style={{ fontSize: '32px', color: 'var(--primary-color)' }}></i>
        <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginBottom: '8px' }}>Still Need Help?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Our support team is available to assist you with game requests, mirror fixes, and technical setup.</p>
        <a href="/contact" className="btn" style={{ padding: '12px 24px', borderRadius: '12px', background: 'var(--accent-gradient)', color: '#fff', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-headset"></i> Visit Contact Support
        </a>
      </div>
    </section>
  );
}
