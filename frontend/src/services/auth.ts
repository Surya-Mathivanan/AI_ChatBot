import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export interface User {
  id: string
  email: string
  name: string
  picture?: string
}

export const authService = {
  /**
   * Get Google OAuth URL from backend
   */
  async getGoogleAuthUrl(): Promise<string> {
    const { data } = await axios.get(`${API_BASE_URL}/api/auth/google`)
    return data.url
  },

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<User | null> {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return data.user
    } catch (error) {
      return null
    }
  },

  /**
   * Get current user info
   */
  async getCurrentUser(token: string): Promise<User | null> {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data.user
    } catch (error) {
      return null
    }
  },

  /**
   * Store token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem('auth_token', token)
  },

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },

  /**
   * Remove token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem('auth_token')
  }
}
