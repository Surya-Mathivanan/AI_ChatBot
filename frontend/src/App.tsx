import { Route, Routes, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Chat from './pages/Chat'

import ProtectedRoute from './components/ProtectedRoute'
import { useAuthStore } from './store/auth'
import GoogleSignIn from './pages/GoogleSignIn'

export default function App() {
  const { user, logout, checkRedirectResult } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check for redirect result when app loads
  useEffect(() => {
    checkRedirectResult()
  }, [checkRedirectResult])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="app">
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar} />
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-content">
          <Link to="/" className="brand" onClick={closeSidebar}>My AI</Link>
          {user ? (
            <div className="mobile-nav-links">
              
              <Link to="/chat" className="navlink" onClick={closeSidebar}>
                <span>💬</span> Chat
              </Link>
              <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                <button className="btn" onClick={() => { logout(); closeSidebar(); }} style={{ width: '100%' }}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mobile-nav-links">
              <Link to="/signin" className="navlink" onClick={closeSidebar}>
                <span>🔐</span> Continue with Google
              </Link>
            </div>
          )}
        </div>
      </div>

      <header className="header">
        <nav className="container nav">
          <div className={`hamburger ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Link to="/" className="brand"></Link>
          <div className="spacer" />
          
          {user ? (
            <>
              
              <Link to="/chat" className="navlink">Chat</Link>
              
              <button className="btn" onClick={() => logout()}>Logout</button>
            </>
          ) : (
            <Link to="/signin" className="navlink mobile-only">Sign In</Link>
          )}
        </nav>
      </header>
      <main className="container main">
        <Routes>
          <Route path="/" element={<Navigate to={user ? '/chat' : '/signin'} replace />} />
          <Route path="/signin" element={<GoogleSignIn />} />
        
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          
        </Routes>
      </main>
    </div>
  )
}