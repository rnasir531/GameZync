export const metadata = {
  title: 'DMCA Copyright Policy - PlayFusion',
  description: 'Digital Millennium Copyright Act compliance, copyright takedown policy, and designated agent contact.',
};

export default function DMCAPage() {
  return (
    <section className="static-page-view" id="dmca-policy-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-5">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#ef4444' }}>
          <i className="fa-solid fa-copyright"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>DMCA Copyright Policy</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          PlayFusion strictly adheres to Digital Millennium Copyright Act compliance and IP protection.
        </p>
      </div>

      <div className="static-content-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px', backdropFilter: 'blur(12px)', maxWidth: '900px', margin: '0 auto' }}>
        <div className="static-text-block" style={{ lineHeight: '1.8', color: 'var(--text-color)' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginBottom: '12px' }}>Takedown Request &amp; Copyright Notice</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            PlayFusion respects the intellectual property of software developers and publishers. In accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512), we will respond expeditiously to notices of alleged copyright infringement.
          </p>

          <h3 style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-color)', marginTop: '28px', marginBottom: '12px' }}>Required Takedown Information</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>To file a valid copyright infringement notice, please provide the following:</p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '2' }}>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Exact URL link(s) on PlayFusion where the material is located.</li>
            <li>Your official contact information (Name, Organization, Email, and Phone Number).</li>
            <li>A statement that you have a good-faith belief that use of the material is unauthorized.</li>
            <li>A statement made under penalty of perjury that the information in your notice is accurate.</li>
          </ul>

          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '24px', marginTop: '32px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#ef4444', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-triangle-exclamation"></i> Designated DMCA Agent Contact
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px' }}>Submit all formal copyright takedown notices directly to our designated agent:</p>
            <a href="mailto:nasirsajjad531@gmail.com" style={{ color: '#ef4444', fontWeight: '800', fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-envelope"></i> nasirsajjad531@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
