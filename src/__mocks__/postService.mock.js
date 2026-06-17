import { MOCK_POSTS, MOCK_USERS, MOCK_COMMENTS } from './data'
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

export async function getUserReplies(uid, page = 1) {
  await delay(300)
  // Les réponses sont stockées dans MOCK_COMMENTS, indexées par postId,
  // pas par auteur. On reconstruit les réponses de l'utilisateur en
  // parcourant tous les commentaires de tous les posts.
  const replies = []
  for (const [postId, comments] of Object.entries(MOCK_COMMENTS)) {
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
          commentsCount: 0,
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
  // Limitation du mock : likedByMe représente les likes de l'utilisateur
  // courant ("me"), pas ceux de l'utilisateur uid visité. Pour un profil
  // autre que "me", on ne peut pas distinguer ses likes dans ce jeu de
  // données. On retourne donc les posts likés par l'utilisateur courant
  // uniquement quand uid correspond à "me".
  if (uid !== MOCK_USERS.me._id) {
    return { posts: [], totalPages: 1, page }
  }
  const liked = _posts.filter(p => p.likedByMe)
  return { posts: liked, totalPages: 1, page }
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