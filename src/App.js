// App.jsx
// Racine de l'application.
// On y place les Providers (contextes globaux) et le Router.
// Tous les enfants auront accès à AuthContext et ThemeContext.

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes";

export default function App() {
  return (
    // BrowserRouter active la navigation côté client (URL sans rechargement)
    <BrowserRouter>
      {/* AuthProvider rend user + token disponibles partout */}
      <AuthProvider>
        {/* ThemeProvider gère le thème clair/sombre (Fx23) */}
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
