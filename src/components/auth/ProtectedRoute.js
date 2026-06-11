// ProtectedRoute.jsx
// Composant de garde pour les routes qui nécessitent une connexion.
// Si l'utilisateur n'a pas de token JWT → redirige vers /signin.
// Sinon → affiche la page demandée (via <Outlet />).
//
// Utilisé dans routes.jsx :
//   <Route element={<ProtectedRoute />}>
//     <Route path="/home" element={<HomePage />} />
//   </Route>

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const { token } = useAuth();

  // Si pas de token, on redirige vers la page de connexion.
  // replace=true remplace l'entrée dans l'historique (pas de retour arrière vers la page protégée)
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // <Outlet /> rend la route enfant (la vraie page)
  return <Outlet />;
}
