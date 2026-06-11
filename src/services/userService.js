import api from './api'
export const getUserById   = (id)        => api.get(`/users/${id}`).then(r=>r.data)
export const updateProfile = (id, d)     => api.put(`/users/${id}`, d).then(r=>r.data)
export const followUser    = (id)        => api.post(`/users/${id}/follow`).then(r=>r.data)
export const unfollowUser  = (id)        => api.delete(`/users/${id}/follow`).then(r=>r.data)
export const getFollowing  = (id)        => api.get(`/users/${id}/following`).then(r=>r.data)
export const searchUsers   = (q)         => api.get(`/users/search?q=${encodeURIComponent(q)}`).then(r=>r.data)
