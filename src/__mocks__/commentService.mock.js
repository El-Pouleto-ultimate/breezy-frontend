// Mock Comment Service 
import { MOCK_COMMENTS, MOCK_USERS } from './data'
import { delay } from './utils'

const _comments = { ...MOCK_COMMENTS }
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
  return reply
}
