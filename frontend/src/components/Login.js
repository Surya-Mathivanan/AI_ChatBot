import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api';
import './Login.css';

function Login({ onLogin }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', {
        token: credentialResponse.credential
      });
      
      if (response.data.success) {
        onLogin(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Login failed');
    alert('Login failed. Please try again.');
  };

  return (
    <div className="login-container">
      {/* Animated background */}
      <div className="login-bg-animation"></div>
      
      {/* Left side - Hero Section */}
      <div className="login-hero">
        <div className="login-hero-content">
          <div className="login-logo">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="35" stroke="url(#gradient1)" strokeWidth="3"/>
              <path d="M40 15 L40 40 L55 55" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="40" cy="40" r="5" fill="url(#gradient1)"/>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4285f4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <h1 className="login-hero-title">
            Your Intelligent AI Assistant
          </h1>
          
          <p className="login-hero-subtitle">
            Powered by Google Gemini. Secure, intelligent, and ready to help you create, learn, and explore.
          </p>
          
          <div className="login-hero-features">
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span>Multi-Chat Sessions</span>
            </div>
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Secure Authentication</span>
            </div>
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span>Instant AI Responses</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Section */}
      <div className="login-section">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Gemini Chat</h2>
            <p className="login-card-subtitle">Welcome Back</p>
          </div>
          
          <div className="login-card-body">
            <p className="login-instruction">Sign in to continue your conversations</p>
            <div className="login-button-wrapper">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                // theme="transparent"
                // size="large"
                // text="signin_with"
                // shape="rectangular"
                width="200"
              />
            </div>
          </div>
          
          <div className="login-card-footer">
            <p className="login-terms">
              By signing in, you agree to our{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>{' '}
              and{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
