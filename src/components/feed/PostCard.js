'use client'
import Link from 'next/link'
import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import PostActions from './PostActions'
import CommentThread from '@/components/comment/CommentThread'
import { timeAgo } from '@/utils/formatDate'
import { useAuth } from '@/hooks/useAuth'
import { updatePost, deletePost } from '@/services/postService'

export default function PostCard({ post, onUpdate, hideActions = false }) {
  const [showComments, setShowComments] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [isSaving, setIsSaving] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useAuth()

  const authorId = post?.author?._id || post?.author?.id || post?.user_id
  const myId = user?._id || user?.id
  const isAuthor = Boolean(myId && authorId && myId === authorId)

  const handleSaveEdit = async () => {
    if (!editContent.trim() || editContent === post.content) {
      setIsEditing(false)
      return
    }
    setIsSaving(true)
    try {
      await updatePost(post._id, { content: editContent })
      if (onUpdate) onUpdate({ ...post, content: editContent })
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce post ?')) return
    try {
      await deletePost(post._id)
      // Normalement onUpdate devrait être utilisé pour supprimer aussi, 
      // ou bien un appel parent rafraîchira la liste
      window.location.reload() // Solution de contournement simple
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <article className="post-card px-4 py-3 flex gap-3">
        {/* Avatar */}
        <Link href={`/profile/${authorId}`} className="flex-shrink-0 mt-0.5">
          <Avatar src={post.author?.avatar} username={post.author?.username || post.username || '?'} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header: name · @handle · time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-wrap">
              <Link
                href={`/profile/${authorId}`}
                className="font-bold text-sm text-breezy-dark hover:underline"
              >
                {post.author?.username || post.username}
              </Link>
              <span className="text-breezy-muted text-sm">@{post.author?.username || post.username}</span>
              <span className="text-breezy-muted text-sm">·</span>
              <span className="text-breezy-muted text-sm">{timeAgo(post.createdAt)}</span>
            </div>

            {isAuthor && !isEditing && (
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)} className="p-1 rounded-full text-breezy-muted hover:bg-breezy-hover transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                </button>
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 top-6 z-50 bg-white border border-breezy-border shadow-xl rounded-xl py-2 w-32 text-sm">
                      <button onClick={() => { setIsEditing(true); setShowMenu(false) }} className="w-full text-left px-4 py-2 hover:bg-breezy-hover text-breezy-dark">Modifier</button>
                      <button onClick={() => { handleDelete(); setShowMenu(false) }} className="w-full text-left px-4 py-2 hover:bg-breezy-hover text-red-500">Supprimer</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className="w-full p-2 border border-breezy-border rounded-xl focus:outline-none focus:border-breezy-primary resize-none text-sm text-breezy-dark"
                rows="3"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => { setIsEditing(false); setEditContent(post.content) }} className="px-3 py-1.5 text-xs font-bold text-breezy-muted hover:bg-breezy-hover rounded-full transition-colors">
                  Annuler
                </button>
                <button onClick={handleSaveEdit} disabled={isSaving} className="px-3 py-1.5 text-xs font-bold text-white bg-breezy-primary hover:bg-breezy-primary/90 rounded-full transition-colors disabled:opacity-50">
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-breezy-dark mt-0.5 leading-[1.5] whitespace-pre-wrap break-words">
              {post.content}
            </p>
          )}

          {/* Optional image */}
          {post.imageUrl && (
            <div className="mt-2 rounded-2xl overflow-hidden border border-breezy-border">
              <img
                src={post.imageUrl}
                alt="Post image"
                className="w-full object-cover max-h-72"
              />
            </div>
          )}

          {/* Actions */}
          {!hideActions && (
            <PostActions
              post={post}
              onComment={() => setShowComments(true)}
              onUpdate={onUpdate}
            />
          )}
        </div>
      </article>

      {/* Comment sheet */}
      <CommentThread
        post={post}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        onCommentAdded={(newComment) => {
          if (onUpdate) {
            onUpdate({
              ...post,
              commentsCount: (post.commentsCount || 0) + 1
            })
          }
        }}
        onCommentRemoved={(commentId) => {
          if (onUpdate) {
            onUpdate({
              ...post,
              commentsCount: Math.max(0, (post.commentsCount || 0) - 1)
            })
          }
        }}
      />
    </>
  )
}
