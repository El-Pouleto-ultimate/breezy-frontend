import api from './api'
export const getNotifications = ()   => api.get('/notifications').then(r=>r.data)
export const markAllAsRead    = ()   => api.put('/notifications/read-all').then(r=>r.data)
