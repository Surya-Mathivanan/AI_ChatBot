import { create } from 'zustand'
import { User } from 'firebase/auth'
import { subscribeAuth, signInWithGoogle as firebaseSignIn, logoutFirebase, handleRedirectResult } from '../firebase'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  checkRedirectResult: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => {
  // subscribe to firebase
  subscribeAuth((user) => set({ user, isAuthenticated: !!user }))

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    async signInWithGoogle() {
      try {
        set({ isLoading: true })
        await firebaseSignIn()
        // If popup succeeds, user will be set via auth state change
        // If redirect is used, user will be set when they return
      } catch (error) {
        console.error('Sign in error:', error)
        set({ isLoading: false })
        throw error
      } finally {
        set({ isLoading: false })
      }
    },
    async logout() {
      try {
        set({ isLoading: true })
        await logoutFirebase()
      } catch (error) {
        console.error('Logout error:', error)
        throw error
      } finally {
        set({ isLoading: false })
      }
    },
    async checkRedirectResult() {
      try {
        set({ isLoading: true })
        const user = await handleRedirectResult()
        if (user) {
          set({ user, isAuthenticated: true })
        }
      } catch (error) {
        console.error('Redirect result check error:', error)
      } finally {
        set({ isLoading: false })
      }
    },
  }
})


