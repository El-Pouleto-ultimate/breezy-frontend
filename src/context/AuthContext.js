'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '@/services/authService'
import { getNotifications } from '@/services/notificationService'
import { getUnreadMessagesCount } from '@/services/messageService'

const AuthContext = createContext(null)
const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'breezy_token'

export function AuthProvider({ children }) {
  // Lecture synchrone du token pour éviter les déconnexions flash
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY) || null
    }
    return null
  })
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [unreadMsgCount, setUnreadMsgCount] = useState(0)

  async function refreshUnreadCount() {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (!saved) {
      setUnreadCount(0)
      setUnreadMsgCount(0)
      return
    }
    try {
      const data = await getNotifications()
      const list = Array.isArray(data) ? data : data?.data || []
      const count = list.filter(n => !n.read).length
      setUnreadCount(count)
      
      const msgCount = await getUnreadMessagesCount()
      setUnreadMsgCount(msgCount)
    } catch (e) {
      console.error("Erreur notifications:", e)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (saved) {
      getMe()
        .then((userData) => {
          if (userData) setUser(userData)
        })
        .catch((err) => {
          console.error("Erreur récupération utilisateur:", err)
          // On ne supprime pas le token ici pour éviter les déconnexions intempestives
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) {
      refreshUnreadCount()
    } else {
      setUnreadCount(0)
      setUnreadMsgCount(0)
    }
  }, [user])

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
    <AuthContext.Provider value={{ user, setUser, token, saveToken, logout, loading, unreadCount, setUnreadCount, unreadMsgCount, setUnreadMsgCount, refreshUnreadCount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider')
  return ctx
}