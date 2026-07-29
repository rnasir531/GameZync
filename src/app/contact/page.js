'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      
      if (res.ok) {
        setMsg({ text: 'Message sent successfully! We will get back to you soon.', type: 'success' });
        e.target.reset();
      } else {
        setMsg({ text: result.error || 'Failed to send message', type: 'danger' });
      }
    } catch (err) {
      setMsg({ text: 'An unexpected error occurred.', type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <section className="static-page-view" id="contact-us-view" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 15px' }}>
      {/* Sleek Cyber Header */}
      <div className="static-page-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div 
          className="static-page-icon-wrap"
          style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '20px', 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)', 
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            color: '#10b981',
            marginBottom: '16px',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)'
          }}
        >
          <i className="fa-solid fa-envelope"></i>
        </div>
        <h1 className="static-page-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', color: 'var(--text-color)', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          Contact Us
        </h1>
        <p className="static-page-subtitle" style={{ color: 'var(--text-muted)', fontSize: '15px', margin: 0 }}>
          Have a question, suggestion, or business inquiry? Get in touch with the GameZync team!
        </p>
      </div>
      
      {/* Glassmorphic Cyber Form Card */}
      <div 
        className="static-content-card submit-game-card" 
        style={{ 
          background: 'var(--card-bg)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '24px', 
          padding: '36px 30px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(16px)'
        }}
      >
        <form id="contact-us-form" className="submit-game-form" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', color: 'var(--text-color)', fontWeight: '700', fontSize: '13.5px', marginBottom: '8px' }}>
                Your Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Enter your name"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  background: 'var(--search-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-color)', 
                  fontSize: '14px', 
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }} 
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', color: 'var(--text-color)', fontWeight: '700', fontSize: '13.5px', marginBottom: '8px' }}>
                Your Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="Enter your email"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  background: 'var(--search-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-color)', 
                  fontSize: '14px', 
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-color)', fontWeight: '700', fontSize: '13.5px', marginBottom: '8px' }}>
              Subject
            </label>
            <input 
              type="text" 
              name="subject" 
              placeholder="E.g., Advertising, Bug Report, Feedback..." 
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                background: 'var(--search-bg)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-color)', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.2s'
              }} 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--text-color)', fontWeight: '700', fontSize: '13.5px', marginBottom: '8px' }}>
              Message <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea 
              name="message" 
              rows="5" 
              required 
              placeholder="Type your message here..."
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                borderRadius: '14px', 
                background: 'var(--search-bg)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-color)', 
                fontSize: '14px', 
                outline: 'none',
                resize: 'vertical',
                minHeight: '120px'
              }}
            ></textarea>
          </div>

          {/* Premium Glowing Status Alert */}
          {msg.text && (
            <div 
              id="contact-us-msg"
              className="status-alert-box"
              style={{ 
                marginBottom: '24px', 
                fontWeight: '700', 
                padding: '16px 20px',
                borderRadius: '16px',
                background: msg.type === 'success' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.16) 100%)' 
                  : 'rgba(239, 68, 68, 0.15)', 
                border: `1.5px solid ${msg.type === 'success' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
                color: msg.type === 'success' ? '#10b981' : '#ef4444',
                boxShadow: `0 8px 30px ${msg.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '15px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <i className={`fa-solid ${msg.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`} style={{ fontSize: '20px', flexShrink: 0, margin: 0, position: 'static' }}></i>
              <span style={{ lineHeight: '1.4' }}>{msg.text}</span>
            </div>
          )}

          {/* Cyber Submit Action Button */}
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '14px 24px', 
              borderRadius: '14px', 
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', 
              color: '#ffffff', 
              fontWeight: '800', 
              fontSize: '15.5px', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i> 
            {loading ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
