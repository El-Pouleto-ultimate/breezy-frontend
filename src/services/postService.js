// postService.js
// Fonctions d'appel API pour les posts (Fx3, Fx4, Fx5, Fx6).

import api from "./api";

// GET /posts/feed — récupère le fil d'actualités (posts des suivis) (Fx5)
// page : numéro de page pour la pagination
export async function getFeed(page = 1) {
  const res = await api.get(`/posts/feed?page=${page}&limit=10`);
  return res.data; // { posts: [...], totalPages, currentPage }
}

// GET /posts/user/:userId — récupère les posts d'un utilisateur (Fx4, Fx11)
export async function getUserPosts(userId, page = 1) {
  const res = await api.get(`/posts/user/${userId}?page=${page}&limit=10`);
  return res.data;
}

// POST /posts — publie un nouveau message (Fx3)
// content : texte du post (max 280 chars), tags : tableau optionnel (Fx12)
export async function createPost({ content, tags = [] }) {
  const res = await api.post("/posts", { content, tags });
  return res.data; // le post créé
}

// DELETE /posts/:postId — supprime un post
export async function deletePost(postId) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}

// POST /posts/:postId/like — like ou unlike un post (toggle) (Fx6)
// Retourne : { liked: boolean, likesCount: number }
export async function toggleLike(postId) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}
