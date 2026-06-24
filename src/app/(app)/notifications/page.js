'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import NotificationItem from '@/components/notifications/NotificationItem'
import Spinner from '@/components/ui/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { getNotifications, markAllAsRead } from '@/services/notificationService'

export default function NotificationsPage() {
  const [tab, setTab] = useState('all')
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, setUnreadCount } = useAuth()

  const isPrivilegedRole = user?.role === 'admin' || user?.role === 'moderator'

  useEffect(() => {
    // Les admins et modérateurs n'ont pas de notifications de like/follow
    if (isPrivilegedRole) {
      setLoading(false)
      setUnreadCount(0)
      return
    }

    setLoading(true)
    getNotifications()
      .then(res => {
        const list = res?.data || (Array.isArray(res) ? res : [])
        setNotifications(list.map(n => ({
          _id: n._id,
          type: n.type,
          read: n.is_read,
          createdAt: n.created_at,
          actors: [{ _id: n.from_user_id, username: n.from_username, avatar: '' }],
          preview: '',
          postId: n.post_id,
        })))
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false))

    markAllAsRead().catch(() => {})
    setUnreadCount(0)
  }, [isPrivilegedRole, setUnreadCount])

  const filtered = tab === 'all' ? notifications : notifications.filter(n => n.type === 'mention')

  return (
    <AppShell title="Notifications">
      <div className="flex border-b border-breezy-border sticky top-0 z-30 bg-white">
        {[{ id: 'all', label: 'Toutes' }, { id: 'mention', label: 'Mentions' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${tab === t.id ? 'text-breezy-dark' : 'text-breezy-muted hover:bg-breezy-hover'}`}>
            {t.label}
            {tab === t.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-breezy-primary rounded-full" />}
          </button>
        ))}
      </div>

      <div>
        {loading && <div className="flex justify-center py-12"><Spinner /></div>}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-breezy-muted text-sm py-12">Aucune notification pour l'instant.</p>
        )}
        {!loading && !isPrivilegedRole && filtered.map(n => <NotificationItem key={n._id} notif={n} />)}
      </div>
    </AppShell>
  )
}
