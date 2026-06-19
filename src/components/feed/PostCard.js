'use client'
import Link from 'next/link'
import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import PostActions from './PostActions'
import CommentThread from '@/components/comment/CommentThread'
import { timeAgo } from '@/utils/formatDate'
import { updatePost } from '@/services/postService' // ⚡ Import du service de mise à jour

export default function PostCard({ post, onUpdate, hideActions = false }) {
  const [showComments, setShowComments] = useState(false)
  
  // ⚡ États pour l'édition directement dans le post
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(post?.content || '')
  const [isSaving, setIsSaving] = useState(false)

  // ⚡ Fonction pour sauvegarder la modification inline
  async function handleSave() {
    if (!editText.trim() || editText.trim() === post.content) {
      setIsEditing(false)
      return
    }
    setIsSaving(true)
    try {
      const updated = await updatePost(post._id, { content: editText })
      onUpdate?.(updated) // Met à jour le post dans le feed parent
      setIsEditing(false) // Quitte le mode édition
    } catch (err) {
      alert("Erreur lors de la modification")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <article className="post-card px-4 py-3 flex gap-3">
        <Link href={`/profile/${post.author?._id}`} className="flex-shrink-0 mt-0.5">
          <Avatar src={post.author?.avatar} username={post.author?.username || '?'} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <Link href={`/profile/${post.author?._id}`} className="font-bold text-sm text-breezy-dark hover:underline">
              {post.author?.username}
            </Link>
            <span className="text-breezy-muted text-sm">@{post.author?.username}</span>
            <span className="text-breezy-muted text-sm">·</span>
            <span className="text-breezy-muted text-sm">{timeAgo(post.createdAt)}</span>
          </div>

          {/* ⚡ Zone de texte interchangeable (Inline Editing) */}
          {isEditing ? (
            <div className="mt-2">
              <textarea
                className="w-full min-h-[80px] border border-breezy-border rounded-xl p-2.5 text-breezy-dark text-sm focus:outline-none focus:border-breezy-primary resize-none bg-breezy-bg"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                disabled={isSaving}
                maxLength={280}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-1.5">
                <button
                  onClick={() => { setIsEditing(false); setEditText(post.content) }}
                  className="px-3 py-1 rounded-full border border-breezy-border text-xs font-semibold text-breezy-dark hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 rounded-full bg-breezy-primary text-white text-xs font-bold hover:bg-breezy-primary/90 disabled:opacity-50"
                  disabled={isSaving || !editText.trim()}
                >
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-breezy-dark mt-0.5 leading-[1.5] whitespace-pre-wrap break-words">
              {post.content}
            </p>
          )}

          {post.imageUrl && (
            <div className="mt-2 rounded-2xl overflow-hidden border border-breezy-border">
              <img src={post.imageUrl} alt="Post image" className="w-full object-cover max-h-72" />
            </div>
          )}

          {!hideActions && (
            <PostActions
              post={post}
              onComment={() => setShowComments(true)}
              onUpdate={onUpdate}
              onEdit={() => { setIsEditing(true); setEditText(post.content) }} // ⚡ On passe l'action du clic ici
            />
          )}
        </div>
      </article>

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
        onCommentRemoved={() => {
          if (onUpdate) {
            onUpdate({
              ...post,
              commentsCount: Math.max(0, (post.commentsCount || 0) - 1)
            })
          }
        }}
        onCommentsLoaded={(count) => {
          if (onUpdate && count !== post.commentsCount) {
            onUpdate({ ...post, commentsCount: count })
          }
        }}
      />
    </>
  )
}