// authService.js
// Fonctions d'appel API pour l'authentification (Fx1, Fx2).
// Chaque fonction retourne la data de la réponse ou lève une erreur.

import api from "./api";

// POST /auth/login — connexion avec email + mot de passe
// Retourne : { token: string, user: { id, username, email, avatar, role } }
export async function login({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

// POST /auth/register — création de compte (Fx1)
// Retourne : { token: string, user: { id, username, email } }
export async function register({ email, password, username }) {
  const res = await api.post("/auth/register", { email, password, username });
  return res.data;
}

// POST /auth/logout — invalide le token côté serveur
export async function logout() {
  await api.post("/auth/logout");
}

// GET /auth/me — récupère l'utilisateur courant depuis son token
// Utilisé au démarrage de l'app pour restaurer la session
export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data; // { id, username, email, avatar, bio, role }
}
