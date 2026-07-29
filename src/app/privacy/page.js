export const metadata = {
  title: 'Privacy Policy - PlayFusion',
  description: 'Understand how PlayFusion collects, protects, and respects your privacy and personal data.',
};

export default function PrivacyPage() {
  return (
    <section className="static-page-view" id="privacy-policy-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-5">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary-color)' }}>
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>Privacy Policy</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Your privacy is paramount. Learn how we handle cookies, analytics, and data protection.
        </p>
      </div>

      <div className="static-content-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px', backdropFilter: 'blur(12px)', maxWidth: '900px', margin: '0 auto' }}>
        <div className="static-text-block" style={{ lineHeight: '1.8', color: 'var(--text-color)' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginBottom: '12px' }}>1. Zero Personal Data Tracking</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            PlayFusion operates on a privacy-first model. We do not require users to create accounts, provide passwords, or link credit card information to download software or play games.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginTop: '28px', marginBottom: '12px' }}>2. System Matcher Specs Storage</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            When using the System Matcher, your PC specifications (CPU, GPU, RAM) are saved exclusively in your own browser local storage / cookie. This data never leaves your device and is used solely to calculate hardware compatibility.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginTop: '28px', marginBottom: '12px' }}>3. Analytics &amp; Performance Cookies</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            We use minimal aggregate analytics cookies to measure bandwidth, page load speeds, and popular game categories to continuously optimize server mirrors.
          </p>

          <div className="contact-prompt text-center mt-5" style={{ padding: '24px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 8px' }}>For privacy inquiries or data requests, contact us at:</p>
            <a href="/contact" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>
              <i className="fa-solid fa-headset me-2"></i>Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
