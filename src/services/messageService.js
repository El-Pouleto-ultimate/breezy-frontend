import { isMockEnabled } from '@/mocks/utils'
import { MOCK_CONVERSATIONS } from '@/mocks/data'
import api from './api'

const real = {
  getUnreadMessagesCount: () => api.get('/messages/unread-count').then(r => r.data),
}

const mock = {
  getUnreadMessagesCount: async () => MOCK_CONVERSATIONS.filter(c => c.unread).length,
}

export const getUnreadMessagesCount = (...a) => isMockEnabled() ? mock.getUnreadMessagesCount(...a) : real.getUnreadMessagesCount(...a)
