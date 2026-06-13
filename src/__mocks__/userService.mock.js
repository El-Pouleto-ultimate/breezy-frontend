//Mock User Service 
import { MOCK_USERS } from './data'
import { delay } from './utils'

const _users = { ...MOCK_USERS }

export async function getUserById(id) {
  await delay(250)
  const user = Object.values(_users).find(u => u._id === id || u.id === id)
  if (!user) throw new Error('User not found')
  return { ...user }
}

export async function updateProfile(id, data) {
  await delay(300)
  const user = Object.values(_users).find(u => u._id === id || u.id === id)
  if (user) Object.assign(user, data)
  return { ...(user || _users.me), ...data }
}

export async function followUser(id) {
  await delay(200)
  const user = Object.values(_users).find(u => u._id === id)
  if (user) {
    user.followedByMe = true
    user.followersCount = (user.followersCount || 0) + 1
  }
  return { followed: true }
}

export async function unfollowUser(id) {
  await delay(200)
  const user = Object.values(_users).find(u => u._id === id)
  if (user) {
    user.followedByMe = false
    user.followersCount = Math.max(0, (user.followersCount || 1) - 1)
  }
  return { followed: false }
}

export async function getFollowing(id) {
  await delay(250)
  return { users: Object.values(_users).filter(u => u.followedByMe) }
}

export async function getFollowers(id) {
  await delay(250)
  return { users: Object.values(_users).filter(u => u._id !== id) } // Il n'y a pas de suivi mutuel dans les données simulées, donc on retourne tous les utilisateurs sauf l'utilisateur actuel
}

export async function searchUsers(q) {
  await delay(300)
  const lower = q.toLowerCase()
  return Object.values(_users).filter(u =>
    u.username.toLowerCase().includes(lower) ||
    u.email.toLowerCase().includes(lower)
  )
}
