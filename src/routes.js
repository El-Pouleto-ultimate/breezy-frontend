// routes.jsx
// Définit toutes les routes de l'application.
// Routes publiques  : accessibles sans être connecté
// Routes protégées  : redirigent vers /connect si pas de token JWT

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import ConnectPage       from "./pages/ConnectPage";
import SignInPage        from "./pages/SignInPage";
import RegisterPage      from "./pages/RegisterPage";
import HomePage          from "./pages/HomePage";
import ProfilePage       from "./pages/ProfilePage";
import OtherProfilePage  from "./pages/OtherProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage      from "./pages/MessagesPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Routes publiques (visiteur) ── */}
      <Route path="/"         element={<ConnectPage />} />
      <Route path="/connect"  element={<ConnectPage />} />
      <Route path="/signin"   element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ── Routes protégées (utilisateur connecté) ── */}
      {/* ProtectedRoute vérifie la présence du JWT avant de rendre la page */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home"                   element={<HomePage />} />
        <Route path="/profile"                element={<ProfilePage />} />
        <Route path="/profile/:userId"        element={<OtherProfilePage />} />
        <Route path="/notifications"          element={<NotificationsPage />} />
        <Route path="/messages"               element={<MessagesPage />} />
      </Route>

      {/* Toute URL inconnue redirige vers la landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
