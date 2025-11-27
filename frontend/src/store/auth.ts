import { create } from 'zustand'
import { authService, User } from '../services/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  signInWithGoogle: () => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  setTokenFromUrl: (token: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,

    async signInWithGoogle() {
      try {
        set({ isLoading: true })
        const authUrl = await authService.getGoogleAuthUrl()
        // Redirect to Google OAuth
        window.location.href = authUrl
      } catch (error) {
        console.error('Sign in error:', error)
        set({ isLoading: false })
        throw error
      }
    },

    logout() {
      authService.removeToken()
      set({ user: null, isAuthenticated: false, token: null })
    },

    async checkAuth() {
      try {
        set({ isLoading: true })
        const token = authService.getToken()
        
        if (!token) {
          set({ user: null, isAuthenticated: false, token: null, isLoading: false })
          return
        }

        const user = await authService.verifyToken(token)
        
        if (user) {
          set({ user, isAuthenticated: true, token, isLoading: false })
        } else {
          authService.removeToken()
          set({ user: null, isAuthenticated: false, token: null, isLoading: false })
        }
      } catch (error) {
        console.error('Auth check error:', error)
        authService.removeToken()
        set({ user: null, isAuthenticated: false, token: null, isLoading: false })
      }
    },

    async setTokenFromUrl(token: string) {
      try {
        set({ isLoading: true })
        authService.setToken(token)
        const user = await authService.verifyToken(token)
        
        if (user) {
          set({ user, isAuthenticated: true, token, isLoading: false })
        } else {
          authService.removeToken()
          set({ user: null, isAuthenticated: false, token: null, isLoading: false })
        }
      } catch (error) {
        console.error('Token verification error:', error)
        authService.removeToken()
        set({ user: null, isAuthenticated: false, token: null, isLoading: false })
      }
    }
  }
})


