import { MOCK_POSTS, MOCK_USERS } from './data'
import { _comments } from './commentService.mock'
import { delay } from './utils'

const STORAGE_KEY = 'breezy_mock_posts'

function loadPosts() {
  if (typeof window === 'undefined') return [...MOCK_POSTS]
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : [...MOCK_POSTS]
  } catch {
    return [...MOCK_POSTS]
  }
}

function savePosts() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_posts))
  } catch { }
}

let _posts = loadPosts()
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
  return { posts: userPosts, totalPages: 1, page }
}

export async function getUserReplies(uid, page = 1) {
  await delay(300)
  const replies = []
  for (const [postId, comments] of Object.entries(_comments)) {
    const parentPost = _posts.find(p => p._id === postId)
    comments
      .filter(c => c.author?._id === uid)
      .forEach(c => {
        replies.push({
          _id: c._id,
          author: c.author,
          content: c.content,
          createdAt: c.createdAt,
          replyTo: parentPost?.author?.username || null,
          likesCount: 0,
          commentsCount: comments.filter(reply => reply.parentId === c._id).length,
          repostsCount: 0,
          viewsCount: 0,
          likedByMe: false,
        })
      })
  }
  return { posts: replies, totalPages: 1, page }
}

export async function getUserMedia(uid, page = 1) {
  await delay(300)
  const media = _posts.filter(p => p.author?._id === uid && p.imageUrl)
  return { posts: media, totalPages: 1, page }
}

export async function getUserLikes(uid, page = 1) {
  await delay(300)
  if (uid !== MOCK_USERS.me._id) {
    return { posts: [], totalPages: 1, page }
  }
  const liked = _posts.filter(p => p.likedByMe)
  return { posts: liked, totalPages: 1, page }
}

export async function getUserReposts(uid, page = 1) {
  await delay(300)
  if (uid !== MOCK_USERS.me._id) {
    return { posts: [], totalPages: 1, page }
  }
  const reposted = _posts.filter(p => p.repostedByMe)
  return { posts: reposted, totalPages: 1, page }
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
    repostedByMe: false,
  }
  _posts.unshift(post)
  savePosts()
  return post
}

export async function deletePost(id) {
  await delay(200)
  _posts = _posts.filter(p => p._id !== id)
  savePosts()
}

export async function updatePost(id, { content, media }) {
  await delay(200)
  const post = _posts.find(p => p._id === id)
  if (!post) throw new Error('Post not found')
  if (content !== undefined) post.content = content
  if (media !== undefined) post.imageUrl = media
  savePosts()
  return post
}

export async function toggleLike(id) {
  await delay(150)
  const post = _posts.find(p => p._id === id)
  if (!post) throw new Error('Post not found')
  post.likedByMe = !post.likedByMe
  post.likesCount += post.likedByMe ? 1 : -1
  savePosts()
  return { liked: post.likedByMe, likesCount: post.likesCount }
}

export async function toggleRepost(id) {
  await delay(150)
  const post = _posts.find(p => p._id === id)
  if (!post) throw new Error('Post not found')
  post.repostedByMe = !post.repostedByMe
  post.repostsCount = (post.repostsCount || 0) + (post.repostedByMe ? 1 : -1)
  if (post.repostsCount < 0) post.repostsCount = 0
  savePosts()
  return { reposted: post.repostedByMe, repostsCount: post.repostsCount }
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