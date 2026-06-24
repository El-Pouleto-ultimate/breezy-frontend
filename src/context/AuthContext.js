'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, logout as logoutApi } from '@/services/authService'
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
    // Les admins et modérateurs ne reçoivent pas de notifications de like/follow
    if (user?.role === 'admin' || user?.role === 'moderator') {
      setUnreadCount(0)
      return
    }
    try {
      const data = await getNotifications()
      if (data?.unread_count !== undefined) {
        setUnreadCount(data.unread_count)
      } else {
        const list = Array.isArray(data) ? data : data?.data || []
        setUnreadCount(list.filter(n => !n.is_read && !n.read).length)
      }

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
          if (userData?.user) setUser(userData.user)
          else if (userData) setUser(userData)
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
    // Cookie simple pour le middleware serveur (protection côté Next.js)
    document.cookie = `breezy_auth=1; path=/; max-age=86400; SameSite=Lax`
  }

  function logout() {
    logoutApi().catch(() => {})
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
    // Supprimer le cookie d'auth
    document.cookie = 'breezy_auth=; path=/; max-age=0'
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