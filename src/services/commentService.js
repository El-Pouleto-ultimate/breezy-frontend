import { isMockEnabled } from '@/mocks/utils'
import * as mock from '@/mocks/commentService.mock'
import api from './api'

const real = {
  getComments:    (pid)        => api.get(`/posts/${pid}/comments`).then(r=>r.data),
  createComment:  (pid,d)      => api.post(`/posts/${pid}/comments`, d).then(r=>r.data),
  replyToComment: (pid,cid,d)  => api.post(`/posts/${pid}/comments/${cid}/replies`, d).then(r=>r.data),
  updateComment:  (pid, cid, d) => api.put(`/posts/${pid}/comments/${cid}`, d).then(r=>r.data),
  deleteComment:  (pid, cid)    => api.delete(`/posts/${pid}/comments/${cid}`),
}

export const getComments    = (...a) => isMockEnabled() ? mock.getComments(...a)    : real.getComments(...a)
export const createComment  = (...a) => isMockEnabled() ? mock.createComment(...a)  : real.createComment(...a)
export const replyToComment = (...a) => isMockEnabled() ? mock.replyToComment(...a) : real.replyToComment(...a)
export const updateComment  = (...a) => isMockEnabled() ? mock.updateComment(...a)  : real.updateComment(...a)
export const deleteComment  = (...a) => isMockEnabled() ? mock.deleteComment(...a)  : real.deleteComment(...a)
