import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        if (!form.name.trim()) { setError('Name is required'); setSubmitting(false); return; }
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Todo App</h1>
        <p className="auth-subtitle">{isLogin ? 'Welcome back' : 'Create your account'}</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={submitting}>
            {submitting ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={toggle} className="auth-link">{isLogin ? 'Sign Up' : 'Log In'}</button>
        </p>
      </div>
    </div>
  );
}
