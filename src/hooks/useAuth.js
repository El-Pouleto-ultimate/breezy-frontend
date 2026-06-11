// useAuth.js
// Hook d'accès au contexte d'authentification.
// Re-exporte useAuth depuis AuthContext pour un import plus court.
//
// Utilisation dans un composant :
//   const { user, token, logout } = useAuth();

export { useAuth } from "../context/AuthContext";
