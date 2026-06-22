'use client'
import { useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { getFollowers, getFollowing } from '@/services/userService'

export default function FollowersModal({ isOpen, onClose, userId, type }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOpen || !userId) return
    setLoading(true)
    const fetcher = type === 'followers' ? getFollowers : getFollowing
    fetcher(userId)
      .then(res => setUsers(res.data || res.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [isOpen, userId, type])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-breezy-border">
          <h2 className="font-bold text-lg text-breezy-dark">
            {type === 'followers' ? 'Abonnés' : 'Abonnements'}
          </h2>
          <button onClick={onClose} className="text-breezy-muted hover:text-breezy-dark">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center p-8"><Spinner /></div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-breezy-muted text-sm">
              Aucun {type === 'followers' ? 'abonné' : 'abonnement'} trouvé.
            </div>
          ) : (
            <div className="flex flex-col">
              {users.map(u => (
                <div key={u._id} className="flex items-center justify-between p-4 hover:bg-breezy-hover border-b border-breezy-border last:border-0 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar src={u.avatar} username={u.username} size="sm" />
                    <div className="flex flex-col">
                      <span className="font-bold text-breezy-dark text-sm">{u.username}</span>
                      <span className="text-breezy-muted text-xs">@{u.username}</span>
                    </div>
                  </div>
                  {/* Idéal : Bouton Suivre/Ne plus suivre */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
