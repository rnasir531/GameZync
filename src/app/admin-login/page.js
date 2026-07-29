'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/admin/login.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <div className="container d-flex justify-content-center align-items-center px-3" style={{ minHeight: '100vh', background: 'var(--bg-color, #1a1d25)' }}>
        <div className="login-card" style={{ width: '100%', maxWidth: '400px' }}>
          <div className="text-center mb-4 pb-2">
            <div className="logo-text mb-2">
              <span><i className="fa-solid fa-gamepad"></i> NS</span> Games
            </div>
            <h5 className="fw-bold mb-1" style={{ color: 'var(--text-color, #fff)' }}>Admin Access</h5>
            <p className="text-muted small mb-0">Sign in to manage your platform</p>
          </div>
          
          {error && (
            <div className="alert alert-danger d-flex align-items-center py-2 px-3 mb-4" style={{ borderRadius: '12px', fontSize: '14px', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)', color: '#ff4d4d' }}>
              <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
            </div>
          )}

          <form name="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-color, #fff)', textTransform: 'uppercase' }}>Username</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} className="form-control" required placeholder="Enter your username" />
              </div>
            </div>
            
            <div className="mb-4 pb-2">
              <label htmlFor="password" className="form-label" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-color, #fff)', textTransform: 'uppercase' }}>Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" required placeholder="Enter your password" />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="btn login-btn w-100 d-flex justify-content-center align-items-center gap-2">
              {loading ? 'CONNECTING...' : 'CONNECT'} <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
