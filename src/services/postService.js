import api from './api'
export const getFeed       = (page=1) => api.get(`/posts/feed?page=${page}&limit=10`).then(r=>r.data)
export const getUserPosts  = (uid,p=1)=> api.get(`/posts/user/${uid}?page=${p}&limit=10`).then(r=>r.data)
export const createPost    = (d)      => api.post('/posts', d).then(r=>r.data)
export const deletePost    = (id)     => api.delete(`/posts/${id}`)
export const toggleLike    = (id)     => api.post(`/posts/${id}/like`).then(r=>r.data)
export const searchPosts   = (q,p=1)  => api.get(`/posts/search?q=${encodeURIComponent(q)}&page=${p}`).then(r=>r.data)
