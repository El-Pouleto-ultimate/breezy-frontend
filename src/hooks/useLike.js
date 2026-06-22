'use client'
import { useState } from 'react'
import { likePost, unlikePost } from '@/services/postService'

export function useLike(post, onUpdate) {
  const [liked, setLiked]   = useState(post?.likedByMe || false)
  const [count, setCount]   = useState(post?.likes_count || 0)
  const [loading, setLoad]  = useState(false)

  async function handleLike() {
    if (loading) return
    const was = liked; const prev = count
    setLiked(!was); setCount(was ? prev-1 : prev+1)
    setLoad(true)
    try {
      const d = was ? await unlikePost(post._id) : await likePost(post._id)
      const newCount = d.likes_count
      setLiked(!was); setCount(newCount)
      onUpdate?.({ ...post, likedByMe: !was, likes_count: newCount })
    } catch { setLiked(was); setCount(prev) }
    finally { setLoad(false) }
  }

  return { liked, count, handleLike, loading }
}
