'use client'
import { useState, useEffect } from 'react'
import { getComments, createComment } from '@/services/commentService'

export function useComments(postId) {
  const [comments, setC] = useState([])
  const [loading, setL]  = useState(false)
  const [error, setE]    = useState('')

  useEffect(() => {
    if (!postId) return
    setL(true)
    getComments(postId).then(d => setC(d.comments)).catch(() => setE('Erreur.')).finally(() => setL(false))
  }, [postId])

  async function addComment(content) {
    const c = await createComment(postId, { content })
    setC(p => [c, ...p])
    return c
  }

  return { comments, loading, error, addComment }
}
