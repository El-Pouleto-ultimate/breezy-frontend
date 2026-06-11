// ConnectPage.jsx
// Page d'atterrissage pour les visiteurs non connectés (wireframe Connect_1).
// Deux boutons : "S'authentifier" → /signin | "Créer un compte" → /register

import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";

export default function ConnectPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        {/* Titre de bienvenue */}
        <div>
          <h1 className="text-2xl font-semibold text-breezy-dark">Bienvenue sur Breezy</h1>
          <p className="text-sm text-breezy-muted mt-1">
            Le réseau social léger et réactif.
          </p>
        </div>

        {/* Les deux boutons du wireframe */}
        <div className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={() => navigate("/signin")}
          >
            S'authentifier
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/register")}
          >
            Créer un compte
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
