// AuthContext.jsx
// Contexte global qui rend l'utilisateur connecté et son token JWT
// accessibles depuis n'importe quel composant de l'application.
//
// Usage dans un composant enfant :
//   const { user, token, setUser, logout } = useAuth();

import { createContext, useContext, useState, useEffect } from "react";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "breezy_token";

// 1. On crée le contexte (valeur par défaut null)
const AuthContext = createContext(null);

// 2. Provider : à placer autour de toute l'app dans App.jsx
export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);   // objet utilisateur { id, username, email, avatar }
  const [token, setToken] = useState(null);   // string JWT

  // Au montage, on relit le token depuis localStorage (persistance entre les sessions)
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
      // TODO : appeler GET /users/me pour récupérer les infos utilisateur
      // et les stocker dans setUser(data)
    }
  }, []);

  // Stocke le token en mémoire ET dans localStorage
  function saveToken(newToken) {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  }

  // Déconnexion : vide tout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook custom — à utiliser dans les composants à la place de useContext(AuthContext)
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
