// ─── Mock Post Service ────────────────────────────────────────────────
import { MOCK_POSTS, MOCK_USERS } from './data'
import { delay } from './utils'

// État local mutable pour simuler les interactions
let _posts = [...MOCK_POSTS]
let _nextId = 100

export async function getFeed(page = 1) {
  await delay(350)
  const limit = 10
  const start = (page - 1) * limit
  const slice = _posts.slice(start, start + limit)
  return {
    posts: slice,
    totalPages: Math.ceil(_posts.length / limit),
    page,
  }
}

export async function getUserPosts(uid, page = 1) {
  await delay(300)
  const userPosts = _posts.filter(p => p.author?._id === uid)
  return {
    posts: userPosts,
    totalPages: 1,
    page,
  }
}

export async function createPost({ content, media }) {
  await delay(300)
  const post = {
    _id: `post_mock_${_nextId++}`,
    author: { ...MOCK_USERS.me },
    content,
    imageUrl: media || null,
    createdAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
    repostsCount: 0,
    viewsCount: 0,
    likedByMe: false,
  }
  _posts.unshift(post)
  return post
}

export async function deletePost(id) {
  await delay(200)
  _posts = _posts.filter(p => p._id !== id)
}

export async function toggleLike(id) {
  await delay(150)
  const post = _posts.find(p => p._id === id)
  if (!post) throw new Error('Post not found')
  post.likedByMe = !post.likedByMe
  post.likesCount += post.likedByMe ? 1 : -1
  return { liked: post.likedByMe, likesCount: post.likesCount }
}

export async function searchPosts(q, page = 1) {
  await delay(400)
  const lower = q.toLowerCase()
  const results = _posts.filter(p =>
    p.content.toLowerCase().includes(lower) ||
    p.author?.username.toLowerCase().includes(lower)
  )
  return { posts: results, totalPages: 1, page }
}
