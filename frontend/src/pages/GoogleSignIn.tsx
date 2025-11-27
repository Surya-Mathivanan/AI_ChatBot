import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function GoogleSignIn() {
  const navigate = useNavigate()
  const { isAuthenticated, signInWithGoogle, isLoading } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) navigate('/chat', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in failed:', error)
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
            {/* Image above text */}
            <img 
              src="https://img.icons8.com/?size=100&id=1RueIplXPGd2&format=png&color=000000" 
              alt="Google Icon" 
              style={{ width: '90px', height: '90px', marginBottom: '1px' , display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
            />

            Continue with Google
            <div className="name">click to sign in</div>
            <button 
              className="btngoogle" 
              onClick={(e) => {
                e.stopPropagation()
                handleSignIn()
              }}
            >
              clickk
            </button>
          </>
        )}
      </div>
    </div>
  </div>
)
}

