'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { createComment } from '@/services/commentService'
import { useAuth } from '@/hooks/useAuth'
import { timeAgo } from '@/utils/formatDate'
import { Suspense } from 'react'
import api from '@/services/api'

function ReplyForm() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const postId = params.get('postId')
  const [text, setT] = useState('')
  const [loading, setL] = useState(false)
  const [error, setError] = useState('')
  const [post, setPost] = useState(null)
  const [loadingPost, setLoadingPost] = useState(true)

  useEffect(() => {
    if (!postId) { setLoadingPost(false); return }
    api.get(`/posts/${postId}`).then(r => setPost(r.data))
      .catch(() => {})
      .finally(() => setLoadingPost(false))
  }, [postId])

  async function publish() {
    if (!text.trim() || loading) return
    setL(true)
    setError('')
    try {
      if (postId) await createComment(postId, { content: text })
      router.back()
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Erreur lors de la publication.')
    } finally { setL(false) }
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
      <div className="flex items-center justify-between px-4 h-14 border-b border-breezy-border">
        <button onClick={() => router.back()} className="text-breezy-dark">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-dark"><path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"/></svg>
        </button>
        <div />
        <Button onClick={publish} loading={loading} disabled={!text.trim()}
          className="bg-breezy-dark text-white text-sm font-bold px-5 py-1.5 rounded-full hover:bg-black">
          Publier
        </Button>
      </div>

      {loadingPost ? (
        <div className="flex justify-center py-8"><Spinner /></div>
      ) : post ? (
        <div className="flex gap-3 px-4 pt-4">
          <div className="flex flex-col items-center">
            <Avatar src={post.avatar_url} username={post.username} size="md" />
            <div className="w-0.5 flex-1 bg-breezy-border mt-2 min-h-12" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-bold text-sm text-breezy-dark">{post.username}</span>
              <span className="text-breezy-muted text-sm">@{post.username}</span>
              <span className="text-breezy-muted text-sm">· {timeAgo(post.created_at)}</span>
            </div>
            <p className="text-sm text-breezy-dark leading-relaxed">{post.content}</p>
            <p className="text-sm text-breezy-primary mt-2">En reponse a @{post.username}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-breezy-muted py-4">Post introuvable.</p>
      )}

      {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2">{error}</p>}

      <div className="flex gap-3 px-4 flex-1">
        <Avatar src={user?.avatar_url} username={user?.username || '?'} size="md" className="mt-1" />
        <textarea
          value={text}
          onChange={e => setT(e.target.value)}
          placeholder="Votre reponse..."
          autoFocus
          maxLength={280}
          className="flex-1 text-lg text-breezy-dark placeholder:text-breezy-muted bg-transparent outline-none resize-none min-h-32 leading-relaxed pt-1"
        />
      </div>
    </div>
  )
}

export default function ReplyPage() {
  return <Suspense><ReplyForm /></Suspense>
}
