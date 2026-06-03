import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, UserPlus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!username.trim()) {
          throw new Error('Username is required');
        }
        await signUp(email, password, username.trim());
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="login-title">Welcome <span style={{ color: '#A92E43' }}>Home</span></h1>
        <p className="login-subtitle">Sign in to get your name on the leaderboard</p>
      </div>

      <div className="login-card">
        <div className="login-tabs">
          <button 
            className={`login-tab ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            <ArrowRight size={18} />
            Sign In
          </button>
          <button 
            className={`login-tab ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            <UserPlus size={18} />
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="input-group">
              <label className="input-label">Username</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon-svg" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="login-input"
                  placeholder="ur username..."
                  required={isSignUp}
                  maxLength={20}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon-svg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="ur email..."
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon-svg" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="ur password..."
                required
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="forgot-link-wrapper">
              <span className="forgot-link">forgot password?</span>
            </div>
          )}

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? '...' : (isSignUp ? 'SIGN UP' : 'SIGN IN')}
          </button>
        </form>

        <p className="login-switch">
          {isSignUp ? 'already have an account?' : 'not a member yet?'}{' '}
          <button className="switch-btn" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign in' : 'Join now'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;