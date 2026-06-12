'use client'
// CommentThread.jsx
// Slide-up sheet showing original post + comments + reply composer (Fx7, Fx8)
// Used inside PostCard when tapping the comment icon.

import { useEffect, useRef } from 'react'
import { useComments } from '@/hooks/useComments'
import Avatar from '@/components/ui/Avatar'
import Spinner from '@/components/ui/Spinner'
import { timeAgo } from '@/utils/formatDate'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function CommentThread({ post, isOpen, onClose, onCommentAdded }) {
  const { user } = useAuth()
  const { comments, loading, addComment } = useComments(isOpen ? post?._id : null)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const sheetRef = useRef(null)

  // Trap body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  async function handleSend(e) {
    e.preventDefault()
    if (!reply.trim() || sending) return
    setSending(true)
    try {
      const c = await addComment(reply)
      setReply('')
      onCommentAdded?.(c)
    }
    finally { setSending(false) }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[85vh] flex flex-col max-w-lg mx-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-breezy-border">
          <span className="font-bold text-breezy-dark">Réponses</span>
          <button onClick={onClose} className="text-breezy-muted hover:text-breezy-dark p-1 rounded-full hover:bg-breezy-hover">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
            </svg>
          </button>
        </div>

        {/* Original post */}
        <div className="flex gap-3 px-4 py-3 border-b border-breezy-border">
          <Avatar src={post?.author?.avatar} username={post?.author?.username} size="md" />
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="font-bold text-sm text-breezy-dark">{post?.author?.username}</span>
              <span className="text-breezy-muted text-sm">· {timeAgo(post?.createdAt)}</span>
            </div>
            <p className="text-sm text-breezy-dark leading-relaxed">{post?.content}</p>
          </div>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto">
          {loading && <div className="flex justify-center py-8"><Spinner /></div>}
          {!loading && comments.length === 0 && (
            <p className="text-center text-breezy-muted text-sm py-8">
              Aucune réponse. Sois le premier !
            </p>
          )}
          {comments.map(c => (
            <div key={c._id} className="flex gap-3 px-4 py-3 border-b border-breezy-border">
              <Avatar src={c.author?.avatar} username={c.author?.username} size="sm" />
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-sm text-breezy-dark">{c.author?.username}</span>
                  <span className="text-breezy-muted text-xs">· {timeAgo(c.createdAt)}</span>
                </div>
                <p className="text-sm text-breezy-dark mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply composer */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 px-4 py-3 border-t border-breezy-border bg-white"
        >
          <Avatar src={user?.avatar} username={user?.username} size="sm" />
          <input
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Votre réponse..."
            className="flex-1 bg-breezy-bg rounded-full px-4 py-2 text-sm outline-none text-breezy-dark placeholder:text-breezy-muted"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!reply.trim() || sending}
            className="text-breezy-primary disabled:opacity-30 transition-opacity font-semibold text-sm"
          >
            {sending ? '...' : 'Publier'}
          </button>
        </form>
      </div>
    </>
  )
}
