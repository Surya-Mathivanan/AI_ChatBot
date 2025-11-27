import { Route, Routes, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Chat from './pages/Chat'

import ProtectedRoute from './components/ProtectedRoute'
import { useAuthStore } from './store/auth'
import GoogleSignIn from './pages/GoogleSignIn'

export default function App() {
  const { user, logout, checkAuth, setTokenFromUrl } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Check for OAuth callback token or existing auth
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const error = params.get('error')

    if (token) {
      // Handle OAuth callback with token
      setTokenFromUrl(token).then(() => {
        // Clean URL and redirect to chat
        navigate('/chat', { replace: true })
      })
    } else if (error) {
      console.error('OAuth error:', error)
      navigate('/signin', { replace: true })
    } else {
      // Check existing auth
      checkAuth()
    }
  }, [location.search, setTokenFromUrl, checkAuth, navigate])

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
              <div 
  style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'flex-end', // Change to 'center' or 'flex-start' if needed
    marginTop: 'auto', 
    paddingTop: '24px', 
    paddingBottom: '24px', // Add bottom padding
    height: '100%' // Ensure full height for alignment control
  }}
>
  <button 
    className="btn" 
    onClick={() => { logout(); closeSidebar(); }} 
    style={{ width: '100%' }}
  >
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