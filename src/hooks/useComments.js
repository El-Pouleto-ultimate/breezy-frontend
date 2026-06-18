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
      const all = d.comments || []
      const organized = []

      const childrenByParent = {}
      all.forEach(c => {
        if (c.parentId) {
          childrenByParent[c.parentId] = childrenByParent[c.parentId] || []
          childrenByParent[c.parentId].push(c)
        }
      })

      const parents = all.filter(c => !c.parentId)

      const addWithDescendants = (c) => {
        organized.push(c)
        const children = childrenByParent[c._id || c.id] || []
        children.forEach(child => addWithDescendants(child))
      }

      parents.forEach(p => addWithDescendants(p))

      const inOrganized = new Set(organized.map(c => c._id || c.id))
      const orphans = all.filter(c => !inOrganized.has(c._id || c.id))

      setC([...organized, ...orphans])
    }).catch(() => setE('Erreur.')).finally(() => setL(false))
  }, [postId])

  async function addComment(content) {
    const c = await createComment(postId, { content })
    setC(p => [c, ...p])
    return c
  }

  async function update(commentId, content) {
    const c = await updateComment(postId, commentId, { content })
    setC(p => p.map(x => (x._id || x.id) === commentId ? { ...x, content } : x))
    return c
  }

  async function remove(commentId) {
    await deleteComment(postId, commentId)
    setC(p => p.filter(x => (x._id || x.id) !== commentId))
  }

  async function reply(commentId, content) {
    const c = await replyToComment(postId, commentId, { content })
    setC(p => {
      const idx = p.findIndex(x => x._id === commentId)
      if (idx === -1) return [...p, c]
      const newComments = [...p]
      newComments.splice(idx + 1, 0, c)
      return newComments
    })
    return c
  }

  return { comments, loading, error, addComment, updateComment: update, removeComment: remove, replyComment: reply }
}
