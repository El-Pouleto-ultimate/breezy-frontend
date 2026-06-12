import { isMockEnabled } from '@/__mocks__/utils'
import * as mock from '@/__mocks__/postService.mock'
import api from './api'

const real = {
  getFeed:      (page=1) => api.get(`/posts/feed?page=${page}&limit=10`).then(r=>r.data),
  getUserPosts: (uid,p=1)=> api.get(`/posts/user/${uid}?page=${p}&limit=10`).then(r=>r.data),
  createPost:   (d)      => api.post('/posts', d).then(r=>r.data),
  deletePost:   (id)     => api.delete(`/posts/${id}`),
  toggleLike:   (id)     => api.post(`/posts/${id}/like`).then(r=>r.data),
  searchPosts:  (q,p=1)  => api.get(`/posts/search?q=${encodeURIComponent(q)}&page=${p}`).then(r=>r.data),
}

export const getFeed      = (...a) => isMockEnabled() ? mock.getFeed(...a)      : real.getFeed(...a)
export const getUserPosts = (...a) => isMockEnabled() ? mock.getUserPosts(...a) : real.getUserPosts(...a)
export const createPost   = (...a) => isMockEnabled() ? mock.createPost(...a)   : real.createPost(...a)
export const deletePost   = (...a) => isMockEnabled() ? mock.deletePost(...a)   : real.deletePost(...a)
export const toggleLike   = (...a) => isMockEnabled() ? mock.toggleLike(...a)   : real.toggleLike(...a)
export const searchPosts  = (...a) => isMockEnabled() ? mock.searchPosts(...a)  : real.searchPosts(...a)
