import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function GoogleSignIn() {
  const navigate = useNavigate()
  const { isAuthenticated, signInWithGoogle, isLoading, checkRedirectResult } = useAuthStore()

  useEffect(() => {
    // Check for redirect result when component mounts
    checkRedirectResult()
  }, [checkRedirectResult])

  useEffect(() => {
    if (isAuthenticated) navigate('/chat', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in failed:', error)
      // Error is already handled in the store
    }
  }

  return (
    <div className="auth-signin-wrap">
      <div
        className={`e-card ${isLoading ? 'loading' : 'playing'}`}
        role="button"
        aria-label="Continue with Google"
        onClick={handleSignIn}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="infotop">
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              <div>Signing in...</div>
            </>
          ) : (
            <>
              Continue with Google
              <div className="name">click to sign in</div>
              <button 
                className="btngoogle" 
                onClick={(e) => {
                  e.stopPropagation()
                  handleSignIn()
                }}
              >
                click
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


