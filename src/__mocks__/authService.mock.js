// ─── Mock Auth Service ────────────────────────────────────────────────
import { MOCK_USERS, MOCK_TOKEN } from './data'
import { delay } from './utils'

export async function login({ email, password }) {
  await delay(400)
  // Accepte n'importe quel email/mdp — c'est du mock !
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
