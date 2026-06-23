import axios from 'axios'

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'breezy_token'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      // /auth/login qui renvoie 401 = mauvais credentials → laisser le composant gérer l'erreur
      if (originalRequest.url?.includes('/auth/login')) {
        return Promise.reject(err)
      }
      // /auth/refresh qui échoue → forcer la reconnexion
      if (originalRequest.url?.includes('/auth/refresh')) {
        localStorage.removeItem(TOKEN_KEY)
        window.location.href = '/signin'
        return Promise.reject(err)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await api.post('/auth/refresh')
        const newToken = data.token
        localStorage.setItem(TOKEN_KEY, newToken)
        api.defaults.headers.Authorization = `Bearer ${newToken}`
        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        localStorage.removeItem(TOKEN_KEY)
        window.location.href = '/signin'
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)

export default api
