// Mock Comment Service 
import { MOCK_COMMENTS, MOCK_USERS } from './data'
import { delay } from './utils'

const COMMENTS_STORAGE_KEY = 'breezy_mock_comments'

function loadComments() {
  if (typeof window === 'undefined') return { ...MOCK_COMMENTS }
  try {
    const saved = sessionStorage.getItem(COMMENTS_STORAGE_KEY)
    return saved ? JSON.parse(saved) : { ...MOCK_COMMENTS }
  } catch {
    return { ...MOCK_COMMENTS }
  }
}

export function saveComments() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(_comments))
  } catch { }
}

export const _comments = loadComments()
let _nextId = 200

export async function getComments(postId) {
  await delay(250)
  return { comments: _comments[postId] || [] }
}

export async function createComment(postId, { content }) {
  await delay(200)
  const comment = {
    _id: `comment_mock_${_nextId++}`,
    author: { ...MOCK_USERS.me },
    content,
    createdAt: new Date().toISOString(),
  }
  if (!_comments[postId]) _comments[postId] = []
  _comments[postId].unshift(comment)
  saveComments()
  
  // Try to update post comments count if possible (without import)
  try {
    const savedPosts = JSON.parse(sessionStorage.getItem('breezy_mock_posts') || '[]')
    const post = savedPosts.find(p => p._id === postId)
    if (post) {
      post.commentsCount = (post.commentsCount || 0) + 1
      sessionStorage.setItem('breezy_mock_posts', JSON.stringify(savedPosts))
    }
  } catch (e) {}
  
  return comment
}

export async function replyToComment(postId, commentId, { content }) {
  await delay(200)
  const reply = {
    _id: `reply_mock_${_nextId++}`,
    author: { ...MOCK_USERS.me },
    content,
    createdAt: new Date().toISOString(),
    parentId: commentId,
  }
  if (!_comments[postId]) _comments[postId] = []
  _comments[postId].push(reply)
  saveComments()
  return reply
}

export async function updateComment(postId, commentId, { content }) {
  await delay(200)
  if (!_comments[postId]) throw new Error('Post not found')
  const comment = _comments[postId].find(c => c._id === commentId)
  if (!comment) throw new Error('Comment not found')
  if (content !== undefined) comment.content = content
  saveComments()
  return comment
}

export async function deleteComment(postId, commentId) {
  await delay(200)
  if (!_comments[postId]) throw new Error('Post not found')
  _comments[postId] = _comments[postId].filter(c => c._id !== commentId)
  saveComments()
  
  // Try to decrement post comments count
  try {
    const savedPosts = JSON.parse(sessionStorage.getItem('breezy_mock_posts') || '[]')
    const post = savedPosts.find(p => p._id === postId)
    if (post) {
      post.commentsCount = Math.max(0, (post.commentsCount || 0) - 1)
      sessionStorage.setItem('breezy_mock_posts', JSON.stringify(savedPosts))
    }
  } catch (e) {}
}
