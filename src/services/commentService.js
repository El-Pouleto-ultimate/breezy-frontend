// commentService.js
// Fonctions d'appel API pour les commentaires (Fx7, Fx8).

import api from "./api";

// GET /posts/:postId/comments — récupère les commentaires d'un post (Fx7)
export async function getComments(postId) {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data; // { comments: [...] }
}

// POST /posts/:postId/comments — répondre à un post (Fx7)
export async function createComment(postId, { content }) {
  const res = await api.post(`/posts/${postId}/comments`, { content });
  return res.data;
}

// POST /posts/:postId/comments/:commentId/reply — répondre à un commentaire (Fx8)
export async function replyToComment(postId, commentId, { content }) {
  const res = await api.post(
    `/posts/${postId}/comments/${commentId}/reply`,
    { content }
  );
  return res.data;
}

// DELETE /comments/:commentId — supprimer un commentaire
export async function deleteComment(commentId) {
  await api.delete(`/comments/${commentId}`);
}
