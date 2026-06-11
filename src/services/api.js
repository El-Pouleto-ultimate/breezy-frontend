// api.js
// Instance Axios centrale partagée par tous les services.
// L'intercepteur de requête injecte automatiquement le token JWT
// dans le header Authorization de chaque appel API.

import axios from "axios";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "breezy_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 secondes max avant d'abandonner la requête
});

// ── Intercepteur de REQUÊTE ──────────────────────────────────
// Avant chaque appel, on récupère le token JWT dans localStorage
// et on l'ajoute dans le header Authorization.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Intercepteur de RÉPONSE ──────────────────────────────────
// Si l'API renvoie 401 (token expiré ou invalide), on déconnecte
// l'utilisateur et on le redirige vers la page de connexion.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
