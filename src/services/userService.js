import { isMockEnabled } from '@/mocks/utils'
import * as mock from '@/mocks/userService.mock'
import api from './api'

const real = {
  getUserById: (id) => api.get(`/users/${id}`).then(r => r.data),
  updateProfile: (id, d) => api.put(`/users/${id}`, d).then(r => r.data),
  followUser: (id) => api.post(`/users/${id}/follow`).then(r => r.data),
  unfollowUser: (id) => api.delete(`/users/${id}/follow`).then(r => r.data),
  getFollowing: (id) => api.get(`/users/${id}/following`).then(r => r.data),
  getFollowers: (id) => api.get(`/users/${id}/followers`).then(r => r.data),
  searchUsers: (q) => api.get(`/users/search?q=${encodeURIComponent(q)}`).then(r => r.data),
}

export const getUserById = (...a) => isMockEnabled() ? mock.getUserById(...a) : real.getUserById(...a)
export const updateProfile = (...a) => isMockEnabled() ? mock.updateProfile(...a) : real.updateProfile(...a)
export const followUser = (...a) => isMockEnabled() ? mock.followUser(...a) : real.followUser(...a)
export const unfollowUser = (...a) => isMockEnabled() ? mock.unfollowUser(...a) : real.unfollowUser(...a)
export const getFollowing = (...a) => isMockEnabled() ? mock.getFollowing(...a) : real.getFollowing(...a)
export const getFollowers = (...a) => isMockEnabled() ? mock.getFollowers(...a) : real.getFollowers(...a)
export const searchUsers = (...a) => isMockEnabled() ? mock.searchUsers(...a) : real.searchUsers(...a)
