// Mock Notification Service 
import { MOCK_NOTIFICATIONS } from './data'
import { delay } from './utils'

let _notifications = [...MOCK_NOTIFICATIONS]

export async function getNotifications() {
  await delay(250)
  return [..._notifications]
}

export async function markAllAsRead() {
  await delay(150)
  _notifications = _notifications.map(n => ({ ...n, read: true }))
  return { success: true }
}
