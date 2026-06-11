'use client'
import { useState } from 'react'
import { toggleLike } from '@/services/postService'

export function useLike(post, onUpdate) {
  const [liked, setLiked]   = useState(post?.likedByMe || false)
  const [count, setCount]   = useState(post?.likesCount || 0)
  const [loading, setLoad]  = useState(false)

  async function handleLike() {
    if (loading) return
    const was = liked; const prev = count
    setLiked(!was); setCount(was ? prev-1 : prev+1)
    setLoad(true)
    try {
      const d = await toggleLike(post._id)
      setLiked(d.liked); setCount(d.likesCount)
      onUpdate?.({ ...post, likedByMe: d.liked, likesCount: d.likesCount })
    } catch { setLiked(was); setCount(prev) }
    finally { setLoad(false) }
  }

  return { liked, count, handleLike, loading }
}
