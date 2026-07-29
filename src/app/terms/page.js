export const metadata = {
  title: 'Terms of Service - PlayFusion',
  description: 'Read the terms of service governing access to and usage of the PlayFusion gaming platform.',
};

export default function TermsPage() {
  return (
    <section className="static-page-view" id="terms-of-service-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-5">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary-color)' }}>
          <i className="fa-solid fa-file-contract"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>Terms of Service</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Last Updated: 2026. Please read these terms carefully before using PlayFusion.
        </p>
      </div>

      <div className="static-content-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px', backdropFilter: 'blur(12px)', maxWidth: '900px', margin: '0 auto' }}>
        <div className="static-text-block" style={{ lineHeight: '1.8', color: 'var(--text-color)' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginBottom: '12px' }}>1. Acceptance of Terms</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            By accessing or using PlayFusion ("the Platform"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from accessing or using our services.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginTop: '28px', marginBottom: '12px' }}>2. Platform Use &amp; License</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            PlayFusion grants you a personal, non-exclusive, non-transferable license to access our platform for personal gaming, software discovery, and hardware testing. You agree not to exploit, scrape, or disrupt platform infrastructure.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginTop: '28px', marginBottom: '12px' }}>3. Intellectual Property Rights</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            All trademarks, logos, game titles, and media belong to their respective developers and publishers. PlayFusion makes no claim of ownership over third-party software cataloged for informational and discovery purposes.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginTop: '28px', marginBottom: '12px' }}>4. Disclaimer &amp; User Safety</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            While PlayFusion rigorously tests all files for safety, all software downloads are provided "as-is". Users are strongly advised to maintain up-to-date antivirus protection and run executables at their own discretion.
          </p>

          <div className="contact-prompt text-center mt-5" style={{ padding: '24px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 8px' }}>For legal or terms inquiries, reach out to our team:</p>
            <a href="/contact" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>
              <i className="fa-solid fa-headset me-2"></i>Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
