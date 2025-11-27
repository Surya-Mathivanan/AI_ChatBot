import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Configure Google provider
provider.setCustomParameters({
  prompt: 'select_account'
})

export async function signInWithGoogle() {
  try {
    // Try popup first
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error: any) {
    console.log('Popup authentication failed, trying redirect:', error.code, error.message)

    // If popup fails, fall back to redirect
    if (error.code === 'auth/popup-blocked' ||
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/cancelled-popup-request' ||
        error.message?.includes('INTERNAL ASSERTION FAILED') ||
        error.message?.includes('Cross-Origin-Opener-Policy')) {

      console.log('Falling back to redirect authentication')
      try {
        await signInWithRedirect(auth, provider)
        return null // User will be redirected
      } catch (redirectError) {
        console.error('Redirect authentication also failed:', redirectError)
        throw redirectError
      }
    }

    // Re-throw other errors
    throw error
  }
}

// Handle redirect result when user returns
export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth)
    return result?.user || null
  } catch (error) {
    console.error('Redirect result error:', error)
    return null
  }
}

export async function logoutFirebase() {
  await signOut(auth)
}

export function subscribeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser
  if (!user) return null
  return await user.getIdToken()
}


