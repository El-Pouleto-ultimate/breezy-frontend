import { isMockEnabled } from '@/__mocks__/utils'
import { MOCK_CONVERSATIONS } from '@/__mocks__/data'
import api from './api'

const real = {
  getUnreadMessagesCount: () => api.get('/messages/unread-count').then(r => r.data),
}

const mock = {
  getUnreadMessagesCount: async () => MOCK_CONVERSATIONS.filter(c => c.unread).length,
}

export const getUnreadMessagesCount = (...a) => isMockEnabled() ? mock.getUnreadMessagesCount(...a) : real.getUnreadMessagesCount(...a)
