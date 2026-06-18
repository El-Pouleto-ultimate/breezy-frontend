import { isMockEnabled } from '@/mocks/utils'
import * as mock from '@/mocks/postService.mock'
import api from './api'

const real = {
  getFeed:        (page=1) => api.get(`/posts/feed?page=${page}&limit=10`).then(r=>r.data),
  getUserPosts:   (uid,p=1)=> api.get(`/posts/user/${uid}?page=${p}&limit=10`).then(r=>r.data),
  getUserReplies: (uid,p=1)=> api.get(`/posts/user/${uid}/replies?page=${p}&limit=10`).then(r=>r.data),
  getUserMedia:   (uid,p=1)=> api.get(`/posts/user/${uid}/media?page=${p}&limit=10`).then(r=>r.data),
  getUserLikes:   (uid,p=1)=> api.get(`/posts/user/${uid}/likes?page=${p}&limit=10`).then(r=>r.data),
  getUserReposts: (uid,p=1)=> api.get(`/posts/user/${uid}/reposts?page=${p}&limit=10`).then(r=>r.data),
  createPost:     (d)      => api.post('/posts', d).then(r=>r.data),
  deletePost:     (id)     => api.delete(`/posts/${id}`),
  toggleLike:     (id)     => api.post(`/posts/${id}/like`).then(r=>r.data),
  toggleRepost:   (id)     => api.post(`/posts/${id}/repost`).then(r=>r.data),
  searchPosts:    (q,p=1)  => api.get(`/posts/search?q=${encodeURIComponent(q)}&page=${p}`).then(r=>r.data),
}

export const getFeed        = (...a) => isMockEnabled() ? mock.getFeed(...a)        : real.getFeed(...a)
export const getUserPosts   = (...a) => isMockEnabled() ? mock.getUserPosts(...a)   : real.getUserPosts(...a)
export const getUserReplies = (...a) => isMockEnabled() ? mock.getUserReplies(...a) : real.getUserReplies(...a)
export const getUserMedia   = (...a) => isMockEnabled() ? mock.getUserMedia(...a)   : real.getUserMedia(...a)
export const getUserLikes   = (...a) => isMockEnabled() ? mock.getUserLikes(...a)   : real.getUserLikes(...a)
export const getUserReposts = (...a) => isMockEnabled() ? mock.getUserReposts(...a) : real.getUserReposts(...a)
export const createPost     = (...a) => isMockEnabled() ? mock.createPost(...a)     : real.createPost(...a)
export const deletePost     = (...a) => isMockEnabled() ? mock.deletePost(...a)     : real.deletePost(...a)
export const toggleLike     = (...a) => isMockEnabled() ? mock.toggleLike(...a)     : real.toggleLike(...a)
export const toggleRepost   = (...a) => isMockEnabled() ? mock.toggleRepost(...a)   : real.toggleRepost(...a)
export const searchPosts    = (...a) => isMockEnabled() ? mock.searchPosts(...a)    : real.searchPosts(...a)