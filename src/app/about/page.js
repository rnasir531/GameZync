export const metadata = {
  title: 'About Us - GameZync',
  description: 'Learn about GameZync - the premier next-gen gaming platform for PC game downloads, system matching, and instant play games.',
};

export default function AboutPage() {
  return (
    <section className="static-page-view" id="about-us-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-5">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary-color)' }}>
          <i className="fa-solid fa-users"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>About GameZync</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Redefining PC gaming distribution with zero bloat, high-speed direct downloads, and smart hardware matching.
        </p>
      </div>

      {/* STATS BANNER (3 CARDS WITH PROPER GAP & MARGIN) */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="stat-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '28px 20px', textAlign: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' }}>
          <i className="fa-solid fa-bolt mb-3" style={{ fontSize: '28px', color: '#06b6d4' }}></i>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', margin: '0 0 6px', color: 'var(--text-color)' }}>100%</h3>
          <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Direct High-Speed Mirrors</p>
        </div>
        <div className="stat-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '28px 20px', textAlign: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' }}>
          <i className="fa-solid fa-microchip mb-3" style={{ fontSize: '28px', color: '#f59e0b' }}></i>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', margin: '0 0 6px', color: 'var(--text-color)' }}>Smart Matcher</h3>
          <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Automated Specs Checker</p>
        </div>
        <div className="stat-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '28px 20px', textAlign: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' }}>
          <i className="fa-solid fa-shield-halved mb-3" style={{ fontSize: '28px', color: '#10b981' }}></i>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', margin: '0 0 6px', color: 'var(--text-color)' }}>Zero Virus</h3>
          <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Tested &amp; Secure Repacks</p>
        </div>
      </div>

      <div className="static-content-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px', backdropFilter: 'blur(12px)' }}>
        <div className="static-text-block" style={{ lineHeight: '1.8', color: 'var(--text-color)' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-color)', marginBottom: '16px' }}>
            <i className="fa-solid fa-rocket text-primary me-2"></i> Our Mission
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Welcome to <strong>PlayFusion</strong>, your ultimate next-generation PC gaming hub. We were founded with a single mission: to eliminate fake download buttons, slow links, and malware-ridden archives. PlayFusion offers clean, verified, and ultra-fast direct mirror downloads alongside browser instant play games.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-color)', marginTop: '32px', marginBottom: '16px' }}>
            <i className="fa-solid fa-star text-primary me-2"></i> What Sets PlayFusion Apart
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ padding: '20px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px' }}><i className="fa-solid fa-gauge-high me-2"></i> System Matcher Engine</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0' }}>Scan or input your CPU, GPU, and RAM to instantly filter games your PC can run smoothly.</p>
            </div>
            <div style={{ padding: '20px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#06b6d4', marginBottom: '8px' }}><i className="fa-solid fa-gamepad me-2"></i> Instant Browser Play</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0' }}>Play classic retro and casual web games right inside your browser without installing anything.</p>
            </div>
            <div style={{ padding: '20px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}><i className="fa-solid fa-shield-check me-2"></i> Clean Verified Repacks</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0' }}>Every single game title is pre-tested for viruses, broken dependencies, and missing DLLs.</p>
            </div>
          </div>

          <div className="contact-prompt text-center mt-5" style={{ padding: '30px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ fontWeight: '800', marginBottom: '8px', color: 'var(--text-color)' }}>Have Questions or Feedback?</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>Reach out to our dedicated support team anytime for assistance.</p>
            <a href="/contact" className="btn" style={{ padding: '12px 24px', borderRadius: '12px', background: 'var(--accent-gradient)', color: '#fff', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-headset"></i> Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
