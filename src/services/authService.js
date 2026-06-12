import { isMockEnabled } from '@/__mocks__/utils'
import * as mock from '@/__mocks__/authService.mock'
import api from './api'

const real = {
  login:    (d) => api.post('/auth/login', d).then(r => r.data),
  register: (d) => api.post('/auth/register', d).then(r => r.data),
  logout:   ()  => api.post('/auth/logout'),
  getMe:    ()  => api.get('/auth/me').then(r => r.data),
}

export const login    = (...a) => isMockEnabled() ? mock.login(...a)    : real.login(...a)
export const register = (...a) => isMockEnabled() ? mock.register(...a) : real.register(...a)
export const logout   = (...a) => isMockEnabled() ? mock.logout(...a)   : real.logout(...a)
export const getMe    = (...a) => isMockEnabled() ? mock.getMe(...a)    : real.getMe(...a)
