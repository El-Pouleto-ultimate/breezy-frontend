'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '@/services/authService'

const AuthContext = createContext(null)
const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'breezy_token'

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [token, setToken]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (saved) {
      setToken(saved)
      getMe().then(setUser).catch(() => {
        localStorage.removeItem(TOKEN_KEY)
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  function saveToken(t) {
    setToken(t)
    localStorage.setItem(TOKEN_KEY, t)
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, saveToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
