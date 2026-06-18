import { isMockEnabled } from '@/mocks/utils'
import * as mock from '@/mocks/commentService.mock'
import api from './api'

const real = {
  getComments:    (pid)        => api.get(`/posts/${pid}/comments`).then(r=>r.data),
  createComment:  (pid,d)      => api.post(`/posts/${pid}/comments`, d).then(r=>r.data),
  replyToComment: (pid,cid,d)  => api.post(`/posts/${pid}/comments/${cid}/reply`, d).then(r=>r.data),
}

export const getComments    = (...a) => isMockEnabled() ? mock.getComments(...a)    : real.getComments(...a)
export const createComment  = (...a) => isMockEnabled() ? mock.createComment(...a)  : real.createComment(...a)
export const replyToComment = (...a) => isMockEnabled() ? mock.replyToComment(...a) : real.replyToComment(...a)
