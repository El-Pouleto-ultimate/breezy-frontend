import { isMockEnabled } from '@/mocks/utils'
import * as mock from '@/mocks/notificationService.mock'
import api from './api'

const real = {
  getNotifications: ()   => api.get('/notifications').then(r=>r.data),
  markAllAsRead:    ()   => api.put('/notifications/read-all').then(r=>r.data),
}

export const getNotifications = (...a) => isMockEnabled() ? mock.getNotifications(...a) : real.getNotifications(...a)
export const markAllAsRead    = (...a) => isMockEnabled() ? mock.markAllAsRead(...a)    : real.markAllAsRead(...a)
