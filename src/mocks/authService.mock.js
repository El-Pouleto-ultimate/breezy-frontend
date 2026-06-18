// ─── Mock Auth Service ────────────────────────────────────────────────
import { MOCK_USERS, MOCK_TOKEN } from './data'
import { delay } from './utils'

export async function login({ email, password }) {
  await delay(400)
  // Accepte n'importe quel email/mdp 
  if (!email || !password) throw { response: { data: { message: 'Tous les champs sont requis.' } } }
  return { token: MOCK_TOKEN, user: { ...MOCK_USERS.me } }
}

export async function register({ email, password, username }) {
  await delay(400)
  if (!email || !password || !username) throw { response: { data: { message: 'Tous les champs sont requis.' } } }
  return {
    token: MOCK_TOKEN,
    user: { ...MOCK_USERS.me, username, email },
  }
}

export async function logout() {
  await delay(100)
}

export async function getMe() {
  await delay(200)
  return { ...MOCK_USERS.me }
}

export async function changePassword({ oldPassword, newPassword }) {
  await delay(400)
  if (!oldPassword || !newPassword) throw new Error('Ancien mot de passe et nouveau mot de passe requis.')
  if (oldPassword !== 'password') throw new Error('Ancien mot de passe incorrect.')
  return { success: true }
}
