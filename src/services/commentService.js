import api from './api'
export const getComments    = (pid)        => api.get(`/posts/${pid}/comments`).then(r=>r.data)
export const createComment  = (pid,d)      => api.post(`/posts/${pid}/comments`, d).then(r=>r.data)
export const replyToComment = (pid,cid,d)  => api.post(`/posts/${pid}/comments/${cid}/reply`, d).then(r=>r.data)
