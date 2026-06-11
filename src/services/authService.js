import api from './api'
export const login    = (d) => api.post('/auth/login', d).then(r => r.data)
export const register = (d) => api.post('/auth/register', d).then(r => r.data)
export const logout   = ()  => api.post('/auth/logout')
export const getMe    = ()  => api.get('/auth/me').then(r => r.data)
