'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const GeneralSettingsForm = dynamic(() => import('./GeneralSettingsForm'), { loading: () => <div className="p-4 text-center text-muted"><div className="spinner-border spinner-border-sm"></div> Loading...</div> });
const SocialSettingsForm = dynamic(() => import('./SocialSettingsForm'), { loading: () => <div className="p-4 text-center text-muted"><div className="spinner-border spinner-border-sm"></div> Loading...</div> });
const EmailSettingsForm = dynamic(() => import('./EmailSettingsForm'), { loading: () => <div className="p-4 text-center text-muted"><div className="spinner-border spinner-border-sm"></div> Loading...</div> });
const SEOSettingsForm = dynamic(() => import('./SEOSettingsForm'), { loading: () => <div className="p-4 text-center text-muted"><div className="spinner-border spinner-border-sm"></div> Loading...</div> });
const AppearanceSettingsForm = dynamic(() => import('./AppearanceSettingsForm'), { loading: () => <div className="p-4 text-center text-muted"><div className="spinner-border spinner-border-sm"></div> Loading...</div> });
const AdsSettingsForm = dynamic(() => import('./AdsSettingsForm'), { loading: () => <div className="p-4 text-center text-muted"><div className="spinner-border spinner-border-sm"></div> Loading...</div> });

export default function SettingsTabsClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', { cache: 'no-store' });
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked.toString() : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Settings saved successfully!');
        router.refresh();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div className="container-fluid p-0" style={{ color: '#cbd5e1' }}>
      
      {/* 3D Dashboard Header/Tabs */}
      <div className="dashboard-panel" style={{ padding: '24px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'var(--text-color)', margin: 0 }}>
            <i className="fa-solid fa-gear text-primary me-2"></i> Global Website Settings
          </h3>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-outline-primary" 
            style={{ borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.color = '#10b981'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.color = '#10b981'; }}
          >
            <i className="fa-solid fa-rotate-right"></i> Refresh
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {[
            { id: 'general', name: 'General Settings', icon: 'fa-globe' },
            { id: 'seo', name: 'SEO & Analytics', icon: 'fa-magnifying-glass-chart' },
            { id: 'ads', name: 'Ads & Monetization', icon: 'fa-money-bill-trend-up' },
            { id: 'social', name: 'Social Links', icon: 'fa-hashtag' },
            { id: 'email', name: 'Email & SMTP', icon: 'fa-envelope' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--primary-gradient)' : 'var(--search-bg)',
                color: activeTab === tab.id ? '#fff' : 'var(--text-color)',
                boxShadow: activeTab === tab.id ? 'inset 1px 1px 2px rgba(255,255,255,0.3), inset -1px -2px 3px rgba(0,0,0,0.3), 0 4px 10px var(--primary-glow)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i> 
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content" style={{ minHeight: '400px' }}>
        <div className="dashboard-panel fade-in" style={{ padding: '0', overflow: 'hidden' }}>
          <form onSubmit={handleSave}>
            <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)' }}>
              {activeTab === 'general' && <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}><i className="fa-solid fa-globe text-primary me-2"></i> General Website Information</h4>}
              {activeTab === 'seo' && <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}><i className="fa-solid fa-magnifying-glass-chart text-info me-2"></i> SEO & Traffic Analytics</h4>}
              {activeTab === 'ads' && <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}><i className="fa-solid fa-money-bill-trend-up text-success me-2"></i> Monetization & Ads</h4>}
              {activeTab === 'social' && <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}><i className="fa-solid fa-hashtag text-info me-2"></i> Footer Social Links</h4>}
              {activeTab === 'email' && <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}><i className="fa-solid fa-envelope text-success me-2"></i> SMTP Configuration</h4>}
            </div>

            <div style={{ padding: '24px' }}>
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mb-4`} style={{ background: message.includes('success') ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)', color: message.includes('success') ? '#198754' : '#dc3545', border: 'none', padding: '16px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                  <i className={`fa-solid ${message.includes('success') ? 'fa-check-circle' : 'fa-triangle-exclamation'} me-3`} style={{ fontSize: '20px' }}></i> 
                  <span style={{ fontWeight: '500' }}>{message}</span>
                </div>
              )}

              {activeTab === 'general' && <GeneralSettingsForm settings={settings} handleChange={handleChange} />}
              {activeTab === 'seo' && <SEOSettingsForm settings={settings} handleChange={handleChange} />}
              {activeTab === 'ads' && <AdsSettingsForm settings={settings} handleChange={handleChange} />}
              {activeTab === 'social' && <SocialSettingsForm settings={settings} handleChange={handleChange} />}
              {activeTab === 'email' && <EmailSettingsForm settings={settings} handleChange={handleChange} />}
            </div>

            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" disabled={saving} style={{ fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', letterSpacing: '0.5px' }}>
                {saving ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span> Saving Changes...</>
                ) : (
                  <><i className="fa-solid fa-floppy-disk me-2"></i> Save Settings</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
