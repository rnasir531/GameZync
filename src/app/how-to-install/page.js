export const metadata = {
  title: 'Installation Guide - PlayFusion',
  description: 'Step-by-step guide to download, extract, and install PC games smoothly without errors.',
};

export default function HowToInstallPage() {
  return (
    <section className="static-page-view" id="how-to-install-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="static-page-header text-center mb-5">
        <div className="static-page-icon-wrap" style={{ margin: '0 auto 16px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary-color)' }}>
          <i className="fa-solid fa-download"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '8px' }}>How to Download &amp; Install Games</h1>
        <p className="static-page-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Follow our 4-step verified guide to ensure smooth game extraction and zero crash launches.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* STEP 1 */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(12px)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-gradient)', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', boxShadow: '0 4px 12px var(--primary-glow)' }}>1</span>
          <div style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '14px' }}><i className="fa-solid fa-cloud-arrow-down"></i></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '10px' }}>High-Speed Download</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
            Choose <strong>Direct Download</strong> or <strong>Torrent Mirror</strong>. For maximum speed, use a download manager like <em>Internet Download Manager (IDM)</em> or <em>qBittorrent</em>.
          </p>
        </div>

        {/* STEP 2 */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(12px)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-gradient)', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', boxShadow: '0 4px 129px var(--primary-glow)' }}>2</span>
          <div style={{ fontSize: '24px', color: '#06b6d4', marginBottom: '14px' }}><i className="fa-solid fa-shield-virus"></i></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '10px' }}>Disable Defender &amp; Prepare</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
            Temporarily disable <em>Windows Defender Real-Time Protection</em> during extraction. Antivirus programs often trigger false positives and quarantine safe crack files!
          </p>
        </div>

        {/* STEP 3 */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(12px)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-gradient)', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', boxShadow: '0 4px 12px var(--primary-glow)' }}>3</span>
          <div style={{ fontSize: '24px', color: '#f59e0b', marginBottom: '14px' }}><i className="fa-solid fa-file-zipper"></i></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '10px' }}>Extract Archive</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
            Right-click the <code>.rar</code> or <code>.zip</code> file and click <strong>Extract Here</strong> using 7-Zip or WinRAR. Enter password if specified on game page.
          </p>
        </div>

        {/* STEP 4 */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(12px)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-gradient)', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', boxShadow: '0 4px 12px var(--primary-glow)' }}>4</span>
          <div style={{ fontSize: '24px', color: '#10b981', marginBottom: '14px' }}><i className="fa-solid fa-play"></i></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '10px' }}>Run as Administrator</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
            Open extracted folder, right-click <code>setup.exe</code> or the main game <code>.exe</code>, and click <strong>Run as Administrator</strong> to avoid save-game permissions errors.
          </p>
        </div>
      </div>

      {/* TROUBLESHOOTING CARD */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '32px', backdropFilter: 'blur(12px)' }}>
        <h3 style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-wrench text-primary"></i> Essential Redistributables &amp; Fixes
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>
          If a game gives <code>DLL Missing</code> or <code>0xc000007b</code> errors, install the essential Microsoft gaming packages below:
        </p>

        <ul style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '2' }}>
          <li><strong>DirectX End-User Runtime:</strong> Fixes <code>d3dx9.dll</code> and graphics engine crashes.</li>
          <li><strong>Visual C++ Redistributable Runtimes (2005 - 2022):</strong> Fixes <code>MSVCP140.dll</code> and <code>VCRUNTIME140.dll</code> missing errors.</li>
          <li><strong>.NET Framework 4.8:</strong> Ensures game launchers run smoothly.</li>
        </ul>

        <div className="text-center mt-4" style={{ paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Need assistance with a specific installation error?</p>
          <a href="/contact" className="btn" style={{ padding: '10px 20px', borderRadius: '12px', background: 'var(--btn-secondary-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-headset"></i> Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
