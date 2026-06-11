// userService.js
// Fonctions d'appel API pour les profils et le suivi (Fx9, Fx10).

import api from "./api";

// GET /users/:userId — profil d'un utilisateur (Fx10)
export async function getUserById(userId) {
  const res = await api.get(`/users/${userId}`);
  return res.data; // { id, username, email, avatar, bio, followersCount, followingCount }
}

// PUT /users/:userId — modifie le profil (nom, bio, avatar)
export async function updateProfile(userId, { username, bio, avatar }) {
  const res = await api.put(`/users/${userId}`, { username, bio, avatar });
  return res.data;
}

// POST /users/:userId/follow — suivre un utilisateur (Fx9)
export async function followUser(userId) {
  const res = await api.post(`/users/${userId}/follow`);
  return res.data; // { following: true }
}

// DELETE /users/:userId/follow — ne plus suivre (Fx9)
export async function unfollowUser(userId) {
  const res = await api.delete(`/users/${userId}/follow`);
  return res.data; // { following: false }
}

// GET /users/:userId/following — liste des comptes suivis
export async function getFollowing(userId) {
  const res = await api.get(`/users/${userId}/following`);
  return res.data; // { users: [...] }
}

// GET /users/search?q=query — recherche d'utilisateurs
export async function searchUsers(query) {
  const res = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
  return res.data;
}
