'use client'


import { useEffect, useRef } from 'react'
import { useComments } from '@/hooks/useComments'
import Avatar from '@/components/ui/Avatar'
import Spinner from '@/components/ui/Spinner'
import { timeAgo } from '@/utils/formatDate'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

function CommentItem({ c, user, onUpdate, onRemove, onReply }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(c.content)
  const [isSaving, setIsSaving] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSendingReply, setIsSendingReply] = useState(false)
  
  const authorId = c?.author?._id || c?.author?.id || c?.user_id
  const myId = user?._id || user?.id
  const isAuthor = Boolean(myId && authorId && myId === authorId)

  const handleSave = async () => {
    if (!editContent.trim() || editContent === c.content) {
      setIsEditing(false)
      return
    }
    setIsSaving(true)
    try {
      await onUpdate(c._id || c.id, editContent)
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) return
    try {
      await onRemove(c._id || c.id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSendReply = async () => {
    if (!replyContent.trim()) return
    setIsSendingReply(true)
    try {
      await onReply(c._id || c.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSendingReply(false)
    }
  }

  return (
    <div className={`flex gap-3 px-4 py-3 border-b border-breezy-border group relative ${c.parentId ? 'ml-8 bg-gray-50/50' : ''}`}>
      <Avatar src={c.author?.avatar} username={c.author?.username || c.username} size="sm" />
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-1.5">
          <div>
            <span className="font-bold text-sm text-breezy-dark mr-1.5">{c.author?.username || c.username}</span>
            <span className="text-breezy-muted text-xs">· {timeAgo(c.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button onClick={() => setIsReplying(!isReplying)} className="text-xs font-semibold text-breezy-muted hover:text-breezy-primary transition-colors">
                Répondre
              </button>
            )}
            {isAuthor && !isEditing && (
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)} className="p-1 rounded-full text-breezy-muted hover:bg-breezy-hover transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                </button>
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 top-6 z-50 bg-white border border-breezy-border shadow-xl rounded-xl py-1 w-28 text-xs">
                      <button onClick={() => { setIsEditing(true); setShowMenu(false); setIsReplying(false) }} className="w-full text-left px-3 py-1.5 hover:bg-breezy-hover text-breezy-dark">Modifier</button>
                      <button onClick={() => { handleDelete(); setShowMenu(false) }} className="w-full text-left px-3 py-1.5 hover:bg-breezy-hover text-red-500">Supprimer</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <div className="mt-1">
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              className="w-full p-2 border border-breezy-border rounded-lg focus:outline-none focus:border-breezy-primary resize-none text-sm text-breezy-dark"
              rows="2"
            />
            <div className="flex justify-end gap-2 mt-1.5">
              <button onClick={() => { setIsEditing(false); setEditContent(c.content) }} className="px-2 py-1 text-xs font-bold text-breezy-muted hover:bg-breezy-hover rounded-full transition-colors">
                Annuler
              </button>
              <button onClick={handleSave} disabled={isSaving} className="px-2 py-1 text-xs font-bold text-white bg-breezy-primary hover:bg-breezy-primary/90 rounded-full transition-colors disabled:opacity-50">
                {isSaving ? '...' : 'Ok'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-breezy-dark mt-0.5">{c.content}</p>
        )}

        {isReplying && (
          <div className="mt-2 flex gap-2 items-start">
            <Avatar src={user?.avatar} username={user?.username} size="xs" />
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                placeholder={`Répondre à ${c.author?.username || c.username}...`}
                className="w-full p-2 border border-breezy-border rounded-lg focus:outline-none focus:border-breezy-primary resize-none text-xs text-breezy-dark"
                rows="2"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-1">
                <button onClick={() => { setIsReplying(false); setReplyContent('') }} className="px-2 py-1 text-xs font-bold text-breezy-muted hover:bg-breezy-hover rounded-full transition-colors">
                  Annuler
                </button>
                <button onClick={handleSendReply} disabled={isSendingReply || !replyContent.trim()} className="px-2 py-1 text-xs font-bold text-white bg-breezy-primary hover:bg-breezy-primary/90 rounded-full transition-colors disabled:opacity-50">
                  {isSendingReply ? '...' : 'Répondre'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CommentThread({ post, isOpen, onClose, onCommentAdded, onCommentRemoved }) {
  const { user } = useAuth()
  const { comments, loading, addComment, updateComment, removeComment, replyComment } = useComments(isOpen ? post?._id : null)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const sheetRef = useRef(null)

  // Fermer le thread si l'utilisateur clique en dehors du sheet
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

  async function handleRemove(commentId) {
    await removeComment(commentId)
    onCommentRemoved?.(commentId)
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
            <CommentItem 
              key={c._id} 
              c={c} 
              user={user} 
              onUpdate={updateComment} 
              onRemove={handleRemove} 
              onReply={replyComment}
            />
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
