'use client'
import { useState, useEffect } from 'react'
import { getComments, createComment, updateComment, deleteComment, replyToComment } from '@/services/commentService'

export function useComments(postId) {
  const [comments, setC] = useState([])
  const [loading, setL] = useState(false)
  const [error, setE] = useState('')

  useEffect(() => {
    if (!postId) return
    setL(true)
    getComments(postId).then(d => {
      const raw = d.data || d.comments || []
      const flat = []
      raw.forEach(c => {
        const { replies, ...parent } = c
        flat.push(parent)
        if (Array.isArray(replies)) {
          replies.forEach(r => flat.push(r))
        }
      })
      setC(flat)
    }).catch(() => setE('Erreur.')).finally(() => setL(false))
  }, [postId])

  async function addComment(content) {
    if (!content || content.length > 280) {
      setE('Le commentaire doit faire entre 1 et 280 caractères.')
      return null
    }
    try {
      const c = await createComment(postId, { content })
      if (c) setC(p => [c, ...p])
      setE('')
      return c
    } catch (err) {
      setE(err?.response?.data?.error?.message || 'Erreur lors de l\'envoi.')
      return null
    }
  }

  async function update(commentId, content) {
    try {
      const c = await updateComment(postId, commentId, { content })
      setC(p => p.map(x => (x._id || x.id) === commentId ? { ...x, content } : x))
      return c
    } catch (err) {
      setE(err?.response?.data?.error?.message || 'Erreur lors de la modification.')
      return null
    }
  }

  async function remove(commentId) {
    try {
      await deleteComment(postId, commentId)
      setC(p => p.filter(x => (x._id || x.id) !== commentId))
    } catch (err) {
      setE(err?.response?.data?.error?.message || 'Erreur lors de la suppression.')
    }
  }

  async function reply(commentId, content) {
    if (!content || content.length > 280) {
      setE('La réponse doit faire entre 1 et 280 caractères.')
      return null
    }
    try {
      const c = await replyToComment(postId, commentId, { content })
      setC(p => {
        const idx = p.findIndex(x => x._id === commentId)
        if (idx === -1) return [...p, c]
        const newComments = [...p]
        newComments.splice(idx + 1, 0, c)
        return newComments
      })
      setE('')
      return c
    } catch (err) {
      setE(err?.response?.data?.error?.message || 'Erreur lors de l\'envoi.')
      return null
    }
  }

  return { comments, loading, error, addComment, updateComment: update, removeComment: remove, replyComment: reply }
}
